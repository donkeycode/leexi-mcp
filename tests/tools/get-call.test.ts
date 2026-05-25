import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { LeexiApiError } from "../../src/errors.js";
import { LeexiClient } from "../../src/leexi/client.js";
import { createGetCallTool } from "../../src/tools/get-call.js";
import { mswServer } from "../helpers/mock-server.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, "..", "fixtures");

function fixture(name: string) {
  return JSON.parse(readFileSync(join(fixturesDir, name), "utf8"));
}

const BASE_URL = "https://public-api.leexi.ai/v1";

describe("leexi_get_call tool", () => {
  const client = new LeexiClient({ apiKeyId: "test-id", apiKey: "k", baseUrl: BASE_URL });

  it("returns full call detail with transcript when include_transcript=true (default)", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls/call-abc-123`, () =>
        HttpResponse.json(fixture("call-detail.json")),
      ),
    );

    const tool = createGetCallTool(client);
    const result = await tool.handler({ uuid: "call-abc-123" });

    expect(result.uuid).toBe("call-abc-123");
    // simple_transcript is a string with inline timestamps
    expect(typeof result.simpleTranscript).toBe("string");
    expect(result.simpleTranscript).toContain("Alice Example");
    // transcript array is present and non-empty
    expect(result.transcript.length).toBeGreaterThan(0);
    // chapters and call_topics are present
    expect(result.chapters.length).toBeGreaterThan(0);
    expect(result.callTopics.length).toBeGreaterThan(0);
    // participatingUsers replaces old participants
    expect(result.participatingUsers.map((u) => u.name)).toContain("Alice Example");
  });

  it("returns lite payload when include_transcript=false: zeroes transcript fields", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls/call-abc-123`, () =>
        HttpResponse.json(fixture("call-detail.json")),
      ),
    );

    const tool = createGetCallTool(client);
    const result = await tool.handler({ uuid: "call-abc-123", include_transcript: false });

    // All four transcript-related fields must be emptied
    expect(result.simpleTranscript).toBe("");
    expect(result.transcript).toEqual([]);
    expect(result.chapters).toEqual([]);
    expect(result.callTopics).toEqual([]);
    // But summary and tasks must still be present
    expect(result.summary).toContain("Daily Demo");
    expect(result.tasks.length).toBeGreaterThan(0);
  });

  it("propagates LeexiApiError on 404", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls/missing`, () =>
        HttpResponse.json({ error: "not found" }, { status: 404 }),
      ),
    );

    const tool = createGetCallTool(client);
    await expect(tool.handler({ uuid: "missing" })).rejects.toThrow(LeexiApiError);
  });
});
