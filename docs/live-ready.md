# WK26 Live Readiness

## GitHub and Vercel

1. Push the repository to GitHub.
2. In Vercel, import the repository and set the root directory to `KitRadar`.
3. Enable automatic deployments for `main` and preview deployments for pull requests.
4. Add all variables from `.env.example`.
5. Keep the included GitHub Actions workflow enabled so every PR runs `typecheck` and `build`.

Important approval gates:

- Do not push GitHub changes until the owner approves.
- Do not trigger a production Vercel deployment until the owner approves.
- Do not activate new marketplace sources until the owner approves them in admin.

## SEO Launch Checklist

- Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- Submit `/sitemap.xml` in Google Search Console.
- Keep WK26 pages indexed: `goedkope-wk26-shirts`, `wk26-voetbalshirts`, `retro-wk-shirts`, `player-version-wk-shirts`.
- Use product JSON-LD on every product page and collection JSON-LD on SEO pages.

## Performance

- Next Image is used for optimized lazy loading and CDN delivery.
- Product imports must store multiple image URLs and a fallback image.
- Keep hero media compressed and served from a CDN-backed host.
- Monitor Core Web Vitals in Vercel Analytics.

## Security

- `src/middleware.ts` adds baseline security headers.
- Search and click routes include a rate-limit scaffold.
- Affiliate redirects are checked against an allowlist.
- Admin mutations should require Supabase Auth with `role = admin` before going live.

## AI Marketplace Discovery

The discovery engine is intentionally `analysis_only` by default. Candidate sources such as `ucljersey.com`, `2027jersey.com`, `vip-kiki004-shop.top` and `namejersey.com` are monitored as pending review sources with AI trust scores and scam-risk indicators. They must not be used for live redirects, scraping jobs, or affiliate activation without explicit approval.
