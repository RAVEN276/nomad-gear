import { Link } from 'react-router-dom'

const kitPillars = [
  {
    folio: '01',
    title: 'Shelter & Weatherproofing',
    description:
      'Every tent is pitched, seam-checked, and aired out between rentals so poles, rainflies, and stakes arrive ready for setup.',
  },
  {
    folio: '02',
    title: 'Sleep & Thermal Systems',
    description:
      'Pads and bags are matched to route elevation and group count, pairing compact backpacking bags with insulated basecamp pads.',
  },
  {
    folio: '03',
    title: 'Camp Kitchen & Lighting',
    description:
      'Stoves, cookware, and rechargeable lanterns are packed as unified kits rather than loose parts you have to assemble yourself.',
  },
]

const inspectionProtocols = [
  {
    title: 'Post-Return Hardware Check',
    description:
      'Zippers, tent poles, stove igniters, and battery lanterns are tested after every rental return before a kit returns to stock.',
  },
  {
    title: 'Complete Inventory Manifest',
    description:
      'Each listing names every item included in the bag so there are no surprises at the trailhead.',
  },
  {
    title: 'Flexible Group Sizing',
    description:
      'Kits scale from solo and two-person ultralight bags up to four-person family and overland camp setups.',
  },
  {
    title: 'Route-Matched Support',
    description:
      'Include your destination and expected overnight lows in your booking notes so we can flag any gear adjustments before pickup.',
  },
]

function AboutPage() {
  return (
    <section className="page-shell section-block page-top-space">
      <header className="about-hero-split">
        <div>
          <span className="section-folio">01 · Operational Standard</span>
          <h1>Camp without owning a garage full of gear.</h1>
        </div>
        <div className="about-mission-panel">
          <p>
            Nomad Gear packages shelter, sleep systems, stoves, and lighting into
            complete daily-rate kits so occasional and weekend campers do not have
            to buy, clean, and store seasonal equipment.
          </p>
        </div>
      </header>

      <section className="about-section">
        <div className="section-header-split" style={{ marginBottom: 0, borderBottom: 0, paddingBottom: 0 }}>
          <div className="section-heading-main">
            <span className="section-folio">02 · Kit Architecture</span>
            <h2>Three layers in every bundle</h2>
          </div>
          <p>
            Instead of renting loose individual items, each kit groups compatible
            hardware for a specific trip style.
          </p>
        </div>

        <div className="about-architecture-grid">
          {kitPillars.map((pillar) => (
            <article className="about-card reveal-item" key={pillar.folio}>
              <span className="about-card-num">{pillar.folio}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="section-header-split" style={{ marginBottom: 0, borderBottom: 0, paddingBottom: 0 }}>
          <div className="section-heading-main">
            <span className="section-folio">03 · Prep Protocol</span>
            <h2>How kits stay trail-ready</h2>
          </div>
          <p>
            Standardized inspection and clear manifests before every handoff.
          </p>
        </div>

        <div className="protocol-matrix">
          {inspectionProtocols.map((item) => (
            <article className="protocol-row reveal-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-cta-band">
          <div>
            <span className="section-folio">04 · Next Step</span>
            <h2>Compare kits or request dates</h2>
          </div>
          <div className="hero-actions">
            <Link className="primary-button" to="/gear">
              Browse Rental Kits
            </Link>
            <Link className="ghost-button" to="/booking">
              Request Tentative Hold
            </Link>
          </div>
        </div>
      </section>
    </section>
  )
}

export default AboutPage
