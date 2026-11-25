import { useContext } from 'react'
import GalleryLightboxContext, { type GalleryLightboxContextValue } from './GalleryLightboxStore'

export function useGalleryLightbox(): GalleryLightboxContextValue {
  const galleryContext = useContext(GalleryLightboxContext)

  if (!galleryContext) {
    throw new Error('useGalleryLightbox must be used within GalleryLightboxProvider')
  }

  return galleryContext
}
