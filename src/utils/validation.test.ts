import { describe, it, expect } from 'vitest'
import { bookingFormSchema } from './validation'

describe('bookingFormSchema', () => {
  it('validates correct form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      groupSize: '2',
      notes: 'Mountain trip',
    }

    const result = bookingFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('fails when name is missing', () => {
    const invalidData = {
      name: '',
      email: 'john@example.com',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      groupSize: '2',
    }

    const result = bookingFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toContain('name')
    }
  })

  it('fails when email is invalid', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      groupSize: '2',
    }

    const result = bookingFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toContain('email')
    }
  })

  it('fails when end date is before start date', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      startDate: '2025-01-20',
      endDate: '2025-01-15',
      groupSize: '2',
    }

    const result = bookingFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toContain('endDate')
    }
  })

  it('fails when notes exceed 200 characters', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      groupSize: '2',
      notes: 'a'.repeat(201),
    }

    const result = bookingFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toContain('notes')
    }
  })
})
