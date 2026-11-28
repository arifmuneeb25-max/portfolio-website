import type { ReactNode } from 'react'
import type { VideoItem } from '../data/workData'

/** True for portrait ratios such as '9/16' or '4/5'. */
function isVertical(v: VideoItem) {
  const [w, h] = v.ratio.split('/').map(Number)
  return h > w
}

/**
 * Layout for one Work section, filled in list order (left to right). No row
 * ever holds a single tile on its own, apart from the lead:
 *
 * 1. Lead: the first 16:9 film runs full width, but only when the 16:9 count
 *    is odd, so the films after it pair up evenly. With an even count there
 *    is no lead and every 16:9 film sits in a pair.
 * 2. Horizontal grid: the other 16:9 films, 2 across at every width (phones too).
 * 3. Vertical row: the 9:16 films. 3 across at 640px+, or 4 across at 1024px+
 *    when the count divides by 4 (so four reels never leave one behind).
 *    Below 640px it is a swipeable row (the next tile peeks in).
 *
 * 16:9 films sit on top and 9:16 films below. Horizontal spacing is set here;
 * vertical spacing comes from each tile's own bottom margin.
 */
export default function WorkVideoGrid({
  items,
  renderTile,
  wideLayout = 'pairs',
}: {
  items: VideoItem[]
  renderTile: (item: VideoItem, index: number) => ReactNode
  /**
   * 'pairs' (default): the rules above. 'leadRow': the first 16:9 film full
   * width and every other 16:9 film in one row below it (3 across from 640px,
   * a swipeable row on phones). Used by Selected Work.
   */
  wideLayout?: 'pairs' | 'leadRow'
}) {
  const wide = items.filter((v) => !isVertical(v))
  const tall = items.filter(isVertical)
  if (wideLayout === 'leadRow') {
    const [first, ...others] = wide
    let k = 0
    return (
      <div>
        {first && <div>{renderTile(first, k++)}</div>}
        {others.length > 0 && (
          <div className="-mx-2 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:-mx-3 sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {others.map((v) => (
              <div key={v.videoId} className="w-[72%] shrink-0 snap-start px-2 sm:w-1/3 sm:px-3">
                {renderTile(v, k++)}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  const hasLead = wide.length % 2 === 1
  const lead = hasLead ? wide[0] : undefined
  const rest = hasLead ? wide.slice(1) : wide
  const tallWidth = tall.length % 4 === 0 ? 'sm:w-1/2 lg:w-1/4' : 'sm:w-1/3'
  let n = 0

  return (
    <div>
      {lead && <div>{renderTile(lead, n++)}</div>}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6">
          {rest.map((v) => (
            <div key={v.videoId}>{renderTile(v, n++)}</div>
          ))}
        </div>
      )}

      {tall.length > 0 && (
        <div className="-mx-2 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:-mx-3 sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {tall.map((v) => (
            <div key={v.videoId} className={`w-[64%] shrink-0 snap-start px-2 sm:px-3 ${tallWidth}`}>
              {renderTile(v, n++)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
