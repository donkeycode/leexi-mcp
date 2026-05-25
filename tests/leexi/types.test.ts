import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CallDetailSchema, CallSummarySchema, CallsListSchema } from "../../src/leexi/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, "..", "fixtures");

function loadFixture(name: string): unknown {
  return JSON.parse(readFileSync(join(fixturesDir, name), "utf8"));
}

describe("Leexi schemas", () => {
  it("parses a full call detail fixture", () => {
    const raw = loadFixture("call-detail.json");
    const parsed = CallDetailSchema.parse(raw);
    expect(parsed.uuid).toBe("call-abc-123");
    expect(parsed.participants).toHaveLength(2);
    expect(parsed.simpleTranscript[0]?.speaker).toBe("Cédric Lombardot");
    expect(parsed.language).toBe("fr");
  });

  it("parses a calls list fixture", () => {
    const raw = loadFixture("calls-list.json");
    const parsed = CallsListSchema.parse(raw);
    expect(parsed.data).toHaveLength(2);
    expect(parsed.meta.total).toBe(2);
  });

  it("treats topics and summary as optional in summaries", () => {
    const minimal = {
      uuid: "x",
      title: "t",
      created_at: "2026-05-25T10:00:00Z",
      duration_seconds: 0,
      language: "fr",
      status: "completed",
      recording_url: "https://x",
      participants: [],
    };
    expect(() => CallSummarySchema.parse(minimal)).not.toThrow();
  });

  it("rejects a call with missing uuid", () => {
    expect(() => CallSummarySchema.parse({ title: "t" })).toThrow();
  });
});
