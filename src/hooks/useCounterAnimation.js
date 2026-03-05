import { animate } from 'animejs'
import { useEffect, useRef } from 'react'

export function useCounterAnimation(targetValue, duration = 1000) {
  const ref = useRef(null)
  const counterRef = useRef(0)

  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (ref.current) ref.current.textContent = targetValue
      return undefined
    }

    const animation = animate({
      value: 0,
    },
      {
        value: targetValue,
        duration,
        easing: 'easeOutQuad',
        round: 1,
        update(val) {
          counterRef.current = val.value
          if (ref.current) {
            ref.current.textContent = Math.floor(val.value).toLocaleString()
          }
        },
      })

    return () => animation.pause()
  }, [targetValue, duration])

  return ref
}
