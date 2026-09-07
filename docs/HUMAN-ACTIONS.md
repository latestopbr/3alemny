# Human Actions

Things only Mohammad can do. Every `STOP — NEEDS MOHAMMAD` block gets appended here with the date and whether it's done.

| Date | What Mohammad must do | Why | Status |
|---|---|---|---|
| 2026-09-07 | Create the `main` branch from `chore/scaffold` and set it as the repo's default branch | The repo was empty at first push, so GitHub made `chore/scaffold` the default. `main` does not exist. Rule 2 of CLAUDE.md forbids agents from pushing to `main`, so only Mohammad can create it. Everything downstream — `feat/*` PRs, the Netlify production branch — is blocked until it exists | Open |
| 2026-09-07 | Connect the `latestopbr/3alemny` GitHub repo to Netlify, then set production branch to `main`, deploy previews on for pull requests, and auto-publish for `main` only | Netlify site creation requires a browser login and OAuth grant no agent has. Without it there are no deploy-preview URLs, and the definition of done in CLAUDE.md means no PR can be called done | Open |
| 2026-09-07 | Choose the 8th core term. Seven are fixed: tokens, APIs, agents, MCP, n8n, Claude, Grok | `CLAUDE.md` v1 scope says "+ one more (ask Mohammad)". Curriculum cannot build the prerequisite graph with a hole in it | Open |
