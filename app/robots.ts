import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

// Required for `output: export` (static hosting on Cloudflare): Next 15 no
// longer treats metadata route handlers as static by default.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
