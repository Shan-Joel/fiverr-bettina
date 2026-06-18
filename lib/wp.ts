/**
 * The ONLY module that talks to WordPress.
 *
 * Every request is built from WP_API_URL (via lib/config.ts) through wpUrl().
 * No WordPress hostname appears anywhere else in the codebase, so repointing
 * the site at a new backend is a one-line .env change.
 */

import { WP_API_URL } from "./config";
import type { Treatment, WpPage, SiteOptions } from "./types";

type QueryParams = Record<string, string | number>;

/** Build a full WordPress REST URL from a path and optional query params. */
export function wpUrl(path: string, params?: QueryParams): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${WP_API_URL}/wp-json${clean}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function wpFetch<T>(path: string, params?: QueryParams): Promise<T> {
  const res = await fetch(wpUrl(path, params), {
    // Caching disabled: every request fetches fresh data straight from WordPress,
    // so edits appear in real time on any backend — no ISR wait, no webhook, no
    // per-backend setup. Trade-off: each page render waits on WordPress.
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`WordPress request failed (${res.status}) for ${path}`);
  }
  return (await res.json()) as T;
}

/** Site-wide settings (hero, contact block, footer, SEO defaults). */
export async function getOptions(): Promise<SiteOptions> {
  return wpFetch<SiteOptions>("/site/v1/options");
}

/** All treatments, ordered by the ACF `order` field (ascending). */
export async function getTreatments(): Promise<Treatment[]> {
  const list = await wpFetch<Treatment[]>("/wp/v2/treatments", {
    per_page: 50,
    _fields: "id,slug,title,acf_data",
  });
  return [...list].sort(
    (a, b) => (a.acf_data?.order ?? 99) - (b.acf_data?.order ?? 99),
  );
}

/** A single treatment by slug, or null if it does not exist. */
export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const list = await wpFetch<Treatment[]>("/wp/v2/treatments", {
    slug,
    _fields: "id,slug,title,acf_data",
  });
  return list[0] ?? null;
}

/** A single WordPress page by slug, or null if it does not exist. */
export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  const list = await wpFetch<WpPage[]>("/wp/v2/pages", {
    slug,
    _fields: "id,slug,title,content,acf_data",
  });
  return list[0] ?? null;
}
