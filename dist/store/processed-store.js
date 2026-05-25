import { mkdir, readFile, writeFile } from "node:fs/promises";
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
 * Simple persistent JSON store for processed call UUIDs.
 * Must call load() before any read/write operation.
 */
export class ProcessedStore {
    path;
    loaded = false;
    map = new Map();
    constructor(path) {
        this.path = path;
    }
    /** Load entries from disk; treats ENOENT as empty store. */
    async load() {
        try {
            const raw = await readFile(this.path, "utf8");
            const data = StoreSchema.parse(JSON.parse(raw));
            this.map = new Map(data.entries.map((e) => [e.uuid, e]));
        }
        catch (err) {
            if (err.code !== "ENOENT")
                throw err;
            this.map = new Map();
        }
        this.loaded = true;
    }
    /** Returns true if the given UUID has been marked processed. */
    async isProcessed(uuid) {
        this.ensureLoaded();
        return this.map.has(uuid);
    }
    /** Mark a UUID as processed and persist to disk immediately. */
    async markProcessed(uuid, metadata) {
        this.ensureLoaded();
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
    }
    ensureLoaded() {
        if (!this.loaded) {
            throw new Error("ProcessedStore.load() must be called before use");
        }
    }
}
//# sourceMappingURL=processed-store.js.map