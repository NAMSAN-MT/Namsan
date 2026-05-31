# Namsan Law Firm — Project Context for Claude

Next.js 14 (Pages Router), `output: 'export'`, Firebase Hosting 배포.
패키지 매니저는 **pnpm** (corepack). npm/yarn 사용 금지.

## Commands

```bash
pnpm dev        # dev 서버 :8000
pnpm build      # next build → next-image-export-optimizer → next-sitemap
pnpm typecheck  # tsc --noEmit
pnpm lint       # eslint src (빌드 게이트 아님 — next.config.js에서 빌드 시 lint 무시)
pnpm serve      # out/ 미리보기
firebase deploy --only hosting   # 수동 배포 (절대 bare deploy 금지)
```

## Hard Constraints

**App Router 금지.** 이 프로젝트는 Pages Router를 사용한다. App Router 패턴을 추가/마이그레이션하지 말 것.

**SSR / ISR 금지.** `output: 'export'`이므로 런타임 서버가 없다. 모든 페이지는 `getStaticPaths` + `getStaticProps`를 사용해야 한다. SSR/ISR은 명시적으로 검토 후 기각됨.

**렌더 중 window 접근 금지.** 정적 export도 서버에서 렌더된다. `window`/`document` 접근은 반드시 `useEffect` 또는 `mounted` 상태 가드 안에서만. 렌더 바디에서 `typeof window`로 분기하면 하이드레이션 mismatch가 난다. (`eslint-plugin-ssr-friendly`가 경고로 감지)

**.babelrc 금지.** styled-components SSR은 SWC 컴파일러 플러그인(`compiler.styledComponents`)으로 처리한다. `.babelrc`를 추가하면 SWC가 비활성화되어 styled-components 변환이 깨진다.

**SVG는 React 컴포넌트가 아니라 URL 문자열.** webpack이 `.svg`를 `asset/resource`로 처리한다. `@svgr/webpack`을 도입하거나 SVG를 `ReactComponent`로 import하지 말 것.

**firebase-admin 금지.** 빌드 타임 데이터는 **클라이언트 Firebase SDK**(브라우저와 동일한 `NEXT_PUBLIC_FIREBASE_*` 설정)로 읽는다. Firestore 컬렉션은 public read. `src/server/buildData.ts`는 `getStaticProps`/`getStaticPaths`에서만 import한다.

**Algolia 금지.** News 검색은 빌드 타임 Fuse.js 인덱스로 정적 props에 포함된다. Algolia 의존성이나 Cloud Functions를 추가하지 말 것. (functions/ 디렉터리는 제거됨)

## i18n 패턴

모든 로케일 페이지는 `src/pages/[locale]/` 아래. 로케일: `ko`(기본), `en` (`src/i18n/config.ts`).
Next.js 내장 `i18n` config 키는 사용하지 않는다 (`output: 'export'`와 비호환).
로케일 페이지마다 `@I18n/getStaticProps`의 `localePaths()` / `localeProps()`를 사용.
번역 메시지는 `src/intl/{ko,en}.json`, 컴포넌트에서 `useTranslations()`. HTML 포함 문자열은 `t.raw(key)`.

## Path Aliases (tsconfig.json)

`@Api` `@Components` `@Server` `@I18n` `@Intl` `@Interface` `@Images` `@Fonts`
`@Styles` `@Hooks` `@Assets` `@Config` `@Hocs` `@Pages` `@Type`

## GitHub Actions

시크릿은 레거시로 `GATSBY_FIREBASE_*` 이름을 유지한다. 워크플로가 빌드 시 `NEXT_PUBLIC_FIREBASE_*`로 매핑한다. GitHub 시크릿 이름을 변경하지 말 것.

## Deep Docs

- 설계 스펙: `docs/superpowers/specs/2026-05-31-gatsby-to-nextjs-migration-design.md`
- 마이그레이션 플랜: `docs/superpowers/plans/2026-05-31-gatsby-to-nextjs-migration.md`
- 릴리스 노트: `docs/릴리스노트-개발자.md`, `docs/릴리스노트-클라이언트.md`
