import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Shell } from "@/components/Shell";
import { landingPages } from "@/data/landing";
import { searchMarketplaceOffers } from "@/lib/affiliate";

type LandingPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = landingPages.find((item) => item.slug === slug);
  return {
    title: page?.title ?? "Football shirts",
    description: page?.description
  };
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;
  const page = landingPages.find((item) => item.slug === slug);
  if (!page) notFound();
  const products = await searchMarketplaceOffers({ q: page.query });

  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-mint">FootballKitRadar landing page</p>
        <h1 className="mt-3 text-5xl font-black">{page.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-steel">{page.description}</p>
        <div className="glass mt-8 rounded-[28px] p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">{products.length} live comparison results</p>
          <p className="mt-2 text-sm text-steel">Ranked by total price, delivery, seller trust, AI quality score and marketplace risk.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </Shell>
  );
}
