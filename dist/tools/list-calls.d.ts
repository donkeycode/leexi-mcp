import { z } from "zod";
import type { LeexiClient } from "../leexi/client.js";
import type { CallSummary, Pagination } from "../leexi/types.js";
import type { ProcessedStore } from "../store/processed-store.js";
export declare const ListCallsInputSchema: z.ZodObject<{
    /**
     * Borne inférieure de filtrage sur `performed_at`. ISO datetime ou `YYYY-MM-DD`.
     * Mappé en interne sur `date_filter=performed_at` + `from=<since>` côté API.
     * Avant v0.4.7 on envoyait `since` brut → ignoré par l'API.
     */
    since: z.ZodOptional<z.ZodString>;
    /**
     * Borne supérieure (optionnelle) de filtrage sur `performed_at`. Utile pour
     * traiter une plage précise (ex: tous les calls de juin 2025 →
     * `since: "2025-06-01", until: "2025-06-30"`).
     */
    until: z.ZodOptional<z.ZodString>;
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
     * v0.4.7 — tri appliqué CÔTÉ API (param `order=performed_at <dir>`).
     * - "asc" (défaut) : du plus ancien au plus récent sur TOUT l'historique.
     *   La page 1 retourne réellement les calls les plus anciens, pas la
     *   fenêtre DESC inversée comme en v0.4.5-0.4.6.
     * - "desc" : du plus récent au plus ancien (polling quotidien).
     *
     * Avant v0.4.7 le tri était une illusion : l'API ignore `sort_order`
     * (le vrai nom est `order`), renvoyait toujours DESC, puis le tool
     * réinversait localement les 10 items de la page courante — ce qui
     * donnait "les 10 plus récents triés ASC", pas "le plus ancien d'abord".
     */
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    only_unprocessed: boolean;
    fields: "summary" | "full";
    sort_order: "asc" | "desc";
    page?: number | undefined;
    since?: string | undefined;
    until?: string | undefined;
}, {
    page?: number | undefined;
    since?: string | undefined;
    until?: string | undefined;
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
