import { useGearFilters, type SortOption } from './useGearFilters'
import './FilterSortControls.css'

interface FilterSortControlsProps {
  categories: string[]
  currentCategory: string
  onCategoryChange: (category: string) => void
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
  onReset: () => void
}

export function FilterSortControls({
  categories,
  currentCategory,
  onCategoryChange,
  currentSort,
  onSortChange,
  onReset,
}: FilterSortControlsProps) {
  return (
    <div className="filter-sort-controls">
      <div className="filter-group">
        <label htmlFor="category-filter" className="filter-label">
          Category:
        </label>
        <select
          id="category-filter"
          className="filter-select"
          value={currentCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="sort-group">
        <label htmlFor="sort-option" className="filter-label">
          Sort by:
        </label>
        <select
          id="sort-option"
          className="filter-select"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="name">Name</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <button className="reset-filters-button" onClick={onReset} type="button">
        Reset Filters
      </button>
    </div>
  )
}
