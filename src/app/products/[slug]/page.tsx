import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, BadgeCheck, Camera, Crown, ExternalLink, Globe2, MessageSquareQuote, Ruler, ShieldCheck, Shirt, ShoppingBag, Sparkles, Star, Truck, Zap } from "lucide-react";
import { products, sellers } from "@/data/mock";
import { Shell } from "@/components/Shell";
import { PriceHistoryChart } from "@/components/PriceHistoryChart";
import { ProductCard } from "@/components/ProductCard";
import { Price } from "@/components/Price";
import { ProductActions } from "@/components/ProductActions";
import { AIShirtAdvisor } from "@/components/AIShirtAdvisor";
import { analyzeImageSignals, analyzePriceHistory, detectSellerWarnings, matchProducts } from "@/lib/ai-engine";
import { primaryProductImage, safeProductImages } from "@/lib/images";
import { bestOffer, bestValueScore, totalPrice } from "@/lib/scoring";
import { bestSellerLabel, customerPhotoScore, photoChecklist, qualitySignals, reviewSnippets, sellerRiskInfo, stockStatus } from "@/lib/product-insights";

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
  const topOffer = bestOffer(product, sellers);
  const cheapestOffer = [...product.offers].sort((a, b) => totalPrice(a) - totalPrice(b))[0];
  const fastestOffer = [...product.offers].sort((a, b) => a.deliveryDays - b.deliveryDays)[0];
  const trustedOffer = [...product.offers].sort((a, b) => {
    const aSeller = sellers.find((seller) => seller.id === a.sellerId);
    const bSeller = sellers.find((seller) => seller.id === b.sellerId);
    return (bSeller?.trustScore ?? 0) - (aSeller?.trustScore ?? 0);
  })[0];
  const updatedAt = "12 minutes ago";
  const productQualitySignals = qualitySignals(product);
  const productReviewSnippets = reviewSnippets(product);
  const productPhotoChecklist = photoChecklist(product);

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
            {productPhotoChecklist.slice(0, 5).map((photo) => (
              <div key={photo.label} className="relative aspect-square overflow-hidden rounded-3xl border border-white/10">
                <Image src={photo.image} alt={`${product.title} ${photo.label}`} fill className="object-cover" />
                <span className="absolute bottom-2 left-2 rounded-full bg-ink/80 px-2 py-1 text-[10px] text-white backdrop-blur">{photo.label}</span>
              </div>
            ))}
          </div>
          <div className="glass rounded-[28px] p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-mint"><Camera size={16} /> {customerPhotoScore(product)} echte koperfoto's gevonden</p>
            <p className="mt-2 text-sm leading-6 text-steel">Feed-ready slots voor voorkant, achterkant, badge, kraag/label en materiaal. Gebruik alleen marketplace/API-foto's waarvoor je rechten of feed-toestemming hebt.</p>
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-mint">{product.club} - {product.season} - {product.category}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-bold text-champagne"><Crown size={16} /> beste deal</span>
            <span className="flex items-center gap-2 rounded-full border border-volt/30 bg-volt/10 px-4 py-2 text-sm font-bold text-volt"><Sparkles size={16} /> AI aanbevolen</span>
          </div>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">{product.title}</h1>
          <p className="mt-4 text-lg leading-8 text-steel">{product.reviewSummary}</p>
          <div className="sticky top-24 z-20 mt-5 rounded-[28px] border border-gold/30 bg-ink/90 p-4 shadow-glow backdrop-blur-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">Beste deal nu</p>
                <p className="text-2xl font-black text-volt"><Price amount={totalPrice(topOffer)} /></p>
                <p className="text-sm text-steel">{topOffer.marketplace} - {topOffer.sellerName} - {topOffer.deliveryDays} dagen</p>
              </div>
              <Link href={`/api/track-click?offer=${topOffer.id}`} className="flex items-center justify-center gap-2 rounded-full bg-volt px-5 py-3 text-sm font-black text-ink">
                Bekijk beste deal <ShoppingBag size={16} />
              </Link>
            </div>
          </div>
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
          <div className="glass mt-6 rounded-[28px] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold"><Crown size={16} /> Best choice table</p>
                <h2 className="mt-2 text-2xl font-bold">Fastest way to choose the right seller</h2>
              </div>
              <p className="rounded-full border border-mint/25 bg-mint/10 px-3 py-1 text-sm text-mint">Prices checked {updatedAt}</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <ChoiceCard icon={<Sparkles />} label="Best total deal" offer={topOffer} />
              <ChoiceCard icon={<Zap />} label="Cheapest" offer={cheapestOffer} />
              <ChoiceCard icon={<Truck />} label="Fastest delivery" offer={fastestOffer} />
              <ChoiceCard icon={<ShieldCheck />} label="Highest trust" offer={trustedOffer} />
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <div className="grid grid-cols-6 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.18em] text-steel">
                <span className="col-span-2">Aanbieder</span><span>Totaalprijs</span><span>Levertijd</span><span>Trust</span><span>Actie</span>
              </div>
              {product.offers.map((offer) => {
                const seller = sellers.find((item) => item.id === offer.sellerId);
                const risk = sellerRiskInfo(offer, seller);
                return (
                  <div key={`table-${offer.id}`} className="grid grid-cols-6 items-center gap-2 border-t border-white/10 px-4 py-4 text-sm">
                    <div className="col-span-2">
                      <p className="font-bold">{offer.marketplace}</p>
                      <p className="text-xs text-steel">{bestSellerLabel(product, offer, seller)} - {stockStatus(offer.stock)}</p>
                    </div>
                    <p className="font-black text-volt"><Price amount={totalPrice(offer)} /></p>
                    <p>{offer.deliveryDays}d</p>
                    <p>{seller?.trustScore ?? 75}%</p>
                    <Link href={`/api/track-click?offer=${offer.id}`} className="rounded-full bg-white px-3 py-2 text-center text-xs font-bold text-ink">Deal</Link>
                    <p className="col-span-6 text-xs text-steel">{risk.returns} - {risk.disputeRisk} - {risk.tracking}</p>
                  </div>
                );
              })}
            </div>
            {product.offers.map((offer) => {
              const seller = sellers.find((item) => item.id === offer.sellerId);
              const warnings = detectSellerWarnings(seller);
              const risk = sellerRiskInfo(offer, seller);
              return (
                <div key={offer.id} className="glass flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">{offer.marketplace} - {offer.sellerName}</p>
                    <p className="text-sm text-steel">Trust {seller?.trustScore ?? 75}% - {offer.reviewCount.toLocaleString()} reviews - {offer.deliveryDays} day estimate - stock {offer.stock}</p>
                    <p className="mt-2 text-xs text-steel">{risk.returns} - {risk.disputeRisk} - {risk.tracking}</p>
                    {risk.warning ? <p className="mt-2 flex items-center gap-2 text-xs text-red-200"><AlertTriangle size={14} /> {risk.warning}</p> : null}
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
          <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs leading-5 text-steel">
            Affiliate transparency: we may earn a commission when you buy through outbound links. Rankings still prioritize total price, seller trust, delivery and AI quality signals.
          </p>
          <div className="mt-5"><AIShirtAdvisor product={product} /></div>
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
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-14 sm:px-6 lg:grid-cols-3">
        <div className="glass rounded-[28px] p-5">
          <Shirt className="text-volt" />
          <h2 className="mt-4 text-2xl font-bold">Quality breakdown</h2>
          <div className="mt-5 space-y-3">
            {productQualitySignals.map((signal) => (
              <div key={signal.label}>
                <div className="flex items-center justify-between text-sm"><span>{signal.label}</span><span className="font-bold text-champagne">{signal.score}/100</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-volt to-mint" style={{ width: `${signal.score}%` }} /></div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-steel">Player versions usually fit slimmer and use lighter fabric. Fan versions are more forgiving for everyday wear.</p>
        </div>
        <div className="glass rounded-[28px] p-5">
          <MessageSquareQuote className="text-volt" />
          <h2 className="mt-4 text-2xl font-bold">Review intelligence</h2>
          <div className="mt-5 space-y-3">
            {productReviewSnippets.map((snippet) => (
              <blockquote key={snippet.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-mint">{snippet.label}</p>
                <p className="mt-2 text-sm leading-6 text-steel">{snippet.text}</p>
              </blockquote>
            ))}
          </div>
        </div>
        <div className="glass rounded-[28px] p-5">
          <Globe2 className="text-volt" />
          <h2 className="mt-4 text-2xl font-bold">Delivery regions</h2>
          <div className="mt-5 grid gap-3">
            {["EU: 5-12 days", "UK: 6-14 days", "US: 7-16 days", "Worldwide: 8-21 days"].map((region) => (
              <div key={region} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm">
                <BadgeCheck size={16} className="text-mint" /> {region}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-steel">Actual delivery depends on seller handling time, customs and local carrier scans.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="text-3xl font-bold">AI matched shirts</h2>
        <div className="mt-3 flex flex-wrap gap-2">{related.map((match) => <span key={match.product.id} className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-champagne">{match.confidence}% match - {match.method}</span>)}</div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">{related.map((match) => <ProductCard key={match.product.id} product={match.product} />)}</div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 p-3 shadow-glow backdrop-blur-2xl sm:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div>
            <p className="text-xs text-steel">Best deal today</p>
            <p className="text-lg font-black text-volt"><Price amount={totalPrice(topOffer)} /></p>
          </div>
          <Link href={`/api/track-click?offer=${topOffer.id}`} className="flex items-center gap-2 rounded-full bg-volt px-5 py-3 text-sm font-black text-ink">
            View best deal <ShoppingBag size={16} />
          </Link>
        </div>
      </div>
    </Shell>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"><div className="mb-4 text-volt">{icon}</div><p className="text-xs text-steel">{label}</p><p className="font-bold">{value}</p></div>;
}

function IntelPill({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3"><p className="text-[10px] uppercase tracking-[0.18em] text-steel">{label}</p><p className="mt-1 font-bold text-champagne">{value}</p></div>;
}

function ChoiceCard({ icon, label, offer }: { icon: React.ReactNode; label: string; offer: { marketplace: string; sellerName: string; price: number; shippingPrice: number; deliveryDays: number } }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-volt">{icon}</div>
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-steel">{label}</p>
      <p className="mt-1 font-bold">{offer.marketplace}</p>
      <p className="text-xs text-steel">{offer.sellerName}</p>
      <p className="mt-3 text-xl font-black text-champagne"><Price amount={offer.price + offer.shippingPrice} /></p>
      <p className="text-xs text-steel">{offer.deliveryDays} day estimate</p>
    </div>
  );
}
