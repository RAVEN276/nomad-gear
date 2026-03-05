import { animate } from 'animejs'
import { useRef } from 'react'
import { destinations } from '../data/destinations'
import { LAZY_PLACEHOLDER } from '../data/media'
import { useStaggerAnimation } from '../hooks/useStaggerAnimation'

function DestinationInspiration() {
  useStaggerAnimation('.destination-card', {
    opacity: [0, 1],
    rotateZ: [-2, 0],
    duration: 600,
    delay: (el, i) => i * 50,
  })

  const cards = useRef([])

  const handleCardHover = (index, isEnter) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!cards.current[index]) return

    const card = cards.current[index]
    animate(card, {
      scale: isEnter ? 1.06 : 1,
      y: isEnter ? -12 : 0,
      rotateZ: isEnter ? 1 : 0,
      duration: 300,
      easing: 'easeOutQuad',
    })
  }

  return (
    <section
      className="page-shell section-block destination-section"
      id="destination-inspiration"
    >
      <div className="section-heading reveal">
        <p className="eyebrow">Destination Inspiration</p>
        <h2>Find your next no-signal weekend.</h2>
        <p>
          Save these campsites for your next reset. Each one pairs perfectly
          with our ready-to-rent equipment bundles.
        </p>
      </div>

      <div className="destination-rail reveal">
        {destinations.map((destination, index) => (
          <article
            ref={(el) => {
              if (el) cards.current[index] = el
            }}
            className="destination-card"
            key={destination.id}
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
          >
            <div className="destination-photo">
              <img
                alt={destination.imageAlt}
                className="lozad"
                data-src={destination.image}
                src={LAZY_PLACEHOLDER}
              />
            </div>
            <p className="destination-caption">{destination.name}</p>
            <p className="destination-note">{destination.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DestinationInspiration