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
