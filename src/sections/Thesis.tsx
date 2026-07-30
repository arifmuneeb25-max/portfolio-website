import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { WordReveal } from '../components/WordReveal'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * BEAT 2 — the quiet, confident statement. Generous negative space, one
 * centred editorial block mixing Almarai with an Instrument Serif italic
 * accent. Lines one and two fade up in sequence as the section arrives, then
 * line three reveals word by word, reusing the About act title reveal engine.
 */
export default function Thesis() {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setRevealed(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`bg-ink px-6 py-32 md:py-48 ${revealed ? 'is-revealed' : ''}`}
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-normal leading-[0.95] text-cream md:text-6xl lg:text-7xl">
          <span className="stmt-line block" style={{ '--i': 0 } as CSSProperties}>
            You bring the brief.
          </span>
          <span className="stmt-line block" style={{ '--i': 1 } as CSSProperties}>
            I bring the story, the direction, and the finish.
          </span>
          <span
            className="stmt-words block"
            aria-label="No studio, no crew, no six figure budget. Just campaign work that looks like all three."
          >
            <WordReveal
              segments={[
                {
                  text: 'No studio, no crew, no six figure budget. Just campaign work that looks like',
                },
                { text: 'all three.', className: 'font-serif italic text-gold' },
              ]}
            />
          </span>
        </h2>
      </div>
    </section>
  )
}
