import { animate } from 'animejs'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { HERO_IMAGE, LAZY_PLACEHOLDER } from '../data/media'
import { useParallaxScroll } from '../hooks/useParallaxScroll'

function HeroSection() {
  const { elementRef } = useParallaxScroll(0.3)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Animate hero image with subtle zoom on load
    const heroImg = document.querySelector('.hero-image')
    if (heroImg) {
      animate(heroImg, {
        scale: [0.95, 1],
        opacity: [0.8, 1],
        duration: 1200,
        easing: 'easeOutQuad',
      })
    }
  }, [])

  const handleButtonHover = (isEnter, target) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const button = target.closest('button, a.primary-button, a.ghost-button')
    if (!button) return

    animate(button, {
      scale: isEnter ? 1.08 : 1,
      duration: 260,
      easing: 'easeOutQuad',
    })
  }

  return (
    <section className="hero-section">
      <img
        alt="A tent beside a mountain lake at sunrise"
        className="hero-image lozad"
        data-src={HERO_IMAGE}
        ref={elementRef}
        src={LAZY_PLACEHOLDER}
      />
      <div className="hero-overlay" />

      <div className="hero-content reveal">
        <p className="eyebrow">Premium Camping Rentals</p>
        <h1>Trade city noise for alpine silence.</h1>
        <p>
          Nomad Gear curates ready-to-roll camping kits so you can go from
          commute to campfire in one booking.
        </p>
        <div className="hero-actions">
          <Link
            className="primary-button"
            onMouseEnter={(e) => handleButtonHover(true, e)}
            onMouseLeave={(e) => handleButtonHover(false, e)}
            to="/gear"
          >
            Explore Gear Kits
          </Link>
          <a
            className="ghost-button"
            href="#destination-inspiration"
            onMouseEnter={(e) => handleButtonHover(true, e)}
            onMouseLeave={(e) => handleButtonHover(false, e)}
          >
            Destination Inspiration
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection