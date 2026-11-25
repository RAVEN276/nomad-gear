import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useMockAccount } from '../account/useMockAccount'
import WishlistContext from './WishlistStore'

const STORAGE_PREFIX = 'nomad-gear:wishlist'

function getStorageKey(accountId: string): string {
  return `${STORAGE_PREFIX}:${accountId}`
}

function readWishlist(storageKey: string): string[] {
  const rawWishlist = localStorage.getItem(storageKey)
  if (!rawWishlist) {
    return []
  }

  try {
    const parsedWishlist: unknown = JSON.parse(rawWishlist)
    if (!Array.isArray(parsedWishlist)) {
      return []
    }
    return parsedWishlist.filter((itemId): itemId is string => typeof itemId === 'string')
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { activeAccountId } = useMockAccount()
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([])

  useEffect(() => {
    const storageKey = getStorageKey(activeAccountId)
    const persistedWishlist = readWishlist(storageKey)
    setWishlistedIds(persistedWishlist)
  }, [activeAccountId])

  useEffect(() => {
    const storageKey = getStorageKey(activeAccountId)
    localStorage.setItem(storageKey, JSON.stringify(wishlistedIds))
  }, [activeAccountId, wishlistedIds])

  const addToWishlist = useCallback((gearId: string) => {
    setWishlistedIds((currentWishlist) => {
      if (currentWishlist.includes(gearId)) {
        return currentWishlist
      }
      return [...currentWishlist, gearId]
    })
  }, [])

  const removeFromWishlist = useCallback((gearId: string) => {
    setWishlistedIds((currentWishlist) => currentWishlist.filter((itemId) => itemId !== gearId))
  }, [])

  const toggleWishlist = useCallback((gearId: string) => {
    setWishlistedIds((currentWishlist) => {
      if (currentWishlist.includes(gearId)) {
        return currentWishlist.filter((itemId) => itemId !== gearId)
      }
      return [...currentWishlist, gearId]
    })
  }, [])

  const isWishlisted = useCallback(
    (gearId: string) => wishlistedIds.includes(gearId),
    [wishlistedIds],
  )

  const clearWishlist = useCallback(() => {
    setWishlistedIds([])
  }, [])

  const wishlistValue = useMemo(
    () => ({
      addToWishlist,
      clearWishlist,
      isWishlisted,
      removeFromWishlist,
      toggleWishlist,
      wishlistCount: wishlistedIds.length,
      wishlistedIds,
    }),
    [addToWishlist, clearWishlist, isWishlisted, removeFromWishlist, toggleWishlist, wishlistedIds],
  )

  return (
    <WishlistContext.Provider value={wishlistValue}>
      {children}
    </WishlistContext.Provider>
  )
}
