import type { GearItem } from '@/store/useBookingStore'

const API_BASE_URL = '/api'

export async function fetchGearList(): Promise<GearItem[]> {
  const response = await fetch(`${API_BASE_URL}/gear`)
  if (!response.ok) {
    throw new Error('Failed to fetch gear list')
  }
  return response.json()
}

export async function fetchGearBySlug(slug: string): Promise<GearItem> {
  const response = await fetch(`${API_BASE_URL}/gear/${slug}`)
  if (!response.ok) {
    throw new Error('Failed to fetch gear details')
  }
  return response.json()
}

export async function submitBooking(data: {
  name: string
  email: string
  startDate: string
  endDate: string
  groupSize: string
  notes: string
  gearSlug?: string
}): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to submit booking')
  }
  return response.json()
}
