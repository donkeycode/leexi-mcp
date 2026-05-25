#!/usr/bin/env node
// Entry point — loads config and starts the stdio MCP server.
import { loadConfig } from "./config.js";
import { startServer } from "./server.js";
async function main() {
    const config = loadConfig();
    await startServer(config);
}
main().catch((err) => {
    console.error("[leexi-mcp] fatal:", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map