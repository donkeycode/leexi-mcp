// URL builder helpers for Leexi API endpoints.
// Keeps URL construction testable and separate from HTTP logic.

/**
 * Builds the URL for the calls list endpoint with optional query params.
 *
 * v0.4.7 — utilise les noms de paramètres réels de l'API publique Leexi
 * (cf. https://docs.public-api.leexi.ai/reference/list-calls) :
 *   - `items` (pas `per_page`) pour la taille de page
 *   - `order` au format `"<field> <direction>"`, ex: `"performed_at asc"`
 *   - `date_filter` + `from` + `to` pour le filtrage par plage de date
 *
 * Avant v0.4.7 nous envoyions `per_page` et `since`, tous deux IGNORÉS
 * par l'API → page cappée à 10 calls + aucun tri, d'où l'illusion
 * d'un "sort_order asc" qui ne triait en réalité que la page DESC reçue.
 */
export function callsListUrl(
  baseUrl: string,
  params: {
    items?: number;
    page?: number;
    order?: string;
    dateFilter?: "created_at" | "performed_at" | "updated_at";
    from?: string;
    to?: string;
  },
): string {
  const url = new URL(`${baseUrl}/calls`);
  if (params.items !== undefined) url.searchParams.set("items", String(params.items));
  if (params.page !== undefined) url.searchParams.set("page", String(params.page));
  if (params.order) url.searchParams.set("order", params.order);
  if (params.dateFilter) url.searchParams.set("date_filter", params.dateFilter);
  if (params.from) url.searchParams.set("from", params.from);
  if (params.to) url.searchParams.set("to", params.to);
  return url.toString();
}

/**
 * Builds the URL for a single call detail endpoint.
 */
export function callDetailUrl(baseUrl: string, uuid: string): string {
  return `${baseUrl}/calls/${encodeURIComponent(uuid)}`;
}
