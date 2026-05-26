# Changelog

All notable changes to `@donkeycode/leexi-mcp` will be documented here. Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/).

## [Unreleased]

## [0.4.7] — 2026-05-26

### Fixed (bug majeur)

- **Le tri par `performed_at` est maintenant RÉEL sur tout l'historique**, plus juste sur la page courante. Avant v0.4.7 le `sort_order: "asc"` était un mensonge contractuel : l'API ignorait le paramètre (car le bon nom est `order`, pas `sort_order`), renvoyait toujours du DESC, et le tool réinversait localement les 10 calls reçus → on obtenait "les 10 plus récents triés ASC" au lieu de "le plus ancien d'abord". Symptôme observable : sur 864 calls dans l'historique, demander la page 1 ASC renvoyait des calls de mai 2026 au lieu de mars 2024 (1er call réel).
- **Le paramètre `limit` est maintenant respecté** (jusqu'à 100). Avant v0.4.7 on envoyait `per_page` côté API alors que le vrai nom est `items`, donc l'API tombait sur son défaut (10) quelle que soit la valeur demandée.
- **Le paramètre `since` filtre maintenant réellement par date**. Avant v0.4.7 on envoyait `since=<ISO>` brut alors que l'API attend `date_filter=performed_at` + `from=<date>`. Conséquence : la routine `--since=2024-05-26 --obsidian-only` recevait la page DESC complète au lieu des plus anciens calls.

### Changed

- `leexi_list_calls` mappe désormais sa façade publique (stable pour les callers) sur les vrais noms de paramètres de l'API publique Leexi (cf. https://docs.public-api.leexi.ai/reference/list-calls) :
  - `limit` (tool) → `items` (API)
  - `sort_order: "asc"|"desc"` (tool) → `order: "performed_at asc"|"performed_at desc"` (API)
  - `since: <ISO>` (tool) → `date_filter=performed_at` + `from=<ISO>` (API)
- Nouveau paramètre `until: <ISO>` (mapping vers `to=<ISO>`) pour traiter une plage précise (ex: `since: "2025-06-01", until: "2025-06-30"` = juin 2025).
- Suppression de la fonction `sortCalls` locale — le tri est désormais 100% côté serveur via le param `order`, ce qui garantit sa correction sur tout l'historique paginé.

### Tests

- 62 tests (was 60). Tests `endpoints` réécrits autour des vrais noms de params (items, order, date_filter, from, to). Tests `tools/list-calls` vérifient maintenant que le bon `order=performed_at asc|desc` est envoyé à l'API plutôt que de mocker un re-sort local qui n'existe plus.

## [0.4.6] — 2026-05-26

### Fixed

- Biome format violation introduite par les tests v0.4.5 (CI rouge). `pnpm format` appliqué sur `tests/tools/list-calls.test.ts` — 2 endroits où `mswServer.use(http.get(...))` était sur 3 lignes au lieu d'1. 60/60 tests + biome check passent désormais.

## [0.4.5] — 2026-05-26

### Added

- **`sort_order: "asc" | "desc"`** param on `leexi_list_calls` (default `"asc"`). Tri par `performed_at` appliqué CÔTÉ TOOL (après réception de l'API), pour garantir l'ordre chronologique indépendamment de ce que renvoie l'API Leexi. Critique pour la reprise historique : les fiches client se construisent dans l'ordre logique (R1 → R2 → kickoff → steerco) au lieu de l'inverse.

### Why

- L'orchestrateur côté skill (`leexi-routine` v0.8.0) demandait à Claude de trier ASC via prompt Markdown — pas fiable, Claude pouvait l'oublier au runtime. Hardcoder le tri dans le code du tool garantit le comportement. Le param `sort_order` reste configurable pour les cas où on veut le contraire (polling continu newest-first).

### Tests

- 60 tests (was 58). +2 couvrant sort ASC default + sort DESC explicit, avec API qui retourne dans l'ordre inverse pour valider le re-sort.

## [0.4.4] — 2026-05-26

### Added

- **`fields: "summary" | "full"`** param on `leexi_list_calls` (default `"summary"`). Strips heavy fields (`simple_transcript`, `chapters`, `tasks`, `prompts`, `scorecards`, `feedbacks`) when `summary`, cutting payload by ~95% for typical calls. Use `"full"` for debug or export when you really want everything.

### Why

- The Leexi public API includes `simple_transcript` in the `/calls` list response (~30KB per call). Listing 10 calls returned ~300KB of mostly-noise JSON to the MCP consumer (Claude session). With `fields: "summary"` the same listing is now ~15KB total — leaves context room for the actual work (extracting actions, drafting follow-ups).
- Backward compatibility: callers that need transcripts in the listing can pass `fields: "full"`. Anyone using `leexi_get_call(uuid)` for a specific call already gets the full transcript (unchanged).

### Tests

- 58 tests (was 56). +2 covering `fields: "summary"` strip behavior and `fields: "full"` preservation.

## [0.4.3] — 2026-05-25

### Fixed
- **MCP tool schemas rejected by Claude API** (HTTP 400 `tools.N.custom.input_schema: JSON schema is invalid. It must match JSON Schema draft 2020-12`). Caused by `zodToJsonSchema(schema, { target: "openApi3" })` emitting OpenAPI-3-isms (`nullable: true` instead of unions). Switched to `target: "jsonSchema7"` (forward-compatible with 2020-12) and stripped the `$schema: "draft-07"` declaration that confused the Claude validator.

## [0.4.2] — 2026-05-25

### Fixed
- v0.4.1 shipped the bundled `dist/` but forgot to bump `.claude-plugin/plugin.json` and `marketplace.json` — so `claude plugins update` still reported "already at 0.4.0" and the plugin cache never refreshed. This release bumps all three manifests in sync.

## [0.4.1] — 2026-05-25

### Fixed
- **Plugin install broken**: `dist/index.js` referenced `zod`, `undici`, etc. from `node_modules/` which isn't shipped with the plugin cache. Now `pnpm build` produces a fully self-contained `dist/index.js` (~680 KB) with all runtime deps bundled via esbuild.

### Added
- `scripts/bundle.mjs`: esbuild bundling step (ESM + CJS interop shim).
- `esbuild` as direct devDependency.

## [0.4.0] — 2026-05-25

### Changed (BREAKING)
- Zod schemas rewritten from live Leexi API responses. Field names + shapes now match reality:
  - `language` → `locale` (e.g. `"fr-FR"`)
  - `duration_seconds` (int) → `duration` (float seconds, e.g. `3645.837`)
  - `participants` → `participating_users` + `speakers` (detail only, not in list)
  - `simple_transcript` is now a STRING with inline `(HH:MM:SS - HH:MM:SS)` timestamps, not an array
  - List wrapper: `meta: {page,per_page,total}` → `pagination: {page,items,count}`
  - Detail wrapper: response is `{data: CallDetail}` — `getCall` unwraps for callers
  - `started_at`/`ended_at` → `performed_at`
  - `recording_url` (only link in list) → `leexi_url` (web app URL) + `recording_url` (S3 presigned, detail)
- New surfaced fields: `chapters`, `tasks` (Leexi-extracted action items), `meeting_event`, `owner`, `summary` (markdown), `prompts`, `call_topics`, `conversation_type`, `direction`, `is_video`, `visible`.
- `get-call` tool: `include_transcript=false` now zeroes `simple_transcript`, `transcript`, `chapters`, and `call_topics` (was only zeroing transcript arrays).
- `list-calls` tool result: `{ calls, pagination }` replaces `{ calls, page, perPage, total }`.
- Test count: 48 → 56.

### Fixed
- `pnpm inspect` now works against the live API — ZodErrors on `list-calls` are resolved.
- Fixtures replaced with anonymized real-shape samples that parse cleanly through the new schemas.

### Migration
- Any consumer reading `.language`, `.durationSeconds`, `.participants`, or treating `simple_transcript` as an array must adapt. Field renames are mechanical.
- Pagination: replace `result.page` + `result.total` + `result.perPage` with `result.pagination.page` + `result.pagination.count` + `result.pagination.items`.
- If you wrote a Routine on v0.3.0: it broke at the API level regardless (v0.3.0 could not parse live calls).

## [0.3.0] — 2026-05-25

### Changed (BREAKING)
- Authentication is now HTTP Basic Auth (`Authorization: Basic base64(KEY_ID:KEY_SECRET)`) per the real Leexi public API. The previous `Bearer` implementation never authenticated successfully against the live API.
- Config now requires `LEEXI_API_KEY_ID` in addition to `LEEXI_API_KEY` (the secret).
- `LeexiClient` constructor signature: `{ apiKey, apiKeyId, baseUrl, ... }`.

### Migration
1. Edit your `.env` (or `claude mcp add --env` args) to add `LEEXI_API_KEY_ID=<your-key-id>`.
2. The `LEEXI_API_KEY` keeps the same name and now holds the secret half of the pair.
3. If you don't have the ID handy, find it next to the secret in **Leexi → Settings → Company Settings → API Keys**.

## [0.2.1] — 2026-05-25

### Added
- `.claude-plugin/marketplace.json` so the repo itself is an installable Claude Code marketplace

### Fixed
- README install command (`gh:` prefix isn't valid Claude Code syntax; use `marketplace add` + `install <plugin>@<marketplace>`)

## [0.2.0] — 2026-05-25

### Added
- Claude Code plugin packaging (`.claude-plugin/`, `.mcp.json`, skill, slash commands)
- `dist/` now committed for one-command plugin install
- Tests for `errors.ts`, `endpoints.ts`, `server.ts` (full coverage on remaining modules)
- Coverage tooling (`@vitest/coverage-v8`) with 85% thresholds
- GitHub Actions CI workflow
- Mermaid architecture diagram in README
- Troubleshooting + Usage sections in README
- CHANGELOG + CONTRIBUTING

### Changed
- `src/server.ts` refactored to expose `buildServer()` for testing

## [0.1.0] — 2026-05-25

### Added
- Initial release
- Three MCP tools: `leexi_list_calls`, `leexi_get_call`, `leexi_mark_processed`
- Persistent JSON store for processed-call deduplication
- HTTP client with Bearer auth and retry on 429/5xx
- Strict TypeScript + Zod runtime validation
