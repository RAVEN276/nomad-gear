import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSubmitBooking } from '@/api/useGearApi'
import { ZineDatePicker } from '@/components/ZineDatePicker'
import { ZineSelect } from '@/components/ZineSelect'
import { bookingFormSchema, type BookingFormData } from '@/utils/validation'
import { useBookingStore } from '@/store/useBookingStore'
import { useState } from 'react'

const GROUP_SIZE_OPTIONS = [
  { value: '1', label: '1 camper' },
  { value: '2', label: '2 campers' },
  { value: '3', label: '3 campers' },
  { value: '4', label: '4+ campers' },
]

export function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { selectedGear, resetBookingForm } = useBookingStore()
  const submitBooking = useSubmitBooking()

  const {
    control,
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
  const endDate = watch('endDate')
  const todayIso = new Date().toISOString().split('T')[0]

  const onSubmit = async (data: BookingFormData) => {
    try {
      await submitBooking.mutateAsync({
        ...data,
        notes: data.notes ?? '',
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
      <div className="booking-feedback booking-feedback-success" role="status">
        <div className="feedback-icon" aria-hidden="true">OK</div>
        <h3>Request Received</h3>
        <p>
          Your tentative hold request has been recorded. Availability confirmation will be sent by email.
        </p>
      </div>
    )
  }

  return (
    <form className="booking-form-card" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="booking-form-field">
        <label className="form-label" htmlFor="booking-name">
          Full Name
          <span className="required-indicator">*</span>
        </label>
        <input
          aria-invalid={!!errors.name}
          className={`form-input ${errors.name ? 'form-input-error' : ''}`}
          id="booking-name"
          placeholder="Your Name"
          {...register('name')}
        />
        {errors.name && <p className="form-error" role="alert">{errors.name.message}</p>}
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
          placeholder="name@example.com"
          type="email"
          {...register('email')}
        />
        {errors.email && <p className="form-error" role="alert">{errors.email.message}</p>}
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
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <ZineDatePicker
                  ariaInvalid={!!errors.startDate}
                  id="booking-start-date"
                  min={todayIso}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  rangeEnd={endDate}
                  rangeStart={startDate}
                  value={field.value}
                />
              )}
            />
          </div>
          <div className="date-input-wrapper">
            <label className="date-input-label" htmlFor="booking-end-date">
              To
            </label>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <ZineDatePicker
                  ariaInvalid={!!errors.endDate}
                  id="booking-end-date"
                  min={startDate || todayIso}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  rangeEnd={endDate}
                  rangeStart={startDate}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>
        {(errors.startDate || errors.endDate) && (
          <p className="form-error" role="alert">
            {errors.startDate?.message || errors.endDate?.message}
          </p>
        )}
      </div>

      <div className="booking-form-field">
        <label className="form-label" htmlFor="booking-group-size">
          Group Size
        </label>
        <Controller
          control={control}
          name="groupSize"
          render={({ field }) => (
            <ZineSelect
              id="booking-group-size"
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              options={GROUP_SIZE_OPTIONS}
              value={field.value}
            />
          )}
        />
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
          rows={4}
          maxLength={200}
          placeholder="Destination, weather considerations, or preferred add-ons."
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
