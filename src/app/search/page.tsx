import type { Metadata } from "next";
import { BrainCircuit, SlidersHorizontal, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SearchPanel } from "@/components/SearchPanel";
import { Shell } from "@/components/Shell";
import { searchMarketplaceOffers } from "@/lib/affiliate";

export const metadata: Metadata = { title: "Search Football Shirts" };

type SearchPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const rawParams = await searchParams;
  const params = {
    q: single(rawParams.q),
    version: single(rawParams.version),
    marketplace: single(rawParams.marketplace),
    size: single(rawParams.size),
    color: single(rawParams.color),
    season: single(rawParams.season),
    maxPrice: single(rawParams.maxPrice)
  };
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
        <div className="mt-6"><SearchPanel compact defaultQuery={params.q ?? ""} /></div>
        <form action="/search" className="glass mt-5 grid gap-3 rounded-[28px] p-4 sm:grid-cols-4 lg:grid-cols-8">
          <label className="sm:col-span-2">
            <span className="sr-only">Search shirts</span>
            <input name="q" defaultValue={params.q} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm outline-none" placeholder="AI search suggestions" />
          </label>
          <label>
            <span className="sr-only">Max price</span>
            <input name="maxPrice" defaultValue={params.maxPrice} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm outline-none" placeholder="Max price" />
          </label>
          <label>
            <span className="sr-only">Season</span>
            <input name="season" defaultValue={params.season} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm outline-none" placeholder="Season" />
          </label>
          <label>
            <span className="sr-only">Marketplace</span>
            <select name="marketplace" defaultValue={params.marketplace ?? ""} className="w-full rounded-2xl border border-white/10 bg-graphite px-3 py-3 text-sm outline-none"><option value="">Marketplace</option><option>AliExpress</option><option>DHGate</option><option>Temu</option><option>Amazon</option><option>Instagram Seller</option></select>
          </label>
          <label>
            <span className="sr-only">Size</span>
            <select name="size" defaultValue={params.size ?? ""} className="w-full rounded-2xl border border-white/10 bg-graphite px-3 py-3 text-sm outline-none"><option value="">Size</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option></select>
          </label>
          <label>
            <span className="sr-only">Color</span>
            <input name="color" defaultValue={params.color} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm outline-none" placeholder="Color" />
          </label>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-volt px-4 py-3 text-sm font-bold text-ink"><SlidersHorizontal size={16} /> Filter</button>
        </form>
        <div className="mt-5 flex flex-wrap gap-2">
          {["WK26 Netherlands", "Brazil fan version", "Messi retro", "player version WK", "training suit", "mystery shirts"].map((suggestion) => <a key={suggestion} href={`/search?q=${encodeURIComponent(suggestion)}`} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-steel hover:text-white"><Sparkles size={14} className="text-volt" /> {suggestion}</a>)}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {results.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        {results.length === 0 ? (
          <div className="glass mt-8 rounded-[28px] p-8 text-center">
            <h2 className="text-2xl font-bold">No matching shirts found</h2>
            <p className="mt-2 text-steel">Try a broader club, country, season or marketplace filter.</p>
          </div>
        ) : null}
      </section>
    </Shell>
  );
}

function AiSignal({ title, value }: { title: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs text-steel">{value}</p></div>;
}
