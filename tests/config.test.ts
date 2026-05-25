import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadConfig } from "../src/config.js";
import { ConfigError } from "../src/errors.js";

describe("loadConfig", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns parsed config when all required vars are set", () => {
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_API_BASE_URL = "https://public-api.leexi.ai/v1";
    process.env.LEEXI_STATE_FILE = "./state/processed.json";

    const config = loadConfig();

    expect(config.apiKey).toBe("test-key");
    expect(config.baseUrl).toBe("https://public-api.leexi.ai/v1");
    expect(config.stateFile).toBe("./state/processed.json");
    expect(config.rateLimitPerMinute).toBe(50);
  });

  it("applies default base URL and rate limit when omitted", () => {
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_API_BASE_URL = undefined;
    process.env.LEEXI_RATE_LIMIT_PER_MINUTE = undefined;
    process.env.LEEXI_STATE_FILE = "./state/processed.json";

    const config = loadConfig();

    expect(config.baseUrl).toBe("https://public-api.leexi.ai/v1");
    expect(config.rateLimitPerMinute).toBe(50);
  });

  it("throws ConfigError when LEEXI_API_KEY is missing", () => {
    process.env.LEEXI_API_KEY = undefined;
    process.env.LEEXI_STATE_FILE = "./state/processed.json";

    expect(() => loadConfig()).toThrow(ConfigError);
    expect(() => loadConfig()).toThrow(/LEEXI_API_KEY/);
  });

  it("throws ConfigError on invalid rate limit", () => {
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_STATE_FILE = "./state/processed.json";
    process.env.LEEXI_RATE_LIMIT_PER_MINUTE = "not-a-number";

    expect(() => loadConfig()).toThrow(ConfigError);
  });
});
