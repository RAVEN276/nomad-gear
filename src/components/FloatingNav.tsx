import { animate } from 'animejs'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getGearCatalog, getGearCategories } from '../data/gear'
import { useMockAccount } from '../features/account/useMockAccount'
import { useWishlist } from '../features/wishlist/useWishlist'
import type { GearItem } from '@/store/useBookingStore'
import MorphHamburgerButton from './MorphHamburgerButton'
import { ThemeToggle } from './ThemeToggle'
import { ZineSelect } from './ZineSelect'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Gear', to: '/gear' },
  { label: 'Booking', to: '/booking' },
  { label: 'About', to: '/about' },
]

function FloatingNav() {
  const navigate = useNavigate()
  const { activeAccount, accounts, switchAccount } = useMockAccount()
  const { wishlistCount } = useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<GearItem[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)

  const allGear = getGearCatalog()
  const categories = getGearCategories()

  const handleSearch = (value: string) => {
    setSearchInput(value)
    if (value.trim().length > 0) {
      const normalized = value.toLowerCase()
      const results = allGear.filter(
        (item) =>
          item.name.toLowerCase().includes(normalized) ||
          item.description.toLowerCase().includes(normalized) ||
          item.category.toLowerCase().includes(normalized),
      )
      setSearchResults(results)
      setIsSearching(true)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }

  const handleSearchResult = (slug: string) => {
    navigate(`/gear/${slug}`)
    setSearchInput('')
    setSearchResults([])
    setIsSearching(false)
    setIsCategoryMenuOpen(false)
    setIsMenuOpen(false)
  }

  const handleCategorySelection = (category: string) => {
    navigate(`/gear?category=${encodeURIComponent(category)}`)
    setIsCategoryMenuOpen(false)
    setIsMenuOpen(false)
  }

  const closeMobileMenu = () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && mobileMenuRef.current) {
      animate(mobileMenuRef.current, {
        translateX: [0, 320],
        opacity: [1, 0],
        duration: 240,
        ease: 'inQuad',
        onComplete: () => setIsMenuOpen(false),
      })
      return
    }
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsCategoryMenuOpen(false)
    if (isMenuOpen) {
      closeMobileMenu()
    } else {
      setIsMenuOpen(true)
    }
  }

  useEffect(() => {
    if (!isMenuOpen || !mobileMenuRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    animate(mobileMenuRef.current, {
      translateX: [280, 0],
      opacity: [0, 1],
      duration: 280,
      ease: 'outExpo',
    })
  }, [isMenuOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null
      if (searchRef.current && target && !searchRef.current.contains(target)) {
        setIsSearching(false)
      }
      if (categoryRef.current && target && !categoryRef.current.contains(target)) {
        setIsCategoryMenuOpen(false)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCategoryMenuOpen(false)
        setIsSearching(false)
        if (isMenuOpen) {
          closeMobileMenu()
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  return (
    <header className="floating-nav-wrap">
      <nav aria-label="Primary" className="floating-nav">
        <Link className="brand-mark" to="/">
          <svg
            aria-hidden="true"
            className="brand-mark-glyph"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M3 20L12 4l9 16H3Z" />
            <path d="M12 4v16" />
          </svg>
          <span>Nomad Gear</span>
        </Link>

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
              <span>{item.label}</span>
              {item.to === '/gear' && wishlistCount > 0 && (
                <span className="nav-count-badge" aria-label={`${wishlistCount} saved kits`}>
                  {wishlistCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="nav-category-wrapper" ref={categoryRef}>
          <button
            aria-expanded={isCategoryMenuOpen}
            aria-haspopup="menu"
            className={`nav-category-trigger${isCategoryMenuOpen ? ' is-open' : ''}`}
            onClick={() => setIsCategoryMenuOpen((v) => !v)}
            type="button"
          >
            <span>Categories</span>
            <svg
              aria-hidden="true"
              className="nav-category-caret"
              fill="none"
              height="12"
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="2.4"
              viewBox="0 0 16 16"
              width="12"
            >
              <path d="M3 6l5 5 5-5" />
            </svg>
          </button>
          {isCategoryMenuOpen && (
            <div className="nav-category-menu" role="menu">
              {categories.map((category) => (
                <button
                  className="nav-category-option"
                  key={category}
                  onClick={() => handleCategorySelection(category)}
                  role="menuitem"
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="nav-search-wrapper" ref={searchRef}>
          <label className="sr-only" htmlFor="nav-gear-search">
            Search rental kits
          </label>
          <input
            aria-label="Search rental kits"
            className="nav-search-input"
            id="nav-gear-search"
            placeholder="Search kits..."
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0) setIsSearching(true)
            }}
            type="search"
            value={searchInput}
          />
          {isSearching && searchResults.length > 0 && (
            <div className="search-results" role="listbox" aria-label="Matching kits">
              {searchResults.slice(0, 5).map((item) => (
                <button
                  className="search-result-item"
                  key={item.slug}
                  onClick={() => handleSearchResult(item.slug)}
                  role="option"
                  aria-selected={false}
                  type="button"
                >
                  <span className="result-name">{item.name}</span>
                  <span className="result-price">${item.pricePerDay}/day</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="nav-utility-group">
          <ThemeToggle />
          <Link className="nav-cta" to="/booking">
            Book Kit
          </Link>
          <MorphHamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div
            aria-label="Mobile navigation"
            aria-modal="true"
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
            ref={mobileMenuRef}
            role="dialog"
          >
            <div className="mobile-menu-header">
              <h2>Navigation</h2>
              <button
                aria-label="Close navigation menu"
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                type="button"
              >
                ×
              </button>
            </div>

            <nav aria-label="Mobile" className="mobile-nav-links">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `mobile-nav-link${isActive ? ' is-active' : ''}`
                  }
                  end={item.to === '/'}
                  key={item.to}
                  onClick={closeMobileMenu}
                  to={item.to}
                >
                  <span>{item.label}</span>
                  {item.to === '/gear' && wishlistCount > 0 && (
                    <span className="nav-count-badge">{wishlistCount}</span>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="mobile-categories">
              <p className="mobile-categories-label">Categories</p>
              <div className="mobile-category-list">
                {categories.map((category) => (
                  <button
                    className="mobile-category-button"
                    key={category}
                    onClick={() => handleCategorySelection(category)}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-account-switch">
              <label className="form-label" htmlFor="mobile-account-select">
                Wishlist Profile
              </label>
              <ZineSelect
                className="mobile-account-select-wrap"
                compact
                id="mobile-account-select"
                onChange={switchAccount}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.label,
                }))}
                value={activeAccount.id}
              />
            </div>

            <Link
              className="mobile-nav-cta"
              onClick={closeMobileMenu}
              to="/gear"
            >
              Browse Rental Kits
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default FloatingNav
