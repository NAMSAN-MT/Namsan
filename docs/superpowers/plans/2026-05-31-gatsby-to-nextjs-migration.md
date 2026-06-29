# Gatsby → Next.js 마이그레이션 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 Gatsby 5 정적 사이트(법무법인 남산)를 동일한 디자인·라우트·정적 배포 모델을 유지한 채 Next.js (Pages Router, `output: export`)로 이전한다.

**Architecture:** Pages Router + `output: export` 정적 빌드 → Firebase Hosting. next-intl(`[locale]` 직접 라우팅) + firebase-admin(`getStaticPaths/getStaticProps` 빌드타임 데이터) + styled-components v5 SSR(SWC) + next/image(단계적 최적화).

**Tech Stack:** Next.js(최신 stable), next-intl, firebase-admin, styled-components v5, react-markdown + rehype-raw, TypeScript, yarn, Firebase Hosting.

**Spec:** docs/superpowers/specs/2026-05-31-gatsby-to-nextjs-migration-design.md

---

## Phase 0 — Safety & scaffold

> **Prerequisite (MANUAL — USER MUST DO THIS FIRST):** `firebase-key.json` is a real Google service-account private key and it is **currently committed to git history** (confirmed: `git ls-files` lists it). Removing it from the index does NOT remove it from history. **Before or immediately after this phase, the user must ROTATE the leaked key in the Firebase console** (Project Settings → Service accounts → Generate new private key, then delete/disable the old key ID). Treat the old key as compromised. The new key's fields go into `.env.local` (see Task 0.2), never back into a committed file. Optionally scrub history later with `git filter-repo`/BFG — out of scope for this migration, but flag it to the user.
>
> Ordering note for this phase: Tasks 0.1–0.13 are safe to run now. **Task 0.14 (deleting Gatsby files) is deliberately deferred** — `gatsby-node.ts` contains the remote-image / `onCreateNode` logic that Phase 3 ports into `src/server/firebaseAdmin.ts` + `getStaticProps`. Do NOT delete Gatsby files in Phase 0. Task 0.14 is listed here only to record the deletion list and the ordering constraint.

---

### 0.1 — Stop tracking the leaked service-account key

- [ ] Confirm the secret is tracked (this is the failing/at-risk condition):
  ```bash
  git -C /Users/kimsangcho/dev/side-job/Namsan ls-files | grep firebase-key.json
  ```
  Expect output: `firebase-key.json` (confirms it is committed → must be removed from index).
- [ ] Verify `.gitignore` already contains the entry (it does — line 9 is `firebase-key.json`). No edit needed there. Just confirm:
  ```bash
  grep -n 'firebase-key.json' /Users/kimsangcho/dev/side-job/Namsan/.gitignore
  ```
- [ ] Remove it from the git index while keeping the local file (the local file is the only copy of the key fields until the user rotates):
  ```bash
  git -C /Users/kimsangcho/dev/side-job/Namsan rm --cached firebase-key.json
  ```
- [ ] Verify it is now untracked-but-present:
  ```bash
  git -C /Users/kimsangcho/dev/side-job/Namsan status --short firebase-key.json   # expect: D  firebase-key.json (staged deletion)
  ls /Users/kimsangcho/dev/side-job/Namsan/firebase-key.json                       # still on disk
  ```

### 0.2 — Move the service-account into `.env.local` (build-only, no prefix)

