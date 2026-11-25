import { RouterProvider } from 'react-router-dom'
import { MockAccountProvider } from './features/account/MockAccountContext'
import { GalleryLightboxProvider } from './features/gallery/GalleryLightboxContext'
import { WishlistProvider } from './features/wishlist/WishlistContext'
import { router } from './router'

function App() {
  return (
    <MockAccountProvider>
      <WishlistProvider>
        <GalleryLightboxProvider>
          <RouterProvider router={router} />
        </GalleryLightboxProvider>
      </WishlistProvider>
    </MockAccountProvider>
  )
}

export default App
