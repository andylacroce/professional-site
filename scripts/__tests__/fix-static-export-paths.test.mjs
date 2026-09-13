import { describe, expect, it } from "vitest";
import { rewriteFileProtocolPaths } from "../fix-static-export-paths.mjs";

describe("rewriteFileProtocolPaths", () => {
  it("never rewrites /_next paths", () => {
    const html = [
      '<link rel="stylesheet" href="/_next/static/css/app.css" data-precedence="next"/>',
      '<script src="/_next/static/chunks/main.js"></script>',
      "<script>self.__next_f.push([1,\"/_next/static/chunks/1234.js\"])</script>",
    ].join("\n");

    expect(rewriteFileProtocolPaths(html)).toBe(html);
  });

  it("rewrites the known root-relative asset paths to relative form", () => {
    const html = [
      '<img src="/logos/example.svg" alt="" />',
      "<img src='/logos/example.svg' alt='' />",
      '<img src=\\"/logos/example.svg\\" alt=\\"\\" />',
      '<meta property="og:image" content="/profile-pic.jpg" />',
      '<link rel="icon" href="/icon.jpg" />',
      '<link rel="apple-touch-icon" href="/apple-icon.jpg" />',
    ].join("\n");

    const rewritten = rewriteFileProtocolPaths(html);

    expect(rewritten).toContain('src="./logos/example.svg"');
    expect(rewritten).toContain("src='./logos/example.svg'");
    expect(rewritten).toContain('src=\\"./logos/example.svg\\"');
    expect(rewritten).toContain('content="./profile-pic.jpg"');
    expect(rewritten).toContain('href="./icon.jpg"');
    expect(rewritten).toContain('href="./apple-icon.jpg"');
    expect(rewritten).not.toMatch(/["'\\]\/(?:logos|profile-pic\.jpg|icon\.jpg|apple-icon\.jpg)/);
  });

  it("leaves unrelated absolute paths untouched", () => {
    const html = '<a href="/#contact">Contact</a>';
    expect(rewriteFileProtocolPaths(html)).toBe(html);
  });
});
