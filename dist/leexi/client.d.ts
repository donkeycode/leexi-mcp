import { type CallDetail, type CallSummary, type Pagination } from "./types.js";
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
    items?: number;
    page?: number;
    order?: string;
    dateFilter?: "created_at" | "performed_at" | "updated_at";
    from?: string;
    to?: string;
}
export interface CallsList {
    calls: CallSummary[];
    pagination: Pagination;
}
export declare class LeexiClient {
    private readonly apiKeyId;
    private readonly apiKey;
    private readonly baseUrl;
    private readonly maxRetries;
    private readonly retryDelayMs;
    constructor(opts: ClientOptions);
    /** Returns a paginated list of calls with real pagination shape. */
    listCalls(params: ListParams): Promise<CallsList>;
    /**
     * Returns full detail for a single call by UUID.
     * Unwraps the `{ data: CallDetail }` wrapper — callers receive the call directly.
     */
    getCall(uuid: string): Promise<CallDetail>;
    /**
     * Executes a GET request with retry logic.
     * Retries on 429 (Rate Limit) and 5xx errors, up to maxRetries times.
     * Honors Retry-After header when present.
     */
    private fetchJson;
}
export {};
