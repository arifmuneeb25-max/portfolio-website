import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * BEAT 4 — a brief human beat. Asymmetric two columns: a tall portrait
 * on the left, a short storyteller-first passage on the right.
 */
export default function Director() {
  const reduce = useReducedMotion()

  return (
    <section className="bg-ink px-5 py-16 sm:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-12 md:gap-14 lg:gap-16">
        {/* LEFT — portrait image occupying 5/12 (~41.67%) of content width */}
        <div className="w-full md:col-span-5">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate md:rounded-2xl">
            <img
              src="/assets/about/muneeb-portrait.jpg"
              alt="Muneeb Arif"
              loading="lazy"
              className="h-full w-full object-cover object-[center_top]"
            />
          </div>
        </div>

        {/* RIGHT — the editorial passage vertically centered */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="w-full md:col-span-7"
        >
          <p className="max-w-[46ch] text-lg leading-[1.7] text-cream/70 md:text-xl">
            I do not chase visuals. I direct stories. Every frame is a decision
            about what to show, what to hold back, and why. The tools change. The
            craft does not.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm uppercase tracking-[0.15em] text-cream transition-colors duration-300 hover:text-ember"
          >
            About Muneeb <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
