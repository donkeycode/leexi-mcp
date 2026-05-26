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
export declare function callsListUrl(baseUrl: string, params: {
    items?: number;
    page?: number;
    order?: string;
    dateFilter?: "created_at" | "performed_at" | "updated_at";
    from?: string;
    to?: string;
}): string;
/**
 * Builds the URL for a single call detail endpoint.
 */
export declare function callDetailUrl(baseUrl: string, uuid: string): string;
