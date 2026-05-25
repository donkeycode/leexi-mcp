// URL builder helpers for Leexi API endpoints.
// Keeps URL construction testable and separate from HTTP logic.

/**
 * Builds the URL for the calls list endpoint with optional query params.
 */
export function callsListUrl(
  baseUrl: string,
  params: {
    since?: string;
    limit?: number;
    page?: number;
  },
): string {
  const url = new URL(`${baseUrl}/calls`);
  if (params.since) url.searchParams.set("since", params.since);
  if (params.limit !== undefined) url.searchParams.set("per_page", String(params.limit));
  if (params.page !== undefined) url.searchParams.set("page", String(params.page));
  return url.toString();
}

/**
 * Builds the URL for a single call detail endpoint.
 */
export function callDetailUrl(baseUrl: string, uuid: string): string {
  return `${baseUrl}/calls/${encodeURIComponent(uuid)}`;
}
