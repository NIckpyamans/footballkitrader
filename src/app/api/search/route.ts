import { NextRequest, NextResponse } from "next/server";
import { searchMarketplaceOffers } from "@/lib/affiliate";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const identity = request.headers.get("x-forwarded-for") ?? "anonymous";
  const rate = checkRateLimit(`search:${identity}`, 120);
  if (!rate.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const params = request.nextUrl.searchParams;
  const products = await searchMarketplaceOffers({
    q: params.get("q") ?? undefined,
    marketplace: params.get("marketplace") ?? undefined,
    version: params.get("version") ?? undefined,
    size: params.get("size") ?? undefined,
    color: params.get("color") ?? undefined,
    season: params.get("season") ?? undefined,
    maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
    minQuality: params.get("minQuality") ? Number(params.get("minQuality")) : undefined
  });

  return NextResponse.json({ products }, { headers: { "X-RateLimit-Remaining": String(rate.remaining) } });
}
