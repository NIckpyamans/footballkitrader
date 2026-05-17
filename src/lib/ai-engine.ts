import type { MarketplaceSource, Product, ProductOffer, Seller } from "@/types";
import { totalPrice } from "@/lib/scoring";

export function calculateSellerTrust(seller: Seller) {
  const ratingScore = seller.rating * 18;
  const fulfilmentScore = Math.max(0, 100 - seller.avgDeliveryDays * 2);
  const refundScore = Math.max(0, 100 - seller.refundRate * 10);
  const volumeScore = Math.min(100, Math.log10(Math.max(seller.orders, 1)) * 22);
  return Math.round(ratingScore * 0.28 + fulfilmentScore * 0.22 + refundScore * 0.22 + volumeScore * 0.16 + seller.trustScore * 0.12);
}

export function calculateQualityScore(product: Product, offer: ProductOffer, seller?: Seller) {
  const imageConfidence = Math.min(100, product.images.length * 24);
  const sellerTrust = seller ? calculateSellerTrust(seller) : product.aiTrustScore;
  const reviewReliability = Math.max(0, 100 - product.fakeReviewRisk);
  const priceRealism = totalPrice(offer) < 18 ? 55 : totalPrice(offer) < 32 ? 88 : 76;
  return Math.round(product.qualityScore * 0.28 + imageConfidence * 0.2 + sellerTrust * 0.22 + reviewReliability * 0.18 + priceRealism * 0.12);
}

export function calculateSmartDealScore(product: Product, offer: ProductOffer, seller?: Seller) {
  const quality = calculateQualityScore(product, offer, seller);
  const delivery = Math.max(0, 100 - offer.deliveryDays * 4);
  const price = Math.max(0, 100 - totalPrice(offer) * 1.7);
  return Math.round(quality * 0.38 + (seller ? calculateSellerTrust(seller) : product.aiTrustScore) * 0.24 + delivery * 0.18 + price * 0.2);
}

export function analyzePriceHistory(product: Product) {
  const values = product.priceHistory.map((item) => item.price);
  const latest = values.at(-1) ?? 0;
  const highest = Math.max(...values, latest);
  const lowest = Math.min(...values, latest);
  const dropPercent = highest > 0 ? Math.round(((highest - latest) / highest) * 100) : 0;
  const volatility = highest - lowest;

  return {
    latest,
    highest,
    lowest,
    dropPercent,
    volatility,
    trend: dropPercent >= 20 ? "strong_drop" : volatility >= 10 ? "volatile" : "stable"
  };
}

export function analyzeImageSignals(product: Product) {
  const colorCoverage = product.colors.length >= 2 ? 88 : 64;
  const galleryCoverage = Math.min(100, product.images.length * 28);
  const ocrConfidence = product.tags.some((tag) => ["wk26", "world cup 2026", "retro"].includes(tag)) ? 84 : 72;
  const logoConfidence = product.club.length > 0 ? 86 : 58;

  return {
    imageSimilarity: Math.round(galleryCoverage * 0.48 + colorCoverage * 0.24 + logoConfidence * 0.18 + ocrConfidence * 0.1),
    ocrConfidence,
    logoConfidence,
    colorCoverage
  };
}

export function detectSellerWarnings(seller?: Seller, marketplaceRisk = 0) {
  if (!seller) return ["Seller data incomplete; keep offer below preferred ranking until verified."];
  const warnings: string[] = [];
  if (seller.trustScore < 70) warnings.push("Low AI seller trust score.");
  if (seller.refundRate > 3) warnings.push("Refund rate is above marketplace benchmark.");
  if (seller.avgDeliveryDays > 12) warnings.push("Delivery reliability may be weak for tournament demand spikes.");
  if (marketplaceRisk > 60) warnings.push("Marketplace source requires manual review before live activation.");
  return warnings;
}

export function matchProducts(seed: Product, candidates: Product[]) {
  const seedImage = analyzeImageSignals(seed);
  return candidates
    .filter((product) => product.id !== seed.id)
    .map((product) => {
      const imageSignals = analyzeImageSignals(product);
      const sharedTags = product.tags.filter((tag) => seed.tags.includes(tag)).length;
      const sameTeam = product.club === seed.club ? 30 : 0;
      const sameVersion = product.version === seed.version ? 16 : 0;
      const colorOverlap = product.colors.filter((color) => seed.colors.includes(color)).length * 8;
      const imageOverlap = Math.round((seedImage.imageSimilarity + imageSignals.imageSimilarity) / 16);
      const confidence = Math.min(98, sharedTags * 9 + sameTeam + sameVersion + colorOverlap + imageOverlap + 10);
      return { product, confidence, method: "title_tags_color_image_ocr_logo_similarity" };
    })
    .filter((match) => match.confidence >= 42)
    .sort((a, b) => b.confidence - a.confidence);
}

export function assessMarketplaceSource(source: MarketplaceSource) {
  const weightedTrust = Math.round(source.aiTrustScore * 0.32 + source.qualityScore * 0.22 + source.shippingScore * 0.18 + source.communityScore * 0.16 + (100 - source.scamRisk) * 0.12);
  const verdict = source.scamRisk >= 70 ? "high_risk" : weightedTrust >= 76 ? "approved_candidate" : "manual_review";
  return {
    weightedTrust,
    verdict,
    canActivate: source.status === "active" && !source.activationRequiresApproval,
    requiresApproval: source.activationRequiresApproval
  };
}
