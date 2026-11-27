import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-container">
        <div className="footer-brand-section">
          <Link to="/" className="footer-brand">
            Nomad Gear
          </Link>
          <p className="footer-tagline">
            Complete camping equipment kits rented by the day, inspected before every handoff.
          </p>
          <div className="footer-contact">
            <p>
              Support:{' '}
              <a href="mailto:hello@nomadgear.com">hello@nomadgear.com</a>
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-section-title">Rentals</h3>
          <nav aria-label="Rentals" className="footer-nav">
            <Link className="footer-link" to="/">
              Home
            </Link>
            <Link className="footer-link" to="/gear">
              Gear Catalog
            </Link>
            <Link className="footer-link" to="/booking">
              Booking Request
            </Link>
          </nav>
        </div>

        <div className="footer-section">
          <h3 className="footer-section-title">Information</h3>
          <nav aria-label="Information" className="footer-nav">
            <Link className="footer-link" to="/about">
              About Nomad Gear
            </Link>
            <Link className="footer-link" to="/roadmap">
              Product Roadmap
            </Link>
            <a className="footer-link" href="#newsletter-signup">
              Field Notes Newsletter
            </a>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="page-shell footer-bottom-content">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Nomad Gear.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
