import type { Metadata } from "next";
import "./globals.css";
import { display, body } from "@/lib/fonts";
import { SITE_LOCALE, SITE_URL } from "@/lib/config";
import { getOptions, getTreatments } from "@/lib/wp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const options = await getOptions();
  const title =
    options.seo_default_title ||
    "Ärztliche Privatpraxis Bettina Wittmann | Aesthetic & Laser Medicine";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Privatpraxis Bettina Wittmann",
    },
    description: options.seo_default_description || "",
    // Favicon/touch icons are auto-detected from app/icon.svg, app/favicon.ico, app/apple-icon.png
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [options, treatments] = await Promise.all([
    getOptions(),
    getTreatments(),
  ]);
  const navTreatments = treatments.map((t) => ({
    slug: t.slug,
    title: t.title.rendered,
  }));

  return (
    <html
      lang={SITE_LOCALE}
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <Header
          treatments={navTreatments}
          logoLine1={options.logo_line1 || undefined}
          logoLine2={options.logo_line2 || undefined}
        />
        <main className="flex-1">{children}</main>
        <Footer options={options} treatments={treatments} />
      </body>
    </html>
  );
}
