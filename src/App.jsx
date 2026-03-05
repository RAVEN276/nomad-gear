import { RouterProvider } from 'react-router-dom'
import { BookingModalProvider } from './features/booking/BookingModalContext'
import { router } from './router'

function App() {
  return (
    <BookingModalProvider>
      <RouterProvider router={router} />
    </BookingModalProvider>
  )
}

export default App