- [ ] Create `/Users/kimsangcho/dev/side-job/Namsan/.env.local` from the **rotated** key (the key has these 10 fields: `type, project_id, private_key_id, private_key, client_email, client_id, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url`). Phase 3's `firebaseAdmin.ts` only needs three. Contract chooses individual fields. Add:
  ```dotenv
  # --- Firebase Admin (build-only; NO prefix — never shipped to the client) ---
  FIREBASE_PROJECT_ID=namsan-801de
  FIREBASE_CLIENT_EMAIL=<from rotated service account>
  # Keep the \n escapes exactly as in the JSON; firebaseAdmin.ts will .replace(/\\n/g, '\n')
  FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
  FIREBASE_DATABASE_URL=https://namsan-801de-default-rtdb.asia-southeast1.firebasedatabase.app
  ```
  > (`FIREBASE_PRIVATE_KEY` as escaped-`\n` single env var is the standard pattern; the base64-blob alternative is also fine but the contract's `firebaseAdmin.ts` reads individual fields, so use individual fields.)
- [ ] Confirm `.env.local` will not be committed — `.gitignore` line 7 is `.env`, which does **not** match `.env.local`. Add explicit dotenv coverage. Edit `/Users/kimsangcho/dev/side-job/Namsan/.gitignore`, replacing the single `.env` line:
  - before:
    ```gitignore
    .env
    ```
  - after:
    ```gitignore
    # dotenv local files
    .env
    .env*.local
    ```
- [ ] Verify nothing dotenv-ish is tracked:
  ```bash
  git -C /Users/kimsangcho/dev/side-job/Namsan status --ignored --short | grep -E '\.env'   # .env.local should show as ignored (!!)
  ```

### 0.3 — Create `.env.example` (committed, value-less reference)

- [ ] Create `/Users/kimsangcho/dev/side-job/Namsan/.env.example` documenting every var the app reads, so teammates know what to provide. Client vars use the `NEXT_PUBLIC_` prefix (Task 0.4 mapping); admin vars have no prefix:
  ```dotenv
  # ===== Client-exposed (bundled into JS) — must be NEXT_PUBLIC_* =====
  NEXT_PUBLIC_FIREBASE_API_KEY=
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
  NEXT_PUBLIC_FIREBASE_APP_ID=
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
  NEXT_PUBLIC_ALGOLIA_INDEX_NAME=
  NEXT_PUBLIC_ALGOLIA_ID=
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=

  # ===== Build-only (server/getStaticProps) — NO prefix, never shipped =====
  FIREBASE_PROJECT_ID=
  FIREBASE_CLIENT_EMAIL=
  FIREBASE_PRIVATE_KEY=
  FIREBASE_DATABASE_URL=
  ```
- [ ] Verify it is staged for commit (it should NOT be ignored):
  ```bash
  git -C /Users/kimsangcho/dev/side-job/Namsan check-ignore .env.example || echo "OK: not ignored"
  ```

### 0.4 — Env-var rename mapping (GATSBY_* → Next convention)

The exact rename mapping, derived from `grep process.env.GATSBY_` (only two files use them):

**Client-exposed → `NEXT_PUBLIC_*`** (in `src/api/firebase.ts` and `src/api/algolia.ts`):

| Gatsby var | Next var |
|---|---|
| `GATSBY_FIREBASE_API_KEY` | `NEXT_PUBLIC_FIREBASE_API_KEY` |
| `GATSBY_FIREBASE_AUTH_DOMAIN` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` |
| `GATSBY_FIREBASE_PROJECT_ID` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` |
| `GATSBY_FIREBASE_STORAGE_BUCKET` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` |
| `GATSBY_FIREBASE_MESSAGING_SENDER_ID` | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` |
| `GATSBY_FIREBASE_APP_ID` | `NEXT_PUBLIC_FIREBASE_APP_ID` |
| `GATSBY_FIREBASE_MEASUREMENT_ID` | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` |
| `GATSBY_ALGOLIA_INDEX_NAME` | `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` |
| `GATSBY_ALGOLIA_ID` | `NEXT_PUBLIC_ALGOLIA_ID` |
| `GATSBY_ALGOLIA_SEARCH_KEY` | `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` |

**Build-only admin creds → no prefix** (new, used only by Phase 3 `firebaseAdmin.ts`): `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_DATABASE_URL`.

> Note the existing `src/api/firebase.ts` line 12 has a typo source key — it reads `GATSBY_FIREBASE_MEASUREMENT_ID` into a config key named `measureId` (the Firebase SDK expects `measurementId`). Preserve behavior in this phase; do not rename the config key here.

- [ ] State the failing condition: a `NEXT_PUBLIC_`-prefixed env will not exist until the code reads it. Apply the source edits.
- [ ] Edit `/Users/kimsangcho/dev/side-job/Namsan/src/api/firebase.ts`:
  - before:
    ```ts
    const firebaseConfig = {
      apiKey: process.env.GATSBY_FIREBASE_API_KEY,
      authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
      storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.GATSBY_FIREBASE_APP_ID,
      measureId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
    };
    ```
  - after:
    ```ts
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measureId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };
    ```
- [ ] Edit `/Users/kimsangcho/dev/side-job/Namsan/src/api/algolia.ts`:
  - before:
    ```ts
    export const INDEX_NAME = process.env.GATSBY_ALGOLIA_INDEX_NAME ?? '';
    export const algoliaClient = algoliasearch(
      process.env.GATSBY_ALGOLIA_ID!,
      process.env.GATSBY_ALGOLIA_SEARCH_KEY!,
    );
    ```
  - after:
    ```ts
    export const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? '';
    export const algoliaClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_ID!,
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
    );
    ```
- [ ] Verify no `GATSBY_` env reads remain anywhere:
  ```bash
  grep -rn 'process.env.GATSBY_' /Users/kimsangcho/dev/side-job/Namsan/src   # expect: no output
  ```
- [ ] Update your real `.env.local` (and any deploy env) with the actual values under the new `NEXT_PUBLIC_*` names so `yarn dev` keeps working.

### 0.5 — `package.json`: dependency surgery + scripts

- [ ] Edit `/Users/kimsangcho/dev/side-job/Namsan/package.json`. **Remove** these dependency lines (Gatsby ecosystem + Gatsby-only build helpers): `gatsby`, `gatsby-image`, `gatsby-plugin-alias-imports`, `gatsby-plugin-image`, `gatsby-plugin-intl`, `gatsby-plugin-manifest`, `gatsby-plugin-mdx`, `gatsby-plugin-react-svg`, `gatsby-plugin-robots-txt`, `gatsby-plugin-sharp`, `gatsby-plugin-sitemap`, `gatsby-plugin-styled-components`, `gatsby-plugin-typescript`, `gatsby-source-filesystem`, `gatsby-source-firestore-easy`, `gatsby-transformer-remark`, `gatsby-transformer-sharp`, `babel-plugin-styled-components` (Next uses the SWC `compiler.styledComponents` instead). From `devDependencies` remove `gatsby-remark-typescript`.
  > The assignment lists `gatsby` + all `gatsby-*` + `gatsby-image` + `babel-plugin-styled-components` + `gatsby-remark-typescript` — the above is the exact set present in this file.
- [ ] **Add** to `dependencies`: `next`, `next-intl@^3`. (`react`/`react-dom@^18.2.0`, `styled-components`, `firebase`, `algoliasearch`, `framer-motion`, etc. stay.)
  > Deps used only by later phases are installed in the phase that introduces them, so each phase's commit stays self-contained: `firebase-admin@^13` in Phase 3, `gray-matter@^4` + `rehype-raw@^6` in Phase 4, `next-image-export-optimizer` + `ts-node` in Phase 5, `next-sitemap` in Phase 6. **No `@svgr/webpack`** — this repo consumes every SVG as a URL string, handled by webpack's built-in `asset/resource` (see Phase 1 Task 1.4), not as a React component.
- [ ] Rewrite the `scripts` block. Show the before/after:
  - before:
    ```json
    "scripts": {
      "develop": "gatsby develop",
      "start": "gatsby clean && gatsby develop",
      "build": "gatsby build",
      "serve": "gatsby serve",
      "clean": "gatsby clean",
      "typecheck": "tsc --noEmit"
    },
    ```
  - after:
    ```json
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "serve": "npx serve out",
      "typecheck": "tsc --noEmit"
    },
    ```
  > `develop`→`dev`; `build`→`next build` (emits `./out` per the locked `output:'export'`); `start`→`next start`; `clean` removed (no Gatsby cache); `serve` now serves the static `out/` export; `typecheck` unchanged.
- [ ] Update the `keywords` array `["gatsby"]` → `["nextjs"]` (cosmetic but keeps metadata honest).

### 0.6 — Create `next.config.js` (locked Phase-3 baseline)

- [ ] State the failing condition: `yarn build` would have nothing to configure / SVG imports would fail to resolve. Create `/Users/kimsangcho/dev/side-job/Namsan/next.config.js`:
  ```js
  /** @type {import('next').NextConfig} */
  module.exports = {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true }, // Phase 5 swaps to loader:'custom' + transpilePackages
    compiler: { styledComponents: true },
    webpack(config) {
      // This repo consumes every SVG as a URL string (<img src>, css url(...)),
      // NOT as a React component — so emit SVGs as static asset URLs. (See Phase 1 Task 1.4.)
      const fileLoaderRule = config.module.rules.find(
        (rule) => rule.test && rule.test.toString().includes('svg'),
      );
      if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        type: 'asset/resource',
      });
      return config;
    },
  };
  ```
  > Per contract: do **not** add an `i18n` key here — it breaks `output:'export'`. SVGs resolve to URL strings via `asset/resource` (matching every current `<img src>`/`url(...)` usage); **no `@svgr/webpack` React-component transform is wired** because nothing in this repo imports SVGs as components. Phase 1 Task 1.4 verifies this end-to-end.

### 0.7 — `tsconfig.json`: Next-ize the compiler options + add aliases

Current `tsconfig` is Gatsby-flavored (`"jsx": "react"`, `"moduleResolution": "node"`, `include` lists `gatsby-node.ts`/`gatsby-config.ts`/`plugins`, no Next types). Precise diffs:

- [ ] State the failing condition: Next requires `jsx: "preserve"`, the `next` plugin/types, and `next-env.d.ts` in `include`; `tsc --noEmit` against the Gatsby tsconfig will not reflect Next's expectations.
- [ ] Edit `compilerOptions.jsx`:
  - before: `"jsx": "react"`
  - after: `"jsx": "preserve"`
  > Next's SWC handles JSX; `preserve` lets Next own the transform. (`esModuleInterop`, `allowSyntheticDefaultImports`, `strict`, `skipLibCheck`, `resolveJsonModule`, `target: esnext`, `lib: [dom, esnext]`, `module: esnext` all stay.)
- [ ] Change `moduleResolution`:
  - before: `"moduleResolution": "node"`
  - after: `"moduleResolution": "bundler"`
  > `bundler` is the modern Next default; if `tsc` complains under TS 4.9, fall back to `"node"` (both work — keep `node` if the typecheck baseline is cleaner with it).
- [ ] Add these `compilerOptions` (Next requirements) right after `skipLibCheck`:
  ```json
    "skipLibCheck": true,
    "noEmit": true,
    "isolatedModules": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  ```
- [ ] Add the two new path aliases inside `paths` (keep all existing ones):
  ```json
      "@Hooks/*": ["./src/hooks/*"],
      "@Intl/*": ["./src/intl/*"],
      "@Assets/*": ["./src/assets/*"],
      "@Server/*": ["./src/server/*"],
      "@I18n/*": ["./src/i18n/*"]
  ```
- [ ] **Fix the stale `@Images` mapping.** The current tsconfig maps `@Images/*` → `./src/images/*`, but the Gatsby alias pointed `@Images` → `src/assets/imgs` (where the 47 svgs + 22 rasters actually live). Correct it so `tsc`/Next resolve every `@Images/*.svg|png` import (Phase 1 depends on this):
  - before: `"@Images/*": ["./src/images/*"],`
  - after: `"@Images/*": ["./src/assets/imgs/*"],`
- [ ] Replace the `include` block (drop the Gatsby files; add Next's generated types):
  - before:
    ```json
    "include": [
      "./src/**/*",
      "./gatsby-node.ts",
      "./gatsby-config.ts",
      "./plugins/**/*"
    ]
    ```
  - after:
    ```json
    "include": [
      "next-env.d.ts",
      "**/*.ts",
      "**/*.tsx",
      ".next/types/**/*.ts"
    ],
    "exclude": ["node_modules"]
    ```
  > `next-env.d.ts` is auto-generated by `next dev`/`next build` (it must NOT be hand-created or edited — Next regenerates it; it should be gitignored — covered in Task 0.8). Until the first Next run generates it, `tsc` may warn it is missing; running `yarn dev` once (Task 0.13) creates it.

### 0.8 — `.gitignore`: add Next-generated artifacts

- [ ] Edit `/Users/kimsangcho/dev/side-job/Namsan/.gitignore`. The current file ignores `.cache/`, `public`, `src/gatsby-types.d.ts`, `.vscode`, `.env`, `firebase-key.json`, `.firebase`, `mise.toml`. Append Next's outputs:
  ```gitignore
  # Next.js
  .next/
  out/
  next-env.d.ts
  ```
  > Keep `public` ignored only if it is purely a Gatsby build dir. **Caution:** in Next, `public/` is the *static assets source dir* and is normally committed. Before keeping `public` in `.gitignore`, check whether anything must live in `public/` for Next (favicon, robots, `op_kakao.png` referenced in siteMetadata). Flag this for the asset-migration phase; do not un-ignore it blindly in Phase 0.

### 0.9 — Create `src/i18n/config.ts` (contract verbatim)

- [ ] Create `/Users/kimsangcho/dev/side-job/Namsan/src/i18n/config.ts`:
  ```ts
  export const locales = ['ko', 'en'] as const;
  export const defaultLocale = 'ko' as const;
  export type Locale = (typeof locales)[number];
  ```

### 0.10 — Create `src/interface/image.interface.ts` (contract verbatim)

- [ ] Create `/Users/kimsangcho/dev/side-job/Namsan/src/interface/image.interface.ts`:
  ```ts
  export interface RemoteImage {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
  }
  ```
  > The `IGatsbyImageData` → `RemoteImage` swap inside `src/interface/api.interface.ts` happens in Phase 3, not here. Phase 0 only introduces the new type.

### 0.11 — Create `src/server/serialize.ts` (contract verbatim)

- [ ] Create `/Users/kimsangcho/dev/side-job/Namsan/src/server/serialize.ts`:
  ```ts
  export const serialize = <T>(v: T): T =>
    JSON.parse(JSON.stringify(v, (_k, val) => (val === undefined ? null : val)));
  ```
  > Reminder for Phase 3 consumers: convert any Firestore `Timestamp` to `.toMillis()` **before** passing the object to `serialize`.

### 0.12 — `yarn install`

- [ ] State the failing condition: `node_modules` still has Gatsby and lacks Next; `next build` does not exist yet.
- [ ] Run the install (regenerates `yarn.lock`, drops Gatsby tree, pulls Next + new deps):
  ```bash
  cd /Users/kimsangcho/dev/side-job/Namsan && yarn install
  ```
- [ ] Verify Next resolved and Gatsby is gone:
  ```bash
  /Users/kimsangcho/dev/side-job/Namsan/node_modules/.bin/next --version    # prints a Next 14/15 version
  ls /Users/kimsangcho/dev/side-job/Namsan/node_modules/gatsby 2>/dev/null && echo "STILL PRESENT (bad)" || echo "gatsby removed (good)"
  ```
- [ ] (Engine note) `.nvmrc` is `18.17.1` and `mise.toml` pins node 18. Next 14 supports Node 18; **Next 15 requires Node ≥ 18.18**. If `yarn install` warns about the Next engine, bump `.nvmrc`/`mise.toml` to an 18.18+ (or 20 LTS) and re-run. Flag, don't silently change the pin beyond what's needed.

### 0.13 — Generate `next-env.d.ts` + typecheck baseline

- [ ] Run a one-shot `next dev` to generate `next-env.d.ts` (Ctrl-C after it prints "Ready"), or simply rely on the next `next build`. Confirm the file appeared:
  ```bash
  ls /Users/kimsangcho/dev/side-job/Namsan/next-env.d.ts
  ```
- [ ] State the failing condition + run the baseline typecheck:
  ```bash
  cd /Users/kimsangcho/dev/side-job/Namsan && yarn typecheck
  ```
  > Expect this to still report errors from un-migrated Gatsby-dependent source (`gatsby-node.ts`, components importing `gatsby`, `gatsby-plugin-image`, etc.) — those are resolved in Phases 1–5. The Phase-0 success criterion is narrower: **the new scaffold files (`src/i18n/config.ts`, `src/interface/image.interface.ts`, `src/server/serialize.ts`, `next.config.js`, edited `firebase.ts`/`algolia.ts`) themselves produce no type errors**, and `tsc` runs (config is valid, not crashing on bad options). Record the error count as the baseline to drive down. If `gatsby-node.ts` errors are noisy, they disappear in Task 0.14 (Phase 3+).

### 0.14 — (DEFERRED to after Phase 3) Delete Gatsby files

> **Do NOT run in Phase 0.** Recorded here for the deletion list + ordering. `gatsby-node.ts`'s `onCreateNode`/remote-image logic and `gatsby-config.ts`'s firestore/intl/svg settings are ported in Phase 3 (`firebaseAdmin.ts`, `next.config.js`, `src/i18n`). Delete only **after** Phase 3 verifies the ports.

- [ ] (Phase 3+) Confirmed-present files to delete: `gatsby-config.ts`, `gatsby-node.ts`, `gatsby-browser.tsx`, `gatsby-ssr.tsx`, `src/pages/test.tsx`. (`src/gatsby-types.d.ts` is gitignored and may not exist on disk — delete if present.)
  ```bash
  cd /Users/kimsangcho/dev/side-job/Namsan && git rm gatsby-config.ts gatsby-node.ts gatsby-browser.tsx gatsby-ssr.tsx src/pages/test.tsx && rm -f src/gatsby-types.d.ts
  ```
- [ ] (Phase 3+) Verify no source still imports from a deleted module:
  ```bash
  grep -rn "from 'gatsby'\|gatsby-source\|gatsby-plugin\|gatsby-image" /Users/kimsangcho/dev/side-job/Namsan/src   # expect: no output
  ```

### 0.15 — Commit Phase 0

- [ ] Branch off `develop` (never commit Phase 0 directly to a shared branch without a branch):
  ```bash
  cd /Users/kimsangcho/dev/side-job/Namsan && git checkout -b feature/nextjs-phase0-scaffold
  ```
- [ ] Stage exactly the Phase-0 changes (the staged deletion of `firebase-key.json`, edited `.gitignore`/`package.json`/`tsconfig.json`/`firebase.ts`/`algolia.ts`, new `next.config.js`/`.env.example`/`src/i18n/config.ts`/`src/interface/image.interface.ts`/`src/server/serialize.ts`, regenerated `yarn.lock`). **Do NOT stage `.env.local` or `firebase-key.json` contents** — confirm:
  ```bash
  git -C /Users/kimsangcho/dev/side-job/Namsan status --short
  git -C /Users/kimsangcho/dev/side-job/Namsan diff --cached --stat
  ```
- [ ] Sanity-check no secret is in the staged diff:
  ```bash
  git -C /Users/kimsangcho/dev/side-job/Namsan diff --cached | grep -i 'private_key\|BEGIN PRIVATE KEY' && echo "ABORT: secret staged" || echo "OK: no secret staged"
  ```
- [ ] Commit:
  ```bash
  git -C /Users/kimsangcho/dev/side-job/Namsan commit -m "chore(phase0): scaffold Next.js, untrack firebase-key.json, migrate env vars to NEXT_PUBLIC_*"
  ```

**Phase 0 done when:** `firebase-key.json` is untracked + ignored (and the user has rotated the key), no `process.env.GATSBY_` reads remain, `next.config.js`/`tsconfig.json`/`package.json` are Next-shaped, the three contract scaffold files exist, `yarn install` resolves Next without Gatsby, and `yarn typecheck` runs with a recorded baseline (remaining errors are owned by Phases 1–5). Gatsby source files remain on disk until Phase 3+ (Task 0.14).

---

## Phase 1 — Render shell (styled-components SSR)

> **Prerequisites from Phase 0 (assume done; do not redo here):** `next` + `next-intl` installed; `package.json` scripts changed to `"dev":"next dev"`, `"build":"next build"`, `"typecheck":"tsc --noEmit"`; `next.config.js` created with the LOCKED Phase 3 baseline (including the `asset/resource` SVG webpack rule — Task 1.4 below verifies it); `tsconfig.json` `paths` updated to add `@Server`/`@I18n` and fix the stale `@Images` mapping to `./src/assets/imgs/*` (done in Phase 0 Task 0.7). `firebase-admin`/`gray-matter`/`rehype-raw`/`next-image-export-optimizer` are NOT installed yet — the phases that use them install them.
>
> **CRITICAL CORRECTION to the shared contract (item 4).** I read every `@Images/*.svg` import in the codebase. There are **zero** SVG-as-React-component usages. All 48 svg imports are consumed as **URL strings**: `<img src={LogoFooter}>` (`Footer.tsx:13`), `logoSrc = LogoGnbIcon` (`LogoIcon.tsx`), and `background: url(${Icon})` in `.style.ts` files (e.g. `BaseButton.style.ts`, `MemberDescription.style.ts:32`). Gatsby resolved these as URLs because `gatsby-plugin-react-svg`'s `include: /assets\/imgs\/svg/` regex never matched — the svgs live flat in `src/assets/imgs/`, **not** in an `/assets/imgs/svg/` subfolder (`find src -type d -name svg` returns nothing; 47 svgs are directly under `src/assets/imgs`). Therefore a default SVGR rule that turns `import X from '*.svg'` into a React component would render `[object Object]` / `<img src="[object Object]">` and break ~70 sites. **Phase 1 must make svg imports resolve to a URL string, not a React component.** Tasks below implement that and verify it. (If a later phase genuinely needs `<Icon/>` components, use the `?react` resourceQuery form — but nothing in this repo needs it today.)

The same StaticImport caveat applies to **png/gif**: 22 raster imports (e.g. `IntroduceWrapper.tsx:6 import image1 from '@Images/introduce_bg1.png'`). Next's default static import returns `StaticImageData` (`{src,height,width,...}`), not a string, so any place that feeds the import straight into `<img src>` or `url(...)` needs `.src`. Item 5 handles the mechanical sweep.

---

### Task 1.1 — `src/pages/_document.tsx` (styled-components SSR collectStyles, sc v5 API)

- [ ] **State failing condition:** without a custom `_document` injecting server styles, styled-components rules are not present in the initial HTML → FOUC on first paint and a hydration style-order mismatch.
- [ ] Confirm the styled-components major: `node -p "require('./node_modules/styled-components/package.json').version"` → expect `5.3.x`. (Drives the `ServerStyleSheet` import path — v5, NOT v6 `StyleSheetManager` enhancer changes.)
- [ ] Create `src/pages/_document.tsx` with this exact content:

```tsx
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

- [ ] **Verify (defer to Task 1.6):** this file alone does nothing observable until `_app` + a test page exist; the FOUC-free check happens in 1.6.

---

### Task 1.2 — `src/pages/_app.tsx` (ThemeProvider + GlobalStyle, ported from gatsby `wrapRootElement`)

- [ ] **State failing condition:** without `_app`, no `ThemeProvider` is mounted, so every `${({ theme }) => theme.color...}` access (e.g. `Layout.style.ts:184 theme.color.black`) throws/`undefined`, and `GlobalStyle` (reset + fonts) never mounts.
- [ ] Port from `gatsby-browser.tsx` / `gatsby-ssr.tsx`: both wrap with `<ThemeProvider theme={theme}><GlobalStyle/>{element}</ThemeProvider>`. `theme` is the named export from `src/styles/varialbes.style.ts:67`. `GlobalStyle` is the default export of `src/styles/GlobalStyles.ts`. **Do NOT** port Gatsby's `<Layout>` wrap here (Gatsby's `gatsby-browser` did not wrap Layout; Layout is used per-page) and **do NOT** add `NextIntlClientProvider` (that is Phase 2).
- [ ] Create `src/pages/_app.tsx` with this exact content (uses the `@Styles` alias confirmed present in tsconfig):

```tsx
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@Styles/GlobalStyles';
import { theme } from '@Styles/varialbes.style';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

- [ ] **Verify:** `yarn typecheck` — the new `_app`/`_document` must type-check (will surface any missing `next` types if Phase 0 was incomplete). Full visual verify in 1.6.

---

### Task 1.3 — Fix `src/styles/GlobalStyles.ts` (Gatsby DOM ids → `#__next`, and font ES-module imports → `/public/fonts` URLs)

- [ ] **State failing condition (a):** `GlobalStyles.ts:42-44` targets `#___gatsby, #gatsby-focus-wrapper { height: 100% }`. Next renders into `#__next`, so the `height:100%` chain (relied on by `Layout.style.ts:12 LayoutWrapper{height:100%}` and `html,body{height:100%}`) breaks → full-height layouts collapse. (Grep confirms these two selectors are present at lines 42-43; no other gatsby selectors exist in the file.)
- [ ] **State failing condition (b):** `GlobalStyles.ts:1-2` do `import FHAlphaTestLight from '@Fonts/FHAlphaTest-Light.otf'`. Next has no built-in `.otf` loader; the import errors at build, and even if loadered it returns `{src}` not a string, so `src: url(${FHAlphaTestLight})` would emit `url([object Object])`.
- [ ] **Chosen font approach (option A — move to `/public/fonts`, reference by static URL):** simplest, zero webpack config, plays with `output:'export'`. Run:

```bash
mkdir -p public/fonts && cp src/fonts/FHAlphaTest-Light.otf src/fonts/FHAlphaTest-LightItalic.otf public/fonts/
```

- [ ] Edit `src/styles/GlobalStyles.ts` — remove the two otf ES-module imports (lines 1-2) and reference public URLs in the `@font-face` blocks. Also fix the format hint (`.otf` is `opentype`, not `truetype`) and the gatsby ids. Apply exactly:

  - Delete lines 1-2:
    ```ts
    import FHAlphaTestLight from '@Fonts/FHAlphaTest-Light.otf';
    import FHAlphaTestLightItalic from '@Fonts/FHAlphaTest-LightItalic.otf';
    ```
  - Change the first `@font-face` `src` line from
    ```ts
        src: url(${FHAlphaTestLight}) format('truetype');
    ```
    to
    ```ts
        src: url('/fonts/FHAlphaTest-Light.otf') format('opentype');
    ```
  - Change the second `@font-face` `src` line from
    ```ts
        src: url(${FHAlphaTestLightItalic}) format('truetype');
    ```
    to
    ```ts
        src: url('/fonts/FHAlphaTest-LightItalic.otf') format('opentype');
    ```
  - Change the gatsby id block (currently lines 42-45):
    ```ts
      #___gatsby,
      #gatsby-focus-wrapper {
        height: 100%;
      }
    ```
    to
    ```ts
      #__next {
        height: 100%;
      }
    ```

- [ ] **Note for reviewer (do NOT change in this task):** `@fontsource/noto-sans-kr` (line 3) is a CSS side-effect import and is fine under Next/webpack — leave it. The `@Fonts` alias becomes unused inside this file after the edit; that is intended (the `src/fonts/` originals can stay for now — removing them is out of scope).
- [ ] **Verify:** `yarn typecheck` passes (no more `.otf` module import). The visual font/height verify happens in 1.6.

---

### Task 1.4 — SVG imports resolve to URL strings (NOT React components)

- [ ] **State failing condition:** Next's default behavior with `@svgr/webpack` (or its default static handling) makes `import X from '*.svg'` a React component / object. Every existing consumer uses the import as a **URL string** (`Footer.tsx:13 <img src={LogoFooter}>`; `BaseButton.style.ts:139 url(${ArrowUpIcon})`; `LogoIcon.tsx logoSrc = LogoGnbIcon`). With a default SVGR rule these render `[object Object]` and icons/logos disappear.
- [ ] **Confirm Phase 0's SVG webpack rule (no `@svgr/webpack`).** Phase 0 Task 0.6 already set the `webpack(config){ ... }` hook in `next.config.js` to emit SVGs as `asset/resource` (URL strings), because this repo has zero SVG-as-React-component usages. Verify the hook matches the following exactly; if it differs, make it this:

```js
webpack(config) {
  // SVGs in this codebase are consumed ONLY as URL strings
  // (<img src=...>, css url(...)). Emit them as static asset URLs,
  // NOT React components.
  const fileLoaderRule = config.module.rules.find(
    (rule) => rule.test && rule.test.toString().includes('svg'),
  );
  if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;

  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    type: 'asset/resource',
  });
  return config;
}
```

  (`asset/resource` makes `import X from '*.svg'` a published-URL string, matching every current usage. No `@svgr/webpack` is installed or wired — nothing imports svgs as components. This must match the rule Phase 0 Task 0.6 already created.)
- [ ] **Verify step — import one existing svg as URL.** Temporarily, inside the throwaway test page from Task 1.6, add:

```tsx
import LogoFooter from '@Images/logo-footer.svg';
// ...inside the component JSX:
<img src={LogoFooter} alt="logo" width={120} />
```

  Then in 1.6's `yarn dev`, confirm the logo renders (a real `<img src="/_next/static/media/logo-footer.<hash>.svg">`, not `[object Object]`). Remove this with the rest of the throwaway page.

---

### Task 1.5 — PNG/GIF static imports: `.src` sweep for `url()` / `<img src>` consumers

- [ ] **State failing condition:** Next static imports of `*.png`/`*.gif` return `StaticImageData` (`{ src, width, height }`), not a string. Any consumer that puts the import directly into a CSS `url(...)` or a raw `<img src>` will emit `[object Object]`.
- [ ] **Triage which of the 22 raster imports are at risk.** Most are passed as a prop into a component that ultimately renders via `<Image>`/styled `url(${({url})=>url})` where the prop is already a string — those break unless the prop value gets `.src` at the import site. Find every raster import and trace its consumer:

```bash
# 1) list all raster imports + the symbol names
grep -rEn "import [A-Za-z0-9_]+ from '[^']*\.(png|gif|jpe?g)'" src --include="*.ts" --include="*.tsx"

# 2) find direct css url() usages of any JS expression (these need .src if fed a StaticImageData)
grep -rEn "url\(\\$\{" src --include="*.style.ts"

# 3) find raw <img src={...}> in tsx that may receive a StaticImageData
grep -rEn "<img[^>]*src=\{" src --include="*.tsx"
```

- [ ] **Mechanical fix pattern (apply per offending site, do not blanket-edit):** when a `StaticImageData` import flows into a string slot, append `.src` at the point of use. Examples of the transform:
  - `<img src={LogoFooter}>` → for **raster**: `<img src={image1.src}>` (svg already handled by Task 1.4's `asset/resource`, so `LogoFooter` stays a string and does NOT get `.src`).
  - In a const list like `ImageCard.const.ts` (`{ url: main1 }` fed into `background: url(${({url})=>url})`): change to `{ url: main1.src }`.
  - Prop hand-off like `IntroduceWrapper.tsx:38 imageSrc={image1}` whose receiver renders `url(${src})`: change to `imageSrc={image1.src}` (or, preferred long-term, the receiver migrates to `<Image>` in Phase 3 — for Phase 1 just make it a string so the shell renders).
- [ ] **Boundary note:** Do NOT convert these to `<Image>`/`RemoteImage` here — that is Phase 3. Phase 1 only ensures string-vs-object correctness so the shell + any test page compile and paint. Most of these components are not exercised by the Task 1.6 throwaway page, so a full sweep can be deferred; **but** any `.style.ts` `url(${StaticImport})` that loads at module-eval time can break a build — fix those eagerly. Use the grep output to decide; do not enumerate blindly.
- [ ] **Verify:** `yarn typecheck` — with the `asset/resource` SVG rule (string) and Next's image typings, `tsc` flags `StaticImageData` used where `string` is expected at the sites you touched; resolve each by adding `.src`. `tsc` clean = sweep complete for type-visible cases.

---

### Task 1.6 — Render-shell verification (throwaway styled page: FOUC-free dev + export), then commit

- [ ] **State failing condition:** prove the SSR style pipeline end-to-end. No `[locale]` pages exist yet, so use a throwaway page.
- [ ] Create `src/pages/_test_shell.tsx` exactly:

```tsx
import styled from 'styled-components';
import GlobalStyle from '@Styles/GlobalStyles'; // ensures fonts/reset compile
import LogoFooter from '@Images/logo-footer.svg'; // Task 1.4 url-string check

const Box = styled.div`
  ${''}
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
  background: ${({ theme }) => theme.color.navy};
  color: ${({ theme }) => theme.color.white};
  font-family: 'FHAlphaTestLight', 'noto-sans-cjk-kr', sans-serif;
  min-height: 100%;
`;

export default function TestShell() {
  return (
    <Box>
      <GlobalStyle />
      <h1>shell ok</h1>
      <img src={LogoFooter} alt="logo" width={160} />
    </Box>
  );
}
```

- [ ] **FOUC verify (dev):** `yarn dev`, open `http://localhost:3000/_test_shell/` (trailingSlash on). Confirm: (1) navy background + white text paint immediately with no flash of unstyled content; (2) `theme.color.navy`/`white` resolved (proves `_app` ThemeProvider); (3) the footer logo renders as an `<img>` with a real `/_next/static/media/...svg` URL (proves Task 1.4) — view source / inspect, NOT `[object Object]`.
- [ ] **SSR-markup verify:** view page source (Cmd+U) and confirm `<style data-styled ...>` tags with the styled-components rules are present in the **server HTML** `<head>` (proves Task 1.1 `_document` `collectStyles`). If absent → `_document` not wired.
- [ ] **Export verify:** `yarn build`. Confirm it completes with `output:'export'` and emits `out/_test_shell/index.html`; grep that file for the inline `<style>` rules and the font `@font-face` referencing `/fonts/FHAlphaTest-Light.otf`. Confirm `out/fonts/FHAlphaTest-Light.otf` exists (proves Task 1.3 public copy).
- [ ] **Cleanup:** delete the throwaway: `rm src/pages/_test_shell.tsx`. Re-run `yarn typecheck && yarn build` to confirm the shell still builds without the test page.
- [ ] **Commit** (only after all of the above pass):

```bash
git add src/pages/_app.tsx src/pages/_document.tsx src/styles/GlobalStyles.ts public/fonts next.config.js
git commit -m "$(cat <<'EOF'
feat(migration): Phase 1 render shell — styled-components SSR

- add src/pages/_document.tsx (ServerStyleSheet collectStyles, sc v5)
- add src/pages/_app.tsx (ThemeProvider + GlobalStyle, ported from gatsby wrapRootElement)
- GlobalStyles: #___gatsby/#gatsby-focus-wrapper -> #__next; otf fonts moved to /public/fonts and referenced by URL
- svg imports resolve to URL strings via asset/resource webpack rule (codebase uses no svg-as-component)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

> **Files this phase creates/edits:** `src/pages/_document.tsx` (new), `src/pages/_app.tsx` (new), `src/styles/GlobalStyles.ts` (edit), `public/fonts/FHAlphaTest-Light.otf` + `public/fonts/FHAlphaTest-LightItalic.otf` (new), `next.config.js` webpack hook (edit — coordinate with Phase 0), plus per-site `.src` fixes from Task 1.5. Throwaway `src/pages/_test_shell.tsx` is created then deleted.

---

## Phase 2 — i18n routing + static pages

Goal: stand up the `src/pages/[locale]/` segment with next-intl, port the three static pages (`index`, `introduce`, `contact`) into it, and replace the Gatsby `injectIntl`/`useIntl`/`changeLocale`/`useSiteMetadata`/Gatsby `Head` machinery with Next.js + next-intl equivalents — while keeping every URL prefixed with `/ko` or `/en` exactly as today.

Prerequisites assumed done in Phase 1/Phase 0: `next.config.js` (LOCKED baseline), `src/i18n/config.ts` (`locales`/`defaultLocale`/`Locale`), `tsconfig` path aliases (`@Server`, `@I18n` added), `next-intl` installed, `src/pages/_document.tsx` created. This phase does NOT touch Firebase data pages (`news`/`members`/`work`/`member`/`policy`) — those are Phase 4. It also does NOT migrate the 51 component-level intl usages wholesale; it ships the HOC + recipe and migrates only the components the three static pages actually render (Layout → GNB → Footer chain, plus IntroduceWrapper, ContactSection, RecruiteSection). The rest follow the identical recipe in their own phases.

Note: the Firebase hosting redirect for bare `/` lives in `firebase.json` and is Phase 6. This phase only provides the client-side `src/pages/index.tsx` fallback redirect.

---

### Task 2.1 — Move messages into next-intl loadable shape (no key edits yet)

next-intl loads a single message object per locale. Today messages live at `src/intl/ko.json` / `src/intl/en.json` (Gatsby's `gatsby-plugin-intl` path). Keep those files as the source of truth and load them by locale.

- [ ] Verify-fail: `node -e "require('./src/i18n/getMessages')"` errors (module absent). Confirm it does NOT exist: `ls src/i18n/getMessages.ts` → no such file.
- [ ] Create `src/i18n/getMessages.ts`:

```ts
import type { Locale } from './config';
import ko from '../intl/ko.json';
import en from '../intl/en.json';

const messagesByLocale: Record<Locale, Record<string, unknown>> = { ko, en };

export const getMessages = (locale: Locale) => messagesByLocale[locale];
```

- [ ] Confirm `tsconfig.json` has `"resolveJsonModule": true` (Gatsby's tsconfig already does; if not, add it). Verify: `yarn typecheck` passes.
- [ ] Commit: `feat(i18n): load intl json by locale for next-intl`.

---

### Task 2.2 — Shared static-page getStaticPaths/getStaticProps helper (DRY)

Every static `[locale]` page needs the identical `getStaticPaths` (cartesian over `locales`, `fallback:false`) and a `getStaticProps` that returns `{ locale, messages }`. Centralize it.

- [ ] Verify-fail: `ls src/i18n/getStaticProps.ts` → no such file.
- [ ] Create `src/i18n/getStaticProps.ts`:

```ts
import type { GetStaticPaths, GetStaticProps } from 'next';
import { locales, type Locale } from './config';
import { getMessages } from './getMessages';

export interface LocalePageProps {
  locale: Locale;
  messages: Record<string, unknown>;
  [key: string]: unknown;
}

export const localePaths = (): ReturnType<GetStaticPaths> => ({
  paths: locales.map(locale => ({ params: { locale } })),
  fallback: false,
});

export const localeProps =
  (extra?: Record<string, unknown>): GetStaticProps<LocalePageProps> =>
  async context => {
    const locale = context.params?.locale as Locale;
    if (!locales.includes(locale)) {
      return { notFound: true };
    }
    return {
      props: {
        locale,
        messages: getMessages(locale),
        ...(extra ?? {}),
      },
    };
  };
```

- [ ] Verify: `yarn typecheck` passes.
- [ ] Commit: `feat(i18n): shared localePaths/localeProps helper for static pages`.

Usage contract (each static page): `export const getStaticPaths = localePaths;` and `export const getStaticProps = localeProps();`. Pages needing page-specific props pass them: `localeProps({ route: 'main' })`.

---

### Task 2.3 — Wire NextIntlClientProvider into `src/pages/_app.tsx`

The contract requires `NextIntlClientProvider` nested INSIDE `ThemeProvider`, reading `pageProps.locale` + `pageProps.messages` (NOT `router.locale`, which does not exist under `output:'export'`).

- [ ] **EDIT the existing `src/pages/_app.tsx`** created in Phase 1 Task 1.2 — do NOT create a new one (Phase 1 already added `ThemeProvider` + `GlobalStyle`). Verify-fail: it currently has NO `NextIntlClientProvider`, so `useTranslations()` throws "No intl context found" at runtime. Confirm: `grep -n NextIntlClientProvider src/pages/_app.tsx` → no output.
- [ ] Replace its body with the version below (theme/GlobalStyle imports are already correct from Phase 1: `theme` from `@Styles/varialbes.style`, default `GlobalStyle` from `@Styles/GlobalStyles`), nesting `NextIntlClientProvider` inside `ThemeProvider`:

```tsx
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { NextIntlClientProvider } from 'next-intl';
import { theme } from '@Styles/varialbes.style'; // adjust to actual export
import GlobalStyle from '@Styles/GlobalStyles'; // adjust to actual export
import { defaultLocale } from '@I18n/config';

export default function App({ Component, pageProps }: AppProps) {
  const locale = pageProps.locale ?? defaultLocale;
  const messages = pageProps.messages ?? {};

  return (
    <ThemeProvider theme={theme}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="Asia/Seoul"
      >
        <GlobalStyle />
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
```

- [ ] If `theme`/`GlobalStyle` export names differ, fix the two import lines only (do not restructure). Verify: `yarn typecheck` passes.
- [ ] Commit: `feat(app): NextIntlClientProvider inside ThemeProvider in _app`.

---

### Task 2.4 — Port `useSiteMetadata` → `src/config/siteMetadata.ts` constant

The current `src/hooks/useSiteMetadata.ts` is a Gatsby `useStaticQuery` returning `data.site.siteMetadata`. That GraphQL source disappears with Gatsby. The actual values live in `gatsby-config.ts` `siteMetadata` (read above). Convert to a plain typed constant.

- [ ] Verify-fail: `ls src/config/siteMetadata.ts` → no such file.
- [ ] Create `src/config/siteMetadata.ts` with the EXACT values from `gatsby-config.ts`:

```ts
export const siteMetadata = {
  title: '법무법인 남산 | Lim, Chung & Suh',
  description:
    '법무법인 남산은 1980년 시작된 이래 현재까지 깊이 있는 역량과 정성으로 고객을 위한 맞춤형 법률 서비스를 제공하고 있습니다.',
  ogTitle: '법무법인 남산 | Lim, Chung & Suh',
  ogDescription: '시대를 넘어 함께 하는 법률 파트너',
  ogUrl: 'https://www.namsanlaw.com/',
  keywords:
    '남산,법무법인남산,법률사무소,변호사,로펌,승소,소송,법률자문,기업자문,재판,금융,건설,부동산,조세,관세,형사,식품,인사,노무,상속,보험,명동,법무법인',
  favicon: '/favicon.ico',
  ogImage: '/op_kakao.png',
  siteUrl: 'https://www.namsanlaw.com',
} as const;

export type SiteMetadata = typeof siteMetadata;
```

- [ ] Leave `src/hooks/useSiteMetadata.ts` in place for now (other files may still import it; it is removed in cleanup once all consumers move). Mention but do not delete. Verify: `yarn typecheck` passes.
- [ ] Commit: `feat(config): static siteMetadata constant replacing Gatsby useStaticQuery`.

---

### Task 2.5 — Convert `Seo.tsx` to `next/head` + the constant

Current `src/components/common/Seo/Seo.tsx` returns bare `<title>`/`<meta>` fragments (Gatsby `Head` API auto-hoists those) and pulls values from `useSiteMetadata()`. Under Next those tags must be wrapped in `next/head`'s `<Head>`. The `ISeoProps` interface is unchanged and stays.

- [ ] Verify-fail: building any page that renders bare `<title>` outside `<Head>` produces no `<title>` in `out/.../index.html`. (We assert the positive after.)
- [ ] Rewrite `src/components/common/Seo/Seo.tsx` (full after):

```tsx
import Head from 'next/head';
import React from 'react';
import { siteMetadata } from '@Config/siteMetadata';
import { ISeoProps } from './Seo.interface';

const SEO = (props: ISeoProps) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    ogTitle: defaultOgTitle,
    ogDescription: defaultOgDescription,
    ogUrl,
    keywords: defaultKeywords,
    favicon,
    siteUrl,
    ogImage,
  } = siteMetadata;

  const seo = {
    title: props.title ?? defaultTitle,
    description: props.description ?? defaultDescription,
    ogTitle: props.ogTitle ?? defaultOgTitle,
    ogDescription: props.ogDescription ?? defaultOgDescription,
    ogUrl: props.ogUrl ?? ogUrl,
    keywords: props.keywords ?? defaultKeywords,
    favicon: `${siteUrl}${favicon}`,
    ogImage: `${siteUrl}${ogImage}`,
    siteUrl: props.siteUrl ?? siteUrl,
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge; chrome=1" />
      <meta httpEquiv="subject" content="website" />
      <meta httpEquiv="author" content="하민호, 양원석" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta
        name="naver-site-verification"
        content="b19b8002ed5eed2d099c93752e8c4e37f86ce279"
      />
      <meta
        name="google-site-verification"
        content="8dGPS1J7S4mD2LzyCAPI6GWkO9jtTu1baEseazM1n5E"
      />
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={seo.ogUrl} />
      <meta name="robots" content="ALL" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="al:web:url" content={seo.siteUrl} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="icon" href={seo.favicon} />
      {props.children}
    </Head>
  );
};

export default SEO;
```

- [ ] Add `@Config -> src/config` to tsconfig paths (alongside the retained aliases) if not present, OR import via relative path `../../../config/siteMetadata`. Prefer adding `@Config` for consistency. Verify: `yarn typecheck` passes.
- [ ] Commit: `refactor(seo): next/head + static siteMetadata`.

Note: SEO is now rendered INSIDE the page body (via the page importing `<SEO/>`), not via a separate Gatsby `Head` export. Tasks 2.8–2.10 wire that in.

---

### Task 2.6 — `withTranslations` HOC for class/HOC-resistant components

There are 25 files using `injectIntl` and 42 importing from `gatsby-plugin-intl` (51 distinct intl call sites overall). Most convert cleanly with the hook recipe (Task 2.7). For any that resist (HOC-wrapped, or where `intl` is threaded as a prop like `IGNBProps extends WrappedComponentProps`), provide a drop-in shim so they migrate by swapping one import.

- [ ] Verify-fail: `ls src/hocs/withTranslations.tsx` → no such file.
- [ ] Create `src/hocs/withTranslations.tsx`:

```tsx
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

export interface InjectedIntl {
  locale: string;
  formatMessage: (descriptor: { id: string }) => string;
}

export interface WithIntlProps {
  intl: InjectedIntl;
}

/**
 * Drop-in replacement for gatsby-plugin-intl's `injectIntl`.
 * Wrapped component keeps using `props.intl.locale` and
 * `props.intl.formatMessage({ id })` unchanged.
 */
