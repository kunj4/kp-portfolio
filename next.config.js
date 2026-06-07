const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is us.umami.is cloud.umami.is static.cloudflareinsights.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  media-src 'self' https://*.s3.amazonaws.com;
  connect-src 'self' analytics.umami.is us.umami.is cloud.umami.is cloudflareinsights.com;
  font-src 'self';
  frame-src 'self' giscus.app;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    output,
    basePath,
    reactStrictMode: true,
    poweredByHeader: false,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    images: {
      remotePatterns: [],
      unoptimized,
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
        {
          // The resume page embeds this PDF in a same-origin iframe. Relax the
          // frame-blocking headers for this one file only (last-match wins in
          // Next.js); all other security headers from the catch-all still apply.
          source: '/Kunj_Patel_Senior_Security_Engineer.pdf',
          headers: [
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          ],
        },
      ]
    },
    webpack: (config, options) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        assert: require.resolve('assert'), // This adds the polyfill
      }
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })
      config.module.rules.push({
        test: /\.node/,
        use: {
          loader: 'raw-loader',
        },
      })

      return config
    },
  })
}
