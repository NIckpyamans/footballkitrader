export const siteConfig = {
  name: "FootballKitRadar",
  legalName: "FootballKitRadar",
  shortName: "FKR",
  tagline: "AI football commerce intelligence",
  description:
    "Compare WK26 football shirts, club kits, retro collections and marketplace deals with AI product matching, seller trust scoring and affiliate price intelligence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://footballkitrader.vercel.app",
  repository: "https://github.com/NIckpyamans/footballkitrader",
  deploymentProject: "footballkitrader",
  supportEmail: "support@footballkitrader.com",
  keywords: [
    "FootballKitRadar",
    "WK26 shirts",
    "World Cup 2026 football shirts",
    "cheap football shirts",
    "retro football shirts",
    "club shirts",
    "player version shirts",
    "fan version shirts",
    "football shirt deals",
    "AI football marketplace"
  ]
};

export const platformModes = [
  {
    id: "wk26",
    label: "WK26 mode",
    query: "wk26",
    headline: "World Cup national-team demand, player versions and live tournament deal velocity."
  },
  {
    id: "club-season",
    label: "Club season mode",
    query: "club shirts",
    headline: "Latest club kits, training drops, fan merchandise and seller performance by league."
  },
  {
    id: "transfer",
    label: "Transfer mode",
    query: "transfer shirts",
    headline: "Player-driven shirt spikes, transfer rumors and fast-moving marketplace listings."
  },
  {
    id: "retro",
    label: "Retro mode",
    query: "retro shirts",
    headline: "Archive shirts, World Cup classics and trusted retro seller comparison."
  }
] as const;
