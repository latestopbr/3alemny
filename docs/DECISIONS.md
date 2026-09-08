# Decisions

One line per decision Mohammad made, dated.

| Date | Decision | Made by |
|---|---|---|
| 2026-09-07 | Scaffold commit lands on `chore/scaffold` and is pushed to the remote, rather than kept local-only — this session runs in an ephemeral container and an unpushed commit is lost. No PR, no merge, `main` untouched | Mohammad |
| 2026-09-07 | `main` created by the agent as a one-time bootstrap (`git push origin chore/scaffold:main`), because the empty repo left `main` nonexistent. Exception is spent and recorded in CLAUDE.md rule 2; agents never push to `main` or merge again | Mohammad |
| 2026-09-07 | No `AGENTS.md`. `CLAUDE.md` is the single source of rules — a second root instruction file would drift from it. Framework guidance lives in the "Framework notes" section of `CLAUDE.md` instead | Mohammad |
| 2026-09-07 | `.gitignore` is the agent's to own and maintain, not copied verbatim from Mohammad. First act: added `*.tsbuildinfo` and `.vercel`, ignored and untracked `next-env.d.ts` | Mohammad |
| 2026-09-07 | 8th core term is `context window`, completing the core track: tokens, APIs, agents, MCP, n8n, Claude, Grok, context window | Mohammad |
| 2026-09-07 | Netlify's publish directory stays as Netlify auto-filled it (`.next`), not empty as the agent advised. Netlify detected Next.js and pre-filled it; Mohammad kept it and the deploy succeeded. `netlify.toml` keeps no `publish` key, so the runtime and the UI value agree | Mohammad |
| 2026-09-07 | Dark theme only for v1; light deferred to v2. Tokens in `app/globals.css` get semantic role names so light slots in later without renaming | Mohammad |
| 2026-09-07 | Visual direction is brutalist / terminal: near-black ground, one acid accent, monospace-led type, hard corners, visible borders, no shadows. Decided outright — `head-of-design` specifies it rather than proposing alternatives | Mohammad |
