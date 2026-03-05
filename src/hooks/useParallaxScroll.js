import { useEffect, useRef } from 'react'

export function useParallaxScroll(strength = 0.5) {
  const elementRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const element = elementRef.current

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
