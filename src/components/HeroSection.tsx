import { createTimeline, stagger } from 'animejs'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gearCatalog } from '../data/gear'
import { useBookingModal } from '../features/booking/useBookingModal'
import { CampingGear3DStage } from './CampingGear3DStage'
import { ZineTape } from './ZineMarks'

const featuredHeroKits = gearCatalog.slice(0, 3)

function HeroSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { openBookingModal } = useBookingModal()
  const heroRootRef = useRef<HTMLElement>(null)

  const activeKit = featuredHeroKits[selectedIndex] ?? featuredHeroKits[0]

  useEffect(() => {
    const root = heroRootRef.current
    if (!root) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    const copyNodes = root.querySelectorAll<HTMLElement>('.hero-stagger')

    tl.add(copyNodes, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 540,
      delay: stagger(65),
    }).add(
      '.hero-deck',
      {
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 560,
      },
      '<+=100',
    )

    return () => {
      tl.pause()
    }
  }, [])

  return (
    <section className="hero-swiss" ref={heroRootRef}>
      <div className="hero-swiss-grid">
        <div className="hero-swiss-copy">
          <div className="hero-meta-line hero-stagger">
            <span className="hero-meta-index">01</span>
            <span>Curated Camping Equipment Rentals</span>
          </div>

          <h1 className="hero-stagger">
            Pack light. Pitch fast. Leave storage behind.
          </h1>

          <p className="hero-lead hero-stagger">
            Nomad Gear rents complete, field-checked camping kits built around
            shelter, sleep, and camp cooking so your weekend starts at pickup.
          </p>

          <div className="hero-actions hero-stagger">
            <Link className="primary-button" to="/gear">
              Browse Rental Kits
            </Link>
            <a className="ghost-button" href="#destination-inspiration">
              Inspect Destinations
            </a>
          </div>

          <div className="hero-kit-selector hero-stagger">
            <p className="hero-selector-label">Inspect 3D WebGL Kit Model</p>
            <div className="hero-kit-tabs" role="tablist" aria-label="Featured kits">
              {featuredHeroKits.map((kit, index) => (
                <button
                  aria-selected={index === selectedIndex}
                  className={`hero-kit-tab${index === selectedIndex ? ' is-selected' : ''}`}
                  key={kit.id}
                  onClick={() => setSelectedIndex(index)}
                  role="tab"
                  type="button"
                >
                  <span className="hero-kit-tab-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="hero-kit-tab-name">{kit.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-stage">
          <div className="hero-deck">
            <ZineTape position="tl" />
            <ZineTape position="tr" />
            <CampingGear3DStage kit={activeKit} priorityHero />

            <div className="hero-spec-strip">
              <div className="hero-spec-cell">
                <span className="hero-spec-key">Category</span>
                <span className="hero-spec-val">{activeKit.category}</span>
              </div>
              <div className="hero-spec-cell">
                <span className="hero-spec-key">Capacity</span>
                <span className="hero-spec-val">{activeKit.capacity}</span>
              </div>
              <div className="hero-spec-cell">
                <span className="hero-spec-key">Included</span>
                <span className="hero-spec-val">{activeKit.includes.length} items</span>
              </div>
            </div>

            <div className="hero-deck-actions">
              <button
                className="primary-button"
                onClick={() => openBookingModal(activeKit)}
                type="button"
              >
                Reserve {activeKit.name}
              </button>
              <Link className="text-link" to={`/gear/${activeKit.slug}`}>
                Full kit inventory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
