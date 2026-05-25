// Environment-based configuration parsed and validated with Zod
import { z } from "zod";
import { ConfigError } from "./errors.js";
const ConfigSchema = z.object({
    apiKeyId: z.string().min(1, "LEEXI_API_KEY_ID must be set"),
    apiKey: z.string().min(1, "LEEXI_API_KEY must be set"),
    baseUrl: z.string().url().default("https://public-api.leexi.ai/v1"),
    stateFile: z.string().min(1, "LEEXI_STATE_FILE must be set"),
    rateLimitPerMinute: z.coerce.number().int().positive().default(50),
});
export function loadConfig() {
    const raw = {
        apiKeyId: process.env.LEEXI_API_KEY_ID,
        apiKey: process.env.LEEXI_API_KEY,
        baseUrl: process.env.LEEXI_API_BASE_URL,
        stateFile: process.env.LEEXI_STATE_FILE,
        rateLimitPerMinute: process.env.LEEXI_RATE_LIMIT_PER_MINUTE,
    };
    // Map Zod field names back to their env var names for clear error messages
    const fieldToEnvVar = {
        apiKeyId: "LEEXI_API_KEY_ID",
        apiKey: "LEEXI_API_KEY",
        baseUrl: "LEEXI_API_BASE_URL",
        stateFile: "LEEXI_STATE_FILE",
        rateLimitPerMinute: "LEEXI_RATE_LIMIT_PER_MINUTE",
    };
    const result = ConfigSchema.safeParse(raw);
    if (!result.success) {
        const issues = result.error.issues
            .map((i) => {
            const field = i.path.join(".");
            const envVar = fieldToEnvVar[field] ?? field;
            return `${envVar}: ${i.message}`;
        })
            .join("; ");
        throw new ConfigError(`Invalid configuration: ${issues}`);
    }
    return result.data;
}
//# sourceMappingURL=config.js.map