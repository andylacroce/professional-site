import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("lists the site root with a recent lastModified date", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      url: "https://andrewlacroce.com",
      changeFrequency: "monthly",
      priority: 1,
    });
    expect(entries[0].lastModified).toBeInstanceOf(Date);
  });
});
