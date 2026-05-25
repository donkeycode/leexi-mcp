# Contributing

Thanks for considering a contribution to `leexi-mcp`!

## Local setup

```bash
git clone git@github.com:donkeycode/leexi-mcp.git
cd leexi-mcp
pnpm install
pnpm build
```

## Workflow

- Branch from `main`: `feat/your-feature` or `fix/your-bug`.
- Follow TDD: write a failing test first, then the minimal implementation.
- Run `pnpm lint && pnpm typecheck && pnpm test:coverage` before pushing.
- Coverage thresholds (85% statements / 85% lines / 85% functions / 80% branches) must hold.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.
- Open a PR against `main` once CI is green.

## What's in scope

- New Leexi endpoints exposed as MCP tools.
- Test coverage and quality improvements.
- Doc fixes.

## What's out of scope

- Storing transcripts long-term (use Obsidian / a vector DB downstream).
- Sending data to third-party services from the MCP itself.
- UI / dashboard features.

## Code style

Enforced by Biome (`pnpm lint`). Don't argue with it; if a rule is wrong, change `biome.json`.
