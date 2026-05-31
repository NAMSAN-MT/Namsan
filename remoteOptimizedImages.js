// remoteOptimizedImages.js  (repo root)
//
// Read at build time by next-image-export-optimizer to know which REMOTE
// (Firebase Storage) images to download + convert to WebP + blur. Exports a
// Promise resolving to an array of absolute image URLs that EXACTLY match the
// `src` strings rendered by <ExportedImage> (see scripts/collectImageUrls.ts
// for why they match: same buildData functions as getStaticProps).
//
// This file is required by the optimizer CLI in PLAIN Node (not through Next's
// compiler), so we bootstrap the TS data layer ourselves:
//   1. dotenv loads .env.local -> NEXT_PUBLIC_FIREBASE_* (Next auto-loads these
//      for the app, but a standalone node require does NOT).
//   2. ts-node transpiles the .ts collector, forced to CommonJS so require works.
//   3. tsconfig-paths resolves the @Server/@Api/... path aliases.
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    moduleResolution: 'node',
    jsx: 'react',
    esModuleInterop: true,
    allowJs: true,
  },
});

// tsconfig.json uses JSONC (comments), so read the alias map via tsconfig-paths'
// own JSONC-aware loader rather than require()-ing the JSON directly.
const tsConfigPaths = require('tsconfig-paths');
const loaded = tsConfigPaths.loadConfig(__dirname);
if (loaded.resultType === 'failed') {
  throw new Error('tsconfig-paths loadConfig failed: ' + loaded.message);
}
tsConfigPaths.register({
  baseUrl: __dirname,
  paths: loaded.paths,
});

const { collectImageUrls } = require('./scripts/collectImageUrls.ts');

module.exports = collectImageUrls();
