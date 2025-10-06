# Storyframe Studio — Photography Coach Site

A bilingual (Arabic/English) photography coaching experience built with Next.js 14 App Router, Tailwind CSS, and GSAP-driven motion.

## Getting Started

```bash
pnpm install
pnpm dev
```

If you prefer npm or yarn, swap the commands accordingly.

The development server runs on [http://localhost:3000](http://localhost:3000). Edits in the `/app` or `/components` directories automatically hot-reload.

## Scripts

- `pnpm dev` – start the local development server.
- `pnpm build` – create an optimized production build.
- `pnpm start` – run the production build locally.
- `pnpm lint` – lint the project with Next.js defaults.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (JIT) with custom design tokens
- GSAP + ScrollTrigger for cinematic motion
- Lenis for smooth scrolling with graceful fallback
- Local dictionaries for runtime i18n + direction support

## Features

- StoryBrand-inspired landing page sections with magnetic CTAs
- Cinematic loader with aperture/shutter animation and progress tracking
- Custom cursor viewfinder and spotlight for desktop visitors
- Rich scroll-triggered reveals, parallax, and spotlight cards
- Fully bilingual (Arabic/English) UI with instant toggling and persistence

## Assets

All hero and category images are lightweight placeholders under `public/images`. Replace them with your own optimized WebP/AVIF assets for production.
