import { animate } from 'animejs'
import { useEffect, useRef } from 'react'

export function useBlurUpImage<T extends HTMLImageElement = HTMLImageElement>() {
  const imageRef = useRef<T | null>(null)

  useEffect(() => {
    const image = imageRef.current
    if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const img = entry.target as HTMLImageElement
        const src = img.dataset.src || img.src

        if (!src) return

        const fullImg = new Image()
        fullImg.onload = () => {
          animate(img, {
            filter: ['blur(10px)', 'blur(0px)'],
            opacity: [0.7, 1],
            duration: 500,
            ease: 'outQuad',
          })
          img.src = src
          img.classList.add('is-loaded')
        }
        fullImg.src = src
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px',
    })

    observer.observe(image)

    return () => observer.disconnect()
  }, [])

  return { imageRef }
}
