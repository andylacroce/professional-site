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
  // /_next/** is deliberately left untouched: Next's client runtime embeds
  // those same absolute paths inside the JS bundle itself (its chunk
  // manifest, and the stylesheet <link> React's hydration matches by exact
  // href) to track which scripts/styles have loaded. Rewriting only the
  // HTML's copy of those paths to a relative form desyncs it from what the
  // bundle expects, which hangs hydration forever with no console error.
  // Root-relative /_next/** already resolves correctly under plain HTTP
  // (both `serve out` and Vercel), which are the two ways this export is
  // actually used, so there's nothing to fix for that case.
  const replacements = [
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

    // Keep the original <link> alongside the inline copy rather than
    // replacing it: React tracks that link by its data-precedence attribute
    // to know when hydration can proceed, and removing it left hydration
    // hanging forever (silently — no console error) once the export was
    // served over HTTP. The inline <style> here only exists as a fallback
    // for opening index.html directly via file://, where a <link> may load
    // with the wrong MIME type.
    nextHtml = nextHtml.replace(linkTag, `${linkTag}${inlineTag}`);
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
