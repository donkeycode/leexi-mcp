#!/usr/bin/env tsx
/**
 * Local smoke test: runs the MCP server in-process and calls each tool once.
 * Reads LEEXI_API_KEY + LEEXI_STATE_FILE from .env (or the shell).
 */
import { loadConfig } from "../src/config.js";
import { LeexiClient } from "../src/leexi/client.js";
import { ProcessedStore } from "../src/store/processed-store.js";
import { createGetCallTool } from "../src/tools/get-call.js";
import { createListCallsTool } from "../src/tools/list-calls.js";
import { createMarkProcessedTool } from "../src/tools/mark-processed.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const client = new LeexiClient({ apiKeyId: config.apiKeyId, apiKey: config.apiKey, baseUrl: config.baseUrl });
  const store = new ProcessedStore(config.stateFile);
  await store.load();

  const listTool = createListCallsTool(client, store);
  const getTool = createGetCallTool(client);
  const markTool = createMarkProcessedTool(store);

  // ---------------------------------------------------------------------------
  // List calls
  // ---------------------------------------------------------------------------
  console.log("-> leexi_list_calls (limit=3)");
  const list = await listTool.handler({ limit: 3 });

  // Real pagination shape: { page, items, count }
  console.log(`list.pagination → { page: ${list.pagination.page}, items: ${list.pagination.items}, count: ${list.pagination.count} }`);

  if (list.calls.length === 0) {
    console.log("No calls available -- exiting.");
    return;
  }

  const first = list.calls[0];
  if (!first) return;

  // Print first call summary fields
  console.log("list.calls[0] →", {
    uuid: first.uuid,
    title: first.title,
    performed_at: first.performedAt,
    duration: first.duration,
    summary_preview: first.summary ? first.summary.slice(0, 80) + "..." : null,
  });

  // ---------------------------------------------------------------------------
  // Get call (with transcript)
  // ---------------------------------------------------------------------------
  console.log(`\n-> leexi_get_call (${first.uuid}) with transcript`);
  const call = await getTool.handler({ uuid: first.uuid, include_transcript: true });

  console.log("call.title:", call.title);
  console.log(`call.performed_at: ${call.performedAt} | duration: ${call.duration}s`);
  console.log(`call.participating_users: ${call.participatingUsers.length} | speakers: ${call.speakers.length}`);
  console.log(`call.chapters: ${call.chapters.length} | tasks: ${call.tasks.length}`);
  console.log("call.summary preview:", call.summary ? call.summary.slice(0, 200) : "(none)");
  console.log(
    "call.simple_transcript preview:",
    call.simpleTranscript ? call.simpleTranscript.slice(0, 200) : "(none)",
  );

  // ---------------------------------------------------------------------------
  // Mark processed
  // ---------------------------------------------------------------------------
  console.log(`\n-> leexi_mark_processed (${first.uuid})`);
  const marked = await markTool.handler({ uuid: first.uuid, metadata: { source: "inspect" } });
  console.log(JSON.stringify(marked, null, 2));
}

main().catch((err) => {
  console.error("inspect failed:", err);
  process.exit(1);
});
