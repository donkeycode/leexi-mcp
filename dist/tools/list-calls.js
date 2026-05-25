// Tool definition for leexi_list_calls.
// Wraps LeexiClient.listCalls() with an optional ProcessedStore filter.
import { z } from "zod";
// ---------------------------------------------------------------------------
// Input schema — all fields optional/defaulted so callers can pass {}
// ---------------------------------------------------------------------------
export const ListCallsInputSchema = z.object({
    since: z.string().datetime().optional(),
    limit: z.number().int().positive().max(100).default(50),
    page: z.number().int().positive().optional(),
    only_unprocessed: z.boolean().default(false),
});
// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
export function createListCallsTool(client, store) {
    return {
        name: "leexi_list_calls",
        description: "List Leexi calls. Returns call metadata including title, performed_at, duration (float seconds), locale, summary (markdown), chapters, tasks (Leexi-extracted action items), and speakers. Use only_unprocessed=true to skip calls already marked processed by this MCP. Pagination uses { page, items, count }.",
        inputSchema: ListCallsInputSchema,
        handler: async (rawInput) => {
            // Parse to apply Zod defaults before using the values.
            const input = ListCallsInputSchema.parse(rawInput);
            // Build params object; omit undefined fields to satisfy exactOptionalPropertyTypes.
            const listParams = {
                limit: input.limit,
                ...(input.since !== undefined ? { since: input.since } : {}),
                ...(input.page !== undefined ? { page: input.page } : {}),
            };
            const list = await client.listCalls(listParams);
            let calls = list.calls;
            if (input.only_unprocessed) {
                const filtered = [];
                for (const call of calls) {
                    if (!(await store.isProcessed(call.uuid)))
                        filtered.push(call);
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
//# sourceMappingURL=list-calls.js.map