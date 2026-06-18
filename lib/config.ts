/**
 * Central configuration — the SINGLE place the WordPress backend URL is read.
 *
 * Everything that talks to WordPress (the REST client in lib/wp.ts and the
 * image host allow-list in next.config.ts) derives from WP_API_URL. To point
 * the whole site at a different WordPress install, change WP_API_URL in your
 * environment (.env.local locally, or the host's env vars in production) and
 * redeploy. Nothing else needs to change.
 */

function requireEnv(name: string, value: string | undefined): string {
  if (!value || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set it in .env.local (see .env.example).`,
    );
  }
  return value.trim();
}

/** Base URL of the WordPress install, without a trailing slash or /wp-json. */
export const WP_API_URL = requireEnv("WP_API_URL", process.env.WP_API_URL).replace(/\/+$/, "");

/** Hostname of the WordPress install — used to allow-list remote images. */
export const WP_HOSTNAME = new URL(WP_API_URL).hostname;

/** Protocol of the WordPress install (http/https) — used for image patterns. */
export const WP_PROTOCOL = new URL(WP_API_URL).protocol.replace(":", "") as "http" | "https";

/** Public URL of this Next.js site — used for canonical URLs, sitemap, OG. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

/**
 * ISR revalidation window (seconds) for WordPress data fetches.
 * Content edits in WordPress appear on the live site within this window.
 * Note: each route file in app/ also sets `export const revalidate = 2`
 * (Next.js requires a literal there) — keep these two values in sync.
 *
 * 2s is a TESTING value. For production, raise this back to ~30–60s (or use
 * on-demand revalidation) so pages aren't regenerated on almost every request.
 */
export const REVALIDATE_SECONDS = 2;

/** Site locale. The site is English now; this is the single switch for i18n later. */
export const SITE_LOCALE = "en";
