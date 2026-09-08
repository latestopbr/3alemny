# Costs

The project runs at exactly zero dollars. Every service and every licensed asset the project touches is
listed here. Nothing is added to this file without a `head-of-finance` pass and Mohammad's approval.

**No payment method is on file anywhere.** That is the single most important control we have: a free tier
with no card cannot silently become a bill. Do not add a card to any service, for any reason, including to
"verify" an account or unlock a trial. A free trial is not free — it is a bill with a delay.

---

## Accounts

| Service | Plan | What the free tier actually allows | What happens at the limit |
|---|---|---|---|
| GitHub | Free | Unlimited public and private repos. Actions: unlimited minutes on public repos, 2,000 minutes/month on private | Actions minutes stop until the next cycle; the repo, PRs, and reviews keep working. **No CI workflow is configured**, so nothing is being consumed today |
| Netlify | Free | 100 GB bandwidth/month, **300 build minutes/month**, 1 concurrent build, deploy previews included, 125,000 serverless function invocations/month and 100 hours function runtime (Next.js SSR routes run as functions) | Builds stop or queue until the next cycle; bandwidth overage can throttle or suspend the site. Netlify does not auto-charge a Free plan with no card — it blocks instead of billing. Blocked builds mean **no deploy-preview URL, which means no PR can meet the definition of done** |

### Netlify site

| Field | Value |
|---|---|
| Live URL | https://3alemnyai.netlify.app |
| Site ID | `d4c798ee-0dcd-4f28-954a-c372cfa3539f` |
| Production branch | `main` |
| Deploy previews | **On, for every pull request against `main`** |
| Auto-publish | `main` only |
| Repo | `latestopbr/3alemny` |
| Connected | 2026-09-07 |

---

## The build-minutes risk, concretely

This is the only free-tier limit the team can burn through by accident, and preview builds are the way it
happens.

**Every commit pushed to an open PR triggers a new preview build.** Not every PR — every *commit*. Preview
builds and production builds draw from the same 300 minutes/month. Amending and force-pushing a branch
triggers a build too.

A Next.js 16 build here includes `npm install` plus `next build`. Estimate **~2 minutes per build** until we
have a measured number — replace this figure with the real duration from the first preview build in the
Netlify deploy log, and re-derive the rows below.

| Behaviour | Builds/month | Minutes | Share of 300 |
|---|---|---|---|
| One clean commit per PR, ~8 PRs/month | 8 | ~16 | ~5% |
| 6 review-fix commits per PR, 8 PRs/month | 48 | ~96 | ~32% |
| 15 "push and see if it works" commits per PR, 8 PRs/month | 120 | ~240 | **~80%** |

The ceiling is roughly **150 builds/month**. That is about 5 a day. It is not a lot.

Rules that keep us under it:

- Run `npm run build` and `npm run lint` **locally** before pushing. Netlify is not a compiler you rent.
- Squash local work-in-progress commits before pushing to an open PR.
- Do not push a commit whose only purpose is to trigger a build.
- Close or mark draft any stale PR — an open PR is a standing invitation to spend minutes.
- If a preview build fails, read the log and fix it locally. Do not push a guess.

**Watch item:** SSR routes and the Next.js runtime on Netlify consume serverless function invocations
(125,000/month free). v1 keeps progress in `localStorage` with no backend, so pages should be static or
statically rendered. If a route goes dynamic, it starts drawing on that budget — flag it in review.

---

## Licensed assets

Tracked here because a font licence is a bill that hides inside a design doc.

| Asset | Source | Licence | Cost | Delivery |
|---|---|---|---|---|
| JetBrains Mono | Google Fonts, via `next/font/google` | SIL Open Font License 1.1 | $0, commercial and web use permitted | **Self-hosted at build time** by `next/font/google`. No runtime request, no font CDN, no `@import url(...)`, no purchased binary |
| Archivo Black | Google Fonts, via `next/font/google` | SIL Open Font License 1.1 | $0, commercial and web use permitted | Same — self-hosted at build time |

Both families are confirmed present in the Google Fonts catalogue bundled with the installed Next.js
(`node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`). `next/font/google` only resolves
families from that catalogue, and every family in it is open-source licensed. **A font that cannot be
imported from `next/font/google` is a font we cannot afford** until Finance says otherwise.

Images and icons: none licensed, none purchased. `public/og.png` and `public/icon.svg` are drawn by us.
Icons are ASCII or basic Unicode glyphs already in the mono face — no icon library, free or otherwise.
Optional texture assets are **text prompts** Mohammad may run in a tool he already has; the output is saved
to `public/` as a local file. No image service is added to the project to produce them.

---

## Not used, and not to be added without a Finance pass

No database. No auth provider. No analytics or telemetry vendor. No error-tracking service. No paid API.
No email provider. No CMS. No payments. No image, video, or font CDN. No stock photography. No paid icon
set. No animation library. No remote image pattern in `next.config.ts`. No free trials.

**Figma — watch item.** A Figma MCP server is available in the agent environment, but the repo has zero
Figma dependency: the design system is plain Markdown in `docs/DESIGN.md`. Figma's free Starter plan caps
files, and Dev Mode / MCP access generally requires a paid seat. Do not move the design system into Figma,
and do not make any build or content step depend on a Figma file, without a Finance pass first.

---

## Open cost questions

| Date | Question | Status |
|---|---|---|
| 2026-09-07 | `https://3alemnyai.netlify.app` returns **HTTP 401** and redirects to Netlify's `app.netlify.com/edge-access` login gate, so the production URL is not publicly reachable. Some site access control is enabled. Netlify's password protection and SSO site protection are **paid (Pro) features**; a team-members-only visibility setting is free. Needs Mohammad to confirm which, since a paid feature or an active trial would break the zero-dollar rule — and any gate that also covers deploy previews makes preview URLs unusable as receipts | **Open — needs Mohammad** |

---

*Last audited 2026-09-07 by `head-of-finance`, on branch `feat/design-system`.*
