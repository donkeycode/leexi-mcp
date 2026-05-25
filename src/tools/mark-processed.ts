// Tool definition for leexi_mark_processed.
// Marks a Leexi call UUID as processed in the local MCP state.
// Idempotent: calling twice with the same uuid is safe.

import { z } from "zod";
import type { ProcessedStore } from "../store/processed-store.js";
import type { ToolDefinition } from "./list-calls.js";

// ---------------------------------------------------------------------------
// Input schema
// ---------------------------------------------------------------------------

export const MarkProcessedInputSchema = z.object({
  uuid: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

// Raw (pre-default) input type using z.input<> for consistency with Tasks 6/7.
// metadata is optional so handler({ uuid: "..." }) is valid without a cast.
export type MarkProcessedInput = z.input<typeof MarkProcessedInputSchema>;

// Parsed (post-default) type — identical here since there are no Zod defaults.
type ParsedMarkProcessedInput = z.infer<typeof MarkProcessedInputSchema>;

// ---------------------------------------------------------------------------
// Output type
// ---------------------------------------------------------------------------

export interface MarkProcessedResult {
  uuid: string;
  alreadyProcessed: boolean;
  processedAt: string;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createMarkProcessedTool(
  store: ProcessedStore,
): ToolDefinition<MarkProcessedInput, MarkProcessedResult, ParsedMarkProcessedInput> {
  return {
    name: "leexi_mark_processed",
    description:
      "Mark a Leexi call UUID as processed in the local MCP state. Use after a Routine has fully handled a call to avoid re-processing.",
    inputSchema: MarkProcessedInputSchema,
    handler: async (rawInput) => {
      // Parse input (no defaults here, but keeps pattern consistent with other tools).
      const input: ParsedMarkProcessedInput = MarkProcessedInputSchema.parse(rawInput);

      // Check before writing so we can report the correct alreadyProcessed flag.
      const alreadyProcessed = await store.isProcessed(input.uuid);

      // markProcessed is idempotent: safe to call even if already present.
      await store.markProcessed(input.uuid, input.metadata);

      return {
        uuid: input.uuid,
        alreadyProcessed,
        processedAt: new Date().toISOString(),
      };
    },
  };
}
