import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * BEAT 5 — the exit, the last frame. One large line with a single serif-italic
 * accent, then a pill CTA to /contact. Fades up on scroll into view.
 */
export default function ClosingCTA() {
  const reduce = useReducedMotion()

  return (
    <section className="bg-ink px-6 py-32 text-center md:py-48">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="text-4xl leading-[1.05] text-cream md:text-6xl">
          Let's make something{' '}
          <span className="font-serif italic text-ember">worth watching.</span>
        </h2>

        <div className="mt-10 flex justify-center md:mt-14">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-cream py-2 pl-6 pr-2 font-medium text-ink transition-all duration-300 hover:gap-4"
          >
            <span>Start a project</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink transition-transform duration-300 group-hover:scale-110">
              <ArrowRight className="h-4 w-4 text-ember" strokeWidth={2} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
