import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ]
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  webpack(config, { isServer }) {
    if (!isServer) return config

    // Next16 webpack regression: @next/mdx's default SWC loader lacks its RSC
    // layer, falsely rejecting valid server metadata exports. Keep the option
    // local to the MDX rule; do not mutate Next's shared default loader.
    // https://github.com/vercel/next.js/issues/91735
    for (const rule of config.module.rules) {
      if (!(rule?.test instanceof RegExp) || !rule.test.test('page.mdx')) continue
      if (!Array.isArray(rule.use)) continue
      rule.use = rule.use.map((entry) => {
        if (
          typeof entry?.loader === 'string' &&
          entry.loader.includes('next-swc-loader') &&
          entry.options?.bundleLayer == null
        ) {
          return { ...entry, options: { ...entry.options, bundleLayer: 'rsc' } }
        }
        return entry
      })
    }
    return config
  },
  outputFileTracingIncludes: {
    '/articles/*': ['./src/app/articles/**/*.mdx'],
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
