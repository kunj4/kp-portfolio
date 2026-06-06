// Renders the resume PDF using the browser's built-in PDF viewer via an
// iframe. This intentionally avoids react-pdf / pdfjs-dist, which carried
// CVE-2024-4367 (arbitrary JS execution from a malicious PDF) and a heavy
// native `canvas` dependency. The PDF is same-origin and trusted; framing is
// permitted only same-origin (see frame-src / per-file headers in next.config.js).
export default function Resume({ filename }: { filename: string }) {
  return (
    <div className="PDF__container">
      <iframe
        src={filename}
        title="Kunj Patel — Resume"
        loading="lazy"
        className="h-[calc(100vh-10rem)] min-h-[600px] w-full rounded-b-2xl border border-primary-500"
      />
    </div>
  )
}
