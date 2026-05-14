import { Heart } from "lucide-react";
import { Shell } from "@/components/Shell";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/mock";

export const metadata = { title: "Favorites" };

export default function FavoritesPage() {
  return <Shell><section className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><h1 className="text-4xl font-black">Favorites</h1><p className="mt-3 flex items-center gap-2 text-steel"><Heart size={18} /> Saved products sync through Supabase Auth.</p><div className="mt-8 grid gap-5 md:grid-cols-3">{products.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} />)}</div></section></Shell>;
}
