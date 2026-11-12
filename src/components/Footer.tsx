import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TransitionLink } from '../lib/transition'
import { navLinks } from './Nav'
import Magnetic from './Magnetic'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '0%'])

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <motion.div style={{ y }} className="mx-auto max-w-[1600px] px-6 pb-10 pt-32 md:px-10">
        <p className="label text-stone">Have a problem worth solving?</p>
        <div className="mt-6 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="font-serif text-[13vw] leading-[0.9] tracking-tight md:text-[9vw]">
            Let&rsquo;s <span className="italic text-garnet-bright">talk.</span>
          </h2>
          <Magnetic>
            <a
              href="mailto:gamecockconsulting@gmail.com"
              data-cursor="Email"
              className="grid h-40 w-40 place-items-center rounded-full bg-garnet text-center text-sm transition-colors hover:bg-garnet-bright"
            >
              Start an
              <br />
              engagement
            </a>
          </Magnetic>
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
            <a href="mailto:gamecockconsulting@gmail.com" className="hover:text-garnet-bright">
              gamecockconsulting@gmail.com
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
