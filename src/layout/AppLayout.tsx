import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import FloatingNav from '../components/FloatingNav'
import Footer from '../components/Footer'
import GalleryLightbox from '../components/GalleryLightbox'
import NewsletterSignup from '../components/NewsletterSignup'
import BookNowModal from '../features/booking/BookNowModal'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'
import { useLozadObserver } from '../hooks/useLozadObserver'
import { initializeButtonRipples } from '../utils/buttonRipple'

function AppLayout() {
  const location = useLocation()

  useLozadObserver(location.pathname)
  useAnimateOnScroll('.reveal-item', location.pathname)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    initializeButtonRipples()
  }, [location.pathname])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <FloatingNav />
      <main className="site-main" id="main-content" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="page-shell page-top-space section-block">
              <div className="route-loading-fallback" role="status">
                Loading page manifest...
              </div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <BookNowModal />
      <GalleryLightbox />
      <NewsletterSignup />
      <Footer />
    </div>
  )
}

export default AppLayout