export function withTranslations<P extends WithIntlProps>(
  Component: React.ComponentType<P>,
) {
  const Wrapped = (props: Omit<P, keyof WithIntlProps>) => {
    const t = useTranslations();
    const locale = useLocale();
    const intl: InjectedIntl = {
      locale,
      formatMessage: ({ id }) => t(id),
    };
    return <Component {...(props as P)} intl={intl} />;
  };
  Wrapped.displayName = `withTranslations(${
    Component.displayName || Component.name || 'Component'
  })`;
  return Wrapped;
}
```

- [ ] Update `src/components/common/GNB/GNB.interface.ts` to drop the Gatsby type. Change line 1 + the `IGNBProps` declaration:

  Before:
  ```ts
  import { WrappedComponentProps } from 'gatsby-plugin-intl';
  import { MouseEventHandler } from 'react';
  ...
  interface IGNBProps extends WrappedComponentProps {
  ```
  After:
  ```ts
  import { MouseEventHandler } from 'react';
  import { WithIntlProps } from '@Hocs/withTranslations';
  ...
  interface IGNBProps extends WithIntlProps {
  ```

- [ ] Add `@Hocs -> src/hocs` to tsconfig paths. Verify: `yarn typecheck` passes for the HOC file in isolation (`yarn typecheck` whole-project will still fail until 2.7 lands GNB.tsx; that's expected — run after 2.7).
- [ ] Commit (after 2.7 so typecheck is green): combined with 2.7.

---

### Task 2.7 — Mechanical conversion recipe + GNB before→after

**Recipe (apply to each of the 51 sites):**
1. Replace `import { injectIntl } from 'gatsby-plugin-intl'` (and `WrappedComponentProps`) with either `import { withTranslations } from '@Hocs/withTranslations'` (HOC path, keeps `props.intl.*`) OR `import { useTranslations, useLocale } from 'next-intl'` (hook path).
2. Replace `import { useIntl } from 'gatsby-plugin-intl'` with `const t = useTranslations(); const locale = useLocale();`.
3. `intl.formatMessage({ id: 'a.b' })` → `t('a.b')`. `intl.locale` → `locale`.
4. `export default injectIntl(Component)` → `export default withTranslations(Component)` (HOC path) — OR remove the wrapper and use hooks inside (hook path).
5. `changeLocale(...)` and gatsby `Link`/`navigate` → `next/router` / `next/link` (Task 2.7b).
6. Messages containing `<br/>` → `t.rich(key, { br: () => <br /> })` (Task 2.11).

For GNB we take the **HOC path** because it threads `intl` as a prop and is rendered by the class-free but prop-driven Layout chain — minimal diff.

**`src/components/common/GNB/GNB.tsx` — before→after (only the changed lines):**

Before (lines 3–4, 164):
```tsx
import { Link } from 'gatsby';
import { injectIntl } from 'gatsby-plugin-intl';
...
export default injectIntl(GNB);
```
After:
```tsx
import Link from 'next/link';
import { withTranslations } from '@Hocs/withTranslations';
...
export default withTranslations(GNB);
```

All `<Link ... to={`/${intl.locale}${href}`}>` become `<Link ... href={`/${intl.locale}${href}`}>` — next/link uses `href`, not `to`. There are 4 `<Link>` usages (logo line 53, main nav line 65, mobile nav line 131) — change every `to=` to `href=`. Everything else (`intl.locale`, `intl.formatMessage({ id: translationId })`, the `S.*` styled components, Lottie wrappers) stays byte-for-byte identical because `withTranslations` injects the same `intl` shape.

Concrete diff for the main-nav Link (lines 65–70) as the representative example:

Before:
```tsx
<Link
  key={alt}
  className="link"
  to={`/${intl.locale}${href}`}
  about={alt}
>
```
After:
```tsx
<Link
  key={alt}
  className="link"
  href={`/${intl.locale}${href}`}
  about={alt}
>
```

**`src/components/common/GNB/GNB.hook.ts` — before→after:**

Current uses `useLocation` from `@reach/router`, `useIntl` + `changeLocale` from `gatsby-plugin-intl`. Replace with `next/router`. `path.pathname` → `router.asPath` (strip query) — but the existing code compares `path.pathname` to `/${locale}${href}` and checks `=== '/en' || === '/ko'`; `router.asPath` includes trailing slash under `trailingSlash:true`, so normalize. Full after:

```ts
import { useRouter } from 'next/router';
import { useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentMenu } from '@Components/members/MembersWrapper/MembersWarpper.helper';

const useGNB = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const location = useMemo(() => getCurrentMenu(), []);
  // normalize trailing slash so comparisons match `/${locale}${href}`
  const pathname = router.asPath.split('?')[0].replace(/\/$/, '') || '/';
  const path = { pathname };
  const getIsIncludes = (alt: string) => pathname.split('/').includes(alt);

  const handleChangeLanguage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { lang } = (e.target as HTMLElement).dataset as { lang: 'ko' | 'en' };

    if (!lang) return;
    if (lang === locale) return;

    if (pathname === '/en' || pathname === '/ko') {
      router.push(`/${lang}/`);
      return;
    }
    router.push(pathname.replace(/^\/(en|ko)/, `/${lang}`));
  };

  const handleMenuButtonClick = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const makeWidthByLanguage = (pathName: string) => {
    if (locale === 'ko') {
      return pathName !== `/${locale}/members` ? 54 : 41;
    }

    const lang = 'en';
    switch (pathName) {
      case `/${lang}/introduce`:
        return 45;
      case `/${lang}/work`:
        return 69;
      case `/${lang}/members`:
        return 102;
      case `/${lang}/news`:
        return 40;
      case `/${lang}/contact`:
        return 58;
      default:
        return 41;
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      window.document.body.style.overflow = 'hidden';
      return;
    }
    window.document.body.style.overflow = 'auto';
  }, [isMobileMenuOpen]);

  return {
    handleChangeLanguage,
    language: locale,
    handleMenuButtonClick,
    isMobileMenuOpen,
    location,
    path,
    getIsIncludes,
    makeWidthByLanguage,
  };
};

export default useGNB;
```

(Key changes: `@reach/router` `useLocation` → derived `path.pathname` from `router.asPath`; `useIntl().locale` → `useLocale()`; `changeLocale(lang)`/`changeLocale(lang,'/')` → `router.push(pathname.replace(/^\/(en|ko)/, '/'+lang))` / `router.push('/'+lang+'/')`. The returned `path` keeps the `{ pathname }` shape so `GNB.tsx` needs no change to its `path.pathname` reads.)

- [ ] Verify-fail (before edits): `yarn dev`, open `http://localhost:3000/ko/` → GNB throws or shows untranslated ids (no intl context / gatsby imports unresolved).
- [ ] Apply 2.6 (interface) + 2.7 (GNB.tsx, GNB.hook.ts) together.
- [ ] Verify: `yarn typecheck` passes (GNB + interface clean). Note Footer/IntroduceWrapper/ContactSection/RecruiteSection are also rendered by the static pages — convert each with the SAME recipe (they appear in the `gatsby-plugin-intl` grep list). Run `yarn typecheck` and fix each reported `gatsby-plugin-intl`/`@reach/router` import in the Layout→GNB→Footer + introduce/contact subtrees until green for those modules.
- [ ] Commit: `refactor(i18n): GNB + Layout chain injectIntl→withTranslations, changeLocale→next/router`.

---

