import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Motif from '../components/Motif'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import { engagements } from '../data/engagements'
import type { Engagement } from '../data/engagements'
import { easeOut } from '../lib/motion'
import { TransitionLink } from '../lib/transition'

export default function Engagements() {
  return (
    <PageTransition>
      <section className="grain relative overflow-hidden bg-ink pb-24 pt-44 text-paper md:pt-56">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <motion.p
            className="label mb-8 text-paper/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Pillar 01 — Client engagements
          </motion.p>
          <h1 className="font-serif text-[17vw] leading-[0.85] tracking-[-0.03em] md:text-[12vw]">
            <SplitText text="Engagements" delay={0.75} />
          </h1>
          <div className="mt-16 grid gap-10 md:grid-cols-12">
            <motion.p
              className="text-xl leading-relaxed text-paper/70 md:col-span-6 md:col-start-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: easeOut }}
            >
              Each semester, GCC teams take on real strategic problems for real clients. Members work in
              consulting-style teams under student project leaders — scoping, researching, modeling, and
              presenting recommendations directly to client leadership.
            </motion.p>
          </div>
        </div>
      </section>

      <Process />
      <EngagementStack />
      <Footer />
    </PageTransition>
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
              italicWords={['delivered']}
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
      <motion.div style={{ scale, top: `${(i - 1) * 36}px` }} className="relative w-full origin-top">
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
