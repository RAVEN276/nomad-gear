import { useBookingModal } from '../features/booking/useBookingModal'
import { useBookingStore } from '@/store/useBookingStore'
import GearCard from './GearCard'
import { VirtualList } from '../hooks/useVirtualScroll'
import type { GearItem } from '@/store/useBookingStore'

interface GearGridProps {
  description?: string
  items: GearItem[]
  title: string
  isLoading?: boolean
}

const CARD_HEIGHT = 320
const CONTAINER_HEIGHT = 800

function GearGrid({ description, items, title, isLoading = false }: GearGridProps) {
  const { openBookingModal } = useBookingModal()
  const selectedCategory = useBookingStore((state) => state.selectedCategory)

  if (isLoading) {
    return (
      <section className="page-shell section-block">
        <div className="section-heading reveal">
          <p className="eyebrow">Curated Rental Kits</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="gear-grid-skeleton">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="gear-card-skeleton">
              <div className="skeleton-image" />
              <div className="skeleton-title" />
              <div className="skeleton-price" />
              <div className="skeleton-description" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="page-shell section-block">
        <div className="section-heading reveal">
          <p className="eyebrow">Curated Rental Kits</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="gear-grid-empty">
          <p>No gear items found matching your criteria.</p>
        </div>
      </section>
    )
  }

  const renderCard = (gear: GearItem, index: number) => (
    <div key={gear.id} style={{ height: CARD_HEIGHT }}>
      <GearCard gear={gear} onBookNow={openBookingModal} />
    </div>
  )

  return (
    <section className="page-shell section-block">
      <div className="section-heading reveal">
        <p className="eyebrow">Curated Rental Kits</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {items.length > 10 ? (
        <VirtualList<GearItem>
          items={items}
          itemHeight={CARD_HEIGHT}
          containerHeight={CONTAINER_HEIGHT}
          renderItem={renderCard}
          overscan={3}
        />
      ) : (
        <div className="gear-grid">
          {items.map((gear) => (
            <GearCard gear={gear} key={gear.id} onBookNow={openBookingModal} />
          ))}
        </div>
      )}
    </section>
  )
}

export default GearGrid
