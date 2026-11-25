import { useContext } from 'react'
import WishlistContext, { type WishlistContextValue } from './WishlistStore'

export function useWishlist(): WishlistContextValue {
  const wishlistContext = useContext(WishlistContext)

  if (!wishlistContext) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }

  return wishlistContext
}
