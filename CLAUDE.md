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

**정적 export 동적 라우트에서 "쿼리만 있는 href" 금지.** `output: 'export'` + `/[locale]/...` 동적 라우트에서 `<Link href="?page=2">`처럼 경로 없이 쿼리만 넘기면, 클릭 시 클라이언트 라우터가 `[locale]` 미치환 상태로 `/_next/data/<id>/[locale]/...json`을 요청 → 404 → "Failed to load static props" → 리터럴 `[locale]` URL로 하드 내비게이션되어 깨진다. 같은 페이지 내 쿼리 이동(페이지네이션/탭/필터)은 **locale이 치환된 구체 경로**(`/${locale}/news/?page=2`) + **`shallow: true`** + `<Link prefetch={false}>` 조합을 쓸 것. `router.push`의 base 경로는 `router.asPath`(치환됨)에서 뽑고 `router.pathname`(`/[locale]/...` 템플릿)은 쓰지 말 것. **dev 서버는 getStaticProps 데이터를 동적 제공해 이 버그가 재현 안 되니, 반드시 `pnpm build` + `pnpm serve`(정적 산출물)로 검증.**

**필터·쿼리 상태는 `useRouter().query`로 읽을 것.** 렌더 중 `document.location.search`를 읽으면 비반응형이라 shallow 라우팅에서 리스트가 재필터되지 않고, 렌더 바디 `document` 접근이라 하이드레이션 mismatch도 난다(위 "렌더 중 window 접근 금지"의 구체 사례). 딥링크 pre-fill이 필요하면 `useEffect`로 `router.query` → 컴포넌트 상태를 동기화한다.

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

**Git 토폴로지:** `origin` = `eelephants/Namsan`(포크, push 대상), `upstream` = `NAMSAN-MT/Namsan`(원본, PR 타겟). `gh pr`는 `--repo NAMSAN-MT/Namsan --base develop --head eelephants:<branch>` 형식으로 명시할 것(미지정 시 포크 컨텍스트를 봐서 "No commits between" 오류). 워크플로는 `pull_request`가 아니라 **push**(`develop`→preview, `master`→live)에서 트리거되므로 PR 자체엔 체크가 안 붙는다.

**Node 20 필수.** `.nvmrc` = `20`. `firebase-tools@latest`(v15)가 Node 18을 드롭(>=20 요구)하므로, CI deploy가 `.nvmrc`로 Node 18을 깔면 실패한다. 18로 내리지 말 것. (로컬 빌드는 `.env.local` 키, CI는 GitHub Secrets — "로컬 빌드 성공 ≠ CI 성공".)

## Deep Docs

- 설계 스펙: `docs/superpowers/specs/2026-05-31-gatsby-to-nextjs-migration-design.md`
- 마이그레이션 플랜: `docs/superpowers/plans/2026-05-31-gatsby-to-nextjs-migration.md`
- 릴리스 노트: `docs/릴리스노트-개발자.md`, `docs/릴리스노트-클라이언트.md`
