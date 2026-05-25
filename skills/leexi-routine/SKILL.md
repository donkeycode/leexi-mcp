---
name: leexi-routine
description: "Use when the user asks about Leexi calls, meetings, transcripts, or recordings; wants to draft follow-up emails after a call; or when a Routine polls Leexi for new activity. Teaches idiomatic use of leexi_list_calls, leexi_get_call, and leexi_mark_processed."
---

# Using the Leexi MCP

This plugin exposes three tools backed by the Leexi public API.

## When to invoke

- The user asks about their **calls**, **meetings**, **transcripts**, or **recordings** from Leexi.
- The user wants to draft a follow-up after a call.
- A Routine polls for new Leexi activity.

## Workflow patterns

### Pattern 1 — Process today's unhandled calls

```
1. leexi_list_calls({ only_unprocessed: true, since: "<today 00:00 UTC>" })
2. For each call:
   - leexi_get_call({ uuid, include_transcript: true })
   - Generate summary / action items / draft email using the transcript.
   - leexi_mark_processed({ uuid, metadata: { handler: "routine", date: "<today>" } })
```

### Pattern 2 — Quick lookup

```
leexi_list_calls({ limit: 10 })  # show recent
# Then user picks one → leexi_get_call to fetch the full transcript.
```

### Pattern 3 — Re-process

A call that's already in the processed store can still be fetched via `leexi_get_call` — `mark_processed` only affects the `only_unprocessed` filter.

## Tips

- Default `include_transcript=true` returns the full text. Use `false` when you only need the summary/topics (lighter payload).
- The `simpleTranscript` field gives paragraph-level timestamps; the `transcript` field gives word-level timestamps. Pick what you need.
- Errors of type `LeexiApiError` carry a `status` field — use it to differentiate 401 (bad key) vs 429 (rate limit) vs 404 (uuid not found).
- Rate limit is 50 requests/minute. The client auto-retries on 429, but tight loops can still fail.
