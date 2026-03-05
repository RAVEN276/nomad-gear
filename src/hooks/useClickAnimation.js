import { animate } from 'animejs'

export function createClickAnimation(element, config = {}) {
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const defaultConfig = {
    scale: [1, 0.98, 1],
    duration: 200,
    easing: 'easeInOutQuad',
    ...config,
  }

  animate(element, defaultConfig)
}

export function useClickAnimation(ref, config = {}) {
  const handleClick = () => {
    if (ref.current) {
      createClickAnimation(ref.current, config)
    }
  }

  return { handleClick }
}
