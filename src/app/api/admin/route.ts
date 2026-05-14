import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    marketplaces: 8,
    pendingModeration: 17,
    affiliateClicks: 38421,
    conversions: 1287,
    commissionEur: 9340,
    topPerformingProducts: ["Netherlands 1988 Retro Home Shirt", "Barcelona 2009 Retro Home Shirt"],
    aiQueues: ["fake-review-detection", "image-similarity", "seller-trust-prediction", "automatic-product-matching", "ai-deal-score"]
  });
}
