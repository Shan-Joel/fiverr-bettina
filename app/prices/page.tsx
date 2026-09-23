import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOptions, getPageBySlug } from "@/lib/wp";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("prices");
  return buildMetadata({
    title: page?.acf_data.seo_title || "Prices",
    description: page?.acf_data.seo_description || page?.acf_data.intro,
    path: "/prices",
  });
}

export default async function PricesPage() {
  const [page, options] = await Promise.all([
    getPageBySlug("prices"),
    getOptions(),
  ]);
  if (!page) notFound();

  return (
    <>
      <PageHeader
        title={page.title.rendered}
        intro={page.acf_data.intro}
      />
      <Section background="white">
        <div
          className="prose-wp mx-auto max-w-2xl text-lg"
          // Price tables authored in the WordPress editor (trusted CMS content).
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </Section>
    </>
  );
}