### Task 2.7b — Layout has no intl; just confirm it passes through

`src/components/common/Layout/Layout.tsx` does NOT use intl directly (it renders `<GNB>` which is now self-wrapped via `withTranslations`). No change needed to Layout for i18n. Confirm by re-reading: the only child needing intl context is GNB/Footer, both handled by the provider in `_app`.

- [ ] Verify: grep `Layout.tsx` for `intl` → no matches. No edit. (Listed so the executor doesn't waste time.)

---

### Task 2.8 — Root redirect `src/pages/index.tsx`

Bare `/` must client-redirect to `/ko/`. Under `output:'export'` there is no server redirect; emit a static `out/index.html` that bounces.

- [ ] Verify-fail: with no `src/pages/index.tsx`, visiting `/` 404s.
- [ ] Create `src/pages/index.tsx` (full):

```tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { defaultLocale } from '@I18n/config';

export default function RootRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/${defaultLocale}/`);
  }, [router]);

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
    </Head>
  );
}
```

(The `<meta http-equiv="refresh">` guarantees redirect even before JS hydrates — important for the static export landing. The Firebase `firebase.json` `redirects` rule for `/ → /ko/` is added in Phase 6 and supersedes this for the CDN.)

- [ ] Verify: `yarn build` emits `out/index.html` containing `url=/ko/`. `yarn dev`, open `/` → lands on `/ko/`.
- [ ] Commit: `feat(routing): root client redirect to /ko/`.

---

### Task 2.9 — `src/pages/[locale]/index.tsx` (home)

Current `src/pages/index.tsx` (the Main page — note it will be REPLACED by the redirect above, so the Main body moves to `[locale]/index.tsx`). It uses `Layout`, `useResize`, lazy `FirstSection`/`ThirdSection`/`ForthSection`, eager `SecondSection`/`FifthSection`, and `export const Head = () => <SEO />`. Move the body and convert the Gatsby `Head` export → in-body `<SEO/>` + add `getStaticPaths`/`getStaticProps`.

- [ ] Verify-fail: `ls src/pages/\[locale\]/index.tsx` → no such file; `/ko/` 404s.
- [ ] Create `src/pages/[locale]/index.tsx` (full):

```tsx
import Layout from '@Components/common/Layout';
import Loading from '@Components/common/Loading';
import SEO from '@Components/common/Seo/Seo';
import FifthSection from '@Components/main/FifthSection';
import SecondSection from '@Components/main/SecondSection';
import useResize from '@Hooks/useResize';
import * as React from 'react';
import { localePaths, localeProps } from '@I18n/getStaticProps';

const FirstSection = React.lazy(() => import('@Components/main/FirstSection'));
const ThirdSection = React.lazy(() => import('@Components/main/ThirdSection'));
const ForthSection = React.lazy(() => import('@Components/main/ForthSection'));

const Main = () => {
  const { isMobile, isTablet, isDesktop } = useResize();
  const [isTransparent, setIsTransparent] = React.useState(false);
  const eventBus = (isView: boolean) => {
    setIsTransparent(isView);
  };
  return (
    <>
      <SEO />
      <Layout route="main" isMobile={isMobile} isTransparent={isTransparent}>
        <React.Suspense fallback={<Loading height="500px" />}>
          <FirstSection
            isMobile={isMobile}
            isDesktop={isDesktop}
            eventBus={eventBus}
          />
        </React.Suspense>
        <SecondSection isMobile={isMobile} />
        <React.Suspense fallback={<Loading height="500px" />}>
          <ThirdSection isMobile={isMobile} isTablet={isTablet} />
        </React.Suspense>
        <React.Suspense fallback={<Loading height="500px" />}>
          <ForthSection isMobile={isMobile} isTablet={isTablet} />
        </React.Suspense>
        <FifthSection isMobile={isMobile} />
      </Layout>
    </>
  );
};

export default Main;

export const getStaticPaths = localePaths;
export const getStaticProps = localeProps();
```

(Changes from Gatsby version: removed `import { PageProps } from 'gatsby'` and `React.FC<PageProps>`; removed `export const Head = () => <SEO />` and instead render `<SEO />` at top of the returned tree; added the two static functions. `React.lazy`/`Suspense` work under Next pages router on the client; SSR of lazy is fine for export since these are client-only sections.)

- [ ] Verify: `yarn build` emits `out/ko/index.html` and `out/en/index.html`, each with `<title>법무법인 남산 | Lim, Chung & Suh</title>`. `yarn dev` → `/ko/` renders, GNB language toggle to ENG navigates to `/en/`.
- [ ] Commit: `feat(pages): [locale]/index home page with getStaticPaths/Props`.

---

### Task 2.10 — `src/pages/[locale]/introduce.tsx` and `src/pages/[locale]/contact.tsx`

Current `src/pages/introduce.tsx` and `src/pages/contact.tsx` use Layout + their wrapper components and Gatsby `Head` exports with hardcoded `siteUrl`. The hardcoded `siteUrl` was always `/ko/...` even for EN (existing behavior) — make it locale-aware via the page's `locale` prop so EN pages get correct canonical, but keep behavior otherwise identical.

- [ ] Verify-fail: `/ko/introduce/` 404s (no file).
- [ ] Create `src/pages/[locale]/introduce.tsx` (full):

```tsx
import React from 'react';
import IntroduceWrapper from '@Components/introduce/IntroduceWrapper';
import Layout from '@Components/common/Layout';
import SEO from '@Components/common/Seo/Seo';
import { localePaths, localeProps, type LocalePageProps } from '@I18n/getStaticProps';

const Introduce = ({ locale }: LocalePageProps) => {
  return (
    <>
      <SEO siteUrl={`https://www.namsanlaw.com/${locale}/introduce`} />
      <Layout>
        <IntroduceWrapper>
          <div></div>
        </IntroduceWrapper>
      </Layout>
    </>
  );
};

export default Introduce;

export const getStaticPaths = localePaths;
export const getStaticProps = localeProps();
```

- [ ] Create `src/pages/[locale]/contact.tsx` (full) — note the Naver map script previously injected via Gatsby `Head`'s `<script>` child; pass it as `<SEO>` children (next/head supports script children):

```tsx
import React from 'react';
import ContactSection from '@Components/contact/ContactSection';
import RecruiteSection from '@Components/contact/RecruiteSection';
import ContactWrapper from '@Components/contact/ContactWrapper';
import Layout from '@Components/common/Layout';
import { DividerWrapper } from '@Components/contact/Divider/Divider.style';
import SEO from '@Components/common/Seo/Seo';
import { localePaths, localeProps, type LocalePageProps } from '@I18n/getStaticProps';

const Contact = ({ locale }: LocalePageProps) => {
  return (
    <>
      <SEO siteUrl={`https://www.namsanlaw.com/${locale}/contact`}>
        <script
          type="text/javascript"
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r3n2d43r6e"
        />
      </SEO>
      <Layout>
        <ContactWrapper>
          <ContactSection />
          <DividerWrapper />
          <RecruiteSection />
        </ContactWrapper>
      </Layout>
    </>
  );
};

export default Contact;

