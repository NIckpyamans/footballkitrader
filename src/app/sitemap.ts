import type { MetadataRoute } from "next";
import { products, seoPages } from "@/data/mock";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kitradar.com";
  return [
    "", "/search", "/deals", "/trending", "/sellers", "/seo/goedkope-wk26-shirts", "/seo/wk26-voetbalshirts",
    ...products.map((product) => `/products/${product.slug}`),
    ...seoPages.map((page) => `/seo/${page.slug}`)
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
