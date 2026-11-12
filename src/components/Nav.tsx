import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  useEffect(() => setOpen(false), [location.pathname])

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
              return (
                <TransitionLink key={l.to} to={l.to} label={l.label} className="group relative text-sm">
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </TransitionLink>
              )
            })}
            <a
              href="mailto:gamecockconsulting@gmail.com"
              className="rounded-full border border-current px-5 py-2 text-sm transition-colors hover:bg-paper hover:text-ink"
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
            <a href="mailto:gamecockconsulting@gmail.com" className="label mt-10 opacity-70">
              gamecockconsulting@gmail.com
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
