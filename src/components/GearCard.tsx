import { Link } from 'react-router-dom'
import { LAZY_PLACEHOLDER } from '../data/media'
import { useWishlist } from '../features/wishlist/useWishlist'
import { useImageLoader } from '../hooks/useImageLoader'
import type { GearItem } from '@/store/useBookingStore'

interface GearCardProps {
  gear: GearItem
  index?: number
  featured?: boolean
  onBookNow: (gear: GearItem) => void
}

function GearCard({ gear, index = 0, featured = false, onBookNow }: GearCardProps) {
  const { isLoaded, imageSrc } = useImageLoader(gear.image, LAZY_PLACEHOLDER)
  const { isWishlisted, toggleWishlist } = useWishlist()
  const isSaved = isWishlisted(gear.id)
  const folio = String(index + 1).padStart(2, '0')

  return (
    <article className={`gear-card reveal-item${featured ? ' gear-card--featured' : ''}`}>
      <div className="gear-media">
        <span className="gear-folio-badge">{folio}</span>
        <button
          aria-label={isSaved ? `Remove ${gear.name} from wishlist` : `Save ${gear.name} to wishlist`}
          aria-pressed={isSaved}
          className={`wishlist-button${isSaved ? ' is-active' : ''}`}
          onClick={() => toggleWishlist(gear.id)}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill={isSaved ? 'currentColor' : 'none'}
            height="18"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="18"
          >
            <path d="M12 20.5 4.9 13.8a4.7 4.7 0 0 1 6.6-6.7L12 7.6l.5-.5a4.7 4.7 0 0 1 6.6 6.7L12 20.5Z" />
          </svg>
        </button>
        <img
          alt={gear.imageAlt}
          className={`gear-image ${isLoaded ? 'loaded' : 'loading'}`}
          height={1000}
          src={imageSrc}
          width={1200}
        />
        <span className="price-tag">${gear.pricePerDay}/day</span>
      </div>

      <div className="gear-card-content">
        <div className="gear-body">
          <p className="gear-kicker">
            {gear.category} / {gear.capacity}
          </p>
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
            Reserve Kit
          </button>
        </div>
      </div>
    </article>
  )
}

export default GearCard
