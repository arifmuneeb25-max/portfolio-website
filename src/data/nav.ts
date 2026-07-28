export type NavItem = {
  label: string
  href: string
}

/**
 * Secondary nav list (Work → Contact) used by the footer. Order is deliberate:
 * Work leads (the exhibition), Contact closes.
 */
export const nav: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/**
 * Primary nav list used by the shared sticky top nav — Home first, then the
 * rest. Single source of truth for the nav links; edit here, never in the
 * component.
 */
export const mainNav: NavItem[] = [{ label: 'Home', href: '/' }, ...nav]
