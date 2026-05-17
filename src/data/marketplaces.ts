import type { DiscoveryInsight, MarketplaceSource } from "@/types";

export const marketplaceSources: MarketplaceSource[] = [
  {
    id: "aliexpress",
    name: "AliExpress Affiliate",
    url: "https://www.aliexpress.com",
    category: "affiliate",
    status: "active",
    aiTrustScore: 86,
    qualityScore: 82,
    shippingScore: 78,
    communityScore: 84,
    scamRisk: 18,
    activationRequiresApproval: false,
    signals: ["approved affiliate flow", "large review volume", "variable seller quality"]
  },
  {
    id: "dhgate",
    name: "DHGate Affiliate",
    url: "https://www.dhgate.com",
    category: "affiliate",
    status: "active",
    aiTrustScore: 82,
    qualityScore: 79,
    shippingScore: 74,
    communityScore: 80,
    scamRisk: 22,
    activationRequiresApproval: false,
    signals: ["marketplace seller variance", "use per-seller trust scoring", "good product depth"]
  },
  {
    id: "amazon",
    name: "Amazon Affiliate",
    url: "https://www.amazon.com",
    category: "affiliate",
    status: "active",
    aiTrustScore: 88,
    qualityScore: 76,
    shippingScore: 94,
    communityScore: 82,
    scamRisk: 12,
    activationRequiresApproval: false,
    signals: ["fast delivery", "strong conversion tracking", "mixed marketplace catalog quality"]
  },
  {
    id: "temu",
    name: "Temu Marketplace",
    url: "https://www.temu.com",
    category: "marketplace",
    status: "pending_review",
    aiTrustScore: 74,
    qualityScore: 70,
    shippingScore: 80,
    communityScore: 68,
    scamRisk: 30,
    activationRequiresApproval: true,
    signals: ["requires partner terms review", "low-price discovery", "strict image provenance checks needed"]
  },
  {
    id: "ucljersey",
    name: "UCL Jersey",
    url: "https://www.ucljersey.com",
    category: "webshop",
    status: "pending_review",
    aiTrustScore: 58,
    qualityScore: 61,
    shippingScore: 52,
    communityScore: 44,
    scamRisk: 57,
    activationRequiresApproval: true,
    signals: ["external webshop", "manual legal and trust review required", "image matching only until approved"]
  },
  {
    id: "2027jersey",
    name: "2027 Jersey",
    url: "https://2027jersey.com",
    category: "webshop",
    status: "pending_review",
    aiTrustScore: 54,
    qualityScore: 58,
    shippingScore: 49,
    communityScore: 40,
    scamRisk: 61,
    activationRequiresApproval: true,
    signals: ["new source candidate", "domain age and fulfilment checks required", "do not enable redirects before approval"]
  },
  {
    id: "vip-kiki004-shop",
    name: "VIP Kiki004 Shop",
    url: "https://vip-kiki004-shop.top",
    category: "webshop",
    status: "pending_review",
    aiTrustScore: 41,
    qualityScore: 46,
    shippingScore: 38,
    communityScore: 31,
    scamRisk: 76,
    activationRequiresApproval: true,
    signals: ["high-risk TLD/seller pattern", "requires scam detection review", "blocked from live source activation"]
  },
  {
    id: "namejersey",
    name: "Name Jersey",
    url: "https://namejersey.com",
    category: "webshop",
    status: "pending_review",
    aiTrustScore: 60,
    qualityScore: 63,
    shippingScore: 55,
    communityScore: 48,
    scamRisk: 52,
    activationRequiresApproval: true,
    signals: ["external webshop", "compare-only candidate", "requires return policy and seller proof checks"]
  },
  {
    id: "worldcupzone",
    name: "WorldCupZone",
    url: "https://worldcupzone.shop",
    category: "webshop",
    status: "pending_review",
    aiTrustScore: 56,
    qualityScore: 59,
    shippingScore: 50,
    communityScore: 42,
    scamRisk: 58,
    activationRequiresApproval: true,
    signals: ["WK26-focused source candidate", "requires policy and fulfilment validation", "analysis-only image and price comparison"]
  }
];

export const discoveryInsights: DiscoveryInsight[] = [
  {
    sourceId: "vip-kiki004-shop",
    title: "High scam-risk candidate",
    severity: "high",
    recommendation: "Keep in pending_review; allow only metadata comparison until legal, fulfilment and payment-risk checks pass."
  },
  {
    sourceId: "ucljersey",
    title: "Image provenance check required",
    severity: "medium",
    recommendation: "Use image hashes and similarity matching, but do not mirror images unless source rights and terms are approved."
  },
  {
    sourceId: "temu",
    title: "Low-price discovery candidate",
    severity: "low",
    recommendation: "Enable through approved partner feeds or documented API terms before showing outbound affiliate redirects."
  },
  {
    sourceId: "worldcupzone",
    title: "WK26 source needs manual approval",
    severity: "medium",
    recommendation: "Keep analysis-only until ownership, return policy, image rights and fulfilment reliability are verified."
  }
];
