import { DEST_ECHO_LAKE, DEST_CEDAR_RIDGE, DEST_NORTH_FJORD, DEST_GRANITE_MEADOW, DEST_RIVER_BEND, DEST_SUMMIT_PINES } from './media.js'

export const destinations = [
  {
    id: 'echo-lake',
    name: 'Echo Lake Basin',
    note: 'Mirror-water sunrise + easy lakeside pitches.',
    image: DEST_ECHO_LAKE,
    imageAlt: 'Lake with mountain reflections at dawn',
  },
  {
    id: 'cedar-ridge',
    name: 'Cedar Ridge Trail Camp',
    note: 'Golden-hour ridge views and cool pine air.',
    image: DEST_CEDAR_RIDGE,
    imageAlt: 'Tent setup near cedar forest on a ridge',
  },
  {
    id: 'north-fjord',
    name: 'North Fjord Overlook',
    note: 'Crisp mornings and dramatic valley panoramas.',
    image: DEST_NORTH_FJORD,
    imageAlt: 'Forest valley and overlook at sunset',
  },
  {
    id: 'granite-meadow',
    name: 'Granite Meadow Camp',
    note: 'Wide meadow skies and stargazing-friendly nights.',
    image: DEST_GRANITE_MEADOW,
    imageAlt: 'Open meadow campsite under a broad sky',
  },
  {
    id: 'river-bend',
    name: 'River Bend Flats',
    note: 'Riverside fire pits and gentle morning mist.',
    image: DEST_RIVER_BEND,
    imageAlt: 'Riverside camp location surrounded by trees',
  },
  {
    id: 'summit-pines',
    name: 'Summit Pines Campground',
    note: 'Cool alpine nights with trailhead access nearby.',
    image: DEST_SUMMIT_PINES,
    imageAlt: 'High elevation pine campsite with mountain horizon',
  },
]