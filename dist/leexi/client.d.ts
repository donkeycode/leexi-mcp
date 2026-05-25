import { type CallDetail, type CallsList } from "./types.js";
interface ClientOptions {
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
export declare class LeexiClient {
    private readonly apiKey;
    private readonly baseUrl;
    private readonly maxRetries;
    private readonly retryDelayMs;
    constructor(opts: ClientOptions);
    /** Returns a paginated list of calls, optionally filtered by date. */
    listCalls(params: ListParams): Promise<CallsList>;
    /** Returns full detail for a single call by UUID. */
    getCall(uuid: string): Promise<CallDetail>;
    /**
     * Executes a GET request with retry logic.
     * Retries on 429 (Rate Limit) and 5xx errors, up to maxRetries times.
     * Honors Retry-After header when present.
     */
    private fetchJson;
}
export {};
