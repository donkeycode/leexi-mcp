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
  return new LeexiClient({ apiKey: "test-key", baseUrl: BASE_URL });
}

describe("LeexiClient.listCalls", () => {
  it("sends Authorization header and returns parsed list", async () => {
    let receivedAuth: string | null = null;
    mswServer.use(
      http.get(`${BASE_URL}/calls`, ({ request }) => {
        receivedAuth = request.headers.get("authorization");
        return HttpResponse.json(fixture("calls-list.json"));
      }),
    );

    const client = makeClient();
    const result = await client.listCalls({ limit: 50 });

    expect(receivedAuth).toBe("Bearer test-key");
    expect(result.data).toHaveLength(2);
    expect(result.data[0]?.uuid).toBe("call-abc-123");
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
  it("fetches and parses a full call detail", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls/call-abc-123`, () =>
        HttpResponse.json(fixture("call-detail.json")),
      ),
    );
    const call = await makeClient().getCall("call-abc-123");
    expect(call.uuid).toBe("call-abc-123");
    expect(call.simpleTranscript).toHaveLength(2);
    expect(call.summary).toContain("Devis");
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
