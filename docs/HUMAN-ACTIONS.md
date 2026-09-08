# Human Actions

Things only Mohammad can do. Every `STOP — NEEDS MOHAMMAD` block gets appended here with the date and whether it's done.

| Date | What Mohammad must do | Why | Status |
|---|---|---|---|
| 2026-09-07 | Create the `main` branch | The repo was empty at first push, so GitHub made `chore/scaffold` the default and `main` never existed | **Done** — Mohammad authorized a one-time exception to rule 2; agent ran `git push origin chore/scaffold:main`. `main` is at `76d4f4c`. Exception spent |
| 2026-09-07 | Set the repo's default branch to `main` at https://github.com/latestopbr/3alemny/settings | Still `chore/scaffold`. Changing it is a repo setting no agent has a tool for. Until it changes, PRs default to the wrong base and Netlify's "pull requests against your production branch" watches the wrong branch | Open |
| 2026-09-07 | Connect the `latestopbr/3alemny` GitHub repo to Netlify, then set production branch to `main`, deploy previews on for pull requests, and auto-publish for `main` only | Netlify site creation requires a browser login and OAuth grant no agent has. Without it there are no deploy-preview URLs, and the definition of done in CLAUDE.md means no PR can be called done | Open |
| 2026-09-07 | Choose the 8th core term. Seven are fixed: tokens, APIs, agents, MCP, n8n, Claude, Grok | `CLAUDE.md` v1 scope says "+ one more (ask Mohammad)". Curriculum cannot build the prerequisite graph with a hole in it | Open |
