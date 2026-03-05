import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import AboutPage from './pages/AboutPage'
import BookingPage from './pages/BookingPage'
import GearCatalogPage from './pages/GearCatalogPage'
import GearDetailPage from './pages/GearDetailPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])