// Tool definition for leexi_get_call.
// Wraps LeexiClient.getCall(uuid) with optional transcript omission.
import { z } from "zod";
// ---------------------------------------------------------------------------
// Input schema — uuid required, include_transcript defaults to true
// ---------------------------------------------------------------------------
export const GetCallInputSchema = z.object({
    uuid: z.string().min(1),
    include_transcript: z.boolean().default(true),
});
// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
export function createGetCallTool(client) {
    return {
        name: "leexi_get_call",
        description: "Fetch a single Leexi call by UUID. Returns full call detail: title, performed_at, duration (float seconds), locale, summary (markdown text), simple_transcript (full text string with inline '(HH:MM:SS - HH:MM:SS)' timestamps — read directly), chapters (AI-generated chapter summaries), tasks (Leexi-extracted action items), speakers, participating_users, call_topics, and the word-level transcript array. Set include_transcript=false to get a lite payload (metadata only): simple_transcript becomes '', transcript/chapters/call_topics are emptied — useful when only the summary and tasks matter.",
        inputSchema: GetCallInputSchema,
        handler: async (rawInput) => {
            // Parse to apply Zod defaults before using the values.
            const input = GetCallInputSchema.parse(rawInput);
            const call = await client.getCall(input.uuid);
            if (!input.include_transcript) {
                // Strip transcript data while preserving all other metadata fields.
                return {
                    ...call,
                    simpleTranscript: "",
                    transcript: [],
                    chapters: [],
                    callTopics: [],
                };
            }
            return call;
        },
    };
}
//# sourceMappingURL=get-call.js.map