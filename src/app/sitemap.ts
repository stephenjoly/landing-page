import { type MetadataRoute } from 'next'

import { getAllArticles } from '@/lib/articles'

const baseUrl = 'https://stephenjoly.net'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()

  return [
    ...['', '/about', '/articles', '/projects', '/speaking', '/uses'].map(
      (path) => ({ url: `${baseUrl}${path}` }),
    ),
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.date),
    })),
  ]
}
