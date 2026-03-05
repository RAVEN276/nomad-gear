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
        description="Clean, complete setups designed to be booked fast and packed light."
        items={featuredGear}
        title="Weekend-ready kits for quick escapes"
      />
      <DestinationInspiration />
    </>
  )
}

export default HomePage