import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Camera, Crown, ExternalLink, Ruler, ShieldCheck, ShoppingBag, Sparkles, Star, Truck } from "lucide-react";
import { products, sellers } from "@/data/mock";
import { Shell } from "@/components/Shell";
import { PriceHistoryChart } from "@/components/PriceHistoryChart";
import { ProductCard } from "@/components/ProductCard";
import { Price } from "@/components/Price";
import { ProductActions } from "@/components/ProductActions";
import { analyzeImageSignals, analyzePriceHistory, detectSellerWarnings, matchProducts } from "@/lib/ai-engine";
import { primaryProductImage, safeProductImages } from "@/lib/images";
import { bestValueScore, totalPrice } from "@/lib/scoring";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type ProductPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return {
    title: product?.title ?? "Product",
    description: product?.reviewSummary
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const productImages = safeProductImages(product.images, product.slug);
  const related = matchProducts(product, products).slice(0, 3);
  const priceIntel = analyzePriceHistory(product);
  const imageIntel = analyzeImageSignals(product);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: productImages,
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
            <div className="relative aspect-[4/5]"><Image src={primaryProductImage(product.images, product.slug)} alt={product.title} fill className="object-cover" priority /></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {productImages.slice(0, 3).map((image) => (
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
            <Detail icon={<Camera />} label="Image match" value={`${imageIntel.imageSimilarity}/100`} />
            <Detail icon={<Truck />} label="Fake risk" value={`${product.fakeReviewRisk}%`} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <IntelPill label="Price trend" value={`${priceIntel.dropPercent}% drop`} />
            <IntelPill label="OCR confidence" value={`${imageIntel.ocrConfidence}/100`} />
            <IntelPill label="Logo confidence" value={`${imageIntel.logoConfidence}/100`} />
          </div>
          <div className="mt-8 space-y-3">
            {product.offers.map((offer) => {
              const seller = sellers.find((item) => item.id === offer.sellerId);
              const warnings = detectSellerWarnings(seller);
              return (
                <div key={offer.id} className="glass flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">{offer.marketplace} · {offer.sellerName}</p>
                    <p className="text-sm text-steel">Trust {seller?.trustScore ?? 75}% · {offer.reviewCount.toLocaleString()} reviews · {offer.deliveryDays} day estimate · stock {offer.stock}</p>
                    {warnings.length > 0 ? <p className="mt-2 flex items-center gap-2 text-xs text-red-200"><AlertTriangle size={14} /> {warnings[0]}</p> : null}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-steel">AI deal score {Math.max(bestValueScore(product, offer, seller), product.aiDealScore)}</p>
                      <p className="text-2xl font-black text-volt"><Price amount={totalPrice(offer)} /></p>
                    </div>
                    <Link href={`/api/track-click?offer=${offer.id}`} className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-ink transition hover:bg-volt">
                      <ShoppingBag size={16} /> View deal <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <ProductActions productId={product.id} productTitle={product.title} />
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

function IntelPill({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3"><p className="text-[10px] uppercase tracking-[0.18em] text-steel">{label}</p><p className="mt-1 font-bold text-champagne">{value}</p></div>;
}
