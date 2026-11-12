import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import type { MouseEvent } from 'react'
import Footer from '../components/Footer'
import Motif from '../components/Motif'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import { engagements } from '../data/engagements'
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

      <PartnerSection />
      <EngagementList />
      <Footer />
    </PageTransition>
  )
}

function EngagementList() {
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 })

  const [flip, setFlip] = useState(false)

  const onMove = (e: MouseEvent) => {
    x.set(e.clientX)
    y.set(e.clientY)
    setFlip(e.clientX > window.innerWidth * 0.55)
  }

  const current = active !== null ? engagements[active] : null

  return (
    <section className="bg-ink pb-40 pt-32 text-paper md:pt-40" onMouseMove={onMove}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="label mb-6 text-stone">Selected engagements</p>
            <SplitText
              as="h2"
              inView
              text="Explore the work."
              italicWords={['work']}
              className="font-serif text-5xl leading-[1] tracking-tight md:text-7xl"
            />
          </div>
          <Reveal>
            <p className="flex items-center gap-3 text-paper/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-garnet-bright opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-garnet-bright" />
              </span>
              Select an engagement to read the full case study
            </p>
          </Reveal>
        </div>

        <div className="label hidden grid-cols-12 border-b border-white/10 pb-4 text-paper/40 md:grid">
          <span className="md:col-span-1">No.</span>
          <span className="md:col-span-5">Client & engagement</span>
          <span className="md:col-span-3">Sector · Status</span>
          <span className="text-right md:col-span-3">Case study</span>
        </div>

        <ul onMouseLeave={() => setActive(null)}>
          {engagements.map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.1} y={30}>
              <li onMouseEnter={() => setActive(i)}>
                <TransitionLink
                  to={`/engagements/${e.slug}`}
                  label={e.clientShort}
                  color={e.accent}
                  className="group relative grid grid-cols-12 items-center gap-y-6 border-b border-white/10 py-10 md:py-12"
                >
                  <span className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 rounded-2xl bg-white/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:inset-x-[-2.5rem]" />
                  <span
                    className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
                    style={{ background: e.accent }}
                  />
                  <span className="label relative col-span-2 text-paper/40 md:col-span-1">{e.index}</span>
                  <div
                    className={`relative col-span-10 transition-all duration-500 md:col-span-5 md:group-hover:translate-x-4 ${
                      active !== null && active !== i ? 'opacity-30' : ''
                    }`}
                  >
                    <p className="font-serif text-4xl leading-none tracking-tight md:text-6xl">{e.clientShort}</p>
                    <p className="mt-3 max-w-lg text-paper/60">{e.title}</p>
                  </div>
                  <div className="relative col-span-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-paper/60 md:col-span-3 md:flex-col md:items-start">
                    <span>{e.sector}</span>
                    <span className="label inline-flex items-center gap-2 text-paper/50">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: e.accent }} />
                      {e.statusShort}
                    </span>
                  </div>
                  <span className="relative col-span-12 flex md:col-span-3 md:justify-end">
                    <span
                      className="relative inline-flex items-center gap-3 overflow-hidden rounded-full border py-2 pl-5 pr-2 text-sm transition-colors duration-500 group-hover:text-ink"
                      style={{ borderColor: `${e.accent}66` }}
                    >
                      <span
                        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
                        style={{ background: e.accent }}
                      />
                      <span className="relative font-medium">View case study</span>
                      <span
                        className="relative grid h-9 w-9 place-items-center rounded-full text-ink transition-transform duration-500 group-hover:translate-x-1 group-hover:bg-ink group-hover:text-paper"
                        style={{ background: active === i ? undefined : e.accent }}
                      >
                        →
                      </span>
                    </span>
                  </span>
                </TransitionLink>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <div
          className={`-translate-y-1/2 transition-transform duration-500 ease-out ${
            flip ? '-translate-x-[calc(100%+2.5rem)]' : 'translate-x-10'
          }`}
        >
        <AnimatePresence>
          {current && (
            <motion.div
              key="preview"
              className="overflow-hidden rounded-2xl"
              initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: 8 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <motion.div
                className="grid h-72 w-80 place-items-center p-10"
                animate={{ backgroundColor: current.accentSoft }}
                transition={{ duration: 0.4 }}
              >
                <Motif key={current.slug} kind={current.motif} accent={current.accent} className="w-full text-ink" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}

function PartnerSection() {
  const points = [
    {
      title: 'A dedicated student team',
      body: 'Five to eight vetted members led by an experienced project leader, trained in case methodology.',
    },
    {
      title: 'Real deliverables',
      body: 'Research, models, and recommendations packaged into an executive-ready final presentation.',
    },
    {
      title: 'A pipeline of talent',
      body: "Early access to some of the University of South Carolina's most driven business students.",
    },
  ]
  return (
    <section className="bg-paper py-32 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="label text-stone md:col-span-3">For partners</p>
          <div className="md:col-span-9">
            <SplitText
              as="h2"
              inView
              stagger={0.04}
              text="Bring us a problem that matters. We'll bring the team."
              className="font-serif text-5xl leading-[1] tracking-tight md:text-7xl"
            />
          </div>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <div className="h-full rounded-[24px] border border-ink/10 bg-paper-2 p-8 transition-transform duration-500 hover:-translate-y-2">
                <span className="label text-garnet">0{i + 1}</span>
                <h3 className="mt-12 font-serif text-3xl">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-ink/60">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
