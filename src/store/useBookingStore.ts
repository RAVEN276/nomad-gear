import { create } from 'zustand'

export interface GearItem {
  id: string
  name: string
  slug: string
  pricePerDay: number
  category: string
  image: string
  description: string
  features: string[]
  inStock: boolean
}

export interface BookingState {
  selectedGear: GearItem | null
  bookingFormData: {
    name: string
    email: string
    startDate: string
    endDate: string
    groupSize: string
    notes: string
  }
  isBookingModalOpen: boolean
  setSelectedGear: (gear: GearItem | null) => void
  setBookingFormData: (data: Partial<BookingState['bookingFormData']>) => void
  openBookingModal: (gear?: GearItem) => void
  closeBookingModal: () => void
  resetBookingForm: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedGear: null,
  bookingFormData: {
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    groupSize: '2',
    notes: '',
  },
  isBookingModalOpen: false,
  setSelectedGear: (gear) => set({ selectedGear: gear }),
  setBookingFormData: (data) =>
    set((state) => ({
      bookingFormData: { ...state.bookingFormData, ...data },
    })),
  openBookingModal: (gear) =>
    set({
      isBookingModalOpen: true,
      selectedGear: gear ?? null,
    }),
  closeBookingModal: () => set({ isBookingModalOpen: false }),
  resetBookingForm: () =>
    set({
      bookingFormData: {
        name: '',
        email: '',
        startDate: '',
        endDate: '',
        groupSize: '2',
        notes: '',
      },
    }),
}))
