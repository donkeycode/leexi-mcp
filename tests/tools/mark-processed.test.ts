import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ProcessedStore } from "../../src/store/processed-store.js";
import { createMarkProcessedTool } from "../../src/tools/mark-processed.js";

describe("leexi_mark_processed tool", () => {
  let dir: string;
  let store: ProcessedStore;

  beforeEach(async () => {
    dir = mkdtempSync(join(tmpdir(), "leexi-mark-"));
    store = new ProcessedStore(join(dir, "processed.json"));
    await store.load();
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("marks a uuid as processed and reports new=true", async () => {
    const tool = createMarkProcessedTool(store);
    const result = await tool.handler({ uuid: "call-1", metadata: { route: "routine" } });

    expect(result.uuid).toBe("call-1");
    expect(result.alreadyProcessed).toBe(false);
    expect(await store.isProcessed("call-1")).toBe(true);
  });

  it("reports alreadyProcessed=true when the uuid was already in the store", async () => {
    await store.markProcessed("call-1");
    const tool = createMarkProcessedTool(store);
    const result = await tool.handler({ uuid: "call-1" });
    expect(result.alreadyProcessed).toBe(true);
  });
});
