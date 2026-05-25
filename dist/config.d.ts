import { z } from "zod";
declare const ConfigSchema: z.ZodObject<{
    apiKey: z.ZodString;
    baseUrl: z.ZodDefault<z.ZodString>;
    stateFile: z.ZodString;
    rateLimitPerMinute: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    apiKey: string;
    baseUrl: string;
    stateFile: string;
    rateLimitPerMinute: number;
}, {
    apiKey: string;
    stateFile: string;
    baseUrl?: string | undefined;
    rateLimitPerMinute?: number | undefined;
}>;
export type Config = z.infer<typeof ConfigSchema>;
export declare function loadConfig(): Config;
export {};
