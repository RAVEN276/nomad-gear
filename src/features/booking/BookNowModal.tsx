import { animate, createTimeline, stagger } from 'animejs'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useBookingModal } from './useBookingModal'
import { useShakeAnimation } from '@/hooks/useShakeAnimation'
import type { GearItem } from '@/store/useBookingStore'

function BookNowModal() {
  const navigate = useNavigate()
  const { closeBookingModal, isOpen, selectedGear } = useBookingModal()
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const isClosingRef = useRef(false)
  const { triggerShake } = useShakeAnimation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const performClose = useCallback((callback?: () => void) => {
    if (isClosingRef.current) return
    isClosingRef.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      callback?.()
      isClosingRef.current = false
      return
    }

    if (overlayRef.current && panelRef.current) {
      animate(overlayRef.current, {
        opacity: [1, 0],
        duration: 180,
        ease: 'outQuad',
      })

      animate(panelRef.current, {
        opacity: [1, 0],
        translateY: [0, 18],
        scale: [1, 0.97],
        duration: 220,
        ease: 'inQuad',
        onComplete: () => {
          callback?.()
          isClosingRef.current = false
        },
      })
    } else {
      callback?.()
      isClosingRef.current = false
    }
  }, [])

  const handleClose = useCallback(() => {
    performClose(() => closeBookingModal())
  }, [closeBookingModal, performClose])

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !panelRef.current) {
      return undefined
    }

    setErrorMessage('')
    setIsSubmitted(false)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const firstInput = panelRef.current.querySelector<HTMLElement>('input, button')
    firstInput?.focus()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }

    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    tl.add(overlayRef.current, {
      opacity: [0, 1],
      duration: 200,
    }).add(
      panelRef.current,
      {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.97, 1],
        duration: 320,
      },
      '<',
    )

    const formElements = panelRef.current.querySelectorAll<HTMLElement>(
      '.form-label, .form-input, .modal-actions, .booking-modal-copy',
    )
    if (formElements.length) {
      tl.add(
        formElements,
        {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 320,
          delay: stagger(45),
        },
        '<+=80',
      )
    }

    return () => {
      tl.pause()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, isOpen])

  if (!isOpen) {
    return null
  }

  const selectedKitName = (selectedGear as GearItem | null)?.name ?? 'Flexible Custom Kit'

  const handleQuickSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) {
      setErrorMessage('Enter your name to request a hold.')
      triggerShake(panelRef.current, 6)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Enter a valid email address.')
      triggerShake(panelRef.current, 6)
      return
    }
    if (!startDate || !endDate || startDate > endDate) {
      setErrorMessage('Select a valid start and end date.')
      triggerShake(panelRef.current, 6)
      return
    }

    setErrorMessage('')
    setIsSubmitted(true)
  }

  const openFullBookingPage = () => {
    const querySuffix = (selectedGear as GearItem | null)?.slug
      ? `?gear=${(selectedGear as GearItem).slug}`
      : ''
    performClose(() => {
      closeBookingModal()
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
            <p className="eyebrow">Quick Hold Request</p>
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
          Submit your contact details and dates to request a tentative kit hold.
        </p>

        <form className="booking-quick-form" noValidate onSubmit={handleQuickSubmit}>
          <label className="form-label" htmlFor="quick-name">
            Your Name
          </label>
          <input
            className="form-input"
            id="quick-name"
            name="quick-name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            value={name}
          />

          <label className="form-label" htmlFor="quick-email">
            Email Address
          </label>
          <input
            className="form-input"
            id="quick-email"
            name="quick-email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            type="email"
            value={email}
          />

          <span className="form-label">Trip Dates</span>
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
                onChange={(e) => setStartDate(e.target.value)}
                required
                type="date"
                value={startDate}
              />
            </div>
            <div className="date-input-wrapper">
              <label className="date-input-label" htmlFor="quick-end-date">
                To
              </label>
              <input
                className="form-input date-input"
                id="quick-end-date"
                min={startDate || new Date().toISOString().split('T')[0]}
                name="quick-end-date"
                onChange={(e) => setEndDate(e.target.value)}
                required
                type="date"
                value={endDate}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="form-error" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="modal-actions">
            <button className="primary-button" type="submit">
              Request Tentative Hold
            </button>
            <button
              className="ghost-button"
              onClick={openFullBookingPage}
              type="button"
            >
              Open Full Booking Page
            </button>
          </div>
        </form>

        {isSubmitted && (
          <p className="booking-feedback" role="status">
            Hold request noted for {selectedKitName}. Confirmation details will be sent to {email}.
          </p>
        )}
      </section>
    </div>,
    document.body,
  )
}

export default BookNowModal
