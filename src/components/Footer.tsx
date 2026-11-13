import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TransitionLink } from '../lib/transition'
import { navLinks } from './Nav'
import Magnetic from './Magnetic'

const email = 'gamecockconsulting@gmail.com'

const circles = [
  {
    lines: ['Start an', 'engagement'],
    href: `mailto:${email}?subject=${encodeURIComponent('Start an engagement')}`,
    bg: '#5a0008',
    fg: '#f4f1ea',
  },
  {
    lines: ['Donate'],
    href: `mailto:${email}?subject=${encodeURIComponent('Donate')}`,
    bg: '#73000a',
    fg: '#f4f1ea',
  },
  {
    lines: ['Send a team', 'abroad'],
    href: `mailto:${email}?subject=${encodeURIComponent('Help Send a Team International')}`,
    bg: '#a6192e',
    fg: '#f4f1ea',
  },
  {
    lines: ['Host a', 'competition'],
    href: `mailto:${email}?subject=${encodeURIComponent('Become a Case Competition Host Company')}`,
    bg: '#c45a68',
    fg: '#f4f1ea',
  },
  {
    lines: ['Sponsor a', 'case book'],
    href: `mailto:${email}?subject=${encodeURIComponent('Sponsor a Case Book')}`,
    bg: '#e0a8af',
    fg: '#0b0d10',
  },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '0%'])

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <motion.div style={{ y }} className="mx-auto max-w-[1600px] px-6 pb-10 pt-32 md:px-10">
        <p className="label text-stone">Have a problem worth solving?</p>
        <h2 className="mt-6 font-serif text-[13vw] leading-[0.9] tracking-tight md:text-[9vw]">
          Let&rsquo;s <span className="italic text-garnet-bright">talk.</span>
        </h2>

        <div className="-mx-6 mt-14 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:mt-16 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max items-center gap-5 md:w-full md:justify-between md:gap-0">
            {circles.map((c) => (
              <li key={c.href} className="shrink-0">
                <Magnetic strength={0.22}>
                  <a
                    href={c.href}
                    data-cursor="Email"
                    className="relative grid h-[9.25rem] w-[9.25rem] place-items-center rounded-full px-4 text-center md:h-44 md:w-44 lg:h-52 lg:w-52 xl:h-56 xl:w-56"
                    style={{ backgroundColor: c.bg, color: c.fg }}
                  >
                    <span className="font-serif text-[15px] leading-[1.2] tracking-tight md:text-base lg:text-lg">
                      {c.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 grid gap-10 border-t border-white/10 pt-10 text-sm md:grid-cols-4">
          <div>
            <p className="label mb-4 text-stone">Club</p>
            <p>Gamecock Consulting Club</p>
            <p className="text-paper/60">University of South Carolina</p>
          </div>
          <div>
            <p className="label mb-4 text-stone">Visit</p>
            <p>1014 Greene St</p>
            <p className="text-paper/60">Columbia, SC 29208</p>
          </div>
          <div>
            <p className="label mb-4 text-stone">Explore</p>
            {navLinks.map((l) => (
              <TransitionLink key={l.to} to={l.to} label={l.label} className="block hover:text-garnet-bright">
                {l.label}
              </TransitionLink>
            ))}
          </div>
          <div>
            <p className="label mb-4 text-stone">Contact</p>
            <a href={`mailto:${email}`} className="hover:text-garnet-bright">
              {email}
            </a>
          </div>
        </div>
        <div className="label mt-16 flex justify-between text-stone">
          <span>© {new Date().getFullYear()} Gamecock Consulting Club</span>
          <span>Columbia, SC</span>
        </div>
      </motion.div>
    </footer>
  )
}
