// Tests for URL builder helpers in src/leexi/endpoints.ts

import { describe, expect, it } from "vitest";
import { callDetailUrl, callsListUrl } from "../../src/leexi/endpoints.js";

const BASE = "https://public-api.leexi.ai/v1";

describe("callsListUrl", () => {
  it("builds the bare URL with no params", () => {
    const url = callsListUrl(BASE, {});
    expect(url).toBe(`${BASE}/calls`);
  });

  it("adds items query param (mapped from items, not per_page)", () => {
    const url = callsListUrl(BASE, { items: 25 });
    expect(url).toContain("items=25");
    expect(url).not.toContain("per_page");
  });

  it("adds page query param", () => {
    const url = callsListUrl(BASE, { page: 3 });
    expect(url).toContain("page=3");
  });

  it("adds order query param verbatim (Leexi format: '<field> <dir>')", () => {
    const url = callsListUrl(BASE, { order: "performed_at asc" });
    // URL class percent-encodes the space as +
    expect(url).toMatch(/order=performed_at(\+|%20)asc/);
  });

  it("adds date_filter + from + to when filtering by date range", () => {
    const url = callsListUrl(BASE, {
      dateFilter: "performed_at",
      from: "2025-06-01",
      to: "2025-06-30",
    });
    expect(url).toContain("date_filter=performed_at");
    expect(url).toContain("from=2025-06-01");
    expect(url).toContain("to=2025-06-30");
  });

  it("URL-encodes special chars in from value (ISO datetime)", () => {
    const url = callsListUrl(BASE, { from: "2026-05-25T10:00:00Z" });
    expect(url).toMatch(/from=2026-05-25T10%3A00%3A00Z/);
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
