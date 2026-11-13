import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import type { MouseEvent } from 'react'
import Footer from '../components/Footer'
import LogoMark from '../components/LogoMark'
import PageTransition from '../components/PageTransition'
import { logos } from '../data/logos'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import { easeOut } from '../lib/motion'
import { TransitionLink } from '../lib/transition'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Pillars />
      <Footer />
    </PageTransition>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  // Hold solid until the hero is mostly scrolled past, then fade quickly.
  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.92], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.97])

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.3)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const glowX = useTransform(sx, (v) => `${v * 100}%`)
  const glowY = useTransform(sy, (v) => `${v * 100}%`)

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      <motion.div
        className="pointer-events-none absolute h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          left: glowX,
          top: glowY,
          background: 'radial-gradient(circle, rgba(166,25,46,0.55) 0%, rgba(115,0,10,0) 65%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 mx-auto grid max-w-[1600px] grid-cols-4 px-6 md:grid-cols-12 md:px-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={`border-l border-white/[0.06] ${i >= 4 ? 'hidden md:block' : ''}`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.6, delay: 0.6 + i * 0.05, ease: easeOut }}
            style={{ transformOrigin: 'top' }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-8 pt-24 md:px-10 md:pb-10"
      >
        <div className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <motion.p
              className="label mb-6 flex items-center gap-3 text-paper/60"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: easeOut }}
            >
              <span className="h-px w-10 bg-garnet-bright" />
              Gamecock Consulting Club
            </motion.p>
            <h1 className="font-serif text-[12vw] leading-[0.92] tracking-[-0.02em] md:text-[min(6.6vw,11vh)]">
              {headline.map((line, i) => (
                <span key={line.lead} className="block whitespace-nowrap">
                  <SplitText text={line.lead} delay={0.8 + i * 0.15} />{' '}
                  <SplitText text={line.accent} delay={0.9 + i * 0.15} className="italic text-garnet-bright" />
                </span>
              ))}
            </h1>
            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-paper/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: easeOut }}
            >
              University of South Carolina students doing real strategy work for real clients, winning on the
              international case circuit, and landing at the world&rsquo;s top firms.
            </motion.p>
          </div>

          <div className="mt-6 md:col-span-5 md:col-start-8 md:mt-0">
            <ProofTiles />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

const headline = [
  { lead: 'Advising', accent: 'Google.' },
  { lead: 'Winning', accent: 'worldwide.' },
  { lead: 'Placing at', accent: 'MBB.' },
]

function ProofTiles() {
  const tiles = [
    {
      to: '/engagements',
      label: 'Client engagements',
      stat: <span className="flex flex-wrap items-center gap-x-5 gap-y-3 [--logo-scale:0.5] md:[--logo-scale:0.62]">
        <LogoMark logo={logos.google} />
        <LogoMark logo={logos.capgemini} />
        <LogoMark logo={logos.srnl} />
      </span>,
      body: 'Strategy work for Google, Capgemini, and a U.S. national laboratory.',
    },
    {
      to: '/case-competitions',
      label: 'Case competitions',
      stat: (
        <span className="font-serif text-4xl leading-[1.05]">
          Consistent <span className="italic text-garnet-bright">international wins</span>
        </span>
      ),
      body: 'First-place finishes in Norway and Ireland — competing from Hong Kong to Sydney.',
    },
    {
      to: '/member-development',
      label: 'Placements',
      stat: (
        <span className="flex flex-col gap-4">
          <span className="font-serif text-4xl leading-[1.05]">
            Continuous <span className="italic text-garnet-bright">MBB placements</span>
          </span>
          <span className="flex items-center gap-5 [--logo-scale:0.5]">
            <LogoMark logo={logos.mckinsey} />
            <LogoMark logo={logos.bain} />
            <LogoMark logo={logos.bcg} />
          </span>
        </span>
      ),
      body: 'Members land at McKinsey, Bain & BCG year after year.',
    },
  ]

  return (
    <div className="border-t border-white/10">
      {tiles.map((t, i) => (
        <motion.div
          key={t.to}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.3 + i * 0.15, ease: easeOut }}
        >
          <TransitionLink
            to={t.to}
            label={t.label}
            className="group relative flex flex-col gap-3 overflow-hidden border-b border-white/10 py-5 md:py-5"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-white/[0.04] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
            <span className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-garnet-bright transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
            <span className="label relative flex items-center justify-between text-paper/50">
              {t.label}
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:translate-x-1 group-hover:border-garnet-bright group-hover:bg-garnet-bright group-hover:text-paper">
                →
              </span>
            </span>
            <span className="relative flex min-h-12 items-center">{t.stat}</span>
            <span className="relative max-w-sm text-sm leading-relaxed text-paper/60">{t.body}</span>
          </TransitionLink>
        </motion.div>
      ))}
    </div>
  )
}

function Pillars() {
  const pillars = [
    {
      n: '01',
      title: 'Engagements',
      body: 'Semester-long projects for Fortune 500s, consultancies, and national labs — scoped, delivered, and presented like a real consulting team.',
      to: '/engagements',
      live: true,
    },
    {
      n: '02',
      title: 'Case Competitions',
      body: 'First-place finishes from Bergen to Dublin, teams from Hong Kong to Sydney — and competitions we host with McKinsey and Boeing.',
      to: '/case-competitions',
      live: true,
    },
    {
      n: '03',
      title: 'Member Development',
      body: 'Rigorous case training, incredible job placements, and an alumni network inside the firms our members want to join.',
      to: '/member-development',
      live: true,
    },
  ]

  return (
    <section id="pillars" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="label text-stone md:col-span-3">What we do</p>
          <SplitText
            as="h2"
            inView
            text="Three ways we turn ambitious students into consultants."
            className="font-serif text-5xl leading-[1] tracking-tight md:col-span-9 md:text-7xl"
            stagger={0.04}
          />
        </div>

        <div className="mt-24 grid border-t border-ink/15 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.12}>
              <TransitionLink
                to={p.to}
                label={p.title}
                className="group relative block h-full overflow-hidden border-b border-ink/15 p-8 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
                <div className="relative transition-colors duration-500 group-hover:text-paper">
                  <div className="flex items-center justify-between">
                    <span className="label text-stone">{p.n}</span>
                    {p.live ? (
                      <span className="label rounded-full bg-garnet px-3 py-1 text-paper">Explore</span>
                    ) : (
                      <span className="label text-stone">Coming soon</span>
                    )}
                  </div>
                  <h3 className="mt-20 font-serif text-4xl md:text-5xl">{p.title}</h3>
                  <p className="mt-5 max-w-sm leading-relaxed text-ink/60 transition-colors duration-500 group-hover:text-paper/70">
                    {p.body}
                  </p>
                  <span className="mt-10 inline-flex items-center gap-2 text-sm">
                    Explore
                    <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                  </span>
                </div>
              </TransitionLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
