import type { Metadata } from "next";
import { DiscoveryPanel } from "@/components/DiscoveryPanel";
import { Shell } from "@/components/Shell";

export const metadata: Metadata = {
  title: "Marketplace Trust",
  description: "Compare football shirt marketplaces, seller trust scoring and scam-risk analysis for WK26 sources."
};

export default function DiscoveryPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-mint">Marketplace trust</p>
          <h1 className="mt-3 text-4xl font-black">Where should you buy football shirts?</h1>
          <p className="mt-3 text-steel">We monitor seller risk, delivery reliability, image quality and community signals so shoppers can avoid weak listings before they click out.</p>
        </div>
        <DiscoveryPanel />
      </section>
    </Shell>
  );
}
