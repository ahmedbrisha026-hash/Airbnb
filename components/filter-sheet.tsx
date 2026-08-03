'use client'

import { Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { amenityLabels, formatPrice } from '@/lib/data'
import { defaultFilters, useApp, type FilterState } from '@/lib/store'
import type { AmenityKey } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Icon } from './icon'
import { Sheet } from './sheet'

const amenityKeys = Object.keys(amenityLabels) as AmenityKey[]
const bedroomOptions = [0, 1, 2, 3, 4, 5]

export function FilterSheet({
  open,
  onClose,
  resultCount,
}: {
  open: boolean
  onClose: () => void
  resultCount: number
}) {
  const { filters, setFilters } = useApp()
  const [draft, setDraft] = useState<FilterState>(filters)

  useEffect(() => {
    if (open) setDraft(filters)
  }, [open, filters])

  function toggleAmenity(key: string) {
    setDraft((d) => ({
      ...d,
      amenities: d.amenities.includes(key)
        ? d.amenities.filter((a) => a !== key)
        : [...d.amenities, key],
    }))
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="الفلاتر"
      footer={
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setDraft(defaultFilters)}
            className="cursor-pointer text-sm font-semibold underline underline-offset-4"
          >
            مسح الكل
          </button>
          <button
            type="button"
            onClick={() => {
              setFilters(draft)
              onClose()
            }}
            className="flex-1 cursor-pointer rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
          >
            عرض {resultCount} عقار
          </button>
        </div>
      }
    >
      <div className="divide-y divide-border">
        <section className="p-4">
          <h3 className="text-sm font-bold">نطاق السعر</h3>
          <p className="mt-1 text-xs text-muted-foreground nums-tabular">
            {formatPrice(draft.minPrice)} د.ل – {formatPrice(draft.maxPrice)} د.ل
            للليلة
          </p>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                الحد الأدنى
              </span>
              <input
                type="range"
                min={0}
                max={1000}
                step={50}
                value={draft.minPrice}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    minPrice: Math.min(Number(e.target.value), d.maxPrice - 50),
                  }))
                }
                className="w-full accent-primary"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                الحد الأعلى
              </span>
              <input
                type="range"
                min={0}
                max={1000}
                step={50}
                value={draft.maxPrice}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    maxPrice: Math.max(Number(e.target.value), d.minPrice + 50),
                  }))
                }
                className="w-full accent-primary"
              />
            </label>
          </div>
        </section>

        <section className="p-4">
          <h3 className="mb-3 text-sm font-bold">غرف النوم</h3>
          <div className="flex flex-wrap gap-2">
            {bedroomOptions.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setDraft((d) => ({ ...d, bedrooms: n }))}
                aria-pressed={draft.bedrooms === n}
                className={cn(
                  'min-w-14 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition nums-tabular',
                  draft.bedrooms === n
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-foreground/40',
                )}
              >
                {n === 0 ? 'الكل' : n === 5 ? '+5' : n}
              </button>
            ))}
          </div>
        </section>

        <section className="p-4">
          <h3 className="mb-3 text-sm font-bold">المرافق والخدمات</h3>
          <div className="grid grid-cols-2 gap-2">
            {amenityKeys.map((key) => {
              const active = draft.amenities.includes(key)
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleAmenity(key)}
                  aria-pressed={active}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-right text-[13px] font-medium transition',
                    active
                      ? 'border-primary bg-primary/8 text-foreground'
                      : 'border-border hover:border-foreground/40',
                  )}
                >
                  <Icon
                    name={amenityLabels[key].icon}
                    className={cn(
                      'size-4.5 shrink-0',
                      active ? 'text-primary' : 'text-muted-foreground',
                    )}
                  />
                  {amenityLabels[key].label}
                </button>
              )
            })}
          </div>
        </section>

        <section className="p-4">
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <span>
              <span className="flex items-center gap-1.5 text-sm font-bold">
                <Zap className="size-4 text-primary" />
                الحجز الفوري
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                عقارات يمكن حجزها دون انتظار موافقة المالك
              </span>
            </span>
            <input
              type="checkbox"
              checked={draft.instantBook}
              onChange={(e) =>
                setDraft((d) => ({ ...d, instantBook: e.target.checked }))
              }
              className="size-5 shrink-0 cursor-pointer accent-primary"
            />
          </label>
        </section>
      </div>
    </Sheet>
  )
}
