import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { GearImage, GearItem } from '@/store/useBookingStore'
import GalleryLightboxContext from './GalleryLightboxStore'

function resolveGalleryImages(gear: GearItem | null | undefined): GearImage[] {
  if (!gear) {
    return []
  }

  if (Array.isArray(gear.images) && gear.images.length > 0) {
    return gear.images
  }

  return [
    {
      id: `${gear.id}-hero`,
      src: gear.image,
      alt: gear.imageAlt,
    },
  ]
}

export function GalleryLightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const galleryImages = useMemo(
    () => resolveGalleryImages(selectedGear),
    [selectedGear],
  )

  const openGallery = useCallback((gear: GearItem | null | undefined, startIndex = 0) => {
    if (!gear) {
      return
    }

    const images = resolveGalleryImages(gear)
    if (images.length === 0) {
      return
    }

    const safeIndex = Math.min(Math.max(startIndex, 0), images.length - 1)
    setSelectedGear(gear)
    setActiveIndex(safeIndex)
    setIsOpen(true)
  }, [])

  const closeGallery = useCallback(() => {
    setIsOpen(false)
  }, [])

  const goToImage = useCallback(
    (nextIndex: number) => {
      if (!galleryImages.length) {
        return
      }

      const boundedIndex = Math.min(Math.max(nextIndex, 0), galleryImages.length - 1)
      setActiveIndex(boundedIndex)
    },
    [galleryImages.length],
  )

  const nextImage = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (!galleryImages.length) {
        return currentIndex
      }
      return (currentIndex + 1) % galleryImages.length
    })
  }, [galleryImages.length])

  const previousImage = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (!galleryImages.length) {
        return currentIndex
      }
      return (currentIndex - 1 + galleryImages.length) % galleryImages.length
    })
  }, [galleryImages.length])

  const galleryValue = useMemo(
    () => ({
      activeIndex,
      closeGallery,
      galleryImages,
      goToImage,
      isOpen,
      nextImage,
      openGallery,
      previousImage,
      selectedGear,
    }),
    [
      activeIndex,
      closeGallery,
      galleryImages,
      goToImage,
      isOpen,
      nextImage,
      openGallery,
      previousImage,
      selectedGear,
    ],
  )

  return (
    <GalleryLightboxContext.Provider value={galleryValue}>
      {children}
    </GalleryLightboxContext.Provider>
  )
}
