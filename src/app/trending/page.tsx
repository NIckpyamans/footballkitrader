import { ProductCard } from "@/components/ProductCard";
import { Shell } from "@/components/Shell";
import { products } from "@/data/mock";

export const metadata = { title: "Trending Shirts" };

export default function TrendingPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-black">Trending shirts</h1>
        <p className="mt-3 text-steel">Momentum picks from retro, national team and player-version searches.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </Shell>
  );
}
