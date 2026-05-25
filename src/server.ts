// MCP stdio server — wires the three Leexi tools together.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import type { Config } from "./config.js";
import { ValidationError } from "./errors.js";
import { LeexiClient } from "./leexi/client.js";
import { ProcessedStore } from "./store/processed-store.js";
import { createGetCallTool } from "./tools/get-call.js";
import { type ToolDefinition, createListCallsTool } from "./tools/list-calls.js";
import { createMarkProcessedTool } from "./tools/mark-processed.js";

// ---------------------------------------------------------------------------
// Structural interface for dispatching tools without knowing their generics.
// Avoids `any` by using `unknown` for inputs/outputs at the call site only.
// ---------------------------------------------------------------------------
interface AnyTool {
  name: string;
  description: string;
  inputSchema: {
    safeParse: (
      input: unknown,
    ) => { success: true; data: unknown } | { success: false; error: { issues: unknown[] } };
  };
  handler: (input: unknown) => Promise<unknown>;
}

// ---------------------------------------------------------------------------
// Server bootstrap
// ---------------------------------------------------------------------------

export async function startServer(config: Config): Promise<void> {
  const client = new LeexiClient({ apiKey: config.apiKey, baseUrl: config.baseUrl });
  const store = new ProcessedStore(config.stateFile);
  await store.load();

  // Each tool has its own concrete I/O/P shape; cast to AnyTool[] for uniform
  // dispatch. The structural interface ensures all required members are present.
  const tools = [
    createListCallsTool(client, store),
    createGetCallTool(client),
    createMarkProcessedTool(store),
  ] as unknown as AnyTool[];

  const server = new Server(
    { name: "leexi-mcp", version: "0.1.0" },
    { capabilities: { tools: {} } },
  );

  // Return tool metadata with JSON Schema converted from Zod.
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: zodToJsonSchema(t.inputSchema as Parameters<typeof zodToJsonSchema>[0], {
        target: "openApi3",
      }) as Record<string, unknown>,
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
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
    };
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
