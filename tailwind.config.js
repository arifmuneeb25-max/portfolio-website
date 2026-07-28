/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette derived from the hero video — deep cinematic navy at dusk.
        ink: '#0B1120', // primary background (near-black navy)
        night: '#0B2342', // deep navy (video's darkest sky)
        slate: '#1C2E4E', // slate-blue mid-tone — cards/panels
        mist: '#2C3A5B', // muted blue — borders/dividers/hover
        cream: '#E8E6DE', // cool off-white — PRIMARY TEXT
        ember: '#C8A98C', // warm skin/lamp tone — the single accent

        // Semantic brand tokens — map to CSS variables in index.css (:root).
        // Reference these (bg-surface, text-heading, text-gold …) instead of
        // raw hex so colour lives in one place.
        surface: 'var(--surface)', // page background (#101a30)
        heading: 'var(--heading)', // primary / heading text (#f2ede4)
        body: 'var(--body)', // body / brief text (#b9c0cd)
        gold: 'var(--gold)', // gold accent (#d9a441)
        muted: 'var(--muted)', // eyebrow / muted label (#8a94a8)
        placeholder: 'var(--placeholder)', // image placeholder fill (#182444)
        hairline: 'var(--hairline)', // spine + hairlines
      },
      fontFamily: {
        sans: ['Almarai', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
