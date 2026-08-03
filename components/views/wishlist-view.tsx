'use client'

import { Heart } from 'lucide-react'
import { properties } from '@/lib/data'
import { useApp } from '@/lib/store'
import { ListingCard } from '../listing-card'
import { ViewHeader } from './view-header'

export function WishlistView() {
  const { wishlist, setTab } = useApp()
  const saved = properties.filter((p) => wishlist.includes(p.id))

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <ViewHeader
        title="المفضلة"
        subtitle={
          saved.length > 0
            ? `${saved.length} عقار محفوظ`
            : 'احفظ العقارات التي تعجبك'
        }
      />

      {saved.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Heart className="size-12 text-muted-foreground" strokeWidth={1.5} />
          <h2 className="text-base font-bold">قائمة المفضلة فارغة</h2>
          <p className="max-w-xs text-sm text-muted-foreground text-pretty">
            اضغط على أيقونة القلب في أي عقار لإضافته هنا والرجوع إليه لاحقاً.
          </p>
          <button
            type="button"
            onClick={() => setTab('explore')}
            className="mt-1 cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
          >
            استكشف العقارات
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((p, i) => (
            <ListingCard key={p.id} property={p} priority={i < 2} />
          ))}
        </div>
      )}
    </div>
  )
}
