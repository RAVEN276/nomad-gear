import { animate } from 'animejs'
import { useEffect, useRef } from 'react'

export function useCounterAnimation<T extends HTMLElement = HTMLElement>(
  targetValue: number,
  duration = 1000,
) {
  const ref = useRef<T | null>(null)
  const counterRef = useRef(0)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (element) element.textContent = String(targetValue)
      return undefined
    }

    const state = { value: 0 }
    const animation = animate(state, {
      value: targetValue,
      duration,
      ease: 'outQuad',
      onUpdate: () => {
        counterRef.current = state.value
        if (ref.current) {
          ref.current.textContent = Math.floor(state.value).toLocaleString()
        }
      },
      onComplete: () => {
        if (ref.current) {
          ref.current.textContent = targetValue.toLocaleString()
        }
      },
    })

    return () => {
      animation.pause()
    }
  }, [targetValue, duration])

  return ref
}
