"use client";

import { useMemo, useState } from "react";
import { Bot, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { fitAdvice } from "@/lib/product-insights";
import { bestOffer, totalPrice } from "@/lib/scoring";
import { sellers } from "@/data/mock";
import { Price } from "@/components/Price";

export function AIShirtAdvisor({ product }: { product: Product }) {
  const [mode, setMode] = useState<"deal" | "size" | "risk">("deal");
  const offer = useMemo(() => bestOffer(product, sellers), [product]);
  const seller = sellers.find((item) => item.id === offer.sellerId);

  const answer = {
    deal: `Ik zou nu ${offer.sellerName} kiezen: beste balans tussen totaalprijs, ${offer.deliveryDays} dagen levertijd en ${seller?.trustScore ?? product.aiTrustScore}% seller trust.`,
    size: fitAdvice(product),
    risk: `${product.fakeReviewRisk}% fake-review risico. Controleer vooral koperfoto's van badge, kraag en rugprint voordat je bestelt.`
  }[mode];

  return (
    <div className="glass rounded-[28px] p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-volt text-ink"><Bot size={22} /></div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-mint">AI shirt advisor</p>
          <h2 className="text-2xl font-bold">Vraag het aan KitRadar</h2>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button onClick={() => setMode("deal")} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-volt/40"><Sparkles className="mr-2 inline" size={15} /> Beste deal</button>
        <button onClick={() => setMode("size")} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-volt/40"><MessageCircle className="mr-2 inline" size={15} /> Maatadvies</button>
        <button onClick={() => setMode("risk")} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-volt/40"><ShieldCheck className="mr-2 inline" size={15} /> Risico</button>
      </div>
      <p className="mt-5 rounded-2xl border border-volt/20 bg-volt/10 p-4 text-sm leading-6 text-white">{answer}</p>
      <p className="mt-3 text-sm text-steel">AI keuze: <span className="font-bold text-champagne"><Price amount={totalPrice(offer)} /></span> via {offer.marketplace}</p>
    </div>
  );
}
