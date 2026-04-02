# andrewlacroce.com

Personal portfolio and resume site for Andrew Lacroce.

Built from scratch with Next.js 15, Tailwind CSS v4, and TypeScript. No template, no CMS. The site uses a custom dark theme, editorial typography, lightweight scroll-reveal motion, and static export for deployment on Vercel with a custom domain via Cloudflare.

## Current State

- Single-page professional site focused on TPM / EM positioning
- Fully responsive layout with mobile-specific nav behavior
- Custom dark visual system with bronze/copper accents and subtle background texture
- Coordinated font pairing for display and body copy
- Sticky in-page navigation with active section highlighting and a Home anchor
- Lightweight reveal animations with `prefers-reduced-motion` support
- Profile image used for both the hero and favicon
- Static export compatible with Vercel hosting

## Stack

- **Framework**: Next.js 15 (App Router, static export)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **UI Motion**: Custom CSS + Intersection Observer reveal wrapper
- **Typography**: Google Fonts via `next/font`
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
npm run build  # Create static production build
npm run start  # Start Next.js production server
npm run lint   # Run linting
```

## Build

```bash
npm run build
```

Outputs a static site to `out/`. Vercel handles this automatically on push.

Because the app uses `output: "export"` and `images.unoptimized`, it is designed to work cleanly as a statically exported site.

## Deployment

Pushing to `main` triggers a Vercel deployment. Custom domain `andrewlacroce.com` is managed via Cloudflare with a CNAME pointing to Vercel's edge network.
