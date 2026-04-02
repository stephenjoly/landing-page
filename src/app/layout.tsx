import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import PlausibleProvider from 'next-plausible'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Stephen Joly',
    default: 'Stephen Joly - Product-minded builder',
  },
  description:
    'I’m Stephen, an engineer and aspiring technologist based in Toronto. I lead customer deployment for Strategic Workforce Planning at Dayforce and spend my time building tools, systems, and ideas that help people solve real-world problems.',
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
