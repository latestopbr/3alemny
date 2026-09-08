# Human Actions

Things only Mohammad can do. Every `STOP — NEEDS MOHAMMAD` block gets appended here with the date and whether it's done.

| Date | What Mohammad must do | Why | Status |
|---|---|---|---|
| 2026-09-07 | Create the `main` branch | The repo was empty at first push, so GitHub made `chore/scaffold` the default and `main` never existed | **Done** — Mohammad authorized a one-time exception to rule 2; agent ran `git push origin chore/scaffold:main`. Exception spent |
| 2026-09-07 | Set the repo's default branch to `main` | PRs would otherwise default to the wrong base, and Netlify's "pull requests against your production branch" would watch the wrong branch | **Done** — remote `HEAD` now resolves to `refs/heads/main` |
| 2026-09-07 | Connect the repo to Netlify: production branch `main`, deploy previews on for pull requests, auto-publish for `main` only | Netlify site creation requires a browser login and OAuth grant no agent has. Without it there are no deploy-preview URLs, and the definition of done cannot be met | **Done** — site created at https://3alemnyai.netlify.app, production branch `main`, previews on for PRs. Mohammad confirms it serves the scaffold in his browser; anonymous requests return HTTP 401 behind Netlify's access gate, so see the row below |
| 2026-09-07 | Choose the 8th core term | `CLAUDE.md` v1 scope had a hole in it, and Curriculum cannot build the prerequisite graph around a hole | **Done** — `context window`. Recorded in `CLAUDE.md` v1 scope |
| 2026-09-07 | Open Netlify → site `3alemnyai` → Site configuration → Access & security, and report which access control is enabled | `https://3alemnyai.netlify.app` returns HTTP 401 and redirects to Netlify's `edge-access` login gate, confirmed independently by curl. Netlify's password protection and SSO site protection are paid Pro features; team-members-only visibility is free. If it is a paid feature or a trial, it breaks rule 1. If the same gate covers deploy previews, preview URLs stop working as receipts for anyone but Mohammad | Open |
