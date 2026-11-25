import { Link } from 'react-router-dom'
import { destinations, type Destination } from '../data/destinations'
import { LAZY_PLACEHOLDER } from '../data/media'

const categoryPairingByDestination: Record<string, string> = {
  'echo-lake': 'Backpacking',
  'cedar-ridge': 'Backpacking',
  'north-fjord': 'Mountain',
  'granite-meadow': 'Glamping',
  'river-bend': 'Overland',
  'summit-pines': 'Mountain',
}

function DestinationCard({
  destination,
  index,
}: {
  destination: Destination
  index: number
}) {
  const pairedCategory = categoryPairingByDestination[destination.id] ?? 'Backpacking'
  const folio = String(index + 1).padStart(2, '0')

  return (
    <article className="destination-card reveal-item">
      <div className="destination-photo">
        <img
          alt={destination.imageAlt}
          className="lozad"
          data-src={destination.image}
          height={800}
          src={LAZY_PLACEHOLDER}
          width={900}
        />
      </div>
      <div className="destination-meta">
        <p className="destination-caption">{destination.name}</p>
        <span className="destination-index">{folio}</span>
      </div>
      <p className="destination-note">{destination.note}</p>
      <Link
        className="destination-link"
        to={`/gear?category=${encodeURIComponent(pairedCategory)}`}
      >
        View {pairedCategory} kits
      </Link>
    </article>
  )
}

function DestinationInspiration() {
  return (
    <section
      className="page-shell section-block destination-section"
      id="destination-inspiration"
    >
      <div className="section-header-split">
        <div className="section-heading-main">
          <span className="section-folio">03 · Destination Index</span>
          <h2>Field pairings for weekend routes.</h2>
        </div>
        <p>
          Match terrain conditions with the kit built for them, from lakeside
          ultralight pitches to alpine ridges.
        </p>
      </div>

      <div className="destination-rail">
        {destinations.map((destination, index) => (
          <DestinationCard
            destination={destination}
            index={index}
            key={destination.id}
          />
        ))}
      </div>
    </section>
  )
}

export default DestinationInspiration
