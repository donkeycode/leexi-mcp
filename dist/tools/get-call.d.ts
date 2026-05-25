import { z } from "zod";
import type { LeexiClient } from "../leexi/client.js";
import type { CallDetail } from "../leexi/types.js";
import type { ToolDefinition } from "./list-calls.js";
export declare const GetCallInputSchema: z.ZodObject<{
    uuid: z.ZodString;
    include_transcript: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    uuid: string;
    include_transcript: boolean;
}, {
    uuid: string;
    include_transcript?: boolean | undefined;
}>;
export type GetCallInput = z.input<typeof GetCallInputSchema>;
type ParsedGetCallInput = z.infer<typeof GetCallInputSchema>;
export declare function createGetCallTool(client: LeexiClient): ToolDefinition<GetCallInput, CallDetail, ParsedGetCallInput>;
export {};
