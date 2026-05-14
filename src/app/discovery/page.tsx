import type { Metadata } from "next";
import { DiscoveryPanel } from "@/components/DiscoveryPanel";
import { Shell } from "@/components/Shell";

export const metadata: Metadata = {
  title: "AI Marketplace Discovery",
  description: "AI marketplace monitoring, seller trust scoring and scam-risk analysis for WK26 football shirt sources."
};

export default function DiscoveryPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <DiscoveryPanel />
      </section>
    </Shell>
  );
}
