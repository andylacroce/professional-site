import type { MetadataRoute } from "next";

// Route handlers must be explicitly marked static to build under output: "export".
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://andrewlacroce.com/sitemap.xml",
    host: "https://andrewlacroce.com",
  };
}
