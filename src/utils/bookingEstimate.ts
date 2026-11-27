export interface RentalEstimate {
  days: number
  totalCost: number | null
}

function parseUtcDayMs(isoDate: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim())
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  const utcDate = new Date(Date.UTC(year, month, day))

  if (
    utcDate.getUTCFullYear() !== year ||
    utcDate.getUTCMonth() !== month ||
    utcDate.getUTCDate() !== day
  ) {
    return null
  }

  return utcDate.getTime()
}

/**
 * Calculates inclusive rental days and optional total cost for YYYY-MM-DD trip dates.
 */
export function calculateRentalEstimate(
  startDate: string,
  endDate: string,
  dailyRate?: number,
): RentalEstimate | null {
  const startMs = parseUtcDayMs(startDate)
  const endMs = parseUtcDayMs(endDate)

  if (startMs === null || endMs === null || endMs < startMs) {
    return null
  }

  const days = Math.floor((endMs - startMs) / 86_400_000) + 1
  return {
    days,
    totalCost: typeof dailyRate === 'number' ? days * dailyRate : null,
  }
}

export function formatDayCount(days: number): string {
  return `${days} day${days === 1 ? '' : 's'}`
}
