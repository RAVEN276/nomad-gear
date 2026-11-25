import { animate, type AnimationParams } from 'animejs'
import { useRef } from 'react'

export interface HoverAnimationConfig {
  enter?: AnimationParams
  leave?: AnimationParams
}

export function useHoverAnimation<T extends HTMLElement = HTMLElement>(
  config: HoverAnimationConfig = {},
) {
  const ref = useRef<T | null>(null)

  const handleMouseEnter = () => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const defaultConfig: AnimationParams = {
      scale: [1, 1.05],
      duration: 280,
      ease: 'outQuad',
      ...config.enter,
    }
    animate(ref.current, defaultConfig)
  }

  const handleMouseLeave = () => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const defaultConfig: AnimationParams = {
      scale: [1.05, 1],
      duration: 220,
      ease: 'outQuad',
      ...config.leave,
    }
    animate(ref.current, defaultConfig)
  }

  return {
    ref,
    handlers: { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
  }
}
