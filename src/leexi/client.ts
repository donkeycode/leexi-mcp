// LeexiClient: fetch-based HTTP client for the Leexi public API.
// Uses the global fetch() (Node 22+, backed by undici) so MSW can intercept in tests.
// Features: HTTP Basic Auth (key_id + secret), Zod response parsing, retry on 429/5xx.

import { LeexiApiError } from "../errors.js";
import { callDetailUrl, callsListUrl } from "./endpoints.js";
import {
  type CallDetail,
  CallDetailResponseSchema,
  type CallSummary,
  CallsListResponseSchema,
  type Pagination,
} from "./types.js";

interface ClientOptions {
  /** The public key identifier shown in Leexi → Settings → API Keys. */
  apiKeyId: string;
  /** The secret half of the Leexi key pair (shown once at creation). */
  apiKey: string;
  baseUrl: string;
  /** Max number of retries for 429/5xx responses (default: 2). */
  maxRetries?: number;
  /** Base delay in ms for exponential backoff (default: 500). */
  retryDelayMs?: number;
}

interface ListParams {
  since?: string;
  limit?: number;
  page?: number;
}

export interface CallsList {
  calls: CallSummary[];
  pagination: Pagination;
}

export class LeexiClient {
  private readonly apiKeyId: string;
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly maxRetries: number;
  private readonly retryDelayMs: number;

  constructor(opts: ClientOptions) {
    this.apiKeyId = opts.apiKeyId;
    this.apiKey = opts.apiKey;
    // Strip trailing slash to keep URL building consistent.
    this.baseUrl = opts.baseUrl.replace(/\/$/, "");
    this.maxRetries = opts.maxRetries ?? 2;
    this.retryDelayMs = opts.retryDelayMs ?? 500;
  }

  /** Returns a paginated list of calls with real pagination shape. */
  async listCalls(params: ListParams): Promise<CallsList> {
    const url = callsListUrl(this.baseUrl, params);
    const json = await this.fetchJson(url);
    const parsed = CallsListResponseSchema.parse(json);
    return { calls: parsed.data, pagination: parsed.pagination };
  }

  /**
   * Returns full detail for a single call by UUID.
   * Unwraps the `{ data: CallDetail }` wrapper — callers receive the call directly.
   */
  async getCall(uuid: string): Promise<CallDetail> {
    const url = callDetailUrl(this.baseUrl, uuid);
    const json = await this.fetchJson(url);
    const parsed = CallDetailResponseSchema.parse(json);
    return parsed.data;
  }

  /**
   * Executes a GET request with retry logic.
   * Retries on 429 (Rate Limit) and 5xx errors, up to maxRetries times.
   * Honors Retry-After header when present.
   */
  private async fetchJson(url: string): Promise<unknown> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.maxRetries; attempt += 1) {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            // Leexi public API uses HTTP Basic Auth: base64(KEY_ID:KEY_SECRET)
            authorization: `Basic ${Buffer.from(`${this.apiKeyId}:${this.apiKey}`).toString("base64")}`,
            accept: "application/json",
            "user-agent": "leexi-mcp/0.4.0",
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
      } catch (err) {
        // Re-throw domain errors without retry.
        if (err instanceof LeexiApiError) throw err;

        lastError = err as Error;
        if (attempt >= this.maxRetries) break;

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
function parseRetryAfter(raw: string | null): number | undefined {
  if (!raw) return undefined;

  // Numeric: number of seconds to wait.
  const seconds = Number(raw);
  if (Number.isFinite(seconds)) return seconds * 1000;

  // HTTP-date: absolute point in time.
  const date = Date.parse(raw);
  if (Number.isFinite(date)) return Math.max(0, date - Date.now());

  return undefined;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
