'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CategoryKey } from './types'

export type TabKey = 'explore' | 'wishlist' | 'bookings' | 'messages' | 'profile'

export interface SearchState {
  city: string
  checkIn: string
  checkOut: string
  guests: number
}

export interface FilterState {
  minPrice: number
  maxPrice: number
  bedrooms: number
  amenities: string[]
  instantBook: boolean
}

export const defaultFilters: FilterState = {
  minPrice: 0,
  maxPrice: 1000,
  bedrooms: 0,
  amenities: [],
  instantBook: false,
}

interface AppStore {
  tab: TabKey
  setTab: (tab: TabKey) => void
  category: CategoryKey
  setCategory: (c: CategoryKey) => void
  search: SearchState
  setSearch: (s: SearchState) => void
  filters: FilterState
  setFilters: (f: FilterState) => void
  activeFilterCount: number
  wishlist: string[]
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  openProperty: string | null
  setOpenProperty: (id: string | null) => void
}

const AppContext = createContext<AppStore | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<TabKey>('explore')
  const [category, setCategory] = useState<CategoryKey>('all')
  const [search, setSearch] = useState<SearchState>({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
  })
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [wishlist, setWishlist] = useState<string[]>(['p3'])
  const [openProperty, setOpenProperty] = useState<string | null>(null)

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const isWishlisted = useCallback(
    (id: string) => wishlist.includes(id),
    [wishlist],
  )

  const activeFilterCount = useMemo(() => {
    let n = 0
    if (filters.minPrice > defaultFilters.minPrice) n++
    if (filters.maxPrice < defaultFilters.maxPrice) n++
    if (filters.bedrooms > 0) n++
    if (filters.instantBook) n++
    n += filters.amenities.length
    return n
  }, [filters])

  const value = useMemo<AppStore>(
    () => ({
      tab,
      setTab,
      category,
      setCategory,
      search,
      setSearch,
      filters,
      setFilters,
      activeFilterCount,
      wishlist,
      toggleWishlist,
      isWishlisted,
      openProperty,
      setOpenProperty,
    }),
    [
      tab,
      category,
      search,
      filters,
      activeFilterCount,
      wishlist,
      toggleWishlist,
      isWishlisted,
      openProperty,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
