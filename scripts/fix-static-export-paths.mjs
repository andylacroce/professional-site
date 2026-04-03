import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const stylesheetHrefPattern = /<link rel="stylesheet" href="([^\"]+\.css)" data-precedence="next"\/>/g;

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);
    const entryStat = await stat(fullPath);

    if (entryStat.isDirectory()) {
      files.push(...(await collectHtmlFiles(fullPath)));
      continue;
    }

    if (entry.toLowerCase().endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function rewriteFileProtocolPaths(html) {
  const replacements = [
    ["\"/_next/", "\"./_next/"],
    ["'/_next/", "'./_next/"],
    ["\\\"/_next/", "\\\"./_next/"],

    ["\"/logos/", "\"./logos/"],
    ["'/logos/", "'./logos/"],
    ["\\\"/logos/", "\\\"./logos/"],

    ["\"/profile-pic.jpg\"", "\"./profile-pic.jpg\""],
    ["'/profile-pic.jpg'", "'./profile-pic.jpg'"],
    ["\\\"/profile-pic.jpg\\\"", "\\\"./profile-pic.jpg\\\""],
  ];

  let nextHtml = html;
  for (const [from, to] of replacements) {
    nextHtml = nextHtml.split(from).join(to);
  }

  return nextHtml;
}

function rewriteInlineCssAssetPaths(css) {
  return css.replaceAll("url(/_next/", "url(./_next/");
}

function normalizeExportAssetPath(href) {
  return href.replace(/^\.\//, "").replace(/^\//, "");
}

function escapeInlineStyle(css) {
  return css.replaceAll("</style>", "<\\/style>");
}

async function inlineExportStyles(html) {
  const matches = [...html.matchAll(stylesheetHrefPattern)];

  if (matches.length === 0) {
    return html;
  }

  let nextHtml = html;

  for (const match of matches) {
    const [linkTag, href] = match;
    const cssPath = path.join(outDir, normalizeExportAssetPath(href));
    const css = rewriteInlineCssAssetPaths(await readFile(cssPath, "utf8"));
    const inlineTag = `<style data-inline-export-css="${path.basename(href)}">${escapeInlineStyle(css)}</style>`;

    nextHtml = nextHtml.replace(linkTag, inlineTag);
  }

  return nextHtml;
}

async function main() {
  const htmlFiles = await collectHtmlFiles(outDir);
  let changedCount = 0;

  for (const filePath of htmlFiles) {
    const original = await readFile(filePath, "utf8");
    const rewrittenPaths = rewriteFileProtocolPaths(original);
    const rewritten = await inlineExportStyles(rewrittenPaths);

    if (rewritten !== original) {
      await writeFile(filePath, rewritten, "utf8");
      changedCount += 1;
    }
  }

  console.log(`Rewrote static paths in ${changedCount} of ${htmlFiles.length} HTML file(s).`);
}

main().catch((error) => {
  console.error("Failed to rewrite static export paths.");
  console.error(error);
  process.exit(1);
});
