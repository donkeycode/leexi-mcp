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
    /**
     * v0.4.5 — tri par performed_at appliqué CÔTÉ TOOL (après réception API).
     * - "asc" (défaut) : du plus ancien au plus récent. Critique pour la reprise
     *   historique : les fiches client se construisent dans l'ordre logique
     *   (R1 → R2 → kickoff → steerco) au lieu de l'inverse.
     * - "desc" : du plus récent au plus ancien. Utile pour "qu'est-ce qui s'est
     *   passé hier" ou polling continu.
     *
     * Important : le tri est appliqué AVANT le filter only_unprocessed et AVANT
     * le strip fields, sur l'ensemble retourné par l'API pour cette page.
     */
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    only_unprocessed: boolean;
    fields: "summary" | "full";
    sort_order: "asc" | "desc";
    since?: string | undefined;
    page?: number | undefined;
}, {
    since?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    only_unprocessed?: boolean | undefined;
    fields?: "summary" | "full" | undefined;
    sort_order?: "asc" | "desc" | undefined;
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
