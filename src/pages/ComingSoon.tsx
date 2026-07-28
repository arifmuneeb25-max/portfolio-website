import { Link } from 'react-router-dom'

/**
 * Quiet placeholder for the five pages not built yet, so every link resolves
 * to something intentional rather than a dead end. Replace each route in
 * App.tsx with its real page as it is built.
 */
export default function ComingSoon({ label }: { label: string }) {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-ink px-6 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-cream/45">{label}</p>
      <h1 className="max-w-2xl text-4xl leading-[1.05] text-cream md:text-6xl">
        Coming <span className="font-serif italic text-ember">soon.</span>
      </h1>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-cream transition-colors duration-300 hover:text-ember"
      >
        <span aria-hidden="true">←</span> Back home
      </Link>
    </main>
  )
}
