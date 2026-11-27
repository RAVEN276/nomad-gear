import { lazy, Suspense } from 'react'
import type { GearItem } from '@/store/useBookingStore'

const CampingGear3DCanvas = lazy(() => import('./CampingGear3DCanvas'))

interface CampingGear3DStageProps {
  kit: GearItem
  priorityHero?: boolean
}

function CampingGearStageFallback({ kit, priorityHero = false }: CampingGear3DStageProps) {
  return (
    <div className="webgl-stage-wrap" aria-busy="true">
      <div className="webgl-stage-frame">
        <img
          alt={kit.imageAlt}
          className="hero-image"
          fetchPriority={priorityHero ? 'high' : undefined}
          height={900}
          src={kit.image}
          width={1200}
        />
        <span className="hero-floating-tag">${kit.pricePerDay}/day</span>
      </div>
      <div className="webgl-stage-loading" role="status">
        Loading 3D WebGL stage...
      </div>
    </div>
  )
}

/**
 * Code-split WebGL stage loader so Three.js loads asynchronously behind a static kit preview.
 */
export function CampingGear3DStage({ kit, priorityHero = false }: CampingGear3DStageProps) {
  return (
    <Suspense fallback={<CampingGearStageFallback kit={kit} priorityHero={priorityHero} />}>
      <CampingGear3DCanvas kit={kit} priorityHero={priorityHero} />
    </Suspense>
  )
}
