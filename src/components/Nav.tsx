import { Link, NavLink } from 'react-router-dom'
import { mainNav } from '../data/nav'

const HAIRLINE = '0.5px solid var(--hairline-strong)'

/**
 * Shared, persistent top navigation. Rendered once (above the router) so it
 * stays mounted across pages and sticks to the top on scroll. Wordmark left;
 * the current page is highlighted gold.
 *
 * md and up: text links on the right of the wordmark row.
 * Below md: a second row of button tabs under the wordmark, so every page is
 * visible the moment the site opens (no hidden menu). Each tab has a 44px
 * tall hit area around a 32px pill. Total height on phones is 116px; keep
 * Hero's mobile height and the Work sections' scroll margin in step with it.
 */
export default function Nav() {
  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
      isActive ? 'text-gold' : 'text-muted hover:text-gold'
    }`

  const tabPill = (isActive: boolean) =>
    `flex h-8 items-center rounded-full px-[9px] text-[10px] uppercase tracking-[0.1em] transition-colors duration-300 max-[370px]:px-1.5 max-[370px]:text-[9px] max-[370px]:tracking-[0.06em] ${
      isActive
        ? 'bg-gold font-bold text-surface'
        : 'border border-white/15 text-heading active:border-gold/60'
    }`

  return (
    <header
      className="sticky top-0 z-40 bg-surface pt-[env(safe-area-inset-top)]"
      style={{ borderBottom: HAIRLINE }}
    >
      <div className="site-container flex h-16 items-center justify-between">
        {/* Wordmark — links home. */}
        <Link
          to="/"
          aria-label="Muneeb Arif — home"
          className="text-[14px] font-medium tracking-[0.28em] text-heading transition-colors duration-300 hover:text-gold"
        >
          MUNEEB ARIF
        </Link>

        {/* Desktop links. */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href} end={item.href === '/'} className={desktopLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile button tabs — always visible below md. */}
      <nav
        aria-label="Primary"
        className="site-container flex h-[52px] items-center md:hidden"
        style={{ borderTop: HAIRLINE }}
      >
        <ul className="flex w-full items-center justify-between gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mainNav.map((item) => (
            <li key={item.href} className="shrink-0">
              <NavLink
                to={item.href}
                end={item.href === '/'}
                className="flex h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
              >
                {({ isActive }) => <span className={tabPill(isActive)}>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
