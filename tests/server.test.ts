// Smoke tests for server.ts wiring — uses buildServer() so no stdio is touched.
// The LeexiClient and ProcessedStore are replaced by stubs; no HTTP or file I/O.

import { describe, expect, it, vi } from "vitest";
import { ValidationError } from "../src/errors.js";
import { buildServer } from "../src/server.js";

// ---------------------------------------------------------------------------
// Minimal stub for LeexiClient — replaces the real HTTP client.
// ---------------------------------------------------------------------------

vi.mock("../src/leexi/client.js", () => {
  return {
    LeexiClient: vi.fn().mockImplementation(() => ({
      listCalls: vi.fn().mockResolvedValue({
        data: [],
        meta: { page: 1, per_page: 50, total: 0 },
      }),
      getCall: vi.fn().mockResolvedValue({
        uuid: "call-abc-123",
        title: "Test call",
        createdAt: "2026-05-25T10:00:00Z",
        durationSeconds: 600,
        language: "fr",
        status: "completed",
        recordingUrl: "https://app.leexi.ai/calls/call-abc-123",
        participants: [],
        topics: [],
        simpleTranscript: [],
        transcript: [],
      }),
    })),
  };
});

// Stub ProcessedStore so no file I/O happens.
vi.mock("../src/store/processed-store.js", () => {
  return {
    ProcessedStore: vi.fn().mockImplementation(() => ({
      load: vi.fn().mockResolvedValue(undefined),
      isProcessed: vi.fn().mockResolvedValue(false),
      markProcessed: vi.fn().mockResolvedValue(undefined),
    })),
  };
});

// ---------------------------------------------------------------------------
// Minimal config — no real API key or state file needed with stubs.
// ---------------------------------------------------------------------------

const testConfig = {
  apiKey: "test-key",
  baseUrl: "https://public-api.leexi.ai/v1",
  stateFile: "/tmp/leexi-test-state.json",
  rateLimitPerMinute: 50,
};

// ---------------------------------------------------------------------------
// Helper — invoke a registered request handler directly on the server.
// The SDK Protocol base class stores handlers in _requestHandlers Map keyed
// by the method string (e.g. "tools/list", "tools/call").
// ---------------------------------------------------------------------------

async function callHandler(
  // biome-ignore lint/suspicious/noExplicitAny: internal SDK map access
  server: any,
  method: string,
  params: unknown,
): Promise<unknown> {
  const handler = server._requestHandlers?.get(method);
  if (!handler) throw new Error(`No handler registered for method: ${method}`);
  return handler({ method, params });
}

describe("buildServer", () => {
  it("creates 3 tools with the correct names", () => {
    const { tools } = buildServer(testConfig);
    const names = tools.map((t: { name: string }) => t.name);
    expect(names).toHaveLength(3);
    expect(names).toContain("leexi_list_calls");
    expect(names).toContain("leexi_get_call");
    expect(names).toContain("leexi_mark_processed");
  });

  it("ListTools handler returns 3 entries with inputSchema JSON schemas", async () => {
    const { server } = buildServer(testConfig);
    const response = await callHandler(server, "tools/list", {});
    const result = response as { tools: Array<{ name: string; inputSchema: unknown }> };
    expect(result.tools).toHaveLength(3);
    // Each tool must expose a JSON Schema object (not a Zod schema).
    for (const tool of result.tools) {
      expect(typeof tool.inputSchema).toBe("object");
      expect(tool.inputSchema).not.toBeNull();
    }
  });

  it("CallTool handler routes to leexi_get_call and returns text content", async () => {
    const { server } = buildServer(testConfig);
    const response = await callHandler(server, "tools/call", {
      name: "leexi_get_call",
      arguments: { uuid: "call-abc-123" },
    });
    const result = response as { content: Array<{ type: string; text: string }> };
    expect(result.content).toHaveLength(1);
    expect(result.content[0]?.type).toBe("text");
    // The stub resolves with uuid "call-abc-123"; verify it's in the JSON output.
    expect(result.content[0]?.text).toContain("call-abc-123");
  });

  it("CallTool handler throws on unknown tool name", async () => {
    const { server } = buildServer(testConfig);
    await expect(
      callHandler(server, "tools/call", {
        name: "leexi_nonexistent",
        arguments: {},
      }),
    ).rejects.toThrow("Unknown tool: leexi_nonexistent");
  });

  it("CallTool handler throws ValidationError on invalid input", async () => {
    const { server } = buildServer(testConfig);
    await expect(
      callHandler(server, "tools/call", {
        name: "leexi_get_call",
        // uuid is required and must be non-empty — empty string fails min(1).
        arguments: { uuid: "" },
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
