# andrewlacroce.com

Personal portfolio and resume site for Andrew Lacroce.

Built from scratch with Next.js 16, Tailwind CSS v4, and TypeScript. No template, no CMS. The site uses a custom dark theme, editorial typography, lightweight scroll-reveal motion, and is deployed on Vercel with a custom domain via Cloudflare. It also supports static export for a loadable `out/` build.

## Current State

- Single-page professional site focused on EM / TPM positioning
- Open-to-work callout in the About section linking directly to the contact form
- Contact section with collapsible cards for sending a message and booking a meeting (cal.com)
- Fully responsive layout with mobile-specific nav behavior
- Custom dark visual system with bronze/copper accents and subtle background texture
- Coordinated font pairing for display and body copy
- Sticky in-page navigation with active section highlighting and a Home anchor
- Lightweight reveal animations with `prefers-reduced-motion` support
- Profile image used for both the hero and favicon
- Static export support with post-build path normalization for `file://` compatibility
- Linting, unit/component tests, and E2E/responsive/visual-regression tests gate every build (see [Testing](#testing))

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **UI Motion**: Custom CSS + Intersection Observer reveal wrapper
- **Typography**: Google Fonts via `next/font`
- **Analytics**: Vercel Analytics
- **Contact Form**: Formspree (API endpoint) + Cloudflare Turnstile (spam protection)
- **Meeting Scheduling**: cal.com (`cal.com/andrew-lacroce`)
- **Deployment**: Vercel
- **DNS**: Cloudflare → `andrewlacroce.com`
- **Linting**: ESLint (`eslint-config-next`, zero warnings enforced)
- **Unit/Component Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright

## Structure

```text
public/
├── logos/               # Company logos used in Experience
└── profile-pic.jpg      # Hero image and favicon source

src/
├── app/
│   ├── layout.tsx        # Metadata, global CSS
│   ├── page.tsx          # Root page, composes all sections
│   └── globals.css       # Theme tokens, texture, motion, shared utility styles
└── components/
    ├── Nav.tsx            # Sticky nav with active-section highlighting
    ├── Hero.tsx           # Headline, summary, profile image, social links
    ├── About.tsx          # Professional summary and open-to-work callout
    ├── Experience.tsx     # Role history with editorial card treatment
    ├── Skills.tsx         # Grouped skill categories
    ├── Projects.tsx       # Featured project cards
    ├── Contact.tsx        # LinkedIn link, collapsible message form, and meeting scheduler
    ├── Reveal.tsx         # Reusable scroll-reveal wrapper
    └── SectionHeader.tsx  # Shared section heading component
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev                       # Start local development server
npm run build                     # Create production build and export a file-loadable out/ folder
npm run start                     # Start Next.js production server
npm run lint                      # ESLint, zero warnings allowed
npm run lint:md                   # markdownlint-cli2 (same rules as the VS Code extension)
npm run typecheck                 # tsc --noEmit
npm run test                      # Run unit/component tests once (Vitest)
npm run test:watch                # Unit tests in watch mode
npm run test:coverage             # Unit tests with the 90% coverage gate
npm run test:e2e                  # Run the full Playwright suite (needs a prior `npm run build` — see below)
npm run test:e2e:update-snapshots # Regenerate visual regression baselines
npm run ci                        # lint -> typecheck -> test:coverage -> build -> test:e2e, with a summary at the end
```

## Testing

- **Unit/component tests** (`src/**/__tests__/`, Vitest + React Testing Library) cover component rendering and behavior — Nav's scroll-driven active-link highlighting, Reveal's IntersectionObserver logic, Contact's form/Turnstile/deep-linking flows, and the page composition. Coverage is enforced at 90% (statements/branches/functions/lines) via `vitest.config.mts`.
- **E2E tests** (`e2e/`, Playwright) run the full functional/responsive/visual-regression matrix across mobile/tablet/desktop viewports against the actual static-export build (`out/`) served the way it ships, plus a single smoke project against `next dev`. Network calls to Formspree and Cloudflare Turnstile are stubbed (`e2e/fixtures.ts`) so tests never fire a real submission.
  - The static export is the deploy target and a stateless file server, so it's fast and reliable. `next dev` is a single process that compiles routes on demand; throwing the full viewport matrix at it produced occasional, unpredictable hydration timeouts under parallel load, so it only gets one project (`desktop-dynamic`) as a "the dev server basically works" check.
- The static-export target serves whatever's already in `out/` rather than rebuilding it, so a full `next build` isn't duplicated on every E2E run. Run `npm run build` first if you're calling `npm run test:e2e` directly instead of through `npm run ci` — otherwise those tests run against a stale (or missing) `out/`.
- Visual baselines under `e2e/**/*-snapshots/` are Windows-rendered PNGs; CI runs on `windows-latest` to keep them meaningful (Playwright namespaces snapshots by OS, and no Docker was available locally to produce Linux-matching baselines instead).
- `npm run ci` (`scripts/run-ci.mjs`) is what `.github/workflows/ci.yml` runs, so it's the fastest way to reproduce a CI failure locally. It runs each gate in order, stops at the first failure, and always ends with a compact colored summary — per-gate pass/fail and timing, coverage vs. the 90% threshold, and E2E pass/fail/flaky counts — whether the run succeeded or not. Console output otherwise stays quiet (the `dot` reporter); GitHub Actions additionally gets PR annotations for E2E failures.

## Build

```bash
npm run build
```

This command:

- Runs `next build` with `output: "export"` (via `cross-env NODE_OPTIONS=--no-deprecation` to suppress a Node 26 deprecation from Next.js internals)
- Generates static files in `out/`
- Runs `scripts/fix-static-export-paths.mjs` to rewrite root-relative asset paths for clean local file loading

Vercel handles this automatically on push.

## Static Export

The exported site is generated in `out/` and is intended to be directly loadable as static files.

- Entry file: `out/index.html`
- Static assets: `out/_next/`, `out/logos/`, `out/profile-pic.jpg`

To preview locally with a static server:

```bash
npx serve out
```

You can also open `out/index.html` directly from disk.

## Deployment

Pushing to `main` triggers a Vercel deployment. Custom domain `andrewlacroce.com` is managed via Cloudflare with a CNAME pointing to Vercel's edge network.
