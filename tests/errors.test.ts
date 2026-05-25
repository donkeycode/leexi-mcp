// Tests for custom error classes in src/errors.ts

import { describe, expect, it } from "vitest";
import { ConfigError, LeexiApiError, ValidationError } from "../src/errors.js";

describe("ConfigError", () => {
  it("has name === 'ConfigError'", () => {
    const err = new ConfigError("missing api key");
    expect(err.name).toBe("ConfigError");
  });

  it("preserves the message", () => {
    const err = new ConfigError("missing api key");
    expect(err.message).toBe("missing api key");
  });

  it("is instanceof Error", () => {
    const err = new ConfigError("oops");
    expect(err).toBeInstanceOf(Error);
  });
});

describe("LeexiApiError", () => {
  it("has name === 'LeexiApiError'", () => {
    const err = new LeexiApiError("Leexi API 401", 401);
    expect(err.name).toBe("LeexiApiError");
  });

  it("exposes status and body", () => {
    const body = { error: "unauthorized" };
    const err = new LeexiApiError("Leexi API 401", 401, body);
    expect(err.status).toBe(401);
    expect(err.body).toEqual(body);
  });

  it("is instanceof Error", () => {
    const err = new LeexiApiError("fail", 500);
    expect(err).toBeInstanceOf(Error);
  });
});

describe("ValidationError", () => {
  it("has name === 'ValidationError'", () => {
    const err = new ValidationError("bad input", []);
    expect(err.name).toBe("ValidationError");
  });

  it("exposes issues", () => {
    const issues = [{ path: ["uuid"], message: "Required" }];
    const err = new ValidationError("bad input", issues);
    expect(err.issues).toEqual(issues);
  });

  it("is instanceof Error", () => {
    const err = new ValidationError("oops", []);
    expect(err).toBeInstanceOf(Error);
  });
});
