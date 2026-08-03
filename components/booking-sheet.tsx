'use client'

import { CheckCircle2, Minus, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { formatPrice } from '@/lib/data'
import { useApp } from '@/lib/store'
import type { Property } from '@/lib/types'
import { Sheet } from './sheet'

const SERVICE_RATE = 0.08

export function BookingSheet({
  open,
  onClose,
  property,
}: {
  open: boolean
  onClose: () => void
  property: Property
}) {
  const { search } = useApp()
  const today = new Date().toISOString().slice(0, 10)
  const [checkIn, setCheckIn] = useState(search.checkIn || today)
  const [checkOut, setCheckOut] = useState(search.checkOut || '')
  const [guests, setGuests] = useState(Math.max(1, search.guests || 2))
  const [done, setDone] = useState(false)

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const diff =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
    return diff > 0 ? Math.round(diff) : 0
  }, [checkIn, checkOut])

  const subtotal = nights * property.price
  const cleaning = nights > 0 ? 80 : 0
  const service = Math.round(subtotal * SERVICE_RATE)
  const total = subtotal + cleaning + service

  const tooShort = nights > 0 && nights < property.minNights
  const valid = nights > 0 && !tooShort

  function handleClose() {
    onClose()
    setTimeout(() => setDone(false), 250)
  }

  if (done) {
    return (
      <Sheet open={open} onClose={handleClose} title="تم إرسال الطلب">
        <div className="flex flex-col items-center gap-3 p-8 text-center">
          <CheckCircle2 className="size-14 text-primary" />
          <h3 className="text-lg font-extrabold">
            {property.instantBook ? 'تم تأكيد حجزك!' : 'تم إرسال طلب الحجز'}
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
            {property.instantBook
              ? `حجزك في "${property.title}" مؤكد. ستجد التفاصيل في صفحة حجوزاتي.`
              : `سيراجع ${property.host.name} طلبك ويرد عليك ${property.host.responseTime.replace('يرد عادة ', '')}.`}
          </p>
          <div className="mt-2 w-full rounded-2xl bg-secondary p-4 text-right">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">التواريخ</span>
              <span className="font-semibold nums-tabular">
                {checkIn} ← {checkOut}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">الإجمالي</span>
              <span className="font-bold nums-tabular">
                {formatPrice(total)} د.ل
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="mt-3 w-full cursor-pointer rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
          >
            تم
          </button>
        </div>
      </Sheet>
    )
  }

  return (
    <Sheet
      open={open}
      onClose={handleClose}
      title="تأكيد الحجز"
      footer={
        <button
          type="button"
          disabled={!valid}
          onClick={() => setDone(true)}
          className="w-full cursor-pointer rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {property.instantBook ? 'تأكيد الحجز والدفع' : 'إرسال طلب الحجز'}
        </button>
      }
    >
      <div className="space-y-4 p-4">
        <div className="flex gap-3 rounded-2xl border border-border p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.images[0] || '/placeholder.svg'}
            alt={property.title}
            className="size-20 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-bold text-balance">
              {property.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {property.area}، {property.city}
            </p>
            <p className="mt-1 text-xs font-semibold nums-tabular">
              {formatPrice(property.price)} د.ل / الليلة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold">الوصول</span>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm nums-tabular focus:border-primary focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold">المغادرة</span>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm nums-tabular focus:border-primary focus:outline-none"
            />
          </label>
        </div>

        {tooShort && (
          <p className="rounded-xl bg-destructive/10 px-3 py-2.5 text-xs font-medium text-destructive nums-tabular">
            أقل مدة إقامة لهذا العقار {property.minNights} ليلة
          </p>
        )}

        <div className="flex items-center justify-between rounded-2xl border border-border p-3.5">
          <div>
            <p className="text-sm font-semibold">الضيوف</p>
            <p className="text-xs text-muted-foreground nums-tabular">
              الحد الأقصى {property.guests} ضيوف
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              aria-label="إنقاص الضيوف"
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-border transition hover:border-foreground disabled:opacity-40"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-7 text-center text-sm font-bold nums-tabular">
              {guests}
            </span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(property.guests, g + 1))}
              disabled={guests >= property.guests}
              aria-label="زيادة الضيوف"
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-border transition hover:border-foreground disabled:opacity-40"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-secondary p-4">
          <h3 className="mb-3 text-sm font-bold">تفاصيل السعر</h3>
          {nights === 0 ? (
            <p className="text-xs text-muted-foreground">
              اختر تاريخي الوصول والمغادرة لعرض السعر الإجمالي
            </p>
          ) : (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground nums-tabular">
                  {formatPrice(property.price)} د.ل × {nights} ليالٍ
                </dt>
                <dd className="nums-tabular">{formatPrice(subtotal)} د.ل</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">رسوم التنظيف</dt>
                <dd className="nums-tabular">{formatPrice(cleaning)} د.ل</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">رسوم الخدمة</dt>
                <dd className="nums-tabular">{formatPrice(service)} د.ل</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2.5 text-base font-extrabold">
                <dt>الإجمالي</dt>
                <dd className="nums-tabular">{formatPrice(total)} د.ل</dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </Sheet>
  )
}
