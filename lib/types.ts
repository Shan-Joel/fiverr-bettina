/**
 * TypeScript shapes for the WordPress REST responses this site consumes.
 *
 * ACF fields are exposed via the custom `acf_data` REST field (registered in a
 * WPCode snippet on the WordPress side), which returns fully-formatted values:
 * images become objects, galleries become arrays of image objects, and
 * repeaters become arrays of rows. Empty fields come back as null.
 */

export interface WpImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface Benefit {
  heading: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface TreatmentAcf {
  hero_image: WpImage | null;
  gallery: WpImage[] | null;
  teaser: string;
  body: string;
  benefits: Benefit[] | null;
  faq: Faq[] | null;
  seo_title: string;
  seo_description: string;
  order: number;
}

export interface Treatment {
  id: number;
  slug: string;
  title: { rendered: string };
  acf_data: TreatmentAcf;
}

export interface PageAcf {
  page_image: WpImage | null;
  intro: string;
  seo_title: string;
  seo_description: string;
}

export interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf_data: PageAcf;
}

export interface SiteOptions {
  // Hero
  hero_eyebrow: string;
  hero_heading: string;
  hero_subtext: string;
  hero_cta_label: string;
  hero_cta2_label: string;
  booking_url: string;
  hero_image: WpImage | null;
  // Homepage sections
  philosophy_eyebrow: string;
  philosophy_text: string;
  treatments_eyebrow: string;
  treatments_heading: string;
  about_eyebrow: string;
  about_heading: string;
  about_cta_label: string;
  cta_heading: string;
  cta_text: string;
  // Branding
  logo_line1: string;
  logo_line2: string;
  // Contact & footer
  practice_name: string;
  address: string;
  phone_1: string;
  phone_2: string;
  email: string;
  footer_text: string;
  // SEO
  seo_default_title: string;
  seo_default_description: string;
}
