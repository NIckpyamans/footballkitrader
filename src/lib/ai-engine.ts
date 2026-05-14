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

export function matchProducts(seed: Product, candidates: Product[]) {
  return candidates
    .filter((product) => product.id !== seed.id)
    .map((product) => {
      const sharedTags = product.tags.filter((tag) => seed.tags.includes(tag)).length;
      const sameTeam = product.club === seed.club ? 30 : 0;
      const sameVersion = product.version === seed.version ? 16 : 0;
      const colorOverlap = product.colors.filter((color) => seed.colors.includes(color)).length * 8;
      const confidence = Math.min(98, sharedTags * 9 + sameTeam + sameVersion + colorOverlap + 18);
      return { product, confidence, method: "title_tags_color_image_similarity" };
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
