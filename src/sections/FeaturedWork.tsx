import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { featuredWork } from '../data/featuredWork'
import type { FeaturedProject } from '../data/featuredWork'
import Lightbox, { videoThumb, thumbFallback, type LightboxTarget } from '../components/Lightbox'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
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
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, revealed] as const
}

function WorkTile({
  project,
  ratio,
  hero = false,
  delay = 0,
  onOpen,
}: {
  project: FeaturedProject
  ratio: string
  hero?: boolean
  delay?: number
  onOpen: (t: LightboxTarget) => void
}) {
  const thumb = videoThumb(project.videoId, project.thumbnail, ratio)

  return (
    <div className="reveal-body" style={{ transitionDelay: `${delay}s` } as CSSProperties}>
      <button
        type="button"
        onClick={() =>
          onOpen({ type: 'video', item: { title: project.title, ratio, videoId: project.videoId } })
        }
        aria-label={`Play ${project.title}, ${project.category}`}
        className="group block w-full text-left focus-visible:outline-none"
      >
        <div
          className="relative overflow-hidden rounded-lg bg-placeholder ring-1 ring-white/5 transition duration-500 ease-out group-hover:-translate-y-1 group-hover:ring-gold/40"
          style={{ aspectRatio: ratio } as CSSProperties}
        >
          {thumb && (
            <img
              src={thumb}
              alt={project.media.alt}
              loading="lazy"
              decoding="async"
              onError={thumbFallback}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          )}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-mist/50 bg-black/30 backdrop-blur-[2px] text-cream/70 transition duration-500 group-hover:border-gold/80 group-hover:bg-black/50 group-hover:text-gold sm:h-14 sm:w-14">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {!thumb && (
              <span className="text-[11px] uppercase tracking-[0.25em] text-cream/25">
                {project.title}
              </span>
            )}
          </div>
        </div>

        <div className="mt-3.5 block w-full text-left">
          <h3 className={`font-medium text-cream m-0 p-0 block ${hero ? 'text-xl sm:text-2xl md:text-3xl leading-snug' : 'text-base sm:text-lg leading-snug tracking-normal'}`}>
            {project.title}
          </h3>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-gold leading-none m-0 p-0 block">
            {project.category}
          </p>
        </div>
      </button>
    </div>
  )
}

/**
 * BEAT 3 — Selected Work.
 * 16:9 hero tile goes full width.
 * Three 9:16 tiles go 3 across at 768px+, stack to 1 column full width below 768px.
 */
export default function FeaturedWork() {
  const [hero, ...rest] = featuredWork
  const [gridRef, revealed] = useReveal<HTMLDivElement>(0.12)
  const [lightbox, setLightbox] = useState<LightboxTarget>(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])

  return (
    <section className="bg-ink py-20 md:py-32">
      <div className="site-container max-w-7xl">
        <p className="mb-8 text-[12px] uppercase tracking-[0.28em] text-muted md:mb-12">
          Selected Work
        </p>

        <div ref={gridRef} className={revealed ? 'is-revealed' : ''}>
          {/* Row 1 — wide 16:9 hero, full content width. */}
          {hero && (
            <WorkTile project={hero} ratio="16/9" hero delay={0} onOpen={setLightbox} />
          )}

          {/* Row 2 — three equal 9:16 tiles: 3 across at 768px+, 1 column full width below 768px. */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 items-start gap-4 md:grid-cols-3 md:gap-6">
            {rest.map((project, i) => (
              <WorkTile
                key={project.slug}
                project={project}
                ratio="9/16"
                delay={0.08 * (i + 1)}
                onOpen={setLightbox}
              />
            ))}
          </div>
        </div>

        {/* View all work link — 44px min hit area */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/work"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] tracking-[0.04em] text-cream transition-colors duration-300 hover:text-gold"
          >
            View all work
            <span
              aria-hidden="true"
              className="text-gold transition-transform duration-[250ms] ease-out group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      <Lightbox target={lightbox} onClose={closeLightbox} />
    </section>
  )
}
