import { mkdtempSync, rmSync } from "node:fs";
import { readFile, utimes, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ProcessedStore } from "../../src/store/processed-store.js";

// Some filesystems (macOS HFS+, ext3, FAT) only have 1s mtime resolution, so
// two writes in the same second can produce identical mtimeMs and defeat the
// stale-check. Bump mtime explicitly to simulate a later external write.
async function touchInFuture(path: string): Promise<void> {
  const future = new Date(Date.now() + 2000);
  await utimes(path, future, future);
}

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

  it("picks up entries written externally without a reload() call", async () => {
    const store = new ProcessedStore(storePath);
    await store.load();
    expect(await store.isProcessed("external-1")).toBe(false);

    // Another writer (vault sync, parallel MCP process) drops a new state file.
    await writeFile(
      storePath,
      JSON.stringify({
        version: 1,
        entries: [{ uuid: "external-1", processedAt: "2026-05-27T00:00:00Z" }],
      }),
      "utf8",
    );
    await touchInFuture(storePath);

    // Same store instance, no explicit load() — mtime check should trigger reload.
    expect(await store.isProcessed("external-1")).toBe(true);
  });

  it("does not overwrite entries added externally between two markProcessed calls", async () => {
    const store = new ProcessedStore(storePath);
    await store.load();
    await store.markProcessed("ours-1");

    // External writer appends an entry while we hold a stale in-memory map.
    const current = JSON.parse(await readFile(storePath, "utf8"));
    current.entries.push({ uuid: "external-2", processedAt: "2026-05-27T00:00:00Z" });
    await writeFile(storePath, JSON.stringify(current), "utf8");
    await touchInFuture(storePath);

    // Our next mark should reload first, then add — both entries survive.
    await store.markProcessed("ours-2");

    const final = JSON.parse(await readFile(storePath, "utf8"));
    const uuids: string[] = final.entries.map((e: { uuid: string }) => e.uuid).sort();
    expect(uuids).toEqual(["external-2", "ours-1", "ours-2"]);
  });
});
