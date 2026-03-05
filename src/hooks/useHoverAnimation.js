import { animate } from 'animejs'
import { useRef } from 'react'

export function useHoverAnimation(config = {}) {
  const ref = useRef(null)

  const handleMouseEnter = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const defaultConfig = {
      scale: [1, 1.05],
      duration: 280,
      easing: 'easeOutQuad',
      ...config.enter,
    }
    animate(ref.current, defaultConfig)
  }

  const handleMouseLeave = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const defaultConfig = {
      scale: [1.05, 1],
      duration: 220,
      easing: 'easeOutQuad',
      ...config.leave,
    }
    animate(ref.current, defaultConfig)
  }

  return {
    ref,
    handlers: { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
  }
}
