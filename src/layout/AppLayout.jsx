import { animate, stagger } from 'animejs'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import FloatingNav from '../components/FloatingNav'
import Footer from '../components/Footer'
import BookNowModal from '../features/booking/BookNowModal'
import { useLozadObserver } from '../hooks/useLozadObserver'
import { initializeButtonRipples } from '../utils/buttonRipple'

function AppLayout() {
  const location = useLocation()

  useLozadObserver(location.pathname)

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    if (!revealElements.length) {
      return undefined
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach((element) => {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      })
      return undefined
    }

    const revealAnimation = animate(revealElements, {
      opacity: [0, 1],
      y: [18, 0],
      duration: 620,
      ease: 'outQuad',
      delay: stagger(80),
    })

    return () => {
      revealAnimation.pause()
    }
  }, [location.pathname])

  useEffect(() => {
    initializeButtonRipples()
  }, [location.pathname])

  return (
    <div className="site-shell">
      <FloatingNav />
      <Outlet />
      <BookNowModal />
      <Footer />
    </div>
  )
}

export default AppLayout