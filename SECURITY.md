# Security Policy

This repository is the source for [andrewlacroce.com](https://andrewlacroce.com), a static personal portfolio site. It has no user accounts, no database, and no server-side API routes — it's a Next.js app exported as static HTML (`output: "export"` in `next.config.ts`) and deployed to Vercel.

## Scope

Given the site's shape, realistic risk areas are:

- **Supply chain** — vulnerabilities in npm dependencies (tracked via Dependabot and `npm audit`).
- **Build/CI integrity** — the GitHub Actions workflows in `.github/workflows/`.
- **Third-party integrations** — the contact form posts to [Formspree](https://formspree.io/) and is gated by [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/); both keys embedded in the client (`Contact.tsx`) are public-by-design site keys, not secrets.
- **XSS/injection** — the only dynamically-constructed markup is the JSON-LD schema in `src/app/layout.tsx`, built from static, non-user-controlled strings.

There is no user-submitted content rendered back to other visitors, so stored/reflected XSS from site content is not applicable.

## Supported Versions

This project is continuously deployed from the `main` branch — there is no versioned release history to maintain. Only the current `main` branch receives fixes; there is nothing to backport to.

## Reporting a Vulnerability

Please **do not open a public GitHub issue** for a suspected vulnerability.

Instead, use [GitHub's private vulnerability reporting](https://github.com/andylacroce/professional-site/security/advisories/new) for this repository (Security tab → "Report a vulnerability"). If that's unavailable, reach out via the contact form at [andrewlacroce.com](https://andrewlacroce.com/#contact-form).

Include what you found, the steps to reproduce it, and its potential impact. As a solo-maintained personal project there's no formal SLA, but reports are taken seriously and acknowledged as soon as possible.

## Automated Checks

- **Dependabot** (`.github/dependabot.yml`) opens weekly PRs for npm and GitHub Actions dependency updates.
- **CodeQL** (`.github/workflows/codeql.yml`) scans JavaScript/TypeScript on every push/PR to `main` and on a weekly schedule.
- **CI** (`.github/workflows/ci.yml`) runs linting, type-checking, unit tests (with a coverage gate), and end-to-end tests before every build.
