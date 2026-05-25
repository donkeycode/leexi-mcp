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
        description: "Fetch a single Leexi call by UUID, including the full transcription. Set include_transcript=false to omit transcripts (keeps summary + topics).",
        inputSchema: GetCallInputSchema,
        handler: async (rawInput) => {
            // Parse to apply Zod defaults before using the values.
            const input = GetCallInputSchema.parse(rawInput);
            const call = await client.getCall(input.uuid);
            if (!input.include_transcript) {
                // Strip transcript arrays while preserving all other fields.
                return { ...call, simpleTranscript: [], transcript: [] };
            }
            return call;
        },
    };
}
//# sourceMappingURL=get-call.js.map