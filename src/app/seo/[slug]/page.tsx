import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Shell } from "@/components/Shell";
import { products, seoPages } from "@/data/mock";
import { primaryProductImage } from "@/lib/images";

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

type SeoPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: SeoPageProps) {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  return { title: page?.title, description: page?.description };
}

export default async function SeoPage({ params }: SeoPageProps) {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.title,
    description: page.description,
    mainEntity: products.map((product) => ({ "@type": "Product", name: product.title, image: primaryProductImage(product.images, product.slug), brand: product.club }))
  };

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-5xl font-black">{page.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-steel">{page.description}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </Shell>
  );
}
