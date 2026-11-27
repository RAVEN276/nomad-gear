import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import HomePage from './pages/HomePage'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const GearCatalogPage = lazy(() => import('./pages/GearCatalogPage'))
const GearDetailPage = lazy(() => import('./pages/GearDetailPage'))
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'gear',
        element: <GearCatalogPage />,
      },
      {
        path: 'gear/:slug',
        element: <GearDetailPage />,
      },
      {
        path: 'booking',
        element: <BookingPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'roadmap',
        element: <RoadmapPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])