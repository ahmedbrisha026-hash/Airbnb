'use client'

import { useMemo, useState } from 'react'
import { properties } from '@/lib/data'
import { useApp } from '@/lib/store'
import { BottomNav } from './bottom-nav'
import { FilterSheet } from './filter-sheet'
import { PropertyDetails } from './property-details'
import { SearchHeader } from './search-header'
import { SearchSheet } from './search-sheet'
import { BookingsView } from './views/bookings-view'
import { ExploreView } from './views/explore-view'
import { MessagesView } from './views/messages-view'
import { ProfileView } from './views/profile-view'
import { WishlistView } from './views/wishlist-view'

export function AppShell() {
  const { tab, category, search, filters, openProperty } = useApp()
  const [searchOpen, setSearchOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const results = useMemo(() => {
    return properties.filter((p) => {
      if (category !== 'all' && !p.categories.includes(category)) return false
      if (search.city && p.city !== search.city) return false
      if (search.guests > 0 && p.guests < search.guests) return false
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false
      if (filters.bedrooms > 0 && p.bedrooms < filters.bedrooms) return false
      if (filters.instantBook && !p.instantBook) return false
      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((a) => p.amenities.includes(a as never))
      )
        return false
      return true
    })
  }, [category, search, filters])

  return (
    <div className="min-h-dvh pb-20">
      {tab === 'explore' && (
        <SearchHeader
          onOpenSearch={() => setSearchOpen(true)}
          onOpenFilters={() => setFiltersOpen(true)}
        />
      )}

      <main>
        {tab === 'explore' && <ExploreView results={results} />}
        {tab === 'wishlist' && <WishlistView />}
        {tab === 'bookings' && <BookingsView />}
        {tab === 'messages' && <MessagesView />}
        {tab === 'profile' && <ProfileView />}
      </main>

      <BottomNav />

      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={results.length}
      />
      {openProperty && <PropertyDetails />}
    </div>
  )
}
