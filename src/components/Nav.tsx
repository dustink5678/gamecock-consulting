import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { engagements } from '../data/engagements'
import { TransitionLink } from '../lib/transition'
import { easeOut } from '../lib/motion'

export const navLinks = [
  { to: '/engagements', label: 'Engagements' },
  { to: '/case-competitions', label: 'Case Competitions' },
  { to: '/member-development', label: 'Member Development' },
]

const contactHref = 'mailto:gamecockconsulting@gmail.com'

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

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.body.style.overflow = prev
      lenis?.start()
    }
  }, [open, lenis])

  const selectEngagement = (slug: string) => {
    setOpen(false)
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
      <header
        className={`fixed inset-x-0 top-0 z-[60] text-paper ${open ? '' : 'mix-blend-difference'}`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 transition-[padding] duration-500 ease-out md:px-10 ${
            scrolled || open ? 'py-3' : 'py-5'
          }`}
        >
          <TransitionLink
            to="/"
            label="Gamecock Consulting"
            className="group flex min-w-0 items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[6px] border border-current font-serif text-lg italic transition-transform duration-500 group-hover:rotate-[-8deg]">
              G
            </span>
            <span className="truncate text-sm font-medium tracking-tight">
              Gamecock <span className="font-serif text-base italic">Consulting</span>
            </span>
          </TransitionLink>

          <nav className="hidden items-center gap-7 lg:flex xl:gap-10">
            {navLinks.map((l) => {
              const active = location.pathname.startsWith(l.to)
              const isEngagementsLink = l.to === '/engagements'
              return (
                <div key={l.to} className="flex items-center gap-4 xl:gap-5">
                  <TransitionLink
                    to={l.to}
                    label={l.label}
                    className="group relative font-serif text-sm leading-none tracking-tight xl:text-lg"
                  >
                    {l.label}
                    <span
                      className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-current transition-transform duration-500 ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </TransitionLink>
                  {isEngagementsLink && (
                    <div
                      className={`items-center gap-3 border-l border-current/25 pl-4 xl:gap-4 xl:pl-5 ${
                        onEngagements ? 'flex' : 'hidden xl:flex'
                      }`}
                    >
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
                              className={`font-serif text-sm leading-none tracking-tight transition-opacity duration-300 xl:text-lg ${
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
              href={contactHref}
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full border border-current px-5 font-serif text-sm leading-none tracking-tight transition-colors hover:bg-paper hover:text-ink xl:h-11 xl:px-6 xl:text-lg"
            >
              Partner with us
            </a>
          </nav>

          <button
            type="button"
            className="relative z-[70] ml-auto shrink-0 rounded-full border border-current px-4 py-2 font-serif text-sm leading-none tracking-tight lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-50 flex flex-col bg-ink text-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <div className="flex flex-1 flex-col overflow-hidden px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-24">
              <nav className="flex flex-1 flex-col justify-center gap-1 overflow-hidden py-2">
                <motion.div
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.05, ease: easeOut }}
                >
                  <TransitionLink
                    to="/"
                    label="Home"
                    className="block py-2 font-serif text-[clamp(2rem,9vw,3.25rem)] leading-none tracking-tight"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </TransitionLink>
                </motion.div>

                <motion.div
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: easeOut }}
                  className="border-t border-white/10 pt-4"
                >
                  <TransitionLink
                    to="/engagements"
                    label="Engagements"
                    className="block py-2 font-serif text-[clamp(2rem,9vw,3.25rem)] leading-none tracking-tight"
                    onClick={() => setOpen(false)}
                  >
                    Engagements
                  </TransitionLink>
                  <div className="mt-3 mb-2 flex flex-col gap-1 border-l border-white/20 pl-5">
                    {engagements.map((eng) => {
                      const isActive = eng.slug === activeSlug
                      return (
                        <button
                          key={eng.slug}
                          type="button"
                          onClick={() => selectEngagement(eng.slug)}
                          className={`py-1.5 text-left font-serif text-[clamp(1.35rem,6vw,2rem)] leading-none tracking-tight transition-opacity ${
                            isActive ? 'opacity-100' : 'opacity-50'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {eng.clientShort}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>

                {navLinks
                  .filter((l) => l.to !== '/engagements')
                  .map((l, i) => (
                    <motion.div
                      key={l.to}
                      initial={{ y: 28, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.55, delay: 0.2 + i * 0.07, ease: easeOut }}
                      className="border-t border-white/10"
                    >
                      <TransitionLink
                        to={l.to}
                        label={l.label}
                        className="block py-3 font-serif text-[clamp(2rem,9vw,3.25rem)] leading-none tracking-tight"
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </TransitionLink>
                    </motion.div>
                  ))}
              </nav>

              <motion.div
                className="shrink-0 border-t border-white/10 pt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.35, ease: easeOut }}
              >
                <a
                  href={contactHref}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-current px-6 font-serif text-lg leading-none tracking-tight"
                  onClick={() => setOpen(false)}
                >
                  Contact us
                </a>
                <a href={contactHref} className="label mt-4 block text-center text-paper/55">
                  gamecockconsulting@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
