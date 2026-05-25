/**
 * Builds the URL for the calls list endpoint with optional query params.
 */
export declare function callsListUrl(baseUrl: string, params: {
    since?: string;
    limit?: number;
    page?: number;
}): string;
/**
 * Builds the URL for a single call detail endpoint.
 */
export declare function callDetailUrl(baseUrl: string, uuid: string): string;
