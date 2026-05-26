import { z } from "zod";
import type { LeexiClient } from "../leexi/client.js";
import type { CallSummary, Pagination } from "../leexi/types.js";
import type { ProcessedStore } from "../store/processed-store.js";
export declare const ListCallsInputSchema: z.ZodObject<{
    since: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
    only_unprocessed: z.ZodDefault<z.ZodBoolean>;
    /**
     * v0.4.4 — réduit la payload de listing.
     * - "summary" (défaut) : strip simple_transcript, chapters, tasks, prompts, scorecards
     *   → -95% de payload typique. Suffit pour lister/filtrer.
     * - "full" : garde tous les champs (comportement legacy v0.4.3-).
     *   Utile uniquement pour debug ou exports massifs.
     */
    fields: z.ZodDefault<z.ZodEnum<["summary", "full"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    only_unprocessed: boolean;
    fields: "summary" | "full";
    since?: string | undefined;
    page?: number | undefined;
}, {
    since?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    only_unprocessed?: boolean | undefined;
    fields?: "summary" | "full" | undefined;
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
