'use client'

import { MessageCircle, MessageSquare } from 'lucide-react'
import { conversations, getProperty } from '@/lib/data'
import { useApp } from '@/lib/store'
import { cn } from '@/lib/utils'
import { ViewHeader } from './view-header'

export function MessagesView() {
  const { setOpenProperty } = useApp()

  return (
    <div className="mx-auto max-w-3xl px-4 pb-8">
      <ViewHeader title="الرسائل" subtitle="محادثاتك مع أصحاب العقارات" />

      {conversations.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <MessageSquare
            className="size-12 text-muted-foreground"
            strokeWidth={1.5}
          />
          <h2 className="text-base font-bold">لا توجد رسائل</h2>
          <p className="max-w-xs text-sm text-muted-foreground text-pretty">
            ابدأ محادثة مع المالك من صفحة العقار لطرح أسئلتك قبل الحجز.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {conversations.map((c) => {
            const p = getProperty(c.propertyId)
            const waLink = p
              ? `https://wa.me/${p.host.phone}?text=${encodeURIComponent(
                  `مرحباً ${p.host.name}، بخصوص "${p.title}"...`,
                )}`
              : '#'
            return (
              <li key={c.id} className="flex items-center gap-3 py-3.5">
                <button
                  type="button"
                  onClick={() => p && setOpenProperty(p.id)}
                  className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-right"
                >
                  <span className="relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.hostAvatar || '/placeholder.svg'}
                      alt={`صورة ${c.hostName}`}
                      className="size-12 rounded-full object-cover"
                    />
                    {c.unread > 0 && (
                      <span className="absolute -top-0.5 -left-0.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground nums-tabular ring-2 ring-background">
                        {c.unread}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span
                        className={cn(
                          'truncate text-sm',
                          c.unread > 0 ? 'font-extrabold' : 'font-semibold',
                        )}
                      >
                        {c.hostName}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {c.time}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'mt-0.5 block truncate text-xs',
                        c.unread > 0
                          ? 'font-semibold text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {c.lastMessage}
                    </span>
                    {p && (
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                        {p.title}
                      </span>
                    )}
                  </span>
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`مراسلة ${c.hostName} على واتساب`}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 transition active:scale-95"
                >
                  <MessageCircle className="size-4.5 text-[#25D366]" />
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
