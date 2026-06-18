import { describe, it, expect, vi } from "vitest";

vi.mock("./config", () => ({
  SITE_URL: "https://site.test",
  SITE_LOCALE: "en",
}));

import { buildMetadata, faqLd } from "./seo";

describe("buildMetadata", () => {
  it("sets a canonical URL from SITE_URL and the path", () => {
    const meta = buildMetadata({ title: "Botox", path: "/treatments/botox" });
    expect(meta.alternates?.canonical).toBe("https://site.test/treatments/botox");
  });

  it("appends the brand once to a brand-less title", () => {
    const meta = buildMetadata({
      title: "Botox",
      description: "Soften lines",
      path: "/treatments/botox",
    });
    expect(meta.title).toEqual({
      absolute: "Botox | Privatpraxis Bettina Wittmann",
    });
    expect(meta.description).toBe("Soften lines");
  });

  it("does not double the brand when the title already includes it", () => {
    const meta = buildMetadata({
      title: "Botox | Privatpraxis Bettina Wittmann",
      path: "/treatments/botox",
    });
    expect(meta.title).toEqual({
      absolute: "Botox | Privatpraxis Bettina Wittmann",
    });
  });

  it("falls back when title/description are empty", () => {
    const meta = buildMetadata({
      title: "",
      description: "",
      path: "/x",
      fallbackTitle: "Default Title",
      fallbackDescription: "Default Desc",
    });
    expect(meta.title).toEqual({
      absolute: "Default Title | Privatpraxis Bettina Wittmann",
    });
    expect(meta.description).toBe("Default Desc");
  });

  it("uses a large summary card only when an image is present", () => {
    const withImg = buildMetadata({ title: "A", path: "/a", image: "https://img" });
    const withoutImg = buildMetadata({ title: "A", path: "/a" });
    const card = (m: ReturnType<typeof buildMetadata>) =>
      (m.twitter as { card?: string } | undefined)?.card;
    expect(card(withImg)).toBe("summary_large_image");
    expect(card(withoutImg)).toBe("summary");
  });
});

describe("faqLd", () => {
  it("maps FAQ rows to schema.org Question entities", () => {
    const ld = faqLd([{ question: "Q1?", answer: "A1" }]) as {
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };
    expect(ld.mainEntity).toHaveLength(1);
    expect(ld.mainEntity[0].name).toBe("Q1?");
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe("A1");
  });
});