export const getStaticPaths = localePaths;
export const getStaticProps = localeProps();
```

- [ ] Delete the old flat Gatsby pages now superseded: `src/pages/introduce.tsx`, `src/pages/contact.tsx`, and the old `src/pages/index.tsx` Main body (it became the redirect in 2.8 and the home in 2.9 — the original Main file must NOT remain under `src/pages/index.tsx` with the old Gatsby `Head` export). Confirm `src/pages/index.tsx` now contains ONLY the redirect from Task 2.8.
- [ ] Verify: `yarn build` emits `out/ko/introduce/index.html`, `out/en/introduce/index.html`, `out/ko/contact/index.html`, `out/en/contact/index.html`. Grep `out/ko/introduce/index.html` for the introduce copy (e.g. a `common.introduce` translated string rendered by `IntroduceWrapper`/GNB) and confirm Korean text; grep `out/en/introduce/index.html` for the English equivalent. Confirm `out/ko/contact/index.html` contains `oapi.map.naver.com`.
- [ ] `yarn dev` visual: `/ko/introduce/`, `/en/introduce/`, `/ko/contact/` (map loads), language toggle works on each.
- [ ] Commit per page: `feat(pages): [locale]/introduce` then `feat(pages): [locale]/contact`.

---

### Task 2.11 — `<br/>` messages → `<br></br>` + `t.rich`

next-intl treats message markup tags via `t.rich`. Tags must be well-formed paired tags in the JSON (`<br></br>`), and rendered with a tag handler. Self-closing `<br/>` in the JSON will not parse as a rich tag.

- [ ] Find all affected keys: `grep -rnE '<br ?/>' src/intl/*.json`. (Current hits: `ko.json` lines 13,14,17,18 — `description2`, `description2_mobile`, `title3_2`, `title3_2_mobile`; `en.json` lines 13,14 — `description2`, `description2_mobile`. 10 total `<br/>` occurrences across both files.)
- [ ] JSON change — ONE example, `ko.json` `description2` (line 13):

  Before:
  ```json
  "description2": "법무법인 남산은 깊이 있는 역량과 정성으로<br/> 고객에게 최적화된 맞춤형 서비스를 제공합니다.",
  ```
  After:
  ```json
  "description2": "법무법인 남산은 깊이 있는 역량과 정성으로<br></br> 고객에게 최적화된 맞춤형 서비스를 제공합니다.",
  ```
  Apply the identical `<br/>` → `<br></br>` substitution to every grep hit in both files (sed: `sed -i '' -E 's#<br ?/>#<br></br>#g' src/intl/ko.json src/intl/en.json` — then re-run the grep to confirm zero `<br/>` remain and `grep -c '<br></br>' ` matches the expected count).
- [ ] Render-site change — ONE example. These keys (`description2`, `title3_2`, etc.) are consumed by `SecondSection`/`ThirdSection` (in the `gatsby-plugin-intl` grep list). Wherever the old code did `intl.formatMessage({ id: 'a.b' })` or `t('a.b')` for a `<br>`-bearing key, switch to:

  Before (hook path, post-2.7):
  ```tsx
  {t('a.b')}
  ```
  After:
  ```tsx
  {t.rich('a.b', { br: () => <br /> })}
  ```

  Note: any component still threading `intl` via the HOC and rendering a `<br>` key must move that specific call to the hook (`useTranslations` → `t.rich`), since `withTranslations.formatMessage` only does plain `t(id)`. These `<br>` keys live in the main sections (SecondSection/ThirdSection), converted in their own phase via the hook path — flag them there. Within Phase 2 scope, none of index/introduce/contact's own page bodies render a `<br>` key directly, so the only Phase-2 obligation is the JSON normalization (so the main sections don't break once converted).
- [ ] Verify: `yarn build` — no build error from malformed messages; `grep -rE '<br ?/>' src/intl/*.json` returns nothing.
- [ ] Commit: `fix(i18n): normalize <br/> to <br></br> for next-intl rich tags`.

---

### Task 2.12 — Phase 2 acceptance gate

- [ ] `yarn typecheck` passes for: `_app`, `index` redirect, `[locale]/{index,introduce,contact}`, `Seo`, `siteMetadata`, `getStaticProps`, `getMessages`, `withTranslations`, GNB + GNB.hook + GNB.interface, and the Layout→Footer + introduce/contact wrapper subtrees. (Other unconverted pages — `news`, `members`, `work`, `member`, templates, `test.tsx` — may still reference `gatsby-plugin-intl`; they are explicitly out of Phase 2 scope and are converted in Phases 4–5. If `yarn typecheck` is whole-project and red on those, temporarily exclude them in `tsconfig` `exclude` OR accept the known reds and gate only on the Phase-2 files compiling — document which.)
- [ ] `yarn build` emits all of: `out/index.html` (redirects to `/ko/`), `out/ko/index.html`, `out/en/index.html`, `out/ko/introduce/index.html`, `out/en/introduce/index.html`, `out/ko/contact/index.html`, `out/en/contact/index.html`.
- [ ] `yarn dev` visual pass: home/introduce/contact in both locales; GNB nav links carry the `/ko` or `/en` prefix; KOR/ENG toggle swaps locale and stays on the same page (`router.push(pathname.replace(/^\/(en|ko)/, '/'+lang))`); contact map loads.
- [ ] Final commit if anything bundled: `chore(phase2): i18n routing + static pages complete`.

Files created/modified in Phase 2 (all absolute):
- `/Users/kimsangcho/dev/side-job/Namsan/src/i18n/getMessages.ts` (new)
- `/Users/kimsangcho/dev/side-job/Namsan/src/i18n/getStaticProps.ts` (new)
- `/Users/kimsangcho/dev/side-job/Namsan/src/pages/_app.tsx` (new)
- `/Users/kimsangcho/dev/side-job/Namsan/src/config/siteMetadata.ts` (new)
- `/Users/kimsangcho/dev/side-job/Namsan/src/hocs/withTranslations.tsx` (new)
- `/Users/kimsangcho/dev/side-job/Namsan/src/pages/index.tsx` (replaced: Main body → root redirect)
- `/Users/kimsangcho/dev/side-job/Namsan/src/pages/[locale]/index.tsx` (new, holds former Main body)
- `/Users/kimsangcho/dev/side-job/Namsan/src/pages/[locale]/introduce.tsx` (new)
- `/Users/kimsangcho/dev/side-job/Namsan/src/pages/[locale]/contact.tsx` (new)
- `/Users/kimsangcho/dev/side-job/Namsan/src/components/common/Seo/Seo.tsx` (rewritten: next/head + constant)
- `/Users/kimsangcho/dev/side-job/Namsan/src/components/common/GNB/GNB.tsx` (injectIntl→withTranslations, next/link)
- `/Users/kimsangcho/dev/side-job/Namsan/src/components/common/GNB/GNB.hook.ts` (next/router + useLocale)
- `/Users/kimsangcho/dev/side-job/Namsan/src/components/common/GNB/GNB.interface.ts` (WrappedComponentProps→WithIntlProps)
- `/Users/kimsangcho/dev/side-job/Namsan/src/intl/ko.json`, `/Users/kimsangcho/dev/side-job/Namsan/src/intl/en.json` (`<br/>`→`<br></br>`)
- `/Users/kimsangcho/dev/side-job/Namsan/src/pages/introduce.tsx`, `/Users/kimsangcho/dev/side-job/Namsan/src/pages/contact.tsx` (deleted; superseded by `[locale]/*`)
- `tsconfig.json` paths: add `@Config`, `@Hocs` (plus `@Server`, `@I18n` if not already from Phase 1)
- Layout→Footer + introduce/contact wrapper components: same `injectIntl`/`useIntl`→next-intl recipe applied (in-scope because rendered by the three static pages)

---

## Phase 3 — Data layer + dynamic routes

> Hardest phase: it ports the entirety of `gatsby-node.ts`'s `onCreateNode` + `createPages` logic (Firestore queries, image-path resolution, member cross-reference, `∙`→`·`, work main/sub resolution, news prev/next-by-order) into build-time `getStaticPaths`/`getStaticProps` reading directly from `firebase-admin`. Each task follows the build/typecheck/visual TDD analog. Commit per route.
>
> **Prerequisite assumptions (state explicitly):**
> - Phases 1–2 already created `next.config.js` (LOCKED baseline), `src/pages/_app.tsx`/`_document.tsx`, `src/i18n/config.ts`, `src/interface/image.interface.ts` + `src/server/serialize.ts` (Phase 0), tsconfig `paths` (+`@Server`, `@I18n`), and the i18n component conversions (`injectIntl`→`useTranslations`, gatsby `Link`/`navigate`→`next/*`). Phase 3 does NOT recreate those. **If Phase 2 added any temporary `exclude` entries to `tsconfig.json`** to keep `yarn typecheck` green on not-yet-converted pages, remove them at the START of this phase so Phase 3's typecheck covers the whole project again.
> - `firebase-admin` is **not** in `package.json` yet — Task 3.0 installs it.
> - Admin creds come from `process.env` (the committed `firebase-key.json` is the rotated/dead key per Phase 0). Local `.env` must define `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (the last with literal `\n` newlines) before `yarn build` will succeed. The real values map 1:1 from `firebase-key.json`: `project_id` → `FIREBASE_PROJECT_ID` (`namsan-801de`), `client_email` → `FIREBASE_CLIENT_EMAIL`, `private_key` → `FIREBASE_PRIVATE_KEY`.
> - Firestore collections are `members`, `work`, `news` (from `gatsby-config.ts` `gatsby-source-firestore-easy`). Field names below are taken verbatim from the `gatsby-node.ts` GraphQL queries.

---

### Task 3.0 — Install firebase-admin (dependency)

- [ ] **Verify it fails first:** run `yarn typecheck` after writing `src/server/firebaseAdmin.ts` (Task 3.1) without the dep — it will error `Cannot find module 'firebase-admin'`. (This is the failing condition for 3.0+3.1 together.)
- [ ] Run: `yarn add firebase-admin`
- [ ] Confirm `package.json` now lists `firebase-admin` under `dependencies`.
- [ ] Commit: `chore(phase3): add firebase-admin for build-time data fetching`

---

### Task 3.1 — Create `src/server/firebaseAdmin.ts` (canonical server data module)

Replicates the three Firestore reads from `gatsby-node.ts` (`allMembers sort order ASC`, `allWork sort categoryId ASC`, `allNews`) plus the Storage URL builder that replaces `getFileFromStorage` (which used the client SDK `getDownloadURL`). The admin SDK has no `getDownloadURL`, so we build the public Firebase Storage media URL by hand per the contract.

- [ ] **Failing condition:** module does not exist; `getStaticProps` in later tasks cannot import `getAllMembers`. Confirmed once Task 3.4 page imports it and `yarn typecheck` fails.
- [ ] Create `src/server/firebaseAdmin.ts` with the COMPLETE contents below.

```ts
// src/server/firebaseAdmin.ts
// Import ONLY from inside getStaticPaths / getStaticProps. Never from client bundles.
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const STORAGE_BUCKET = 'namsan-801de.appspot.com';

const app = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // .env stores the key with literal "\n"; turn them back into real newlines.
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: STORAGE_BUCKET,
    });

export const adminDb = getFirestore(app);
export const adminBucket = getStorage(app).bucket();

// Replaces client getDownloadURL(ref(storage, path)) used by gatsby-node's getFileFromStorage.
// Returns the public media download URL for a Storage object path.
export const storageUrl = (path: string): string =>
  'https://firebasestorage.googleapis.com/v0/b/' +
  STORAGE_BUCKET +
  '/o/' +
  encodeURIComponent(path) +
  '?alt=media';

// ---- shared Firestore document shapes (build-time only) ----
export interface MemberDoc {
  id: string;
  language: 'ko' | 'en';
  name: string;
  position: string;
  email: string;
  order: string;
  businessFields: string[];
  description?: string;
  descriptionPreview?: string;
  educations?: { time?: string; value: string }[];
  careers?: { time?: string; value: string }[];
  papers?: { value: string }[];
  awards?: { time?: string; value: string }[];
  imagePath: string;
  bgImagePath: string;
}

export interface WorkDoc {
  id: string;
  language: 'ko' | 'en';
  categoryId: string;
  categoryInfo: string[];
  description: string[];
  imagePath: string;
  member: { main: string[]; sub: string[] };
}

export interface NewsDoc {
  id: string;
  newsType: 'all' | 'media' | 'recent';
  originalLink: string;
  imagePath: string;
  title: string;
  date: number; // Firestore Timestamp converted to .toMillis() (see serialize note)
  content: string;
  agency: string;
  order: number;
  summary: string;
}

// ---- module-level Promise memoization (build runs each getStaticProps; fetch once) ----
let _members: Promise<MemberDoc[]> | undefined;
let _work: Promise<WorkDoc[]> | undefined;
let _news: Promise<NewsDoc[]> | undefined;

export const getAllMembers = (): Promise<MemberDoc[]> =>
  (_members ??= adminDb
    .collection('members')
    .orderBy('order', 'asc')
    .get()
    .then(snap =>
      snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<MemberDoc, 'id'>) })),
    ));

export const getAllWork = (): Promise<WorkDoc[]> =>
  (_work ??= adminDb
    .collection('work')
    .orderBy('categoryId', 'asc')
    .get()
    .then(snap =>
      snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<WorkDoc, 'id'>) })),
    ));

export const getAllNews = (): Promise<NewsDoc[]> =>
  (_news ??= adminDb
    .collection('news')
    .get()
    .then(snap =>
      snap.docs.map(d => {
        const data = d.data();
        // gatsby-node read news.date as a Firestore Timestamp; convert before serialize.
        const date =
          data.date && typeof data.date.toMillis === 'function'
            ? data.date.toMillis()
            : data.date;
        return { id: d.id, ...(data as Omit<NewsDoc, 'id' | 'date'>), date };
      }),
    ));
```

- [ ] **Decision to surface:** the original `member.main/sub` in `work` docs and `memberId` in `news` docs may be stored as Firestore `DocumentReference`s (the client `news.api.ts` calls `memberId.get()`). The `member.main/sub` cross-reference in `gatsby-node.ts` matches **by email string** (`member.email === memberEmail`), so `main`/`sub` are email-string arrays — typed as `string[]` above, matching gatsby-node. If a `yarn build` run reveals they are references, fall back to `.id`/`.path`; note this in the commit. (`news.memberId` is NOT needed at build time — `getNewsMember` stays client-side, see Task 3.6.)
- [ ] Run `yarn typecheck` — expect it to pass for this file in isolation (no consumers yet). Commit: `feat(phase3): add firebaseAdmin server data module`

---

### Task 3.2 — Confirm `src/server/serialize.ts` exists (created in Phase 0 Task 0.11)

Needed because `getStaticProps` cannot return `undefined` fields (Next throws) and the news prev/next logic returns `undefined` heavily (`prevNews?.data?.news`, `nextNews`, `newsImageData`). This helper was **already created in Phase 0 Task 0.11** — do NOT recreate it.

- [ ] Verify it is present with the canonical contents: `cat src/server/serialize.ts`. Expect:
  ```ts
  // src/server/serialize.ts
  export const serialize = <T>(v: T): T =>
    JSON.parse(JSON.stringify(v, (_k, val) => (val === undefined ? null : val)));
  ```
  If absent, create it now with exactly the above (Phase-0 contract file). No separate commit — it ships with the first route that imports it.

---

### Task 3.3 — Replace `IGatsbyImageData` with `RemoteImage` (one atomic change)

`IGatsbyImageData` appears in **5 source files** (confirmed by grep). This task replaces all of them in one commit. `src/gatsby-types.d.ts` is Gatsby-only and is removed in a separate Gatsby-teardown phase — do NOT touch it here.

- [ ] **Failing condition:** `yarn typecheck` currently resolves `IGatsbyImageData` via `gatsby-plugin-image`; once that import is removed it errors. After this task, all types must reference `RemoteImage`.
- [ ] `src/interface/image.interface.ts` already exists from Phase 0 Task 0.10. Verify it matches the canonical `RemoteImage` shape (do NOT recreate):

```ts
// src/interface/image.interface.ts
export interface RemoteImage {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
}
```

- [ ] Edit `src/interface/api.interface.ts`:
  - Remove line 3: `import { IGatsbyImageData } from 'gatsby-plugin-image';`
  - Add: `import { RemoteImage } from '@Interface/image.interface';`
  - Line 42 `newsImageData?: IGatsbyImageData;` → `newsImageData?: RemoteImage;`
  - Line 85 `image: IGatsbyImageData;` → `image: RemoteImage;`
  - Line 86 `bgImage: IGatsbyImageData;` → `bgImage: RemoteImage;`
- [ ] Edit `src/components/news/NewsDetail/NewsDetail.interface.ts`:
  - Remove line 2 `import { IGatsbyImageData } from 'gatsby-plugin-image';` (it is unused after the api.interface change — `IGatsbyImageData` is not referenced in this file's body, only imported; remove the orphan import).
- [ ] Edit `src/components/work/DetailPage.tsx`:
  - Line 6 `import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';` → handled in Task 3.7 (component conversion). For the **type** only, change line 32 `backgroundImage?: IGatsbyImageData;` → `backgroundImage?: RemoteImage;` and add `import { RemoteImage } from '@Interface/image.interface';`. (The `GatsbyImage` value import is removed in 3.7.)
- [ ] Edit `src/pages/work/[id].tsx` (becomes `src/pages/[locale]/work/[id].tsx` in Task 3.5; do the type swap there). The three spots:
  - Line 5 import removed.
  - Lines 33–41 `backgroundImage: { data: { file: { childImageSharp: { gatsbyImageData: IGatsbyImageData } } } }` → replaced entirely by `backgroundImage?: RemoteImage` (the nested gatsby `childImageSharp` shape is gone; getStaticProps now supplies a flat `RemoteImage`).
  - Lines 61–62 `image: IGatsbyImageData; bgImage: IGatsbyImageData;` → `image: RemoteImage; bgImage: RemoteImage;`
- [ ] Run `yarn typecheck`. Expect remaining errors ONLY in `Member.tsx`/`MemberItem.tsx`/`NewsDetail.tsx`/`DetailPage.tsx` from the `GatsbyImage` **value** usage (fixed in Task 3.7) — no remaining `IGatsbyImageData` errors. Verify: `grep -rn "IGatsbyImageData" src/ | grep -v gatsby-types.d.ts` returns nothing.
- [ ] Commit: `refactor(phase3): replace IGatsbyImageData with RemoteImage`

---

### Task 3.4 — Build helper `src/server/buildMembers.ts` (port member cross-reference + categoryIds + `∙`→`·`)

This ports lines 136–185 of `gatsby-node.ts` `createPages` (`contextMembers`): the `businessFields.replaceAll('∙','·')`, the `categoryIds` lookup against work `categoryInfo`, and building `image`/`bgImage`. In gatsby these were `gatsbyImageData`; now they become `RemoteImage` from `storageUrl`. The gatsby `image` had `backgroundColor:'#F6F8FA'` — that is a sharp placeholder concern and is dropped (Member.style applies the bg; Phase 5 `blurDataURL` covers placeholders).

**Image-path note (ported faithfully):** gatsby-node looked up the profile image via `file(name: {regex})` on `imagePath.split('/')[1].split('.')[0]` and the bg via `file(name: {eq: node.bgImagePath})`. With direct Storage URLs we skip the sharp/file-node indirection: the profile image is just `storageUrl(node.imagePath)` and the bg is `storageUrl(node.bgImagePath)`. Width/height: gatsby's CONSTRAINED layout computed intrinsic dimensions from sharp; since Phase 3 uses `next/image` `unoptimized`, supply nominal intrinsics matching the design (`Member.style` constrains via CSS). Use the design's profile box (e.g. `width:600,height:600`) and bg (`width:1920,height:1080`) — confirm against `Member.style.ts` during visual verify and adjust if distorted.

- [ ] **Failing condition:** `member/[order].tsx` getStaticProps has nothing to build `contextMembers` from; importing `buildContextMembers` fails until created.
- [ ] Create `src/server/buildMembers.ts`:

```ts
// src/server/buildMembers.ts
import { IMember } from '@Interface/api.interface';
import { getAllMembers, getAllWork, storageUrl } from '@Server/firebaseAdmin';

// Ports gatsby-node createPages contextMembers (members order ASC + categoryIds + ∙→· + images).
export const buildContextMembers = async (): Promise<IMember[]> => {
  const members = await getAllMembers(); // already sorted order ASC
  const work = await getAllWork();

  // gatsby: work(categoryInfo: {in: field}) -> categoryId. Build a field -> categoryId map.
  // categoryInfo is a string[]; map EVERY entry to its categoryId so any businessField matches.
  const fieldToCategoryId: Record<string, string> = {};
  work.forEach(w =>
    (w.categoryInfo ?? []).forEach(info => {
      if (fieldToCategoryId[info] === undefined) {
        fieldToCategoryId[info] = w.categoryId;
      }
    }),
  );

  return members.map(node => {
    const businessFields = (node.businessFields ?? []).map(field =>
      field.replaceAll('∙', '·'),
    );
    const categoryIds = businessFields.map(
      field => fieldToCategoryId[field] ?? '',
    );

    return {
      ...node,
      businessFields,
      categoryIds,
      image: { src: storageUrl(node.imagePath), width: 600, height: 600 },
      bgImage: {
        src: storageUrl(node.bgImagePath),
        width: 1920,
        height: 1080,
      },
    } as IMember;
  });
};
```

- [ ] **Surface a difference from gatsby-node:** gatsby's `categoryIds` ran one GraphQL `work(categoryInfo:{in:field})` per businessField and matched on the **first** work doc whose `categoryInfo` contained the field. The map above reproduces this (first-wins, `categoryInfo` flattened). It is O(work) instead of O(members×fields) queries — same result, faster build.
- [ ] Run `yarn typecheck`. Commit: `feat(phase3): add buildContextMembers helper`

---

### Task 3.5 — `src/pages/[locale]/member/[order].tsx` (getStaticPaths × getStaticProps)

Current page (`src/pages/member/[order].tsx`) received `members`, `order` via gatsby `pageContext` and filtered by `member.order === order && member.language === intl.locale`. In Next, the locale lives in the route, so `getStaticProps` resolves the single member + the full `contextMembers` (needed because the original `Member` component is passed only `member`, but `DetailPage`/work reuse the full list — keep the same prop shape: page passes `member` to `<Member>`). The `Head` (SEO) becomes per-page `next/head`.

- [ ] **Failing condition:** route `out/ko/member/<order>/index.html` does not exist; `yarn build` will not emit it until this page exists. Confirm by checking `out/` has no member dir before this task.
- [ ] Create `src/pages/[locale]/member/[order].tsx`:

```tsx
// src/pages/[locale]/member/[order].tsx
import Layout from '@Components/common/Layout';
import Member from '@Components/member/Member';
import { IMember } from '@Interface/api.interface';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

interface Props {
  member: IMember | null;
  locale: string;
  messages: Record<string, any>;
}

const MemberPage: React.FC<Props> = ({ member }) => {
  return (
    <Layout>
      <Head>
        <title>{member?.name ?? '법무법인 남산'}</title>
        <meta property="og:title" content={member?.name ?? ''} />
        <meta name="description" content={member?.description ?? ''} />
        <meta property="og:description" content={member?.description ?? ''} />
        <meta
          property="og:url"
          content="https://www.namsanlaw.com/ko/members"
        />
      </Head>
      {member && <Member member={member} />}
    </Layout>
  );
};

export default MemberPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { buildContextMembers } = await import('@Server/buildMembers');
  const members = await buildContextMembers();

  // gatsby created /member/<order> per member; here cartesian locale × order.
  // order is identical across languages, so dedupe by order then × locales.
  const orders = Array.from(new Set(members.map(m => m.order)));
  const paths = locales.flatMap(locale =>
    orders.map(order => ({ params: { locale, order } })),
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const order = params!.order as string;

  const { buildContextMembers } = await import('@Server/buildMembers');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages'); // helper from Phase 2

  const members = await buildContextMembers();
  // gatsby filtered: member.order === order && member.language === locale
  const member =
    members.find(m => m.order === order && m.language === locale) ?? null;

  return {
    props: serialize({
      member,
      locale,
      messages: getMessages(locale),
    }),
  };
};
```

- [ ] **Assumption surfaced:** `@I18n/getMessages` (`getMessages(locale)` — **synchronous**, returns the messages object; defined in Phase 2 Task 2.1) is the message loader that `_app` consumes via `pageProps.messages`. It is `await import(...)`ed (dynamic module import) but the function itself is sync, so call it WITHOUT `await` (`messages: getMessages(locale)`). Every `[locale]` page in this phase uses the same pattern.
- [ ] **Decision surfaced:** `member.order` is typed `string` in `IMember` but `gatsby-node` produced `path:/member/${node.order}` from raw data and the work `miniMember` typed it `number`. The route param is always a string; the find compares `m.order === order` (both strings) — matches gatsby's `member.order === order` (gatsby `order` context was the raw value). If Firestore stores `order` as a number, coerce: `String(m.order) === order`. Verify in build.
- [ ] Run `yarn build`. **Verify pass:** `out/ko/member/<some-order>/index.html` and `out/en/member/<some-order>/index.html` exist. Commit: `feat(phase3): member detail dynamic route via getStaticProps`

---

### Task 3.6 — `src/pages/[locale]/members.tsx` + `src/pages/[locale]/work.tsx` (list pages)

Ports `src/templates/members.tsx` (filtered by `member.language === intl.locale`, plus `workMap`) and `src/templates/work.tsx` (the `allWork` `categoryInfo` list filtered by language, sorted `categoryId ASC`).

- [ ] **Failing condition:** `out/ko/members/index.html` and `out/ko/work/index.html` absent before this task.
- [ ] Create `src/pages/[locale]/members.tsx`:

```tsx
// src/pages/[locale]/members.tsx
import Layout from '@Components/common/Layout';
import MemberList from '@Components/members/MemberList';
import MembersTitle from '@Components/members/MembersTitle';
import MembersWrapper from '@Components/members/MembersWrapper';
import SearchBar from '@Components/members/SearchBar';
import { IMember } from '@Interface/api.interface';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

interface Props {
  members: IMember[];
  workMap: Record<string, string>;
  locale: string;
  messages: Record<string, any>;
}

const Members: React.FC<Props> = ({ members, workMap }) => (
  <Layout>
    <MembersWrapper>
      <MembersTitle />
      <SearchBar members={members} workMap={workMap} />
      <MemberList members={members} />
    </MembersWrapper>
  </Layout>
);

export default Members;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map(locale => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const { buildContextMembers } = await import('@Server/buildMembers');
  const { getAllWork } = await import('@Server/firebaseAdmin');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages');

  const all = await buildContextMembers();
  const members = all.filter(m => m.language === locale); // gatsby: language === intl.locale

  // gatsby workMap: { categoryInfo[0]: categoryId } over allWork sorted categoryId ASC
  const work = await getAllWork();
  const workMap = work.reduce<Record<string, string>>((acc, w) => {
    if (w.categoryInfo?.[0] !== undefined) acc[w.categoryInfo[0]] = w.categoryId;
    return acc;
  }, {});

  return {
    props: serialize({
      members,
      workMap,
      locale,
      messages: getMessages(locale),
    }),
  };
};
```

- [ ] Create `src/pages/[locale]/work.tsx`:

```tsx
// src/pages/[locale]/work.tsx
import { Container } from '@Components/common/Container/Container';
import Layout from '@Components/common/Layout';
import Work from '@Components/work';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  categoryInfos: string[][];
  locale: string;
  messages: Record<string, any>;
}

const WorkPage: React.FC<Props> = ({ categoryInfos, locale }) => {
  const t = useTranslations();
  return (
    <Layout>
      <Container title={t('work.title')}>
        <Work categoryInfos={categoryInfos} language={locale} />
      </Container>
    </Layout>
  );
};

export default WorkPage;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map(locale => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const { getAllWork } = await import('@Server/firebaseAdmin');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages');

  // gatsby: allWork filter language === locale, sort categoryId ASC -> node.categoryInfo[]
  const work = (await getAllWork()).filter(w => w.language === locale);
  const categoryInfos = work.map(w => w.categoryInfo);

  return {
    props: serialize({
      categoryInfos,
      locale,
      messages: getMessages(locale),
    }),
  };
};
```

- [ ] **Note:** `Work` and its child `Container` use `useLocale`/`useTranslations` after Phase-2 conversion; `language={locale}` keeps `Work`'s existing prop. Confirm `Work`'s props signature (`categoryInfos`, `language`) is unchanged from `src/templates/work.tsx` line 23.
- [ ] Run `yarn build`. **Verify:** `out/{ko,en}/members/index.html` and `out/{ko,en}/work/index.html` exist; members page lists profiles. Commit (two commits, one per route): `feat(phase3): members list route` / `feat(phase3): work list route`

---

### Task 3.7 — `src/pages/[locale]/work/[id].tsx` (port work main/sub member resolution + backgroundImage)

Ports `gatsby-node.ts` lines 232–288 (`works.data.allWork.edges.forEach`): per work `categoryId`, resolve `mainMemberData`/`subMemberData` by matching `contextMembers.email` against `node.member.main`/`node.member.sub`, plus the per-work `backgroundImage`. The original page (`src/pages/work/[id].tsx`) ALSO did a GraphQL `getWorkInformation` query for `categoryTitle`/`description` and re-merged `mainMembers.edges`/`subMembers.edges`. In Next, getStaticProps resolves everything; the page no longer needs the gatsby `query` export or the `data.mainMembers.edges` re-merge — `mainMemberData`/`subMemberData` are already the full member objects.

The original `Detail` component computed `subId` from `location.hash` (client-only) and built `information` (`categoryTitle`+`description`+`isOpen`). Keep that client-side (hash is not available at build); `getStaticProps` supplies `categoryTitle`/`description` arrays and the resolved members + `backgroundImage` (now `RemoteImage` from `storageUrl(work.imagePath)`).

- [ ] **Failing condition:** `out/ko/work/<categoryId>/index.html` absent.
- [ ] Create `src/pages/[locale]/work/[id].tsx` (full getStaticPaths/getStaticProps + slimmed page):

```tsx
// src/pages/[locale]/work/[id].tsx
import Layout from '@Components/common/Layout/Layout';
import DetailPage from '@Components/work/DetailPage';
import { RemoteImage } from '@Interface/image.interface';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export interface MiniMember {
  id: string;
  email: string;
  name: string;
  position: string;
  order: string;
  image: RemoteImage;
  bgImage: RemoteImage;
  businessFields: string[];
}

interface Props {
  id: string;
  locale: string;
  categoryTitle: string[];
  description: string[];
  mainMemberData: MiniMember[];
  subMemberData: MiniMember[];
  backgroundImage: RemoteImage | null;
  messages: Record<string, any>;
}

const WorkDetail: React.FC<Props> = props => {
  const router = useRouter();
  // gatsby computed subId from location.hash (last 2 chars). asPath holds the hash on client.
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const subId = hash ? Number(hash.slice(-2)) : -1;

  const information = props.categoryTitle?.map((title, index) => ({
    categoryTitle: title,
    description: props.description[index],
    isOpen: index === subId,
    isFirstTime: true,
  }));

  const description = information.map(i => i.categoryTitle).join(', ');
  const title = information.map(i => i.categoryTitle)[0];

  return (
    <Layout route="workDetail">
      <Head>
        <title>{title ?? '법무법인 남산'}</title>
        <meta property="og:title" content={title ?? ''} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://www.namsanlaw.com/ko/work" />
      </Head>
      <DetailPage
        id={props.id}
        language={props.locale as 'ko' | 'en'}
        mainMemberData={props.mainMemberData}
        subMemberData={props.subMemberData}
        workInfo={information}
        backgroundImage={props.backgroundImage ?? undefined}
        subId={subId}
      />
    </Layout>
  );
};

export default WorkDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllWork } = await import('@Server/firebaseAdmin');
  const work = await getAllWork();
  // gatsby: one page per categoryId. Dedupe categoryId then × locales.
  const ids = Array.from(new Set(work.map(w => w.categoryId)));
  const paths = locales.flatMap(locale =>
    ids.map(id => ({ params: { locale, id } })),
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const id = params!.id as string;

  const { getAllWork, storageUrl } = await import('@Server/firebaseAdmin');
  const { buildContextMembers } = await import('@Server/buildMembers');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages');

  const allWork = await getAllWork();
  // gatsby getWorkInformation: work(categoryId eq id, language eq locale)
  const work =
    allWork.find(w => w.categoryId === id && w.language === locale) ?? null;

  const members = await buildContextMembers();
  const byLocale = members.filter(m => m.language === locale);

  // gatsby getContextMemberData: map email -> matching contextMember (sorted order ASC)
  const resolve = (emails: string[]) =>
    (emails ?? [])
      .map(email => byLocale.find(m => m.email === email))
      .filter(Boolean)
      .sort((a, b) => Number(a!.order) - Number(b!.order));

  return {
    props: serialize({
      id,
      locale,
      categoryTitle: work?.categoryInfo ?? [],
      description: work?.description ?? [],
      mainMemberData: resolve(work?.member?.main ?? []),
      subMemberData: resolve(work?.member?.sub ?? []),
      // gatsby backgroundImage came from work imagePath via sharp; now flat RemoteImage.
      backgroundImage: work?.imagePath
        ? { src: storageUrl(work.imagePath), width: 1920, height: 1080 }
        : null,
      messages: getMessages(locale),
    }),
  };
};
```

- [ ] **Surface a simplification:** the gatsby page merged `data.mainMembers.edges` (a language-filtered `allMembers` query) over `pageContext.mainMemberData`. Since `buildContextMembers` is already the full member set and we filter `byLocale` + resolve by email, the merge is redundant — `mainMemberData` already carries `name`/`email`/`position`/`order`/`image`. The `.toUpperCase()` on name stays in `DetailPage` (line 119/148, unchanged). Confirm `DetailPage` still receives `member.image` (used by `MemberItem` → Task 3.8) and `member.order` as string.
- [ ] Update `DetailPage.tsx` `Props` (line 29–33): `backgroundImage?: IGatsbyImageData` → `backgroundImage?: RemoteImage` (done in Task 3.3); `PageContextProps` import from `@Pages/work/[id]` no longer exists — change `DetailPage`'s prop type to a local interface matching the new `WorkDetail` props (`mainMemberData`/`subMemberData`/`workInfo`/`backgroundImage`/`subId`/`language`/`id`). This is an orphan created by removing the gatsby `[id].tsx` `PageContextProps` export — clean it up here.
- [ ] Run `yarn build`. **Verify:** `out/{ko,en}/work/<categoryId>/index.html` exist; a work page shows main members with images and the background image. Commit: `feat(phase3): work detail dynamic route`

---

### Task 3.8 — Convert GatsbyImage → `AppImage` (next/image wrapper) in 4 components

Four components import `GatsbyImage` (confirmed by grep): `Member.tsx`, `MemberItem.tsx`, `NewsDetail.tsx`, `DetailPage.tsx`. Each renders `<GatsbyImage image={x} alt=... />` where `x` was `IGatsbyImageData`, now `RemoteImage` (`{src,width,height}`).

- [ ] **Task 3.8a — create the `AppImage` wrapper FIRST.** All four components import THIS instead of `next/image`, so the staged Phase 5 optimizer swap is a single-file change. Phase 3 relies on the global `images.unoptimized: true` in `next.config` — so do NOT pass a per-call `unoptimized` prop (Phase 5 removes the global flag, and a hardcoded per-call `unoptimized` would bypass the optimizer). Create `src/components/common/AppImage/index.tsx`:
  ```tsx
  // src/components/common/AppImage/index.tsx
  import Image, { ImageProps } from 'next/image';
  // Phase 3: passthrough over next/image (unoptimized via next.config.images).
  // Phase 5 swaps the internals to next-image-export-optimizer with the SAME props.
  const AppImage = (props: ImageProps) => <Image {...props} />;
  export default AppImage;
  ```

**Mechanical recipe (apply to all 4):**
1. Remove `import { GatsbyImage[, IGatsbyImageData] } from 'gatsby-plugin-image';`
2. Add `import AppImage from '@Components/common/AppImage';`
3. Replace `<GatsbyImage image={X} alt={A} />` with `<AppImage src={X.src} width={X.width} height={X.height} alt={A} />` — and guard if `X` may be undefined (e.g. `{X && <AppImage ... />}`). Do NOT add a per-call `unoptimized` prop.

- [ ] **Failing condition:** `yarn typecheck` errors on `GatsbyImage`/`gatsby-plugin-image` import resolution after the `IGatsbyImageData` removal in Task 3.3.

**Before → after for `Member.tsx` (the representative example):**

Before (lines 1–2, 30–36):
```tsx
import Divider from '@Components/common/Divider';
import { GatsbyImage } from 'gatsby-plugin-image';
...
        <div className="bg">
          <GatsbyImage image={member.bgImage} alt={member.id} />
        </div>
        <div className="profile">
          <GatsbyImage image={member.image} alt={member.id} />
        </div>
```

After:
```tsx
import Divider from '@Components/common/Divider';
import AppImage from '@Components/common/AppImage';
...
        <div className="bg">
          <AppImage
            src={member.bgImage.src}
            width={member.bgImage.width}
            height={member.bgImage.height}
            alt={member.id}
          />
        </div>
        <div className="profile">
          <AppImage
            src={member.image.src}
            width={member.image.width}
            height={member.image.height}
            alt={member.id}
          />
        </div>
```

- [ ] Apply the recipe to `MemberItem.tsx` (line 5 import; line 26 `<GatsbyImage alt={order!} image={image!} />` → `{image && <AppImage src={image.src} width={image.width} height={image.height} alt={order ?? ''} />}`). Note `image` is `RemoteImage | undefined` (`Partial<IMember>`), so guard it.
- [ ] Apply to `NewsDetail.tsx` (line 5 import; line 94 `<GatsbyImage image={newsImageData} alt={''} />` → `<AppImage src={newsImageData!.src} width={newsImageData!.width} height={newsImageData!.height} alt="" />`; it is already guarded by `isNewsImageData &&` on line 92).
- [ ] Apply to `DetailPage.tsx` (line 6 import — drop `GatsbyImage`, `IGatsbyImageData` already removed in 3.3; line 72 `<GatsbyImage image={backgroundImage} alt="page-image" />` → `<AppImage src={backgroundImage.src} width={backgroundImage.width} height={backgroundImage.height} alt="page-image" />`; already guarded by `backgroundImage &&` on line 71).
- [ ] **Phase 5 forward note (do not act now):** Phase 5 removes `images.unoptimized` and swaps `AppImage`'s internals (one file) to `<ExportedImage>` from `next-image-export-optimizer` with the SAME `RemoteImage` props — so keeping `width`/`height`/`src` explicit here and routing through `AppImage` is forward-compatible.
- [ ] Run `yarn typecheck` — expect zero errors now (all `IGatsbyImageData`/`GatsbyImage` gone). Verify: `grep -rln "gatsby-plugin-image" src/ | grep -v gatsby-types.d.ts` returns nothing.
- [ ] Commit: `refactor(phase3): GatsbyImage -> AppImage (next/image, unoptimized)`

---

### Task 3.9 — `src/pages/[locale]/news/[id].tsx` (port prev/next-by-order) + `src/pages/[locale]/news.tsx` (list)

Ports `gatsby-node.ts` lines 290–374. The prev/next logic is order-sensitive and returns `undefined` heavily — `serialize` is mandatory. The original news doc id used as the route segment was `node.id` (Firestore doc id). The `newsImageData` came from sharp; now `storageUrl(node.imagePath)` if `imagePath` is non-empty (matching gatsby's `isEmpty(node.imagePath)` guard in `onCreateNode`). The original `getNewsMember(id)` runs **client-side** in `NewsDetail` via `useEffect` (DocumentReference `.get()`) — that stays untouched and does NOT move to build time. The list page (`news.tsx`) uses Algolia client search (`Main.hook.ts`) — stays fully client-side; it only needs locale+messages.

**Prev/next logic (verbatim port of lines 337–360):** with `len = news.length`, for each `node`: if `len>1` — `order===1` → `prev=order+1, next=undefined`; `len===order` → `prev=undefined, next=order-1`; else `prev=order+1, next=order-1`. Then `prevNews`/`nextNews` = the news with that `order` (`{id,title}`). `gatsby-node` queried `allNews` unsorted, so prev/next resolve by scanning the array for matching `order`.

- [ ] **Failing condition:** `out/ko/news/<docId>/index.html` and `out/ko/news/index.html` absent.
- [ ] Create `src/pages/[locale]/news/[id].tsx`:

```tsx
// src/pages/[locale]/news/[id].tsx
import Layout from '@Components/common/Layout';
import Loading from '@Components/common/Loading';
import NewsWrapper from '@Components/news/NewsWrapper';
import { News } from '@Interface/api.interface';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React, { lazy, Suspense } from 'react';

const NewsDetail = lazy(() => import('@Components/news/NewsDetail/NewsDetail'));

interface Props {
  news: News;
  locale: string;
  messages: Record<string, any>;
}

const NewsDetailPage: React.FC<Props> = ({ news }) => (
  <Layout route="newsDetail">
    <Head>
      <title>{news?.title ?? '법무법인 남산'}</title>
      <meta property="og:title" content={news?.title ?? ''} />
      <meta name="description" content={news?.summary ?? ''} />
      <meta property="og:description" content={news?.summary ?? ''} />
      <meta property="og:url" content={news?.originalLink ?? ''} />
    </Head>
    <NewsWrapper outerPadding="100px 90px 160px" innerWidth="996px">
      <Suspense fallback={<Loading height="500px" />}>
        <NewsDetail {...news} />
      </Suspense>
    </NewsWrapper>
  </Layout>
);

export default NewsDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllNews } = await import('@Server/firebaseAdmin');
  const news = await getAllNews();
  const paths = locales.flatMap(locale =>
    news.map(n => ({ params: { locale, id: n.id } })),
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const id = params!.id as string;

  const { getAllNews } = await import('@Server/firebaseAdmin');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages');

  const all = await getAllNews();
  const node = all.find(n => n.id === id)!;
  const len = all.length;

  // verbatim port of gatsby-node prev/next-by-order
  let prev: number | undefined;
  let next: number | undefined;
  if (len > 1) {
    if (node.order === 1) {
      prev = node.order + 1;
      next = undefined;
    } else if (len === node.order) {
      prev = undefined;
      next = node.order - 1;
    } else {
      prev = node.order + 1;
      next = node.order - 1;
    }
  }

  const byOrder = (o?: number) => {
    const m = o !== undefined ? all.find(n => n.order === o) : undefined;
    return m ? { id: m.id, title: m.title } : undefined;
  };

  const { storageUrl } = await import('@Server/firebaseAdmin');
  const newsImageData =
    node.imagePath && node.imagePath.length > 0
      ? { src: storageUrl(node.imagePath), width: 1200, height: 800 }
      : undefined;

  return {
    props: serialize({
      // serialize turns every undefined (prevNews/nextNews/newsImageData) into null
      news: {
        ...node,
        prevNews: byOrder(prev),
        nextNews: byOrder(next),
        newsImageData,
      },
      locale,
      messages: getMessages(locale),
    }),
  };
};
```

- [ ] **Decision surfaced:** gatsby's news pages were **not** locale-split (one `/news/<id>` page, no `language` field on news). Targeting `[locale]/news/[id]` per the contract creates `ko`+`en` copies of the same content — acceptable (matches contract's "Dynamic routes = cartesian locale × id"). `NewsDetail`'s hardcoded Korean strings (`최근 업무사례`, `이전글`, `다음글`, `기사 원문보기`) stay as-is (gatsby never localized them).
- [ ] **Note on `News.date`:** `getAllNews` already converted `Timestamp`→millis (number). `NewsDetail` calls `convertDateStr(date)` / `getTimestampToDate` — confirm those accept a number/millis after the Timestamp→millis change (they previously got a `Timestamp`). If they call `.toDate()`/`.seconds`, adapt `convertDateStr` to accept millis. This is the one ripple from the serialize-Timestamp rule — flag in commit and fix in `NewsDetail.helper`/`utils/date` if needed.
- [ ] Create `src/pages/[locale]/news.tsx`:

```tsx
// src/pages/[locale]/news.tsx
import Layout from '@Components/common/Layout';
import NewsMain from '@Components/news/Main';
import NewsWrapper from '@Components/news/NewsWrapper';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  locale: string;
  messages: Record<string, any>;
}

const NewsListPage: React.FC<Props> = () => {
  const t = useTranslations();
  return (
    <Layout route="news">
      <Head>
        <meta property="og:url" content="https://www.namsanlaw.com/ko/news" />
      </Head>
      <NewsWrapper
        title={t('common.news')}
        outerPadding="100px 90px 160px;"
        innerWidth="1200px"
      >
        <NewsMain />
      </NewsWrapper>
    </Layout>
  );
};

export default NewsListPage;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map(locale => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const { getMessages } = await import('@I18n/getMessages');
  return { props: { locale, messages: getMessages(locale) } };
};
```

- [ ] **Note:** `NewsMain`/`Main.hook.ts` run Algolia search client-side — no build-time data; works under `output:'export'`. The Algolia env vars currently use `GATSBY_` prefix (`src/api/algolia.ts`) — those become `NEXT_PUBLIC_` in the env-rename phase; do NOT change them in Phase 3 unless `Main` is dead at runtime (out of scope — flag only).
- [ ] Run `yarn build`. **Verify:** `out/{ko,en}/news/index.html` and `out/{ko,en}/news/<docId>/index.html` exist; a news detail page renders title + (if present) image + prev/next arrows. Commits (two): `feat(phase3): news detail dynamic route with prev/next` / `feat(phase3): news list route`

---

### Task 3.10 — Full build verification gate (Phase 3 exit)

- [ ] Run `yarn typecheck` → must pass with zero errors.
- [ ] Run `yarn build` (= `next build` → emits `./out`). Must complete without errors.
- [ ] **Verify route coverage** (the build/visual TDD pass condition). Confirm `out/` contains, for both `ko` and `en`:
  - `member/<order>/index.html` for every member order
  - `members/index.html`, `work/index.html`, `news/index.html`
  - `work/<categoryId>/index.html` for every work categoryId
  - `news/<docId>/index.html` for every news doc
  - Quick check: `find out -name index.html | grep -E '/(member|members|work|news)/' | sort` and eyeball counts against Firestore (members count × 2, work count × 2, news count × 2, etc.).
- [ ] **Visual spot-check** (per assignment): `yarn dev`, open `/ko/member/<order>` — confirm profile image + background image render (next/image `unoptimized`, real Firebase Storage URL) and member name/position/email/businessFields/description display. Open a `/ko/work/<categoryId>` — main members render with images + background image. Open a `/ko/news/<docId>` — title, image, prev/next arrows correct.
- [ ] **Decision surfaced for the gate:** if any image returns 403/404 from `storageUrl`, the Storage object's download token differs from the public-media scheme — fall back to the `adminBucket.file(path).getSignedUrl()` approach inside the build helpers (still build-time only). Note which path was used in the final commit.
- [ ] Final Phase 3 commit if any verify-driven fixes were made: `fix(phase3): build verification adjustments`

**Phase 3 done when:** `yarn typecheck` + `yarn build` both green, every expected `out/[locale]/...` HTML file present, and a member/work/news page visually renders image + data. No `IGatsbyImageData`/`GatsbyImage`/`gatsby-plugin-image` references remain in `src/` (excluding `gatsby-types.d.ts`, removed in the Gatsby-teardown phase).

---

Files I read to ground this section (all at repo root `/Users/kimsangcho/dev/side-job/Namsan`):
- `gatsby-node.ts`, `gatsby-config.ts`, `firebase-key.json`, `package.json`
- `src/interface/api.interface.ts`, `src/type/api.type.ts`
- `src/pages/member/[order].tsx`, `src/pages/work/[id].tsx`, `src/pages/news/[id].tsx`, `src/pages/news.tsx`
- `src/templates/members.tsx`, `src/templates/work.tsx`
- `src/api/index.api.ts`, `src/api/firebase.ts`, `src/api/news.api.ts`, `src/api/algolia.ts`
- `src/components/member/Member/Member.tsx` (+`.interface.ts`), `src/components/members/MemberItem/MemberItem.tsx` (+`.interface.ts`), `src/components/news/NewsDetail/NewsDetail.tsx` (+`.interface.ts`), `src/components/work/DetailPage.tsx`, `src/components/work/work.interface.tsx`

Key facts that shaped the tasks: `firebase-admin` is NOT yet a dependency; `IGatsbyImageData` appears in exactly 5 source files (api.interface ×3, NewsDetail.interface, DetailPage, work/[id]) plus `gatsby-types.d.ts` (excluded); `GatsbyImage` value-import in exactly 4 components; news docs have no `language` field (gatsby never locale-split news); `news.date` is a Firestore Timestamp consumed by `convertDateStr`/`getTimestampToDate` (the one serialize ripple to watch); `getNewsMember` stays client-side via DocumentReference `.get()`.

---

## Phase 4 — Policy markdown

> Can run in parallel with Phase 3. Depends only on Phase 0–2 (next.config, `_app`/`_document`, `[locale]` routing, `@I18n`/`@Components` aliases, `Layout`). Does NOT touch Firestore.
>
> Replaces the Gatsby template `src/pages/policy/{markdownRemark.frontmatter__slug}.tsx` (which uses `graphql` + `markdownRemark.html` + `dangerouslySetInnerHTML`) with a Next.js `output:'export'` static page at `src/pages/[locale]/policy/[slug].tsx` that renders the same two `.md` files (`src/content/policy/privacy.md`, `src/content/policy/disclaimer.md`) via gray-matter + react-markdown + remark-breaks + rehype-raw.
>
> Canonical facts confirmed by reading the real files:
> - `PolicyStyleBox` is `styled.div` from `@Components/policy/Policy.style` whose styles target **descendant DOM** (`& h1/h2/h3/p/ul/li/table`, `&.pc`/`&.mobile`/`p.privacy`). It does NOT care whether the HTML came from `dangerouslySetInnerHTML` or react-markdown — the rendered DOM is identical, so the wrapper and class names are reused unchanged.
> - `privacy.md` body is ~90% raw HTML: `<table class="pc">`, `<table class="mobile">`, `<colgroup>`, `<col style="width:50%">`, `<th colspan/rowspan>`, `<ol>`, `<ul>`, `<li>`, `<p class="privacy">`. react-markdown@6 strips ALL raw HTML by default → **without rehype-raw the page renders only the `#` / `##` / `###` headings and is otherwise empty (no tables)**. This is the failing condition we test against.
> - `disclaimer.md` body is a single raw `<p class="privacy">...</p>`.
> - Frontmatter `slug` has a **leading slash**: `slug: '/privacy'`, `slug: '/disclaimer'` → strip with `.replace(/^\//, '')`.
> - Content is locale-independent (same `.md` for `ko` and `en`), so `getStaticPaths` = cartesian `locales × {privacy, disclaimer}`, all reading the same files.
> - react-markdown@6 API (pinned `6.0.3`): markdown passed as `children`, plugins via `remarkPlugins` / `rehypePlugins`. `rehype-raw` MUST be pinned `^6` (unified@10 / react-markdown@6 compatible; v7+ breaks).

### Task 4.1 — Add `gray-matter` + `rehype-raw` deps (pinned)

- [ ] State the failing condition: `src/pages/[locale]/policy/[slug].tsx` will `import matter from 'gray-matter'` and `import rehypeRaw from 'rehype-raw'`; neither is in `package.json` yet → `yarn typecheck` will fail with "Cannot find module".
- [ ] Run `yarn add gray-matter@^4 rehype-raw@^6` (exact: `rehype-raw@^6`, NOT 7+ — v7 requires unified@11 and breaks react-markdown@6.0.3). `react-markdown@6.0.3` and `remark-breaks@3.0.3` already exist in `package.json` and stay pinned.
- [ ] Verify they appear in `package.json` dependencies: `cat package.json | grep -E '"(gray-matter|rehype-raw|react-markdown|remark-breaks)"'` → expect `gray-matter`, `rehype-raw`, `react-markdown` (6.0.3), `remark-breaks` (3.0.3) all present.
- [ ] Verify rehype-raw resolved a v6 line: `cat node_modules/rehype-raw/package.json | grep '"version"'` → expect `6.x.x`.

### Task 4.2 — Delete the Gatsby policy template

- [ ] State the failing condition: the file `src/pages/policy/{markdownRemark.frontmatter__slug}.tsx` imports `graphql, PageProps` from `'gatsby'` (removed in Phase 0) → it would break `yarn typecheck`. It must be removed; its replacement lives under `src/pages/[locale]/policy/[slug].tsx`.
- [ ] Run `git rm "src/pages/policy/{markdownRemark.frontmatter__slug}.tsx"` (the brace filename must be quoted).
- [ ] Verify: `ls src/pages/policy/ 2>/dev/null` → directory empty or gone; `grep -rn "from 'gatsby'" src/pages/policy 2>/dev/null` → no output.

### Task 4.3 — Create `src/pages/[locale]/policy/[slug].tsx` (gray-matter + react-markdown + remark-breaks + rehype-raw)

- [ ] State the failing condition: navigating to `/ko/policy/privacy/` 404s because the page does not exist yet; `yarn build` will not emit `out/ko/policy/privacy/index.html`.
- [ ] Create the directory: `mkdir -p src/pages/[locale]/policy`.
- [ ] Write `src/pages/[locale]/policy/[slug].tsx` with EXACTLY this content (paths use `process.cwd()` so they resolve to repo root at build time; `fs`/`path`/`gray-matter` are imported at module top but only CALLED inside `getStaticPaths`/`getStaticProps`, which is fine for `output:'export'` since those run build-time only):

```tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { locales, defaultLocale, Locale } from '@I18n/config';
import Layout from '@Components/common/Layout';
import { PolicyStyleBox } from '@Components/policy/Policy.style';

const POLICY_DIR = path.join(process.cwd(), 'src/content/policy');

// frontmatter slug has a leading slash ('/privacy') -> strip it for the route param
const slugFromFile = (file: string): string => {
  const raw = fs.readFileSync(path.join(POLICY_DIR, file), 'utf8');
  const { data } = matter(raw);
  return String(data.slug ?? `/${file.replace(/\.md$/, '')}`).replace(/^\//, '');
};

const readPolicyFiles = (): string[] =>
  fs.readdirSync(POLICY_DIR).filter((f) => f.endsWith('.md'));

interface PolicyPageProps {
  content: string;
  locale: Locale;
  messages: Record<string, unknown>;
}

const PolicyTemplate = ({ content }: PolicyPageProps) => {
  return (
    <Layout>
      <PolicyStyleBox>
        <ReactMarkdown
          remarkPlugins={[remarkBreaks]}
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </PolicyStyleBox>
    </Layout>
  );
};

export default PolicyTemplate;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = readPolicyFiles().map(slugFromFile); // ['privacy', 'disclaimer']
  const paths = locales.flatMap((locale) =>
    slugs.map((slug) => ({ params: { locale, slug } })),
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PolicyPageProps> = async ({
  params,
}) => {
  const locale = (params?.locale as Locale) ?? defaultLocale;
  const slug = params?.slug as string;

  // locate the .md whose (slash-stripped) frontmatter slug matches the route param
  const file =
    readPolicyFiles().find((f) => slugFromFile(f) === slug) ?? `${slug}.md`;
  const raw = fs.readFileSync(path.join(POLICY_DIR, file), 'utf8');
  const { content } = matter(raw);

  const { getMessages } = await import('@I18n/getMessages'); // Phase 2 helper (sync)
  const messages = getMessages(locale);

  return { props: { content, locale, messages } };
};
```

- [ ] Note the canonical `_app` contract: `_app` reads `pageProps.locale` + `pageProps.messages`, so this page returns both. Use the SAME `@I18n/getMessages` helper Phase 2 created (synchronous; reads `src/intl/{ko,en}.json`) and Phase 3 reuses — do NOT invent a `@I18n/messages/<locale>.json` path. (Confirm against an existing `src/pages/[locale]/index.tsx` from Phase 2 before writing this line.)
- [ ] Run `yarn typecheck` → expect PASS (no `Cannot find module 'gatsby'`, no missing-prop errors).

### Task 4.4 — Verify rehype-raw actually renders privacy.md's raw `<table>` (the core risk)

- [ ] State the failing condition: react-markdown@6 strips raw HTML by default. Temporarily simulate the failure to PROVE rehype-raw is load-bearing: open `src/pages/[locale]/policy/[slug].tsx`, comment out `rehypePlugins={[rehypeRaw]}`, run `yarn build`, then `grep -c "<table" out/ko/policy/privacy/index.html` → expect `0` (tables gone, page near-empty: only the `<h1>/<h2>/<h3>` from `#`/`##`/`###` survive). This confirms the dependency is required, matching the spec warning "rehype-raw 없으면 빈 페이지".
- [ ] Restore `rehypePlugins={[rehypeRaw]}` (uncomment).
- [ ] This task has no separate commit; it gates Task 4.5.

### Task 4.5 — Build + verify generated HTML contains the tables, then commit

- [ ] Run `yarn build` → expect success and emission of all four files:
  - `out/ko/policy/privacy/index.html`
  - `out/en/policy/privacy/index.html`
  - `out/ko/policy/disclaimer/index.html`
  - `out/en/policy/disclaimer/index.html`
- [ ] Verify the privacy page is NOT empty and contains the rendered table markup:
  - `grep -c "<table" out/ko/policy/privacy/index.html` → expect `>= 4` (privacy.md has 4 `pc` tables + 4 `mobile` tables = 8 `<table>` occurrences; minimum gate `>= 4`).
  - `grep -q "정보주체" out/ko/policy/privacy/index.html && echo OK` → expect `OK` (table cell text rendered).
  - `grep -q "class=\"pc\"\|class=\"mobile\"" out/ko/policy/privacy/index.html && echo OK` → expect `OK` (Policy.style class hooks preserved — see Task 4.6).
- [ ] Verify disclaimer renders its raw `<p class="privacy">`:
  - `grep -q "class=\"privacy\"" out/ko/policy/disclaimer/index.html && echo OK` → expect `OK`.
  - `grep -q "법무법인 남산" out/ko/policy/disclaimer/index.html && echo OK` → expect `OK`.
- [ ] Visual check: `yarn dev`, open `http://localhost:3000/ko/policy/privacy/` and `http://localhost:3000/ko/policy/disclaimer/`. Confirm: headings styled (title32/24/20), the desktop `table.pc` visible and the `table.mobile` hidden at desktop width (swap at the `mobile` media query), bordered cells with grey50 `<th>` backgrounds — i.e. `PolicyStyleBox` styling is applied to the react-markdown output exactly as it was to the old `dangerouslySetInnerHTML` output.
- [ ] Commit: `git add -A && git commit` with message `feat(policy): migrate Gatsby markdownRemark template to Next.js [locale]/policy/[slug] with gray-matter + react-markdown + rehype-raw`.

### Task 4.6 — (Verification note, no code change) Policy.style class mapping is automatic

- [ ] Confirm by inspection (already true — no edit needed): `src/components/policy/Policy.style.ts` `PolicyStyleBox` targets **descendant** selectors and class hooks `& table.pc`, `& table.mobile`, `& p.privacy`, plus `h1/h2/h3/p/ul/li`. Because `rehype-raw` preserves the raw HTML attributes verbatim (HTML uses `class=`, NOT JSX `className=`, and react-markdown@6 + rehype-raw emit them as real `class` attributes), the existing CSS matches with ZERO class remapping. Do not rewrite the `.md` files' `class="pc"` / `class="mobile"` / `class="privacy"` attributes and do not change `Policy.style.ts`. The Task 4.5 `grep` for `class="pc"`/`class="mobile"`/`class="privacy"` is the verification that this holds.

---

## Phase 5 — Image optimization upgrade (optional/deferred)

> **Status: optional/deferred.** This phase is a pure performance upgrade layered on top of a *working, shipped* Phase 3 build. Phase 3 already renders every image correctly via `<Image>` from `next/image` with `images: { unoptimized: true }`. Do NOT start Phase 5 until Phase 3's `yarn build` produces a clean `./out` that you have visually verified. If Phase 5 regresses or the build time becomes unacceptable, revert this phase only (it touches `next.config.js`, `package.json`, one component, and adds two root files) — Phase 3 keeps working untouched.
>
> **What changes:** swap Next's runtime image handling (disabled in Phase 3) for **build-time** optimization via `next-image-export-optimizer`. It pre-downloads every remote (Firebase Storage) image at build, generates resized WebP variants + tiny blur placeholders into `./out`, and rewrites `<ExportedImage>` to emit a static `srcset` pointing at those generated files. Because `output: 'export'` has no server, all optimization MUST happen at build time — hence the remote-image manifest.
>
> **Verify model (no unit tests):** state failing condition → run verify command → confirm it fails → implement minimal change → re-run verify → confirm pass → commit. The verify commands here are `yarn build` (must emit WebP + blur files into `./out`) and manual `srcset` inspection of the generated HTML.

### Forward-reference to Phase 3 (do this in Phase 3 to make Phase 5 a 1-file swap)

Phase 5 step 3 below is a *single-file edit* **only if** Phase 3 routed all image rendering through one wrapper component. If Phase 3 instead imported `Image` from `next/image` directly at each call site, Phase 5 becomes a mechanical multi-file find/replace.

- [ ] **(Confirmed from Phase 3)** Phase 3 Task 3.8a created `src/components/common/AppImage/index.tsx` wrapping `<Image>` from `next/image`, and all member/work/news image call sites import `AppImage`. That makes this phase's swap a **one-file change** (the preferred path in Step 3).

---

### Step 0 — Establish the Phase 3 image baseline (the "failing condition" reference)

- [ ] Confirm Phase 3 is the current committed state: `git log --oneline -1` and `yarn build` succeeds emitting `./out`.
- [ ] Capture the baseline so the Phase 5 improvement is measurable. Run and record the numbers:
  ```bash
  yarn build
  # total bytes of all images shipped by Phase 3 (originals, no WebP):
  find out -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.webp' \) -exec du -ch {} + | tail -1
  # count of WebP files (Phase 3 baseline should be ~0 generated WebP):
  find out -type f -name '*.webp' | wc -l
  ```
- [ ] Record both numbers in the PR description as "Phase 3 baseline". Phase 5 success = WebP count goes from ~0 to >0 AND total image bytes drop. **Do not delete this baseline measurement** — step 5 compares against it.

---

### Step 1 — Install `next-image-export-optimizer` and update `next.config.js`

- [ ] **Failing condition:** the optimizer package is not installed; `next.config.js` still has `images: { unoptimized: true }`. Verify it is absent:
  ```bash
  cat package.json | grep next-image-export-optimizer    # expect: no output
  ```
- [ ] Install the package (pinned to the contract version):
  ```bash
  yarn add next-image-export-optimizer@^1.20.1
  ```
- [ ] Edit `next.config.js`. **Full before → after diff from the Phase 3 (locked) baseline.**

  **BEFORE (Phase 3 locked baseline):**
  ```js
  module.exports = {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
    compiler: { styledComponents: true },
    webpack(config) {
      // SVGs are consumed as URL strings (see Phase 1 Task 1.4) — emit as asset/resource.
      const fileLoaderRule = config.module.rules.find(
        (rule) => rule.test && rule.test.toString().includes('svg'),
      );
      if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        type: 'asset/resource',
      });
      return config;
    },
  };
  ```

  **AFTER (Phase 5):**
  ```js
  module.exports = {
    output: 'export',
    trailingSlash: true,
    images: {
      // NOTE: 'unoptimized' is REMOVED. Do NOT set loaderFile — next-image-export-optimizer
      // ships its own custom loader internally; setting loaderFile here would break it.
      loader: 'custom',
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    transpilePackages: ['next-image-export-optimizer'],
    compiler: { styledComponents: true },
    env: {
      nextImageExportOptimizer_imageFolderPath: 'public/images',
      nextImageExportOptimizer_exportFolderPath: 'out',
      nextImageExportOptimizer_quality: '75',
      nextImageExportOptimizer_storePicturesInWEBP: 'true',
      nextImageExportOptimizer_generateAndUseBlurImages: 'true',
      nextImageExportOptimizer_remoteImageCacheTTL: '86400',
    },
    webpack(config) {
      // SVGs are consumed as URL strings (see Phase 1 Task 1.4) — emit as asset/resource.
      const fileLoaderRule = config.module.rules.find(
        (rule) => rule.test && rule.test.toString().includes('svg'),
      );
      if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        type: 'asset/resource',
      });
      return config;
    },
  };
  ```

  **Diff summary of exactly what changed (every line traces to the assignment):**
  - `images.unoptimized: true` → **removed**, replaced by `images.loader: 'custom'`.
  - Added `images.imageSizes` and `images.deviceSizes` (controls which `srcset` widths the optimizer generates).
  - Added top-level `transpilePackages: ['next-image-export-optimizer']` (the package ships untranspiled ESM/JSX and must be compiled by Next).
  - Added `env` block with the six `nextImageExportOptimizer_*` keys: `quality:'75'`, `storePicturesInWEBP:'true'`, `generateAndUseBlurImages:'true'`, `remoteImageCacheTTL:'86400'`, plus the folder paths the CLI reads.
  - `output`, `trailingSlash`, `compiler.styledComponents`, and the `asset/resource` SVG webpack rule are **unchanged**.
- [ ] **Verify:** `yarn typecheck` (config is plain JS, but this confirms nothing else broke) and `node -e "require('./next.config.js')"` parses without error.

---

### Step 2 — Create the remote image manifest

`next-image-export-optimizer` optimizes images that physically live under `public/images` automatically, but Firebase Storage URLs are *remote*. The optimizer reads a root file named `remoteOptimizedImages.js` that default-exports (async-resolvable) an array of every remote URL to download + optimize at build time. The strings in that array MUST be byte-for-byte identical to the `src` strings passed to `<ExportedImage>` in JSX, otherwise the optimizer silently falls back to serving the original remote URL (no WebP, no blur). Because the contract already centralizes URL construction in `src/server/firebaseAdmin.ts` (`storageUrl(path)` + `getAllMembers/getAllWork/getAllNews`), we reuse that exact code so the strings can never drift.

- [ ] **Failing condition:** `remoteOptimizedImages.js` does not exist at repo root. Verify:
  ```bash
  ls remoteOptimizedImages.js    # expect: No such file or directory
  ```
- [ ] Create `scripts/collectImageUrls.js` (a single source of truth that both the manifest and any future tooling can call). It imports the **same** `firebaseAdmin` server module used by `getStaticProps`, so URLs are generated identically.

  > **Field-name caveat:** the property names `member.imagePath`, `work.imagePath`, `news.imagePath` below are placeholders for *whatever Storage-path field Phase 3 actually maps into each `RemoteImage.src`*. When implementing, open the Phase 3 `getStaticProps` for `members`/`work`/`news` and replace these with the real field accessors so the produced URL equals the rendered `src` exactly. The structure (map each doc's storage-path field through `storageUrl`, drop falsy values, dedupe) does not change.

  ```js
  // scripts/collectImageUrls.js
  // Reuses the SAME firebaseAdmin module + storageUrl() used by getStaticProps,
  // so the produced URLs are byte-identical to the <ExportedImage src> strings.
  // CommonJS require via ts-node/register because firebaseAdmin.ts is TypeScript.
  require('ts-node/register/transpile-only');

  const {
    storageUrl,
    getAllMembers,
    getAllWork,
    getAllNews,
  } = require('../src/server/firebaseAdmin');

  /**
   * Returns a deduped array of every remote Firebase Storage image URL
   * referenced by member / work / news pages.
   * @returns {Promise<string[]>}
   */
  async function collectImageUrls() {
    const [members, work, news] = await Promise.all([
      getAllMembers(),
      getAllWork(),
      getAllNews(),
    ]);

    const paths = [
      // map each collection's Storage-path field -> the rendered RemoteImage.src
      ...members.map((m) => m.imagePath),
      ...work.map((w) => w.imagePath),
      ...news.map((n) => n.imagePath),
    ];

    const urls = paths
      .filter(Boolean) // drop docs with no image
      .map((p) => storageUrl(p)); // SAME helper getStaticProps uses

    return Array.from(new Set(urls)); // dedupe identical URLs
  }

  module.exports = { collectImageUrls };
  ```
- [ ] Create `remoteOptimizedImages.js` at repo root. It must default-export the resolved array (the package awaits a thenable export):

  ```js
  // remoteOptimizedImages.js  (repo root)
  // Read at build time by next-image-export-optimizer to know which REMOTE
  // (Firebase Storage) images to download + convert to WebP + blur.
  // Must export an array (or a Promise resolving to one) of absolute image URLs
  // that EXACTLY match the src strings rendered by <ExportedImage>.
  const { collectImageUrls } = require('./scripts/collectImageUrls');

  module.exports = collectImageUrls();
  ```
- [ ] Add `ts-node` as a dev dependency so `collectImageUrls.js` can `require` the TypeScript `firebaseAdmin.ts` at build time (the optimizer runs in plain Node, not through Next's compiler):
  ```bash
  yarn add -D ts-node
  ```
- [ ] **Verify** the manifest resolves and produces non-empty, well-formed URLs (this is the "does it fail?" gate before wiring the build). With Firebase admin env vars present:
  ```bash
  node -e "require('./remoteOptimizedImages.js').then(u => { console.log('count', u.length); console.log(u.slice(0,2)); })"
  ```
  Expect a count > 0 and each URL beginning `https://firebasestorage.googleapis.com/v0/b/namsan-801de.appspot.com/o/`. If count is 0, the field accessors in `collectImageUrls.js` are wrong — fix before proceeding.

