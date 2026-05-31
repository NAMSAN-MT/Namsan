# Gatsby 5 → Next.js 마이그레이션 설계 (법무법인 남산)

- 작성일: 2026-05-31
- 대상 저장소: `/Users/kimsangcho/dev/side-job/Namsan` (branch: `develop`)
- 상태: 설계 승인 완료 → 구현 계획(writing-plans) 대기

---

## 1. 배경 & 목표

현재 사이트는 **Gatsby 5 기반 정적 사이트**(법무법인 남산 / Lim, Chung & Suh)이며, 빌드 시
Firebase Firestore(`members`/`work`/`news`)를 GraphQL로 조회하고 Firebase Storage 원격 이미지를
sharp로 최적화하여 정적 페이지를 생성한다. Firebase Hosting에 정적 배포된다.

**목표:** 동일한 정적 배포 모델·동일 디자인·동일 라우트를 유지하면서 프레임워크를
**Next.js(Pages Router, `output: 'export'`)** 로 이전한다. 기능적/시각적 동등성을 우선하고,
런타임 동작 차이를 최소화한다.

## 2. 확정된 결정 (사용자 승인)

| 항목 | 결정 |
|---|---|
| 라우터 | **Next.js Pages Router** (App Router 아님) |
| 빌드/배포 | **`output: 'export'`** 정적 빌드 → Firebase Hosting (`public: "out"`) |
| i18n | **next-intl** (메시지/포맷 전용). 라우팅은 `[locale]` 세그먼트로 직접 구현 |
| 이미지 | **단계적**: Phase 3 `images.unoptimized` → Phase 5 `next-image-export-optimizer`(원격 매니페스트) |
| 진행 방식 | **단계적 + 단계별 검증** (Phase 0~6, 각 단계 검증 게이트) |
| styled-components | **v5 유지** (v6 금지), SWC `compiler.styledComponents` |

## 3. 🚨 보안 선결 과제 (Phase 0, 마이그레이션과 독립)

`firebase-key.json` (프로젝트 `namsan-801de` 서비스 계정 **비공개 키**)이 git에 추적되고 있다.
이미 노출된 비밀이다.

- **사용자 조치:** Firebase 콘솔에서 해당 서비스 계정 키 **폐기(rotate)** 후 신규 발급
- **코드 조치:** 신규 키를 `.env`(예: `FIREBASE_SERVICE_ACCOUNT` 또는 개별 필드)로 이동,
  `.gitignore`에 `firebase-key.json` 추가, 빌드 시 `process.env`에서 admin 자격증명 로드
- git 히스토리에서의 완전 제거(history rewrite)는 별도 작업으로 분리

## 4. 타깃 아키텍처

### 4.1 스택 매핑

| 영역 | 현재 (Gatsby) | 타깃 (Next.js) |
|---|---|---|
| 프레임워크 | gatsby 5 | next (최신 stable), `output:'export'` |
| i18n | gatsby-plugin-intl | next-intl (`NextIntlClientProvider`, `useTranslations`) + `[locale]` 라우트 |
| 이미지 | gatsby-plugin-image / sharp | next/image (`unoptimized`) → next-image-export-optimizer |
| 스타일 | gatsby-plugin-styled-components + babel-plugin | SWC `compiler.styledComponents` + `_document.tsx` ServerStyleSheet |
| 데이터(빌드) | gatsby-node `createPages` + GraphQL | firebase-admin in `getStaticPaths`/`getStaticProps` |
| 마크다운 | gatsby-plugin-mdx, gatsby-transformer-remark | gray-matter + react-markdown + **rehype-raw** |
| SVG 컴포넌트 | gatsby-plugin-react-svg | @svgr/webpack (next.config webpack rule) |
| 폰트(otf) | webpack file-loader (`@Fonts`) | `/public` URL 또는 webpack `asset/resource` |
| 별칭 import | gatsby-plugin-alias-imports | tsconfig `paths` (Next 네이티브 인식) |
| sitemap/robots | gatsby-plugin-sitemap/robots-txt | next-sitemap 또는 정적 생성 스크립트 |
| 배포 | Firebase Hosting `public:"public"` | Firebase Hosting `public:"out"` |

### 4.2 `pages/` 디렉터리 구조

