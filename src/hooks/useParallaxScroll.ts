import { useEffect, useRef } from 'react'

export function useParallaxScroll<T extends HTMLElement = HTMLImageElement>(strength = 0.5) {
  const elementRef = useRef<T | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrollY

      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const scrollDistance = scrollY - elementTop
      const parallaxOffset = scrollDistance * strength

      element.style.transform = `translateY(${parallaxOffset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [strength])

  return { elementRef }
}
