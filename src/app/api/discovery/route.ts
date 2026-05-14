import { NextResponse } from "next/server";
import { discoveryInsights, marketplaceSources } from "@/data/marketplaces";
import { assessMarketplaceSource } from "@/lib/ai-engine";

export async function GET() {
  return NextResponse.json({
    status: "analysis_only",
    activationPolicy: "New marketplace sources require explicit user approval before live activation.",
    sources: marketplaceSources.map((source) => ({ ...source, assessment: assessMarketplaceSource(source) })),
    insights: discoveryInsights
  });
}
