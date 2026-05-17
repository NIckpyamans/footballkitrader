import type { Product, ProductOffer, Seller } from "@/types";
import { totalPrice } from "@/lib/scoring";

export function fitAdvice(product: Product) {
  if (product.version === "Player") return "Valt klein - neem meestal 1 maat groter";
  if (product.version === "Kids") return "Valt normaal - controleer lengte en borstbreedte";
  if (product.version === "Training") return "Valt normaal tot ruim";
  return "Valt normaal - relaxed fan fit";
}

export function stockStatus(stock: number) {
  if (stock <= 12) return "Bijna uitverkocht";
  if (stock <= 35) return `Nog ${stock} beschikbaar`;
  return "Nieuwe listing";
}

export function customerPhotoScore(product: Product) {
  return Math.max(4, Math.min(14, product.images.length + Math.round(product.qualityScore / 12)));
}

export function qualitySignals(product: Product) {
  const base = product.qualityScore;
  return [
    { label: "Badgekwaliteit", score: Math.min(99, base + (product.version === "Player" ? 2 : 0)) },
    { label: "Printkwaliteit", score: Math.max(65, base - 4) },
    { label: "Stofkwaliteit", score: Math.max(65, base - (product.version === "Player" ? 1 : 5)) },
    { label: "Wasbestendigheid", score: Math.max(60, base - product.fakeReviewRisk) },
    { label: "Seller betrouwbaarheid", score: product.aiTrustScore }
  ];
}

export function reviewSnippets(product: Product) {
  return [
    { label: "Verified buyer pattern", text: `Kopers noemen vooral goede ${product.colors[0]?.toLowerCase() ?? "kleur"} kleurmatch, nette naden en sterke prijs-kwaliteit.` },
    { label: "Maatadvies", text: fitAdvice(product) },
    { label: "Fake-review check", text: `${product.fakeReviewRisk}% geschat risico. Kies listings met daglichtfoto's, specifieke maatcomments en recente leveringservaring.` }
  ];
}

export function sellerRiskInfo(offer: ProductOffer, seller?: Seller) {
  const trust = seller?.trustScore ?? 75;
  const disputeRisk = trust >= 90 ? "Laag dispute risico" : trust >= 82 ? "Gemiddeld dispute risico" : "Hoger dispute risico";
  const returns = offer.marketplace === "Amazon" ? "Retour meestal eenvoudig" : trust >= 88 ? "Retour/dispute meestal mogelijk" : "Check retourvoorwaarden";
  const tracking = offer.deliveryDays <= 7 ? "Tracking snel actief" : "Tracking kan later actief worden";
  const warning = trust < 82 || offer.deliveryDays > 14 ? "Koop alleen als je langere levertijd accepteert" : null;
  return { disputeRisk, returns, tracking, warning };
}

export function bestSellerLabel(product: Product, offer: ProductOffer, seller?: Seller) {
  const total = totalPrice(offer);
  const trust = seller?.trustScore ?? product.aiTrustScore;
  if (trust >= 90 && total <= Math.min(...product.offers.map(totalPrice)) + 4) return "Beste totaaldeal";
  if (total === Math.min(...product.offers.map(totalPrice))) return "Goedkoopste";
  if (offer.deliveryDays === Math.min(...product.offers.map((item) => item.deliveryDays))) return "Snelste levering";
  return "Alternatief";
}

export function photoChecklist(product: Product) {
  const photos = [
    { label: "Voorkant", image: product.images[0] },
    { label: "Achterkant", image: product.images[1] ?? product.images[0] },
    { label: "Badge close-up", image: product.images[2] ?? product.images[0] },
    { label: "Kraag/label", image: product.images[1] ?? product.images[0] },
    { label: "Materiaal", image: product.images[2] ?? product.images[0] }
  ];
  return photos;
}
