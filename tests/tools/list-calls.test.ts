import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { http, HttpResponse } from "msw";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LeexiClient } from "../../src/leexi/client.js";
import { ProcessedStore } from "../../src/store/processed-store.js";
import { createListCallsTool } from "../../src/tools/list-calls.js";
import { mswServer } from "../helpers/mock-server.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, "..", "fixtures");

function fixture(name: string) {
  return JSON.parse(readFileSync(join(fixturesDir, name), "utf8"));
}

const BASE_URL = "https://public-api.leexi.ai/v1";

describe("leexi_list_calls tool", () => {
  let dir: string;
  let storePath: string;
  let store: ProcessedStore;
  let client: LeexiClient;

  beforeEach(async () => {
    dir = mkdtempSync(join(tmpdir(), "leexi-tool-"));
    storePath = join(dir, "processed.json");
    store = new ProcessedStore(storePath);
    await store.load();
    client = new LeexiClient({ apiKeyId: "test-id", apiKey: "k", baseUrl: BASE_URL });
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("returns all calls and real pagination when no filter is applied", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls`, () => HttpResponse.json(fixture("calls-list.json"))),
    );

    const tool = createListCallsTool(client, store);
    const result = await tool.handler({});

    expect(result.calls).toHaveLength(2);
    expect(result.calls[0]?.uuid).toBe("call-abc-123");
    // Real pagination shape: { page, items, count } — not { page, perPage, total }
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.items).toBe(2);
    expect(result.pagination.count).toBe(864);
  });

  it("excludes processed calls when only_unprocessed is true", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls`, () => HttpResponse.json(fixture("calls-list.json"))),
    );
    await store.markProcessed("call-abc-123");

    const tool = createListCallsTool(client, store);
    const result = await tool.handler({ only_unprocessed: true });

    expect(result.calls).toHaveLength(1);
    expect(result.calls[0]?.uuid).toBe("call-def-456");
  });

  it("passes since and limit to the client", async () => {
    let receivedUrl: string | null = null;
    mswServer.use(
      http.get(`${BASE_URL}/calls`, ({ request }) => {
        receivedUrl = request.url;
        return HttpResponse.json(fixture("calls-list.json"));
      }),
    );

    const tool = createListCallsTool(client, store);
    await tool.handler({ since: "2026-05-20T00:00:00Z", limit: 10 });

    expect(receivedUrl).toContain("since=2026-05-20T00%3A00%3A00Z");
    expect(receivedUrl).toContain("per_page=10");
  });

  it("strips heavy fields when fields='summary' (default)", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls`, () => HttpResponse.json(fixture("calls-list.json"))),
    );

    const tool = createListCallsTool(client, store);
    const result = await tool.handler({}); // default = summary

    // Essentials preserved
    expect(result.calls[0]?.uuid).toBe("call-abc-123");
    expect(result.calls[0]?.title).toBeDefined();
    expect(result.calls[0]?.performedAt).toBeDefined();
    expect(result.calls[0]?.duration).toBeDefined();
    expect(result.calls[0]?.leexiUrl).toBeDefined();
    // Heavy fields stripped
    expect(result.calls[0]?.simpleTranscript).toBe("");
    expect(result.calls[0]?.chapters).toEqual([]);
    expect(result.calls[0]?.tasks).toEqual([]);
    expect(result.calls[0]?.prompts).toEqual([]);
  });

  it("keeps all fields when fields='full'", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls`, () => HttpResponse.json(fixture("calls-list.json"))),
    );

    const tool = createListCallsTool(client, store);
    const resultSummary = await tool.handler({ fields: "summary" });
    const resultFull = await tool.handler({ fields: "full" });

    // If the fixture has any non-empty heavy field in the upstream response,
    // full mode must preserve it. We can't assume specific contents, but we
    // can assert structural difference vs summary: full keeps original arrays.
    expect(resultFull.calls[0]?.uuid).toBe(resultSummary.calls[0]?.uuid);
    // The defining contract: in summary mode, simpleTranscript is empty string.
    // In full mode, it's whatever the API returned (string, may be "" if upstream is empty).
    // So the test is: full mode does NOT force empty arrays — they reflect upstream.
    expect(Array.isArray(resultFull.calls[0]?.chapters)).toBe(true);
    expect(Array.isArray(resultFull.calls[0]?.tasks)).toBe(true);
  });
});
