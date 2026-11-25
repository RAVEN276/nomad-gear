import { createContext } from 'react'

export interface WishlistContextValue {
  addToWishlist: (gearId: string) => void
  clearWishlist: () => void
  isWishlisted: (gearId: string) => boolean
  removeFromWishlist: (gearId: string) => void
  toggleWishlist: (gearId: string) => void
  wishlistCount: number
  wishlistedIds: string[]
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export default WishlistContext
