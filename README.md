# andrewlacroce.com

Personal portfolio and resume site for Andrew Lacroce.

Built from scratch with Next.js 15, Tailwind CSS v4, and TypeScript. No template, no CMS. Static export deployed to Vercel with a custom domain via Cloudflare.

## Stack

- **Framework**: Next.js 15 (App Router, static export)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Deployment**: Vercel
- **DNS**: Cloudflare → `andrewlacroce.com`

## Structure

```
src/
├── app/
│   ├── layout.tsx        # Metadata, global CSS
│   ├── page.tsx          # Root page, composes all sections
│   └── globals.css       # CSS custom properties, dark theme
└── components/
    ├── Nav.tsx            # Sticky nav, frosted-glass on scroll
    ├── Hero.tsx           # Name, title, tagline, social links
    ├── About.tsx          # Bio
    ├── Experience.tsx     # Timeline of roles
    ├── Skills.tsx         # Grouped skill categories
    ├── Projects.tsx       # Project cards
    ├── Contact.tsx        # Email + LinkedIn
    └── SectionHeader.tsx  # Shared section label component
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Outputs a static site to `out/`. Vercel handles this automatically on push.

## Deployment

Pushing to `main` triggers a Vercel deployment. Custom domain `andrewlacroce.com` is managed via Cloudflare with a CNAME pointing to Vercel's edge network.
