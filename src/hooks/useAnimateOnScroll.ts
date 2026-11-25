import { animate, stagger } from 'animejs'
import { useEffect } from 'react'

export function useAnimateOnScroll(selector: string, dependencyKey = ''): void {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
    if (!elements.length) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return undefined
    }

    elements.forEach((el) => {
      if (el.dataset.animated !== 'true') {
        el.style.opacity = '0'
        el.style.transform = 'translateY(18px)'
      }
    })

    const pendingBatch: HTMLElement[] = []
    let flushTimer: ReturnType<typeof setTimeout> | undefined

    const flushBatch = () => {
      if (!pendingBatch.length) return
      const targets = pendingBatch.splice(0, pendingBatch.length)
      animate(targets, {
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 480,
        delay: stagger(55),
        ease: 'outQuad',
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting && target.dataset.animated !== 'true') {
            target.dataset.animated = 'true'
            observer.unobserve(target)
            pendingBatch.push(target)
          }
        })

        if (pendingBatch.length > 0 && !flushTimer) {
          flushTimer = setTimeout(() => {
            flushTimer = undefined
            flushBatch()
          }, 24)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
    )

    elements.forEach((el) => {
      if (el.dataset.animated !== 'true') {
        observer.observe(el)
      }
    })

    return () => {
      observer.disconnect()
      if (flushTimer) clearTimeout(flushTimer)
    }
  }, [selector, dependencyKey])
}
