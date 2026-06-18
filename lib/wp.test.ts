import { describe, it, expect, vi } from "vitest";

// Mock the single config source so the test is independent of real env vars.
vi.mock("./config", () => ({
  WP_API_URL: "https://example.com/wp",
  REVALIDATE_SECONDS: 300,
}));

import { wpUrl } from "./wp";

describe("wpUrl", () => {
  it("builds a REST URL from WP_API_URL and a path", () => {
    expect(wpUrl("/wp/v2/treatments")).toBe(
      "https://example.com/wp/wp-json/wp/v2/treatments",
    );
  });

  it("tolerates a path without a leading slash", () => {
    expect(wpUrl("site/v1/options")).toBe(
      "https://example.com/wp/wp-json/site/v1/options",
    );
  });

  it("appends query parameters", () => {
    expect(wpUrl("/wp/v2/pages", { slug: "about" })).toBe(
      "https://example.com/wp/wp-json/wp/v2/pages?slug=about",
    );
  });

  it("serialises numeric query parameters", () => {
    expect(wpUrl("/wp/v2/treatments", { per_page: 50 })).toBe(
      "https://example.com/wp/wp-json/wp/v2/treatments?per_page=50",
    );
  });
});
