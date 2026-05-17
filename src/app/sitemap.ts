import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { landingPages } from "@/data/landing";
import { products, seoPages } from "@/data/mock";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    "", "/search", "/deals", "/trending", "/sellers", "/discovery", "/seo/goedkope-wk26-shirts", "/seo/wk26-voetbalshirts",
    ...products.map((product) => `/products/${product.slug}`),
    ...seoPages.map((page) => `/seo/${page.slug}`),
    ...landingPages.map((page) => `/landing/${page.slug}`)
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
