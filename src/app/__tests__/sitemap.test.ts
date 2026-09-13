import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("lists the site root with a pinned lastModified date", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(1);
    expect(entries[0]).toEqual({
      url: "https://andrewlacroce.com",
      lastModified: "2026-09-12",
      changeFrequency: "monthly",
      priority: 1,
    });
  });
});
