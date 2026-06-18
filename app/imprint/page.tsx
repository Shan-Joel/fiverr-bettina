import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/wp";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("imprint");
  return buildMetadata({
    title: page?.acf_data.seo_title || "Imprint",
    description: page?.acf_data.seo_description,
    path: "/imprint",
  });
}

export default async function ImprintPage() {
  const page = await getPageBySlug("imprint");
  if (!page) notFound();

  return (
    <>
      <PageHeader eyebrow="Legal" title={page.title.rendered} />
      <Section background="white">
        <div
          className="prose-wp max-w-2xl text-lg"
          // Legal content authored in the WordPress editor (trusted CMS content).
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </Section>
    </>
  );
}
