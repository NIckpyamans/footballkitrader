import type { Metadata } from "next";
import { BrainCircuit, SlidersHorizontal, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SearchPanel } from "@/components/SearchPanel";
import { Shell } from "@/components/Shell";
import { searchMarketplaceOffers } from "@/lib/affiliate";

export const metadata: Metadata = { title: "Search Football Shirts" };

export default async function SearchPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const params = searchParams;
  const results = await searchMarketplaceOffers({ q: params.q, version: params.version, marketplace: params.marketplace, size: params.size, color: params.color, season: params.season, maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined });

  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-black tracking-tight">Search results</h1>
        <p className="mt-3 max-w-2xl text-steel">Smart search supports club, player, season, retro shirts, national teams, fan version and player version.</p>
        <div className="glass mt-6 rounded-[28px] p-5">
          <p className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold"><BrainCircuit size={16} /> AI search engine</p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <AiSignal title="Title matching" value="clubs, players, countries" />
            <AiSignal title="Image matching" value="logos, colors, trims" />
            <AiSignal title="Deal ranking" value="price, shipping, trust" />
            <AiSignal title="Risk checks" value="fake reviews, seller drift" />
          </div>
        </div>
        <div className="mt-6"><SearchPanel compact /></div>
        <form className="glass mt-5 grid gap-3 rounded-[28px] p-4 sm:grid-cols-4 lg:grid-cols-8">
          <input name="q" defaultValue={params.q} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm outline-none sm:col-span-2" placeholder="AI search suggestions" />
          <input name="maxPrice" defaultValue={params.maxPrice} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm outline-none" placeholder="Max price" />
          <input name="season" defaultValue={params.season} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm outline-none" placeholder="Season" />
          <select name="marketplace" defaultValue={params.marketplace ?? ""} className="rounded-2xl border border-white/10 bg-graphite px-3 py-3 text-sm outline-none"><option value="">Marketplace</option><option>AliExpress</option><option>DHGate</option><option>Temu</option><option>Amazon</option><option>Instagram Seller</option></select>
          <select name="size" defaultValue={params.size ?? ""} className="rounded-2xl border border-white/10 bg-graphite px-3 py-3 text-sm outline-none"><option value="">Size</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option></select>
          <input name="color" defaultValue={params.color} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm outline-none" placeholder="Color" />
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-volt px-4 py-3 text-sm font-bold text-ink"><SlidersHorizontal size={16} /> Filter</button>
        </form>
        <div className="mt-5 flex flex-wrap gap-2">
          {["WK26 Netherlands", "Brazil fan version", "Messi retro", "player version WK", "training suit", "mystery shirts"].map((suggestion) => <a key={suggestion} href={`/search?q=${encodeURIComponent(suggestion)}`} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-steel hover:text-white"><Sparkles size={14} className="text-volt" /> {suggestion}</a>)}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {results.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </Shell>
  );
}

function AiSignal({ title, value }: { title: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs text-steel">{value}</p></div>;
}
