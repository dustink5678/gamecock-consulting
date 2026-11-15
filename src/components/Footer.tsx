import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TransitionLink } from '../lib/transition'
import { asset } from '../lib/asset'
import { navLinks } from './Nav'
import Magnetic from './Magnetic'

const email = 'gamecockconsulting@gmail.com'

const sponsorLogos = [
  'mckinsey',
  'bain',
  'bcg-mono',
  'deloitte',
  'ey',
  'pwc',
  'kpmg',
  'google',
  'capgemini',
  'boeing',
  'hsbc',
  'goldman',
  'jpmorgan',
  'accenture',
  'oliverwyman',
  'kearney',
].map((file) => asset(`logos/${file}.svg`))

type Circle = {
  lines: string[]
  href: string
  overlay: string
  image?: string
  focus?: string
  logos?: string[]
}

const circles: Circle[] = [
  {
    lines: ['Start an', 'engagement'],
    href: `mailto:${email}?subject=${encodeURIComponent('Start an engagement')}`,
    image: asset('images/engagements/google-team-photo.jpg'),
    focus: '50% 30%',
    overlay: 'rgba(90, 0, 8, 0.84)',
  },
  {
    lines: ['Donate'],
    href: `mailto:${email}?subject=${encodeURIComponent('Donate')}`,
    image: asset('images/competitions/darla-moore-summit.jpg'),
    focus: '50% 40%',
    overlay: 'rgba(115, 0, 10, 0.82)',
  },
  {
    lines: ['Send a team', 'abroad'],
    href: `mailto:${email}?subject=${encodeURIComponent('Help Send a Team International')}`,
    image: asset('images/competitions/nhh-1st.jpg'),
    focus: '50% 28%',
    overlay: 'rgba(140, 15, 30, 0.8)',
  },
  {
    lines: ['Host a', 'competition'],
    href: `mailto:${email}?subject=${encodeURIComponent('Become a Case Competition Host Company')}`,
    image: asset('images/competitions/mscc-group.jpg'),
    focus: '50% 35%',
    overlay: 'rgba(166, 25, 46, 0.78)',
  },
  {
    lines: ['Sponsor a', 'case book'],
    href: `mailto:${email}?subject=${encodeURIComponent('Sponsor a Case Book')}`,
    logos: sponsorLogos,
    // Lighter wash so the logo mosaic stays readable under the label.
    overlay: 'rgba(115, 0, 10, 0.58)',
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
                    data-cursor-ignore
                    className="relative grid h-[9.25rem] w-[9.25rem] place-items-center overflow-hidden rounded-full px-3 text-center text-paper md:h-44 md:w-44 lg:h-52 lg:w-52 xl:h-56 xl:w-56"
                  >
                    {c.logos ? (
                      <span
                        aria-hidden
                        className="absolute inset-[-12%] grid rotate-[-8deg] grid-cols-4 content-center items-center justify-items-center gap-x-3 gap-y-4 bg-[#ebe6db] p-4"
                      >
                        {c.logos.map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt=""
                            draggable={false}
                            className="h-5 w-full max-w-[2.6rem] object-contain brightness-0 md:h-6 md:max-w-[3rem] lg:h-7"
                          />
                        ))}
                      </span>
                    ) : (
                      <img
                        src={c.image}
                        alt=""
                        aria-hidden
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: c.focus }}
                      />
                    )}
                    <span className="absolute inset-0" style={{ backgroundColor: c.overlay }} />
                    <span className="relative z-10 font-serif text-xl leading-[1.1] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-2xl lg:text-[1.65rem]">
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
