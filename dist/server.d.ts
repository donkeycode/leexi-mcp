import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import type { Config } from "./config.js";
import { ProcessedStore } from "./store/processed-store.js";
interface AnyTool {
    name: string;
    description: string;
    inputSchema: {
        safeParse: (input: unknown) => {
            success: true;
            data: unknown;
        } | {
            success: false;
            error: {
                issues: unknown[];
            };
        };
    };
    handler: (input: unknown) => Promise<unknown>;
}
export interface BuildServerResult {
    server: Server;
    tools: AnyTool[];
    store: ProcessedStore;
}
export declare function buildServer(config: Config): BuildServerResult;
export declare function startServer(config: Config): Promise<void>;
export {};
