export type FeaturedProject = {
  /** Stable id / index mark. */
  index: string
  /** Display title, set in the project's own voice. */
  title: string
  /** One-word category — no descriptions, the work speaks. */
  category: string
  /** Route slug — reserved for a future /work/:slug detail page. */
  slug: string
  /**
   * YouTube video id — the tile opens this in the lightbox. Set to
   * 'PLACEHOLDER' until the real id is added; paste the id here later and the
   * tile plays with no other change.
   */
  videoId: string
  /**
   * Optional custom thumbnail path. Leave undefined to fall back to the
   * YouTube auto-thumb once a real id is set (supply a vertical thumb here for
   * 9:16 tiles, since the auto-thumb is 16:9 and would letterbox).
   */
  thumbnail?: string
  /**
   * Media placeholder metadata. `src` is null for now (renders a placeholder
   * panel with a play mark); drop a Vimeo/MP4 source in later without touching
   * JSX.
   */
  media: {
    type: 'video' | 'image'
    src: string | null
    /** Poster/still shown before the embed loads; null → placeholder. */
    poster: string | null
    /** Accessible description of the media. */
    alt: string
  }
}

/**
 * The four featured pieces previewed on Home — the first is the wide hero tile.
 * Single source of truth for the exhibition preview; reorder, retitle or swap
 * media here.
 */
export const featuredWork: FeaturedProject[] = [
  {
    index: '01',
    title: 'A Bathrobe Product Ad',
    category: 'For NY Threads',
    slug: 'ny-threads-bathrobe',
    videoId: 'TnX0blvHQgM',
    // Frame from three quarters through the film: over the shoulder, her laugh, robe in the foreground.
    thumbnail: '/thumbs/ny-threads-bathrobe.jpg',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: 'A bathrobe product ad for NY Threads. Video thumbnail.',
    },
  },
  {
    index: '02',
    title: 'A Meta Ad',
    category: 'For OpenArt AI',
    slug: 'openart',
    videoId: '52Dcns0JX9k',
    // Native 9:16 frame from the Short, so the vertical tile stays sharp.
    thumbnail: '/thumbs/openart-meta-ad.jpg',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: 'A Meta Ad for OpenArt AI. Video thumbnail.',
    },
  },
  {
    index: '03',
    title: 'A Brand Film',
    category: 'For Motoreasy',
    slug: 'nocturne',
    videoId: 'BfaJzmyYOHw',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: 'A Brand Film for Motoreasy. Video thumbnail.',
    },
  },
  {
    index: '04',
    title: 'An Outdoor Pillows Ad',
    category: 'For Utopia Brands',
    slug: 'outdoor-pillows',
    videoId: '2c0kI6zEkhg',
    // Native 9:16 frame from the Short, so the vertical tile stays sharp.
    thumbnail: '/thumbs/outdoor-pillows.jpg',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: 'An AI UGC ad for Utopia Brands outdoor pillows. Video thumbnail.',
    },
  },
]

