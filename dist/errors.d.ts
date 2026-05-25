export declare class ConfigError extends Error {
    constructor(message: string);
}
export declare class LeexiApiError extends Error {
    readonly status: number;
    readonly body?: unknown | undefined;
    constructor(message: string, status: number, body?: unknown | undefined);
}
export declare class ValidationError extends Error {
    readonly issues: unknown;
    constructor(message: string, issues: unknown);
}
