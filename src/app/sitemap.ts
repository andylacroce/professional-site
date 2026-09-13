import type { MetadataRoute } from "next";

// Route handlers must be explicitly marked static to build under output: "export".
export const dynamic = "force-static";

// Pinned so the generated sitemap.xml doesn't change on every build for a
// single-page site whose content rarely moves; bump when content changes.
const lastModified = "2026-09-12";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://andrewlacroce.com",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
