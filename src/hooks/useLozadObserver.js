import { useEffect } from 'react'
import lozad from 'lozad'

export function useLozadObserver(routeKey) {
  useEffect(() => {
    // Initialize lozad after a short delay to allow DOM to settle
    const timeoutId = setTimeout(() => {
      try {
        // Use lozad with selector - this is the most reliable method
        const observer = lozad('img.lozad', {
          rootMargin: '240px 0px',
          threshold: 0.1,
          loaded: (element) => {
            element.classList.add('is-loaded')
          },
        })

        // Start observing
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
