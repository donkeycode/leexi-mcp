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
  const client = new LeexiClient({ apiKey: "k", baseUrl: BASE_URL });

  it("returns full call detail with transcript", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls/call-abc-123`, () =>
        HttpResponse.json(fixture("call-detail.json")),
      ),
    );

    const tool = createGetCallTool(client);
    const result = await tool.handler({ uuid: "call-abc-123" });

    expect(result.uuid).toBe("call-abc-123");
    expect(result.simpleTranscript).toHaveLength(2);
    expect(result.participants.map((p) => p.name)).toContain("Cédric Lombardot");
  });

  it("returns lite payload when include_transcript=false", async () => {
    mswServer.use(
      http.get(`${BASE_URL}/calls/call-abc-123`, () =>
        HttpResponse.json(fixture("call-detail.json")),
      ),
    );

    const tool = createGetCallTool(client);
    const result = await tool.handler({ uuid: "call-abc-123", include_transcript: false });

    expect(result.simpleTranscript).toEqual([]);
    expect(result.transcript).toEqual([]);
    expect(result.summary).toContain("Devis");
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
