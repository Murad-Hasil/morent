# Morent — Car Rental Platform

[![CI](https://github.com/Murad-Hasil/morent/actions/workflows/ci.yml/badge.svg)](https://github.com/Murad-Hasil/morent/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-ready car rental web application built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Pixel-perfect implementation of the Morent Figma design template with full dark mode, animations, form validation, state management, SEO, PWA support, and end-to-end tests.

---

## Features

- **7 fully implemented pages** — Home, Browse Cars, Car Detail, Checkout, Favorites, Settings, Dashboard
- **Dark mode** — custom ThemeProvider (localStorage-persisted, no flash on reload)
- **Animations** — Framer Motion staggered cards, whileHover lifts, animated page transitions
- **Favorites** — Zustand + localStorage persist; dedicated favorites page; real-time badge in navbar
- **Filter system** — by car type, capacity, and max daily price with AnimatePresence transitions
- **Search** — navbar search bar navigates to `/cars?q=term`; results shown with clear label
- **Checkout form** — React Hook Form + Zod validation; 4-step UI with promo codes and live price calc
- **Notifications** — bell dropdown with unread indicators, mark-all-read, per-notification state
- **Settings** — profile editing, language selector, notification toggles — all persisted to localStorage
- **Dashboard** — rental stats card, top-5 car bar chart, recent transactions table
- **Mobile-first** — hamburger nav, collapsible dashboard sidebar with overlay, responsive grid
- **SEO** — per-page metadata, Open Graph, Twitter cards, sitemap.xml, robots.txt
- **PWA** — Web App Manifest, installable on mobile/desktop
- **Accessibility** — ARIA labels, semantic HTML, focus-visible rings, keyboard navigation

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.4 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| State | Zustand 5 (persist middleware) |
| Forms | React Hook Form 7 + Zod 4 |
| Notifications | react-hot-toast |
| Testing | Playwright |
| CI/CD | GitHub Actions |

---

## Project Structure

```
morent/
├── app/
│   ├── (public)/              # Navbar + Footer layout
│   │   ├── page.tsx           # Home
│   │   ├── cars/page.tsx      # Browse Cars
│   │   ├── cars/detail/       # Car Detail (?id=N)
│   │   ├── checkout/          # 4-step Checkout
│   │   ├── favorites/         # Saved Cars
│   │   └── settings/          # User Preferences
│   ├── dashboard/             # Dashboard (no public nav)
│   ├── manifest.ts            # PWA manifest
│   ├── sitemap.ts             # Auto sitemap
│   └── robots.ts              # robots.txt
├── components/
│   ├── Navbar.tsx
│   ├── CarCard.tsx            # Favorites + Framer Motion
│   ├── FilterSidebar.tsx      # Self-contained or controlled
│   ├── CheckoutForm.tsx       # RHF + Zod multi-step
│   ├── HeroBanner.tsx
│   └── ...
├── lib/
│   ├── store.ts               # Zustand favorites store
│   ├── data.ts                # Shared car data
│   └── checkout-schema.ts     # Zod validation schemas
├── e2e/                       # Playwright tests
├── public/cars/               # 12 car PNG images
└── .github/workflows/ci.yml   # CI/CD pipeline
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

# Run tests
npm test

# Interactive UI mode
npm run test:ui
```

---

## Environment Variables

No environment variables are required. Create `.env.local` to override defaults:

```env
# .env.local (optional)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

---

## Deploy

### Vercel (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Murad-Hasil/morent)

```bash
npx vercel --prod
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero banners, search form, popular & recommendation cars |
| `/cars` | Browse — Filter sidebar, search, paginated car grid |
| `/cars/detail?id=N` | Car Detail — Gallery, specs, reviews, related cars |
| `/checkout` | Checkout — 4-step form with promo codes and live pricing |
| `/favorites` | Favorites — Saved cars with empty state |
| `/settings` | Settings — Profile, appearance, notifications, account |
| `/dashboard` | Dashboard — Rental stats, top-5 chart, transactions |

---

## License

MIT © [Murad Hasil](https://github.com/Murad-Hasil)
