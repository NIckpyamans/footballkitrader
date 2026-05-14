create extension if not exists "uuid-ossp";

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  country text,
  preferred_size text,
  favorite_clubs text[] default '{}',
  push_token text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

create table public.marketplaces (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  base_url text not null,
  affiliate_program text,
  commission_rate numeric(5,2),
  is_active boolean default true,
  status text default 'pending_review' check (status in ('active', 'pending_review', 'blocked')),
  ai_trust_score int default 50 check (ai_trust_score between 0 and 100),
  quality_score int default 50 check (quality_score between 0 and 100),
  shipping_score int default 50 check (shipping_score between 0 and 100),
  community_score int default 50 check (community_score between 0 and 100),
  scam_risk int default 0 check (scam_risk between 0 and 100),
  activation_requires_approval boolean default true,
  created_at timestamptz default now()
);

create table public.sellers (
  id uuid primary key default uuid_generate_v4(),
  marketplace_id uuid references public.marketplaces(id) on delete cascade,
  external_id text,
  name text not null,
  rating numeric(3,2) default 0,
  trust_score int default 50 check (trust_score between 0 and 100),
  ai_trust_score int default 50 check (ai_trust_score between 0 and 100),
  orders_count int default 0,
  refund_rate numeric(5,2) default 0,
  avg_delivery_days int,
  created_at timestamptz default now()
);

create table public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  club text,
  player text,
  season text,
  version text check (version in ('Fan', 'Player', 'Retro', 'Training', 'Mystery', 'Kids')),
  category text,
  image_url text,
  image_urls text[] default '{}',
  colors text[] default '{}',
  sizes text[] default '{}',
  tags text[] default '{}',
  quality_score int default 50 check (quality_score between 0 and 100),
  ai_quality_score int default 50 check (ai_quality_score between 0 and 100),
  ai_deal_score int default 50 check (ai_deal_score between 0 and 100),
  fake_review_risk int default 0 check (fake_review_risk between 0 and 100),
  review_summary text,
  moderation_status text default 'pending' check (moderation_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.offers (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  seller_id uuid references public.sellers(id) on delete cascade,
  marketplace_id uuid references public.marketplaces(id) on delete cascade,
  external_url text not null,
  affiliate_url text,
  thumbnail_url text,
  image_urls text[] default '{}',
  price numeric(10,2) not null,
  currency text default 'EUR',
  shipping_price numeric(10,2) default 0,
  delivery_days int,
  rating numeric(3,2),
  review_count int default 0,
  stock int default 0,
  last_seen_at timestamptz default now(),
  created_at timestamptz default now()
);

create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  seller_id uuid references public.sellers(id) on delete set null,
  marketplace_id uuid references public.marketplaces(id) on delete set null,
  external_id text,
  rating numeric(3,2),
  body text,
  language text,
  fake_probability int default 0 check (fake_probability between 0 and 100),
  created_at timestamptz default now()
);

create table public.price_history (
  id uuid primary key default uuid_generate_v4(),
  offer_id uuid references public.offers(id) on delete cascade,
  price numeric(10,2) not null,
  shipping_price numeric(10,2) default 0,
  captured_at timestamptz default now()
);

create table public.favorites (
  user_id uuid references public.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, product_id)
);

create table public.alerts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  target_price numeric(10,2) not null,
  size text,
  marketplace text,
  is_active boolean default true,
  last_triggered_at timestamptz,
  created_at timestamptz default now()
);

create table public.affiliate_clicks (
  id uuid primary key,
  user_id uuid references public.users(id) on delete set null,
  product_id text,
  offer_id text,
  marketplace text,
  seller_id text,
  outbound_url text,
  user_agent text,
  converted_at timestamptz,
  commission_amount numeric(10,2),
  conversion_value numeric(10,2),
  conversion_reference text,
  created_at timestamptz default now()
);

create table public.product_matches (
  id uuid primary key default uuid_generate_v4(),
  canonical_product_id uuid references public.products(id) on delete cascade,
  matched_product_id uuid references public.products(id) on delete cascade,
  confidence int not null check (confidence between 0 and 100),
  match_method text default 'ai_image_title',
  created_at timestamptz default now()
);

create table public.marketplace_discovery_runs (
  id uuid primary key default uuid_generate_v4(),
  source_url text not null,
  source_name text,
  status text default 'analysis_only' check (status in ('analysis_only', 'approved', 'rejected', 'blocked')),
  ai_trust_score int default 50 check (ai_trust_score between 0 and 100),
  scam_risk int default 0 check (scam_risk between 0 and 100),
  findings jsonb default '{}'::jsonb,
  activation_requested_at timestamptz,
  activation_approved_by uuid references public.users(id) on delete set null,
  created_at timestamptz default now()
);

create table public.ai_seller_signals (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid references public.sellers(id) on delete cascade,
  signal_type text not null,
  severity text default 'low' check (severity in ('low', 'medium', 'high')),
  score int check (score between 0 and 100),
  explanation text,
  created_at timestamptz default now()
);

create table public.translations (
  id uuid primary key default uuid_generate_v4(),
  locale text not null,
  namespace text not null,
  key text not null,
  value text not null,
  updated_at timestamptz default now(),
  unique(locale, namespace, key)
);

create table public.rate_limits (
  id uuid primary key default uuid_generate_v4(),
  route text not null,
  identity_hash text not null,
  hits int default 1,
  window_starts_at timestamptz default now(),
  unique(route, identity_hash, window_starts_at)
);

alter table public.users enable row level security;
alter table public.favorites enable row level security;
alter table public.alerts enable row level security;
alter table public.marketplaces enable row level security;
alter table public.sellers enable row level security;
alter table public.products enable row level security;
alter table public.offers enable row level security;
alter table public.reviews enable row level security;
alter table public.price_history enable row level security;
alter table public.affiliate_clicks enable row level security;
alter table public.product_matches enable row level security;
alter table public.marketplace_discovery_runs enable row level security;
alter table public.ai_seller_signals enable row level security;
alter table public.translations enable row level security;
alter table public.rate_limits enable row level security;

create policy "Public can read approved marketplace data" on public.products for select using (moderation_status = 'approved');
create policy "Public can read sellers" on public.sellers for select using (true);
create policy "Public can read offers" on public.offers for select using (true);
create policy "Public can read marketplaces" on public.marketplaces for select using (is_active = true);
create policy "Public can read reviews" on public.reviews for select using (true);
create policy "Public can read price history" on public.price_history for select using (true);
create policy "Public can read product matches" on public.product_matches for select using (true);
create policy "Public can read discovery summaries" on public.marketplace_discovery_runs for select using (status in ('analysis_only', 'approved'));
create policy "Public can read seller signals" on public.ai_seller_signals for select using (true);
create policy "Public can read translations" on public.translations for select using (true);

create policy "Users manage own profile" on public.users for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users manage favorites" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage alerts" on public.alerts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index products_search_idx on public.products using gin (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(club,'') || ' ' || coalesce(player,'') || ' ' || coalesce(season,'')));
create index products_tags_idx on public.products using gin (tags);
create index offers_product_idx on public.offers(product_id);
create index affiliate_clicks_created_idx on public.affiliate_clicks(created_at desc);
