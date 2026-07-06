import { animate } from 'animejs'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { LAZY_PLACEHOLDER } from '../data/media'
import { useImageLoader } from '../hooks/useImageLoader'
import type { GearItem } from '@/store/useBookingStore'

interface GearCardProps {
  gear: GearItem
  onBookNow: (gear: GearItem) => void
}

function GearCard({ gear, onBookNow }: GearCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { isLoaded, imageSrc } = useImageLoader(gear.image, LAZY_PLACEHOLDER)

  const handleMouseEnter = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!cardRef.current) return

    animate(cardRef.current, {
      scale: 1.04,
      y: -8,
      duration: 320,
      easing: 'easeOutQuad',
    })
  }

  const handleMouseLeave = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!cardRef.current) return

    animate(cardRef.current, {
      scale: 1,
      y: 0,
      duration: 280,
      easing: 'easeOutQuad',
    })
  }

  return (
    <article
      ref={cardRef}
      className="gear-card reveal"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="gear-media">
        <img
          alt={gear.imageAlt}
          className={`gear-image ${isLoaded ? 'loaded' : 'loading'}`}
          src={imageSrc}
        />
        <span className="price-tag">${gear.pricePerDay}/day</span>
      </div>

      <div className="gear-body">
        <p className="gear-kicker">{gear.capacity}</p>
        <h3>{gear.name}</h3>
        <p>{gear.summary}</p>
      </div>

      <div className="gear-actions">
        <Link className="text-link" to={`/gear/${gear.slug}`}>
          View details
        </Link>
        <button
          className="book-now-button"
          onClick={() => onBookNow(gear)}
          type="button"
        >
          Book Now
        </button>
      </div>
    </article>
  )
}

export default GearCard