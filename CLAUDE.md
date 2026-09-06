@AGENTS.md

# Project

Personal portfolio/resume site for Andrew Lacroce (andrewlacroce.com). Single-page Next.js 16 App Router site, Tailwind CSS v4, TypeScript. `output: "export"` in `next.config.ts` — this always builds to a static `out/` directory; there is no server-rendered/dynamic mode in production. Deployed to Vercel, which runs the `package.json` `build` script as-is (not a Vercel-specific build command) and serves the resulting `out/`.

No CMS, no database, no API routes. The only "backend" behavior is the Contact form, which POSTs directly to Formspree from the client and is gated by a Cloudflare Turnstile widget (both keys embedded in `Contact.tsx` are public site keys, not secrets — Formspree/Turnstile own the actual secret).

## Critical gotcha: `scripts/fix-static-export-paths.mjs`

This postbuild script rewrites root-relative asset paths in the exported HTML so `out/index.html` can also be opened directly via `file://`. **It must never rewrite anything under `/_next` to a relative path.** Next's client runtime embeds those same absolute paths inside the JS bundle itself (its chunk manifest, and the stylesheet `<link>` React's hydration matches by exact href) to track which scripts/styles have loaded. If the HTML's copy of those paths is made relative while the bundle's own copy stays absolute, the two desync and hydration hangs forever — silently, no console error, no crash. This was a real shipped bug (found via the Playwright E2E suite, which is exactly why it tests the static export target, not just `next dev`) affecting nav highlighting, the contact-form toggle, and the captcha flow on the live production site. Paths under `/_next` already resolve correctly under plain HTTP (both `npx serve out` and Vercel), so there is nothing to fix for the two ways this export is actually served — only `/logos/` and `/profile-pic.jpg` need the relative rewrite, and only for the `file://` case.

If you ever touch this script, verify the fix by building, then running the real E2E suite against the static target (`npm run build && npm run test:e2e`) — a component's `onClick` handlers silently not firing is the symptom, and it will NOT show up as a build error or an obvious visual difference.

## Testing & CI

- **Unit/component tests**: Vitest + React Testing Library, colocated in `src/**/__tests__/`. 90% coverage gate (statements/branches/functions/lines) enforced in `vitest.config.mts`. `src/app/layout.tsx` is excluded from coverage — it's the root `<html>/<body>` shell with `next/font`, impractical to mount with RTL, and is exercised for real by every E2E run instead.
- **E2E tests**: Playwright, in `e2e/`. Two targets: the built static export (`out/`, served via `serve`) and a single `next dev` smoke project. The static export is the deploy target and a stateless file server — fast, and has never flaked. `next dev` is a single process that compiles routes on demand; throwing more than one project at it concurrently produced unpredictable hydration timeouts under parallel load, which is why it's deliberately down to one project (`desktop-dynamic`), not a full viewport matrix. Don't add more dynamic-target projects without re-verifying this — it's a real, reproduced contention issue, not a hypothetical one.
- Network calls to Formspree and Cloudflare Turnstile are stubbed in `e2e/fixtures.ts` (`page.route` abort) — every spec should import `test`/`expect`/`gotoHome` from `./fixtures`, not straight from `@playwright/test`, or a test could fire a real form submission.
- `gotoHome()` in `e2e/fixtures.ts` waits on `document.documentElement.dataset.hydrated === "true"` (set by `Nav.tsx` on mount) rather than `networkidle` — the static export especially can finish "loading" before React has actually hydrated, and a click before that point silently no-ops instead of failing loudly.
- Visual regression baselines (`e2e/**/*-snapshots/*-win32.png`) are Windows-rendered. Playwright namespaces snapshots by OS, so CI runs on `windows-latest` (not `ubuntu-latest`) to keep them meaningful — there was no Docker available to generate Linux-matching baselines instead. If that ever changes, regenerate baselines with `npm run test:e2e:update-snapshots` from whatever environment CI will actually run in.
- `npm run ci` (`scripts/run-ci.mjs`) is the single entry point: lint → typecheck → unit tests+coverage → build → E2E, in that order, stopping at the first failure. It always prints a colored terminal summary at the end (per-gate pass/fail + timing, coverage vs. threshold, E2E pass/fail/flaky counts) regardless of where it stopped. `.github/workflows/ci.yml` just runs `npm run ci` as one step — keep step-by-step logic in the script, not duplicated in the workflow YAML.
- Build runs once, before E2E (not after) — the static-export E2E target serves the existing `out/` rather than rebuilding it. If you run `npm run test:e2e` directly (skipping `npm run ci`), build first, or the static-target tests run against a stale/missing `out/`.

## Linting

`eslint.config.mjs` extends `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`, `--max-warnings=0` enforced. `e2e/**/*.ts` has `react-hooks/rules-of-hooks` turned off — Playwright's fixture API takes a callback parameter literally named `use`, which that rule mistakes for React 19's `use()` hook outside a component; it's not React code.

Next.js 16 removed `next lint`; there is no `eslint` option in `next.config.ts` anymore — ESLint runs standalone via the CLI (`npm run lint`), not as part of `next build`.

Markdown files are linted separately (`npm run lint:md`, `markdownlint-cli2`, config in `.markdownlint-cli2.jsonc`) — same rule engine as VS Code's built-in markdownlint extension, so an IDE warning on a `.md` file will also fail this. `MD013` (line length) and `MD041` (first line must be a heading) are disabled repo-wide: docs here use long-form prose, and `CLAUDE.md` intentionally starts with `@AGENTS.md` (Claude Code's file-import syntax).

## Working in this repo

- Read `node_modules/next/dist/docs/` for anything Next-API-specific before assuming training-data knowledge applies — see `AGENTS.md`.
- This is a small, single-maintainer personal site. Favor small, well-justified dependencies and config over heavier "enterprise" defaults (see the E2E project trimming above) — this project has repeatedly needed *less* machinery, not more, to stay fast and reliable.
- `SECURITY.md`, `.github/dependabot.yml` (daily npm + GitHub Actions updates), and `.github/workflows/codeql.yml` (JS/TS, `security-extended` + `security-and-quality` queries) are already set up and scoped to this project's actual shape (no backend, no user data) — don't reintroduce generic template boilerplate into them.
