#!/usr/bin/env node
// Bundle dist/index.js into a single self-contained file with all
// runtime deps inlined. Required so the Claude Code plugin install
// (which ships dist/ but not node_modules/) can run without
// `pnpm install` on the user's machine.

import { build } from "esbuild";
import { chmodSync } from "node:fs";

const outfile = "dist/index.js";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile,
  banner: {
    // The source src/index.ts already starts with `#!/usr/bin/env node`.
    // ESM bundles need a require shim because some deps (zod-to-json-schema, ...)
    // still use CJS internals (require) at runtime.
    js: [
      "import { createRequire as __cr } from 'node:module';",
      "const require = __cr(import.meta.url);",
    ].join("\n"),
  },
  minify: false,
  sourcemap: true,
  legalComments: "inline",
});

chmodSync(outfile, 0o755);
console.log(`✓ Bundled ${outfile}`);
