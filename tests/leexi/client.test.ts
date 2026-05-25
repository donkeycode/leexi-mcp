import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { LeexiApiError } from "../../src/errors.js";
import { LeexiClient } from "../../src/leexi/client.js";
import { mswServer } from "../helpers/mock-server.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, "..", "fixtures");

function fixture(name: string) {
  return JSON.parse(readFileSync(join(fixturesDir, name), "utf8"));
}

const BASE_URL = "https://public-api.leexi.ai/v1";

function makeClient() {
  return new LeexiClient({ apiKeyId: "test-id", apiKey: "test-key", baseUrl: BASE_URL });
}

describe("LeexiClient.listCalls", () => {
  it("sends Authorization header and returns parsed list with real pagination", async () => {
    let receivedAuth: string | null = null;
    mswServer.use(
      http.get(`${BASE_URL}/calls`, ({ request }) => {
        receivedAuth = request.headers.get("authorization");
        return HttpResponse.json(fixture("calls-list.json"));
      }),
    );

    const client = makeClient();
    const result = await client.listCalls({ limit: 50 });

    expect(receivedAuth).toBe(`Basic ${Buffer.from("test-id:test-key").toString("base64")}`);
    // listCalls returns { calls, pagination } — not { data, meta }
    expect(result.calls).toHaveLength(2);
    expect(result.calls[0]?.uuid).toBe("call-abc-123");
    // Real pagination shape: { page, items, count }
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.items).toBe(2);
    expect(result.pagination.count).toBe(864);
  });

  it("forwards since and per_page query params", async () => {
    let receivedUrl: string | null = null;
    mswServer.use(
      http.get(`${BASE_URL}/calls`, ({ request }) => {
        receivedUrl = request.url;
        return HttpResponse.json(fixture("calls-list.json"));
      }),
    );

    await makeClient().listCalls({ since: "2026-05-20T00:00:00Z", limit: 25 });

    expect(receivedUrl).toContain("since=2026-05-20T00%3A00%3A00Z");
    expect(receivedUrl).toContain("per_page=25");
  });

  it("throws LeexiApiError on 401", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls`, () =>
        HttpResponse.json({ error: "unauthorized" }, { status: 401 }),
      ),
    );
    await expect(makeClient().listCalls({})).rejects.toThrow(LeexiApiError);
  });
});

describe("LeexiClient.getCall", () => {
  it("fetches, unwraps the data wrapper, and returns parsed call detail", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls/call-abc-123`, () =>
        HttpResponse.json(fixture("call-detail.json")),
      ),
    );
    // getCall unwraps { data: CallDetail } — caller receives CallDetail directly
    const call = await makeClient().getCall("call-abc-123");
    expect(call.uuid).toBe("call-abc-123");
    // simple_transcript is a string in v0.4.0
    expect(typeof call.simpleTranscript).toBe("string");
    expect(call.simpleTranscript).toContain("Alice Example");
    // summary is markdown
    expect(call.summary).toContain("Daily Demo");
    // participatingUsers replaces participants
    expect(call.participatingUsers.length).toBeGreaterThan(0);
    expect(call.participatingUsers[0]?.name).toBe("Alice Example");
  });

  it("throws LeexiApiError on 404", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls/missing`, () =>
        HttpResponse.json({ error: "not found" }, { status: 404 }),
      ),
    );
    await expect(makeClient().getCall("missing")).rejects.toThrow(LeexiApiError);
  });
});

describe("LeexiClient retry behavior", () => {
  it("retries once on 429 then succeeds", async () => {
    let calls = 0;
    mswServer.use(
      http.get(`${BASE_URL}/calls/call-abc-123`, () => {
        calls += 1;
        if (calls === 1) {
          return new HttpResponse(null, {
            status: 429,
            headers: { "Retry-After": "0" },
          });
        }
        return HttpResponse.json(fixture("call-detail.json"));
      }),
    );

    const call = await makeClient().getCall("call-abc-123");
    expect(calls).toBe(2);
    expect(call.uuid).toBe("call-abc-123");
  });
});
