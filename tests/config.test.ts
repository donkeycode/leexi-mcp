import { homedir } from "node:os";
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
    process.env.LEEXI_API_KEY_ID = "test-id";
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_API_BASE_URL = "https://public-api.leexi.ai/v1";
    process.env.LEEXI_STATE_FILE = "./state/processed.json";

    const config = loadConfig();

    expect(config.apiKeyId).toBe("test-id");
    expect(config.apiKey).toBe("test-key");
    expect(config.baseUrl).toBe("https://public-api.leexi.ai/v1");
    expect(config.stateFile).toBe("./state/processed.json");
    expect(config.rateLimitPerMinute).toBe(50);
  });

  it("applies default base URL and rate limit when omitted", () => {
    process.env.LEEXI_API_KEY_ID = "test-id";
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_API_BASE_URL = undefined;
    process.env.LEEXI_RATE_LIMIT_PER_MINUTE = undefined;
    process.env.LEEXI_STATE_FILE = "./state/processed.json";

    const config = loadConfig();

    expect(config.baseUrl).toBe("https://public-api.leexi.ai/v1");
    expect(config.rateLimitPerMinute).toBe(50);
  });

  it("throws ConfigError when LEEXI_API_KEY_ID is missing", () => {
    process.env.LEEXI_API_KEY_ID = undefined;
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_STATE_FILE = "./state/processed.json";

    expect(() => loadConfig()).toThrow(ConfigError);
    expect(() => loadConfig()).toThrow(/LEEXI_API_KEY_ID/);
  });

  it("throws ConfigError when LEEXI_API_KEY is missing", () => {
    process.env.LEEXI_API_KEY_ID = "test-id";
    process.env.LEEXI_API_KEY = undefined;
    process.env.LEEXI_STATE_FILE = "./state/processed.json";

    expect(() => loadConfig()).toThrow(ConfigError);
    expect(() => loadConfig()).toThrow(/LEEXI_API_KEY/);
  });

  it("throws ConfigError on invalid rate limit", () => {
    process.env.LEEXI_API_KEY_ID = "test-id";
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_STATE_FILE = "./state/processed.json";
    process.env.LEEXI_RATE_LIMIT_PER_MINUTE = "not-a-number";

    expect(() => loadConfig()).toThrow(ConfigError);
  });

  // The MCP launcher (Claude Code) sometimes injects `.mcp.json` env values
  // without performing shell substitution, so a path declared as
  // `${HOME}/foo` arrives in the child process as the literal string
  // `${HOME}/foo`. loadConfig() must expand these so the path is usable.

  it("expands ${HOME} in LEEXI_STATE_FILE", () => {
    process.env.LEEXI_API_KEY_ID = "test-id";
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_STATE_FILE = "${HOME}/.local/state/leexi-mcp/processed-calls.json";

    const config = loadConfig();

    expect(config.stateFile).toBe(`${homedir()}/.local/state/leexi-mcp/processed-calls.json`);
  });

  it("expands $HOME in LEEXI_STATE_FILE", () => {
    process.env.LEEXI_API_KEY_ID = "test-id";
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_STATE_FILE = "$HOME/.local/state/leexi-mcp/processed-calls.json";

    const config = loadConfig();

    expect(config.stateFile).toBe(`${homedir()}/.local/state/leexi-mcp/processed-calls.json`);
  });

  it("expands ~/ at start of LEEXI_STATE_FILE", () => {
    process.env.LEEXI_API_KEY_ID = "test-id";
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_STATE_FILE = "~/.local/state/leexi-mcp/processed-calls.json";

    const config = loadConfig();

    expect(config.stateFile).toBe(`${homedir()}/.local/state/leexi-mcp/processed-calls.json`);
  });

  it("leaves an absolute path untouched", () => {
    process.env.LEEXI_API_KEY_ID = "test-id";
    process.env.LEEXI_API_KEY = "test-key";
    process.env.LEEXI_STATE_FILE = "/var/lib/leexi-mcp/processed.json";

    const config = loadConfig();

    expect(config.stateFile).toBe("/var/lib/leexi-mcp/processed.json");
  });
});
