import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, Tajawal } from 'next/font/google'
import './globals.css'

const _plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const _tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
})

export const metadata: Metadata = {
  title: 'مقيل | إيجار الفلل والشقق والمزارع في ليبيا',
  description:
    'اكتشف واحجز أجمل الفلل والشقق والمزارع والشاليهات في طرابلس، بنغازي، مصراتة وباقي مدن ليبيا. حجز مباشر مع المالك.',
  generator: 'v0.app',
  keywords: [
    'إيجار فلل ليبيا',
    'شقق مفروشة طرابلس',
    'شاليهات بنغازي',
    'مزارع للإيجار',
    'حجز عقارات ليبيا',
  ],
  openGraph: {
    title: 'مقيل | إيجار الفلل والشقق والمزارع في ليبيا',
    description:
      'اكتشف واحجز أجمل الفلل والشقق والمزارع والشاليهات في جميع مدن ليبيا.',
    locale: 'ar_LY',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111318' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
