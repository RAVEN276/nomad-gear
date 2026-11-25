import DestinationInspiration from '../components/DestinationInspiration'
import GearGrid from '../components/GearGrid'
import HeroSection from '../components/HeroSection'
import { gearCatalog } from '../data/gear'

const featuredGear = gearCatalog.slice(0, 3)

function HomePage() {
  return (
    <>
      <HeroSection />
      <GearGrid
        description="Complete shelter, sleep, and cook setups packed for direct pickup and rapid camp setup."
        folio="02"
        items={featuredGear}
        title="Weekend-ready rental kits"
      />
      <DestinationInspiration />
    </>
  )
}

export default HomePage
