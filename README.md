# Morent — Car Rental Platform

[![CI](https://github.com/Murad-Hasil/morent/actions/workflows/ci.yml/badge.svg)](https://github.com/Murad-Hasil/morent/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-ready car rental web application built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Pixel-perfect implementation of the Morent Figma design template with full dark mode, CSS animations, form validation, state management, SEO, PWA support, and end-to-end tests.

---

## Features

- **8 fully implemented pages** — Home, Browse Cars, Car Detail, Checkout, Favorites, Settings, Dashboard, custom 404
- **Dark mode** — custom ThemeProvider (localStorage-persisted, no flash on reload)
- **CSS animations** — fade-in, slide-up, and page transitions via Tailwind globals (no runtime animation library)
- **Favorites** — Zustand + localStorage persist; dedicated favorites page; real-time badge in navbar
- **Filter system** — by car type, capacity, and max daily price
- **Search** — navbar search bar navigates to `/cars?q=term`
- **Checkout form** — React Hook Form + Zod validation; 4-step UI with promo codes and live price calc; car passed via URL param (`?id=N`)
- **Notifications** — bell dropdown with unread indicators, mark-all-read, per-notification state
- **Toast system** — lightweight custom CSS toast (no third-party library)
- **Settings** — profile editing, language selector, notification toggles — all persisted to localStorage
- **Dashboard** — rental stats card, top-5 car donut chart, recent transactions
- **Mobile-first** — hamburger nav, responsive grid, tested on mobile viewport
- **SEO** — per-page metadata, Open Graph image, Twitter cards, sitemap.xml, robots.txt
- **PWA** — Web App Manifest, service worker, installable on mobile/desktop
- **Icons** — dynamic favicon (32×32), Apple touch icon (180×180) for iOS home screen
- **Accessibility** — ARIA labels, semantic HTML, focus-visible rings, keyboard navigation

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| State | Zustand 5 (favorites + notifications only) |
| Forms | React Hook Form 7 + Zod 4 |
| Images | next/image + sharp |
| PWA | @ducanh2912/next-pwa |
| Testing | Playwright (chromium + mobile-chrome) |
| CI/CD | GitHub Actions → Vercel |

---

## Project Structure

```
morent/
├── app/
│   ├── (public)/              # Navbar + Footer layout
│   │   ├── page.tsx           # Home
│   │   ├── cars/page.tsx      # Browse Cars
│   │   ├── cars/detail/       # Car Detail (?id=N)
│   │   ├── checkout/          # 4-step Checkout (?id=N)
│   │   ├── favorites/         # Saved Cars
│   │   └── settings/          # User Preferences
│   ├── dashboard/             # Dashboard (separate layout)
│   ├── not-found.tsx          # Custom branded 404
│   ├── icon.tsx               # Favicon (32×32)
│   ├── apple-icon.tsx         # iOS home screen icon (180×180)
│   ├── opengraph-image.tsx    # OG image (1200×630)
│   ├── manifest.ts            # PWA manifest
│   ├── sitemap.ts             # Auto sitemap
│   └── robots.ts              # robots.txt
├── components/
│   ├── Navbar.tsx             # Sticky nav, search, notifications, profile
│   ├── CarCard.tsx            # Server Component
│   ├── FavoriteButton.tsx     # Client — zustand favorites
│   ├── RentNowButton.tsx      # Client — navigates to /checkout?id=N
│   ├── FilterSidebar.tsx      # Cars filter (type, capacity, price)
│   ├── CheckoutForm.tsx       # RHF + Zod multi-step
│   ├── Toast.tsx              # Custom toast container
│   └── ...
├── lib/
│   ├── store.ts               # Zustand: useFavorites + useNotifs
│   ├── data.ts                # Mock car data (replaced by API later)
│   ├── toast.ts               # Lightweight toast system
│   └── checkout-schema.ts     # Zod validation schemas
├── proxy.ts                   # Next.js 16 proxy (APP_SECRET guard)
├── e2e/                       # Playwright E2E tests
├── public/cars/               # 12 car PNG images
└── .github/workflows/ci.yml   # CI pipeline
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/Murad-Hasil/morent.git
cd morent
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
APP_SECRET=any-random-string-here
```

`APP_SECRET` is required — the app will show a configuration error page without it. Any non-empty string works locally.

On Vercel, set it via **Project Settings → Environment Variables** or:

```bash
vercel env add APP_SECRET
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Production

```bash
npm run build
npm run start
```

### Type Check & Lint

```bash
npm run type-check
npm run lint
```

### E2E Tests

```bash
# Install browsers (first time only)
npx playwright install

# Run all tests (chromium + mobile-chrome)
npm test

# Interactive UI mode
npm run test:ui
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero banners, search form, popular & recommendation cars |
| `/cars` | Browse — Filter sidebar, search, car grid |
| `/cars/detail?id=N` | Car Detail — Gallery, specs, reviews, related cars |
| `/checkout?id=N` | Checkout — 4-step form with promo codes and live pricing |
| `/favorites` | Favorites — Saved cars with empty state |
| `/settings` | Settings — Profile, appearance, notifications, account |
| `/dashboard` | Dashboard — Rental stats, top-5 chart, transactions |
| `/*` | 404 — Branded not-found page with navigation |

---

## Deploy

### Vercel (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Murad-Hasil/morent)

Auto-deploys on every push to `main`. Remember to set `APP_SECRET` in Vercel environment variables.

---

## License

MIT © [Murad Hasil](https://github.com/Murad-Hasil)
