import { platformModes } from "@/config/site";
import { products } from "@/data/mock";

export const homeSections = [
  {
    id: "trending-wk26",
    mode: platformModes[0].id,
    eyebrow: "WK26 demand radar",
    title: "Trending national team shirts",
    query: "wk26",
    products: products.filter((product) => product.tags.includes("wk26")).slice(0, 3)
  },
  {
    id: "ai-deals",
    mode: platformModes[0].id,
    eyebrow: "AI deal intelligence",
    title: "AI recommended deals",
    query: "ai deals",
    products: [...products].sort((a, b) => b.aiDealScore - a.aiDealScore).slice(0, 3)
  },
  {
    id: "club-season",
    mode: platformModes[1].id,
    eyebrow: "Club season radar",
    title: "Newest club shirts",
    query: "club shirts",
    products: products.filter((product) => product.tags.includes("club")).slice(0, 3)
  },
  {
    id: "transfer",
    mode: platformModes[2].id,
    eyebrow: "Transfer market heat",
    title: "Transfer shirts and player demand",
    query: "transfer shirts",
    products: products.filter((product) => product.player).slice(0, 3)
  },
  {
    id: "retro",
    mode: platformModes[3].id,
    eyebrow: "Archive market",
    title: "Retro collection",
    query: "retro shirts",
    products: products.filter((product) => product.tags.includes("retro")).slice(0, 3)
  }
];
