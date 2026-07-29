import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Lightbox, { videoThumb, thumbFallback, type LightboxTarget } from '../components/Lightbox'
import { sharedImages, secondWorkVideos, type VideoItem, type ImageItem } from '../data/workData'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type View = 'video' | 'image'

function PlayIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function Tile({
  item,
  type,
  index,
  onOpen,
}: {
  item: VideoItem | ImageItem
  type: View
  index: number
  onOpen: (t: LightboxTarget) => void
}) {
  const imageItem = type === 'image' ? (item as ImageItem) : null
  const videoItem = type === 'video' ? (item as VideoItem) : null
  const videoThumbSrc = videoItem
    ? videoThumb(videoItem.videoId, videoItem.thumbnail, videoItem.ratio)
    : null

  const gallery = imageItem?.gallery
  const galleryCount = gallery ? gallery.length : 0
  const hasGallery = galleryCount > 0
  const hasVideoInGallery =
    imageItem?.hasVideo ||
    (gallery &&
      gallery.some(
        (s) => typeof s !== 'string' && s.type === 'video'
      ))

  return (
    <button
      type="button"
      onClick={() => onOpen({ type, item })}
      aria-label={`Open ${item.title}`}
      className="work-reveal group mb-6 block w-full break-inside-avoid text-left active:opacity-90 sm:mb-8 focus-visible:outline-none"
      style={{ transitionDelay: `${Math.min(index * 0.05, 0.3)}s` } as CSSProperties}
    >
      <div className="relative w-full">
        {hasGallery && (
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-white/5 bg-[var(--tile-stack-far)] opacity-70 transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:translate-y-4"
            style={{ aspectRatio: item.ratio } as CSSProperties}
          />
        )}

        {hasGallery && (
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl border border-white/10 bg-[var(--tile-stack-near)] opacity-85 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2"
            style={{ aspectRatio: item.ratio } as CSSProperties}
          />
        )}

        <div
          className="tile-card relative z-10 overflow-hidden rounded-xl bg-placeholder transition duration-300 ease-out group-hover:-translate-y-[3px]"
          style={{ aspectRatio: item.ratio } as CSSProperties}
        >
          {type === 'video' ? (
            <>
              {videoThumbSrc && (
                <img
                  src={videoThumbSrc}
                  alt={item.title}
                  data-videoid={videoItem?.videoId}
                  loading="lazy"
                  decoding="async"
                  onError={thumbFallback}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-mist/50 bg-black/30 backdrop-blur-[2px] text-cream/70 transition duration-300 group-hover:border-gold/80 group-hover:bg-black/50 group-hover:text-gold sm:h-14 sm:w-14">
                  <PlayIcon />
                </span>
              </div>
              {!videoThumbSrc && (
                <div className="absolute inset-0 flex items-center justify-center pt-16">
                  <span className="px-3 text-center text-[11px] uppercase tracking-[0.25em] text-cream/25">
                    {item.title}
                  </span>
                </div>
              )}
            </>
          ) : imageItem?.src ? (
            <>
              <img
                src={imageItem.src}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gallery Count Badge (Top-Right Pill) — stays visible on touch */}
              {hasGallery && (
                <div
                  aria-label={`${galleryCount} slides in gallery`}
                  className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 rounded-full bg-[rgba(var(--surface-rgb),0.85)] border border-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gold shadow-md backdrop-blur-md"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="7" y="7" width="14" height="14" rx="2" />
                    <path d="M3 17V6a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span>{galleryCount}</span>
                </div>
              )}

              {hasVideoInGallery && (
                <div
                  aria-label="Gallery contains video"
                  className="absolute bottom-3 left-3 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-gold shadow-md"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}

              {hasGallery && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-20 hidden items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none [@media(hover:hover)]:flex"
                >
                  <span className="rounded-full bg-[rgba(var(--surface-rgb),0.9)] border border-gold/30 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-cream shadow-lg">
                    View {galleryCount} items
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-3 text-center text-[11px] uppercase tracking-[0.25em] text-cream/25">
                {item.title}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3.5 block w-full text-left">
        <p className="font-medium text-cream m-0 p-0 block text-base sm:text-lg leading-snug tracking-normal transition-colors duration-300 group-hover:text-gold">{item.title}</p>
        <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-gold leading-normal m-0 p-0 block">{item.note}</p>
      </div>
    </button>
  )
}

export default function MoreWork() {
  const [view, setView] = useState<View>('video')
  const [lightbox, setLightbox] = useState<LightboxTarget>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const tiles = Array.from(grid.querySelectorAll<HTMLElement>('.work-reveal'))
    if (prefersReducedMotion()) {
      tiles.forEach((t) => t.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 },
    )
    tiles.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [view])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const items: (VideoItem | ImageItem)[] = view === 'video' ? secondWorkVideos : sharedImages

  return (
    <main className="min-h-screen overflow-x-hidden bg-surface text-heading">
      <div className="site-container max-w-6xl py-12 sm:py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold sm:text-[12px]">
          {view === 'video' ? 'Beyond the Reel' : 'Design Work'}
        </p>
        <p className="mt-3 text-[18px] text-heading sm:mt-4 sm:text-[20px]">
          {view === 'video'
            ? 'Spec ads, concept films, and pieces I made because I wanted to see them exist.'
            : 'Posters, key art, and social design for brands.'}
        </p>

        {/* VIDEO / IMAGES toggle */}
        <div
          className="mt-6 inline-flex rounded-full border p-1 sm:mt-8"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          role="tablist"
          aria-label="Filter work archive"
        >
          {(['video', 'image'] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`min-h-[44px] min-w-[80px] rounded-full px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 sm:px-5 sm:py-1.5 flex items-center justify-center ${
                view === v ? 'bg-gold text-surface font-medium' : 'text-muted hover:text-cream'
              }`}
            >
              {v === 'video' ? 'Video' : 'Images'}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div
          key={view}
          ref={gridRef}
          className="mt-8 columns-1 gap-4 sm:mt-10 sm:columns-2 lg:columns-3"
        >
          {items.map((item, i) => (
            <Tile key={`${item.title}-${i}`} item={item} type={view} index={i} onOpen={setLightbox} />
          ))}
        </div>

        {/* Back to main work link — single link at bottom for video view */}
        {view === 'video' && (
          <div className="mt-16 flex justify-center">
            <Link
              to="/work"
              className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] tracking-[0.04em] text-cream transition-colors duration-300 hover:text-gold"
            >
              <span
                aria-hidden="true"
                className="text-gold transition-transform duration-[250ms] ease-out group-hover:-translate-x-1.5"
              >
                ←
              </span>
              Back to main work
            </Link>
          </div>
        )}
      </div>

      <Footer />

      <Lightbox target={lightbox} onClose={closeLightbox} />
    </main>
  )
}
