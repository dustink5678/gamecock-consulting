import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { engagements } from '../data/engagements'
import { TransitionLink } from '../lib/transition'
import { easeInOut, easeOut } from '../lib/motion'

export const navLinks = [
  { to: '/engagements', label: 'Engagements' },
  { to: '/case-competitions', label: 'Case Competitions' },
  { to: '/member-development', label: 'Member Development' },
]

export default function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const lenis = useLenis()
  const onEngagements = location.pathname.startsWith('/engagements')
  const activeSlug =
    engagements.find((e) => location.pathname.includes(`/engagements/${e.slug}`))?.slug ??
    (onEngagements ? 'google' : null)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  useEffect(() => setOpen(false), [location.pathname])

  const selectEngagement = (slug: string) => {
    if (activeSlug === slug) return
    navigate(`/engagements/${slug}`)
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 h-20 backdrop-blur-md transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] ${
          scrolled && !open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <header className="fixed inset-x-0 top-0 z-50 text-paper mix-blend-difference">
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-[padding] duration-500 ease-out md:px-10 ${
            scrolled ? 'py-3' : 'py-5'
          }`}
        >
          <TransitionLink to="/" label="Gamecock Consulting" className="group flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-[6px] border border-current font-serif text-lg italic transition-transform duration-500 group-hover:rotate-[-8deg]">
              G
            </span>
            <span className="text-sm font-medium tracking-tight">
              Gamecock <span className="font-serif text-base italic">Consulting</span>
            </span>
          </TransitionLink>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((l) => {
              const active = location.pathname.startsWith(l.to)
              const isEngagementsLink = l.to === '/engagements'
              return (
                <div key={l.to} className="flex items-center gap-5">
                  <TransitionLink
                    to={l.to}
                    label={l.label}
                    className="group relative font-serif text-sm leading-none tracking-tight"
                  >
                    {l.label}
                    <span
                      className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-current transition-transform duration-500 ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </TransitionLink>
                  {isEngagementsLink && onEngagements && (
                    <div className="flex items-center gap-4 border-l border-current/25 pl-5">
                      {engagements.map((eng) => {
                        const isActive = eng.slug === activeSlug
                        return (
                          <button
                            key={eng.slug}
                            type="button"
                            onClick={() => selectEngagement(eng.slug)}
                            data-cursor-ignore
                            className="group relative pb-0.5"
                            aria-current={isActive ? 'page' : undefined}
                          >
                            <span
                              className={`font-serif text-sm leading-none tracking-tight transition-opacity duration-300 ${
                                isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-75'
                              }`}
                            >
                              {eng.clientShort}
                            </span>
                            <span
                              className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-current transition-transform duration-500 ${
                                isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                              }`}
                            />
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
            <a
              href="mailto:gamecockconsulting@gmail.com"
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full border border-current px-5 font-serif text-sm leading-none tracking-tight transition-colors hover:bg-paper hover:text-ink"
            >
              Partner with us
            </a>
          </nav>

          <button
            className="label relative z-[60] md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-garnet px-6 pb-16 text-paper md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: easeInOut }}
          >
            {[{ to: '/', label: 'Home' }, ...navLinks].map((l, i) => (
              <div key={l.to} className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.07, ease: easeOut }}
                >
                  <TransitionLink to={l.to} label={l.label} className="block py-1 font-serif text-5xl">
                    {l.label}
                  </TransitionLink>
                </motion.div>
              </div>
            ))}
            {onEngagements && (
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-paper/20 pt-6">
                {engagements.map((eng) => {
                  const isActive = eng.slug === activeSlug
                  return (
                    <button
                      key={eng.slug}
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        selectEngagement(eng.slug)
                      }}
                      className={`font-serif text-2xl ${isActive ? 'text-paper' : 'text-paper/50'}`}
                    >
                      {eng.clientShort}
                    </button>
                  )
                })}
              </div>
            )}
            <a href="mailto:gamecockconsulting@gmail.com" className="label mt-10 opacity-70">
              gamecockconsulting@gmail.com
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
