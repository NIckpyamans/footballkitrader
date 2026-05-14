import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/mock";
import { buildAffiliateUrl, isAllowedAffiliateDestination } from "@/lib/affiliate";
import { checkRateLimit } from "@/lib/rate-limit";
import { getSupabaseService } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const identity = request.headers.get("x-forwarded-for") ?? request.headers.get("user-agent") ?? "anonymous";
  const rate = checkRateLimit(`click:${identity}`, 40);
  if (!rate.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const offerId = request.nextUrl.searchParams.get("offer");
  const offer = products.flatMap((product) => product.offers).find((item) => item.id === offerId);
  if (!offer) return NextResponse.json({ error: "Offer not found" }, { status: 404 });
  if (!isAllowedAffiliateDestination(offer.affiliateUrl)) return NextResponse.json({ error: "Blocked affiliate destination" }, { status: 400 });

  const clickId = crypto.randomUUID();
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    await getSupabaseService().from("affiliate_clicks").insert({
      id: clickId,
      product_id: offer.productId,
      offer_id: offer.id,
      marketplace: offer.marketplace,
      seller_id: offer.sellerId,
      outbound_url: offer.affiliateUrl,
      user_agent: request.headers.get("user-agent")
    });
  }

  return NextResponse.redirect(buildAffiliateUrl(offer.affiliateUrl, clickId));
}
