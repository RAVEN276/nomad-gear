import { describe, expect, it } from 'vitest'
import { calculateRentalEstimate, formatDayCount } from './bookingEstimate'

describe('bookingEstimate', () => {
  it('computes inclusive days and total cost for a multi-day range', () => {
    expect(calculateRentalEstimate('2026-12-10', '2026-12-12', 45)).toEqual({
      days: 3,
      totalCost: 135,
    })
  })

  it('treats same-day pickup and return as 1 day', () => {
    expect(calculateRentalEstimate('2026-12-10', '2026-12-10', 60)).toEqual({
      days: 1,
      totalCost: 60,
    })
  })

  it('returns null totalCost when kit daily rate is custom', () => {
    expect(calculateRentalEstimate('2026-12-10', '2026-12-11')).toEqual({
      days: 2,
      totalCost: null,
    })
  })

  it('returns null for missing, malformed, or reversed dates', () => {
    expect(calculateRentalEstimate('', '2026-12-12', 45)).toBeNull()
    expect(calculateRentalEstimate('2026-02-30', '2026-03-02', 45)).toBeNull()
    expect(calculateRentalEstimate('2026-12-12', '2026-12-10', 45)).toBeNull()
  })

  it('formats singular and plural day counts', () => {
    expect(formatDayCount(1)).toBe('1 day')
    expect(formatDayCount(4)).toBe('4 days')
  })
})
