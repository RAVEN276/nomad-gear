import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGearCatalog } from '@/api/useGearCatalog'
import { useWishlist } from '@/features/wishlist/useWishlist'
import { useGearFilters } from '@/hooks/useGearFilters'
import { useGearStore } from '@/store/useGearStore'
import { useReviewStore } from '@/store/useReviewStore'
import { FilterSortControls } from '../components/FilterSortControls'
import GearGrid from '../components/GearGrid'
import { gearCatalog as localGearCatalog } from '../data/gear'

function GearCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { gearList, setGearList, setSearchQuery, setSelectedCategory } = useGearStore()
  const getAverageRating = useReviewStore((state) => state.getAverageRating)
  const { wishlistedIds, wishlistCount } = useWishlist()
  const { isLoading, error } = useGearCatalog()

  useEffect(() => {
    if (gearList.length === 0 && localGearCatalog.length > 0) {
      setGearList(localGearCatalog)
    }
  }, [gearList.length, setGearList])

  const catalogItems = gearList.length > 0 ? gearList : localGearCatalog

  const averageRatings = useMemo(() => {
    return catalogItems.reduce<Record<string, number>>((acc, item) => {
      acc[item.id] = getAverageRating(item.id)
      return acc
    }, {})
  }, [catalogItems, getAverageRating])

  const {
    filteredItems,
    filters,
    setFilter,
    sortOption,
    setSortOption,
    resetFilters,
    categories,
  } = useGearFilters(catalogItems, averageRatings, wishlistedIds)

  const urlCategory = searchParams.get('category') || 'all'
  const urlSaved = searchParams.get('saved') === '1'
  useEffect(() => {
    setFilter('category', urlCategory)
    setSelectedCategory(urlCategory)
    setFilter('savedOnly', urlSaved)
  }, [urlCategory, urlSaved, setSelectedCategory])

  const syncQueryParams = (nextCategory: string, nextSavedOnly: boolean) => {
    const nextParams: Record<string, string> = {}
    if (nextCategory && nextCategory !== 'all') {
      nextParams.category = nextCategory
    }
    if (nextSavedOnly) {
      nextParams.saved = '1'
    }
    setSearchParams(nextParams)
  }

  const handleResetAll = () => {
    resetFilters()
    setSearchQuery('')
    setSelectedCategory('all')
    setSearchParams({})
  }

  if (error && catalogItems.length === 0) {
    return (
      <div className="page-top-space">
        <div className="page-shell gear-catalog-error" role="alert">
          <p className="eyebrow">Catalog Unavailable</p>
          <h1>Could not load rental inventory</h1>
          <p>{error.message}</p>
          <button
            className="primary-button"
            onClick={() => setGearList(localGearCatalog)}
            type="button"
          >
            Load Local Catalog
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-top-space">
      <header className="page-shell page-header">
        <span className="section-folio">01 · Equipment Catalog</span>
        <h1>Choose your camp kit.</h1>
        <p>
          Compare shelter capacity, daily rental rates, and full kit inventories
          before reserving your pickup dates.
        </p>
      </header>

      <section className="page-shell" style={{ paddingTop: '1.75rem' }}>
        <FilterSortControls
          categories={categories}
          currentCategory={filters.category}
          onCategoryChange={(category) => {
            setFilter('category', category)
            setSelectedCategory(category)
            syncQueryParams(category, filters.savedOnly)
          }}
          currentSort={sortOption}
          onSortChange={setSortOption}
          savedOnly={filters.savedOnly}
          wishlistCount={wishlistCount}
          onToggleSavedOnly={() => {
            const nextSavedOnly = !filters.savedOnly
            setFilter('savedOnly', nextSavedOnly)
            syncQueryParams(filters.category, nextSavedOnly)
          }}
          onReset={handleResetAll}
        />
      </section>

      <GearGrid
        description="Transparent daily pricing and full item lists so you know what goes in the bag."
        folio="02"
        items={filteredItems}
        title="Available Nomad Gear Kits"
        isLoading={isLoading && catalogItems.length === 0}
        onResetFilters={handleResetAll}
      />
    </div>
  )
}

export default GearCatalogPage
