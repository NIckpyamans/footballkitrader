export type MarketplaceName = "AliExpress" | "DHGate" | "Temu" | "Amazon" | "Facebook Shop" | "Instagram Seller" | "Retro Marketplace" | "External Store";

export type ShirtVersion = "Fan" | "Player" | "Retro" | "Training" | "Mystery" | "Kids";

export type CurrencyCode = "EUR" | "USD" | "GBP" | "AED" | "TRY" | "PLN";

export type LocaleCode = "nl" | "en" | "de" | "fr" | "es" | "it" | "pt" | "tr" | "pl" | "ar";

export interface Seller {
  id: string;
  name: string;
  marketplace: MarketplaceName;
  rating: number;
  trustScore: number;
  orders: number;
  refundRate: number;
  avgDeliveryDays: number;
}

export interface ProductOffer {
  id: string;
  productId: string;
  marketplace: MarketplaceName;
  sellerId: string;
  sellerName: string;
  price: number;
  currency: CurrencyCode;
  shippingPrice: number;
  deliveryDays: number;
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  club: string;
  player?: string;
  season: string;
  version: ShirtVersion;
  category: string;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  tags: string[];
  qualityScore: number;
  aiTrustScore: number;
  aiDealScore: number;
  reviewSummary: string;
  fakeReviewRisk: number;
  priceHistory: { date: string; price: number }[];
  offers: ProductOffer[];
}

export interface Alert {
  productId: string;
  targetPrice: number;
  size?: string;
  marketplace?: MarketplaceName;
}

export type MarketplaceSourceStatus = "active" | "pending_review" | "blocked";

export interface MarketplaceSource {
  id: string;
  name: string;
  url: string;
  category: "affiliate" | "webshop" | "retro" | "social" | "marketplace";
  status: MarketplaceSourceStatus;
  aiTrustScore: number;
  qualityScore: number;
  shippingScore: number;
  communityScore: number;
  scamRisk: number;
  activationRequiresApproval: boolean;
  signals: string[];
}

export interface DiscoveryInsight {
  sourceId: string;
  title: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
}
