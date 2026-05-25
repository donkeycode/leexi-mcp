# @donkeycode/leexi-mcp

DonkeyCode MCP server for [Leexi](https://www.leexi.ai/) — exposes Leexi calls, transcripts, and per-call processing state to any MCP-compatible client (Claude Code, Claude Desktop, IDE plugins).

## Tools

| Tool | Description |
|------|-------------|
| `leexi_list_calls` | List recent Leexi calls. Optional filters: `since`, `limit`, `page`, `only_unprocessed`. |
| `leexi_get_call` | Fetch a single call by UUID with full transcript (or summary-only via `include_transcript=false`). |
| `leexi_mark_processed` | Mark a call as processed in the local MCP state, so future `only_unprocessed` queries skip it. |

## Install

```bash
git clone https://github.com/donkeycode/leexi-mcp.git
cd leexi-mcp
pnpm install
pnpm build
```

## Configure

1. Get an API key at **Leexi → Settings → Company Settings → API Keys** (requires admin).
2. Copy `.env.example` to `.env` and fill in:

```
LEEXI_API_KEY=sk-...
LEEXI_API_BASE_URL=https://public-api.leexi.ai/v1
LEEXI_STATE_FILE=./state/processed-calls.json
LEEXI_RATE_LIMIT_PER_MINUTE=50
```

## Register with Claude Code

```bash
claude mcp add leexi-donkeycode \
  --command "node /absolute/path/to/leexi-mcp/dist/index.js" \
  --env LEEXI_API_KEY=sk-... \
  --env LEEXI_STATE_FILE=/absolute/path/to/state/processed-calls.json
```

## Local smoke test

```bash
pnpm inspect
```

Prints a sample list, one call detail, and a processed-flag toggle.

## Develop

```bash
pnpm dev         # tsx watch mode
pnpm test        # vitest run
pnpm lint        # biome check
```

## Architecture

```
Claude Code Routine
    | MCP stdio
[ leexi-mcp ]
    | HTTPS (Bearer)
[ public-api.leexi.ai/v1 ]
```

Local JSON store (`LEEXI_STATE_FILE`) keeps the list of processed call UUIDs to deduplicate polling cycles. The store is the MCP's only persistent state; everything else is fetched on demand.

## License

MIT — see [LICENSE](./LICENSE).
