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
  const client = new LeexiClient({ apiKey: config.apiKey, baseUrl: config.baseUrl });
  const store = new ProcessedStore(config.stateFile);
  await store.load();

  const listTool = createListCallsTool(client, store);
  const getTool = createGetCallTool(client);
  const markTool = createMarkProcessedTool(store);

  console.log("-> leexi_list_calls (limit=3)");
  const list = await listTool.handler({ limit: 3 });
  console.log(JSON.stringify(list, null, 2));

  const first = list.calls[0];
  if (!first) {
    console.log("No calls available -- exiting.");
    return;
  }

  console.log(`\n-> leexi_get_call (${first.uuid}) without transcript`);
  const lite = await getTool.handler({ uuid: first.uuid, include_transcript: false });
  console.log(JSON.stringify({ uuid: lite.uuid, title: lite.title, summary: lite.summary }, null, 2));

  console.log(`\n-> leexi_mark_processed (${first.uuid})`);
  const marked = await markTool.handler({ uuid: first.uuid, metadata: { source: "inspect" } });
  console.log(JSON.stringify(marked, null, 2));
}

main().catch((err) => {
  console.error("inspect failed:", err);
  process.exit(1);
});
