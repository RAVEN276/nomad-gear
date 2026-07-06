import { useState, useMemo } from 'react'
import type { GearItem } from '@/store/useBookingStore'

export interface FilterOptions {
  category: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'name'

interface UseGearFiltersReturn {
  filteredItems: GearItem[]
  filters: FilterOptions
  sortOption: SortOption
  setFilter: <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => void
  setSortOption: (option: SortOption) => void
  resetFilters: () => void
  categories: string[]
}

export function useGearFilters(items: GearItem[], ratings?: Record<string, number>): UseGearFiltersReturn {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
  })

  const [sortOption, setSortOption] = useState<SortOption>('name')

  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category))
    return ['all', ...Array.from(cats)]
  }, [items])

  const filteredItems = useMemo(() => {
    let result = [...items]

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter((item) => item.category === filters.category)
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      result = result.filter((item) => item.pricePerDay >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((item) => item.pricePerDay <= filters.maxPrice!)
    }

    // Filter by rating
    if (filters.minRating !== undefined && ratings) {
      result = result.filter((item) => {
        const rating = ratings[item.id] || 0
        return rating >= filters.minRating!
      })
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.pricePerDay - b.pricePerDay)
        break
      case 'price-desc':
        result.sort((a, b) => b.pricePerDay - a.pricePerDay)
        break
      case 'rating':
        if (ratings) {
          result.sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0))
        }
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [items, filters, sortOption, ratings])

  const setFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      category: 'all',
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
    })
  }

  return {
    filteredItems,
    filters,
    sortOption,
    setFilter,
    setSortOption,
    resetFilters,
    categories,
  }
}
