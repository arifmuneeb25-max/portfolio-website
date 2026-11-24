import type { MouseEvent } from 'react'

type Props = {
  /** Section key, used for the heading id (`work-${id}`). */
  id: string
  /** URL slug of the section (`#commercials`, `#short-stories`). */
  slug: string
  label: string
  line: string
  count: number
  /**
   * True for every section after the first. It renders as an "Up next" card so
   * people scrolling past the previous section see that more work follows,
   * instead of a thin divider that reads like the end of the page.
   */
  upNext: boolean
}

const filmCount = (n: number) => `${String(n).padStart(2, '0')} ${n === 1 ? 'film' : 'films'}`

export default function WorkSectionHeader({ id, slug, label, line, count, upNext }: Props) {
  if (!upNext) {
    return (
      <div className="mb-8 sm:mb-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id={`work-${id}`} className="text-[26px] leading-tight text-heading sm:text-[34px]">
            {label}
          </h2>
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted">{filmCount(count)}</span>
        </div>
        <p className="mt-2 text-[15px] text-body sm:text-base">{line}</p>
      </div>
    )
  }

  // Tapping the card brings the section to the top of the screen (below the nav).
  const jump = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <a
      href={`#${slug}`}
      onClick={jump}
      className="group mb-8 flex items-center justify-between gap-4 rounded-[18px] border border-white/[0.12] bg-[var(--card-fill)] px-5 py-5 shadow-[var(--edge-highlight)] transition-colors duration-300 hover:border-gold/40 sm:mb-10 sm:px-8 sm:py-7"
    >
      <span className="min-w-0">
        <span className="block text-[10.5px] uppercase tracking-[0.24em] text-gold sm:text-[11px]">Up next</span>
        <h2 id={`work-${id}`} className="mt-1.5 text-[22px] leading-tight text-heading sm:mt-2 sm:text-[30px]">
          {label}
        </h2>
        <span className="mt-1 block text-[13px] text-body sm:text-[15px]">
          {count} {count === 1 ? 'film' : 'films'}. {line}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-gold/60 text-gold transition-transform duration-300 group-hover:translate-y-0.5 sm:h-12 sm:w-12"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </span>
    </a>
  )
}
