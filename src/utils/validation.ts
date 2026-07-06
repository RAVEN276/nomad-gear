import { z } from 'zod'

export const bookingFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  groupSize: z.string(),
  notes: z.string().max(200, 'Notes must be less than 200 characters').optional(),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.startDate) <= new Date(data.endDate)
  }
  return true
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
})

export type BookingFormData = z.infer<typeof bookingFormSchema>
