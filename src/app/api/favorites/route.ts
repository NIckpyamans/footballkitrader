import { NextRequest, NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.productId) return NextResponse.json({ error: "productId is required" }, { status: 400 });

  if (process.env.SUPABASE_SERVICE_ROLE_KEY && body.userId) {
    const { data, error } = await getSupabaseService()
      .from("favorites")
      .upsert({ user_id: body.userId, product_id: body.productId }, { onConflict: "user_id,product_id" })
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ favorite: data, mode: "supabase" });
  }

  return NextResponse.json({ favorite: body, mode: "local-sync-ready" });
}
