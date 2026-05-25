# Changelog

All notable changes to `@donkeycode/leexi-mcp` will be documented here. Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/).

## [Unreleased]

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
