# Changelog

All notable changes to `@donkeycode/leexi-mcp` will be documented here. Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/).

## [Unreleased]

## [0.4.16] — 2026-05-27

### Fixed (auth 401 sur child MCP spawn)

- **Retrait de `LEEXI_API_KEY_ID` et `LEEXI_API_KEY` du bloc `env` de `.mcp.json`.**
  - Avant : `.mcp.json` déclarait `"LEEXI_API_KEY_ID": "${LEEXI_API_KEY_ID}"` (et idem pour `LEEXI_API_KEY`). Claude Code, dans certains scénarios de respawn MCP, passait ces valeurs **littéralement** (la string `"${LEEXI_API_KEY_ID}"`) au child process au lieu de les substituer depuis l'env parent. Résultat : auth Basic `base64("${LEEXI_API_KEY_ID}:${LEEXI_API_KEY}")` → l'API Leexi rejette → 401 sur tous les appels.
  - Après : les deux vars ne sont plus déclarées dans le bloc `env`. Le child MCP hérite naturellement de l'env complet du parent Claude Code (qui les a depuis le shell profile utilisateur). Plus de substitution douteuse à craindre.

### Prérequis utilisateur

`LEEXI_API_KEY_ID` et `LEEXI_API_KEY` doivent être définies dans le shell profile de l'utilisateur (`~/.zshrc` / `~/.bashrc`) avant le lancement de Claude Code, comme c'était déjà le cas en pratique. Aucun changement de setup côté utilisateur.

### Contexte

Bug observé 27/05/2026 fin d'après-midi après restart Claude Code complet : malgré les fixes v0.4.13/0.4.14/0.4.15 (chemin XDG, reload-auto, expansion `${HOME}`), les appels MCP `leexi_list_calls` et `leexi_get_call` retournaient `401 Unauthorized` depuis la session principale. L'`env | grep LEEXI` montrait pourtant les bonnes valeurs côté Claude Code. Diagnostic : Claude Code passait les `${VAR}` du bloc `env` MCP littéralement plutôt que substitués. Le retrait du mapping force l'héritage env, qui lui fonctionne.

## [0.4.15] — 2026-05-27

### Fixed (CRITIQUE — `${HOME}` non substitué par certains launchers MCP)

