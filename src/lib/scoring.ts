import type { Product, ProductOffer, Seller } from "@/types";

export function totalPrice(offer: ProductOffer) {
  return offer.price + offer.shippingPrice;
}

export function bestValueScore(product: Product, offer: ProductOffer, seller?: Seller) {
  const sellerTrust = seller?.trustScore ?? 75;
  const deliveryScore = Math.max(0, 100 - offer.deliveryDays * 3);
  const pricePenalty = totalPrice(offer) * 1.4;
  return Math.round(product.qualityScore * 0.42 + sellerTrust * 0.28 + deliveryScore * 0.18 + offer.rating * 10 * 0.12 - pricePenalty * 0.16);
}

export function bestOffer(product: Product, sellers: Seller[]) {
  return [...product.offers].sort((a, b) => {
    const aSeller = sellers.find((seller) => seller.id === a.sellerId);
    const bSeller = sellers.find((seller) => seller.id === b.sellerId);
    return bestValueScore(product, b, bSeller) - bestValueScore(product, a, aSeller);
  })[0];
}
