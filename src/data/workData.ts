export type VideoItem = {
  videoId: string
  title: string
  note: string
  ratio: string
  thumbnail?: string
}

export type GallerySlide = {
  type: 'image' | 'video'
  src?: string
  videoId?: string
  ratio?: string
}

export type ImageItem = {
  src: string | null
  title: string
  note: string
  ratio: string
  gallery?: (string | GallerySlide)[]
  hasVideo?: boolean
}

/**
 * 11 concept posters collection for the first 9:16 image gallery tile.
 */
export const posterImages: string[] = [
  '/assets/posters/1.jpeg',
  '/assets/posters/2.jpeg',
  '/assets/posters/3.jpeg',
  '/assets/posters/4.jpg',
  '/assets/posters/5.jpg',
  '/assets/posters/6.jpg',
  '/assets/posters/7.jpg',
  '/assets/posters/8.jpeg',
  '/assets/posters/9.jpg',
  '/assets/posters/10.jpg',
  '/assets/posters/11.jpg',
]

/**
 * 10 brand concept campaign images for the Do Chamach gallery tile.
 */
export const dochamachImages: string[] = [
  '/assets/dochamach/1.jpg',
  '/assets/dochamach/2.jpg',
  '/assets/dochamach/3.jpg',
  '/assets/dochamach/4.jpg',
  '/assets/dochamach/5.jpg',
  '/assets/dochamach/6.jpg',
  '/assets/dochamach/7.jpg',
  '/assets/dochamach/8.jpg',
  '/assets/dochamach/9.jpg',
  '/assets/dochamach/10.jpg',
]

/**
 * 6 slides (5 images + 1 video) mixed campaign gallery for Fomin tile.
 */
export const fominSlides: GallerySlide[] = [
  { type: 'image', src: '/assets/fomin/1.jpg' },
  { type: 'image', src: '/assets/fomin/2.jpg' },
  { type: 'image', src: '/assets/fomin/3.jpg' },
  { type: 'image', src: '/assets/fomin/4.jpg' },
  { type: 'image', src: '/assets/fomin/5.jpg' },
  { type: 'video', videoId: 'KKFiURDwEiY', ratio: '9/16' },
]

/**
 * 12 food brand social & menu design images for the Doner Almani gallery tile.
 */
export const doneralmaniImages: string[] = [
  '/assets/doneralmani/4.jpeg',
  '/assets/doneralmani/2.jpeg',
  '/assets/doneralmani/3.jpeg',
  '/assets/doneralmani/1.jpeg',
  '/assets/doneralmani/5.jpeg',
  '/assets/doneralmani/6.jpeg',
  '/assets/doneralmani/7.jpg',
  '/assets/doneralmani/8.jpeg',
  '/assets/doneralmani/9.jpg',
  '/assets/doneralmani/10.jpg',
  '/assets/doneralmani/11.jpeg',
  '/assets/doneralmani/12.jpg',
]

/**
 * 4 real estate property visual images for the Anatomy of a Home gallery tile.
 */
export const anatomyImages: string[] = [
  '/assets/anatomy/1.jpg',
  '/assets/anatomy/2.jpg',
  '/assets/anatomy/3.jpg',
  '/assets/anatomy/4.jpg',
]

/**
 * 11 spec campaign images for the e.l.f. Beauty gallery tile.
 */
export const elfImages: string[] = [
  '/assets/elf/1.jpg',
  '/assets/elf/4.jpg',
  '/assets/elf/6.jpg',
  '/assets/elf/7.jpg',
  '/assets/elf/5.jpg',
  '/assets/elf/2.jpg',
  '/assets/elf/8.jpg',
  '/assets/elf/9.jpg',
  '/assets/elf/10.jpg',
  '/assets/elf/11.jpg',
  '/assets/elf/3.jpg',
]

/**
 * Shared images collection — 6 items accessible via Video/Images toggle on both Work pages.
 */
export const sharedImages: ImageItem[] = [
  {
    src: posterImages[0],
    title: 'Poster Series',
    note: 'Concept Posters, 11 Frames',
    ratio: '9/16',
    gallery: posterImages,
  },
  {
    src: '/assets/fomin/1.jpg',
    title: 'Fomin',
    note: 'Cooling Comfort, Product Campaign',
    ratio: '4/5',
    gallery: fominSlides,
    hasVideo: true,
  },
  {
    src: anatomyImages[1],
    title: 'Anatomy of a Home',
    note: 'Real Estate, Property Visuals',
    ratio: '16/9',
    gallery: anatomyImages,
  },
  {
    src: '/assets/elf/3.jpg',
    title: 'Nothing to Fix',
    note: 'e.l.f. Beauty, Spec Campaign',
    ratio: '9/16',
    gallery: elfImages,
  },
  {
    src: dochamachImages[0],
    title: 'Do Chamach',
    note: 'Igloo Ice Cream, Brand Concept Campaign',
    ratio: '4/5',
    gallery: dochamachImages,
  },
  {
    src: doneralmaniImages[0],
    title: 'Doner Almani',
    note: 'Food Brand, Social & Ad Creatives',
    ratio: '4/5',
    gallery: doneralmaniImages,
  },
]

