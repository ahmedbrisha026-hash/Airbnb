'use client'

import { CalendarCheck, ChevronLeft, MapPin, Moon, Users } from 'lucide-react'
import { useState } from 'react'
import { bookings, formatPrice, getProperty } from '@/lib/data'
import { useApp } from '@/lib/store'
import type { Booking } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ViewHeader } from './view-header'

const statusMeta: Record<
  Booking['status'],
  { label: string; className: string }
> = {
  upcoming: {
    label: 'قادم',
    className: 'bg-accent text-accent-foreground',
  },
  completed: {
    label: 'مكتمل',
    className: 'bg-secondary text-secondary-foreground',
  },
  cancelled: {
    label: 'ملغي',
    className: 'bg-destructive/12 text-destructive',
  },
}

const tabs = [
  { key: 'upcoming', label: 'القادمة' },
  { key: 'completed', label: 'السابقة' },
  { key: 'cancelled', label: 'الملغاة' },
] as const

export function BookingsView() {
  const { setTab, setOpenProperty } = useApp()
  const [filter, setFilter] = useState<Booking['status']>('upcoming')
  const list = bookings.filter((b) => b.status === filter)

  return (
    <div className="mx-auto max-w-3xl px-4 pb-8">
      <ViewHeader title="حجوزاتي" subtitle="تابع رحلاتك القادمة والسابقة" />

      <div className="mb-5 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key)}
            aria-pressed={filter === t.key}
            className={cn(
              'cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition',
              filter === t.key
                ? 'border-foreground bg-foreground text-background'
                : 'border-border hover:border-foreground/40',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <CalendarCheck
            className="size-12 text-muted-foreground"
            strokeWidth={1.5}
          />
          <h2 className="text-base font-bold">لا توجد حجوزات {tabs.find((t) => t.key === filter)?.label}</h2>
          <p className="max-w-xs text-sm text-muted-foreground text-pretty">
            عندما تحجز عقاراً ستظهر تفاصيل الحجز هنا.
          </p>
          <button
            type="button"
            onClick={() => setTab('explore')}
            className="mt-1 cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
          >
            ابدأ البحث
          </button>
        </div>
      ) : (
        <ul className="space-y-3.5">
          {list.map((b) => {
            const p = getProperty(b.propertyId)
            if (!p) return null
            return (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => setOpenProperty(p.id)}
                  className="flex w-full cursor-pointer items-center gap-3.5 rounded-2xl border border-border bg-card p-3 text-right transition hover:border-foreground/25 hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images[0] || '/placeholder.svg'}
                    alt={p.title}
                    className="size-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-1 text-sm font-bold">{p.title}</h3>
                      <span
                        className={cn(
                          'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold',
                          statusMeta[b.status].className,
                        )}
                      >
                        {statusMeta[b.status].label}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {p.area}، {p.city}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground nums-tabular">
                      <span className="flex items-center gap-1">
                        <CalendarCheck className="size-3.5" />
                        {b.checkIn} ← {b.checkOut}
                      </span>
                      <span className="flex items-center gap-1">
                        <Moon className="size-3.5" />
                        {b.nights} ليالٍ
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" />
                        {b.guests}
                      </span>
                    </div>
                    <p className="mt-1.5 flex items-center justify-between text-sm">
                      <span className="font-bold nums-tabular">
                        {formatPrice(b.total)} د.ل
                      </span>
                      <ChevronLeft className="size-4 text-muted-foreground" />
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
