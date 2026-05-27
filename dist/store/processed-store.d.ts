import { z } from "zod";
declare const EntrySchema: z.ZodObject<{
    uuid: z.ZodString;
    processedAt: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    uuid: string;
    processedAt: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    uuid: string;
    processedAt: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export type ProcessedEntry = z.infer<typeof EntrySchema>;
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
export declare class ProcessedStore {
    private readonly path;
    private loaded;
    private map;
    private lastMtimeMs;
    constructor(path: string);
    /** Load entries from disk; treats ENOENT as empty store. */
    load(): Promise<void>;
    /**
     * Reload from disk if the file has been modified since our last load.
     * Cheap: 1 fs.stat() syscall when up-to-date, full reparse only when stale.
     */
    private reloadIfStale;
    /** Returns true if the given UUID has been marked processed. */
    isProcessed(uuid: string): Promise<boolean>;
    /** Mark a UUID as processed and persist to disk immediately. */
    markProcessed(uuid: string, metadata?: Record<string, unknown>): Promise<void>;
    /** Return all processed entries. */
    list(): Promise<ProcessedEntry[]>;
    /** Write current state to disk, creating parent directories as needed. */
    private persist;
    private ensureLoaded;
}
export {};
