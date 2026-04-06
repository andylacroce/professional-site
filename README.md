# andrewlacroce.com

Personal portfolio and resume site for Andrew Lacroce.

Built from scratch with Next.js 15, Tailwind CSS v4, and TypeScript. No template, no CMS. The site uses a custom dark theme, editorial typography, lightweight scroll-reveal motion, and is deployed on Vercel with a custom domain via Cloudflare. It also supports static export for a loadable `out/` build.

## Current State

- Single-page professional site focused on TPM / EM positioning
- Fully responsive layout with mobile-specific nav behavior
- Custom dark visual system with bronze/copper accents and subtle background texture
- Coordinated font pairing for display and body copy
- Sticky in-page navigation with active section highlighting and a Home anchor
- Lightweight reveal animations with `prefers-reduced-motion` support
- Profile image used for both the hero and favicon
- Static export support with post-build path normalization for `file://` compatibility

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **UI Motion**: Custom CSS + Intersection Observer reveal wrapper
- **Typography**: Google Fonts via `next/font`
- **Analytics**: Vercel Analytics
- **Contact Form**: Formspree (API endpoint) + Cloudflare Turnstile (spam protection)
- **Deployment**: Vercel
- **DNS**: Cloudflare → `andrewlacroce.com`

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
    ├── About.tsx          # Professional summary
    ├── Experience.tsx     # Role history with editorial card treatment
    ├── Skills.tsx         # Grouped skill categories
    ├── Projects.tsx       # Featured project cards
    ├── Contact.tsx        # Contact links and footer note
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
npm run dev    # Start local development server
npm run build  # Create production build and export a file-loadable out/ folder
npm run start  # Start Next.js production server
npm run lint   # Run linting
```

## Build

```bash
npm run build
```

This command:

- Runs `next build` with `output: "export"`
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
