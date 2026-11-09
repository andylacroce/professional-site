import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

// Steps within a phase run concurrently; a phase only starts if the previous
// one fully passed. Typecheck waits for Build because tsc reads the
// .next/types that `next build` generates, and E2E needs the built out/.
const PHASES = [
  [
    { name: "Lint", npmScript: "lint" },
    { name: "Markdown lint", npmScript: "lint:md" },
    { name: "Unit tests", npmScript: "test:coverage" },
    { name: "Build", npmScript: "build" },
  ],
  [
    { name: "Typecheck", npmScript: "typecheck" },
    { name: "E2E tests", npmScript: "test:e2e" },
  ],
];
const STEPS = PHASES.flat();

const COVERAGE_THRESHOLD = 90;

const useColor = process.stdout.isTTY !== false && !process.env.NO_COLOR;
const paint = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = (s) => paint(1, s);
const green = (s) => paint(32, s);
const red = (s) => paint(31, s);
const yellow = (s) => paint(33, s);
const gray = (s) => paint(90, s);
const cyan = (s) => paint(36, s);

function readJson(filePath) {
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function formatDuration(ms) {
  if (ms == null) return "";
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`;
}

function pad(s, width) {
  return s + " ".repeat(Math.max(0, width - s.length));
}

function runStep(step) {
  return new Promise((resolve) => {
    const start = Date.now();
    const proc = spawn("npm", ["run", step.npmScript], { shell: true });
    let output = "";
    proc.stdout.on("data", (d) => (output += d));
    proc.stderr.on("data", (d) => (output += d));
    proc.on("close", (code) => {
      console.log(`${bold(cyan(`
▶ ${step.name}`))}
${output}`);
      resolve({ ...step, status: code === 0 ? "passed" : "failed", durationMs: Date.now() - start });
    });
  });
}

async function main() {
  const wallStart = Date.now();
  const results = [];
  let stoppedAt = null;

  for (const phase of PHASES) {
    if (stoppedAt) {
      results.push(...phase.map((step) => ({ ...step, status: "skipped" })));
      continue;
    }
    const done = await Promise.all(phase.map(runStep));
    results.push(...done);
    const failed = done.filter((r) => r.status === "failed");
    if (failed.length) stoppedAt = failed.map((r) => r.name).join(", ");
  }

  const totalDurationMs = Date.now() - wallStart;
  const overallPassed = results.every((r) => r.status === "passed");
  const nameWidth = Math.max(...STEPS.map((s) => s.name.length)) + 2;

  const lines = [];
  lines.push("");
  lines.push(bold(cyan("CI PIPELINE")));
  lines.push(gray("─".repeat(32)));

  for (const r of results) {
    const icon = r.status === "passed" ? green("✔") : r.status === "failed" ? red("✘") : gray("○");
    const name = r.status === "skipped" ? gray(pad(r.name, nameWidth)) : pad(r.name, nameWidth);
    const detail = r.status === "skipped" ? gray("skipped") : gray(formatDuration(r.durationMs));
    lines.push(`  ${icon}  ${name}${detail}`);
  }

  // Gate each detail block on its step having actually run this time (not
  // "skipped") rather than on it having passed, so a genuine failure still
  // shows real numbers — only a stale file left over from a previous run
  // needs hiding.
  const unitTestsRan = results.find((r) => r.npmScript === "test:coverage")?.status !== "skipped";
  const coverage = unitTestsRan ? readJson(path.join("coverage", "coverage-summary.json")) : null;
  if (coverage?.total) {
    lines.push("");
    lines.push(`  ${bold("Coverage")} ${gray(`(${COVERAGE_THRESHOLD}% gate)`)}`);
    for (const key of ["statements", "branches", "functions", "lines"]) {
      const pct = coverage.total[key]?.pct;
      if (pct == null) continue;
      const ok = pct >= COVERAGE_THRESHOLD;
      const icon = ok ? green("✔") : red("✘");
      const value = ok ? green(`${pct}%`) : red(`${pct}%`);
      lines.push(`    ${icon}  ${pad(key, 12)}${value}`);
    }
  }

  const e2eRan = results.find((r) => r.npmScript === "test:e2e")?.status !== "skipped";
  const e2e = e2eRan ? readJson(path.join("test-results", "results.json")) : null;
  if (e2e?.stats) {
    const s = e2e.stats;
    lines.push("");
    lines.push(`  ${bold("E2E tests")}`);
    lines.push(`    ${green("✔")}  passed   ${s.expected ?? 0}`);
    if (s.unexpected) lines.push(`    ${red("✘")}  failed   ${s.unexpected}`);
    if (s.flaky) lines.push(`    ${yellow("◐")}  flaky    ${s.flaky}`);
    if (s.skipped) lines.push(`    ${gray("○")}  skipped  ${s.skipped}`);
    lines.push(`    ${gray(`duration ${formatDuration(s.duration)}`)}`);
  }

  lines.push("");
  lines.push(
    overallPassed
      ? bold(green(`✔ CI passed  ${gray(`(${formatDuration(totalDurationMs)} total)`)}`))
      : bold(red(`✘ CI failed at "${stoppedAt}"  ${gray(`(${formatDuration(totalDurationMs)} total)`)}`)),
  );
  lines.push("");

  console.log(lines.join("\n"));
  process.exit(overallPassed ? 0 : 1);
}

main();
