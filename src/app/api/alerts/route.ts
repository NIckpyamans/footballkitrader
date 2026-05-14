import { NextRequest, NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.productId || !body.targetPrice) return NextResponse.json({ error: "productId and targetPrice are required" }, { status: 400 });

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data, error } = await getSupabaseService().from("alerts").insert({
      user_id: body.userId,
      product_id: body.productId,
      target_price: body.targetPrice,
      size: body.size,
      marketplace: body.marketplace
    }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ alert: data });
  }

  return NextResponse.json({ alert: body, mode: "mock" });
}
