import { useEffect } from 'react'
import { useGearStore } from '@/store/useGearStore'
import { useGearCatalog } from '@/api/useGearCatalog'
import { useGearFilters } from '@/hooks/useGearFilters'
import { FilterSortControls } from '../components/FilterSortControls'
import GearGrid from '../components/GearGrid'
import { gearCatalog as localGearCatalog } from '../data/gear'

function GearCatalogPage() {
  const { filteredGear, filterGear, setGearList, setSearchQuery, setSelectedCategory } = useGearStore()
  const { isLoading, error } = useGearCatalog()
  
  // Initialize gear list from local data or API
  useEffect(() => {
    if (localGearCatalog.length > 0) {
      setGearList(localGearCatalog)
    }
  }, [setGearList])

  // Use the useGearFilters hook for filtering and sorting
  const {
    filters,
    setFilter,
    sortOption,
    setSortOption,
    resetFilters,
    categories,
  } = useGearFilters(filteredGear)

  if (error) {
    return (
      <div className="page-top-space">
        <header className="page-shell page-header reveal">
          <p className="eyebrow">Gear Catalog</p>
          <h1>Choose your camp style.</h1>
          <p className="error-message">{error}</p>
        </header>
      </div>
    )
  }

  return (
    <div className="page-top-space">
      <header className="page-shell page-header reveal">
        <p className="eyebrow">Gear Catalog</p>
        <h1>Choose your camp style.</h1>
        <p>
          From ultralight overnights to comfort-first weekends, every kit is
          prepped, checked, and ready for pickup.
        </p>
      </header>

      <section className="page-shell section-block">
        <FilterSortControls
          categories={categories}
          currentCategory={filters.category}
          onCategoryChange={(category) => setFilter('category', category)}
          currentSort={sortOption}
          onSortChange={setSortOption}
          onReset={() => {
            resetFilters()
            setSearchQuery('')
            setSelectedCategory('all')
          }}
        />
      </section>

      <GearGrid
        description="Transparent daily pricing and complete inventories, so you know exactly what is in the bag."
        items={filteredGear.length > 0 ? filteredGear : localGearCatalog}
        title="All Nomad Gear Rental Sets"
        isLoading={isLoading}
      />
    </div>
  )
}

export default GearCatalogPage