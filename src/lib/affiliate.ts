import { products } from "@/data/mock";

export interface SearchFilters {
  q?: string;
  marketplace?: string;
  version?: string;
  maxPrice?: number;
  minQuality?: number;
  size?: string;
  color?: string;
  season?: string;
}

export async function searchMarketplaceOffers(filters: SearchFilters) {
  const query = filters.q?.toLowerCase().trim();
  return products.filter((product) => {
    const haystack = [product.title, product.club, product.player, product.season, product.version, ...product.tags]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesQuality = !filters.minQuality || product.qualityScore >= filters.minQuality;
    const matchesVersion = !filters.version || product.version.toLowerCase() === filters.version.toLowerCase();
    const matchesSize = !filters.size || product.sizes.includes(filters.size);
    const matchesColor = !filters.color || product.colors.some((color) => color.toLowerCase() === filters.color?.toLowerCase());
    const matchesSeason = !filters.season || product.season.toLowerCase().includes(filters.season.toLowerCase());
    const matchesMarketplace = !filters.marketplace || product.offers.some((offer) => offer.marketplace === filters.marketplace);
    const matchesPrice = !filters.maxPrice || product.offers.some((offer) => offer.price + offer.shippingPrice <= Number(filters.maxPrice));
    return matchesQuery && matchesQuality && matchesVersion && matchesMarketplace && matchesPrice && matchesSize && matchesColor && matchesSeason;
  });
}

export function buildAffiliateUrl(rawUrl: string, clickId: string) {
  const url = new URL(rawUrl);
  url.searchParams.set("footballkitradar_click_id", clickId);
  url.searchParams.set("utm_source", "footballkitradar");
  url.searchParams.set("utm_medium", "affiliate");
  return url.toString();
}

export function isAllowedAffiliateDestination(rawUrl: string) {
  const allowedHosts = ["example.com", "www.aliexpress.com", "www.dhgate.com", "www.amazon.com", "www.amazon.nl"];
  try {
    const url = new URL(rawUrl);
    return allowedHosts.includes(url.hostname);
  } catch {
    return false;
  }
}
