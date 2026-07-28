import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * BEAT 1 — opening shot. Full viewport (100dvh with 100vh fallback), inset frame,
 * background video with film grain and gradients for legibility. Text held to left ~58%
 * on desktop, full width on mobile.
 */
export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative min-h-[100vh] min-h-[100dvh] h-[100dvh] p-3 sm:p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="A figure at a desk above the clouds at dusk — the opening shot."
        />

        {/* Left-to-right scrim */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,15,28,0.75) 0%, rgba(10,15,28,0.3) 60%, rgba(10,15,28,0) 100%)',
          }}
        />

        {/* Film grain */}
        <div className="noise-overlay opacity-[0.5] mix-blend-overlay pointer-events-none" />

        {/* Legibility gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

        {/* Hero content — bottom-aligned */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-12 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <div className="max-w-[600px] md:w-[58%] md:max-w-[680px]">
            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cream/70 sm:text-xs md:mb-6"
            >
              Creative Director · AI Filmmaker · Visual Storyteller
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              className="font-medium leading-[1.08] tracking-[-0.01em] text-[#f2ede4] text-[clamp(28px,6vw,44px)] [text-wrap:balance]"
            >
              Cinematic brand films that make you look{' '}
              <span style={{ color: '#d9a441' }}>premium</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              className="mt-4 max-w-md text-sm leading-[1.5] text-cream/70 sm:mt-5 md:mt-6 md:text-base"
            >
              I don't generate visuals. I direct stories that happen to be made with AI.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
