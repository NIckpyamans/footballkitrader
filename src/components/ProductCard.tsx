import Image from "next/image";
import { ArrowUpRight, Camera, Clock, Crown, ShieldCheck, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { sellers } from "@/data/mock";
import { bestOffer, bestValueScore, totalPrice } from "@/lib/scoring";
import { primaryProductImage } from "@/lib/images";
import { Price } from "@/components/Price";
import { T } from "@/components/T";
import { customerPhotoScore, fitAdvice, stockStatus } from "@/lib/product-insights";

export function ProductCard({ product }: { product: Product }) {
  const offer = bestOffer(product, sellers);
  const seller = sellers.find((item) => item.id === offer.sellerId);
  const value = Math.max(bestValueScore(product, offer, seller), product.aiDealScore);

  return (
    <article className="glass group overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-1 hover:border-volt/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={primaryProductImage(product.images, product.slug)} alt={product.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-ink/70 px-3 py-1 text-xs font-medium backdrop-blur">{product.version}</span>
          <span className="flex items-center gap-1 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium backdrop-blur"><Camera size={13} /> {customerPhotoScore(product)} echte foto's</span>
        </div>
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <span className="flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-bold text-champagne backdrop-blur"><Crown size={13} /> Best deal</span>
          {product.aiDealScore >= 92 ? <span className="rounded-full border border-volt/30 bg-volt/10 px-3 py-1 text-xs font-bold text-volt backdrop-blur">AI recommended</span> : null}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold tracking-tight">{product.title}</h3>
          <p className="text-sm text-steel">{product.club} - {product.season}</p>
        </div>
      </div>
      <div className="space-y-5 p-5">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <Metric icon={<Sparkles size={16} />} label={<T k="quality" />} value={`${product.qualityScore}`} />
          <Metric icon={<ShieldCheck size={16} />} label={<T k="trust" />} value={`${seller?.trustScore ?? product.aiTrustScore}`} />
          <Metric icon={<Clock size={16} />} label={<T k="delivery" />} value={`${offer.deliveryDays}d`} />
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-steel">AI deal score</p>
            <p className="text-3xl font-black text-champagne">{value}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-steel">from</p>
            <p className="text-2xl font-semibold"><Price amount={totalPrice(offer)} /></p>
            <p className="text-xs text-steel">{offer.marketplace}</p>
          </div>
        </div>
        <div className="grid gap-2 text-xs text-steel">
          <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">Laatst gecontroleerd: 12 min geleden</p>
          <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">{stockStatus(offer.stock)} - {fitAdvice(product)}</p>
        </div>
        <a href={`/products/${product.slug}`} className="flex items-center justify-center gap-2 rounded-full bg-champagne px-4 py-3 text-sm font-semibold text-ink transition hover:bg-volt">
          <T k="compareOffers" /> <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: React.ReactNode; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <div className="mb-2 text-mint">{icon}</div>
      <div className="text-xs text-steel">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
