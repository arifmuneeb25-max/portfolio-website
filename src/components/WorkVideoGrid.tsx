import type { ReactNode } from 'react'
import type { VideoItem } from '../data/workData'

/** True for portrait ratios such as '9/16' or '4/5'. */
function isVertical(v: VideoItem) {
  const [w, h] = v.ratio.split('/').map(Number)
  return h > w
}

/**
 * Gap-free layout for one Work section, filled in list order (left to right):
 *
 * 1. Lead: the first horizontal film, full width.
 * 2. Vertical row: every vertical film at one shared height. Below 640px it
 *    is a swipeable row (the next tile peeks in), so there is never a lone
 *    tile on a phone. At 640px+ it wraps 3 across (4 across when the count
 *    divides by 4); a short last row is centred, never left ragged.
 * 3. Horizontal grid: the remaining horizontal films, 2 across at 640px+. If
 *    the count is odd the last one runs full width, so no row has a hole.
 *
 * Horizontal spacing is set here; vertical spacing comes from each tile's own
 * bottom margin, so every row sits the same distance apart.
 */
export default function WorkVideoGrid({
  items,
  renderTile,
}: {
  items: VideoItem[]
  renderTile: (item: VideoItem, index: number) => ReactNode
}) {
  const wide = items.filter((v) => !isVertical(v))
  const tall = items.filter(isVertical)
  const [lead, ...restWide] = wide
  let n = 0

  return (
    <div>
      {lead && <div>{renderTile(lead, n++)}</div>}

      {tall.length > 0 && (
        <div className="-mx-2 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:-mx-3 sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {tall.map((v) => (
            <div
              key={v.videoId}
              className={`w-[64%] shrink-0 snap-start px-2 sm:px-3 ${
                tall.length % 4 === 0 ? 'sm:w-1/2 lg:w-1/4' : 'sm:w-1/3'
              }`}
            >
              {renderTile(v, n++)}
            </div>
          ))}
        </div>
      )}

      {restWide.length > 0 && (
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 sm:gap-x-6">
          {restWide.map((v, k) => (
            <div
              key={v.videoId}
              className={
                restWide.length % 2 === 1 && k === restWide.length - 1 ? 'sm:col-span-2' : ''
              }
            >
              {renderTile(v, n++)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
