import { animate, stagger } from 'animejs'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CampingGear3DCanvas } from '../components/CampingGear3DCanvas'
import { ReviewForm, ReviewSection } from '../components/ReviewComponents'
import { getGearBySlug } from '../data/gear'
import { useBookingModal } from '../features/booking/useBookingModal'
import { useGalleryLightbox } from '../features/gallery/useGalleryLightbox'
import { useWishlist } from '../features/wishlist/useWishlist'

type DetailViewMode = 'model3d' | 'photos'

function GearDetailPage() {
  const { slug } = useParams()
  const selectedGear = getGearBySlug(slug)
  const [viewMode, setViewMode] = useState<DetailViewMode>('model3d')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { openBookingModal } = useBookingModal()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const { openGallery } = useGalleryLightbox()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const mainImageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setActiveImageIndex(0)
  }, [slug])

  useEffect(() => {
    if (!selectedGear) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const listItems = document.querySelectorAll<HTMLElement>('.detail-list li')
    if (listItems.length) {
      animate(listItems, {
        opacity: [0, 1],
        translateX: [-14, 0],
        duration: 380,
        delay: stagger(60),
        ease: 'outQuad',
      })
    }
  }, [selectedGear])

  useEffect(() => {
    if (viewMode !== 'photos' || !mainImageRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    animate(mainImageRef.current, {
      opacity: [0.55, 1],
      duration: 240,
      ease: 'outQuad',
    })
  }, [activeImageIndex, viewMode])

  const detailImages = selectedGear
    ? Array.isArray(selectedGear.images) && selectedGear.images.length > 0
      ? selectedGear.images
      : [
          {
            id: `${selectedGear.id}-detail`,
            src: selectedGear.image,
            alt: selectedGear.imageAlt,
          },
        ]
    : []

  const activeImage = detailImages[activeImageIndex] ?? detailImages[0]
  const savedToWishlist = selectedGear ? isWishlisted(selectedGear.id) : false

  if (!selectedGear) {
    return (
      <section className="page-shell page-top-space section-block">
        <div className="gear-catalog-error">
          <p className="eyebrow">Kit Not Found</p>
          <h1>Requested kit is unavailable</h1>
          <p>
            No kit matched that URL. Browse the full equipment catalog to select an active setup.
          </p>
          <Link className="primary-button" to="/gear">
            Back to Gear Catalog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-shell gear-detail-layout section-block">
      <div className="detail-media-stage">
        <div className="detail-view-switch" role="tablist" aria-label="Kit media mode">
          <button
            aria-selected={viewMode === 'model3d'}
            className={`detail-view-tab${viewMode === 'model3d' ? ' is-active' : ''}`}
            onClick={() => setViewMode('model3d')}
            role="tab"
            type="button"
          >
            3D WebGL Model
          </button>
          <button
            aria-selected={viewMode === 'photos'}
            className={`detail-view-tab${viewMode === 'photos' ? ' is-active' : ''}`}
            onClick={() => setViewMode('photos')}
            role="tab"
            type="button"
          >
            Photo Gallery
          </button>
        </div>

        <div className="detail-media">
          {viewMode === 'model3d' ? (
            <CampingGear3DCanvas kit={selectedGear} />
          ) : (
            <>
              <button
                aria-label="Open full photo gallery"
                className="detail-image-button"
                onClick={() => openGallery(selectedGear, activeImageIndex)}
                type="button"
              >
                <img
                  alt={activeImage.alt}
                  className="detail-image"
                  height={900}
                  ref={mainImageRef}
                  src={activeImage.src}
                  width={1200}
                />
              </button>

              <div className="detail-thumbnail-row">
                {detailImages.map((image, index) => (
                  <button
                    aria-label={`Preview image ${index + 1}`}
                    aria-pressed={index === activeImageIndex}
                    className={`detail-thumbnail${index === activeImageIndex ? ' is-active' : ''}`}
                    key={image.id ?? `${selectedGear.id}-${index}`}
                    onClick={() => setActiveImageIndex(index)}
                    type="button"
                  >
                    <img alt={image.alt} height={150} src={image.src} width={200} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="detail-content">
        <span className="section-folio">{selectedGear.category} Kit</span>
        <h1>{selectedGear.name}</h1>
        <p>{selectedGear.description}</p>

        <div className="detail-spec-bar">
          <div className="detail-spec-item">
            <span className="detail-spec-label">Daily Rate</span>
            <span className="detail-price">${selectedGear.pricePerDay}/day</span>
          </div>
          <div className="detail-spec-item">
            <span className="detail-spec-label">Capacity</span>
            <span className="detail-spec-value">{selectedGear.capacity}</span>
          </div>
          <div className="detail-spec-item">
            <span className="detail-spec-label">Inventory</span>
            <span className="detail-spec-value">{selectedGear.includes.length} items</span>
          </div>
        </div>

        <h2>Included in this kit</h2>
        <ul className="detail-list">
          {selectedGear.includes.map((item, index) => (
            <li key={item}>
              <span className="detail-list-num">{String(index + 1).padStart(2, '0')}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="detail-actions">
          <button
            className="primary-button"
            onClick={() => openBookingModal(selectedGear)}
            type="button"
          >
            Reserve This Kit
          </button>
          <button
            aria-pressed={savedToWishlist}
            className={`ghost-button detail-wishlist-button${savedToWishlist ? ' is-active' : ''}`}
            onClick={() => toggleWishlist(selectedGear.id)}
            type="button"
          >
            {savedToWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
          </button>
          <button
            className="ghost-button"
            onClick={() => openGallery(selectedGear, activeImageIndex)}
            type="button"
          >
            Open Photo Gallery
          </button>
          <Link className="ghost-button" to={`/booking?gear=${selectedGear.slug}`}>
            Full Booking Form
          </Link>
        </div>

        <div className="review-section-divider" />

        <div className="review-header-section">
          <h2>Customer Reviews</h2>
          <button
            className="secondary-button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            type="button"
          >
            {showReviewForm ? 'Close Review Form' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <div className="review-form-container">
            <ReviewForm gearId={selectedGear.id} onSuccess={() => setShowReviewForm(false)} />
          </div>
        )}

        <ReviewSection gearId={selectedGear.id} />
      </div>
    </section>
  )
}

export default GearDetailPage
