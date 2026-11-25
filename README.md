# Nomad Gear

**Nomad Gear** is a curated camping equipment rental storefront built as a single-page web application. Instead of renting loose individual items, the web app packages shelter, sleep systems, stoves, and lighting into five trip-specific bundles so campers can inspect gear inventories, compare daily rates, save favorites, and submit tentative hold requests in one flow.

The interface follows a **Swiss Technical Outfitter** layout with full light (`#FFFFFF` / `#F7F7F8`) and dark (`#0E1012` / `#16181B`) theme parity, `1px` structural hairlines, `Archivo` and `Archivo Narrow` typography, and `#C43600` / `#FF5C1F` International Orange accents.

---

## How the Web App Works

### Interactive 3D Kit Inspection

- **Hero 3D Stage (`HomePage`)**: Visitors can switch between three featured kits (`Weekend Light Kit`, `Alpine Basecamp Bundle`, `Stargazer Comfort Set`) and inspect live procedural 3D models directly on the landing stage.
- **Kit Detail Dual View (`GearDetailPage`)**: Every kit detail page toggles between the interactive `3D WebGL Model` canvas and a multi-angle `Photo Gallery` with a full-screen lightbox (`GalleryLightbox`).
- **Camera Controls & Fallback**: Each 3D canvas supports pointer drag orbit, keyboard buttons (`Rotate Left`, `Rotate Right`, `Reset View`), theme-reactive colors, `prefers-reduced-motion: reduce`, and an automatic `<img>` fallback if WebGL is unavailable.

### Catalog, Wishlist, Reviews & Booking

- **Navigation & Search (`FloatingNav`)**: Live search across kit names, descriptions, and categories, plus a category dropdown and responsive mobile navigation drawer.
- **Filtering & Sorting (`GearCatalogPage`)**: Category filter synced with URL query parameters (`/gear?category=...`), sorting by name, price, or rating, and dedicated loading, empty, and error recovery states.
- **Per-Profile Wishlist**: Saves favorite kits per demo profile (`Demo Profile 01` / `Demo Profile 02`) in `localStorage`.
- **Reviews & Tentative Holds**: In-memory customer reviews and star ratings per kit (`ReviewComponents`), a quick-hold modal (`BookNowModal`), and a full booking form (`/booking`) with kit selection (`?gear=<slug>`), date range checks, and notes limits.

### Application Routes

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | `HomePage` | Interactive 3D WebGL kit stage, featured kits, and terrain destination pairings |
| `/gear` | `GearCatalogPage` | Filterable and sortable equipment catalog |
| `/gear/:slug` | `GearDetailPage` | Kit specs, `3D WebGL Model` / `Photo Gallery` switcher, wishlist, and reviews |
| `/booking` | `BookingPage` | Tentative hold request form with kit selector and date validation |
| `/about` | `AboutPage` | Equipment architecture and pre-handoff inspection protocol |
| `/roadmap` | `RoadmapPage` | Shipped client capabilities and planned backend milestones |
| `*` | `NotFoundPage` | 404 fallback route with navigation back to home and catalog |

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Runtime & Package Manager | Bun |
| UI & Routing | React 19, TypeScript 6 (strict), React Router 7 |
| Build Tooling | Vite 8, ESLint 9 |
| 3D & Animation | Three.js (`three`), Anime.js v4 (`animejs`) |
| State & Data Fetching | Zustand, TanStack React Query |
| Forms & Validation | React Hook Form, Zod v4 |
| Testing | Vitest, React Testing Library, jsdom |

### Technical Architecture

- **WebGL & Motion (`src/components/CampingGear3DCanvas.tsx`)**: Three.js renders per-kit 3D geometry and disposes GPU resources on unmount; Anime.js v4 drives `createTimeline` kit entrance choreography and `createAnimatable` + `createSpring` camera orbit. DOM transitions stay strictly 2D (`useAnimateOnScroll`).
- **Canonical Data (`src/data/`)**: `gear.ts` exports the five kits, lookup helpers (`getGearBySlug`, `getGearCatalog`, `getGearCategories`), and SVG media references from `media.ts`; `destinations.ts` maps six terrain routes to kit categories.
- **State Management (`src/store/`, `src/features/`)**: Zustand stores (`useBookingStore`, `useGearStore`, `useReviewStore`, `useThemeStore`, `useToastStore`) manage UI and domain state; React Context providers handle demo profiles (`MockAccountContext`), persisted wishlists (`WishlistContext`), and gallery state (`GalleryLightboxContext`).
- **API & Validation (`src/api/`, `src/utils/`)**: React Query hooks (`useGearCatalog`, `useGearApi`) target `/api/gear` and `/api/bookings` with local catalog fallback; `BookingForm` validates via Zod v4 (`validation.ts`).
- **Accessibility (`src/styles/`)**: WCAG AA contrast across light and dark modes (`tokens.css`), semantic landmarks, skip link, `>= 44px` tap targets, and focus-trapped dialogs.

---

## Local Setup & Commands

Requires [Bun](https://bun.sh/).

```bash
git clone https://github.com/RAVEN276/nomad-gear.git
cd nomad-gear
bun install
bun run dev
```

To enable newsletter POST requests in `src/utils/newsletter.ts`, set the optional environment variable before starting Vite:

```bash
VITE_MAILCHIMP_SUBSCRIBE_URL=https://your-endpoint.example.com/subscribe
```

| Command | Purpose |
| :--- | :--- |
| `bun run dev` | Start Vite development server |
| `bunx tsc --noEmit` | Run strict TypeScript check on `src/` |
| `bunx tsc -p tsconfig.node.json --noEmit` | Type-check Vite configuration |
| `bun run build` | Run `tsc` and build production bundle into `dist/` |
| `bun run preview` | Serve production bundle locally |
| `bunx vitest run` | Execute unit and integration test suites (`jsdom`) |
| `bun run lint` | Run ESLint |

---

## Repository Structure

```text
src/
├── api/           React Query client and API hooks
├── components/    CampingGear3DCanvas, FloatingNav, HeroSection, GearCard, GearGrid, GalleryLightbox, ReviewComponents, Footer
├── data/          gear.ts, destinations.ts, media.ts
├── features/      account, booking, gallery, wishlist contexts and modals
├── hooks/         useAnimateOnScroll, useGearFilters, useReviewForm, useLozadObserver, useSVGMorph, useVirtualScroll
├── layout/        AppLayout shell
├── pages/         Route views
├── store/         Zustand stores (booking, gear, review, theme, toast)
├── styles/        tokens.css, base.css, components.css, pages.css
├── test/          Vitest jsdom environment setup
└── utils/         Zod validation, newsletter client, button ripple helper
```

## Additional Documentation

- [AGENTS.md](./AGENTS.md): Design tokens, WebGL + Anime.js v4 constraints, and quality guardrails for contributors and coding agents.
- [IMPLEMENTATION.md](./IMPLEMENTATION.md): Implementation notes for Zustand, React Query, React Hook Form + Zod, and Vitest.

Support and inquiries: **hello@nomadgear.com**
