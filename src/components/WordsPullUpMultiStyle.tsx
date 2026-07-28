import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'

export type StyledSegment = {
  text: string
  /** Per-segment class — used to mix Almarai and Instrument Serif italic. */
  className?: string
}

type WordsPullUpMultiStyleProps = {
  segments: StyledSegment[]
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Like WordsPullUp, but takes styled segments and splits each into words while
 * preserving its className. Used for editorial headings that mix Almarai with
 * Instrument Serif italic accents. Stagger runs continuously across segments.
 */
export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  delay = 0,
  stagger = 0.08,
  as = 'span',
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()

  // Flatten segments → words, carrying each word's style with it.
  const words = segments.flatMap((seg) =>
    seg.text.split(' ').map((w) => ({ text: w, className: seg.className })),
  )

  const label = segments.map((s) => s.text).join(' ')

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const word: Variants = {
    hidden: { y: reduce ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: EASE },
    },
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-label={label}
    >
      {words.map((w, i) => (
        <span
          key={`${w.text}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: i < words.length - 1 ? '0.25em' : undefined }}
          aria-hidden="true"
        >
          <motion.span variants={word} className={`inline-block ${w.className ?? ''}`}>
            {w.text}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
