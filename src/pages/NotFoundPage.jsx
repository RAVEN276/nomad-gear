import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const heading = document.querySelector('.not-found-heading')
    if (heading) {
      // Add wobble class for continuous animation
      heading.classList.add('wobble-animation')

      // Remove and re-add the animation every 4 seconds for continuous effect
      const interval = setInterval(() => {
        heading.classList.remove('wobble-animation')
        setTimeout(() => {
          heading.classList.add('wobble-animation')
        }, 10)
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [])

  return (
    <section className="page-shell section-block page-top-space reveal">
      <p className="eyebrow">404</p>
      <h1 className="not-found-heading">Trail not found</h1>
      <p>That page does not exist, but the next escape is still waiting.</p>
      <Link className="primary-button" to="/">
        Return Home
      </Link>
    </section>
  )
}

export default NotFoundPage