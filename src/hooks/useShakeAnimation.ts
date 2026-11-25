import { animate } from 'animejs'

export function useShakeAnimation() {
  const triggerShake = (element: HTMLElement | null, intensity = 8) => {
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    animate(element, {
      translateX: [
        0,
        -intensity * 0.5,
        intensity * 0.5,
        -intensity * 0.3,
        intensity * 0.3,
        0,
      ],
      duration: 400,
      ease: 'inOutQuad',
    })
  }

  return { triggerShake }
}
