import { useBookingModal } from '../features/booking/useBookingModal'
import GearCard from './GearCard'

function GearGrid({ description, items, title }) {
  const { openBookingModal } = useBookingModal()

  return (
    <section className="page-shell section-block">
      <div className="section-heading reveal">
        <p className="eyebrow">Curated Rental Kits</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="gear-grid">
        {items.map((gear) => (
          <GearCard gear={gear} key={gear.id} onBookNow={openBookingModal} />
        ))}
      </div>
    </section>
  )
}

export default GearGrid