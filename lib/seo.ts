import type { Metadata } from "next";
import { SITE_URL, SITE_LOCALE } from "./config";
import type { SiteOptions, Treatment, Faq } from "./types";

interface MetaInput {
  title?: string;
  description?: string;
  path: string;
  image?: string | null;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

/**
 * Build a Next.js Metadata object for a route, with canonical URL, Open Graph
 * and Twitter cards. Empty fields fall back to the site-wide SEO defaults.
 */
const BRAND = "Privatpraxis Bettina Wittmann";

export function buildMetadata({
  title,
  description,
  path,
  image,
  fallbackTitle,
  fallbackDescription,
}: MetaInput): Metadata {
  let finalTitle = title || fallbackTitle || BRAND;
  // Append the brand once, only if the (editor-controlled) title doesn't already include it.
  if (!finalTitle.includes("Wittmann")) {
    finalTitle = `${finalTitle} | ${BRAND}`;
  }
  const finalDescription = description || fallbackDescription || "";
  const url = `${SITE_URL}${path}`;
  const images = image ? [{ url: image }] : undefined;

  return {
    // Absolute so the root layout's title template is not applied on top (avoids doubling).
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: url },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: "Ärztliche Privatpraxis Bettina Wittmann",
      locale: SITE_LOCALE,
      type: "website",
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: finalTitle,
      description: finalDescription,
      images: image ? [image] : undefined,
    },
  };
}

/** Parse the multi-line ACF address into a schema.org PostalAddress. */
function postalAddress(address: string) {
  const lines = (address || "")
    .split(/\r?\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  return {
    "@type": "PostalAddress",
    streetAddress: lines[0] || undefined,
    addressLocality: lines[1] || undefined,
    addressCountry: lines[2] || "Germany",
  };
}

/** JSON-LD describing the practice — render on the home and about pages. */
export function medicalBusinessLd(options: SiteOptions) {
  const telephone = [options.phone_1, options.phone_2].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: options.practice_name || "Ärztliche Privatpraxis Bettina Wittmann",
    url: SITE_URL,
    email: options.email || undefined,
    telephone: telephone[0] || undefined,
    image: options.hero_image?.url || undefined,
    address: postalAddress(options.address),
    medicalSpecialty: "DermatologicSurgery",
  };
}

/** JSON-LD describing a single treatment as a MedicalProcedure. */
export function medicalProcedureLd(treatment: Treatment, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.title.rendered,
    description: treatment.acf_data.teaser || undefined,
    url: `${SITE_URL}${path}`,
    image: treatment.acf_data.hero_image?.url || undefined,
  };
}

/** JSON-LD FAQ block built from a treatment's FAQ repeater. */
export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** JSON-LD breadcrumb trail. `items` are [label, path] pairs. */
export function breadcrumbLd(items: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}
