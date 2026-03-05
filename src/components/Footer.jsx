import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { animate } from 'animejs'

const footerSections = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: '📧 Newsletter', href: '#' },
      { label: '🐦 Twitter', href: '#' },
      { label: '📷 Instagram', href: '#' },
      { label: '🔗 LinkedIn', href: '#' },
    ],
  },
]

const contactInfo = {
  email: 'hello@nomadgear.com',
  phone: '(555) 123-4567',
  hours: 'Mon–Fri, 9am–6pm EST',
}

function Footer() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const footerLinks = document.querySelectorAll('.footer-link')
    footerLinks.forEach((link) => {
      const handleEnter = () => {
        animate(link, {
          color: '#6b9a77',
          duration: 200,
          easing: 'easeOutQuad',
        })
      }
      const handleLeave = () => {
        animate(link, {
          color: 'inherit',
          duration: 200,
          easing: 'easeOutQuad',
        })
      }
      link.addEventListener('mouseenter', handleEnter)
      link.addEventListener('mouseleave', handleLeave)
      return () => {
        link.removeEventListener('mouseenter', handleEnter)
        link.removeEventListener('mouseleave', handleLeave)
      }
    })
  }, [])

  return (
    <footer className="site-footer reveal">
      <div className="page-shell footer-container">
        {/* Brand & Contact Section */}
        <div className="footer-brand-section">
          <Link to="/" className="footer-brand">
            Nomad Gear
          </Link>
          <p className="footer-tagline">
            Premium camping gear rentals for effortless outdoor adventures.
          </p>

          <div className="footer-contact">
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </p>
            <p>
              <strong>Phone:</strong> {contactInfo.phone}
            </p>
            <p>
              <strong>Hours:</strong> {contactInfo.hours}
            </p>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="footer-links-grid">
          {footerSections.map((section) => (
            <div className="footer-section" key={section.title}>
              <h3 className="footer-section-title">{section.title}</h3>
              <nav className="footer-nav">
                {section.links.map((link) => (
                  <a
                    className="footer-link"
                    href={link.href}
                    key={link.label}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="page-shell">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Nomad Gear. All rights reserved.
            </p>
            <div className="footer-badges">
              <span className="badge">🌍 Carbon Neutral</span>
              <span className="badge">✓ Verified Reviews</span>
              <span className="badge">🔒 Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
