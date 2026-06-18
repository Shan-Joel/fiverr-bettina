import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getTreatments } from "@/lib/wp";

export const revalidate = 2;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const treatments = await getTreatments();
  const now = new Date();

  const staticRoutes = ["", "/about", "/contact", "/imprint", "/privacy"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const treatmentRoutes = treatments.map((t) => ({
    url: `${SITE_URL}/treatments/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...treatmentRoutes];
}
