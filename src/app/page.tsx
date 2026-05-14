import Link from "next/link";
import { ArrowRight, BadgeEuro, Flame, Gauge, Globe2, ShieldCheck, Sparkles, Timer, Trophy, Truck } from "lucide-react";
import { Shell } from "@/components/Shell";
import { SearchPanel } from "@/components/SearchPanel";
import { ProductCard } from "@/components/ProductCard";
import { Price } from "@/components/Price";
import { T } from "@/components/T";
import { MarketplaceLogos } from "@/components/MarketplaceLogos";
import { WkCountdown } from "@/components/WkCountdown";
import { categories, popularClubs, popularNationalTeams, popularPlayers, products, sellers } from "@/data/mock";
import { bestOffer, totalPrice } from "@/lib/scoring";

export default function HomePage() {
  const wkProducts = products.filter((product) => product.tags.includes("wk26"));
  const bestToday = wkProducts[0] ?? products[0];
  const bestTodayOffer = bestOffer(bestToday, sellers);
  const trending = [...wkProducts, ...products].slice(0, 3);
  const retro = products.filter((product) => product.tags.includes("retro") || product.tags.includes("world cup 2026")).slice(0, 3);
  const aiRecommended = [...products].sort((a, b) => b.aiDealScore - a.aiDealScore).slice(0, 3);

  return (
    <Shell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="mb-5 w-fit rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-champagne">WK26 live marketplace radar</p>
          <h1 className="gold-text max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">WK26 shirts, national team kits and football deals in one premium radar.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel"><T k="heroCopy" /> Built for World Cup 2026 traffic, affiliate tracking and AI-powered product matching.</p>
          <div className="mt-8"><SearchPanel /></div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["WK26 shirts", "National teams", "Retro WK", "Player version", "Fan version", "Cheap deals"].map((market) => <Link href={`/search?q=${encodeURIComponent(market)}`} key={market} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-steel transition hover:border-gold/40 hover:text-white">{market}</Link>)}
          </div>
        </div>
        <div className="glass relative min-h-[590px] overflow-hidden rounded-[36px] p-6">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="ml-auto w-fit rounded-full border border-gold/30 bg-ink/70 px-4 py-2 text-sm text-champagne backdrop-blur"><T k="bestToday" />: <Price amount={totalPrice(bestTodayOffer)} /></div>
            <div className="space-y-5">
              <div>
                <p className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold"><Trophy size={17} /> countdown to WK26</p>
                <div className="mt-4"><WkCountdown /></div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-mint">live deal banner</p>
                <h2 className="mt-2 text-4xl font-black">{bestToday.title}</h2>
                <p className="mt-2 text-steel">{bestToday.reviewSummary}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <HeroStat icon={<BadgeEuro />} label="Cheapest" value={<Price amount={totalPrice(bestTodayOffer)} />} />
                <HeroStat icon={<Gauge />} label="AI deal" value={`${bestToday.aiDealScore}/100`} />
                <HeroStat icon={<Truck />} label="Delivery" value={`${bestTodayOffer.deliveryDays} days`} />
                <HeroStat icon={<Sparkles />} label="Best seller" value={bestTodayOffer.sellerName} />
              </div>
              <Link href="/deals" className="flex items-center justify-center gap-2 rounded-full bg-champagne px-6 py-4 font-bold text-ink">Browse WK26 deals <ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      <MarketplaceLogos />
      <HomeStrip title="Trending national team shirts" icon={<Flame />} products={trending} />
      <HomeStrip title="Retro WK shirts" icon={<Globe2 />} products={retro} />
      <HomeStrip title="AI recommended WK deals" icon={<ShieldCheck />} products={aiRecommended} />

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-16 sm:px-6 lg:grid-cols-4">
        <TagPanel title="Categories" items={categories} />
        <TagPanel title="Popular clubs" items={popularClubs} />
        <TagPanel title="National teams" items={popularNationalTeams} />
        <TagPanel title="Popular players" items={popularPlayers} />
      </section>
    </Shell>
  );
}

function HomeStrip({ title, icon, products: items }: { title: string; icon: React.ReactNode; products: typeof products }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold">{icon} WK26 radar</p>
          <h2 className="mt-2 text-3xl font-bold">{title}</h2>
        </div>
        <Link href="/search?q=wk26" className="hidden text-sm text-steel hover:text-white sm:block">View all</Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  );
}

function TagPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass rounded-[28px] p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">{items.map((item) => <Link key={item} href={`/search?q=${encodeURIComponent(item)}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-steel hover:border-gold/40 hover:text-white">{item}</Link>)}</div>
    </div>
  );
}

function HeroStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-ink/65 p-4 backdrop-blur">
      <div className="mb-4 text-gold">{icon}</div>
      <p className="text-xs text-steel">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