---

### Step 3 — Swap the image component to `<ExportedImage>`

**Preferred path (1-file swap — Phase 3 Task 3.8a introduced `AppImage`):**

- [ ] **Failing condition:** `AppImage` still renders `<Image>` from `next/image`, so the build will not emit WebP/blur. Read the current file first:
  ```bash
  cat src/components/common/AppImage/index.tsx
  ```
- [ ] Replace the import and the rendered element. Edit `src/components/common/AppImage/index.tsx`:

  **BEFORE (Phase 3):**
  ```tsx
  import Image, { ImageProps } from 'next/image';

  const AppImage = (props: ImageProps) => <Image {...props} />;

  export default AppImage;
  ```

  **AFTER (Phase 5):**
  ```tsx
  import ExportedImage from 'next-image-export-optimizer';
  import { ComponentProps } from 'react';

  type AppImageProps = ComponentProps<typeof ExportedImage>;

  const AppImage = (props: AppImageProps) => (
    // placeholder="blur" consumes the tiny generated blur image so there is no
    // layout flash; ExportedImage supplies blurDataURL from the build manifest.
    <ExportedImage placeholder="blur" {...props} />
  );

  export default AppImage;
  ```
  Because `placeholder="blur"` is spread **before** `{...props}`, any call site that explicitly sets `placeholder` still wins. (`next-image-export-optimizer` re-exports the `next/image` prop types, so `width`/`height`/`src` from `RemoteImage` pass through unchanged — no call-site edits needed.)
