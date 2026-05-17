# Integration Plan

## Affiliate APIs

`src/lib/affiliate.ts` is the provider boundary. Keep marketplace-specific code behind this module:

- AliExpress Affiliate API: product search, promotion link generation and conversion reports.
- DHGate Affiliate: product feeds, seller metadata and commission reporting.
- Temu: product feed or approved partner links when available.
- Amazon: optional associate links for official merchandise.

Every outbound click must go through `/api/track-click?offer=...` so commissions, conversions and seller performance can be reconciled.

## Product Images

Never render products without imagery. Provider imports should store:

- marketplace thumbnail
- all gallery images
- seller/customer photo URLs when allowed by the source terms
- a generated or curated fallback image when marketplace images fail

The product card reads `product.images[0] || product.image`, so ingestion jobs must always populate at least one safe fallback image. Image scraping must respect robots.txt, marketplace terms and copyright restrictions.

## AI Features

The schema already supports:

- Fake review detection through `reviews.fake_probability`.
- Product quality prediction through `products.ai_quality_score`.
- Seller trust prediction through `sellers.ai_trust_score`.
- Same-shirt matching through tags, search vectors and future image embeddings.
- AI deal score through price, trust, shipping, refund and quality signals.

Recommended future jobs:

- Generate review summaries after each review import.
- Compare product images with an embedding model.
- Cluster duplicate shirts by club, player, season, version and visual similarity.
- Flag sellers with suspicious review velocity or refund patterns.

## Discovery Engine Approval Policy

FootballKitRadar can analyze public marketplace candidates for title patterns, price ranges, image similarity, seller signals and scam-risk markers. New sources stay disabled until manually approved:

1. Analyze source metadata.
2. Generate AI trust, quality, shipping, community and scam-risk scores.
3. Store findings in `marketplace_discovery_runs`.
4. Require explicit approval before adding active scraping, outbound links or affiliate redirects.

Current configured candidates include `ucljersey.com`, `2027jersey.com`, `vip-kiki004-shop.top`, `namejersey.com` and `worldcupzone.shop` for analysis only.

## Security

Recommended production controls:

- Rate limit `/api/search`, `/api/track-click` and admin routes with `rate_limits` or Vercel Firewall.
- Require Supabase Auth and `role = admin` for admin mutation routes.
- Hash IP/user-agent fingerprints before storage.
- Validate affiliate redirect destinations against an allowlist.
- Add bot protection on high-volume click tracking endpoints.

## Analytics

Use `affiliate_clicks`, `offers`, `price_history` and conversion imports to power:

- revenue dashboard
- marketplace conversion rate
- seller trust drift
- deal freshness
- alert performance
