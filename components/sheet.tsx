'use client'

import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  /** full = full screen page-like view (used for property details) */
  variant?: 'sheet' | 'full'
  labelledBy?: string
}

export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  variant = 'sheet',
}: SheetProps) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center">
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-foreground/45 backdrop-blur-[2px] animate-in fade-in duration-200"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'relative flex w-full flex-col overflow-hidden bg-card text-card-foreground shadow-2xl animate-in slide-in-from-bottom duration-300',
          variant === 'full'
            ? 'h-[94dvh] rounded-t-3xl sm:h-[92dvh] sm:max-w-2xl sm:rounded-3xl'
            : 'max-h-[90dvh] rounded-t-3xl sm:max-w-lg sm:rounded-3xl',
        )}
      >
        {title && (
          <div className="relative flex shrink-0 items-center justify-center border-b border-border px-4 py-3.5">
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="absolute right-3 cursor-pointer rounded-full p-2 transition hover:bg-secondary"
            >
              <X className="size-4.5" />
            </button>
            <h2 className="text-base font-bold">{title}</h2>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-border bg-card px-4 py-3 pb-safe">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