```
pages/
  _app.tsx              # NextIntlClientProvider(locale/messages from pageProps)
                        #   + styled-components ThemeProvider + <GlobalStyle/>
  _document.tsx         # ServerStyleSheet collectStyles (빌드 pre-render 시 실행)
  index.tsx            # 루트 → /ko/ 클라이언트 리다이렉트 (locale 파라미터 없음)
  404.tsx              # out/404.html (Firebase custom 404)
  [locale]/
    index.tsx          # 기존 pages/index.tsx (메인)
    introduce.tsx
    contact.tsx
    news.tsx           # 목록(검색) 페이지: getStaticProps(locale만)
    members.tsx        # 기존 templates/members.tsx
    work.tsx           # 기존 templates/work.tsx (목록)
    member/[order].tsx # getStaticPaths: locale × member.order
    work/[id].tsx      # getStaticPaths: locale × work.categoryId
    news/[id].tsx      # getStaticPaths: locale × news.id (per-page OG → next/head)
    policy/[slug].tsx  # getStaticPaths: locale × {privacy, disclaimer}
```

규칙:
- 모든 `[locale]/**`의 `getStaticPaths`는 `locales.flatMap(l => ids.map(id => ({params:{locale:l, ...id}})))`,
  **`fallback: false`** (정적 export 필수).
- `_app`은 `pageProps.locale` / `pageProps.messages`를 읽는다 (`router.locale` 사용 불가 — i18n config 미사용).
- `pages/index.tsx`, `pages/404.tsx`는 `[locale]` 밖(루트)에 위치.
- 기존 `src/pages/test.tsx`는 이전 대상에서 제외(삭제).
- `trailingSlash: true` (Gatsby 디렉터리형 출력과 일치, `/ko/introduce/index.html`).

## 5. 서브시스템별 검증된 설계

> 아래 코드는 현재 문서(2026-05 기준) 검증 결과를 반영한 패턴이다.

### 5.1 i18n (next-intl + `[locale]` + export)

- **Next 내장 i18n 키 사용 금지** — `output:'export'`와 공식 비호환. 미들웨어도 export에서 동작 안 함.
- `[locale]` 세그먼트로 직접 라우팅. ko도 `/ko/` prefix를 가진다(gatsby-plugin-intl과 동일 동작).
- 기존 `src/intl/{ko,en}.json` **그대로 재사용**. 중첩 키(`common.company`)는 dot notation 지원.
- `injectIntl`(51곳) → `useTranslations()`. `intl.formatMessage({id:'x.y'})` → `t('x.y')`.
- `<br/>` 포함 메시지 키 → next-intl `t.rich(key, { br: () => <br/> })` + JSON을 `<br></br>`로 변경
  (ICU 파서는 self-closing `<br/>`를 허용하지 않음). 또는 기존 `dangerouslySetInnerHTML` 유지(차선).
- `changeLocale`(GNB.hook.ts) → `router.push(asPath.replace(/^\/(en|ko)/, '/'+lang))`.
- 루트 `/` 리다이렉트는 **클라이언트 사이드**(정적 export엔 서버 리다이렉트 불가) + Firebase redirect 규칙 병행.
  → gatsby 대비 유일한 동작 차이(허용).

```js
// next.config.js — i18n 키 없음(있으면 export 깨짐), next-intl 플러그인 없음
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },       // Phase 3
  compiler: { styledComponents: true },
};
```

```tsx
// pages/_app.tsx
import { NextIntlClientProvider } from 'next-intl';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NextIntlClientProvider locale={pageProps.locale} messages={pageProps.messages} timeZone="Asia/Seoul">
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
```

```tsx
// 정적 페이지 공통 로더 (예: pages/[locale]/introduce.tsx)
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map(locale => ({ params: { locale } })),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params!.locale as Locale;
  return { props: { locale, messages: (await import(`@Intl/${locale}.json`)).default } };
};
```

### 5.2 styled-components v5 SSR (Pages Router + export)