- **`config.ts` étend désormais `${HOME}`, `$HOME` et un `~/` initial dans `LEEXI_STATE_FILE`.**
  - Avant : `process.env.LEEXI_STATE_FILE` était lu brut. Quand Claude Code (et d'autres launchers MCP) injectent les valeurs de `.mcp.json` sans faire la substitution shell, un path comme `${HOME}/.local/state/leexi-mcp/processed-calls.json` arrive dans le child process **littéralement**, avec `${HOME}` non résolu. Résultat : `ProcessedStore` ouvre un path inexistant, `ENOENT` traité comme store vide (store.ts:38), `only_unprocessed=true` ne filtre plus rien.
  - Après : expansion défensive côté MCP. `${HOME}/foo`, `$HOME/foo`, `~/foo` → `/Users/alice/foo` quelle que soit la manière dont le launcher passe la variable.

### Tests

- `tests/config.test.ts` : +4 cas (`${HOME}`, `$HOME`, `~/`, path absolu). Total 78/78.

### Contexte

Bug observé 27/05/2026 après-midi : malgré le passage à un chemin XDG stable en 0.4.13 et le reload-auto en 0.4.14, le MCP loaded en runtime continuait à retourner 865 calls non filtrés. Cause : Claude Code passait `LEEXI_STATE_FILE` au MCP sans avoir résolu `${HOME}` au préalable, donc `ProcessedStore.load()` tentait d'ouvrir un fichier nommé littéralement `${HOME}/.local/state/...` → ENOENT → map vide → aucun filtrage. Cette release rend le MCP résistant à cette catégorie de mauvaise substitution.

## [0.4.14] — 2026-05-27

### Fixed

- **`ProcessedStore` reload automatique sur changement disque (mtime-based).**
  Avant : `load()` n'était appelé qu'au boot du serveur MCP — toute écriture externe au state file (vault sync, édition manuelle, second processus MCP) restait invisible jusqu'au prochain redémarrage. C'est ce qui a empêché la sync 710-entrées de prendre effet immédiatement sur le MCP loaded en 0.4.13.
  Après : `isProcessed()`, `markProcessed()` et `list()` vérifient `fs.stat().mtimeMs` (1 syscall cheap) et rechargent uniquement si le fichier sur disque est plus récent que la map en mémoire. `persist()` met à jour le mtime tracké en interne pour ne pas re-charger sur ses propres écritures.

### Added

- **Protection contre les race conditions writer-writer.**
  `markProcessed()` recharge maintenant le fichier avant d'appliquer son changement, garantissant qu'un append externe entre deux marks ne sera pas écrasé par la map en mémoire stale.

### Tests

- `tests/store/processed-store.test.ts` : +2 tests (`picks up entries written externally`, `does not overwrite entries added externally`). Total 74/74.

## [0.4.13] — 2026-05-27

### Fixed (CRITIQUE — perte de state à chaque bump de version)

- **`LEEXI_STATE_FILE` déplacé sur un chemin stable indépendant de la version du plugin.**
  - Avant : `${CLAUDE_PLUGIN_ROOT}/state/processed-calls.json` → ce chemin contient le numéro de version (`.claude/plugins/cache/leexi-mcp/leexi-mcp/0.4.X/state/...`), donc à **chaque update plugin**, le `ProcessedStore` redémarrait à vide (`ENOENT → empty store`, store.ts:38) et **tous les calls déjà traités étaient re-listés comme non-traités** par `leexi_list_calls only_unprocessed=true`.
  - Après : `${HOME}/.local/state/leexi-mcp/processed-calls.json` (convention XDG_STATE_HOME). Persistant à travers les bumps.

### Migration

Au passage à 0.4.13, copier le state du dernier MCP utilisé :
```bash
mkdir -p ~/.local/state/leexi-mcp
cp ~/.claude/plugins/cache/leexi-mcp/leexi-mcp/0.4.12/state/processed-calls.json \
   ~/.local/state/leexi-mcp/processed-calls.json
```
Sans migration, le store démarre vide une dernière fois (puis stable).

### Impact constaté

- 26/05 backfill historique : 710 calls marqués processed dans le JSONL vault ; le MCP côté serveur n'avait que 697 entrées synchrones (asymétrie écriture vault vs `leexi_mark_processed`).
- 27/05 bump 0.4.11 → 0.4.12 : state file MCP repassé à 0 → 865 calls re-listés comme unprocessed dès la première routine du matin.

## [0.4.12] — 2026-05-27

### Fixed (bloquant reprise historique, suite v0.4.11)

- **`chapters[].title: null` et `chapters[].text: null` acceptés** sur `CallSummarySchema` / `CallDetailSchema`.
- **`meeting_event.title/direction/start_time/end_time: null` acceptés** (`MeetingEventSchema`).

L'API Leexi renvoie parfois `chapters[].title: null` (et préventif : `text: null`) sur des calls historiques où le chaptering a été généré sans titre dérivé.

Avant v0.4.12, ces calls faisaient exploser `leexi_list_calls` avec :

```
data[N].chapters[K].title : Expected string, received null
```

bloquant toute la page contenant le call corrompu. Détecté lors d'une reprise historique sur des batches autour de fin 2024 / début 2025 où plusieurs calls successifs présentent ce pattern.

`text` est aussi passé en `nullable()` par cohérence préventive (même symptôme probable).

### Reproductible

`leexi_list_calls({ only_unprocessed: true, since: "2024-12-05T11:00:00Z", limit: 10 })` plantait sur `data[0]` avant le fix.

## [0.4.11] — 2026-05-26

### Fixed (bloquant reprise historique, suite v0.4.10)

- **`simple_transcript: null` et `transcript: null` acceptés sur `CallDetailSchema`** (et `simple_transcript: null` sur `CallSummarySchema`).

L'API Leexi renvoie parfois `simple_transcript: null` et `transcript: null` sur des calls historiques :
- Calls archivés sans transcript disponible
- Calls très courts interrompus avant transcription
- Calls dont la transcription a échoué côté Leexi STT

Avant v0.4.11, ces calls faisaient exploser `CallDetailSchema` avec :
```
data.simple_transcript : Expected string, received null
data.transcript        : Expected array, received null
```
ce qui bloquait `leexi_get_call` sur le UUID corrompu et empêchait la routine d'avancer.

`call_topics` est aussi passé en `nullish()` par cohérence (même symptôme attendu).

### Patch technique

`src/leexi/types.ts` :
- `CallSummarySchema.simple_transcript: z.string().nullish()` (au lieu de `.optional()`).
- `CallDetailSchema.simple_transcript: z.string().nullish()`.
- `CallDetailSchema.transcript: z.array(...).nullish()`.
- `CallDetailSchema.call_topics: z.array(...).nullish()`.

La transformation `raw.simple_transcript ?? ""` et `raw.transcript ?? []` reste inchangée — le composant aval voit toujours une string vide et un array vide pour les champs null.

### Tests

`tests/leexi/types.test.ts` : nouveaux cas régression :
- `CallDetailSchema accepts null on simple_transcript and transcript`.
- `CallSummarySchema accepts null on simple_transcript`.

### Contexte (call qui a révélé le bug)

UUID `28d454d1-8e32-47c8-aae8-c0976ecaa822` (Dynabuy, 2024-05-06) — détecté pendant batch 6 de la reprise historique. Quarantaine créée dans `_Automation/Leexi/quarantine/` en attendant cette release.

## [0.4.10] — 2026-05-26

### Fixed (bloquant reprise historique, suite v0.4.8/9)

- **`duration: null` accepté sur `CallSummarySchema` + `CallDetailSchema` + `SpeakerSchema`**.

L'API Leexi renvoie parfois `duration: null` (et `longest_monologue: null` côté speakers) sur des calls historiques :
- Calls archivés sans recalcul de durée par speaker
- Calls très courts ou vides (Speaker 1/2/3 sans parole détectée)
- Calls importés avant détection complète des durées

Avant v0.4.10, ces calls **bloquaient toute la page** `leexi_list_calls` qui les contenait (un seul call corrompu = la page entière inutilisable). Découvert pendant la reprise historique 2024-05 où plusieurs calls de la même journée plantaient le polling chronologique.

- Schémas changés : `z.number().nonnegative()` → `z.number().nullable()` (3 occurrences : `Speaker`, `CallSummary`, `CallDetail`).
- Transforms changés : `duration: raw.duration` → `duration: raw.duration ?? null`.
- Régression tests ajoutés : `CallSummarySchema accepts null on duration`, `CallDetailSchema accepts null on duration`, `SpeakerSchema accepts null on duration and longest_monologue`.

Même pattern que v0.4.8 (title/locale/direction nullable) et v0.4.9 (chapters[].start_time nullable). À chaque page de reprise historique on découvre un nouveau champ nullable côté API Leexi — leur OpenAPI sous-spec ne reflète pas la réalité.

## [0.4.9] — 2026-05-26

### Fixed (bloquant reprise historique, suite v0.4.8)

- **`chapters[].start_time` peut désormais être `null`** dans le schéma Zod. Avant v0.4.9 ce champ était déclaré `z.number()` (non-nullable), ce qui faisait planter `leexi_list_calls` dès qu'une page contenait un call historique dont les chapitres n'ont pas de timeline temporelle (chaptering généré sans timestamps). Symptôme observable : `leexi_list_calls --limit=10 --sort_order=asc --since=2024-04-03` retournait `MCP error -32603: chapters[0..N].start_time Expected number, received null` au lieu du payload, bloquant toute la page (et pas seulement le call corrompu). Découvert sur un call du 2024-04-05 dont les 9 chapitres avaient `start_time: null`.

### Tests

- +1 régression dans `tests/leexi/types.test.ts` : `ChapterSchema` accepte `start_time: null` et le propage en `startTime: null` côté camelCase.

## [0.4.8] — 2026-05-26

### Fixed (bloquant reprise historique)

- **`title`, `locale`, `direction` peuvent désormais être `null`** dans le schéma Zod. Avant v0.4.8 ces 3 champs étaient déclarés `z.string()` (non-nullable), ce qui faisait planter le parsing de tout call historique où l'API renvoyait `null` sur l'un d'eux (anciens imports, calls sans meeting_event détecté, etc.). Symptôme : la reprise chronologique `--since=2024-03-26 --sort_order=asc` s'arrêtait dès le premier vieux call mal formé avec une `ZodError: Expected string, received null`. Le tool reste utilisable même quand l'API renvoie un call dont le titre n'a pas été généré.

### Changed (type-level breaking, runtime safe)

- Le type TS de `CallSummary.title` / `.locale` / `.direction` (et idem sur `CallDetail`) passe de `string` à `string | null`. Les consommateurs (la routine v0.8.x qui construit `{YYYY-MM-DD} {TITRE}.md`) doivent prévoir un fallback côté affichage — un patch routine suivra pour gérer `title null` → `"(Sans titre — <uuid-court>)"`.

### Tests

- 64 tests (was 62). +2 régressions ajoutées dans `tests/leexi/types.test.ts` : `CallSummarySchema` et `CallDetailSchema` parsent désormais des payloads avec `title/locale/direction: null` et retournent `null` dans les champs camelCase.

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
