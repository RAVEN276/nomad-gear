import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSubmitBooking } from '@/api/useGearApi'
import { bookingFormSchema, type BookingFormData } from '@/utils/validation'
import { useBookingStore } from '@/store/useBookingStore'
import { useState } from 'react'

export function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { selectedGear, resetBookingForm } = useBookingStore()
  const submitBooking = useSubmitBooking()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      startDate: '',
      endDate: '',
      groupSize: '2',
      notes: '',
    },
  })

  const startDate = watch('startDate')

  const onSubmit = async (data: BookingFormData) => {
    try {
      await submitBooking.mutateAsync({
        ...data,
        gearSlug: selectedGear?.slug,
      })
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        resetBookingForm()
        setValue('name', '')
        setValue('email', '')
        setValue('startDate', '')
        setValue('endDate', '')
        setValue('groupSize', '2')
        setValue('notes', '')
      }, 3000)
    } catch (error) {
      console.error('Booking submission failed:', error)
    }
  }

  if (isSubmitted) {
    return (
      <div className="booking-feedback booking-feedback-success">
        <div className="feedback-icon">✓</div>
        <h3>Request Received!</h3>
        <p>
          Thanks for booking with Nomad Gear. We'll confirm your kit availability
          and send details within 2 hours.
        </p>
      </div>
    )
  }

  return (
    <form className="booking-form-card" onSubmit={handleSubmit(onSubmit)}>
      <div className="booking-form-field">
        <label className="form-label" htmlFor="booking-name">
          Full Name
          <span className="required-indicator">*</span>
        </label>
        <input
          className={`form-input ${errors.name ? 'form-input-error' : ''}`}
          id="booking-name"
          {...register('name')}
        />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div className="booking-form-field">
        <label className="form-label" htmlFor="booking-email">
          Email
          <span className="required-indicator">*</span>
        </label>
        <input
          className={`form-input ${errors.email ? 'form-input-error' : ''}`}
          id="booking-email"
          type="email"
          {...register('email')}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
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
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('startDate')}
            />
          </div>
          <div className="date-input-wrapper">
            <label className="date-input-label" htmlFor="booking-end-date">
              To
            </label>
            <input
              className={`form-input date-input ${errors.endDate ? 'form-input-error' : ''}`}
              id="booking-end-date"
              type="date"
              min={startDate || new Date().toISOString().split('T')[0]}
              {...register('endDate')}
            />
          </div>
        </div>
        {(errors.startDate || errors.endDate) && (
          <p className="form-error">
            {errors.startDate?.message || errors.endDate?.message}
          </p>
        )}
      </div>

      <div className="booking-form-field">
        <label className="form-label" htmlFor="booking-group-size">
          Group Size
        </label>
        <select
          className="form-input"
          id="booking-group-size"
          {...register('groupSize')}
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
            {watch('notes')?.length || 0}/200
          </span>
        </label>
        <textarea
          className="form-input"
          id="booking-notes"
          rows="4"
          maxLength={200}
          placeholder="Tell us your destination and preferred gear add-ons."
          {...register('notes')}
        />
      </div>

      <button
        className="primary-button booking-submit-button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Request Tentative Hold'}
      </button>
    </form>
  )
}
