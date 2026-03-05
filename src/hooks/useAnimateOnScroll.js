import { animate } from 'animejs'
import { useEffect } from 'react'

export function useAnimateOnScroll(selector, animationConfig = {}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true'
            const config = {
              opacity: [0, 1],
              y: [30, 0],
              duration: 700,
              easing: 'easeOutQuad',
              ...animationConfig,
            }
            animate(entry.target, config)
          }
        })
      },
      { threshold: 0.15, rootMargin: '50px' }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector, animationConfig])
}
