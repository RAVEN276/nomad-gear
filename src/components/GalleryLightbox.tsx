import { animate, createTimeline } from 'animejs'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useGalleryLightbox } from '../features/gallery/useGalleryLightbox'

function GalleryLightbox() {
  const {
    activeIndex,
    closeGallery,
    galleryImages,
    goToImage,
    isOpen,
    nextImage,
    previousImage,
    selectedGear,
  } = useGalleryLightbox()
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const mainImageRef = useRef<HTMLImageElement>(null)

  const closeWithAnimation = useCallback(() => {
    if (!overlayRef.current || !panelRef.current) {
      closeGallery()
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      closeGallery()
      return
    }

    animate(overlayRef.current, {
      opacity: [1, 0],
      duration: 180,
      ease: 'outQuad',
    })

    animate(panelRef.current, {
      opacity: [1, 0],
      translateY: [0, 16],
      scale: [1, 0.98],
      duration: 200,
      ease: 'inQuad',
      onComplete: () => closeGallery(),
    })
  }, [closeGallery])

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !panelRef.current) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeBtn = panelRef.current.querySelector<HTMLButtonElement>('.modal-close')
    closeBtn?.focus()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }

    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    tl.add(overlayRef.current, {
      opacity: [0, 1],
      duration: 180,
    }).add(
      panelRef.current,
      {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.97, 1],
        duration: 280,
      },
      '<',
    )

    return () => {
      tl.pause()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !mainImageRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    animate(mainImageRef.current, {
      opacity: [0.5, 1],
      scale: [0.985, 1],
      duration: 240,
      ease: 'outQuad',
    })
  }, [activeIndex, isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeWithAnimation()
      }

      if (event.key === 'ArrowRight') {
        nextImage()
      }

      if (event.key === 'ArrowLeft') {
        previousImage()
      }

      if (event.key === 'Home') {
        goToImage(0)
      }

      if (event.key === 'End') {
        goToImage(galleryImages.length - 1)
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusableNodes = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )

        if (!focusableNodes.length) {
          return
        }

        const firstNode = focusableNodes[0]
        const lastNode = focusableNodes[focusableNodes.length - 1]

        if (event.shiftKey && document.activeElement === firstNode) {
          event.preventDefault()
          lastNode.focus()
        } else if (!event.shiftKey && document.activeElement === lastNode) {
          event.preventDefault()
          firstNode.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeWithAnimation, galleryImages.length, goToImage, isOpen, nextImage, previousImage])

  if (!isOpen || !selectedGear || !galleryImages.length) {
    return null
  }

  const activeImage = galleryImages[activeIndex] ?? galleryImages[0]

  return createPortal(
    <div
      className="gallery-lightbox-overlay"
      onMouseDown={closeWithAnimation}
      ref={overlayRef}
    >
      <section
        aria-labelledby="gallery-lightbox-title"
        aria-modal="true"
        className="gallery-lightbox-panel"
        onMouseDown={(event) => event.stopPropagation()}
        ref={panelRef}
        role="dialog"
      >
        <header className="gallery-lightbox-header">
          <div>
            <p className="eyebrow">Kit Gallery</p>
            <h2 id="gallery-lightbox-title">{selectedGear.name}</h2>
            <p className="gallery-lightbox-count">
              Image {activeIndex + 1} of {galleryImages.length}
            </p>
          </div>
          <button
            aria-label="Close image gallery"
            className="modal-close"
            onClick={closeWithAnimation}
            type="button"
          >
            ×
          </button>
        </header>

        <div className="gallery-lightbox-main">
          <button
            aria-label="View previous image"
            className="gallery-nav-button"
            onClick={previousImage}
            type="button"
          >
            ‹
          </button>

          <img
            alt={activeImage.alt}
            className="gallery-lightbox-image"
            height={900}
            ref={mainImageRef}
            src={activeImage.src}
            width={1200}
          />

          <button
            aria-label="View next image"
            className="gallery-nav-button"
            onClick={nextImage}
            type="button"
          >
            ›
          </button>
        </div>

        <div className="gallery-thumbnail-row">
          {galleryImages.map((image, index) => (
            <button
              aria-label={`View image ${index + 1}`}
              className={`gallery-thumbnail${index === activeIndex ? ' is-active' : ''}`}
              key={image.id ?? `${selectedGear.id}-${index}`}
              onClick={() => goToImage(index)}
              type="button"
            >
              <img alt={image.alt} height={150} src={image.src} width={200} />
            </button>
          ))}
        </div>
      </section>
    </div>,
    document.body,
  )
}

export default GalleryLightbox
