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
    /**
     * v0.4.4 — réduit la payload de listing.
     * - "summary" (défaut) : strip simple_transcript, chapters, tasks, prompts, scorecards
     *   → -95% de payload typique. Suffit pour lister/filtrer.
     * - "full" : garde tous les champs (comportement legacy v0.4.3-).
     *   Utile uniquement pour debug ou exports massifs.
     */
    fields: z.enum(["summary", "full"]).default("summary"),
});
// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
export function createListCallsTool(client, store) {
    return {
        name: "leexi_list_calls",
        description: "List Leexi calls (paginated). Default fields='summary' returns lightweight metadata only (uuid, title, performed_at, duration, locale, owner, speakers, leexi_url, summary text) — recommended for any listing/filtering use case. Pass fields='full' to include simple_transcript, chapters, tasks, prompts (~30KB extra per call, only for debug/export). Use only_unprocessed=true to skip calls already marked processed by this MCP. Pagination uses { page, items, count }.",
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
function stripHeavyFields(call) {
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
//# sourceMappingURL=list-calls.js.map