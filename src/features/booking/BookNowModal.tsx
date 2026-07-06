import { animate } from 'animejs'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useBookingModal } from './useBookingModal'
import type { GearItem } from '@/store/useBookingStore'

function BookNowModal() {
  const navigate = useNavigate()
  const { closeBookingModal, isOpen, selectedGear } = useBookingModal()
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const feedbackRef = useRef<HTMLParagraphElement>(null)
  const isClosingRef = useRef(false)

  const performClose = (callback?: () => void) => {
    if (isClosingRef.current) return
    isClosingRef.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      callback?.()
      return
    }

    if (overlayRef.current && panelRef.current) {
      animate(overlayRef.current, {
        opacity: [1, 0],
        duration: 200,
        ease: 'outQuad',
      })

      animate(panelRef.current, {
        opacity: [1, 0],
        y: [0, 24],
        duration: 280,
        ease: 'outQuad',
        complete: () => {
          callback?.()
          isClosingRef.current = false
        },
      })
    } else {
      callback?.()
      isClosingRef.current = false
    }
  }

  const handleClose = () => {
    performClose(() => closeBookingModal())
  }

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !panelRef.current) {
      return undefined
    }

    if (feedbackRef.current) {
      feedbackRef.current.hidden = true
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }

    const overlayAnimation = animate(overlayRef.current, {
      opacity: [0, 1],
      duration: 220,
      ease: 'outQuad',
    })

    const panelAnimation = animate(panelRef.current, {
      opacity: [0, 1],
      y: [24, 0],
      duration: 320,
      ease: 'outQuad',
    })

    // Stagger form elements
    const formElements = panelRef.current?.querySelectorAll(
      '.form-label, .form-input, .modal-actions, .booking-modal-copy'
    )
    if (formElements?.length) {
      setTimeout(() => {
        animate(formElements, {
          opacity: [0, 1],
          y: [12, 0],
          duration: 400,
          ease: 'outQuad',
          delay: (el, i) => i * 60,
        })
      }, 150)
    }

    return () => {
      overlayAnimation.pause()
      panelAnimation.pause()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const selectedKitName = (selectedGear as GearItem | null)?.name ?? 'Flexible Custom Kit'

  const handleQuickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const button = event.currentTarget.querySelector('button[type="submit"]')
      if (button) {
        animate(button, {
          scale: [1, 0.95, 1],
          duration: 300,
          easing: 'easeInOutQuad',
        })
      }
    }

    if (feedbackRef.current) {
      feedbackRef.current.hidden = false
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animate(feedbackRef.current, {
          opacity: [0, 1],
          y: [12, 0],
          duration: 400,
          easing: 'easeOutQuad',
        })
      }
    }
  }

  const openFullBookingPage = () => {
    const querySuffix = (selectedGear as GearItem | null)?.slug ? `?gear=${(selectedGear as GearItem).slug}` : ''
    performClose(() => {
      navigate(`/booking${querySuffix}`)
    })
  }

  return createPortal(
    <div
      className="booking-modal-overlay"
      ref={overlayRef}
      onMouseDown={handleClose}
    >
      <section
        aria-labelledby="quick-booking-title"
        aria-modal="true"
        className="booking-modal-panel"
        onMouseDown={(event) => event.stopPropagation()}
        ref={panelRef}
        role="dialog"
      >
        <header className="booking-modal-header">
          <div>
            <p className="eyebrow">Quick Booking</p>
            <h2 id="quick-booking-title">Reserve {selectedKitName}</h2>
          </div>
          <button
            aria-label="Close booking modal"
            className="modal-close"
            onClick={handleClose}
            type="button"
          >
            ×
          </button>
        </header>

        <p className="booking-modal-copy">
          Share a few details and we will hold this kit while you finalize your
          trip plan.
        </p>

        <form className="booking-quick-form" onSubmit={handleQuickSubmit}>
          <label className="form-label" htmlFor="quick-name">
            Name
          </label>
          <input className="form-input" id="quick-name" name="quick-name" required />

          <label className="form-label" htmlFor="quick-email">
            Email
          </label>
          <input
            className="form-input"
            id="quick-email"
            name="quick-email"
            required
            type="email"
          />

          <label className="form-label">
            Trip Dates
          </label>
          <div className="date-inputs-group">
            <div className="date-input-wrapper">
              <label className="date-input-label" htmlFor="quick-start-date">
                From
              </label>
              <input
                className="form-input date-input"
                id="quick-start-date"
                min={new Date().toISOString().split('T')[0]}
                name="quick-start-date"
                required
                type="date"
              />
            </div>
            <div className="date-input-wrapper">
              <label className="date-input-label" htmlFor="quick-end-date">
                To
              </label>
              <input
                className="form-input date-input"
                id="quick-end-date"
                min={new Date().toISOString().split('T')[0]}
                name="quick-end-date"
                required
                type="date"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button className="primary-button" type="submit">
              Request Tentative Hold
            </button>
            <button
              className="ghost-button"
              onClick={openFullBookingPage}
              type="button"
            >
              Open full booking page
            </button>
          </div>
        </form>

        <p className="booking-feedback" hidden ref={feedbackRef}>
          Request noted. Our team will confirm availability shortly.
        </p>
      </section>
    </div>,
    document.body,
  )
}

export default BookNowModal