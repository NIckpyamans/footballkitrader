import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Footballkitrader | WK26 Football Shirt Marketplace",
    template: "%s | Footballkitrader"
  },
  description: "Compare WK26 football shirts, national team kits, retro World Cup shirts and marketplace deals by price, quality, shipping and seller trust.",
  keywords: ["WK26 shirts", "World Cup 2026 football shirts", "goedkope WK26 shirts", "retro WK shirts", "player version WK shirts", "voetbalshirt deals"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Footballkitrader | WK26 Football Marketplace",
    description: "Premium WK26 football shirt price comparison for national teams, retro shirts and fan merchandise.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Footballkitrader | WK26 Football Marketplace",
    description: "Compare WK26 shirts by price, quality, delivery and seller trust."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
