import { animate } from 'animejs'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    animate(cardRef.current, {
      translateY: [18, 0],
      opacity: [0, 1],
      duration: 420,
      ease: 'outExpo',
    })
  }, [])

  return (
    <section className="page-shell section-block page-top-space">
      <div className="gear-catalog-error" ref={cardRef}>
        <span className="section-folio">404 · Route Missing</span>
        <h1>Trail not found</h1>
        <p>That page does not exist. Return home or browse active rental kits.</p>
        <div className="hero-actions">
          <Link className="primary-button" to="/">
            Return Home
          </Link>
          <Link className="ghost-button" to="/gear">
            Browse Rental Kits
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
