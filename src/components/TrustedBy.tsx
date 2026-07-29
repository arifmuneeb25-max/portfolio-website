import { trustedBy } from '../data/about'

/**
 * TRUSTED BY — quiet credibility strip.
 * Stacks 3 columns to 1 column below 768px with full-width hairline dividers.
 */
export default function TrustedBy() {
  return (
    <section className="site-container max-w-6xl pt-20 sm:pt-24 md:pt-32">
      <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-muted">Trusted By</p>
      <h2 className="mb-6 text-[18px] font-medium text-heading sm:text-[20px]">
        The work speaks in rooms I am proud to be in
      </h2>

      <div
        className="trusted-band grid grid-cols-1 items-stretch overflow-hidden rounded-xl bg-[var(--card-fill)] md:grid-cols-3"
        style={{ border: '0.5px solid var(--hairline-strong)' }}
      >
        {trustedBy.map((item, index) => (
          <div
            key={item.name}
            className={`trusted-col flex flex-col justify-start p-6 sm:p-8 ${
              index < 2 ? 'border-b md:border-b-0 md:border-r border-[var(--hairline-strong)]' : ''
            }`}
          >
            <h3 className="text-base font-medium text-heading">{item.name}</h3>
            <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
              {item.role}
            </p>
            <p className="mt-4 text-[14px] leading-[1.65] text-body">{item.blurb}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-[13px] text-muted sm:text-[14px]">
        Directing commercial campaigns, spec films, and brand creative across digital channels.
      </p>
    </section>
  )
}
