'use client'

import { SearchX } from 'lucide-react'
import { defaultFilters, useApp } from '@/lib/store'
import type { Property } from '@/lib/types'
import { ListingCard } from '../listing-card'

export function ExploreView({ results }: { results: Property[] }) {
  const { category, setCategory, setFilters, setSearch } = useApp()

  return (
    <div className="mx-auto max-w-6xl px-4 py-5">
      <p className="mb-4 text-sm font-medium text-muted-foreground nums-tabular">
        {results.length > 0
          ? `${results.length} عقار متاح`
          : 'لا توجد نتائج مطابقة'}
      </p>

      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <SearchX className="size-12 text-muted-foreground" strokeWidth={1.5} />
          <h2 className="text-base font-bold">لم نجد عقارات مطابقة</h2>
          <p className="max-w-xs text-sm text-muted-foreground text-pretty">
            جرّب تعديل الفلاتر أو البحث في مدينة أخرى لعرض المزيد من النتائج.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilters(defaultFilters)
              setSearch({ city: '', checkIn: '', checkOut: '', guests: 0 })
              setCategory('all')
            }}
            className="mt-1 cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
          >
            مسح جميع الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <ListingCard key={p.id} property={p} priority={i < 2} />
          ))}
        </div>
      )}

      {results.length > 0 && category === 'all' && (
        <p className="mt-10 text-center text-xs text-muted-foreground text-pretty">
          الأسعار معروضة بالدينار الليبي (د.ل) لليلة واحدة ولا تشمل رسوم الخدمة.
        </p>
      )}
    </div>
  )
}
