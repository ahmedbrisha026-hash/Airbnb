'use client'

import { Heart, MapPin, Star } from 'lucide-react'
import { formatPrice } from '@/lib/data'
import { useApp } from '@/lib/store'
import type { Property } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ImageSlider } from './image-slider'

export function ListingCard({
  property,
  priority = false,
}: {
  property: Property
  priority?: boolean
}) {
  const { toggleWishlist, isWishlisted, setOpenProperty } = useApp()
  const saved = isWishlisted(property.id)

  return (
    <article
      className="group cursor-pointer"
      onClick={() => setOpenProperty(property.id)}
    >
      <div className="relative">
        <ImageSlider
          images={property.images}
          alt={property.title}
          priority={priority}
          className="aspect-[20/19] w-full"
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(property.id)
          }}
          aria-label={saved ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          aria-pressed={saved}
          className="absolute top-3 left-3 z-10 rounded-full p-1 transition-transform active:scale-90"
        >
          <Heart
            className={cn(
              'size-6.5 transition-colors',
              saved
                ? 'fill-primary text-primary'
                : 'fill-foreground/45 text-card stroke-[1.5]',
            )}
          />
        </button>

        {(property.isSuperhost || property.isNew) && (
          <span className="absolute top-3 right-3 z-10 rounded-full bg-card px-2.5 py-1 text-xs font-semibold text-card-foreground shadow-sm">
            {property.isNew ? 'جديد' : 'مضيف متميز'}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpenProperty(property.id)
        }}
        aria-label={`عرض تفاصيل ${property.title}`}
        className="mt-2.5 block w-full cursor-pointer rounded-xl text-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-[15px] font-semibold text-balance">
            {property.title}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-[13px] font-medium nums-tabular">
            <Star className="size-3.5 fill-foreground text-foreground" />
            {property.rating.toFixed(2)}
          </span>
        </div>

        <p className="mt-0.5 flex items-center gap-1 text-[13px] text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {property.city} · {property.area}
        </p>

        <p className="mt-0.5 line-clamp-1 text-[13px] text-muted-foreground">
          {property.highlights.join(' • ')}
        </p>

        <p className="mt-1.5 text-[15px]">
          <span className="font-bold nums-tabular">
            {formatPrice(property.price)} د.ل
          </span>
          <span className="font-normal text-muted-foreground"> / الليلة</span>
        </p>
      </button>
    </article>
  )
}
