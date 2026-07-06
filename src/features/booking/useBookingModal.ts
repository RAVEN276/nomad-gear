import { useBookingStore } from '@/store/useBookingStore'
import type { GearItem } from '@/store/useBookingStore'

export function useBookingModal() {
  const { isBookingModalOpen, selectedGear, openBookingModal, closeBookingModal } = useBookingStore()

  return {
    isOpen: isBookingModalOpen,
    selectedGear,
    openBookingModal: (gear?: GearItem) => openBookingModal(gear),
    closeBookingModal,
  }
}
