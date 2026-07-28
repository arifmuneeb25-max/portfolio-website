import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'
import { services } from '../data/services'
import type { Service } from '../data/services'

type Align = 'center' | 'left' | 'right'

/** 01 is centered; the rest alternate right / left down the spine. */
function alignFor(i: number): Align {
  if (i === 0) return 'center'
  return i % 2 === 1 ? 'right' : 'left'
}

const ALIGN_CLASS: Record<Align, string> = {
  center: 'svc-center',
  left: 'svc-left',
  right: 'svc-right',
}

/** Initial horizontal reveal offset: right slides in from +40, left from -40. */
const REVEAL_X: Record<Align, string> = {
  center: '0px',
  left: '-40px',
  right: '40px',
}

/** One service block — image on outer edge, text beside it on desktop; stacked column on mobile. */
function ServiceBlock({ service, align }: { service: Service; align: Align }) {
  return (
    <article
      className={`svc-block ${ALIGN_CLASS[align]}`}
      style={{ '--reveal-x': REVEAL_X[align] } as React.CSSProperties}
    >
      <div className="svc-inner">
        <div className="svc-image">
          {service.image.src && (
            <img
              src={service.image.src}
              alt={service.image.alt}
              loading="lazy"
              decoding="async"
              className="block h-full w-full max-w-full object-cover object-center"
            />
          )}
        </div>
        <div className="svc-text">
          <div className="svc-index">{service.index}</div>
          <h2 className="svc-heading">{service.title}</h2>
          <p className="svc-brief">{service.brief}</p>
        </div>
      </div>
    </article>
  )
}

/**
 * Services — editorial scroll.
 * Below 768px: single centered column, all 7 services in order, spine hidden.
 */
export default function Services() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const blocks = Array.from(root.querySelectorAll<HTMLElement>('.svc-block'))

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.25 },
    )
    blocks.forEach((b) => io.observe(b))

    let ticking = false
    const update = () => {
      ticking = false
      if (window.innerWidth < 768 || ('ontouchstart' in window)) return // no parallax on mobile or touch
      const mid = window.innerHeight / 2
      for (const block of blocks) {
        const img = block.querySelector<HTMLElement>('.svc-image')
        if (!img) continue
        const rect = block.getBoundingClientRect()
        const blockCenter = rect.top + rect.height / 2
        const offset = Math.max(-18, Math.min(18, (mid - blockCenter) * 0.1))
        img.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`)
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
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden bg-surface text-heading">
      <div ref={rootRef} className="site-container max-w-[1100px] py-12 sm:py-16 md:py-24">
        {/* Page header */}
        <header className="text-center">
          <p className="mb-3 text-[12px] uppercase tracking-[0.28em] text-muted">Services</p>
          <h1 className="mx-auto max-w-[20ch] text-[clamp(26px,5vw,40px)] font-medium leading-[1.12] text-heading">
            Everything your brand needs to look{' '}
            <span className="text-gold">directed</span>.
          </h1>
        </header>

        {/* Services list */}
        <div className="svc-list mt-12 sm:mt-16 md:mt-20">
          <ServiceBlock service={services[0]} align="center" />
          <div className="svc-zigzag">
            <div className="svc-spine" aria-hidden="true" />
            {services.slice(1).map((service, i) => (
              <ServiceBlock key={service.index} service={service} align={alignFor(i + 1)} />
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <section className="svc-block svc-center my-16 text-center sm:my-20">
          <p className="mb-5 text-[22px] font-medium text-heading sm:text-[24px]">
            Have a brand worth filming?
          </p>
          <Link to="/contact" className="cta-btn text-sm font-medium">
            Let's talk
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  )
}
