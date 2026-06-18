import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOptions, getPageBySlug } from "@/lib/wp";
import { buildMetadata, medicalBusinessLd } from "@/lib/seo";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import ContactBlock from "@/components/ContactBlock";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact");
  return buildMetadata({
    title: page?.acf_data.seo_title || "Contact",
    description: page?.acf_data.seo_description || page?.acf_data.intro,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [page, options] = await Promise.all([
    getPageBySlug("contact"),
    getOptions(),
  ]);
  if (!page) notFound();

  return (
    <>
      <JsonLd data={medicalBusinessLd(options)} />
      <PageHeader
        eyebrow="Contact"
        title={page.title.rendered}
        intro={page.acf_data.intro}
      />

      <Section background="white">
        {page.content.rendered && (
          <div
            className="prose-wp mb-12 max-w-2xl text-lg"
            // Page content authored in the WordPress editor (trusted CMS content).
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        )}
        <div className="border-t border-sand pt-12">
          <ContactBlock options={options} />
        </div>
      </Section>
    </>
  );
}
