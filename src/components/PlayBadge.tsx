/**
 * Play mark shown on every video tile (Home and Work, 16:9 and 9:16 alike).
 * Restrained but readable over ANY thumbnail: a dark scrim disc gives the light
 * icon contrast on bright frames, while the pale rim keeps it visible on dark
 * ones. Warms to gold on hover. Styling lives in `.play-badge` in index.css so
 * every tile stays identical.
 */
export default function PlayBadge() {
  return (
    <span className="play-badge">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  )
}
