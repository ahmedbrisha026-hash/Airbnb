'use client'

import {
  Bell,
  ChevronLeft,
  CircleQuestionMark,
  CreditCard,
  Globe,
  Heart,
  HousePlus,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { bookings } from '@/lib/data'
import { useApp } from '@/lib/store'
import { ViewHeader } from './view-header'

const menu = [
  { icon: UserRound, label: 'المعلومات الشخصية', hint: 'الاسم، الهاتف، البريد' },
  { icon: ShieldCheck, label: 'الأمان والخصوصية', hint: 'كلمة المرور والتحقق' },
  { icon: CreditCard, label: 'طرق الدفع', hint: 'بطاقات ومحافظ محلية' },
  { icon: Bell, label: 'الإشعارات', hint: 'تنبيهات الحجز والرسائل' },
  { icon: Globe, label: 'اللغة والعملة', hint: 'العربية · د.ل' },
  { icon: CircleQuestionMark, label: 'المساعدة والدعم', hint: 'الأسئلة الشائعة' },
]

export function ProfileView() {
  const { wishlist, setTab } = useApp()
  const upcoming = bookings.filter((b) => b.status === 'upcoming').length

  const stats = [
    { label: 'حجوزات قادمة', value: upcoming, tab: 'bookings' as const },
    { label: 'عقارات محفوظة', value: wishlist.length, tab: 'wishlist' as const },
    { label: 'رحلات مكتملة', value: bookings.filter((b) => b.status === 'completed').length, tab: 'bookings' as const },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 pb-8">
      <ViewHeader title="حسابي" />

      <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-primary/12 text-xl font-extrabold text-primary">
          ع م
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-extrabold">عمر المهدي</p>
          <p className="text-sm text-muted-foreground nums-tabular" dir="ltr">
            +218 91 234 5678
          </p>
          <button
            type="button"
            className="mt-1 cursor-pointer text-xs font-bold text-primary underline underline-offset-4"
          >
            تعديل الملف الشخصي
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setTab(s.tab)}
            className="cursor-pointer rounded-2xl border border-border bg-card p-3 text-center transition hover:border-foreground/25"
          >
            <p className="text-xl font-extrabold nums-tabular">{s.value}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground text-balance">
              {s.label}
            </p>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 flex w-full cursor-pointer items-center gap-3.5 rounded-2xl border border-primary/30 bg-primary/6 p-4 text-right transition active:scale-[0.99]"
      >
        <HousePlus className="size-6 shrink-0 text-primary" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold">أضف عقارك للإيجار</span>
          <span className="mt-0.5 block text-xs text-muted-foreground text-pretty">
            اربح دخلاً إضافياً من فيلتك أو مزرعتك أو شقتك في ليبيا
          </span>
        </span>
        <ChevronLeft className="size-4.5 shrink-0 text-muted-foreground" />
      </button>

      <ul className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {menu.map((m) => (
          <li key={m.label}>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3.5 p-4 text-right transition hover:bg-secondary"
            >
              <m.icon className="size-5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{m.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {m.hint}
                </span>
              </span>
              <ChevronLeft className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border p-3.5 text-sm font-bold text-destructive transition hover:bg-destructive/6"
      >
        <LogOut className="size-4.5" />
        تسجيل الخروج
      </button>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <Settings className="size-3.5" />
        مقيل · الإصدار 1.0.0
      </p>
    </div>
  )
}
