import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ProcessedStore } from "../../src/store/processed-store.js";

describe("ProcessedStore", () => {
  let dir: string;
  let storePath: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "leexi-store-"));
    storePath = join(dir, "processed.json");
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("returns false for unknown ids", async () => {
    const store = new ProcessedStore(storePath);
    await store.load();
    expect(await store.isProcessed("call-1")).toBe(false);
  });

  it("marks an id as processed and persists across loads", async () => {
    const first = new ProcessedStore(storePath);
    await first.load();
    await first.markProcessed("call-1", { source: "test" });
    expect(await first.isProcessed("call-1")).toBe(true);

    const second = new ProcessedStore(storePath);
    await second.load();
    expect(await second.isProcessed("call-1")).toBe(true);
  });

  it("creates parent directories when missing", async () => {
    const deep = join(dir, "nested", "level", "processed.json");
    const store = new ProcessedStore(deep);
    await store.load();
    await store.markProcessed("call-x");
    expect(await store.isProcessed("call-x")).toBe(true);
  });

  it("lists all processed entries", async () => {
    const store = new ProcessedStore(storePath);
    await store.load();
    await store.markProcessed("a");
    await store.markProcessed("b");
    const list = await store.list();
    expect(list.map((e) => e.uuid).sort()).toEqual(["a", "b"]);
  });
});
