import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import PlausibleProvider from 'next-plausible'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Stephen Joly',
    default:
      'Stephen Joly - Management consultant, people leader, and amateur software engineer',
  },
  description:
    'I’m Stephen, an engineer and aspiring technologist based in Toronto. I work at Deloitte and spend my time building tools, systems, and developing ideas that help people solve real-world problems.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <PlausibleProvider
          domain="stephenjoly.net"
          customDomain="https://plausible.stephenjoly.net"
          trackLocalhost
          enabled
        />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
