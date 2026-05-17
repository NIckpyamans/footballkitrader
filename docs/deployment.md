# FootballKitRadar Deployment and Environment

## Required Environment Variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only inserts for click tracking and admin routes |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap, robots, OpenGraph and structured data |
| `ALIEXPRESS_APP_KEY`, `ALIEXPRESS_APP_SECRET` | AliExpress affiliate integration |
| `DHGATE_APP_KEY`, `DHGATE_APP_SECRET` | DHGate affiliate integration |
| `AMAZON_ASSOCIATE_TAG` | Optional Amazon affiliate tag |
| `OPENAI_API_KEY` | Future AI matching, summaries and prediction jobs |

## Vercel

1. Import the GitHub repository into Vercel.
2. Use the standalone `footballkitrader` repository.
3. Add all environment variables in Production, Preview and Development.
4. Deploy. The included `vercel.json` uses the Next.js framework preset.

## Supabase

Run `supabase/schema.sql`, then create a Storage bucket called `product-images`. Use Supabase Auth for account creation, favorites and alerts.

## Scheduled Jobs

Add a Vercel Cron endpoint later for marketplace refreshes:

- Pull marketplace offers.
- Normalize sellers and products.
- Match duplicate shirts by title, tags and image embeddings.
- Store offer snapshots in `price_history`.
- Trigger alerts and Expo push notifications.

## Monitoring

Enable Vercel Web Analytics and Speed Insights before production traffic. Track:

- Core Web Vitals
- API error rates
- affiliate redirect latency
- search latency
- conversion event ingestion

## Internationalization

Runtime language selection is handled by `src/lib/i18n.ts` and `LocaleControls`. For production editorial content, move translation values into the `translations` table and hydrate dictionaries at build time or through an edge-cached API.

## Currency

The app ships with EUR-based mock prices and client-side conversion for EUR, USD, GBP, AED, TRY and PLN. Replace `currencyRates` with a scheduled exchange-rate provider before launch.
