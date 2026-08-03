'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { useApp } from '@/lib/store'
import { CategoryBar } from './category-bar'

export function SearchHeader({
  onOpenSearch,
  onOpenFilters,
}: {
  onOpenSearch: () => void
  onOpenFilters: () => void
}) {
  const { search, activeFilterCount } = useApp()

  const summary = [
    search.city || 'أي مكان في ليبيا',
    search.checkIn && search.checkOut ? 'تواريخ محددة' : 'أي وقت',
    search.guests > 0 ? `${search.guests} ضيوف` : 'أضف ضيوف',
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 pt-3 pb-2">
        <div className="flex items-center gap-2.5">
          <span className="hidden shrink-0 items-center gap-1.5 text-xl font-extrabold tracking-tight text-primary md:flex font-serif">
            مقيل
          </span>

          <button
            type="button"
            onClick={onOpenSearch}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 text-right shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.06)] transition hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.09)]"
          >
            <Search className="size-4.5 shrink-0 text-primary" strokeWidth={2.5} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold leading-tight">
                {summary[0]}
              </span>
              <span className="block truncate text-xs text-muted-foreground leading-tight">
                {summary[1]} · {summary[2]}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenFilters}
            aria-label="فلاتر متقدمة"
            className="relative shrink-0 cursor-pointer rounded-full border border-border bg-card p-3 shadow-sm transition hover:border-foreground/30"
          >
            <SlidersHorizontal className="size-4.5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -left-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground nums-tabular">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <CategoryBar />
    </header>
  )
}
