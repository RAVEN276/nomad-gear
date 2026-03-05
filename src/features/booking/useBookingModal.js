import { useContext } from 'react'
import BookingModalContext from './BookingModalStore'

export function useBookingModal() {
  const bookingModalContext = useContext(BookingModalContext)

  if (!bookingModalContext) {
    throw new Error('useBookingModal must be used within BookingModalProvider')
  }

  return bookingModalContext
}
