# Nomad Gear

![React](https://img.shields.io/badge/React-19.2-141210?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-141210?style=flat-square&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-8.0-141210?style=flat-square&logo=vite&logoColor=646CFF)
![Three.js](https://img.shields.io/badge/Three.js-0.187-141210?style=flat-square&logo=threedotjs&logoColor=FFFFFF)
![Anime.js](https://img.shields.io/badge/Anime.js-4.5-141210?style=flat-square&labelColor=A80044)
![Vitest](https://img.shields.io/badge/Vitest-4.1-141210?style=flat-square&logo=vitest&logoColor=6E9F18)

**Nomad Gear** is a TypeScript single-page web application for renting curated, ready-to-pitch camping equipment kits. Rather than listing scattered individual items, the storefront groups shelter, sleep systems, stoves, and camp lighting into five trip-matched bundles with interactive WebGL 3D kit inspection, catalog filtering, per-profile wishlists, and tentative hold booking workflows.

[Overview](#overview) · [Web Experience](#web-experience) · [Application Routes](#application-routes) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [Project Structure](#project-structure)

---

## Overview

The storefront is built around a **Lo-Fi Field Zine** visual system with full light and dark theme parity:

| Mode | Canvas / Surface | Ink / Muted | Accent / Misregistration |
| :--- | :--- | :--- | :--- |
| **Light (Paper Zine)** | `#E8E0C0` / `#EDE4CF` | `#141210` / `#3A352C` | `#A80044` (`#FF006E` / `#00FFCC`) |
| **Dark (Darkroom)** | `#181612` / `#211E18` | `#EDE4CF` / `#CBC1A7` | `#FF4D94` (`#FF006E` / `#00FFCC`) |

Typography deliberately pairs three system faces (`Times New Roman` for display titles, `Helvetica Neue` for body copy, and `Courier New` for pricing, stamps, and manifests) alongside off-grid rotated cards, halftone imagery textures, Risograph RGB channel offsets, and SVG tape, staple, and torn-edge elements.

---

## Web Experience

### Interactive 3D Kit Stage

- **Procedural 3D Models (`CampingGear3DCanvas`)**: Renders distinct Three.js geometry for all five rental kits (`weekend-light-kit`, `alpine-basecamp-bundle`, `stargazer-comfort-set`, `family-ridge-pack`, and `overland-cookout-kit`).
- **Dual Inspection Views**: Visitors can rotate featured kits directly on the landing hero stage or toggle between `3D WebGL Model` and `Photo Gallery` on each kit detail page.
- **Accessible Controls & Fallback**: Supports pointer drag orbit, keyboard camera buttons (`Rotate Left`, `Rotate Right`, `Reset View`), theme-synced 3D palettes, `prefers-reduced-motion: reduce`, and an automatic `<img>` fallback when WebGL is unavailable.

### Storefront Discovery & Booking

- **Live Search & Category Navigation (`FloatingNav`)**: Filters across kit names, descriptions, and categories from the header bar, alongside a category menu and responsive mobile drawer.
- **Catalog Filtering & Sorting (`GearCatalogPage`)**: Syncs category selection with URL query parameters (`/gear?category=...`), sorts by name, price, or rating, and provides explicit loading, empty, and error recovery states.
- **Gallery Lightbox & Wishlists**: Multi-image lightbox (`GalleryLightbox`) with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`, `Escape`) and per-profile wishlists persisted in `localStorage`.
- **Reviews & Tentative Holds**: In-memory customer ratings and reviews per kit, a quick-hold modal (`BookNowModal`), and a full booking request page (`/booking`) with date range and email validation.

---

## Application Routes

| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Hero with interactive WebGL 3D kit stage, featured kits, and destination pairings |
| `/gear` | `GearCatalogPage` | Filterable and sortable equipment catalog |
| `/gear/:slug` | `GearDetailPage` | Kit inventory manifest, `3D WebGL Model` / `Photo Gallery` tabs, wishlist, and reviews |
| `/booking` | `BookingPage` | Tentative hold request form with kit selector (`?gear=<slug>`) and validation |
| `/about` | `AboutPage` | Three-layer kit architecture and pre-handoff inspection protocol |
| `/roadmap` | `RoadmapPage` | Shipped client features and planned backend milestones |
| `*` | `NotFoundPage` | 404 fallback route with navigation back to home and catalog |

---

## Tech Stack

| Category | Packages & Tools |
| :--- | :--- |
| **Runtime & Package Manager** | Bun (`1.4+`) |
| **Frontend Framework** | React 19, TypeScript 6 (`strict`), React Router 7 |
| **Build & Linting** | Vite 8, ESLint 9 |
| **3D & Motion** | Three.js (`three`), Anime.js v4 (`animejs`) |
| **State & Server Cache** | Zustand 5, TanStack React Query 5 |
| **Forms & Validation** | React Hook Form 7, Zod v4 |
| **Testing** | Vitest 4, React Testing Library, jsdom |

### Technical Architecture

- **WebGL + Anime.js v4 Integration**: Three.js handles WebGL rendering and GPU resource disposal on unmount; Anime.js v4 animates Three.js object properties (`createTimeline` for kit transitions, `createAnimatable` + `createSpring` for camera orbit) while keeping DOM reveals strictly 2D (`useAnimateOnScroll` with stepped timing).
- **Canonical Data Layer (`src/data/`)**: `gear.ts` exports the five kits, lookup helpers (`getGearBySlug`, `getGearCatalog`, `getGearCategories`), and SVG media assets from `media.ts`; `destinations.ts` pairs six terrain routes with kit categories.
- **State & Contexts (`src/store/`, `src/features/`)**: Zustand stores (`useBookingStore`, `useGearStore`, `useReviewStore`, `useThemeStore`, `useToastStore`) manage core app state; React Context providers handle demo profiles (`MockAccountContext`), persisted wishlists (`WishlistContext`), and gallery state (`GalleryLightboxContext`).
- **API & Validation (`src/api/`, `src/utils/`)**: React Query hooks (`useGearCatalog`, `useGearApi`) target `/api/gear` and `/api/bookings` with local catalog fallback; `BookingForm` validates input using Zod v4 (`validation.ts`).

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed locally

### Installation & Local Server

```bash
git clone https://github.com/RAVEN276/nomad-gear.git
cd nomad-gear
bun install
bun run dev
```

### Optional Environment Configuration

To enable newsletter POST requests in `src/utils/newsletter.ts`, define the endpoint URL before running Vite:

```env
VITE_MAILCHIMP_SUBSCRIBE_URL=https://your-endpoint.example.com/subscribe
```

### Available Commands

| Command | Description |
| :--- | :--- |
| `bun run dev` | Start Vite development server with HMR |
| `bunx tsc --noEmit` | Run strict TypeScript check across `src/` |
| `bunx tsc -p tsconfig.node.json --noEmit` | Type-check Vite configuration |
| `bun run build` | Run `tsc` and build production bundle into `dist/` |
| `bun run preview` | Preview production build locally |
| `bunx vitest run` | Run unit and integration test suites (`jsdom`) |
| `bun run lint` | Run ESLint |

---

## Project Structure

<details>
<summary>Expand directory tree</summary>

```text
nomad-gear/
├── AGENTS.md                         # Coding agent instructions and Lo-Fi + WebGL rules
├── IMPLEMENTATION.md                 # Notes on Zustand, React Query, Zod, and Vitest setup
├── index.html                        # HTML document entry
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # Strict TypeScript config
├── tsconfig.node.json                # Node/Vite TypeScript config
├── vite.config.ts                    # Vite and Vitest configuration
└── src/
    ├── api/                          # React Query client and API hooks
    ├── components/                   # CampingGear3DCanvas, FloatingNav, HeroSection, GearCard, GearGrid, ZineMarks, Footer
    ├── data/                         # gear.ts, destinations.ts, media.ts
    ├── features/                     # account, booking, gallery, wishlist contexts and modals
    ├── hooks/                        # useAnimateOnScroll, useGearFilters, useReviewForm, useLozadObserver, useSVGMorph, useVirtualScroll
    ├── layout/                       # AppLayout shell (skip link, main landmark, modals)
    ├── pages/                        # Route view components
    ├── store/                        # Zustand stores (booking, gear, review, theme, toast)
    ├── styles/                       # tokens.css, base.css, components.css, pages.css
    ├── test/                         # Vitest jsdom environment setup
    └── utils/                        # Zod validation, newsletter client, button ripple helper
```

</details>

---

## Documentation & Support

- [AGENTS.md](./AGENTS.md): Project conventions, Lo-Fi tokens, WebGL + Anime.js rules, and accessibility guardrails.
- [IMPLEMENTATION.md](./IMPLEMENTATION.md): Implementation notes for state management, forms, and testing.
- Inquiries: **hello@nomadgear.com**
