// Tool definition for leexi_list_calls.
// Wraps LeexiClient.listCalls() with an optional ProcessedStore filter.

import { z } from "zod";
import type { LeexiClient } from "../leexi/client.js";
import type { CallSummary, Pagination } from "../leexi/types.js";
import type { ProcessedStore } from "../store/processed-store.js";

// ---------------------------------------------------------------------------
// Input schema — all fields optional/defaulted so callers can pass {}
// ---------------------------------------------------------------------------

export const ListCallsInputSchema = z.object({
  /**
   * Borne inférieure de filtrage sur `performed_at`. ISO datetime ou `YYYY-MM-DD`.
   * Mappé en interne sur `date_filter=performed_at` + `from=<since>` côté API.
   * Avant v0.4.7 on envoyait `since` brut → ignoré par l'API.
   */
  since: z.string().optional(),
  /**
   * Borne supérieure (optionnelle) de filtrage sur `performed_at`. Utile pour
   * traiter une plage précise (ex: tous les calls de juin 2025 →
   * `since: "2025-06-01", until: "2025-06-30"`).
   */
  until: z.string().optional(),
  limit: z.number().int().positive().max(100).default(50),
  page: z.number().int().positive().optional(),
  only_unprocessed: z.boolean().default(false),
  /**
   * v0.4.4 — réduit la payload de listing.
   * - "summary" (défaut) : strip simple_transcript, chapters, tasks, prompts, scorecards
   *   → -95% de payload typique. Suffit pour lister/filtrer.
   * - "full" : garde tous les champs (comportement legacy v0.4.3-).
   *   Utile uniquement pour debug ou exports massifs.
   */
  fields: z.enum(["summary", "full"]).default("summary"),
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
  sort_order: z.enum(["asc", "desc"]).default("asc"),
});

// Raw (pre-default) input type: what callers actually pass in (e.g. {}).
// Using z.input so handler({}) is valid TypeScript without a cast.
export type ListCallsInput = z.input<typeof ListCallsInputSchema>;

// Parsed (post-default) type used internally once we run schema.parse().
type ParsedInput = z.infer<typeof ListCallsInputSchema>;

// ---------------------------------------------------------------------------
// Output type — uses real Leexi pagination: { page, items, count }
// ---------------------------------------------------------------------------

export interface ListCallsResult {
  calls: CallSummary[];
  pagination: Pagination;
}

// ---------------------------------------------------------------------------
// Generic ToolDefinition interface — reused by Tasks 7 and 8.
// P = parsed (post-default) shape; I = raw (pre-default) input; O = output.
// P defaults to ParsedInput to keep list-calls usage unchanged.
// ---------------------------------------------------------------------------

export interface ToolDefinition<I, O, P = ParsedInput> {
  name: string;
  description: string;
  inputSchema: z.ZodType<P, z.ZodTypeDef, I>;
  handler: (input: I) => Promise<O>;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createListCallsTool(
  client: LeexiClient,
  store: ProcessedStore,
): ToolDefinition<ListCallsInput, ListCallsResult> {
  return {
    name: "leexi_list_calls",
    description:
      "List Leexi calls. Sorted by performed_at (default: ASC, oldest first). " +
      "Default sort_order='asc' is critical for historical backfills: page 1 returns the oldest calls of your entire history (not just the oldest 10 of the recent page). Pass 'desc' for newest-first polling. " +
      "since/until = ISO datetime or YYYY-MM-DD, filter on performed_at (mapped to API params date_filter=performed_at + from/to). " +
      "Default fields='summary' returns lightweight metadata only (uuid, title, performed_at, duration, locale, owner, speakers, leexi_url, summary text) — recommended for any listing/filtering. Pass fields='full' to include simple_transcript, chapters, tasks, prompts (~30KB extra per call, only for debug/export). " +
      "Use only_unprocessed=true to skip calls already marked processed by this MCP. Pagination uses { page, items, count } — items up to 100.",
    inputSchema: ListCallsInputSchema,
    handler: async (rawInput) => {
      // Parse to apply Zod defaults before using the values.
      const input: ParsedInput = ListCallsInputSchema.parse(rawInput);

      // v0.4.7 — mapper l'API publique du tool sur les vrais noms de params Leexi :
      //   limit       → items
      //   sort_order  → order ("performed_at asc"|"performed_at desc")
      //   since/until → date_filter=performed_at + from/to
      const listParams: Parameters<typeof client.listCalls>[0] = {
        items: input.limit,
        order: `performed_at ${input.sort_order}`,
        ...(input.page !== undefined ? { page: input.page } : {}),
        ...(input.since !== undefined || input.until !== undefined
          ? {
              dateFilter: "performed_at" as const,
              ...(input.since !== undefined ? { from: input.since } : {}),
              ...(input.until !== undefined ? { to: input.until } : {}),
            }
          : {}),
      };
      const list = await client.listCalls(listParams);

      let calls = list.calls;

      // v0.4.7 — plus de tri local : l'API trie déjà via `order`. Le tri
      // côté tool des v0.4.5-0.4.6 était un mensonge (ne triait que la
      // page courante, pas l'historique).

      if (input.only_unprocessed) {
        const filtered: CallSummary[] = [];
        for (const call of calls) {
          if (!(await store.isProcessed(call.uuid))) filtered.push(call);
        }
        calls = filtered;
      }

      // v0.4.4 — Strip heavy fields in summary mode to keep listing payload small.
      // Cuts payload by ~95% for typical calls (transcript dominates).
      if (input.fields === "summary") {
        calls = calls.map((c) => stripHeavyFields(c));
      }

      return {
        calls,
        pagination: list.pagination,
      };
    },
  };
}

// ---------------------------------------------------------------------------
// stripHeavyFields — drop transcript/chapters/tasks/prompts/scorecards.
// Keeps the call object structurally valid (CallSummary type), just emptied.
// Use only_unprocessed-friendly fields untouched (uuid stays intact).
// ---------------------------------------------------------------------------
function stripHeavyFields(call: CallSummary): CallSummary {
  return {
    ...call,
    simpleTranscript: "",
    chapters: [],
    tasks: [],
    prompts: [],
    scorecards: [],
    feedbacks: [],
  };
}
