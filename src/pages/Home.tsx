import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import Footer from '../components/Footer'
import LogoMark from '../components/LogoMark'
import { logos } from '../data/logos'
import Magnetic from '../components/Magnetic'
import Motif from '../components/Motif'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import { engagements } from '../data/engagements'
import type { Engagement } from '../data/engagements'
import { easeOut } from '../lib/motion'
import { TransitionLink } from '../lib/transition'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Pillars />
      <EngagementStack />
      <Process />
      <Footer />
    </PageTransition>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

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
        className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-6 pb-12 pt-32 md:px-10 md:pb-14"
      >
        <h1 className="max-w-[14ch] font-serif text-[15vw] leading-[0.88] tracking-[-0.02em] md:text-[min(8.5vw,15vh)]">
          <SplitText text="Student consultants." delay={0.8} />
          <br />
          <SplitText text="Real client impact." delay={1.0} className="italic text-garnet-bright" />
        </h1>

        <div className="mt-12 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <motion.p
            className="max-w-md text-lg leading-relaxed text-paper/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: easeOut }}
          >
            Gamecock Consulting Club partners with leading organizations on real strategy work, competes on the
            national case circuit, and places members at the world&rsquo;s top firms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.55, ease: easeOut }}
          >
            <Magnetic>
              <button
                onClick={() => lenis?.scrollTo('#engagements', { duration: 1.6 })}
                className="group flex items-center gap-4 rounded-full bg-paper py-3 pl-7 pr-3 text-ink"
              >
                <span className="text-sm font-medium">See our engagements</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-garnet text-paper transition-transform duration-500 group-hover:rotate-90">
                  ↓
                </span>
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <ClientTicker />
    </section>
  )
}

function ClientTicker() {
  const items = [logos.google, logos.capgemini, logos.srnl]
  const row = [...items, ...items, ...items, ...items]
  return (
    <motion.div
      className="relative border-t border-white/10 py-5 [--logo-scale:0.55] md:[--logo-scale:0.7]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
    >
      <div className="flex overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-12 pr-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...row, ...row].map((l, i) => (
            <span key={i} className="flex h-10 items-center gap-12 whitespace-nowrap">
              <span className="label text-paper/40">Recent client</span>
              <LogoMark logo={l} className="opacity-90" />
              <span className="h-1.5 w-1.5 rounded-full bg-garnet-bright" />
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
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
    <section className="bg-paper py-32 md:py-44">
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

function EngagementStack() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="engagements" className="relative bg-ink pt-32 text-paper md:pt-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="label mb-6 text-stone">Selected engagements · 2026</p>
            <SplitText
              as="h2"
              inView
              text="Work we've delivered."
              italicWords={["delivered"]}
              className="font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl"
            />
          </div>
          <Reveal>
            <p className="max-w-sm text-paper/60">
              Three client engagements this year — across big tech, technology consulting, and national
              energy research.
            </p>
          </Reveal>
        </div>
      </div>

      <div ref={ref} className="mx-auto mt-20 max-w-[1600px] px-4 pb-32 md:px-10">
        {engagements.map((e, i) => (
          <StackCard key={e.slug} engagement={e} i={i} total={engagements.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}

function StackCard({
  engagement: e,
  i,
  total,
  progress,
}: {
  engagement: Engagement
  i: number
  total: number
  progress: MotionValue<number>
}) {
  const targetScale = 1 - (total - 1 - i) * 0.05
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])
  const dim = useTransform(progress, [i / total, 1], [0, (total - 1 - i) * 0.15])

  return (
    <div className="sticky top-0 flex h-[100svh] items-center">
      <motion.div
        style={{ scale, top: `${(i - 1) * 36}px` }}
        className="relative w-full origin-top"
      >
        <TransitionLink
          to={`/engagements/${e.slug}`}
          label={e.clientShort}
          color={e.accent}
          data-cursor="View"
          className="group relative grid min-h-[72svh] overflow-hidden rounded-[28px] border border-white/10 bg-ink-2 md:grid-cols-2"
        >
          <div className="relative z-10 flex flex-col justify-between p-8 md:p-14">
            <div className="flex items-center justify-between">
              <span className="label text-paper/50">Engagement {e.index}</span>
              <span className="label text-paper/50">{e.sector}</span>
            </div>
            <div className="mt-16">
              <p className="font-serif text-2xl italic" style={{ color: e.accent }}>
                {e.client}
              </p>
              <h3 className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] tracking-tight md:text-6xl">
                {e.title}
              </h3>
              <p className="mt-6 max-w-md leading-relaxed text-paper/60">{e.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {e.focus.map((f) => (
                  <span key={f} className="label rounded-full border border-white/15 px-3 py-1.5 text-paper/70">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <span className="mt-10 inline-flex items-center gap-3 text-sm">
              <span
                className="grid h-11 w-11 place-items-center rounded-full transition-transform duration-500 group-hover:scale-110"
                style={{ background: e.accent, color: '#0b0d10' }}
              >
                →
              </span>
              Read the case study
            </span>
          </div>

          <div className="relative flex items-center justify-center overflow-hidden p-10 text-paper/80">
            <div
              className="absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-40"
              style={{ background: `radial-gradient(circle at 50% 50%, ${e.accent}, transparent 65%)` }}
            />
            <Motif
              kind={e.motif}
              accent={e.accent}
              className="relative w-full max-w-[420px] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
          </div>
        </TransitionLink>
        <motion.div
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 rounded-[28px] bg-ink"
        />
      </motion.div>
    </div>
  )
}

function Process() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useLayoutEffect(() => {
    const measure = () => {
      const el = trackRef.current
      if (el) setDistance(Math.max(0, el.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      const el = trackRef.current
      if (el) setDistance(Math.max(0, el.scrollWidth - window.innerWidth))
    }, 500)
    return () => clearTimeout(t)
  }, [])

  const steps = [
    { title: 'Scope', body: 'We align with client leadership on the core question, success criteria, and the hypotheses worth testing.' },
    { title: 'Research', body: 'Primary interviews, surveys, market and regulatory research — whatever the problem demands.' },
    { title: 'Analyze', body: 'Frameworks, financial models, and data synthesis that turn raw findings into insight.' },
    { title: 'Recommend', body: 'Clear, prioritized recommendations with a roadmap the client can actually execute.' },
    { title: 'Deliver', body: 'An executive readout to client stakeholders — the same bar as a professional engagement.' },
  ]

  return (
    <section ref={ref} className="relative h-[400vh] bg-paper">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-14 flex w-full max-w-[1600px] items-end justify-between px-6 md:px-10">
          <div>
            <p className="label mb-5 text-stone">How an engagement runs</p>
            <h2 className="font-serif text-5xl leading-none tracking-tight md:text-7xl">
              From question <span className="italic text-garnet">to answer.</span>
            </h2>
          </div>
          <div className="hidden w-64 md:block">
            <div className="h-px w-full bg-ink/15">
              <motion.div style={{ width: bar }} className="h-px bg-garnet" />
            </div>
          </div>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 pl-6 pr-[10vw] md:pl-10">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative flex h-[50svh] w-[80vw] shrink-0 flex-col justify-between rounded-[24px] border border-ink/10 bg-paper-2 p-8 md:w-[34vw] md:p-12"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-8xl leading-none text-garnet md:text-9xl">0{i + 1}</span>
                <span className="label text-stone">Phase</span>
              </div>
              <div>
                <h3 className="font-serif text-4xl md:text-5xl">{s.title}</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-ink/60">{s.body}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
