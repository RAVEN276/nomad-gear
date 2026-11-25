import { useEffect } from 'react'
import lozad from 'lozad'

export function useLozadObserver(routeKey: string): void {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const observer = lozad('img.lozad', {
          rootMargin: '240px 0px',
          threshold: 0.1,
          loaded: (element) => {
            element.classList.add('is-loaded')
          },
        })

        observer.observe()
      } catch (error) {
        console.error('Lozad initialization error:', error)
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [routeKey])
}