- SWC `compiler.styledComponents: true` 로 babel-plugin-styled-components 대체. **`.babelrc` 추가 금지**
  (SWC 비활성화 → React 18에서 SSR 스타일 누락 = FOUC, Next #35758).
- `_document.tsx`의 `getInitialProps`에서 `ServerStyleSheet.collectStyles`로 스타일 수집.
  export는 빌드 시 pre-render하므로 `<style>`이 `.html`에 baked-in (FOUC 없음).
- `ThemeProvider` + `<GlobalStyle/>` 는 `_app.tsx`.
- GlobalStyle 수정: `#___gatsby`/`#gatsby-focus-wrapper` → `#__next`. 폰트 import 처리.
- styled-components **v5 유지**, `src/styled-components.d.ts`(DefaultTheme augmentation) 그대로.

```tsx
// pages/_document.tsx
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({ enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />) });
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps, styles: [initialProps.styles, sheet.getStyleElement()] };
    } finally { sheet.seal(); }
  }
}
```

### 5.3 데이터층 (createPages → firebase-admin + getStatic*)

- `src/server/firebaseAdmin.ts`(server-only): admin 1회 초기화(`getApps().length` 가드), `adminDb`/`adminBucket` export.
  **`getStaticPaths`/`getStaticProps`에서만 import** (컴포넌트/`_app`에서 절대 import 금지 → 클라이언트 번들 분리).
- 빌드 자격증명은 `process.env`에서 로드(섹션 3).
- 컬렉션 fetch는 **모듈 레벨 Promise 메모이제이션** → N페이지 재조회 방지(읽기 O(collections)).
- `getStaticProps` 반환값은 **JSON 직렬화 가능**해야 함: Firestore `Timestamp` → `.toMillis()`, `undefined` 제거
  (news prev/next 로직이 undefined 다수 반환). `serialize()` 헬퍼로 일괄 처리.
- `getStaticPaths`는 모든 경로 명시 + `fallback: false`.
- 이미지: `IGatsbyImageData`(`api.interface.ts`) → `{src,width,height,blurDataURL?}` 일괄 교체.
  Phase 3는 안정적 공개 URL 패턴 사용:
  `https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<encodedPath>?alt=media`.
- 클라이언트 사이드 Algolia 뉴스 검색은 영향 없음(브라우저 유지).

```ts
// src/server/firebaseAdmin.ts
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount), storageBucket: 'namsan-801de.appspot.com' });
}
export const adminDb = getFirestore();
let _members: Promise<any[]> | null = null;
export const getAllMembers = () =>
  (_members ??= adminDb.collection('members').orderBy('order','asc').get()
     .then(s => s.docs.map(d => ({ id: d.id, ...d.data() }))));
```

### 5.4 마크다운 policy 페이지

- gray-matter(프론트매터) + react-markdown(렌더) + **rehype-raw(필수)** + remark-breaks(기존).
- `privacy.md`는 거의 raw HTML `<table>`/`<colgroup>` → react-markdown@6는 기본 raw HTML 제거.
  **rehype-raw 없으면 빈 페이지**.
- 프론트매터 `slug`에 선행 슬래시(`'/privacy'`) → `slug.replace(/^\//,'')`로 제거.
- `fs`/`path`는 `getStaticPaths/getStaticProps` 내부에서만. `process.cwd()` 기준 경로.
- 버전 핀: `rehype-raw@^6`(react-markdown@6/unified10 호환, 7+ 금지).
- 콘텐츠는 ko/en 동일하므로 같은 .md가 모든 locale에 사용.

### 5.5 이미지 (단계적)

- **Phase 3(시작):** `images: { unoptimized: true }` + `next/image`에 명시적 width/height + Storage URL.
  "올바르게 동작하는" 정적 배포 우선 확보.
- **Phase 5(업그레이드):** `next-image-export-optimizer`(v1.20.x) + `remoteOptimizedImages.js` 비동기 매니페스트.
  매니페스트는 **getStaticProps와 동일한 Firestore 조회**로 생성(URL 정확 일치 필수). WebP/responsive/blur 복원.
  - `images: { loader:'custom' }` (loaderFile 설정 금지 — 패키지가 자체 loader 제공)
  - `transpilePackages: ['next-image-export-optimizer']`
  - `nextImageExportOptimizer_remoteImageCacheTTL` 설정(0 금지, CI 재다운로드 방지)
  - `placeholder="blur"` + `generateAndUseBlurImages` (gatsby blurUp 대체)

### 5.6 배포 (Firebase Hosting)

- `hosting.public: "out"`, 빌드 스크립트 `gatsby build` → `next build`(export가 `out/` 직접 생성).
- **제거:** `**/news/** → function "news"` rewrite (해당 함수는 functions에 **존재하지 않는 dangling 규칙**),
  그리고 SPA catch-all `** → /index.html` (정적 export는 라우트별 실제 .html 생성).
- `cleanUrls`/`trailingSlash`는 `next.config`의 `trailingSlash: true`와 정합(디렉터리 + index.html).
- `headers`: `static/**`·`page-data/**`·`sw.js`(Gatsby 산출물) → `/_next/static/**` immutable로 갱신.
- **유지:** Algolia onCreate/Update/Delete 함수(데이터 파이프라인, 호스팅 무관). `--only hosting`/`--only functions` 분리 배포.
- 트레이드오프(현 Gatsby와 동일): 빌드 후 추가된 news는 재빌드 전까지 페이지 없음(Algolia 색인은 즉시).
- **별도 플래그:** functions 런타임이 Node 16(EOL) — 호스팅 변경과 분리하여 별도 수정 권고.

## 6. 교차 이슈 / 순서 제약

- **이미지 전략(A):** 단계적(Phase 3 unoptimized → Phase 5 optimizer)로 확정. `next.config images` 키와
  이미지 디스크립터 shape(`{src,width,height,blurDataURL}`)을 데이터 인터페이스 설계 전에 고정.
- **`[locale]` × 동적 라우트(B):** `[locale]` 도입 시 모든 동적 라우트 `getStaticPaths`가 `locale × id` 곱이 됨.
  데이터 작업 전에 `[locale]` 구조 확립.
- **`IGatsbyImageData` 제거(C):** 매니페스트 빌더 / `getStaticProps` 직렬화 / 이미지 컴포넌트가 같은 shape를 읽으므로
  **한 번에 원자적으로** 교체.
- **`trailingSlash`(D):** `true`로 확정. `next.config` + `firebase.json` 동시 정합.

순서: (A·D 고정) → (B 구조) → (C와 데이터층) → 페이지 이전.

## 7. 단계별 계획 + 검증 게이트

| Phase | 내용 | 검증 |
|---|---|---|
| 0 | 보안(키 rotate/env/.gitignore), `next.config`, deps 교체(gatsby* 제거 → next/next-intl/firebase-admin/@svgr/webpack), tsconfig paths 유지 | `next build` 스캐폴드 통과 |
| 1 | `_document`(SSR) + `_app`(Theme/Global), GlobalStyle 셀렉터/폰트/SVG 처리 | 더미 styled 페이지 FOUC 없이 export |
| 2 | `[locale]` 라우팅 + next-intl, `injectIntl`→`useTranslations`, 정적 페이지(index/introduce/contact) | `/ko/introduce/`·`/en/introduce/` 카피 정상 |
| 3 | firebase-admin 데이터층 + 동적 라우트(member/work/news/policy), 인터페이스 교체, per-page OG, 이미지 unoptimized | 전체 `next build`가 모든 `out/[locale]/.../index.html` 생성 |
| 4 | policy 마크다운(gray-matter+react-markdown+rehype-raw) — Phase 3와 병렬 | privacy 표 렌더 확인 |
| 5 | (선택/측정) 이미지 최적화 업그레이드 | LCP/용량 개선, 원본 silent fallback 없음 |
| 6 | `firebase.json` 정리(public:"out", rewrite 제거, headers), 배포 | `/ko/news/<id>/` 딥링크 OG HTML 정상 |

Phase 1→2→3 순차, 4는 3과 병렬 가능, 5는 연기 가능, 6은 마지막.

## 8. 최대 리스크 & 디리스킹

**최대 리스크:** 빌드타임 데이터+이미지 파이프라인(5.3+5.5)이 `gatsby-node.ts`의 핵심 대체물이며,
빌드/배포 시점에야 드러나는 3개 복합 실패 모드 + 라이브 시크릿.

1. `getStaticProps` JSON 직렬화(Timestamp/undefined) 실패
2. 경로 폭증 × locale → O(pages) Firestore 읽기
3. (Phase 5) 원격 이미지 매니페스트 드리프트 → 조용히 원본 이미지 ship

**디리스킹:**
- 서비스 계정 키 즉시 rotate + env 이동(Phase 0, 비협상).
- 컬렉션 fetch 모듈 레벨 메모이제이션 + 매니페스트를 동일 fetch로 생성.
- `serialize()` 헬퍼(Timestamp→ms, undefined 제거)를 모든 getStaticProps 반환에 적용.
- 이미지 단계화(Phase 3 unoptimized로 올바른 배포 먼저, Phase 5에서 측정 기반 업그레이드).

## 9. 의존성 변경 요약

추가: `next`, `next-intl@^3`, `firebase-admin@^13`, `gray-matter@^4`, `rehype-raw@^6`,
`@svgr/webpack`, (Phase 5) `next-image-export-optimizer@^1.20`, (선택) `p-limit`, (선택) `next-sitemap`.

제거: `gatsby` 및 모든 `gatsby-*` 플러그인, `babel-plugin-styled-components`, `gatsby-image`,
`gatsby-plugin-image`, `gatsby-remark-typescript` 등.

유지: `react`/`react-dom@18`, `styled-components@^5`, `styled-reset`, `react-markdown@6.0.3`,
`remark-breaks@3.0.3`, `framer-motion`, `algoliasearch`, `instantsearch.js`, `react-lottie`,
`date-fns`, `lodash`, `@fontsource/noto-sans-kr`.

## 10. 범위 밖 (이번 마이그레이션 비포함)

- styled-components v6 업그레이드
- functions Node 16 → 20 런타임 업그레이드(별도 플래그)
- App Router 전환
- git 히스토리에서 firebase-key.json 완전 제거(history rewrite)
- 신규 기능/디자인 변경