- [ ] **Verify:** `yarn typecheck` passes (confirms `ExportedImage`'s prop types accept every existing `AppImage` call site). If it errors on a specific prop, that call site needs the prop adjusted — fix it before building.

**Fallback path (mechanical find/replace — only if Phase 3 imported `next/image` directly at call sites):**

- [ ] Locate every direct import:
  ```bash
  grep -rn "from 'next/image'" src/
  grep -rn 'from "next/image"' src/
  ```
- [ ] For each match, mechanically replace:
  - Import line `import Image from 'next/image';` → `import ExportedImage from 'next-image-export-optimizer';`
  - Import line `import Image, { ImageProps } from 'next/image';` → `import ExportedImage, { ImageProps } from 'next-image-export-optimizer';`
  - JSX usage `<Image ...>` → `<ExportedImage placeholder="blur" ...>` (add `placeholder="blur"` unless one is already present).
- [ ] After the last replacement, confirm none remain:
  ```bash
  grep -rn "next/image" src/    # expect: no output
  ```
- [ ] **Verify:** `yarn typecheck` passes.

---

### Step 4 — Wire the build script

- [ ] **Failing condition:** `package.json` `build` script runs `next build` only (no optimizer pass), so `./out` ships originals. Verify current state:
  ```bash
  cat package.json | grep '"build"'    # Phase 3: "build": "next build"
  ```
- [ ] Edit `package.json` `scripts.build`.

  **BEFORE (Phase 3):**
  ```json
  "build": "next build",
  ```

  **AFTER (Phase 5):**
  ```json
  "build": "next build && next-image-export-optimizer",
  ```
  `next build` first emits the static export into `./out` (including the HTML referencing the custom loader's expected paths), then `next-image-export-optimizer` reads `remoteOptimizedImages.js`, downloads the remote images, generates resized WebP + blur variants into `./out`, and the runtime `<ExportedImage>` `srcset` resolves against those generated files. Order matters — the optimizer must run **after** the export exists.
- [ ] Add `.gitignore` entries for the optimizer's local cache + generated input folder so build artifacts are not committed:
  ```bash
  printf '\n# next-image-export-optimizer\npublic/images/nextImageExportOptimizer/\n.cache/\n' >> .gitignore
  ```
- [ ] **Verify:** `cat package.json | grep '"build"'` shows the chained command.

---

### Step 5 — Verify optimization happened and improved the baseline; commit

- [ ] **Failing condition pre-check:** `out/` currently has the Phase 3 baseline (originals, ~0 generated WebP). Run the full pipeline (Firebase admin env vars must be present so the manifest resolves):
  ```bash
  rm -rf out
  yarn build
  ```
  The optimizer log MUST show it downloading N remote images and writing WebP — confirm the count equals (or is near) the `remoteOptimizedImages.js` count from step 2. A log line like "Reading remote images... 0 remote images" means the manifest is empty → go fix `collectImageUrls.js`.
- [ ] **WebP + blur exist:** generated WebP count must now be > 0 and blur placeholders present:
  ```bash
  find out -type f -name '*.webp' | wc -l                          # expect > 0
  find out -type f -name '*opt*.webp' -o -name '*blur*' | head      # expect blur/opt variants
  ```
- [ ] **No silent fallback to originals — inspect the generated `srcset`.** This is the most important check: if the optimizer silently fell back, the HTML `src`/`srcset` will still point at `firebasestorage.googleapis.com` instead of local optimized `.webp` paths.
  ```bash
  # Pick a member/work/news detail page and grep its srcset:
  grep -o 'srcset="[^"]*"' out/ko/members/index.html | head
  ```
  Expect the `srcset` to reference **local** generated paths (e.g. `/images/.../...-640.webp 640w, ...-750.webp 750w`), NOT the raw `firebasestorage.googleapis.com` URL. If you still see remote URLs in `srcset`, the `remoteOptimizedImages.js` strings did not match the rendered `src` (step 2 caveat) — reconcile the field accessors and rebuild.
- [ ] **Bytes/LCP improved vs Phase 3 baseline.** Compare total image bytes to step 0's recorded number:
  ```bash
  find out -type f \( -name '*.webp' -o -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' \) -exec du -ch {} + | tail -1
  ```
  Expect total shipped image bytes **lower** than the Phase 3 baseline (WebP at quality 75 is typically 25-50% smaller than PNG/JPEG). Optionally serve and spot-check LCP:
  ```bash
  npx serve out -l 5050
  # then in a browser DevTools > Lighthouse/Performance on /ko/, confirm LCP image is a .webp and LCP time <= Phase 3.
  ```
- [ ] **Visual regression:** open `/ko/`, `/ko/members/`, a `/ko/work/[id]/`, and a `/ko/news/[id]/` in the browser. Confirm every image still renders, the blur-up placeholder shows during load, and no broken-image icons appear.
- [ ] **Commit** once all four verifications pass:
  ```bash
  git add next.config.js package.json yarn.lock remoteOptimizedImages.js scripts/collectImageUrls.js src/components/common/AppImage/index.tsx .gitignore
  git commit -m "perf(images): Phase 5 - build-time WebP + blur via next-image-export-optimizer

  - swap images.unoptimized -> loader:'custom' + transpilePackages
  - add remoteOptimizedImages.js reusing firebaseAdmin storageUrl/getAll*
  - AppImage now renders <ExportedImage placeholder='blur'>
  - build script chains next-image-export-optimizer
  - verified: out/ ships WebP+blur, srcset uses local paths, image bytes down vs Phase 3 baseline

  Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
  ```

---

### Rollback (if Phase 5 regresses or build time is unacceptable)

- [ ] Revert only the Phase 5 commit: `git revert <phase5-sha>` (or restore `images: { unoptimized: true }`, `"build": "next build"`, and the direct `<Image>`/`AppImage` Phase 3 form, then delete `remoteOptimizedImages.js` + `scripts/collectImageUrls.js`). Phase 3 is fully self-contained and keeps working — Phase 5 adds nothing Phase 3 depends on.

---

## Phase 6 — Deploy (Firebase Hosting)

Goal: serve the Next.js static export (`./out`) from Firebase Hosting with per-page OG HTML and correct caching, keep the Algolia Cloud Functions deploy fully separate, and regenerate `sitemap.xml`/`robots.txt` (lost when `gatsby-plugin-sitemap`/`gatsby-plugin-robots-txt` were removed).

Pre-reading already done — facts this phase depends on (do NOT re-verify by guessing):
- `firebase.json` hosting today: `"public": "public"`, a SPA catch-all rewrite `** -> /index.html`, and a dangling `**/news/** -> function "news"` rewrite.
- `functions/src/index.ts` exports ONLY `helloWorld`, `collectionOnCreate`, `collectionOnUpdate`, `collectionOnDelete`. There is **NO** function named `news` — the `**/news/**` rewrite points at nothing and must be deleted (it would otherwise shadow the statically-exported `/[locale]/news/[id]/index.html` pages).
- `.firebaserc` default project = `namsan-801de`; hosting `site` = `namsan`.
- Next config (Phase 3) uses `output:'export'` + `trailingSlash:true`, so the export emits directory-style pages: `out/ko/news/<id>/index.html`, `out/ko/index.html`, etc.

---

### Task 6.1 — Rewrite the `hosting` block in `firebase.json`

- [ ] **State the failing condition.** With the current `firebase.json` (`public:"public"`, SPA catch-all `** -> /index.html`, dangling `**/news/** -> function "news"`), deploying the Next export would (a) serve nothing because `public/` no longer exists, and (b) even with `out/`, the catch-all rewrite would rewrite every deep link (e.g. `/ko/news/<id>/`) to the home page's `index.html`, destroying per-page OG meta. Confirm the dangling rewrite is invalid: there is no `news` export in `functions/src/index.ts` (only `helloWorld`, `collectionOnCreate`, `collectionOnUpdate`, `collectionOnDelete`).

- [ ] **Verify it fails.** Run `yarn build` (now `next build`) to produce `./out`, then `firebase deploy --only hosting --dry-run` (or inspect: `out/ko/news/` exists as real HTML files, but the catch-all rewrite to `/index.html` would override them). Do not actually deploy yet.

- [ ] **Implement.** Replace the ENTIRE `"hosting"` object in `/Users/kimsangcho/dev/side-job/Namsan/firebase.json` with the block below. Changes vs. current file:
  - `public`: `"public"` → `"out"`.
  - **Removed** the SPA catch-all rewrite (`** -> /index.html`) — static export already emits one HTML file per route, so deep links must be served as-is for correct per-page OG HTML.
  - **Removed** the dangling `**/news/** -> function "news"` rewrite (no such function exists).
  - Added `"cleanUrls": false` and `"trailingSlash": true` to align Hosting with Next's `trailingSlash:true` directory output (`/ko/` resolves to `out/ko/index.html`).
  - Headers: removed Gatsby-era globs `static/**`, `sw.js`, `page-data/**`; added `/_next/static/**` (Next's hashed/immutable asset dir) with a 1-year immutable cache. Kept the default `must-revalidate` for HTML and the `*.@(css|js)` immutable rule (Next emits hashed `.js`/`.css` under `/_next/`).
  - Added a `redirects` rule `/` → `/ko/` (301) so the bare root lands on the Korean default locale at the Hosting layer (complements the client-side root redirect in `src/pages/index.tsx`).

```json
  "hosting": {
    "site": "namsan",
    "public": "out",
    "cleanUrls": false,
    "trailingSlash": true,
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "redirects": [
      {
        "source": "/",
        "destination": "/ko/",
        "type": 301
      }
    ],
    "headers": [
      {
        "source": "**/*",
        "headers": [
          {
            "key": "cache-control",
            "value": "public, max-age=0, must-revalidate"
          }
        ]
      },
      {
        "source": "/_next/static/**",
        "headers": [
          {
            "key": "cache-control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "cache-control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
```

  NOTE: keep the top-level `"functions"` array (lines 2–17 of the current file) exactly as-is — only the `"hosting"` object is replaced.

- [ ] **Re-run verify.** `yarn build && firebase deploy --only hosting --dry-run` succeeds; `firebase.json` parses (`cat firebase.json | python3 -m json.tool` or `npx firebase-tools hosting:channel:list` does not error on config). Confirm `out/index.html` is NOT required for deep links and that no rewrite collapses routes.

- [ ] **Commit.** `git add firebase.json && git commit -m "build(deploy): point Firebase Hosting at Next export ./out, drop SPA catch-all + dangling news rewrite"`

---

### Task 6.2 — Confirm the `functions` block is untouched + separate deploys

- [ ] **State the condition.** Hosting changes must NOT alter the Algolia sync functions (`collectionOnCreate`/`collectionOnUpdate`/`collectionOnDelete` + `helloWorld`). The `"functions"` array in `firebase.json` and all of `functions/src/index.ts` stay byte-for-byte unchanged.

- [ ] **Verify.** `git diff firebase.json` shows changes ONLY inside the `"hosting"` object; `git status functions/` shows no modifications.

- [ ] **Document the two-deploy split** (no code change — this is operational guidance kept in the deploy runbook / PR description):
  - Hosting only (after `yarn build`): `firebase deploy --only hosting`
  - Functions only: `firebase deploy --only functions`
  - Never run a bare `firebase deploy` during this migration — it would attempt both, and the functions `predeploy` (`npm --prefix functions run lint && build`) would slow/gate a routine site publish.

- [ ] **Commit.** Nothing to commit for this task (verification only). If a `DEPLOY.md` runbook is desired, add it in a follow-up; not required here.

---

### Task 6.3 — Restore `sitemap.xml` + `robots.txt` via `next-sitemap`

Background: `gatsby-plugin-sitemap` and `gatsby-plugin-robots-txt` (package.json lines 40, 42; gatsby-config lines 37–38) are removed in this migration, so the export no longer produces `sitemap.xml`/`robots.txt`. Use `next-sitemap` as a postbuild step writing into `./out`.

- [ ] **State the failing condition.** After `yarn build`, `out/sitemap.xml` and `out/robots.txt` do not exist → SEO regression vs. the Gatsby site.

- [ ] **Verify it fails.** `yarn build && ls out/sitemap.xml out/robots.txt` → "No such file or directory".

- [ ] **Install the dependency.** `yarn add -D next-sitemap`

- [ ] **Implement the config.** Create `/Users/kimsangcho/dev/side-job/Namsan/next-sitemap.config.js`. `siteUrl` is `https://www.namsanlaw.com` (from gatsby-config `siteMetadata.siteUrl`). Because dynamic `[locale]` / `[id]` routes are statically exported as HTML files under `out/`, point `next-sitemap` at the export output dir so it crawls the generated files (this captures every `/ko/...` and `/en/...` page including dynamic news/work/member detail pages without re-querying Firestore):

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.namsanlaw.com',
  generateRobotsTxt: true,
  trailingSlash: true,
  // next-sitemap reads the static export instead of a manifest,
  // so every exported /ko/** and /en/** HTML file (incl. dynamic
  // news/work/member/policy detail pages) is included.
  sourceDir: 'out',
  outDir: 'out',
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
```

- [ ] **Wire the postbuild hook.** In `/Users/kimsangcho/dev/side-job/Namsan/package.json`, the `scripts` block (which Phase 3 already migrated to `"build": "next build"`, `"dev": "next dev"`) gains a `postbuild` script. `next build` with `output:'export'` writes `./out` during the build, so `postbuild` runs after the export is on disk:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "next-sitemap --config next-sitemap.config.js",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  }
```

  NOTE: this replaces the Gatsby scripts (`develop`/`start`/`build`/`serve`/`clean` from the current package.json lines 11–16); `typecheck` is retained. The exact non-deploy scripts are owned by Phase 3 — here only add the `postbuild` line if Phase 3's block differs.

- [ ] **Re-run verify.** `yarn build && ls out/sitemap*.xml out/robots.txt` → files now exist. Open `out/sitemap.xml` (or `out/sitemap-0.xml`) and confirm it lists both `/ko/...` and `/en/...` URLs, and that a deep route like `/ko/news/<id>/` appears. Confirm `out/robots.txt` references `https://www.namsanlaw.com/sitemap.xml`.

- [ ] **Commit.** `git add next-sitemap.config.js package.json yarn.lock && git commit -m "build(seo): regenerate sitemap.xml + robots.txt via next-sitemap postbuild into ./out"`

---

### Task 6.4 — Flag (do NOT fix here): Functions runtime is Node 16 (EOL)

- [ ] **Record, do not change.** `functions/package.json` declares `"engines": { "node": "16" }` (line 16). Node 16 is end-of-life and Firebase has deprecated the Node 16 functions runtime. Upgrading the runtime (Node 16 → 20/22) also implies bumping `firebase-functions` (v4 → v6) and reworking `functions.config().algolia.*` (deprecated in v2 functions / removed) to env params, plus retesting the Algolia `onCreate/Update/Delete` triggers. This is intentionally OUT OF SCOPE for Phase 6 — leave `functions/` exactly as-is. Open a separate task: "Upgrade Cloud Functions to Node 20 + firebase-functions v6 + migrate algolia config() to params." Do not deploy `--only functions` from this phase.

---

### Task 6.5 — End-to-end deploy verification + commit

- [ ] **State success criteria.**
  1. `yarn build` produces `./out` with per-route HTML (incl. `out/ko/news/<id>/index.html`).
  2. `firebase deploy --only hosting` succeeds and touches ONLY hosting.
  3. A deep link `https://namsan.web.app/ko/news/<id>/` (or the channel preview URL) returns that page's own OG HTML — `<meta property="og:title">` / `og:image` reflect the specific news article, NOT the home page.
  4. The bare root `/` 301-redirects to `/ko/`.
  5. `sitemap.xml` + `robots.txt` are reachable.

- [ ] **Verify locally first (no prod risk).** `yarn build`, then either:
  - `firebase emulators:start --only hosting` and curl the deep link, OR
  - `firebase hosting:channel:deploy preview-phase6 --only hosting` for a throwaway preview URL.
  Confirm: `curl -s <preview>/ko/news/<id>/ | grep -i 'og:title'` shows the article-specific title; `curl -sI <preview>/` returns `HTTP/.. 301` with `location: /ko/`; `curl -sI <preview>/sitemap.xml` returns 200.

- [ ] **Verify it currently fails on the OLD config.** (Sanity) Against the pre-6.1 `firebase.json`, the deep-link curl would return the HOME page OG (catch-all `-> /index.html`). This is the regression Task 6.1 fixes.

- [ ] **Promote.** `yarn build && firebase deploy --only hosting`. Re-run the same curls against `https://namsan.web.app` (and/or `https://www.namsanlaw.com` once DNS points at the `namsan` site) and confirm criteria 3–5.

- [ ] **Commit.** All config commits were made in 6.1 and 6.3; if a `DEPLOY.md` runbook was added, `git add DEPLOY.md && git commit -m "docs(deploy): Phase 6 hosting deploy runbook"`. Otherwise nothing further to commit — Phase 6 is config + verification only.
