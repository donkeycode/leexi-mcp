import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { z } from "zod";
// Schema for a single processed-call entry
const EntrySchema = z.object({
    uuid: z.string(),
    processedAt: z.string(),
    metadata: z.record(z.unknown()).optional(),
});
// Schema for the full JSON file
const StoreSchema = z.object({
    version: z.literal(1),
    entries: z.array(EntrySchema),
});
/**
 * Persistent JSON store for processed call UUIDs.
 *
 * Reloads on disk-modification (mtime check) so that:
 *  - external writes (vault sync, manual edits, parallel MCP processes)
 *    are picked up without restarting the MCP server.
 *  - persist() doesn't blow away entries added by another writer between
 *    our last read and our write.
 *
 * Must call load() once before any read/write.
 */
export class ProcessedStore {
    path;
    loaded = false;
    map = new Map();
    lastMtimeMs = null;
    constructor(path) {
        this.path = path;
    }
    /** Load entries from disk; treats ENOENT as empty store. */
    async load() {
        try {
            const fileStat = await stat(this.path);
            const raw = await readFile(this.path, "utf8");
            const data = StoreSchema.parse(JSON.parse(raw));
            this.map = new Map(data.entries.map((e) => [e.uuid, e]));
            this.lastMtimeMs = fileStat.mtimeMs;
        }
        catch (err) {
            if (err.code !== "ENOENT")
                throw err;
            this.map = new Map();
            this.lastMtimeMs = null;
        }
        this.loaded = true;
    }
    /**
     * Reload from disk if the file has been modified since our last load.
     * Cheap: 1 fs.stat() syscall when up-to-date, full reparse only when stale.
     */
    async reloadIfStale() {
        try {
            const fileStat = await stat(this.path);
            if (this.lastMtimeMs === null || fileStat.mtimeMs > this.lastMtimeMs) {
                await this.load();
            }
        }
        catch (err) {
            if (err.code !== "ENOENT")
                throw err;
            // File disappeared after we had loaded it: drop in-memory state to match.
            if (this.lastMtimeMs !== null) {
                this.map = new Map();
                this.lastMtimeMs = null;
            }
        }
    }
    /** Returns true if the given UUID has been marked processed. */
    async isProcessed(uuid) {
        this.ensureLoaded();
        await this.reloadIfStale();
        return this.map.has(uuid);
    }
    /** Mark a UUID as processed and persist to disk immediately. */
    async markProcessed(uuid, metadata) {
        this.ensureLoaded();
        // Reload first so we don't overwrite entries added by another writer
        // (parallel MCP process, vault-side sync script, manual edit) since
        // our last persist.
        await this.reloadIfStale();
        this.map.set(uuid, {
            uuid,
            processedAt: new Date().toISOString(),
            ...(metadata ? { metadata } : {}),
        });
        await this.persist();
    }
    /** Return all processed entries. */
    async list() {
        this.ensureLoaded();
        await this.reloadIfStale();
        return Array.from(this.map.values());
    }
    /** Write current state to disk, creating parent directories as needed. */
    async persist() {
        await mkdir(dirname(this.path), { recursive: true });
        const payload = {
            version: 1,
            entries: Array.from(this.map.values()),
        };
        await writeFile(this.path, JSON.stringify(payload, null, 2), "utf8");
        // Track our own write so reloadIfStale() doesn't trigger a re-read on the
        // next call (we already have the freshest state in memory).
        const fileStat = await stat(this.path);
        this.lastMtimeMs = fileStat.mtimeMs;
    }
    ensureLoaded() {
        if (!this.loaded) {
            throw new Error("ProcessedStore.load() must be called before use");
        }
    }
}
//# sourceMappingURL=processed-store.js.map