import type { SortOption } from '@/hooks/useGearFilters'
import { ZineSelect } from './ZineSelect'
import './FilterSortControls.css'

interface FilterSortControlsProps {
  categories: string[]
  currentCategory: string
  onCategoryChange: (category: string) => void
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
  savedOnly: boolean
  wishlistCount: number
  onToggleSavedOnly: () => void
  onReset: () => void
}

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'name', label: 'Name (A to Z)' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

export function FilterSortControls({
  categories,
  currentCategory,
  onCategoryChange,
  currentSort,
  onSortChange,
  savedOnly,
  wishlistCount,
  onToggleSavedOnly,
  onReset,
}: FilterSortControlsProps) {
  const categoryOptions = categories.map((cat) => ({
    value: cat,
    label: cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1),
  }))

  return (
    <div className="filter-sort-controls" role="region" aria-label="Filter and sort kits">
      <div className="filter-group">
        <label htmlFor="category-filter" className="filter-label">
          Category
        </label>
        <ZineSelect
          compact
          id="category-filter"
          onChange={onCategoryChange}
          options={categoryOptions}
          value={currentCategory}
        />
      </div>

      <div className="sort-group">
        <label htmlFor="sort-option" className="filter-label">
          Sort by
        </label>
        <ZineSelect
          compact
          id="sort-option"
          onChange={(val) => onSortChange(val as SortOption)}
          options={SORT_OPTIONS}
          value={currentSort}
        />
      </div>

      <button
        aria-pressed={savedOnly}
        className={`saved-filter-button${savedOnly ? ' is-active' : ''}`}
        onClick={onToggleSavedOnly}
        type="button"
      >
        <span>Saved Only</span>
        <span className="saved-filter-count">{wishlistCount}</span>
      </button>

      <button className="reset-filters-button" onClick={onReset} type="button">
        Reset Filters
      </button>
    </div>
  )
}
