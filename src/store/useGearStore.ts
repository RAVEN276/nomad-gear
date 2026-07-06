import { create } from 'zustand'
import type { GearItem } from './useBookingStore'

export interface GearState {
  gearList: GearItem[]
  filteredGear: GearItem[]
  searchQuery: string
  selectedCategory: string
  isLoading: boolean
  error: string | null
  setGearList: (gear: GearItem[]) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  filterGear: () => void
}

export const useGearStore = create<GearState>((set, get) => ({
  gearList: [],
  filteredGear: [],
  searchQuery: '',
  selectedCategory: 'all',
  isLoading: false,
  error: null,
  setGearList: (gear) => {
    set({ gearList: gear, filteredGear: gear })
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  filterGear: () => {
    const { gearList, searchQuery, selectedCategory } = get()
    let filtered = [...gearList]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    set({ filteredGear: filtered })
  },
}))
