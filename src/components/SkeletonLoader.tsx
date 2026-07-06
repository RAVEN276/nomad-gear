import { ComponentProps, Suspense } from 'react'

type ComponentType = React.ComponentType<any>

export function LazyComponent(component: ComponentType) {
  return (props: ComponentProps<ComponentType>) => (
    <Suspense fallback={<SkeletonLoader />}>
      {component(props)}
    </Suspense>
  )
}

export function SkeletonLoader({ lines = 3 }: { lines?: number }) {
  return (
    <div className="skeleton-loader" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton-line" />
      ))}
    </div>
  )
}

export function GearCardSkeleton() {
  return (
    <div className="gear-card-skeleton">
      <div className="skeleton-image" />
      <div className="skeleton-title" />
      <div className="skeleton-price" />
      <div className="skeleton-description" />
    </div>
  )
}

export function GearGridSkeleton() {
  return (
    <div className="gear-grid-skeleton">
      {Array.from({ length: 6 }).map((_, i) => (
        <GearCardSkeleton key={i} />
      ))}
    </div>
  )
}
