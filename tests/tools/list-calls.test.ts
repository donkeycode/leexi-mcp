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

  it("returns all calls when no filter is applied", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls`, () => HttpResponse.json(fixture("calls-list.json"))),
    );

    const tool = createListCallsTool(client, store);
    const result = await tool.handler({});

    expect(result.calls).toHaveLength(2);
    expect(result.calls[0]?.uuid).toBe("call-abc-123");
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
});
