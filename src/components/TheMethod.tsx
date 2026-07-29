import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { methodFraming, methodStages } from '../data/about'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * THE METHOD — interactive process. Desktop horizontal stepper + panel,
 * mobile vertical accordion with 44px hit areas.
 */
export default function TheMethod() {
  const last = methodStages.length - 1

  const framingRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  const [active, setActive] = useState(0)
  const [panelStage, setPanelStage] = useState(0)
  const [fading, setFading] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  const activeRef = useRef(0)
  const fadeTimer = useRef<number | undefined>(undefined)
  useEffect(() => {
    activeRef.current = active
  }, [active])

  const goTo = (i: number) => {
    setActive(i)
    if (prefersReducedMotion()) {
      setPanelStage(i)
      return
    }
    setFading(true)
    window.clearTimeout(fadeTimer.current)
    fadeTimer.current = window.setTimeout(() => {
      setPanelStage(i)
      setFading(false)
    }, 200)
  }

  const handleSelect = (i: number) => {
    setUserInteracted(true)
    if (i !== active) goTo(i)
  }

  useEffect(() => {
    if (prefersReducedMotion()) {
      setRevealed(true)
      return
    }
    const el = framingRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!revealed || userInteracted || prefersReducedMotion()) return
    const id = window.setInterval(() => {
      goTo((activeRef.current + 1) % methodStages.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [revealed, userInteracted])

  useEffect(() => () => window.clearTimeout(fadeTimer.current), [])

  const panel = methodStages[panelStage]

  return (
    <section className="site-container max-w-3xl pt-20 sm:pt-24 md:pt-32">
      {/* Framing */}
      <div ref={framingRef} className={revealed ? 'is-revealed' : ''}>
        <div className="reveal-body">
          <p className="mb-4 text-[12px] uppercase tracking-[0.24em] text-muted">The Method</p>
          <h2 className="max-w-[26ch] text-[20px] font-medium leading-[1.3] text-heading sm:text-[25px]">
            {methodFraming.lead}{' '}
            <span className="text-gold">{methodFraming.gold}</span>.
          </h2>
        </div>
      </div>

      {/* Desktop stepper */}
      <div className="method-panel-card mt-12 hidden md:block sm:mt-14">
        <div className="method-stepper relative">
          <div className="absolute left-[12.5%] right-[12.5%] top-[5px] h-px -translate-y-1/2">
            <div className="method-track absolute inset-0" />
            <div
              className="method-fill absolute inset-y-0 left-0"
              style={{ width: `${(active / last) * 100}%` }}
            />
          </div>

          <div className="relative z-10 flex">
            {methodStages.map((stage, i) => (
              <button
                key={stage.num}
                type="button"
                onClick={() => handleSelect(i)}
                aria-pressed={i === active}
                aria-label={`Stage ${stage.num} ${stage.label}`}
                className="flex flex-1 flex-col items-center min-h-[44px] justify-center text-center focus-visible:rounded"
              >
                <span
                  className="method-dot h-2.5 w-2.5 rounded-full"
                  style={{ background: i <= active ? 'var(--gold)' : 'var(--dot-muted)' }}
                />
                <span
                  className="method-label mt-3 text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: i === active ? 'var(--gold)' : 'var(--muted-dim)' }}
                >
                  {stage.num} {stage.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 min-h-[120px]">
          <div
            className="method-panel-content"
            style={{ opacity: fading ? 0 : 1 } as CSSProperties}
          >
            <h3 className="text-[19px] font-medium text-heading">{panel.title}</h3>
            <p className="mt-3 max-w-[52ch] text-[14.5px] leading-[1.7] text-body">{panel.body}</p>
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      <ul className="method-panel-card mt-8 md:hidden">
        {methodStages.map((stage, i) => {
          const open = active === i
          return (
            <li key={stage.num} className="relative pl-3" style={{ borderTop: '0.5px solid var(--hairline-strong)' }}>
              {/* Vertical gold indicator fill on left edge */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold transition-all duration-300"
                style={{ opacity: open ? 1 : 0 }}
              />
              <button
                type="button"
                onClick={() => handleSelect(i)}
                aria-expanded={open}
                className="flex min-h-[48px] w-full items-center gap-3 py-3.5 text-left focus-visible:outline-none"
              >
                <span
                  className="method-dot h-2 w-2 shrink-0 rounded-full"
                  style={{ background: open ? 'var(--gold)' : 'var(--dot-muted)' }}
                />
                <span
                  className="method-label text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: open ? 'var(--gold)' : 'var(--muted-dim)' }}
                >
                  {stage.num} {stage.label}
                </span>
              </button>
              <div className={`accordion-body ${open ? 'is-open' : ''}`}>
                <div>
                  <h3 className="text-[17px] font-medium text-heading">{stage.title}</h3>
                  <p className="pb-5 pt-2 text-[14.5px] leading-[1.7] text-body">{stage.body}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
