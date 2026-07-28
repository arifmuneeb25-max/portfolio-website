import { Link } from 'react-router-dom'
import { mainNav } from '../data/nav'

/**
 * The footer strip beneath the closing CTA — name and role line, then a row
 * with the nav repeat on the left and the LinkedIn link on the right.
 * Stacks to 1 column below 640px, with 44px x 44px social tap targets and safe area insets.
 */
export default function Footer() {
  return (
    <footer className="border-t border-mist/40 bg-ink py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
      <div className="site-container max-w-7xl text-cream/45">
        <div className="mb-8">
          <p className="text-base font-medium text-cream/70">Muneeb Arif</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">
            Creative Director · AI Filmmaker · Visual Storyteller
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Nav repeat. */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.15em] sm:gap-8">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="inline-flex min-h-[36px] items-center transition-colors duration-300 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links — 44px x 44px hit areas. */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/muneeb-arif-064718251"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Muneeb Arif on LinkedIn"
              className="footer-social"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.5H5.67v9h2.67v-9zM7 5.75a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.34 13.4c0-2.3-1.23-3.37-2.87-3.37-1.32 0-1.91.73-2.24 1.24V9.5h-2.67v9h2.67v-4.86c0-1.28.24-2.52 1.83-2.52 1.56 0 1.58 1.46 1.58 2.6v4.78h2.67v-5.7z" />
              </svg>
            </a>
            <a
              href="https://wa.me/923360348883"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="footer-social"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.6-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.14.19 2.01 3.07 4.88 4.31.68.29 1.21.47 1.63.6.68.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.98 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.43 9.44zM20.52 3.49A11.78 11.78 0 0 0 12.04.01C5.5.01.18 5.33.18 11.87c0 2.09.55 4.13 1.59 5.93L.08 24l6.33-1.66a11.85 11.85 0 0 0 5.63 1.43h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-cream/30">
          © {new Date().getFullYear()} Muneeb Arif
        </p>
      </div>
    </footer>
  )
}
