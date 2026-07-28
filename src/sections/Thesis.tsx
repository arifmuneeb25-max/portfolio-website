import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle'

/**
 * BEAT 2 — the quiet, confident statement. Generous negative space, one
 * centred editorial line mixing Almarai with an Instrument Serif italic accent.
 */
export default function Thesis() {
  return (
    <section className="bg-ink px-6 py-32 md:py-48">
      <div className="mx-auto max-w-4xl text-center">
        <WordsPullUpMultiStyle
          as="h2"
          stagger={0.08}
          className="text-4xl font-normal leading-[0.95] text-cream md:text-6xl lg:text-7xl"
          segments={[
            { text: 'Ideas become campaigns.', className: 'font-normal text-cream' },
            { text: 'Concepts become' },
            { text: 'films.', className: 'font-serif italic text-ember' },
            { text: 'Creative direction becomes reality.', className: 'font-normal text-cream' },
          ]}
        />
      </div>
    </section>
  )
}
