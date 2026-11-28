export type FeaturedProject = {
  /** Stable id / index mark. */
  index: string
  /** Display title, set in the project's own voice. */
  title: string
  /** Home label, e.g. "For NY Threads". */
  category: string
  /** Label used on the Work page's Selected Work section: "Brand, Product, Type". */
  note: string
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
 * The four Selected Work films: shown on Home and as the Selected Work section
 * at the top of the Work page. All four are 16:9; the first is the wide lead and
 * the other three sit in one row below it.
 * Single source of truth for the exhibition preview; reorder, retitle or swap
 * media here.
 */
export const featuredWork: FeaturedProject[] = [
  {
    index: '01',
    title: 'A Bathrobe Product Ad',
    category: 'For NY Threads',
    note: 'NY Threads, Bathrobe, Product Ad',
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
    title: 'A Quilted Cushion Ad',
    category: 'For Utopia Brands',
    note: 'Utopia Brands, Quilted Cushion Pillow, Amazon Listing Film',
    slug: 'utopia-quilted-cushion-pillow',
    videoId: '1MApmfzbJhY',
    thumbnail: '/thumbs/utopia-quilted-cushion-pillow.jpg',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: 'A quilted cushion Amazon listing film for Utopia Brands. Video thumbnail.',
    },
  },
  {
    index: '03',
    title: 'A Fleece Blanket Ad',
    category: 'For Utopia Brands',
    note: 'Utopia Brands, Fleece Blanket, Amazon Sponsored Ad',
    slug: 'utopia-fleece-blanket',
    videoId: 'ZlS4LiIu904',
    // Golden hour by the tent, wrapped in the fleece. Clean frame, no text.
    thumbnail: '/thumbs/utopia-fleece-blanket.jpg',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: 'A fleece blanket Amazon sponsored ad for Utopia Brands. Video thumbnail.',
    },
  },
  {
    index: '04',
    title: 'A Quilted Pillow Ad',
    category: 'For Utopia Brands',
    note: 'Utopia Brands, Quilted Pillow, Amazon Listing Film',
    slug: 'utopia-quilted-pillow',
    videoId: 'UEplfTsxxeo',
    thumbnail: '/thumbs/utopia-quilted-pillow.jpg',
    media: {
      type: 'video',
      src: null,
      poster: null,
      alt: 'A quilted pillow Amazon listing film for Utopia Brands. Video thumbnail.',
    },
  },
]

