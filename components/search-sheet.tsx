'use client'

import { Calendar, Minus, Plus, Search, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cities } from '@/lib/data'
import { useApp, type SearchState } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Sheet } from './sheet'

export function SearchSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { search, setSearch } = useApp()
  const [draft, setDraft] = useState<SearchState>(search)

  useEffect(() => {
    if (open) setDraft(search)
  }, [open, search])

  const today = new Date().toISOString().slice(0, 10)

  function apply() {
    setSearch(draft)
    onClose()
  }

  function reset() {
    setDraft({ city: '', checkIn: '', checkOut: '', guests: 0 })
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="ابحث عن إقامتك"
      footer={
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer text-sm font-semibold underline underline-offset-4"
          >
            مسح الكل
          </button>
          <button
            type="button"
            onClick={apply}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
          >
            <Search className="size-4" />
            بحث
          </button>
        </div>
      }
    >
      <div className="space-y-5 p-4">
        <fieldset>
          <legend className="mb-2.5 text-sm font-bold">إلى أين تريد الذهاب؟</legend>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() =>
                  setDraft((d) => ({ ...d, city: d.city === city ? '' : city }))
                }
                aria-pressed={draft.city === city}
                className={cn(
                  'cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition',
                  draft.city === city
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:border-foreground/40',
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border p-3.5">
          <legend className="flex items-center gap-1.5 px-1 text-sm font-bold">
            <Calendar className="size-4 text-primary" />
            التواريخ
          </legend>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                تاريخ الوصول
              </span>
              <input
                type="date"
                min={today}
                value={draft.checkIn}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, checkIn: e.target.value }))
                }
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm nums-tabular focus:border-primary focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                تاريخ المغادرة
              </span>
              <input
                type="date"
                min={draft.checkIn || today}
                value={draft.checkOut}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, checkOut: e.target.value }))
                }
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm nums-tabular focus:border-primary focus:outline-none"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border p-3.5">
          <legend className="flex items-center gap-1.5 px-1 text-sm font-bold">
            <Users className="size-4 text-primary" />
            الضيوف
          </legend>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">عدد الضيوف</p>
              <p className="text-xs text-muted-foreground">
                بما في ذلك الأطفال
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setDraft((d) => ({ ...d, guests: Math.max(0, d.guests - 1) }))
                }
                disabled={draft.guests === 0}
                aria-label="إنقاص عدد الضيوف"
                className="grid size-9 cursor-pointer place-items-center rounded-full border border-border transition hover:border-foreground disabled:opacity-40 disabled:hover:border-border"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-7 text-center text-sm font-bold nums-tabular">
                {draft.guests}
              </span>
              <button
                type="button"
                onClick={() =>
                  setDraft((d) => ({ ...d, guests: Math.min(20, d.guests + 1) }))
                }
                aria-label="زيادة عدد الضيوف"
                className="grid size-9 cursor-pointer place-items-center rounded-full border border-border transition hover:border-foreground"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    </Sheet>
  )
}
