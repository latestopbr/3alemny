# Decisions

One line per decision Mohammad made, dated.

| Date | Decision | Made by |
|---|---|---|
| 2026-09-07 | Scaffold commit lands on `chore/scaffold` and is pushed to the remote, rather than kept local-only — this session runs in an ephemeral container and an unpushed commit is lost. No PR, no merge, `main` untouched | Mohammad |
| 2026-09-07 | `main` created by the agent as a one-time bootstrap (`git push origin chore/scaffold:main`), because the empty repo left `main` nonexistent. Exception is spent and recorded in CLAUDE.md rule 2; agents never push to `main` or merge again | Mohammad |
| 2026-09-07 | No `AGENTS.md`. `CLAUDE.md` is the single source of rules — a second root instruction file would drift from it. Framework guidance lives in the "Framework notes" section of `CLAUDE.md` instead | Mohammad |
| 2026-09-07 | `.gitignore` is the agent's to own and maintain, not copied verbatim from Mohammad. First act: added `*.tsbuildinfo` and `.vercel`, ignored and untracked `next-env.d.ts` | Mohammad |