/**
 * Main Work video collection — 11 videos for /work (Page 1).
 */
export const mainWorkVideos: VideoItem[] = [
  {
    videoId: 'YFsVyNTbuU4',
    title: 'Every Kitchen Has One',
    note: 'Utopia Brands, Dish Towel, Amazon Film',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/YFsVyNTbuU4/maxresdefault.jpg',
  },
  {
    videoId: 'I_5153StFJY',
    title: 'I Asked ChatGPT About You',
    note: 'Personal Concept, UGC',
    ratio: '9/16',
    thumbnail: 'https://img.youtube.com/vi/I_5153StFJY/maxresdefault.jpg',
  },
  {
    videoId: 'ZeVKkwKtJW4',
    title: 'Even the Miseries Are Beautiful',
    note: 'Personal Work, Short Film',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/ZeVKkwKtJW4/maxresdefault.jpg',
  },
  {
    videoId: 'vGgxMBdk0Dg',
    title: 'A Reason to Fly Home',
    note: 'Air Karachi, Spec Ad',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/vGgxMBdk0Dg/maxresdefault.jpg',
  },
  {
    videoId: 'JRavp3hUfTM',
    title: 'The Sheet That Actually Fits',
    note: 'Utopia Brands, Deep Pocket Sheet, UGC',
    ratio: '9/16',
    thumbnail: '/assets/thumbnails/lumiere-thumb.jpg',
  },
  {
    videoId: 'LNqK4FWMOl4',
    title: 'Threads Worth Wearing',
    note: 'Rawan, Fashion Spec',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/LNqK4FWMOl4/maxresdefault.jpg',
  },
  {
    videoId: '7dNexrTOCys',
    title: 'Made for the Loop',
    note: 'Loop Coffee, Spec Ad',
    ratio: '9/16',
    thumbnail: 'https://img.youtube.com/vi/7dNexrTOCys/maxresdefault.jpg',
  },
  {
    videoId: 'i7nwOhjaBIs',
    title: 'Warm Enough to Stay In',
    note: 'Utopia Brands, Fleece Blanket, Product Ad',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/i7nwOhjaBIs/maxresdefault.jpg',
  },
  {
    videoId: '76lDopB_nqE',
    title: 'Caught in 4K',
    note: 'Personal Concept, UGC Spec',
    ratio: '9/16',
    thumbnail: 'https://img.youtube.com/vi/76lDopB_nqE/maxresdefault.jpg',
  },
  {
    videoId: 'Z-ySeKjqCN0',
    title: 'Sink Right In',
    note: 'Utopia Brands, Bolster Pillow, Product Ad',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/Z-ySeKjqCN0/maxresdefault.jpg',
  },
  {
    videoId: '8JDTQelI0m0',
    title: 'Small Hands, Sorted',
    note: 'Utopia Brands, Kids Hanger, Product Ad',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/8JDTQelI0m0/maxresdefault.jpg',
  },
]

/**
 * Beyond the Reel video collection — 6 videos for /work/more (Page 2).
 */
export const secondWorkVideos: VideoItem[] = [
  {
    videoId: 'wYXxiaZo7a4',
    title: 'Fluff It Back to Life',
    note: 'Utopia Brands, Poly Fill Stuffing, Product Ad',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/wYXxiaZo7a4/maxresdefault.jpg',
  },
  {
    videoId: 'b4bAVeL8wm8',
    title: 'Spills Meet Their Match',
    note: 'Utopia Brands, Kitchen Bar Mops, UGC',
    ratio: '9/16',
    thumbnail: 'https://img.youtube.com/vi/b4bAVeL8wm8/maxresdefault.jpg',
  },
  {
    videoId: 'bfF8fyJ__XY',
    title: 'Never Getting Up Again',
    note: 'Utopia Brands, Sherpa Blanket, UGC',
    ratio: '9/16',
    thumbnail: 'https://img.youtube.com/vi/bfF8fyJ__XY/maxresdefault.jpg',
  },
  {
    videoId: '3GHx-cw7EOY',
    title: 'Karachi in June',
    note: 'Personal Concept, 3D Animation',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/3GHx-cw7EOY/maxresdefault.jpg',
  },
  {
    videoId: 'Oy5xxVmnCDA',
    title: 'The Beautiful Game, On Paper',
    note: 'Spec Concept, Paper Stop Motion',
    ratio: '16/9',
    thumbnail: 'https://img.youtube.com/vi/Oy5xxVmnCDA/maxresdefault.jpg',
  },
  {
    videoId: 'Mhh63ur6xL8',
    title: 'Made to Move',
    note: 'Utopia Brands, Athletic Shorts, Fashion UGC',
    ratio: '9/16',
    thumbnail: 'https://img.youtube.com/vi/Mhh63ur6xL8/maxresdefault.jpg',
  },
]

export const videos = mainWorkVideos
