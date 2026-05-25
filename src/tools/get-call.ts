// Tool definition for leexi_get_call.
// Wraps LeexiClient.getCall(uuid) with optional transcript omission.

import { z } from "zod";
import type { LeexiClient } from "../leexi/client.js";
import type { CallDetail } from "../leexi/types.js";
import type { ToolDefinition } from "./list-calls.js";

// ---------------------------------------------------------------------------
// Input schema — uuid required, include_transcript defaults to true
// ---------------------------------------------------------------------------

export const GetCallInputSchema = z.object({
  uuid: z.string().min(1),
  include_transcript: z.boolean().default(true),
});

// Raw (pre-default) input type: callers may omit include_transcript.
// Using z.input<> so handler({ uuid: "..." }) is valid without a cast.
export type GetCallInput = z.input<typeof GetCallInputSchema>;

// Parsed (post-default) type used internally after schema.parse().
type ParsedGetCallInput = z.infer<typeof GetCallInputSchema>;

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createGetCallTool(
  client: LeexiClient,
): ToolDefinition<GetCallInput, CallDetail, ParsedGetCallInput> {
  return {
    name: "leexi_get_call",
    description:
      "Fetch a single Leexi call by UUID, including the full transcription. Set include_transcript=false to omit transcripts (keeps summary + topics).",
    inputSchema: GetCallInputSchema,
    handler: async (rawInput) => {
      // Parse to apply Zod defaults before using the values.
      const input: ParsedGetCallInput = GetCallInputSchema.parse(rawInput);

      const call = await client.getCall(input.uuid);

      if (!input.include_transcript) {
        // Strip transcript arrays while preserving all other fields.
        return { ...call, simpleTranscript: [], transcript: [] };
      }

      return call;
    },
  };
}
