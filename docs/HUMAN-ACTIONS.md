# Human Actions

Things only Mohammad can do. Every `STOP — NEEDS MOHAMMAD` block gets appended here with the date and whether it's done.

| Date | What Mohammad must do | Why | Status |
|---|---|---|---|
| 2026-09-07 | Create the `main` branch | The repo was empty at first push, so GitHub made `chore/scaffold` the default and `main` never existed | **Done** — Mohammad authorized a one-time exception to rule 2; agent ran `git push origin chore/scaffold:main`. Exception spent |
| 2026-09-07 | Set the repo's default branch to `main` | PRs would otherwise default to the wrong base, and Netlify's "pull requests against your production branch" would watch the wrong branch | **Done** — remote `HEAD` now resolves to `refs/heads/main` |
| 2026-09-07 | Connect the repo to Netlify: production branch `main`, deploy previews on for pull requests, auto-publish for `main` only | Netlify site creation requires a browser login and OAuth grant no agent has. Without it there are no deploy-preview URLs, and the definition of done cannot be met | **Done** — live at https://3alemnyai.netlify.app, serving the scaffold |
| 2026-09-07 | Choose the 8th core term | `CLAUDE.md` v1 scope had a hole in it, and Curriculum cannot build the prerequisite graph around a hole | **Done** — `context window`. Recorded in `CLAUDE.md` v1 scope |
