import { defineConfig, devices } from "@playwright/test";

const DYNAMIC_PORT = 3000;
const STATIC_PORT = 3100;

const TARGETS = {
  dynamic: { baseURL: `http://localhost:${DYNAMIC_PORT}` },
  static: { baseURL: `http://localhost:${STATIC_PORT}` },
} as const;

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
} as const;

type Target = keyof typeof TARGETS;
type Viewport = keyof typeof VIEWPORTS;

function functionalProject(viewport: Viewport, target: Target, device: keyof typeof devices) {
  return {
    name: `${viewport}-${target}`,
    testMatch: /(nav|responsive)\.spec\.ts$/,
    use: {
      ...devices[device],
      viewport: VIEWPORTS[viewport],
      baseURL: TARGETS[target].baseURL,
    },
  };
}

function visualProject(viewport: Viewport, target: Target) {
  return {
    name: `visual-${viewport}-${target}`,
    testMatch: /visual\.spec\.ts$/,
    // Pinned to Chromium so baselines stay stable across machines instead
    // of drifting with per-engine font rendering; the functional/responsive
    // projects above already exercise WebKit and Firefox.
    use: {
      ...devices["Desktop Chrome"],
      viewport: VIEWPORTS[viewport],
      baseURL: TARGETS[target].baseURL,
    },
  };
}

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // The dynamic target (`next dev`) is a single Node process that compiles
  // routes on demand; unbounded local parallelism (the previous `undefined`
  // here resolved to ~12 workers on a 24-core machine) queued enough
  // concurrent first-hits against it to occasionally blow past the default
  // 30s test timeout. A moderate fixed cap keeps that queue short instead
  // of papering over it with a longer timeout or extra retries — both of
  // which only made a bad run slower, not more likely to pass.
  workers: process.env.CI ? 2 : 6,
  // 30s (Playwright's default) is far more than this site legitimately
  // needs; 10s is generous for even a cold `next dev` compile once the
  // worker cap above stops those from queuing behind each other.
  timeout: 10_000,
  // "dot" stays quiet across 13 projects everywhere (local `npm run ci`
  // included, not just real CI) and still prints failures in full; "html"
  // is always written as an artifact but never auto-opened. GITHUB_ACTIONS
  // (set only by actual Actions runners, unlike the generic CI var a dev
  // shell might also set) additionally turns failures into PR annotations
  // — that reporter prints raw ::error/%0A escapes outside that context, so
  // it must stay gated on the real thing, not just "some CI-like env".
  reporter: [
    ["dot"],
    ["html", { open: "never" }],
    // Machine-readable stats for scripts/run-ci.mjs's terminal summary.
    ["json", { outputFile: "test-results/results.json" }],
    ...(process.env.GITHUB_ACTIONS ? [["github"] as const] : []),
  ],
  outputDir: "test-results",
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // Reveal.tsx's scroll-in animation honors prefers-reduced-motion by
    // showing content immediately; forcing it keeps every test (visual
    // screenshots especially) from racing an in-flight CSS transition.
    reducedMotion: "reduce",
  },
  expect: {
    // Fonts/anti-aliasing differ slightly across machines; a small tolerance
    // avoids flaking on noise while still catching real layout regressions.
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  projects: [
    // Full responsive/functional matrix against the static export — this is
    // what's actually deployed, and it's a stateless file server, so it's
    // fast and has never once flaked in testing this config.
    functionalProject("mobile", "static", "iPhone 14"),
    functionalProject("tablet", "static", "Desktop Chrome"),
    functionalProject("desktop", "static", "Desktop Chrome"),
    // A single smoke project against `next dev`, not one per viewport: it's
    // a single Node process compiling routes on demand, and every one of
    // these projects hitting it concurrently produced an occasional (and
    // unpredictable — different project each time) hydration timeout. The
    // static matrix above already covers responsive behavior exhaustively;
    // this just confirms the dev server itself basically works.
    functionalProject("desktop", "dynamic", "Desktop Chrome"),
    {
      // Static, not dynamic: every flaky/slow run so far has been against
      // `next dev`, and Firefox specifically adds its own overhead there
      // (it logs failed connection attempts to the dev server's HMR
      // websocket). This still gets real cross-engine coverage without
      // adding another consumer of that single dev-compile process.
      name: "desktop-firefox-static",
      testMatch: /nav\.spec\.ts$/,
      use: { ...devices["Desktop Firefox"], viewport: VIEWPORTS.desktop, baseURL: TARGETS.static.baseURL },
    },

    // Automated visual regression, against the static export only: that's
    // what actually ships, and the risk this config once caught (the
    // postbuild path-rewrite silently breaking hydration) was a JS/behavior
    // bug, not a rendering divergence from `next dev` — so a second copy of
    // these against the dynamic target added contention against its single
    // dev-compile process without adding real signal.
    visualProject("mobile", "static"),
    visualProject("tablet", "static"),
    visualProject("desktop", "static"),
  ],
  webServer: [
    {
      command: "npm run dev",
      url: TARGETS.dynamic.baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      // Serves the existing out/ rather than rebuilding it: `npm run ci`
      // already runs `build` once before `test:e2e`, so rebuilding here
      // duplicated a full ~15-20s Next.js compile on every run. Running
      // `test:e2e` on its own (skipping straight past `build`) will serve
      // whatever out/ currently holds, so build first — `npm run ci` (or
      // `npm run build && npm run test:e2e`) is the way to get a fresh one.
      command: `npx serve out -l ${STATIC_PORT}`,
      url: TARGETS.static.baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
