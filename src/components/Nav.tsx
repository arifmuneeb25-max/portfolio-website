import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { mainNav } from '../data/nav'

const HAIRLINE = '0.5px solid var(--hairline-strong)'

/**
 * Shared, persistent top navigation. Rendered once (above the router) so it
 * stays mounted across pages and sticks to the top on scroll. Wordmark left,
 * links right; current page's link is highlighted gold. Collapses to a
 * hamburger + full-screen overlay below the md breakpoint.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
      isActive ? 'text-gold' : 'text-muted hover:text-gold'
    }`

  const mobileLink = ({ isActive }: { isActive: boolean }) =>
    `text-lg uppercase tracking-[0.18em] transition-colors duration-300 min-h-[44px] flex items-center ${
      isActive ? 'text-gold font-medium' : 'text-muted hover:text-gold'
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

        {/* Mobile hamburger button — 44px x 44px min hit area. */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded text-heading md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile overlay. */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-surface pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            className="site-container flex h-16 items-center justify-between"
            style={{ borderBottom: HAIRLINE }}
          >
            <span className="text-[14px] font-medium tracking-[0.28em] text-heading">
              MUNEEB ARIF
            </span>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="site-container py-10 flex-1 overflow-y-auto">
            <ul className="flex flex-col gap-4">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={mobileLink}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
