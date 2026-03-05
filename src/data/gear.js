import { GEAR_TENT_1, GEAR_TENT_2, GEAR_TENT_3, GEAR_TENT_4, GEAR_TENT_5 } from './media.js'

export const gearCatalog = [
  {
    id: 'weekend-light-kit',
    slug: 'weekend-light-kit',
    name: 'Weekend Light Kit',
    summary: 'Ultralight shelter setup made for spontaneous 2-night escapes.',
    description:
      'A minimalist package for quick breaks from the city, balancing comfort and pack weight for one to two campers.',
    pricePerDay: 49,
    capacity: '1-2 campers',
    includes: [
      '2-person waterproof dome tent',
      'Dual-season sleeping bag set',
      'Compact cook kit + stove',
      'Rechargeable lantern and headlamp duo',
    ],
    image: GEAR_TENT_1,
    imageAlt: 'Ultralight tent pitched near a lake at dusk',
  },
  {
    id: 'alpine-basecamp-bundle',
    slug: 'alpine-basecamp-bundle',
    name: 'Alpine Basecamp Bundle',
    summary: 'Weather-ready setup with extra insulation for higher elevations.',
    description:
      'Designed for mountain weather swings with reinforced shelter and warmer sleep support for longer weekends.',
    pricePerDay: 74,
    capacity: '2-3 campers',
    includes: [
      '4-season tent with vestibule',
      'Insulated sleeping pads',
      'Trekking stove + fuel canister starter',
      'Compact repair and weather kit',
    ],
    image: GEAR_TENT_2,
    imageAlt: 'Tent camp at the base of snow-dusted mountain peaks',
  },
  {
    id: 'stargazer-comfort-set',
    slug: 'stargazer-comfort-set',
    name: 'Stargazer Comfort Set',
    summary: 'Roomy glamping-leaning kit for scenic nights and slower mornings.',
    description:
      'Built for comfort-first campers who want cozy sleep systems, warm light, and easy meal prep under open skies.',
    pricePerDay: 89,
    capacity: '2 campers',
    includes: [
      'Canvas bell-style tent',
      'Double sleeping pad + quilt pair',
      'Camp table and chair set',
      'Ambient lantern trio',
    ],
    image: GEAR_TENT_3,
    imageAlt: 'Comfortable camp setup with warm lighting at twilight',
  },
  {
    id: 'family-ridge-pack',
    slug: 'family-ridge-pack',
    name: 'Family Ridge Pack',
    summary: 'Spacious all-in-one setup for family-sized weekends outdoors.',
    description:
      'A practical package for groups needing larger shelter, simple kitchen flow, and dependable all-weather coverage.',
    pricePerDay: 109,
    capacity: '4 campers',
    includes: [
      '6-person family tent',
      'Four sleeping bags + pads',
      'Dual-burner camp kitchen set',
      'Folding utility table and storage bins',
    ],
    image: GEAR_TENT_4,
    imageAlt: 'Large family tent with gear arranged at a forest campsite',
  },
  {
    id: 'overland-cookout-kit',
    slug: 'overland-cookout-kit',
    name: 'Overland Cookout Kit',
    summary: 'Kitchen-forward setup for road-access campsites and group meals.',
    description:
      'Ideal for camp chefs who want stronger cooking options, prep space, and durable gear for destination-style camping.',
    pricePerDay: 97,
    capacity: '3-4 campers',
    includes: [
      'Weatherproof tunnel shelter',
      'Expanded cookware + prep station',
      'Portable cooler system',
      'LED task lighting and utility battery',
    ],
    image: GEAR_TENT_5,
    imageAlt: 'Campsite kitchen layout with tent and mountain backdrop',
  },
]

export function getGearBySlug(slug) {
  return gearCatalog.find((gear) => gear.slug === slug)
}

export function getGearCatalog() {
  return gearCatalog
}