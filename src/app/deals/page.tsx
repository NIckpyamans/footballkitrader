import { Shell } from "@/components/Shell";
import { ProductCard } from "@/components/ProductCard";
import { products, sellers } from "@/data/mock";
import { bestOffer, bestValueScore } from "@/lib/scoring";

export const metadata = { title: "Best Deals" };

export default function DealsPage() {
  const ranked = [...products].sort((a, b) => bestValueScore(b, bestOffer(b, sellers), sellers.find((seller) => seller.id === bestOffer(b, sellers).sellerId)) - bestValueScore(a, bestOffer(a, sellers), sellers.find((seller) => seller.id === bestOffer(a, sellers).sellerId)));
  return <Listing title="Best deals" subtitle="Ranked by total price, AI quality, seller trust and shipping speed." products={ranked} />;
}

function Listing({ title, subtitle, products: items }: { title: string; subtitle: string; products: typeof products }) {
  return <Shell><section className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><h1 className="text-4xl font-black">{title}</h1><p className="mt-3 text-steel">{subtitle}</p><div className="mt-8 grid gap-5 md:grid-cols-3">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div></section></Shell>;
}
