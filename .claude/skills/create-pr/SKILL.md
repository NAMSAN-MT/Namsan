---
name: create-pr
description: Namsan 전용 PR 생성. 크로스-포크 토폴로지(origin=eelephants 포크 → upstream=NAMSAN-MT 원본)에 맞춰 PR/푸시를 자동화한다. 글로벌 create-pr 스킬을 이 레포에서 오버라이드.
---

# Create PR Skill (Namsan / cross-fork)

이 레포는 **포크 → 원본** 구조다. 글로벌 `/create-pr`는 `origin`의 develop을 가정하고
`--repo`를 안 붙여서 이 레포에서 오작동한다(잘못된 컨텍스트 → "No commits between",
중복 PR 오판). 이 로컬 버전이 그 마찰을 제거한다.

## 토폴로지 (고정)

- `origin` = `eelephants/Namsan` (포크, **push 대상**)
- `upstream` = `NAMSAN-MT/Namsan` (원본, **PR base 대상**)
- 워크플로는 `pull_request`가 아니라 **push**(`develop`→preview, `master`→live)에서 트리거.
  → PR 자체엔 체크가 안 붙고, base 브랜치에 머지된 뒤 push로 CI가 돈다.

## Language Policy (반드시 준수)

- PR 제목·본문 모두 **한국어**. 섹션 헤더(`## Summary` `## Changes` `## Test plan`)만 영어.
- 영문 커밋이면 한국어로 의역한 제목 생성. 코드/파일명/명령어/기술용어 고유명사는 원문 유지.

## Trigger / 인자

- `/create-pr` — Feature PR (현재 브랜치 → `upstream/develop`)
- `/create-pr <base>` — base 직접 지정 (예: `master`)

## Step 1: 사전 검증

```bash
BRANCH=$(git branch --show-current)
git status --short
git fetch upstream develop 2>/dev/null
git log --oneline upstream/${BASE:-develop}..HEAD   # BASE 미지정 시 develop
```

- 현재 브랜치가 base면 → 에러
- `upstream/<base>..HEAD` 커밋이 0개면 → 에러(이미 머지됐거나 올릴 게 없음)
- 미커밋 변경 → 경고(차단 안 함)

## Step 2: Base 결정

인자 지정 시 그 브랜치, 미지정 시 `develop`. (대상 레포는 항상 `NAMSAN-MT/Namsan`.)

## Step 3: Push (토큰 URL 우회)

origin URL에 사용자명(`wjdrms1919`)이 박혀 있어 keychain 인증이 비대화형에서 실패한다.
gh 토큰으로 일회성 push (영구 설정/upstream에 토큰 저장 안 함):

```bash
# 활성 gh 계정이 eelephants 쓰기권한 있어야 함. 없으면: gh auth switch --user SangchoKim
git push "https://x-access-token:$(gh auth token)@github.com/eelephants/Namsan.git" "${BRANCH}:${BRANCH}"
```

추적 ref가 안 맞으면(`git push origin`을 안 썼으므로) `git fetch origin ${BRANCH}` 로 동기화.

## Step 4: 기존 PR 확인 (반드시 --repo 명시)

```bash
gh pr list --repo NAMSAN-MT/Namsan --head "eelephants:${BRANCH}" --base "${BASE:-develop}" \
  --state open --json number,url
```

열린 PR 있으면 URL 표시하고 종료.

## Step 5: 제목 생성

- 커밋 1개 → 커밋 메시지를 제목으로
- 커밋 N개 → 브랜치명/커밋들 분석해 한국어 제목 생성

## Step 6: PR 생성 (크로스-포크)

```bash
gh pr create \
  --repo NAMSAN-MT/Namsan \
  --base "${BASE:-develop}" \
  --head "eelephants:${BRANCH}" \
  --title "<한국어 제목>" \
  --body "$(cat <<'EOF'
## Summary

<변경 1-3줄 요약>

## Changes

<커밋별 bullet — base 이후 전부>

## Test plan

- [ ] `pnpm typecheck && pnpm build` (이미지 옵티마이저 포함) 통과
- [ ] <코드 변경 기반 검증 항목>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

PR URL 반환.

## Notes

- 본문은 반드시 HEREDOC.
- `--head eelephants:<branch>` 누락 시 base 레포에서 head를 못 찾아 "Head ref must be a branch" 실패.
- PR엔 체크가 안 붙는 게 정상(워크플로가 push 트리거). 머지 후 base push로 CI 확인.
- outward-facing 액션(PR 생성/머지)은 진행 전 사용자 확인.
