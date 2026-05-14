import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bell, Camera, Crown, ExternalLink, Heart, Ruler, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { products, sellers } from "@/data/mock";
import { Shell } from "@/components/Shell";
import { PriceHistoryChart } from "@/components/PriceHistoryChart";
import { ProductCard } from "@/components/ProductCard";
import { Price } from "@/components/Price";
import { matchProducts } from "@/lib/ai-engine";
import { bestValueScore, totalPrice } from "@/lib/scoring";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  return {
    title: product?.title ?? "Product",
    description: product?.reviewSummary
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) notFound();
  const related = matchProducts(product, products).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    brand: product.club,
    description: product.reviewSummary,
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.offers[0]?.rating ?? 4.5, reviewCount: product.offers.reduce((sum, offer) => sum + offer.reviewCount, 0) },
    offers: product.offers.map((offer) => ({ "@type": "Offer", price: offer.price, priceCurrency: offer.currency, availability: offer.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: offer.affiliateUrl }))
  };

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="glass overflow-hidden rounded-[34px]">
            <div className="relative aspect-[4/5]"><Image src={product.images[0] || product.image} alt={product.title} fill className="object-cover" priority /></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.slice(0, 3).map((image) => (
              <div key={image} className="relative aspect-square overflow-hidden rounded-3xl border border-white/10">
                <Image src={image} alt={`${product.title} marketplace photo`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-mint">{product.club} · {product.season} · {product.category}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-bold text-champagne"><Crown size={16} /> beste deal</span>
            <span className="flex items-center gap-2 rounded-full border border-volt/30 bg-volt/10 px-4 py-2 text-sm font-bold text-volt"><Sparkles size={16} /> AI aanbevolen</span>
          </div>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">{product.title}</h1>
          <p className="mt-4 text-lg leading-8 text-steel">{product.reviewSummary}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Detail icon={<Star />} label="AI quality" value={`${product.qualityScore}/100`} />
            <Detail icon={<ShieldCheck />} label="Seller trust" value={`${product.aiTrustScore}/100`} />
            <Detail icon={<Camera />} label="Real photos" value={`${product.images.length}`} />
            <Detail icon={<Truck />} label="Fake risk" value={`${product.fakeReviewRisk}%`} />
          </div>
          <div className="mt-8 space-y-3">
            {product.offers.map((offer) => {
              const seller = sellers.find((item) => item.id === offer.sellerId);
              return (
                <div key={offer.id} className="glass flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">{offer.marketplace} · {offer.sellerName}</p>
                    <p className="text-sm text-steel">Trust {seller?.trustScore ?? 75}% · {offer.reviewCount.toLocaleString()} reviews · {offer.deliveryDays} day estimate · stock {offer.stock}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-steel">AI deal score {Math.max(bestValueScore(product, offer, seller), product.aiDealScore)}</p>
                      <p className="text-2xl font-black text-volt"><Price amount={totalPrice(offer)} /></p>
                    </div>
                    <Link href={`/api/track-click?offer=${offer.id}`} className="rounded-full bg-white px-4 py-3 text-sm font-bold text-ink"><ExternalLink size={16} /></Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-full border border-white/10 px-5 py-3 font-semibold"><Heart className="mr-2 inline" size={16} /> Favorite</button>
            <button className="rounded-full bg-volt px-5 py-3 font-bold text-ink"><Bell className="mr-2 inline" size={16} /> Create price alert</button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_.8fr]">
        <PriceHistoryChart product={product} />
        <div className="glass rounded-[28px] p-5">
          <Ruler className="text-volt" />
          <h2 className="mt-4 text-2xl font-bold">Size guide</h2>
          <div className="mt-5 grid grid-cols-5 gap-2 text-center text-sm">
            {product.sizes.map((size) => <span key={size} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">{size}</span>)}
          </div>
          <p className="mt-5 text-sm leading-6 text-steel">AI flags slim-fitting batches when review text mentions tight shoulders, short length or inconsistent labels.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="text-3xl font-bold">AI matched shirts</h2>
        <div className="mt-3 flex flex-wrap gap-2">{related.map((match) => <span key={match.product.id} className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-champagne">{match.confidence}% match · {match.method}</span>)}</div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">{related.map((match) => <ProductCard key={match.product.id} product={match.product} />)}</div>
      </section>
    </Shell>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"><div className="mb-4 text-volt">{icon}</div><p className="text-xs text-steel">{label}</p><p className="font-bold">{value}</p></div>;
}
