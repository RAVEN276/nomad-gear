import { animate, type AnimationParams } from 'animejs'
import type { RefObject } from 'react'

export function createClickAnimation(element: HTMLElement | null, config: AnimationParams = {}): void {
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const defaultConfig: AnimationParams = {
    scale: [1, 0.98, 1],
    duration: 200,
    ease: 'inOutQuad',
    ...config,
  }

  animate(element, defaultConfig)
}

export function useClickAnimation<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  config: AnimationParams = {},
) {
  const handleClick = () => {
    if (ref.current) {
      createClickAnimation(ref.current, config)
    }
  }

  return { handleClick }
}
