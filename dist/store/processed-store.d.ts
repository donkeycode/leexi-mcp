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
 * Simple persistent JSON store for processed call UUIDs.
 * Must call load() before any read/write operation.
 */
export declare class ProcessedStore {
    private readonly path;
    private loaded;
    private map;
    constructor(path: string);
    /** Load entries from disk; treats ENOENT as empty store. */
    load(): Promise<void>;
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
