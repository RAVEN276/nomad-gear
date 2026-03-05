import { animate } from 'animejs'
import { useEffect, useRef } from 'react'

export function useBlurUpImage() {
  const imageRef = useRef(null)

  useEffect(() => {
    const image = imageRef.current
    if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const img = entry.target
        const src = img.dataset.src || img.src

        if (!src) return

        // Load full resolution image
        const fullImg = new Image()
        fullImg.onload = () => {
          animate(img, {
            filter: ['blur(10px)', 'blur(0px)'],
            opacity: [0.7, 1],
            duration: 500,
            easing: 'easeOutQuad',
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

    if (image) observer.observe(image)

    return () => observer.disconnect()
  }, [])

  return { imageRef }
}
