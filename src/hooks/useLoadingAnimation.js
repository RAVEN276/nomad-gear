import { animate } from 'animejs'
import { useEffect, useRef, useState } from 'react'

export function useLoadingAnimation(isLoading = false) {
  const spinnerRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!spinnerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (isLoading) {
      animationRef.current = animate(spinnerRef.current, {
        rotate: [0, 360],
        duration: 1200,
        easing: 'linear',
        loop: true,
      })
    } else {
      if (animationRef.current) {
        animationRef.current.pause()
      }
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.pause()
      }
    }
  }, [isLoading])

  return { spinnerRef }
}
