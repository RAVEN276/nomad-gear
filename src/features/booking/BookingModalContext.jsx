import { useCallback, useMemo, useState } from 'react'
import BookingModalContext from './BookingModalStore'

export function BookingModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGear, setSelectedGear] = useState(null)

  const openBookingModal = useCallback((gear = null) => {
    setSelectedGear(gear)
    setIsOpen(true)
  }, [])

  const closeBookingModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const modalValue = useMemo(
    () => ({
      isOpen,
      selectedGear,
      openBookingModal,
      closeBookingModal,
    }),
    [closeBookingModal, isOpen, openBookingModal, selectedGear],
  )

  return (
    <BookingModalContext.Provider value={modalValue}>
      {children}
    </BookingModalContext.Provider>
  )
}
