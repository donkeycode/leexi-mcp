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
  since: z.string().datetime().optional(),
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
      "List Leexi calls (paginated). Default fields='summary' returns lightweight metadata only (uuid, title, performed_at, duration, locale, owner, speakers, leexi_url, summary text) — recommended for any listing/filtering use case. Pass fields='full' to include simple_transcript, chapters, tasks, prompts (~30KB extra per call, only for debug/export). Use only_unprocessed=true to skip calls already marked processed by this MCP. Pagination uses { page, items, count }.",
    inputSchema: ListCallsInputSchema,
    handler: async (rawInput) => {
      // Parse to apply Zod defaults before using the values.
      const input: ParsedInput = ListCallsInputSchema.parse(rawInput);

      // Build params object; omit undefined fields to satisfy exactOptionalPropertyTypes.
      const listParams: Parameters<typeof client.listCalls>[0] = {
        limit: input.limit,
        ...(input.since !== undefined ? { since: input.since } : {}),
        ...(input.page !== undefined ? { page: input.page } : {}),
      };
      const list = await client.listCalls(listParams);

      let calls = list.calls;

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
