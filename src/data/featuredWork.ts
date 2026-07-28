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
    title: "A Mother's Day Film",
    category: 'For Utopia Brands',
    slug: 'maison-silene',
    videoId: 'LrDN9PQKIEk',
    // High resolution still exported from the master file (1924x1076). YouTube
    // only serves 1280x720, which upscales on a full width hero.
    thumbnail: '/thumbs/mothers-day-film.jpg',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: "A Mother's Day Film for Utopia Brands. Video thumbnail.",
    },
  },
  {
    index: '02',
    title: 'A Beauty Film',
    category: 'For TheSkinFit',
    slug: 'aurelis',
    videoId: 'hDJfkR8eR2s',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: 'A Beauty Film for TheSkinFit. Video thumbnail.',
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
    title: 'A Carnival Film',
    category: 'Personal concept film',
    slug: 'carnival',
    videoId: 'KLBiubarXFY',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: 'A Carnival Film, personal concept film. Video thumbnail.',
    },
  },
]
