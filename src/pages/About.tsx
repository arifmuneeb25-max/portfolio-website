import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Footer from '../components/Footer'
import TheMethod from '../components/TheMethod'
import TrustedBy from '../components/TrustedBy'
import { acts, introLine } from '../data/about'
import type { Act } from '../data/about'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useReveal<T extends HTMLElement>(threshold = 0.3) {
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

type Segment = { text: string; className?: string }

function WordReveal({ segments }: { segments: Segment[] }) {
  let i = 0
  return (
    <>
      {segments.map((seg, si) =>
        seg.text.split(' ').map((word, wi) => {
          const idx = i++
          return (
            <span
              key={`${si}-${wi}`}
              aria-hidden="true"
              className={`reveal-word ${seg.className ?? ''}`}
              style={{ '--i': idx, marginRight: '0.25em' } as CSSProperties}
            >
              {word}
            </span>
          )
        }),
      )}
    </>
  )
}

function ActBlock({ act }: { act: Act }) {
  const [cardRef, revealed] = useReveal<HTMLElement>(0.2)
  const wordCount = act.title.split(' ').length
  const bodyDelay = ((wordCount - 1) * 0.12 + 0.5 + 0.3).toFixed(2)

  return (
    <article
      ref={cardRef}
      data-act={act.num}
      className={`about-act scroll-mt-24 w-full lg:max-w-[500px] lg:mx-auto ${revealed ? 'is-revealed' : ''}`}
    >
      <p className="text-[12px] uppercase tracking-[0.22em] text-gold">
        Act {act.num}
      </p>
      <div className="mt-4">
        <h2
          aria-label={act.title}
          className="act-title-settle max-w-[22ch] text-[clamp(22px,4vw,30px)] font-medium leading-[1.15] text-heading"
        >
          <WordReveal segments={[{ text: act.title }]} />
        </h2>
        <p
          className="reveal-body mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-body sm:mt-5"
          style={{ transitionDelay: `${bodyDelay}s` }}
        >
          {act.body}
        </p>
      </div>
    </article>
  )
}

export default function About() {
  const [introRevealed, setIntroRevealed] = useState(false)
  useEffect(() => {
    if (prefersReducedMotion()) {
      setIntroRevealed(true)
      return
    }
    const id = requestAnimationFrame(() => setIntroRevealed(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const [activeAct, setActiveAct] = useState(acts[0].num)
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-act]'))
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const num = entry.target.getAttribute('data-act')
            if (num) setActiveAct(num)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const [ctaRef, ctaRevealed] = useReveal<HTMLElement>(0.3)
  const [expRef, expRevealed] = useReveal<HTMLDivElement>(0.3)

  // Parallax: currently unused. The act card text previously used this and 
  // was removed because the label and heading drifted at different rates. 
  // Kept for a possible future use on the full viewport intro image. 
  // Add data-px-factor and data-px-clamp to an element to activate it.
  useEffect(() => {
    if (prefersReducedMotion() || ('ontouchstart' in window)) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-px-factor]'))
    if (!els.length) return

    let ticking = false
    const update = () => {
      ticking = false
      if (window.innerWidth < 1024) return
      const mid = window.innerHeight / 2
      for (const el of els) {
        const factor = parseFloat(el.dataset.pxFactor || '0')
        const clamp = parseFloat(el.dataset.pxClamp || '0')
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const offset = Math.max(-clamp, Math.min(clamp, (mid - center) * factor))
        el.style.transform = `translateY(${offset.toFixed(2)}px)`
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <main className="bg-surface text-heading">
      {/* INTRO — Hero section with real banner image */}
      {/* INTRO — Hero section with real banner image */}
      <section className="relative flex min-h-[500px] min-h-[calc(100vh-4rem)] h-[calc(100dvh-4rem)] flex-col justify-end overflow-hidden bg-surface">
        {/* FULL BLEED BACKGROUND IMAGE (ALL BREAKPOINTS) */}
        <div className="absolute inset-0">
          <img
            src="/assets/about/banner-image/banner.jpg"
            alt="Muneeb Arif in his studio"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="block h-full w-full max-w-full object-cover object-[75%_center] md:object-center"
          />
          {/* GRADIENT OVERLAY: left edge 55% navy fading to transparent by 45% across + top-to-bottom dark navy scrim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(var(--surface-rgb),0.55) 0%, rgba(var(--surface-rgb),0.55) 30%, transparent 45%), linear-gradient(180deg, rgba(var(--surface-rgb),0.2) 0%, rgba(var(--surface-rgb),0.85) 100%)',
            }}
          />
        </div>

        {/* TEXT CONTENT — sits over image at all widths */}
        <div className="relative z-10 site-container max-w-6xl pb-16 sm:pb-20 md:pb-24">
          <p className="mb-4 text-[12px] uppercase tracking-[0.28em] text-muted">About</p>
          <h1
            aria-label={`${introLine.lead} ${introLine.gold}`}
            className={`max-w-[16ch] text-[clamp(28px,6vw,56px)] font-medium leading-[1.1] tracking-[-0.01em] text-heading ${
              introRevealed ? 'is-revealed' : ''
            }`}
          >
            <WordReveal
              segments={[
                { text: introLine.lead },
                { text: introLine.gold, className: 'text-gold' },
              ]}
            />
          </h1>
        </div>

        {/* SCROLL CHEVRON */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
          <ChevronDown className="scroll-hint h-6 w-6 text-muted" aria-hidden="true" />
        </div>
      </section>

      {/* EXPERIENCE LEAD */}
      <div className="site-container max-w-6xl pt-12 sm:pt-16 md:pt-20">
        <div ref={expRef} className={expRevealed ? 'is-revealed' : ''}>
          <div className="reveal-body">
            <p className="max-w-[22ch] text-[clamp(24px,4vw,32px)] font-medium leading-[1.2] tracking-[-0.01em] text-heading">
              Most AI content looks good and does nothing.{' '}
              <span className="text-gold">Mine sells.</span>
            </p>
            <p className="mt-4 max-w-[50ch] text-[15px] leading-[1.75] text-body sm:mt-5">
              I lead AI content at Utopia Brands, directing ads across home, fashion, and more.
              Alongside that I help startups and small businesses worldwide make brands that feel
              premium, never generated.
            </p>
          </div>
        </div>
      </div>

      {/* ACTS — sticky index (hidden below 1024px) + 5 full-width act cards. */}
      <div className="site-container max-w-6xl pt-16 sm:pt-24 md:pt-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* Left — sticky act index (hidden below 1024px). */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24" aria-label="Acts">
              <p className="mb-6 text-[11px] uppercase tracking-[0.24em] text-muted">The Story</p>
              <ol className="space-y-4">
                {acts.map((act) => (
                  <li key={act.num}>
                    <a
                      href={`#act-${act.num}`}
                      className={`act-index-item flex gap-3 text-sm ${
                        activeAct === act.num ? 'is-active' : ''
                      }`}
                    >
                      <span className="tabular-nums">{act.num}</span>
                      <span>{act.name}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Right — 5 act cards. */}
          <div className="space-y-8 sm:space-y-10">
            {acts.map((act) => (
              <div id={`act-${act.num}`} key={act.num}>
                <ActBlock act={act} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* THE METHOD */}
      <TheMethod />

      {/* TRUSTED BY */}
      <TrustedBy />

      {/* CLOSING CTA */}
      <section
        ref={ctaRef}
        className={`site-container max-w-6xl py-16 sm:py-20 text-center ${
          ctaRevealed ? 'is-revealed' : ''
        }`}
      >
        <div className="reveal-body">
          <p className="mx-auto max-w-[30ch] text-[20px] sm:text-[22px] font-medium text-heading">
            If that is the kind of work you want to make, let's talk.
          </p>
          <Link to="/contact" className="cta-btn mt-8 text-sm font-medium">
            Start a project
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
