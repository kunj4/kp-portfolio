import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

// Branded, on-domain version of SECURITY.md. Keep the policy details here in
// sync with /SECURITY.md (the GitHub-rendered source linked from
// /.well-known/security.txt).
export const metadata = genPageMetadata({
  title: 'Security',
  description: 'Security policy and responsible vulnerability disclosure for this site.',
})

const reportUrl = `${siteMetadata.siteRepo}/security/advisories/new`
const policyUrl = `${siteMetadata.siteRepo}/blob/main/SECURITY.md`

export default function SecurityPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Security
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Responsible disclosure policy for {siteMetadata.title}.
        </p>
      </div>

      <div className="prose max-w-none pb-8 pt-8 dark:prose-invert">
        <h2>Reporting a vulnerability</h2>
        <p>
          If you discover a security issue in this site or its source, please report it privately.{' '}
          <strong>Do not open a public issue for security vulnerabilities.</strong>
        </p>
        <ul>
          <li>
            Email: <Link href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</Link>
          </li>
          <li>
            Or open a private advisory: <Link href={reportUrl}>GitHub Security Advisories</Link>
          </li>
        </ul>

        <p>Please include:</p>
        <ul>
          <li>A description of the issue and its impact</li>
          <li>Steps to reproduce (proof-of-concept if possible)</li>
          <li>Affected URL(s), component, or commit</li>
        </ul>

        <p>
          You can expect an initial acknowledgement within <strong>5 business days</strong>. Valid
          reports are triaged and addressed as quickly as is practical, and I&apos;m happy to credit
          reporters who request it.
        </p>

        <h2>Scope</h2>
        <p>
          This site is a personal portfolio and blog. In-scope concerns include cross-site
          scripting, content injection, security-header misconfiguration, dependency
          vulnerabilities, and information disclosure. Denial-of-service testing against the live
          site is <strong>out of scope</strong>.
        </p>

        <h2>Supported versions</h2>
        <p>
          Only the latest deployed version of <code>main</code> is supported.
        </p>

        <hr />
        <p className="text-sm">
          Machine-readable contact details are published at{' '}
          <Link href="/.well-known/security.txt">/.well-known/security.txt</Link> (
          <Link href="https://www.rfc-editor.org/rfc/rfc9116">RFC 9116</Link>). The canonical policy
          source lives in <Link href={policyUrl}>SECURITY.md</Link>.
        </p>
      </div>
    </div>
  )
}
