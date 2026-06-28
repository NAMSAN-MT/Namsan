---
name: deploy
description: Namsan 전용 배포. PR 생성 후 자동 머지까지 수행해 push 트리거 CI 배포를 일으킨다. `/deploy`=현재 브랜치→develop(preview), `/deploy live`=develop→master(live). 크로스-포크 토폴로지(origin=eelephants 포크 → upstream=NAMSAN-MT 원본).
---

# Deploy Skill (Namsan / cross-fork)

이 레포는 **push 트리거 CI**다 — `develop` 머지=preview 배포, `master` 머지=live 배포.
즉 **PR을 base에 머지하는 행위 자체가 배포**다. 이 스킬은 PR 생성에서 멈추는
`/create-pr`과 달리 **머지(=배포)까지** 수행한다.

## 토폴로지 (고정)

- `origin` = `eelephants/Namsan` (포크, **push 대상**)
- `upstream` = `NAMSAN-MT/Namsan` (원본, **PR base·머지 대상**)
- 워크플로는 `pull_request`가 아니라 **push**에서 트리거 (`develop`→preview, `master`→live).
  → PR엔 체크가 안 붙고, base에 머지되어 push가 나면 CI가 돈다.
- 머지는 항상 **`NAMSAN-MT/Namsan`** 에서 일어나야 한다(활성 gh 계정에 머지 권한 필요).

## 두 가지 모드

| 호출 | 흐름 | base | head | 배포 채널 |
|---|---|---|---|---|
| `/deploy` | 현재 feature 브랜치 → develop | `develop` | `eelephants:<branch>` | **preview** |
| `/deploy live` (또는 `master`) | develop → master | `master` | `develop` (same-repo) | **live** |

- 머지 방식: **merge commit** (`gh pr merge --merge`).
- **live(master) 머지는 운영 반영이므로 머지 직전 사용자에게 반드시 확인.**

## Language Policy

- PR 제목·본문 **한국어**. 섹션 헤더(`## Summary` `## Changes` `## Test plan`)만 영어.
- 코드/파일명/명령어/기술용어 고유명사는 원문 유지.

---

## Mode A — `/deploy` (preview: 현재 브랜치 → develop)

### A1. 사전 검증

```bash
BRANCH=$(git branch --show-current)
git status --short
git fetch upstream develop 2>/dev/null
git log --oneline upstream/develop..HEAD
```

- `BRANCH`가 `develop`/`master`면 → 에러(피처 브랜치에서 실행).
- `upstream/develop..HEAD` 커밋 0개면 → 에러(이미 머지됐거나 올릴 게 없음).
- 미커밋 변경 → 경고(차단 안 함).

### A2. Push (토큰 URL 우회)

origin URL에 사용자명이 박혀 keychain 인증이 비대화형에서 실패한다. gh 토큰으로 일회성 push:

```bash
# 활성 gh 계정이 eelephants 쓰기권한 있어야 함. 없으면: gh auth switch --user SangchoKim
git push "https://x-access-token:$(gh auth token)@github.com/eelephants/Namsan.git" "${BRANCH}:${BRANCH}"
git fetch origin "${BRANCH}"   # 추적 ref 동기화
```

### A3. 기존 PR 확인 (반드시 --repo 명시)

```bash
gh pr list --repo NAMSAN-MT/Namsan --head "eelephants:${BRANCH}" --base develop \
  --state open --json number,url
```

열린 PR 있으면 그 번호를 재사용(A4 건너뛰고 A5로).

### A4. PR 생성 (크로스-포크)

제목: 커밋 1개면 그 메시지, N개면 브랜치/커밋 분석해 한국어 제목.

```bash
gh pr create \
  --repo NAMSAN-MT/Namsan \
  --base develop \
  --head "eelephants:${BRANCH}" \
  --title "<한국어 제목>" \
  --body "$(cat <<'EOF'
## Summary

<변경 1-3줄 요약>

## Changes

<develop 이후 커밋별 bullet>

## Test plan

- [ ] `pnpm typecheck && pnpm build` 통과
- [ ] <코드 변경 기반 검증 항목>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

### A5. 머지 (= preview 배포)

```bash
gh pr merge "<PR번호 또는 URL>" --repo NAMSAN-MT/Namsan --merge
```

머지되면 `upstream/develop` push로 preview 워크플로가 돈다. PR URL과 "preview 배포 트리거됨" 안내.

---

## Mode B — `/deploy live` (live: develop → master)

> ⚠️ 운영(live) 반영. **B4 머지 직전 사용자 확인 필수.**

### B1. 사전 검증

```bash
git fetch upstream master develop 2>/dev/null
git log --oneline upstream/master..upstream/develop
```

- `upstream/master..upstream/develop` 커밋 0개면 → 에러(develop에 배포할 신규 커밋 없음).
- 이 모드는 develop·master 모두 upstream 브랜치라 **push 불필요**(Mode A에서 develop은 이미 갱신됨).

### B2. 기존 PR 확인

```bash
gh pr list --repo NAMSAN-MT/Namsan --head develop --base master \
  --state open --json number,url
```

열린 PR 있으면 재사용.

### B3. PR 생성 (same-repo, develop → master)

develop·master 모두 `NAMSAN-MT/Namsan` 브랜치이므로 head에 포크 프리픽스 없음.

```bash
gh pr create \
  --repo NAMSAN-MT/Namsan \
  --base master \
  --head develop \
  --title "<한국어 릴리스 제목>" \
  --body "$(cat <<'EOF'
## Summary

develop → master 릴리스. <핵심 1-3줄>

## Changes

<master 이후 develop 커밋 주요 항목 bullet>

## Test plan

- [ ] preview에서 동작 확인 완료
- [ ] <릴리스 검증 항목>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

### B4. 사용자 확인 → 머지 (= live 배포)

PR URL과 변경 요약을 보여주고 **"live 배포를 진행할까요?"** 확인을 받는다. 승인 시:

```bash
gh pr merge "<PR번호 또는 URL>" --repo NAMSAN-MT/Namsan --merge
```

머지되면 `upstream/master` push로 live 워크플로가 돈다. PR URL과 "live 배포 트리거됨" 안내.

---

## Notes

- 본문은 반드시 HEREDOC.
- `--head eelephants:<branch>` 누락(Mode A) 시 "Head ref must be a branch" 실패.
- `gh pr merge`가 권한/충돌로 실패하면: 활성 계정의 NAMSAN-MT 머지 권한 확인, 충돌 시 base 최신화 후 재시도. (`--admin`은 브랜치 보호 우회이므로 함부로 쓰지 말 것.)
- PR엔 체크가 안 붙는 게 정상(워크플로가 push 트리거). 머지 후 base push로 CI 배포가 돈다.
- 단순 PR 생성만 필요하면 `/create-pr`를 쓸 것. 이 스킬은 머지(배포)까지 가는 경우 전용.
