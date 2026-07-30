import { type CSSProperties } from 'react'

export type Segment = { text: string; className?: string }

/**
 * Word by word reveal shared by the About act titles and the Home statement.
 * Each word is an inline block .reveal-word span carrying its running index in
 * the --i custom property, so the shared CSS staggers them in sequence once an
 * .is-revealed ancestor appears. The mechanism lives in index.css; this only
 * splits copy into indexed spans.
 */
export function WordReveal({ segments }: { segments: Segment[] }) {
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
