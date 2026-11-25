import { useBookingModal } from '../features/booking/useBookingModal'
import GearCard from './GearCard'
import { VirtualList } from '../hooks/useVirtualScroll'
import type { GearItem } from '@/store/useBookingStore'

interface GearGridProps {
  description?: string
  items: GearItem[]
  title: string
  folio?: string
  isLoading?: boolean
  onResetFilters?: () => void
}

const CARD_HEIGHT = 360
const CONTAINER_HEIGHT = 820

function GearGrid({
  description,
  items,
  title,
  folio = '02',
  isLoading = false,
  onResetFilters,
}: GearGridProps) {
  const { openBookingModal } = useBookingModal()

  const renderHeader = () => (
    <div className="section-header-split">
      <div className="section-heading-main">
        <span className="section-folio">{folio} · Curated Rental Kits</span>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  )

  if (isLoading) {
    return (
      <section className="page-shell section-block">
        {renderHeader()}
        <div className="gear-grid-skeleton" role="status" aria-label="Loading gear kits">
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
        {renderHeader()}
        <div className="gear-grid-empty" role="status">
          <h3>No matching rental kits</h3>
          <p>
            No kits match your active category or search filter. Reset filters to view the full catalog.
          </p>
          {onResetFilters && (
            <button className="primary-button" onClick={onResetFilters} type="button">
              Reset Filters
            </button>
          )}
        </div>
      </section>
    )
  }

  const renderCard = (gear: GearItem, index: number) => (
    <div key={gear.id} style={{ height: CARD_HEIGHT }}>
      <GearCard gear={gear} index={index} onBookNow={openBookingModal} />
    </div>
  )

  return (
    <section className="page-shell section-block">
      {renderHeader()}

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
          {items.map((gear, index) => (
            <GearCard
              featured={index === 0 && items.length > 2}
              gear={gear}
              index={index}
              key={gear.id}
              onBookNow={openBookingModal}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default GearGrid
