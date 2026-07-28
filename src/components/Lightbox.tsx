import { useCallback, useEffect, useMemo, useRef, useState, type SyntheticEvent } from 'react'

/** Sentinel for a tile whose real video id has not been added yet. */
export const PLACEHOLDER_ID = 'PLACEHOLDER'

/** True only when a real video id is set (not empty, not the placeholder). */
export function isRealVideoId(id?: string): id is string {
  return !!id && id !== PLACEHOLDER_ID
}

export function videoThumb(
  videoId?: string,
  thumbnail?: string | null,
  _ratio?: string,
): string | null {
  if (thumbnail) return thumbnail
  if (!isRealVideoId(videoId)) return null
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
}

export function thumbFallback(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget
  if (!img.src.includes('ytimg.com') && !img.src.includes('youtube.com')) {
    const videoId = img.dataset.videoid
    if (videoId && videoId !== 'PLACEHOLDER' && !img.dataset.ytFallback) {
      img.dataset.ytFallback = 'true'
      img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      return
    }
    img.style.display = 'none'
    return
  }
  const variant = /\/(oardefault|oar2|maxresdefault|sddefault|hq720|hq1|hq2|hq3)\.(jpg|webp)/
  if (variant.test(img.src)) {
    img.src = img.src.replace(variant, '/hqdefault.jpg')
    return
  }
  img.style.display = 'none'
}

export type GallerySlide = {
  type: 'image' | 'video'
  src?: string
  videoId?: string
  ratio?: string
}

export type LightboxItem = {
  title: string
  ratio: string
  /** YouTube id. Empty or PLACEHOLDER opens a "video coming soon" message. */
  videoId?: string
  /** Image lightbox source (for non-video tiles). */
  src?: string | null
  /** Multi-image or mixed gallery list for gallery slider tiles. */
  gallery?: (string | GallerySlide)[]
}
export type LightboxTarget = { type: 'video' | 'image'; item: LightboxItem } | null

