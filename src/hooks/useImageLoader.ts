import { useState, useEffect } from 'react'

export function useImageLoader(src: string, placeholder: string = '') {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!src) return

    const img = new Image()
    img.src = src

    img.onload = () => {
      setIsLoaded(true)
      setError(null)
    }

    img.onerror = () => {
      setError('Failed to load image')
      setIsLoaded(true)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return {
    isLoaded,
    error,
    imageSrc: isLoaded ? src : placeholder,
  }
}
