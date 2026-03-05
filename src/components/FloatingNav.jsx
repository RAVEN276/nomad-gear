import { animate } from 'animejs'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getGearCatalog } from '../data/gear'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Gear', to: '/gear' },
  { label: 'Booking', to: '/booking' },
  { label: 'About', to: '/about' },
]

function FloatingNav() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const mobileMenuRef = useRef(null)
  const searchRef = useRef(null)

  const allGear = getGearCatalog()

  const handleSearch = (value) => {
    setSearchInput(value)
    if (value.trim().length > 0) {
      const results = allGear.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase())
      )
      setSearchResults(results)
      setIsSearching(true)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }

  const handleSearchResult = (slug) => {
    navigate(`/gear/${slug}`)
    setSearchInput('')
    setSearchResults([])
    setIsSearching(false)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const menu = mobileMenuRef.current
      if (menu) {
        if (isMenuOpen) {
          animate(menu, {
            x: [0, -300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => setIsMenuOpen(false),
          })
        } else {
          setIsMenuOpen(true)
          animate(menu, {
            x: [-300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad',
          })
        }
      }
    } else {
      setIsMenuOpen(!isMenuOpen)
    }
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const navLinks = document.querySelectorAll('.nav-link, .nav-cta, .brand-mark')
    navLinks.forEach((link) => {
      const handleEnter = () => {
        animate(link, {
          scale: [1, 1.05],
          duration: 240,
          easing: 'easeOutQuad',
        })
      }
      const handleLeave = () => {
        animate(link, {
          scale: [1.05, 1],
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearching(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <header className="floating-nav-wrap">
      <nav aria-label="Primary" className="floating-nav">
        <Link className="brand-mark" to="/">
          ⛺ Nomad Gear
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? ' is-active' : ''}`
              }
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Search Bar */}
        <div className="nav-search-wrapper" ref={searchRef}>
          <input
            className="nav-search-input"
            placeholder="Search gear..."
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            value={searchInput}
          />
          {isSearching && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.slice(0, 5).map((item) => (
                <button
                  className="search-result-item"
                  key={item.slug}
                  onClick={() => handleSearchResult(item.slug)}
                  type="button"
                >
                  <span className="result-name">{item.name}</span>
                  <span className="result-price">
                    ${item.pricePerDay}/day
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Link className="nav-cta" to="/gear">
          Escape This Weekend
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle mobile menu"
          className="mobile-menu-button"
          onClick={toggleMenu}
          type="button"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
            ref={mobileMenuRef}
          >
            <div className="mobile-menu-header">
              <h2>Menu</h2>
              <button
                className="mobile-menu-close"
                onClick={() => setIsMenuOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <nav className="mobile-nav-links">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `mobile-nav-link${isActive ? ' is-active' : ''}`
                  }
                  end={item.to === '/'}
                  key={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Link
              className="mobile-nav-cta"
              onClick={() => setIsMenuOpen(false)}
              to="/gear"
            >
              Explore Gear Kits
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default FloatingNav