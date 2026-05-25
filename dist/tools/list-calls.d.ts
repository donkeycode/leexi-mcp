import { z } from "zod";
import type { LeexiClient } from "../leexi/client.js";
import type { CallSummary, Pagination } from "../leexi/types.js";
import type { ProcessedStore } from "../store/processed-store.js";
export declare const ListCallsInputSchema: z.ZodObject<{
    since: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
    only_unprocessed: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    only_unprocessed: boolean;
    since?: string | undefined;
    page?: number | undefined;
}, {
    since?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    only_unprocessed?: boolean | undefined;
}>;
export type ListCallsInput = z.input<typeof ListCallsInputSchema>;
type ParsedInput = z.infer<typeof ListCallsInputSchema>;
export interface ListCallsResult {
    calls: CallSummary[];
    pagination: Pagination;
}
export interface ToolDefinition<I, O, P = ParsedInput> {
    name: string;
    description: string;
    inputSchema: z.ZodType<P, z.ZodTypeDef, I>;
    handler: (input: I) => Promise<O>;
}
export declare function createListCallsTool(client: LeexiClient, store: ProcessedStore): ToolDefinition<ListCallsInput, ListCallsResult>;
export {};
