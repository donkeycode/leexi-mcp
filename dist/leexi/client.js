// LeexiClient: fetch-based HTTP client for the Leexi public API.
// Uses the global fetch() (Node 22+, backed by undici) so MSW can intercept in tests.
// Features: HTTP Basic Auth (key_id + secret), Zod response parsing, retry on 429/5xx.
import { LeexiApiError } from "../errors.js";
import { callDetailUrl, callsListUrl } from "./endpoints.js";
import { CallDetailSchema, CallsListSchema } from "./types.js";
export class LeexiClient {
    apiKeyId;
    apiKey;
    baseUrl;
    maxRetries;
    retryDelayMs;
    constructor(opts) {
        this.apiKeyId = opts.apiKeyId;
        this.apiKey = opts.apiKey;
        // Strip trailing slash to keep URL building consistent.
        this.baseUrl = opts.baseUrl.replace(/\/$/, "");
        this.maxRetries = opts.maxRetries ?? 2;
        this.retryDelayMs = opts.retryDelayMs ?? 500;
    }
    /** Returns a paginated list of calls, optionally filtered by date. */
    async listCalls(params) {
        const url = callsListUrl(this.baseUrl, params);
        const json = await this.fetchJson(url);
        return CallsListSchema.parse(json);
    }
    /** Returns full detail for a single call by UUID. */
    async getCall(uuid) {
        const url = callDetailUrl(this.baseUrl, uuid);
        const json = await this.fetchJson(url);
        return CallDetailSchema.parse(json);
    }
    /**
     * Executes a GET request with retry logic.
     * Retries on 429 (Rate Limit) and 5xx errors, up to maxRetries times.
     * Honors Retry-After header when present.
     */
    async fetchJson(url) {
        let lastError;
        for (let attempt = 0; attempt <= this.maxRetries; attempt += 1) {
            try {
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        // Leexi public API uses HTTP Basic Auth: base64(KEY_ID:KEY_SECRET)
                        authorization: `Basic ${Buffer.from(`${this.apiKeyId}:${this.apiKey}`).toString("base64")}`,
                        accept: "application/json",
                        "user-agent": "leexi-mcp/0.3.0",
                    },
                });
                // Determine if we should retry (429 rate-limit or 5xx server error).
                if (res.status === 429 || res.status >= 500) {
                    if (attempt < this.maxRetries) {
                        const retryAfter = res.headers.get("retry-after");
                        const delay = parseRetryAfter(retryAfter) ?? this.retryDelayMs * (attempt + 1);
                        // Consume response body to avoid resource leaks.
                        await res.text().catch(() => null);
                        await sleep(delay);
                        continue;
                    }
                }
                // Parse body as JSON; fall back to null if body is empty/invalid.
                const body = await res.json().catch(() => null);
                if (res.status >= 200 && res.status < 300) {
                    return body;
                }
                // Non-retryable HTTP error: surface as LeexiApiError immediately.
                throw new LeexiApiError(`Leexi API ${res.status} on ${url}`, res.status, body);
            }
            catch (err) {
                // Re-throw domain errors without retry.
                if (err instanceof LeexiApiError)
                    throw err;
                lastError = err;
                if (attempt >= this.maxRetries)
                    break;
                // Network-level error: wait before retrying.
                await sleep(this.retryDelayMs * (attempt + 1));
            }
        }
        throw lastError ?? new Error("Unknown network failure");
    }
}
/**
 * Parses a Retry-After header value into milliseconds.
 * Supports both numeric seconds and HTTP-date formats.
 */
function parseRetryAfter(raw) {
    if (!raw)
        return undefined;
    // Numeric: number of seconds to wait.
    const seconds = Number(raw);
    if (Number.isFinite(seconds))
        return seconds * 1000;
    // HTTP-date: absolute point in time.
    const date = Date.parse(raw);
    if (Number.isFinite(date))
        return Math.max(0, date - Date.now());
    return undefined;
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=client.js.map