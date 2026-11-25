import { animate } from 'animejs'
import { useRef, type MouseEvent } from 'react'

export function useRippleAnimation<T extends HTMLElement = HTMLButtonElement>() {
  const rippleRef = useRef<T | null>(null)

  const triggerRipple = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    let ripple = button.querySelector<HTMLSpanElement>('.ripple')
    if (!ripple) {
      ripple = document.createElement('span')
      ripple.className = 'ripple'
      button.appendChild(ripple)
    }

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    animate(ripple, {
      opacity: [0.5, 0],
      scale: [0, 2.5],
      duration: 600,
      ease: 'outQuad',
    })
  }

  return { rippleRef, triggerRipple }
}
