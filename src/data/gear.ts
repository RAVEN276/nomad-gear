import type { GearItem } from '@/store/useBookingStore'
import { GEAR_TENT_1, GEAR_TENT_2, GEAR_TENT_3, GEAR_TENT_4, GEAR_TENT_5 } from './media'

export type GearData = GearItem

export const gearCatalog: GearItem[] = [
  {
    id: 'weekend-light-kit',
    slug: 'weekend-light-kit',
    name: 'Weekend Light Kit',
    category: 'Backpacking',
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
    inStock: true,
    image: GEAR_TENT_1,
    imageAlt: 'Ultralight tent pitched near a lake at dusk',
    images: [
      {
        id: 'weekend-light-kit-1',
        src: GEAR_TENT_1,
        alt: 'Ultralight tent pitched near a lake at dusk',
      },
      {
        id: 'weekend-light-kit-2',
        src: GEAR_TENT_3,
        alt: 'Cozy evening setup with ambient lighting and a compact shelter',
      },
      {
        id: 'weekend-light-kit-3',
        src: GEAR_TENT_5,
        alt: 'Portable camp kitchen layout beside an ultralight camp base',
      },
    ],
  },
  {
    id: 'alpine-basecamp-bundle',
    slug: 'alpine-basecamp-bundle',
    name: 'Alpine Basecamp Bundle',
    category: 'Mountain',
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
    inStock: true,
    image: GEAR_TENT_2,
    imageAlt: 'Tent camp at the base of snow-dusted mountain peaks',
    images: [
      {
        id: 'alpine-basecamp-bundle-1',
        src: GEAR_TENT_2,
        alt: 'Tent camp at the base of snow-dusted mountain peaks',
      },
      {
        id: 'alpine-basecamp-bundle-2',
        src: GEAR_TENT_4,
        alt: 'Mountain-ready shelter setup with reinforced weather coverage',
      },
      {
        id: 'alpine-basecamp-bundle-3',
        src: GEAR_TENT_1,
        alt: 'Dusk campsite view highlighting alpine-ready insulation gear',
      },
    ],
  },
  {
    id: 'stargazer-comfort-set',
    slug: 'stargazer-comfort-set',
    name: 'Stargazer Comfort Set',
    category: 'Glamping',
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
    inStock: true,
    image: GEAR_TENT_3,
    imageAlt: 'Comfortable camp setup with warm lighting at twilight',
    images: [
      {
        id: 'stargazer-comfort-set-1',
        src: GEAR_TENT_3,
        alt: 'Comfortable camp setup with warm lighting at twilight',
      },
      {
        id: 'stargazer-comfort-set-2',
        src: GEAR_TENT_5,
        alt: 'Large comfort-focused camp layout with extended prep zone',
      },
      {
        id: 'stargazer-comfort-set-3',
        src: GEAR_TENT_4,
        alt: 'Spacious shelter configured for relaxed evenings under open sky',
      },
    ],
  },
  {
    id: 'family-ridge-pack',
    slug: 'family-ridge-pack',
    name: 'Family Ridge Pack',
    category: 'Family',
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
    inStock: true,
    image: GEAR_TENT_4,
    imageAlt: 'Large family tent with gear arranged at a forest campsite',
    images: [
      {
        id: 'family-ridge-pack-1',
        src: GEAR_TENT_4,
        alt: 'Large family tent with gear arranged at a forest campsite',
      },
      {
        id: 'family-ridge-pack-2',
        src: GEAR_TENT_2,
        alt: 'Expanded family camp footprint with all-weather setup',
      },
      {
        id: 'family-ridge-pack-3',
        src: GEAR_TENT_3,
        alt: 'Family-ready comfort arrangement for multi-night trips',
      },
    ],
  },
  {
    id: 'overland-cookout-kit',
    slug: 'overland-cookout-kit',
    name: 'Overland Cookout Kit',
    category: 'Overland',
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
    inStock: true,
    image: GEAR_TENT_5,
    imageAlt: 'Campsite kitchen layout with tent and mountain backdrop',
    images: [
      {
        id: 'overland-cookout-kit-1',
        src: GEAR_TENT_5,
        alt: 'Campsite kitchen layout with tent and mountain backdrop',
      },
      {
        id: 'overland-cookout-kit-2',
        src: GEAR_TENT_1,
        alt: 'Road-access camp setup with compact prep and cooking station',
      },
      {
        id: 'overland-cookout-kit-3',
        src: GEAR_TENT_2,
        alt: 'Meal-focused overland camp scene with weatherproof shelter',
      },
    ],
  },
]

export function getGearBySlug(slug?: string): GearItem | undefined {
  if (!slug) return undefined
  return gearCatalog.find((gear) => gear.slug === slug)
}

export function getGearCatalog(): GearItem[] {
  return gearCatalog
}

export function getGearCategories(): string[] {
  return [...new Set(gearCatalog.map((gear) => gear.category))]
}
