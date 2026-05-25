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
      "List Leexi calls. Returns call metadata including title, performed_at, duration (float seconds), locale, summary (markdown), chapters, tasks (Leexi-extracted action items), and speakers. Use only_unprocessed=true to skip calls already marked processed by this MCP. Pagination uses { page, items, count }.",
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

      return {
        calls,
        pagination: list.pagination,
      };
    },
  };
}
