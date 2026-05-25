// MCP stdio server — wires the three Leexi tools together.
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ValidationError } from "./errors.js";
import { LeexiClient } from "./leexi/client.js";
import { ProcessedStore } from "./store/processed-store.js";
import { createGetCallTool } from "./tools/get-call.js";
import { createListCallsTool } from "./tools/list-calls.js";
import { createMarkProcessedTool } from "./tools/mark-processed.js";
// ---------------------------------------------------------------------------
// toMcpInputSchema — convert a Zod schema to JSON Schema for an MCP tool's
// inputSchema field. Targets draft-7 (NOT openApi3, which uses `nullable`)
// and strips the `$schema` declaration so the Claude API (which validates
// against draft 2020-12) accepts the result without complaining about a
// mismatched draft identifier.
// ---------------------------------------------------------------------------
function toMcpInputSchema(zodSchema) {
    const raw = zodToJsonSchema(zodSchema, {
        target: "jsonSchema7",
        $refStrategy: "none",
    });
    const { $schema: _ignored, ...rest } = raw;
    return rest;
}
// ---------------------------------------------------------------------------
// buildServer — creates the MCP Server and registers all request handlers.
// Does NOT connect to any transport; call server.connect(transport) yourself.
// ---------------------------------------------------------------------------
export function buildServer(config) {
    const client = new LeexiClient({
        apiKeyId: config.apiKeyId,
        apiKey: config.apiKey,
        baseUrl: config.baseUrl,
    });
    const store = new ProcessedStore(config.stateFile);
    // Each tool has its own concrete I/O/P shape; cast to AnyTool[] for uniform
    // dispatch. The structural interface ensures all required members are present.
    const tools = [
        createListCallsTool(client, store),
        createGetCallTool(client),
        createMarkProcessedTool(store),
    ];
    const server = new Server({ name: "leexi-mcp", version: "0.1.0" }, { capabilities: { tools: {} } });
    // Return tool metadata with JSON Schema converted from Zod.
    server.setRequestHandler(ListToolsRequestSchema, async () => ({
        tools: tools.map((t) => ({
            name: t.name,
            description: t.description,
            inputSchema: toMcpInputSchema(t.inputSchema),
        })),
    }));
    // Dispatch a tool call: validate args with the tool's Zod schema, run handler.
    server.setRequestHandler(CallToolRequestSchema, async (req) => {
        const tool = tools.find((t) => t.name === req.params.name);
        if (!tool) {
            throw new Error(`Unknown tool: ${req.params.name}`);
        }
        // safeParse applies Zod defaults and coerces values.
        const parsed = tool.inputSchema.safeParse(req.params.arguments ?? {});
        if (!parsed.success) {
            throw new ValidationError(`Invalid arguments for ${tool.name}`, parsed.error.issues);
        }
        // Each handler re-parses internally (applies its own defaults).
        // parsed.data matches the raw-input shape (I) so passing it is safe.
        const result = await tool.handler(parsed.data);
        return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
    });
    return { server, tools, store };
}
// ---------------------------------------------------------------------------
// startServer — backward-compatible entry point used by src/index.ts.
// Builds the server, loads the store, then connects to stdio transport.
// ---------------------------------------------------------------------------
export async function startServer(config) {
    const { server, store } = buildServer(config);
    // Load persisted processed-call state before accepting requests.
    await store.load();
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
//# sourceMappingURL=server.js.map