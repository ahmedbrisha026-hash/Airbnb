'use client'

import { categories } from '@/lib/data'
import { useApp } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Icon } from './icon'

export function CategoryBar() {
  const { category, setCategory } = useApp()

  return (
    <nav aria-label="تصنيفات العقارات" className="mx-auto max-w-6xl">
      <ul className="no-scrollbar flex gap-6 overflow-x-auto px-4 pb-1">
        {categories.map((c) => {
          const active = category === c.key
          return (
            <li key={c.key} className="shrink-0">
              <button
                type="button"
                onClick={() => setCategory(c.key)}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'flex cursor-pointer flex-col items-center gap-1.5 border-b-2 pt-1 pb-2.5 transition-colors',
                  active
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
                )}
              >
                <Icon name={c.icon} className="size-6" strokeWidth={1.7} />
                <span className="text-xs font-medium whitespace-nowrap">
                  {c.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
