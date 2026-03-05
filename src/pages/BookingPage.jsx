import { animate } from 'animejs'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getGearBySlug } from '../data/gear'
import { useShakeAnimation } from '../hooks/useShakeAnimation'

function BookingPage() {
  const [searchParams] = useSearchParams()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    groupSize: '2',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const { triggerShake } = useShakeAnimation()
  const formRef = useRef(null)

  const selectedSlug = searchParams.get('gear')
  const selectedGear = selectedSlug ? getGearBySlug(selectedSlug) : null
  const selectedKitName = selectedGear?.name ?? 'Custom Kit Consultation'
  const selectedKitPrice = selectedGear?.pricePerDay ?? 'Contact us'

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const inputs = document.querySelectorAll('.form-input')
    const handleFocus = (e) => {
      animate(e.target, {
        borderColor: '#6b9a77',
        duration: 220,
        easing: 'easeOutQuad',
      })
    }
    const handleBlur = (e) => {
      animate(e.target, {
        borderColor: 'var(--border-soft)',
        duration: 180,
        easing: 'easeOutQuad',
      })
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', handleFocus)
      input.addEventListener('blur', handleBlur)
    })

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', handleFocus)
        input.removeEventListener('blur', handleBlur)
      })
    }
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.endDate) newErrors.endDate = 'End date is required'
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date'
    }
    setErrors(newErrors)
    
    // Shake form on error
    if (Object.keys(newErrors).length > 0 && formRef.current) {
      triggerShake(formRef.current, 6)
    }
    
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) return

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const button = event.target.querySelector('button')
      if (button) {
        animate(button, {
          scale: [1, 0.95, 1],
          duration: 400,
          easing: 'easeInOutQuad',
        })
      }
    }

    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', startDate: '', endDate: '', groupSize: '2', notes: '' })
      setIsSubmitted(false)
    }, 3000)
  }

  useEffect(() => {
    if (isSubmitted && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const feedback = document.querySelector('.booking-feedback')
      const icon = feedback?.querySelector('.feedback-icon')
      if (feedback) {
        // Success message entrance
        animate(feedback, {
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 500,
          easing: 'easeOutElastic(1, 0.5)',
        })
        // Checkmark bounce
        if (icon) {
          animate(icon, {
            scale: [0, 1.2, 1],
            rotateZ: [0, 15, 0],
            duration: 700,
            easing: 'easeOutElastic(1, 0.6)',
          })
        }
      }
    }
  }, [isSubmitted])

  return (
    <section className="page-shell booking-page-grid section-block page-top-space">
      <article className="booking-summary reveal">
        <p className="eyebrow">Booking</p>
        <h1>Lock in your next escape.</h1>
        <p>
          Tell us your destination window and we will reserve a ready-to-go kit
          for your pickup date.
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
                ? `$${selectedKitPrice}`
                : selectedKitPrice}
            </p>
          </div>
        </div>

        <div className="booking-tips">
          <p className="tips-label">Quick Tips</p>
          <ul className="tips-list">
            <li>📅 Book at least 3-5 days ahead for availability</li>
            <li>📍 Weekend dates are released on Thursdays</li>
            <li>💬 Add notes about your destination or weather needs</li>
          </ul>
        </div>
      </article>

      <form ref={formRef} className="booking-form-card reveal" onSubmit={handleSubmit}>
        {!isSubmitted && (
          <>
            <div className="booking-form-field">
              <label className="form-label" htmlFor="booking-name">
                Full Name
                <span className="required-indicator">*</span>
              </label>
              <input
                className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                id="booking-name"
                name="name"
                onChange={handleChange}
                required
                value={formData.name}
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="booking-form-field">
              <label className="form-label" htmlFor="booking-email">
                Email
                <span className="required-indicator">*</span>
              </label>
              <input
                className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                id="booking-email"
                name="email"
                onChange={handleChange}
                required
                type="email"
                value={formData.email}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="booking-form-field booking-dates-field">
              <label className="form-label">
                Trip Dates
                <span className="required-indicator">*</span>
              </label>
              <div className="date-inputs-group">
                <div className="date-input-wrapper">
                  <label className="date-input-label" htmlFor="booking-start-date">
                    From
                  </label>
                  <input
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
                <p className="form-error">{errors.startDate || errors.endDate}</p>
              )}
            </div>

            <div className="booking-form-field">
              <label className="form-label" htmlFor="booking-group-size">
                Group Size
              </label>
              <select
                className="form-input"
                defaultValue="2"
                id="booking-group-size"
                name="groupSize"
                onChange={handleChange}
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
                maxLength="200"
                name="notes"
                onChange={handleChange}
                placeholder="Tell us your destination and preferred gear add-ons."
                rows="4"
                value={formData.notes}
              />
            </div>

            <button className="primary-button booking-submit-button" type="submit">
              Request Tentative Hold
            </button>
          </>
        )}

        {isSubmitted && (
          <div className="booking-feedback booking-feedback-success">
            <div className="feedback-icon">✓</div>
            <h3>Request Received!</h3>
            <p>
              Thanks for booking with Nomad Gear. We'll confirm your kit availability
              and send details to <strong>{formData.email}</strong> within 2 hours.
            </p>
            {formData.startDate && formData.endDate && (
              <p className="booking-dates-confirmation">
                📅 Trip: <strong>{new Date(formData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(formData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
              </p>
            )}
            <p className="feedback-note">
              🏕️ Check your booking status anytime by logging into your account.
            </p>
          </div>
        )}
      </form>
    </section>
  )
}

export default BookingPage