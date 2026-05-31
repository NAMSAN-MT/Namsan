# 법무법인 남산 (Namsan Law Firm) — Website

Next.js 14 정적 사이트(static export), Firebase Hosting 배포.
2026-05 Gatsby 5에서 마이그레이션됨 — 설계 배경은 `docs/superpowers/` 및 `docs/릴리스노트-개발자.md` 참고.

## Requirements

- Node `18.17.1` (`.nvmrc`)
- pnpm 9 (`corepack enable && corepack prepare pnpm@9.15.4 --activate`)

## Setup

```bash
cp .env.example .env.local   # NEXT_PUBLIC_FIREBASE_* 값 채우기
pnpm install
```

빌드 타임에 Firestore를 **클라이언트 SDK**로 읽습니다(firebase-admin / 서비스 계정 키 불필요 — 컬렉션은 public read). 따라서 빌드에 필요한 값은 `NEXT_PUBLIC_FIREBASE_*` 뿐입니다.

## Development

```bash
pnpm dev        # http://localhost:8000
pnpm typecheck  # tsc --noEmit
pnpm lint       # eslint (CI/개발용 — 빌드 게이트 아님)
```

## Build & Preview

```bash
pnpm build      # next build → next-image-export-optimizer → next-sitemap(postbuild)
pnpm serve      # out/ 디렉터리 로컬 미리보기
```

정적 결과물은 `out/`에 생성됩니다. 빌드는 `getStaticProps`에서 Firestore 데이터(members/work/news)를 모두 가져오고 원격 이미지를 다운로드/최적화하므로 인터넷 연결과 유효한 `.env.local`이 필요합니다.

## Deploy

`master` 브랜치 push 시 GitHub Actions(`.github/workflows/firebase-hosting-merge.yml`)로 자동 배포됩니다. PR(develop push)에는 프리뷰 채널이 생성됩니다.

수동 배포:

```bash
firebase deploy --only hosting
```

> ⚠️ Cloud Functions는 제거되었습니다. 반드시 `--only hosting`을 붙이세요. bare `firebase deploy`는 존재하지 않는 functions 배포를 시도합니다.

## Architecture

| 항목 | 선택 |
|---|---|
| Framework | Next.js 14, **Pages Router**, `output: 'export'` |
| Hosting | Firebase Hosting (`out/` → `public`) |
| i18n | next-intl, 수동 `[locale]` URL 세그먼트 (`/ko/`, `/en/`) |
| Data | 클라이언트 Firebase SDK를 `getStaticProps`에서 호출 (`src/server/buildData.ts`) |
| Styling | styled-components v5, SWC 컴파일러 (`.babelrc` 없음) |
| Images | next-image-export-optimizer (WebP + blur), 원격 이미지 매니페스트, `probe-image-size`로 실제 치수 측정 |
| SVG | URL 문자열로 import (`asset/resource`), React 컴포넌트 아님 |
| News 검색 | 빌드 타임 인덱스 + 클라이언트 Fuse.js (Algolia / 서버 함수 없음) |
| Package manager | pnpm (`node-linker=hoisted`, `.npmrc`) |

## URL 구조

- `/` → `/ko/` 301 리다이렉트 (firebase.json)
- `/ko/<page>`, `/en/<page>` — 모든 페이지는 `src/pages/[locale]/` 아래
- 동적 라우트: `member/[order]`, `work/[id]`, `news/[id]`, `policy/[slug]`

## 주요 컨벤션

**페이지 추가:** `src/pages/[locale]/your-page.tsx` 생성. `@I18n/getStaticProps`의 `localePaths()`(= `getStaticPaths`)와 `localeProps()`(= `getStaticProps`)를 export. 추가 데이터가 있으면 `localeProps({ ... })`로 전달.

**번역:** 메시지 파일은 `src/intl/ko.json`, `src/intl/en.json`. 컴포넌트에서 `useTranslations()` 사용. HTML 마크업이 포함된 문자열은 `t.raw(key)` + `dangerouslySetInnerHTML` (ICU 파서가 HTML을 손상시킴).

**이미지:** `next/image`(또는 `AppImage` 래퍼) 사용. `unoptimized` 설정 금지. SVG는 URL 문자열로 import (SVGR 변환 없음).

**빌드 타임 데이터:** `@Server/buildData`는 `getStaticProps`/`getStaticPaths`에서만 import. 클라이언트 컴포넌트에서 import 금지.

**렌더 중 window 접근 금지:** `window`/`document`는 `useEffect` 또는 mounted 상태 가드 안에서만 사용 (정적 export도 서버에서 렌더 → 하이드레이션 mismatch 유발).
