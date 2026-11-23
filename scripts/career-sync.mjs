// Regenerates career/linkedin.md and career/facts.md from src/data/career.json.
//   npm run career:sync   write the generated files
//   npm run career:check  exit 1 if the data is inconsistent or the files are stale
// Imports TypeScript directly: needs Node 22.18+ (type stripping on by default).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderFacts, renderLinkedIn, validateCareer } from "../src/lib/career.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const career = JSON.parse(readFileSync(path.join(root, "src/data/career.json"), "utf8"));
const checkOnly = process.argv.includes("--check");

const problems = validateCareer(career);
if (problems.length > 0) {
  console.error("career.json is inconsistent:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const outputs = {
  "career/linkedin.md": renderLinkedIn(career),
  "career/facts.md": renderFacts(career),
};

let stale = false;
for (const [file, content] of Object.entries(outputs)) {
  const target = path.join(root, file);
  if (checkOnly) {
    let current = null;
    try {
      current = readFileSync(target, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (current !== content) {
      console.error(`${file} is out of date. Run: npm run career:sync`);
      stale = true;
    }
  } else {
    // Write unconditionally: no check-then-write window, and output is deterministic.
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, content);
    console.log(`wrote ${file}`);
  }
}
if (stale) process.exit(1);
if (checkOnly) console.log("career data consistent and generated files up to date");
