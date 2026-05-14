# Supabase Configuration

Run `supabase/schema.sql` in the Supabase SQL editor.

Core tables:

- `products`, `offers`, `sellers`, `marketplaces`
- `affiliate_clicks`, `price_history`, `product_matches`
- `marketplace_discovery_runs`, `ai_seller_signals`
- `favorites`, `alerts`, `users`

Security model:

- Public reads are allowed only for approved marketplace/product data.
- User-owned records use Supabase Auth RLS.
- Admin write routes should verify `users.role = admin`.
- Marketplace discovery activation requires an approval record before becoming active.
