# FootballKitRadar

Premium WK26 football shirt and international AI commerce marketplace for AliExpress, DHGate, Temu, Amazon, football webshops, retro marketplaces and public social sellers.

## Stack

- Next.js App Router web app
- React Native / Expo mobile entry
- TypeScript
- TailwindCSS / NativeWind-ready styling
- Supabase Auth, Database and Storage
- Affiliate, click tracking and future AI scoring routes
- WK26 SEO pages, product JSON-LD, sitemap and robots
- Rate-limit scaffold, security headers and affiliate redirect allowlist
- AI marketplace discovery engine with approval-gated source activation

## Quick Start

Web app:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Mobile shell:

```bash
cd apps/mobile
npm install
npm run start
```

The root package is intentionally web-only for Vercel. Expo, React Native and NativeWind live under `apps/mobile` so web deployment stays small and auditable.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create a public storage bucket named `product-images`.
4. Add the values from `.env.example` to `.env.local` and Vercel.

## Deployment

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Add the environment variables.
4. Deploy with the included `vercel.json`.

See `docs/live-ready.md` for the WK26 launch checklist.

## Approval Gates

The project is GitHub/Vercel/Supabase ready, but production actions are intentionally approval-gated:

- GitHub push: ask owner first.
- Vercel production deploy: ask owner first.
- New marketplace source activation: ask owner first.

## Production Notes

Marketplace APIs are wrapped behind `src/lib/affiliate.ts` and AI risk scoring lives in `src/lib/ai-engine.ts`. The current build ships with safe mock providers so the UI and tracking flows work immediately. Replace the mock fetchers with official AliExpress, DHGate, Temu or Amazon endpoints as credentials are approved.
