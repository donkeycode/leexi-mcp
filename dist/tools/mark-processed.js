// Tool definition for leexi_mark_processed.
// Marks a Leexi call UUID as processed in the local MCP state.
// Idempotent: calling twice with the same uuid is safe.
import { z } from "zod";
// ---------------------------------------------------------------------------
// Input schema
// ---------------------------------------------------------------------------
export const MarkProcessedInputSchema = z.object({
    uuid: z.string().min(1),
    metadata: z.record(z.unknown()).optional(),
});
// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
export function createMarkProcessedTool(store) {
    return {
        name: "leexi_mark_processed",
        description: "Mark a Leexi call UUID as processed in the local MCP state. Use after a Routine has fully handled a call to avoid re-processing.",
        inputSchema: MarkProcessedInputSchema,
        handler: async (rawInput) => {
            // Parse input (no defaults here, but keeps pattern consistent with other tools).
            const input = MarkProcessedInputSchema.parse(rawInput);
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
//# sourceMappingURL=mark-processed.js.map