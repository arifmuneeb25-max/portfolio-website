import type { ReactNode } from 'react'
import type { VideoItem } from '../data/workData'

/** True for portrait ratios such as '9/16' or '4/5'. */
function isVertical(v: VideoItem) {
  const [w, h] = v.ratio.split('/').map(Number)
  return h > w
}

/**
 * Layout for one Work section, filled in list order (left to right). Every
 * box of the same format is the same size, in every section and on both
 * Work pages:
 *
 * 1. Horizontal grid: every 16:9 film, 2 across at 640px+, 1 across below.
 *    With an odd count the last film keeps the same size and is centred.
 * 2. Vertical row: every 9:16 film, 3 across at 640px+. Below 640px it is a
 *    swipeable row (the next tile peeks in), so there is never a lone tile on
 *    a phone. A short last row is centred at the same size.
 *
 * 16:9 films sit on top and 9:16 films below.
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
  let n = 0

  return (
    <div>
      {wide.length > 0 && (
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 sm:gap-x-6">
          {wide.map((v, k) => (
            <div
              key={v.videoId}
              className={
                wide.length % 2 === 1 && k === wide.length - 1
                  ? 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)]'
                  : ''
              }
            >
              {renderTile(v, n++)}
            </div>
          ))}
        </div>
      )}

      {tall.length > 0 && (
        <div className="-mx-2 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:-mx-3 sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {tall.map((v) => (
            <div key={v.videoId} className="w-[64%] shrink-0 snap-start px-2 sm:w-1/3 sm:px-3">
              {renderTile(v, n++)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
