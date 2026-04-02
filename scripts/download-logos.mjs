import { createWriteStream, mkdirSync } from "fs";
import { get } from "https";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/logos");

mkdirSync(outDir, { recursive: true });

const logos = [
  { name: "kyndryl", domain: "kyndryl.com" },
  { name: "flexe", domain: "flexe.com" },
  { name: "comcast", domain: "comcast.com" },
  { name: "radial", domain: "radial.com" },
  { name: "lrn", domain: "lrn.com" },
  { name: "aon", domain: "aon.com" },
];

function download(domain, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(`https://logo.clearbit.com/${domain}`, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        get(res.headers.location, (r) => r.pipe(file).on("finish", resolve).on("error", reject));
      } else {
        res.pipe(file).on("finish", resolve).on("error", reject);
      }
    }).on("error", reject);
  });
}

for (const { name, domain } of logos) {
  const dest = join(outDir, `${name}.png`);
  try {
    await download(domain, dest);
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}: ${e.message}`);
  }
}
