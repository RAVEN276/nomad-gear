# AGENTS.md

Guidelines for coding agents working in Nomad Gear.

## Stack & Commands

- **Runtime & Package Manager**: Bun (`bun install`)
- **Framework**: React 19, TypeScript 6 (strict mode), Vite 8, React Router 7
- **State & Data**: Zustand (`src/store/*`), TanStack React Query (`src/api/*`), React Context (`src/features/*`)
- **Forms & Validation**: React Hook Form + Zod v4 (`src/utils/validation.ts`)
- **3D & Animation**: Three.js (`three`) for WebGL 3D kit models + Anime.js v4 (`animejs`) for JS-object 3D choreography and 2D DOM transitions
- **Testing**: Vitest + React Testing Library (`jsdom`)

Run checks after edits:

```bash
bunx tsc --noEmit
bun run build
bunx vitest run
```

## Project Structure

- `src/data/gear.ts`: Canonical `gearCatalog` data and lookup helpers (`getGearBySlug`, `getGearCatalog`, `getGearCategories`)
- `src/data/destinations.ts`, `src/data/media.ts`: Destination index and inline SVG media assets
- `src/store/`: Zustand stores (`useBookingStore`, `useGearStore`, `useReviewStore`, `useThemeStore`, `useToastStore`)
- `src/features/`: Feature contexts and booking components (`account`, `booking`, `gallery`, `wishlist`)
- `src/components/`: Shared UI components (`CampingGear3DCanvas`, `HeroSection`, `FloatingNav`, `GearCard`, `GearGrid`, `GalleryLightbox`, `FilterSortControls`, `ReviewComponents`, `ThemeToggle`, `ToastContainer`, `Footer`, `NewsletterSignup`)
- `src/pages/`: Route pages (`HomePage`, `GearCatalogPage`, `GearDetailPage`, `BookingPage`, `AboutPage`, `RoadmapPage`, `NotFoundPage`)
- `src/styles/`: Design tokens (`tokens.css`) and stylesheets (`base.css`, `components.css`, `pages.css`)

## Design & Motion Rules

1. **Visual Direction (Lo-Fi Field Zine)**:
   - Light mode: `#E8E0C0` / `#EDE4CF` paper-yellow surfaces (never cream), `#141210` ink, `#3A352C` muted text, `#A80044` Risograph magenta accent (`#FF006E` / `#00FFCC` RGB offset channels).
   - Dark mode (`[data-theme="dark"]`): `#181612` / `#211E18` darkroom surfaces, `#EDE4CF` paper ink, `#CBC1A7` muted text, `#FF4D94` accent.
   - Typography: Colliding system fonts (`Times New Roman` display/titles, `Helvetica Neue` body, `Courier New` prices/stamps/manifests).
   - Structure & Texture: Off-grid rotated cards (`1.5–3°`), hard print offset shadows (`4px 4px 0`), halftone dot overlays, Risograph `text-shadow` misregistration, SVG tape/staples/torn-edge dividers (`src/components/ZineMarks.tsx`), and stepped motion (`steps(...)`). Avoid sterile Swiss grids, cream surfaces, or webfonts.
2. **3D WebGL + Anime.js v4 Rules**:
   - Render 3D gear models via WebGL (`src/components/CampingGear3DCanvas.tsx` with Three.js `<canvas>`), NOT CSS DOM 3D perspective/tilt transforms (`rotateX`, `rotateY`, `translateZ`, `preserve-3d` on DOM cards/modals).
   - Drive Three.js object properties (`position`, `rotation`, `scale`, camera spherical state) using Anime.js v4 (`animate`, `createTimeline`, `createAnimatable`, `createSpring`).
   - Keep DOM UI transitions strictly 2D (`opacity`, `translateY`, `translateX`, `scale`, SVG `createDrawable`).
   - Always provide: keyboard camera controls (`Rotate Left`, `Rotate Right`, `Reset View`), WebGL context fallback (`<img>`), full Three.js resource disposal on unmount, and `prefers-reduced-motion: reduce` support.
3. **Antislop & Accessibility Guardrails**:
   - Never use em dashes (`—`) in UI copy.
   - Never invent statistics, testimonials, team personas, trust badges, or `#` dead links.
   - Ensure WCAG AA contrast (`>= 4.5:1` normal text, `>= 3:1` large text and borders) in both light and dark modes.
   - Keep tap targets `>= 44px`, native `<button>`/`<a href>` semantics, visible `<label>` elements, `:focus-visible` outlines, and explicit loading, empty, and error states.
   - Verify with `bunx tsc --noEmit`, `bun run build`, and `bunx vitest run` before finishing.
