import { animate } from 'animejs'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gearCatalog, getGearBySlug } from '../data/gear'
import { useShakeAnimation } from '../hooks/useShakeAnimation'

interface BookingFormState {
  gearSlug: string
  name: string
  email: string
  startDate: string
  endDate: string
  groupSize: string
  notes: string
}

type BookingFormErrors = Partial<Record<keyof BookingFormState, string>>

function BookingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSlug = searchParams.get('gear') ?? ''
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<BookingFormState>({
    gearSlug: initialSlug,
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    groupSize: '2',
    notes: '',
  })
  const [submittedSnapshot, setSubmittedSnapshot] = useState<BookingFormState | null>(null)
  const [errors, setErrors] = useState<BookingFormErrors>({})
  const { triggerShake } = useShakeAnimation()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const paramSlug = searchParams.get('gear') ?? ''
    setFormData((prev) => (prev.gearSlug === paramSlug ? prev : { ...prev, gearSlug: paramSlug }))
  }, [searchParams])

  const selectedGear = formData.gearSlug ? getGearBySlug(formData.gearSlug) : undefined
  const selectedKitName = selectedGear?.name ?? 'Custom Kit Consultation'
  const selectedKitPrice = selectedGear?.pricePerDay ?? 'Quote on review'

  const validateForm = (): boolean => {
    const newErrors: BookingFormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address (for example, name@example.com)'
    }
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.endDate) newErrors.endDate = 'End date is required'
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be on or after the start date'
    }
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0 && formRef.current) {
      triggerShake(formRef.current, 6)
    }

    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    const fieldName = name as keyof BookingFormState
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    if (fieldName === 'gearSlug') {
      if (value) {
        setSearchParams({ gear: value })
      } else {
        setSearchParams({})
      }
    }
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }))
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return

    setSubmittedSnapshot(formData)
    setIsSubmitted(true)
  }

  useEffect(() => {
    if (isSubmitted && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const feedback = document.querySelector<HTMLElement>('.booking-feedback')
      if (feedback) {
        animate(feedback, {
          opacity: [0, 1],
          translateY: [14, 0],
          duration: 360,
          ease: 'outExpo',
        })
      }
    }
  }, [isSubmitted])

  return (
    <section className="page-shell booking-page-grid section-block page-top-space">
      <article className="booking-summary">
        <span className="section-folio">01 · Tentative Hold</span>
        <h1>Reserve your pickup window.</h1>
        <p>
          Select a kit and travel window below. Our team verifies inventory
          availability before confirming your pickup time.
        </p>

        <div className="booking-summary-card booking-summary-card-main">
          <div className="summary-kit-section">
            <p className="summary-label">Selected Kit</p>
            <p className="summary-value">{selectedKitName}</p>
          </div>
          <div className="summary-divider" />
          <div className="summary-pricing-section">
            <p className="summary-label">Daily Rate</p>
            <p className="summary-rate">
              {typeof selectedKitPrice === 'number'
                ? `$${selectedKitPrice}/day`
                : selectedKitPrice}
            </p>
          </div>
        </div>

        <div className="booking-tips">
          <p className="tips-label">Booking Notes</p>
          <ul className="tips-list">
            <li>Submit preferred pickup and return dates to check kit stock.</li>
            <li>Use the notes field to flag cold-weather or stove fuel preferences.</li>
            <li>Need changes after submitting? Email hello@nomadgear.com.</li>
          </ul>
        </div>
      </article>

      <form ref={formRef} className="booking-form-card" noValidate onSubmit={handleSubmit}>
        {!isSubmitted && (
          <>
            <div className="booking-form-field">
              <label className="form-label" htmlFor="booking-kit-select">
                Rental Kit
              </label>
              <select
                className="form-input"
                id="booking-kit-select"
                name="gearSlug"
                onChange={handleChange}
                value={formData.gearSlug}
              >
                <option value="">Custom Kit Consultation</option>
                {gearCatalog.map((kit) => (
                  <option key={kit.id} value={kit.slug}>
                    {kit.name} (${kit.pricePerDay}/day)
                  </option>
                ))}
              </select>
            </div>

            <div className="booking-form-field">
              <label className="form-label" htmlFor="booking-name">
                Full Name
                <span className="required-indicator">*</span>
              </label>
              <input
                aria-invalid={!!errors.name}
                className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                id="booking-name"
                name="name"
                onChange={handleChange}
                placeholder="Your Name"
                required
                value={formData.name}
              />
              {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
            </div>

            <div className="booking-form-field">
              <label className="form-label" htmlFor="booking-email">
                Email
                <span className="required-indicator">*</span>
              </label>
              <input
                aria-invalid={!!errors.email}
                className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                id="booking-email"
                name="email"
                onChange={handleChange}
                placeholder="name@example.com"
                required
                type="email"
                value={formData.email}
              />
              {errors.email && <p className="form-error" role="alert">{errors.email}</p>}
            </div>

            <div className="booking-form-field booking-dates-field">
              <span className="form-label">
                Trip Dates
                <span className="required-indicator">*</span>
              </span>
              <div className="date-inputs-group">
                <div className="date-input-wrapper">
                  <label className="date-input-label" htmlFor="booking-start-date">
                    From
                  </label>
                  <input
                    aria-invalid={!!errors.startDate}
                    className={`form-input date-input ${errors.startDate ? 'form-input-error' : ''}`}
                    id="booking-start-date"
                    min={new Date().toISOString().split('T')[0]}
                    name="startDate"
                    onChange={handleChange}
                    required
                    type="date"
                    value={formData.startDate}
                  />
                </div>
                <div className="date-input-wrapper">
                  <label className="date-input-label" htmlFor="booking-end-date">
                    To
                  </label>
                  <input
                    aria-invalid={!!errors.endDate}
                    className={`form-input date-input ${errors.endDate ? 'form-input-error' : ''}`}
                    id="booking-end-date"
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    name="endDate"
                    onChange={handleChange}
                    required
                    type="date"
                    value={formData.endDate}
                  />
                </div>
              </div>
              {(errors.startDate || errors.endDate) && (
                <p className="form-error" role="alert">{errors.startDate || errors.endDate}</p>
              )}
            </div>

            <div className="booking-form-field">
              <label className="form-label" htmlFor="booking-group-size">
                Group Size
              </label>
              <select
                className="form-input"
                id="booking-group-size"
                name="groupSize"
                onChange={handleChange}
                value={formData.groupSize}
              >
                <option value="1">1 camper</option>
                <option value="2">2 campers</option>
                <option value="3">3 campers</option>
                <option value="4">4+ campers</option>
              </select>
            </div>

            <div className="booking-form-field">
              <label className="form-label" htmlFor="booking-notes">
                Notes
                <span className="notes-count">
                  {formData.notes.length}/200
                </span>
              </label>
              <textarea
                className="form-input"
                id="booking-notes"
                maxLength={200}
                name="notes"
                onChange={handleChange}
                placeholder="Destination, terrain elevation, or preferred add-ons."
                rows={4}
                value={formData.notes}
              />
            </div>

            <button className="primary-button booking-submit-button" type="submit">
              Request Tentative Hold
            </button>
          </>
        )}

        {isSubmitted && submittedSnapshot && (
          <div className="booking-feedback booking-feedback-success" role="status">
            <div className="feedback-icon" aria-hidden="true">OK</div>
            <h3>Hold Request Recorded</h3>
            <p>
              Your request for <strong>{selectedKitName}</strong> has been logged for{' '}
              <strong>{submittedSnapshot.email}</strong>.
            </p>
            {submittedSnapshot.startDate && submittedSnapshot.endDate && (
              <p>
                Dates:{' '}
                <strong>
                  {submittedSnapshot.startDate} to {submittedSnapshot.endDate}
                </strong>
              </p>
            )}
            <button
              className="ghost-button"
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  gearSlug: formData.gearSlug,
                  name: '',
                  email: '',
                  startDate: '',
                  endDate: '',
                  groupSize: '2',
                  notes: '',
                })
              }}
              type="button"
            >
              Submit Another Request
            </button>
          </div>
        )}
      </form>
    </section>
  )
}

export default BookingPage
