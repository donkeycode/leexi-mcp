# Changelog

All notable changes to `@donkeycode/leexi-mcp` will be documented here. Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/).

## [Unreleased]

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
