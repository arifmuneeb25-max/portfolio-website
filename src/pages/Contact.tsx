import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowRight, ChevronDown, Linkedin } from 'lucide-react'
import Footer from '../components/Footer'
import { services } from '../data/services'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MailIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)
const WhatsAppIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.6-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.14.19 2.01 3.07 4.88 4.31.68.29 1.21.47 1.63.6.68.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.98 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.43 9.44zM20.52 3.49A11.78 11.78 0 0 0 12.04.01C5.5.01.18 5.33.18 11.87c0 2.09.55 4.13 1.59 5.93L.08 24l6.33-1.66a11.85 11.85 0 0 0 5.63 1.43h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42z" />
  </svg>
)
const PinIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 4.5-8 12-8 12s-8-7.5-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-gold">{icon}</span>
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{label}</p>
        <div className="mt-1 text-[15px] text-heading">{children}</div>
      </div>
    </div>
  )
}

type Field = 'name' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>

export default function Contact() {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    if (prefersReducedMotion()) {
      setRevealed(true)
      return
    }
    const id = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const set =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }))

  const validate = (): Errors => {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Please enter a valid email address.'
    if (!values.message.trim()) next.message = 'Please add a short message.'
    return next
  }

  const handleSubmit = () => {
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setSent(false)
      return
    }
    setSent(true)
    setValues({ name: '', email: '', phone: '', service: '', message: '' })
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-surface text-heading">
      <div className={`site-container max-w-6xl py-16 sm:py-20 md:py-28 ${revealed ? 'is-revealed' : ''}`}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          {/* LEFT — invitation + direct details. */}
          <div className="reveal-body">
            <p className="text-[12px] uppercase tracking-[0.28em] text-muted">Contact</p>
            <h1 className="mt-4 max-w-[18ch] text-[clamp(26px,5vw,36px)] font-medium leading-[1.15] text-heading">
              Have a story worth telling? <span className="text-gold">Let's make it.</span>
            </h1>
            <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.6] text-body sm:mt-5">
              Whether it is a brand film, a campaign, or just an idea you are chasing, tell me
              a little about it and I will get back to you personally.
            </p>

            <div className="mt-8 space-y-6 sm:mt-10">
              <DetailRow icon={MailIcon} label="Email">
                <a
                  href="mailto:arifmuneeb25@gmail.com"
                  className="transition-colors duration-300 hover:text-gold min-h-[44px] flex items-center"
                >
                  arifmuneeb25@gmail.com
                </a>
              </DetailRow>
              <DetailRow icon={WhatsAppIcon} label="WhatsApp">
                <a
                  href="https://wa.me/923360348883"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-gold min-h-[44px] flex items-center"
                >
                  +92 336 0348883
                </a>
              </DetailRow>
              <DetailRow icon={PinIcon} label="Based in">
                Karachi, Pakistan. Available worldwide.
              </DetailRow>
            </div>

            <a
              href="https://www.linkedin.com/in/muneeb-arif-064718251"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn mt-8 text-sm font-medium w-full sm:w-auto"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              LinkedIn
            </a>
          </div>

          {/* RIGHT — minimal form. */}
          <div className="reveal-body" style={{ transitionDelay: '0.12s' } as CSSProperties}>
            <div className="space-y-6 sm:space-y-7">
              <div>
                <label htmlFor="c-name" className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                  Name
                </label>
                <input
                  id="c-name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={set('name')}
                  aria-invalid={!!errors.name}
                  className="contact-input mt-1.5 text-base"
                />
                {errors.name && (
                  <p role="alert" className="mt-2 text-[13px]" style={{ color: 'var(--error)' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="c-email" className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={set('email')}
                  aria-invalid={!!errors.email}
                  className="contact-input mt-1.5 text-base"
                />
                {errors.email && (
                  <p role="alert" className="mt-2 text-[13px]" style={{ color: 'var(--error)' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="c-phone" className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                  Phone
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={set('phone')}
                  className="contact-input mt-1.5 text-base"
                />
              </div>

              <div>
                <label htmlFor="c-service" className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                  Service
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="c-service"
                    required
                    value={values.service}
                    onChange={set('service')}
                    className="contact-input contact-select text-base"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.index} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="c-message" className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={4}
                  value={values.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  className="contact-input mt-1.5 resize-none text-base leading-[1.6]"
                />
                {errors.message && (
                  <p role="alert" className="mt-2 text-[13px]" style={{ color: 'var(--error)' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="cta-btn w-full justify-center text-sm font-medium min-h-[48px]"
              >
                Send message
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>

              {sent && (
                <p role="status" className="text-[14px] text-gold">
                  Thanks, I will get back to you soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
