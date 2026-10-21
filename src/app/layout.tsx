import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import {
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  socialDefaults,
} from '@/lib/site'
import PlausibleProvider from 'next-plausible'
import '@/styles/tailwind.css'

// No canonical or og:url here: they would be inherited by every page.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s - ${siteName}`,
    default: siteTitle,
  },
  description: siteDescription,
  authors: [{ name: siteName, url: siteUrl }],
  ...socialDefaults,
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
