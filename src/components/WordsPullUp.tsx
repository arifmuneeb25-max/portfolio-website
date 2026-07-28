import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'

type WordsPullUpProps = {
  text: string
  className?: string
  /** Delay before the first word begins, in seconds. */
  delay?: number
  /** Per-word stagger, in seconds. */
  stagger?: number
  /** Rendered element — use a heading tag for real headings. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Splits `text` on spaces and slides each word up (y:20 → 0) with a staggered
 * delay as it enters the viewport once. Honours prefers-reduced-motion by
 * rendering the words in place. The full string stays available to screen
 * readers via an aria-label; the per-word spans are hidden from the a11y tree.
 */
export default function WordsPullUp({
  text,
  className = '',
  delay = 0,
  stagger = 0.08,
  as = 'span',
}: WordsPullUpProps) {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const words = text.split(' ')

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
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: i < words.length - 1 ? '0.25em' : undefined }}
          aria-hidden="true"
        >
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
