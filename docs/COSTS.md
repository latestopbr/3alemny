# Costs

The project runs at exactly zero dollars. Every service the project touches is listed here.

| Service | Plan | Free-tier limit | What happens at limit |
|---|---|---|---|
| GitHub | Free | Unlimited public and private repos; 2,000 Actions minutes/month on private repos, unlimited on public | Actions minutes stop; repo and PRs keep working. No CI is configured yet, so nothing is being consumed |
| Netlify | Free | 100 GB bandwidth/month, 300 build minutes/month, 1 concurrent build | Builds queue or stop and the site can be throttled. Careless pushes burn build minutes — each PR commit triggers a preview build |

Nothing else. No database, no auth provider, no analytics, no paid API, no font license, no image CDN. Adding any of these requires a `head-of-finance` pass and Mohammad's approval.
