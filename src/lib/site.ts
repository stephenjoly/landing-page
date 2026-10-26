import { type Metadata } from 'next'

// Production origin, confirmed from the former analytics domain and the contact/sitemap
// branches. Kept as a constant so preview hostnames never reach canonical URLs.
export const siteUrl = 'https://stephenjoly.net'
export const siteName = 'Stephen Joly'
export const siteTitle = 'Stephen Joly - Product-minded builder'
export const siteDescription =
  'I’m Stephen, an engineer and technologist based in Toronto. I lead customer deployment for Strategic Workforce Planning at Dayforce and spend my time building tools, systems, and ideas that help people solve real-world problems.'

export const socialImage = {
  url: '/social-card.png',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Stephen Joly, product-minded builder focused on customers, clarity, and execution.',
}

export const socialDefaults = {
  openGraph: {
    type: 'website',
    siteName,
    locale: 'en_CA',
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@stephenjoly',
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
} satisfies Metadata

// Page metadata with its own canonical URL and share card. Next replaces the
// root openGraph/twitter objects wholesale, so each page restates them here.
export function pageMetadata({
  title,
  description,
  path,
  article,
}: {
  title?: string
  description: string
  path: string
  article?: { author: string; date: string }
}): Metadata {
  let shareTitle = title ? `${title} - ${siteName}` : siteTitle

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...socialDefaults.openGraph,
      title: shareTitle,
      description,
      url: path,
      ...(article && {
        type: 'article',
        publishedTime: article.date,
        authors: [article.author],
      }),
    },
    twitter: {
      ...socialDefaults.twitter,
      title: shareTitle,
      description,
    },
  }
}
