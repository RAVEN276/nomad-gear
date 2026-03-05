import { animate, stagger } from 'animejs'
import { useEffect } from 'react'

export function useStaggerAnimation(selector, animationConfig = {}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return undefined

    const config = {
      opacity: [0, 1],
      y: [20, 0],
      duration: 500,
      easing: 'easeOutQuad',
      delay: stagger(60),
      ...animationConfig,
    }

    const animation = animate(elements, config)

    return () => animation.pause()
  }, [selector, animationConfig])
}
