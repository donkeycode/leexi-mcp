// Custom error types used across the leexi-mcp server
export class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConfigError";
    }
}
export class LeexiApiError extends Error {
    status;
    body;
    constructor(message, status, body) {
        super(message);
        this.status = status;
        this.body = body;
        this.name = "LeexiApiError";
    }
}
export class ValidationError extends Error {
    issues;
    constructor(message, issues) {
        super(message);
        this.issues = issues;
        this.name = "ValidationError";
    }
}
//# sourceMappingURL=errors.js.map