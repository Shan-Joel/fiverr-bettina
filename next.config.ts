import type { NextConfig } from "next";

/**
 * Image host allow-list is derived from WP_API_URL — the same single source the
 * REST client uses. No WordPress hostname is hardcoded here, so repointing the
 * backend (one .env change) automatically authorises its media domain too.
 */
const wpApiUrl = process.env.WP_API_URL;
const wpUrl = wpApiUrl ? new URL(wpApiUrl) : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: wpUrl
      ? [
          {
            protocol: wpUrl.protocol.replace(":", "") as "http" | "https",
            hostname: wpUrl.hostname,
            pathname: "/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
