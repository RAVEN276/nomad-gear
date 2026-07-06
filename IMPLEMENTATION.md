# Nomad Gear - Implementation Guide

This document outlines the implementation of modern React patterns and tools for the Nomad Gear camping equipment rental platform.

## 📦 Tech Stack Updates

### State Management (Zustand)
- **`src/store/useBookingStore.ts`** - Booking state management
- **`src/store/useGearStore.ts`** - Gear catalog filtering and search

### API Integration (React Query)
- **`src/api/queryClient.ts`** - Query client configuration
- **`src/api/gearApi.ts`** - API functions for gear data
- **`src/api/useGearApi.ts`** - Custom hooks for data fetching

### Form Validation (React Hook Form + Zod)
- **`src/utils/validation.ts`** - Zod schema for booking form validation
- **`src/features/booking/BookingForm.tsx`** - Type-safe form component

### Testing (Vitest + React Testing Library)
- **`src/test/setup.ts`** - Test configuration
- **`src/features/booking/BookingForm.test.tsx`** - Form component tests
- **`src/utils/validation.test.ts`** - Validation schema tests

## 🚀 Performance Optimizations

### Lazy Loading & Image Optimization
- **`src/hooks/useImageLoader.ts`** - Custom hook for lazy image loading
  - `useImageLoader()` - Load images with placeholder support
  - `LazyImage` - Component for lazy-loaded images
  - `BlurUpImage` - Blur-up effect for progressive image loading

### Virtual Scrolling
- **`src/hooks/useVirtualScroll.ts`** - Virtual scrolling for large lists
  - `VirtualList` - Component for rendering large datasets efficiently
  - `useVirtualScroll` - Hook for custom virtual scroll implementations

### Skeleton Loaders
- **`src/components/SkeletonLoader.tsx`** - Loading state components
  - `SkeletonLoader` - Generic skeleton loader
  - `GearCardSkeleton` - Skeleton for gear cards
  - `GearGridSkeleton` - Skeleton for gear grids

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   ├── queryClient.ts      # React Query client setup
│   ├── gearApi.ts          # API functions
│   └── useGearApi.ts       # React Query hooks
├── components/             # Reusable UI components
│   └── SkeletonLoader.tsx  # Loading skeletons
├── features/               # Feature-based modules
│   └── booking/
│       ├── BookingForm.tsx     # Type-safe booking form
│       └── BookingForm.test.tsx
├── hooks/                  # Custom React hooks
│   ├── useImageLoader.ts   # Image loading optimization
│   └── useVirtualScroll.ts # Virtual scrolling
├── store/                  # Zustand stores
│   ├── useBookingStore.ts  # Booking state
│   └── useGearStore.ts     # Gear catalog state
├── test/                   # Test configuration
│   └── setup.ts            # Vitest setup
├── utils/                  # Utilities
│   ├── validation.ts       # Zod schemas
│   └── validation.test.ts  # Schema tests
└── data/
    └── gear.ts             # TypeScript gear data
```

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- Path aliases configured (`@/*` → `src/*`)
- React JSX support

### Vite (`vite.config.js`)
- Path alias resolution
- Vitest configuration
- Test environment setup (jsdom)

## 📝 Usage Examples

### Using Zustand Store
```tsx
import { useBookingStore } from '@/store/useBookingStore'

function MyComponent() {
  const { selectedGear, openBookingModal } = useBookingStore()
  
  return (
    <button onClick={() => openBookingModal(gear)}>
      Book {selectedGear?.name}
    </button>
  )
}
```

### Using React Query
```tsx
import { useGearList } from '@/api/useGearApi'
import { GearCardSkeleton } from '@/components/SkeletonLoader'

function GearCatalog() {
  const { data: gearList, isLoading, error } = useGearList()
  
  if (isLoading) return <GearGridSkeleton />
  if (error) return <div>Error loading gear</div>
  
  return (
    <div className="gear-grid">
      {gearList.map(gear => <GearCard key={gear.id} {...gear} />)}
    </div>
  )
}
```

### Using Form with Validation
```tsx
import { BookingForm } from '@/features/booking/BookingForm'

function BookingPage() {
  return (
    <section>
      <h1>Book Your Gear</h1>
      <BookingForm />
    </section>
  )
}
```

### Using Lazy Image Loading
```tsx
import { LazyImage, BlurUpImage } from '@/hooks/useImageLoader'

function GearCard({ gear }) {
  return (
    <div className="gear-card">
      <BlurUpImage
        src={gear.image}
        blurPlaceholder={gear.blurHash}
        alt={gear.name}
      />
    </div>
  )
}
```

### Using Virtual Scroll
```tsx
import { VirtualList } from '@/hooks/useVirtualScroll'

function LargeGearList({ items }) {
  return (
    <VirtualList
      items={items}
      itemHeight={200}
      containerHeight={600}
      renderItem={(item, index) => (
        <GearCard key={item.id} gear={item} />
      )}
    />
  )
}
```

## 🧪 Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Building

```bash
# Development
npm run dev

# Production build (includes type checking)
npm run build

# Preview production build
npm run preview
```

## ✅ Migration Checklist

- [x] Install dependencies (Zustand, React Query, React Hook Form, Zod, Vitest)
- [x] Configure TypeScript
- [x] Set up Zustand stores
- [x] Create React Query hooks
- [x] Implement form validation with Zod
- [x] Add test configuration
- [x] Create skeleton loaders
- [x] Implement virtual scrolling
- [x] Add lazy image loading hooks
- [ ] Migrate existing components to TypeScript
- [ ] Replace existing form with new BookingForm
- [ ] Integrate React Query in pages
- [ ] Add comprehensive tests
- [ ] Update documentation

## 📊 Benefits

| Feature | Before | After |
|---------|--------|-------|
| State Management | Context API + useState | Zustand (lighter, simpler) |
| API Calls | Manual fetch | React Query (caching, retries) |
| Form Validation | Manual validation | Zod + React Hook Form |
| Testing | None | Vitest + RTL |
| Type Safety | JavaScript | TypeScript |
| Performance | Basic | Virtual scroll, lazy loading, skeletons |
