interface RoadmapPhase {
  phase: string
  title: string
  status: string
  items: string[]
}

const phases: RoadmapPhase[] = [
  {
    phase: 'Phase 02',
    title: 'Catalog Discovery & Media',
    status: 'Shipped',
    items: [
      'Category navigation and URL filter sync',
      'Per-profile wishlist saved locally',
      'Price, category, and rating sorting',
      'Multi-image kit gallery lightbox',
      'Newsletter subscription form',
    ],
  },
  {
    phase: 'Phase 03',
    title: 'WebGL 3D & Accessibility',
    status: 'Shipped',
    items: [
      'Three.js WebGL 3D kit models animated via Anime.js v4',
      'Pointer drag and keyboard camera controls',
      'Clean 2D scroll reveals respecting reduced motion',
      'Light and dark Swiss theme parity',
    ],
  },
  {
    phase: 'Phase 04',
    title: 'Backend & Reservations',
    status: 'Planned',
    items: [
      'Authenticated camper accounts',
      'Payment checkout integration',
      'Persistent review storage',
      'Live kit availability calendar',
      'Automated booking email dispatch',
    ],
  },
  {
    phase: 'Phase 05',
    title: 'Performance & Search',
    status: 'Planned',
    items: [
      'Server-side rendering support',
      'Responsive WebP/AVIF asset pipeline',
      'Structured product metadata',
      'Bundle splitting per route',
    ],
  },
]

function RoadmapPage() {
  return (
    <div className="page-shell">
      <section className="roadmap-hero">
        <span className="section-folio">01 · Development Plan</span>
        <h1>Product Roadmap</h1>
        <p>
          Completed milestones and planned platform work for Nomad Gear.
        </p>
      </section>

      <section className="roadmap-section">
        <h2>Delivery Phases</h2>
        <p className="roadmap-subtitle">
          Current client capabilities and upcoming backend integrations.
        </p>

        <div className="roadmap-timeline">
          {phases.map((p) => (
            <div className="roadmap-card reveal-item" key={p.phase}>
              <div className="roadmap-card-header">
                <div>
                  <span className="roadmap-phase">{p.phase}</span>
                  <h3>{p.title}</h3>
                </div>
                <span className="roadmap-status">{p.status}</span>
              </div>
              <ul className="roadmap-items">
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="roadmap-section roadmap-section-final">
        <div className="roadmap-cta">
          <div>
            <h2>Feature Suggestions</h2>
            <p>Send feedback on kit contents or booking workflow directly to the team.</p>
          </div>
          <a className="primary-button" href="mailto:hello@nomadgear.com?subject=Feature Request">
            Email Feedback
          </a>
        </div>
      </section>
    </div>
  )
}

export default RoadmapPage
