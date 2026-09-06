import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("robots", () => {
  it("allows all crawlers and points to the sitemap", () => {
    expect(robots()).toEqual({
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: "https://andrewlacroce.com/sitemap.xml",
      host: "https://andrewlacroce.com",
    });
  });
});
