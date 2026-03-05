import { animate } from 'animejs'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getGearBySlug } from '../data/gear'
import { LAZY_PLACEHOLDER } from '../data/media'
import { useBookingModal } from '../features/booking/useBookingModal'
import { useStaggerAnimation } from '../hooks/useStaggerAnimation'

function GearDetailPage() {
  const { slug } = useParams()
  const selectedGear = getGearBySlug(slug)
  const { openBookingModal } = useBookingModal()

  useStaggerAnimation('.detail-list li', {
    opacity: [0, 1],
    x: [-20, 0],
    duration: 400,
    delay: (el, i) => i * 80,
  })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const buttons = document.querySelectorAll('.detail-actions button, .detail-actions a')
    buttons.forEach((btn) => {
      const handleEnter = () => {
        animate(btn, {
          scale: [1, 1.06],
          duration: 260,
          easing: 'easeOutQuad',
        })
      }
      const handleLeave = () => {
        animate(btn, {
          scale: [1.06, 1],
          duration: 220,
          easing: 'easeOutQuad',
        })
      }
      btn.addEventListener('mouseenter', handleEnter)
      btn.addEventListener('mouseleave', handleLeave)
      return () => {
        btn.removeEventListener('mouseenter', handleEnter)
        btn.removeEventListener('mouseleave', handleLeave)
      }
    })
  }, [])

  if (!selectedGear) {
    return (
      <section className="page-shell page-top-space section-block reveal">
        <p className="eyebrow">Gear Detail</p>
        <h1>Kit not found</h1>
        <p>
          The requested rental kit is unavailable right now. Browse our full
          catalog to find another setup.
        </p>
        <Link className="primary-button" to="/gear">
          Back to Gear Catalog
        </Link>
      </section>
    )
  }

  return (
    <section className="page-shell gear-detail-layout section-block">
      <div className="detail-media reveal">
        <img
          alt={selectedGear.imageAlt}
          className="detail-image lozad"
          data-src={selectedGear.image}
          src={LAZY_PLACEHOLDER}
        />
      </div>

      <div className="detail-content reveal">
        <p className="eyebrow">{selectedGear.capacity}</p>
        <h1>{selectedGear.name}</h1>
        <p>{selectedGear.description}</p>

        <p className="detail-price">${selectedGear.pricePerDay}/day</p>

        <h2>Included in this kit</h2>
        <ul className="detail-list">
          {selectedGear.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="detail-actions">
          <button
            className="primary-button"
            onClick={() => openBookingModal(selectedGear)}
            type="button"
          >
            Book Now
          </button>
          <Link className="ghost-button" to={`/booking?gear=${selectedGear.slug}`}>
            Full booking page
          </Link>
        </div>
      </div>
    </section>
  )
}

export default GearDetailPage