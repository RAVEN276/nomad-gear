import { animate } from 'animejs'
import { useCallback, useRef } from 'react'

export function useSVGMorph() {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const morphHamburger = useCallback((container: HTMLElement, isOpen: boolean) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lines = container.querySelectorAll<SVGLineElement>('.hamburger-line-morph')
    if (lines.length < 3) return

    if (isOpen) {
      animate(lines[0], {
        rotate: 45,
        translateY: 8,
        duration: 350,
        ease: 'inOutQuad',
      })
      animate(lines[1], {
        opacity: 0,
        duration: 350,
        ease: 'inOutQuad',
      })
      animate(lines[2], {
        rotate: -45,
        translateY: -8,
        duration: 350,
        ease: 'inOutQuad',
      })
    } else {
      animate(lines[0], {
        rotate: 0,
        translateY: 0,
        duration: 350,
        ease: 'inOutQuad',
      })
      animate(lines[1], {
        opacity: 1,
        duration: 350,
        ease: 'inOutQuad',
      })
      animate(lines[2], {
        rotate: 0,
        translateY: 0,
        duration: 350,
        ease: 'inOutQuad',
      })
    }
  }, [])

  const morphIcon = useCallback((iconElement: SVGSVGElement | HTMLElement | null, duration = 500) => {
    if (!iconElement || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    animate(iconElement, {
      scale: [1, 1.15, 1],
      rotate: [0, 8, 0],
      duration,
      ease: 'inOutElastic(1, .6)',
    })
  }, [])

  return {
    svgRef,
    morphHamburger,
    morphIcon,
  }
}
