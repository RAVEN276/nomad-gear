import GearGrid from '../components/GearGrid'
import { gearCatalog } from '../data/gear'

function GearCatalogPage() {
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

      <GearGrid
        description="Transparent daily pricing and complete inventories, so you know exactly what is in the bag."
        items={gearCatalog}
        title="All Nomad Gear Rental Sets"
      />
    </div>
  )
}

export default GearCatalogPage