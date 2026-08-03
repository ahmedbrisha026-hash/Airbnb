'use client'

import {
  BadgeCheck,
  BedDouble,
  Heart,
  MapPin,
  MessageCircle,
  Navigation,
  Share2,
  Star,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { amenityLabels, formatPrice, getProperty } from '@/lib/data'
import { useApp } from '@/lib/store'
import { cn } from '@/lib/utils'
import { BookingSheet } from './booking-sheet'
import { Icon } from './icon'
import { ImageSlider } from './image-slider'

export function PropertyDetails() {
  const { openProperty, setOpenProperty, toggleWishlist, isWishlisted } = useApp()
  const [booking, setBooking] = useState(false)
  const property = openProperty ? getProperty(openProperty) : undefined

  if (!property) return null

  const saved = isWishlisted(property.id)
  const waLink = `https://wa.me/${property.host.phone}?text=${encodeURIComponent(
    `مرحباً ${property.host.name}، أنا مهتم بحجز "${property.title}" في ${property.city}. هل هي متاحة؟`,
  )}`

  const specs = [
    { icon: Users, label: `${property.guests} ضيوف` },
    { icon: BedDouble, label: `${property.bedrooms} غرف نوم` },
    { icon: BedDouble, label: `${property.beds} أسرّة` },
    { icon: Users, label: `${property.baths} حمامات` },
  ]

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-background">
        {/* Top floating controls */}
        <div className="pointer-events-none sticky top-0 z-20 flex items-start justify-between p-3">
          <button
            type="button"
            onClick={() => setOpenProperty(null)}
            aria-label="إغلاق"
            className="pointer-events-auto grid size-9 cursor-pointer place-items-center rounded-full bg-card shadow-md transition active:scale-95"
          >
            <X className="size-4.5" />
          </button>
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              aria-label="مشاركة"
              className="grid size-9 cursor-pointer place-items-center rounded-full bg-card shadow-md transition active:scale-95"
            >
              <Share2 className="size-4.5" />
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(property.id)}
              aria-label={saved ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
              aria-pressed={saved}
              className="grid size-9 cursor-pointer place-items-center rounded-full bg-card shadow-md transition active:scale-95"
            >
              <Heart
                className={cn(
                  'size-4.5',
                  saved ? 'fill-primary text-primary' : 'text-foreground',
                )}
              />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="-mt-15">
          <ImageSlider
            images={property.images}
            alt={property.title}
            rounded="rounded-none"
            priority
            className="aspect-[4/3] w-full sm:aspect-[16/9]"
          />
        </div>

        <div className="mx-auto max-w-3xl pb-32">
          {/* Title block */}
          <section className="px-4 pt-5">
            <h1 className="text-xl font-extrabold text-balance leading-snug">
              {property.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="flex items-center gap-1 font-semibold nums-tabular">
                <Star className="size-4 fill-foreground text-foreground" />
                {property.rating.toFixed(2)}
                <span className="font-normal text-muted-foreground">
                  ({property.reviews} تقييم)
                </span>
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="size-4" />
                {property.area}، {property.city}
              </span>
            </div>

            <div className="mt-3.5 flex flex-wrap gap-2">
              {property.isSuperhost && (
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                  <BadgeCheck className="size-3.5" />
                  مضيف متميز
                </span>
              )}
              {property.instantBook && (
                <span className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
                  <Zap className="size-3.5" />
                  حجز فوري
                </span>
              )}
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground nums-tabular">
                أقل مدة {property.minNights} ليلة
              </span>
            </div>
          </section>

          {/* Specs */}
          <section className="mt-5 border-y border-border px-4 py-4">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {specs.map((s, i) => (
                <li
                  key={`${s.label}-${i}`}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <s.icon className="size-4.5 shrink-0 text-muted-foreground" />
                  <span className="nums-tabular">{s.label}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Description */}
          <section className="px-4 py-5">
            <h2 className="mb-2 text-base font-bold">عن المكان</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {property.description}
            </p>
          </section>

          {/* Amenities badges */}
          <section className="border-t border-border px-4 py-5">
            <h2 className="mb-3.5 text-base font-bold">المرافق والخدمات</h2>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-3">
              {property.amenities.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-2.5 rounded-xl border border-border px-3 py-2.5"
                >
                  <Icon
                    name={amenityLabels[a].icon}
                    className="size-4.5 shrink-0 text-primary"
                  />
                  <span className="text-[13px] font-medium">
                    {amenityLabels[a].label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Map */}
          <section className="border-t border-border px-4 py-5">
            <h2 className="mb-1 text-base font-bold">الموقع</h2>
            <p className="mb-3.5 text-sm text-muted-foreground">
              {property.area}، {property.city} — يظهر الموقع الدقيق بعد تأكيد الحجز
            </p>
            <div className="relative overflow-hidden rounded-2xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/map-placeholder.png"
                alt={`خريطة توضيحية لموقع العقار في ${property.city}`}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid size-11 place-items-center rounded-full bg-primary shadow-lg ring-4 ring-primary/25">
                  <MapPin className="size-5.5 text-primary-foreground" />
                </span>
              </div>
              <button
                type="button"
                className="absolute bottom-3 left-3 flex cursor-pointer items-center gap-1.5 rounded-full bg-card px-3 py-2 text-xs font-bold shadow-md"
              >
                <Navigation className="size-3.5" />
                الاتجاهات
              </button>
            </div>
          </section>

          {/* Host */}
          <section className="border-t border-border px-4 py-5">
            <h2 className="mb-3.5 text-base font-bold">تعرّف على المضيف</h2>
            <div className="flex items-center gap-3.5 rounded-2xl border border-border p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={property.host.avatar || '/placeholder.svg'}
                alt={`صورة المضيف ${property.host.name}`}
                className="size-14 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-bold">
                  {property.host.name}
                  {property.isSuperhost && (
                    <BadgeCheck className="size-4 text-primary" />
                  )}
                </p>
                <p className="text-xs text-muted-foreground nums-tabular">
                  مضيف منذ {property.host.since}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {property.host.responseTime}
                </p>
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] bg-[#25D366]/8 px-4 py-3 text-sm font-bold text-foreground transition active:scale-[0.99]"
            >
              <MessageCircle className="size-4.5 text-[#25D366]" />
              تواصل مع المالك عبر واتساب
            </a>
          </section>
        </div>

        {/* Sticky booking bar */}
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 pb-safe">
            <div>
              <p className="text-base font-extrabold nums-tabular">
                {formatPrice(property.price)} د.ل
                <span className="text-sm font-normal text-muted-foreground">
                  {' '}
                  / الليلة
                </span>
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground nums-tabular">
                <Star className="size-3 fill-foreground text-foreground" />
                {property.rating.toFixed(2)} · {property.reviews} تقييم
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBooking(true)}
              className="cursor-pointer rounded-xl bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.98]"
            >
              احجز الآن
            </button>
          </div>
        </div>
      </div>

      <BookingSheet
        open={booking}
        onClose={() => setBooking(false)}
        property={property}
      />
    </>
  )
}
