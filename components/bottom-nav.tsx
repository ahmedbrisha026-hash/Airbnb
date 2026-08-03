'use client'

import {
  CalendarCheck,
  Heart,
  MessageSquare,
  Search,
  UserRound,
} from 'lucide-react'
import { conversations } from '@/lib/data'
import { useApp, type TabKey } from '@/lib/store'
import { cn } from '@/lib/utils'

const tabs: {
  key: TabKey
  label: string
  icon: typeof Search
}[] = [
  { key: 'explore', label: 'استكشف', icon: Search },
  { key: 'wishlist', label: 'المفضلة', icon: Heart },
  { key: 'bookings', label: 'حجوزاتي', icon: CalendarCheck },
  { key: 'messages', label: 'الرسائل', icon: MessageSquare },
  { key: 'profile', label: 'حسابي', icon: UserRound },
]

export function BottomNav() {
  const { tab, setTab, wishlist } = useApp()
  const unread = conversations.reduce((n, c) => n + c.unread, 0)

  function badgeFor(key: TabKey) {
    if (key === 'wishlist' && wishlist.length > 0) return wishlist.length
    if (key === 'messages' && unread > 0) return unread
    return null
  }

  return (
    <nav
      aria-label="التنقل الرئيسي"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl"
    >
      <ul className="mx-auto flex max-w-2xl items-stretch justify-around px-1 pb-safe">
        {tabs.map((t) => {
          const active = tab === t.key
          const badge = badgeFor(t.key)
          return (
            <li key={t.key} className="flex-1">
              <button
                type="button"
                onClick={() => setTab(t.key)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex w-full cursor-pointer flex-col items-center gap-1 py-2.5 transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="relative">
                  <t.icon
                    className="size-6"
                    strokeWidth={active ? 2.3 : 1.8}
                    fill={
                      active && t.key === 'wishlist' ? 'currentColor' : 'none'
                    }
                  />
                  {badge !== null && (
                    <span className="absolute -top-1 -left-2 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground nums-tabular">
                      {badge}
                    </span>
                  )}
                </span>
                <span className="text-[10.5px] font-semibold">{t.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
