import { animate, stagger, type AnimationParams } from 'animejs'
import { useEffect } from 'react'

export function useStaggerAnimation(selector: string, animationConfig: AnimationParams = {}): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const elements = document.querySelectorAll<HTMLElement>(selector)
    if (!elements.length) return undefined

    const config: AnimationParams = {
      opacity: [0, 1],
      y: [20, 0],
      duration: 500,
      ease: 'outQuad',
      delay: stagger(60),
      ...animationConfig,
    }

    const animation = animate(elements, config)

    return () => {
      animation.pause()
    }
  }, [selector, animationConfig])
}
