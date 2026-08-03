export type AmenityKey =
  | 'pool'
  | 'indoorPool'
  | 'solar'
  | 'generator'
  | 'fiber'
  | 'ac'
  | 'parking'
  | 'kitchen'
  | 'seaView'
  | 'garden'
  | 'playground'
  | 'security'
  | 'water'
  | 'bbq'

export type CategoryKey =
  | 'all'
  | 'pool'
  | 'family'
  | 'solar'
  | 'vip'
  | 'farm'
  | 'chalet'
  | 'desert'

export interface Property {
  id: string
  title: string
  city: string
  area: string
  categories: CategoryKey[]
  images: string[]
  price: number
  rating: number
  reviews: number
  guests: number
  bedrooms: number
  beds: number
  baths: number
  highlights: string[]
  amenities: AmenityKey[]
  description: string
  host: {
    name: string
    avatar: string
    since: string
    phone: string
    responseTime: string
  }
  instantBook: boolean
  isNew?: boolean
  isSuperhost?: boolean
  minNights: number
}

export interface Booking {
  id: string
  propertyId: string
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  total: number
  status: 'upcoming' | 'completed' | 'cancelled'
}

export interface Conversation {
  id: string
  propertyId: string
  hostName: string
  hostAvatar: string
  lastMessage: string
  time: string
  unread: number
}
