import { createContext } from 'react'
import type { GearImage, GearItem } from '@/store/useBookingStore'

export interface GalleryLightboxContextValue {
  activeIndex: number
  closeGallery: () => void
  galleryImages: GearImage[]
  goToImage: (nextIndex: number) => void
  isOpen: boolean
  nextImage: () => void
  openGallery: (gear: GearItem | null | undefined, startIndex?: number) => void
  previousImage: () => void
  selectedGear: GearItem | null
}

const GalleryLightboxContext = createContext<GalleryLightboxContextValue | null>(null)

export default GalleryLightboxContext
