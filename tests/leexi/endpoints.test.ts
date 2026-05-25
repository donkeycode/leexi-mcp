// Tests for URL builder helpers in src/leexi/endpoints.ts

import { describe, expect, it } from "vitest";
import { callDetailUrl, callsListUrl } from "../../src/leexi/endpoints.js";

const BASE = "https://public-api.leexi.ai/v1";

describe("callsListUrl", () => {
  it("builds the bare URL with no params", () => {
    const url = callsListUrl(BASE, {});
    expect(url).toBe(`${BASE}/calls`);
  });

  it("adds since as a query param", () => {
    const url = callsListUrl(BASE, { since: "2026-05-25T10:00:00Z" });
    // URL class percent-encodes colons in query params
    expect(url).toContain("since=2026-05-25T10%3A00%3A00Z");
  });

  it("adds per_page from limit param", () => {
    const url = callsListUrl(BASE, { limit: 25 });
    expect(url).toContain("per_page=25");
  });

  it("adds page query param", () => {
    const url = callsListUrl(BASE, { page: 3 });
    expect(url).toContain("page=3");
  });

  it("URL-encodes special chars in since value", () => {
    const url = callsListUrl(BASE, { since: "2026-05-25T10:00:00Z" });
    // Colons must be encoded as %3A
    expect(url).toMatch(/since=.*%3A.*%3A/);
  });
});

describe("callDetailUrl", () => {
  it("builds a basic URL with a plain uuid", () => {
    const url = callDetailUrl(BASE, "call-abc-123");
    expect(url).toBe(`${BASE}/calls/call-abc-123`);
  });

  it("URL-encodes special chars in uuid", () => {
    const url = callDetailUrl(BASE, "call/with spaces");
    expect(url).toContain("call%2Fwith%20spaces");
  });
});