export default function Lightbox({
  target,
  onClose,
}: {
  target: LightboxTarget
  onClose: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const scrollPos = useRef<number>(0)

  // Reset slider index and state when target changes
  useEffect(() => {
    if (target) {
      setCurrentIndex(0)
      setIsLoaded(false)
      setIsPlayingVideo(false)
    }
  }, [target])

  const normalizedGallery: GallerySlide[] | null = useMemo(() => {
    if (target?.type === 'image' && target.item.gallery) {
      return target.item.gallery.map((slide) => {
        if (typeof slide === 'string') {
          return { type: 'image', src: slide }
        }
        return slide
      })
    }
    return null
  }, [target])

  const totalFrames = normalizedGallery ? normalizedGallery.length : 0
  const currentSlide = normalizedGallery ? normalizedGallery[currentIndex] : null

  const handleNext = useCallback(() => {
    if (!totalFrames) return
    setIsLoaded(false)
    setIsPlayingVideo(false)
    setCurrentIndex((prev) => (prev < totalFrames - 1 ? prev + 1 : 0))
  }, [totalFrames])

  const handlePrev = useCallback(() => {
    if (!totalFrames) return
    setIsLoaded(false)
    setIsPlayingVideo(false)
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalFrames - 1))
  }, [totalFrames])

  // Preload ONLY current and next image slide
  useEffect(() => {
    if (!normalizedGallery || totalFrames === 0) return
    const nextIdx = (currentIndex + 1) % totalFrames
    const nextSlide = normalizedGallery[nextIdx]
    if (nextSlide && nextSlide.type === 'image' && nextSlide.src) {
      const nextImg = new Image()
      nextImg.src = nextSlide.src
    }
  }, [normalizedGallery, currentIndex, totalFrames])

  // Keyboard navigation & body scroll lock that preserves scroll position
  useEffect(() => {
    if (!target) return
    scrollPos.current = window.scrollY
    const originalStyle = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPlayingVideo(false)
        onClose()
      } else if (normalizedGallery && totalFrames > 1) {
        if (e.key === 'ArrowLeft') handlePrev()
        else if (e.key === 'ArrowRight') handleNext()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = originalStyle
      window.scrollTo(0, scrollPos.current)
    }
  }, [target, onClose, normalizedGallery, totalFrames, handleNext, handlePrev])

  if (!target) return null
  const { type, item } = target

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    touchStartX.current = null
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-[100vh] min-h-[100dvh] h-[100dvh] flex-col items-center justify-center p-2 sm:p-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
      style={{ background: 'rgba(8,12,24,0.94)' }}
      onClick={() => {
        setIsPlayingVideo(false)
        onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Top Bar: Counter & Close Button (44px min hit targets, safe area clear) */}
      <div className="absolute top-3 inset-x-4 z-[120] flex items-center justify-between px-2 sm:top-5 sm:px-6 pointer-events-none">
        {normalizedGallery && totalFrames > 1 ? (
          <span className="pointer-events-auto rounded-full bg-black/60 border border-white/10 px-3.5 py-1.5 text-[12px] font-medium tracking-widest text-cream/90 backdrop-blur-md">
            {currentIndex + 1} / {totalFrames}
          </span>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsPlayingVideo(false)
            onClose()
          }}
          aria-label="Close"
          className="pointer-events-auto flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-black/60 text-cream/90 backdrop-blur-md border border-white/15 transition-all duration-200 hover:border-gold/60 hover:text-gold active:scale-95 shadow-lg"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Fixed Stage Container */}
      <div
        className="relative flex h-[80dvh] max-h-[850px] w-[min(92vw,920px)] items-center justify-center overflow-hidden rounded-xl bg-[#0a0f1d]/50 backdrop-blur-sm border border-white/5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={normalizedGallery && totalFrames > 1 ? handleTouchStart : undefined}
        onTouchEnd={normalizedGallery && totalFrames > 1 ? handleTouchEnd : undefined}
      >
        {/* Media content */}
        {type === 'video' ? (
          isRealVideoId(item.videoId) ? (
            <iframe
              className="h-full w-full rounded-lg"
              src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              title={item.title}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg bg-placeholder text-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-cream/40" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-[12px] uppercase tracking-[0.2em] text-muted">
                Video coming soon
              </span>
            </div>
          )
        ) : currentSlide ? (
          currentSlide.type === 'video' && currentSlide.videoId ? (
            isPlayingVideo ? (
              <iframe
                key={`slide-video-${currentSlide.videoId}`}
                className="h-full w-full rounded-lg"
                src={`https://www.youtube-nocookie.com/embed/${currentSlide.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                title={`${item.title} - Video Slide ${currentIndex + 1}`}
              />
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPlayingVideo(true)
                }}
                className="group relative z-30 flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black text-left cursor-pointer focus:outline-none"
                aria-label={`Play ${item.title} video`}
              >
                <img
                  src={`https://img.youtube.com/vi/${currentSlide.videoId}/hqdefault.jpg`}
                  alt={`${item.title} - Video Poster`}
                  onError={thumbFallback}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/45" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-black/50 text-gold backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-gold group-hover:bg-black/70 sm:h-20 sm:w-20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="rounded-full bg-black/60 border border-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream/90 backdrop-blur-md transition-colors duration-300 group-hover:border-gold/50 group-hover:text-gold">
                    Watch the film
                  </span>
                </div>
              </button>
            )
          ) : (
            <div className="relative flex h-full w-full items-center justify-center p-2">
              <img
                key={`slide-img-${currentSlide.src || currentIndex}`}
                src={currentSlide.src}
                alt={`${item.title} - Frame ${currentIndex + 1}`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`max-h-full max-w-full object-contain rounded-lg transition-opacity duration-300 ease-out select-none ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )
        ) : item.src ? (
          <div className="relative flex h-full w-full items-center justify-center p-2">
            <img
              src={item.src}
              alt={item.title}
              className="max-h-full max-w-full object-contain rounded-lg select-none"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-placeholder text-[11px] uppercase tracking-[0.25em] text-cream/30">
            {item.title}
          </div>
        )}

        {/* Tap / Click to Advance overlays (Left & Right halves) */}
        {normalizedGallery && totalFrames > 1 && currentSlide?.type !== 'video' && (
          <div className="absolute inset-0 z-20 flex" aria-hidden="true">
            <div
              className="h-full w-1/2 cursor-pointer"
              title="Previous image"
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
            />
            <div
              className="h-full w-1/2 cursor-pointer"
              title="Next image"
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
            />
          </div>
        )}

        {/* Navigation Arrows — 44px min hit target, responsive positioning */}
        {normalizedGallery && totalFrames > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              aria-label="Previous frame"
              className="absolute left-3 bottom-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-30 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-black/60 text-cream/90 backdrop-blur-md border border-white/15 transition duration-200 hover:border-gold/60 hover:text-gold active:scale-95 shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              aria-label="Next frame"
              className="absolute right-3 bottom-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-30 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-black/60 text-cream/90 backdrop-blur-md border border-white/15 transition duration-200 hover:border-gold/60 hover:text-gold active:scale-95 shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
