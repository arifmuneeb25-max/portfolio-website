export type Service = {
  /** Two-digit index mark, e.g. "01". */
  index: string
  /** Service name. */
  title: string
  /** Short editorial brief — no more than a couple of sentences. */
  brief: string
  /**
   * Portrait image slot (4:5).
   */
  image: {
    src: string | null
    alt: string
  }
}

/**
 * The seven services, in order. Single source of truth for the Services page —
 * reorder, retitle or rewrite briefs here; the page reads from this list and
 * alternates the image side automatically.
 */
export const services: Service[] = [
  {
    index: '01',
    title: 'Brand Films',
    brief:
      'Cinematic brand and commercial films, fully AI-produced and directed to feel like a real shoot.',
    image: {
      src: '/assets/services/01.jpg',
      alt: 'Brand films',
    },
  },
  {
    index: '02',
    title: 'Social Reels & UGC',
    brief:
      'Short-form built for the feed — from polished multi-shot cinematic reels to authentic, UGC-style content that looks native and unscripted. On-brand either way.',
    image: {
      src: '/assets/services/02.jpg',
      alt: 'Social reels and UGC',
    },
  },
  {
    index: '03',
    title: 'Editorial',
    brief:
      'Fashion and lifestyle editorial with a magazine sensibility. Lookbooks and campaign stories that feel styled, shot, and art-directed.',
    image: {
      src: '/assets/services/03.jpg',
      alt: 'Editorial',
    },
  },
  {
    index: '04',
    title: 'Performance Creative',
    brief:
      'Direct-response ad creative that converts — multiple angles, hooks, and variations, visuals and copy moving together.',
    image: {
      src: '/assets/services/04.jpg',
      alt: 'Performance creative',
    },
  },
  {
    index: '05',
    title: 'Product & E-commerce Visuals',
    brief:
      'Premium product and campaign imagery with the polish of a full photoshoot, minus the studio.',
    image: {
      src: '/assets/services/05.jpg',
      alt: 'Product and e-commerce visuals',
    },
  },
  {
    index: '06',
    title: 'Creative Direction',
    brief:
      'Concept, strategy, and creative briefs — the thinking that turns a product into a campaign, not just a prompt.',
    image: {
      src: '/assets/services/06.jpg',
      alt: 'Creative direction',
    },
  },
  {
    index: '07',
    title: 'Graphic Design & Social (AI-generated)',
    brief:
      'On-brand static design that ships fast — banners, posters, Meta ads, and Instagram post sets. Built to a system so every asset looks like it belongs to the same brand.',
    image: {
      src: '/assets/services/07.jpg',
      alt: 'Graphic design and social',
    },
  },
]
