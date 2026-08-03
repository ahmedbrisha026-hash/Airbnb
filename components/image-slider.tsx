'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageSliderProps {
  images: string[]
  alt: string
  className?: string
  rounded?: string
  priority?: boolean
}

export function ImageSlider({
  images,
  alt,
  className,
  rounded = 'rounded-2xl',
  priority = false,
}: ImageSliderProps) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const total = images.length

  // In RTL the visual "next" (further along the track) sits to the LEFT.
  function go(delta: number, e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    const next = Math.min(Math.max(index + delta, 0), total - 1)
    setIndex(next)
    const el = trackRef.current
    if (el) {
      // scrollLeft is negative in RTL browsers; scroll by ratio instead.
      el.scrollTo({
        left: -(next * el.clientWidth),
        behavior: 'smooth',
      })
    }
  }

  function onScroll() {
    const el = trackRef.current
    if (!el) return
    const i = Math.round(Math.abs(el.scrollLeft) / el.clientWidth)
    if (i !== index && i >= 0 && i < total) setIndex(i)
  }

  return (
    <div className={cn('group/slider relative overflow-hidden', rounded, className)}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto"
        dir="rtl"
      >
        {images.map((src, i) => (
          <div key={src + i} className="relative h-full w-full shrink-0 snap-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src || '/placeholder.svg'}
              alt={`${alt} - صورة ${i + 1}`}
              loading={priority && i === 0 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => go(1, e)}
            disabled={index === total - 1}
            aria-label="الصورة التالية"
            className={cn(
              'absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-card/90 p-1.5 text-foreground shadow-md transition',
              'opacity-0 group-hover/slider:opacity-100 focus-visible:opacity-100',
              'disabled:pointer-events-none disabled:opacity-0',
              'max-md:opacity-100',
            )}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={(e) => go(-1, e)}
            disabled={index === 0}
            aria-label="الصورة السابقة"
            className={cn(
              'absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-card/90 p-1.5 text-foreground shadow-md transition',
              'opacity-0 group-hover/slider:opacity-100 focus-visible:opacity-100',
              'disabled:pointer-events-none disabled:opacity-0',
              'max-md:opacity-100',
            )}
          >
            <ChevronRight className="size-4" />
          </button>

          <div className="pointer-events-none absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
            {images.map((src, i) => (
              <span
                key={`dot-${src}-${i}`}
                className={cn(
                  'size-1.5 rounded-full bg-card/60 transition-all',
                  i === index && 'w-4 bg-card',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
