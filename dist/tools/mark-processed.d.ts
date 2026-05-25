import { z } from "zod";
import type { ProcessedStore } from "../store/processed-store.js";
import type { ToolDefinition } from "./list-calls.js";
export declare const MarkProcessedInputSchema: z.ZodObject<{
    uuid: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    uuid: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    uuid: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export type MarkProcessedInput = z.input<typeof MarkProcessedInputSchema>;
type ParsedMarkProcessedInput = z.infer<typeof MarkProcessedInputSchema>;
export interface MarkProcessedResult {
    uuid: string;
    alreadyProcessed: boolean;
    processedAt: string;
}
export declare function createMarkProcessedTool(store: ProcessedStore): ToolDefinition<MarkProcessedInput, MarkProcessedResult, ParsedMarkProcessedInput>;
export {};
