import { animate, type JSAnimation } from 'animejs'
import { useEffect, useRef } from 'react'

export function useLoadingAnimation<T extends HTMLElement = HTMLElement>(isLoading = false) {
  const spinnerRef = useRef<T | null>(null)
  const animationRef = useRef<JSAnimation | null>(null)

  useEffect(() => {
    if (!spinnerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (isLoading) {
      animationRef.current = animate(spinnerRef.current, {
        rotate: [0, 360],
        duration: 1200,
        ease: 'linear',
        loop: true,
      })
    } else if (animationRef.current) {
      animationRef.current.pause()
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.pause()
      }
    }
  }, [isLoading])

  return { spinnerRef }
}
