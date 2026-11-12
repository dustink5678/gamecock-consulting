import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
import Motif from '../components/Motif'
import PageTransition from '../components/PageTransition'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'
import ScrollWords from '../components/ScrollWords'
import SplitText from '../components/SplitText'
import { engagements, getEngagement } from '../data/engagements'
import type { Engagement, Project, Team } from '../data/engagements'
import { easeOut } from '../lib/motion'
import { TransitionLink } from '../lib/transition'
import ComingSoon from './ComingSoon'

type SectionMeta = { id: string; label: string; n: string }

function buildSections(e: Engagement): SectionMeta[] {
  const list: { id: string; label: string }[] = [{ id: 'overview', label: 'Overview' }]
  if (e.photos?.length) list.push({ id: 'field', label: 'In the field' })
  if (e.scale) list.push({ id: 'scale', label: 'Research scale' })
  e.projects.forEach((p, i) => list.push({ id: `project-${i}`, label: p.label ?? 'Our work' }))
  if (e.teams?.length) list.push({ id: 'team', label: 'The team' })
  return list.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, '0') }))
}

export default function EngagementDetail() {
  const { slug } = useParams()
  const e = getEngagement(slug)
  const sections = useMemo(() => (e ? buildSections(e) : []), [e])
  if (!e) return <ComingSoon title="Engagement not found" blurb="We couldn't find that engagement." />

  const idx = engagements.indexOf(e)
  const next = engagements[(idx + 1) % engagements.length]
  const n = (id: string) => sections.find((s) => s.id === id)?.n ?? ''

  return (
    <PageTransition>
      <ProgressBar accent={e.accent} />
      <SectionIndicator accent={e.accent} sections={sections} />
      <Hero e={e} />
      <Overview e={e} n={n('overview')} />
      {e.photos?.length ? <Photos e={e} n={n('field')} /> : null}
      {e.scale ? <Scale e={e} n={n('scale')} /> : null}
      {e.projects.map((p, i) => (
        <ProjectBlock key={i} id={`project-${i}`} n={n(`project-${i}`)} project={p} e={e} />
      ))}
      {e.teams?.length ? <Teams teams={e.teams} n={n('team')} /> : null}
      <NextEngagement next={next} />
      <Footer />
    </PageTransition>
  )
}

function ProgressBar({ accent }: { accent: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX, background: accent }}
    />
  )
}

function SectionIndicator({ accent, sections }: { accent: string; sections: SectionMeta[] }) {
  const [active, setActive] = useState<number>(-1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(sections.findIndex((s) => s.id === entry.target.id))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el)
    els.forEach((el) => observer.observe(el))

    const edgeObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(-1)),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    ;['hero', 'next'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) edgeObserver.observe(el)
    })

    return () => {
      observer.disconnect()
      edgeObserver.disconnect()
    }
  }, [sections])

  return (
    <AnimatePresence>
      {active >= 0 && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/10 bg-ink/85 py-2.5 pl-3 pr-5 text-paper backdrop-blur-md"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <div className="flex gap-1.5">
            {sections.map((s, i) => (
              <motion.span
                key={s.id}
                className="h-1.5 rounded-full"
                animate={{
                  width: i === active ? 22 : 6,
                  backgroundColor: i <= active ? accent : 'rgba(244,241,234,0.25)',
                }}
                transition={{ duration: 0.5, ease: easeOut }}
              />
            ))}
          </div>
          <div className="relative h-5 w-36 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                className="label absolute inset-0 flex items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: easeOut }}
              >
                {sections[active]?.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Hero({ e }: { e: Engagement }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const motifY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const motifRotate = useTransform(scrollYProgress, [0, 1], [0, 25])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const meta = [
    { k: 'Client', v: e.client },
    { k: 'Sector', v: e.sector },
    { k: 'Focus', v: e.focus.join(', ') },
    { k: 'Status', v: e.status },
  ]

  return (
    <section id="hero" ref={ref} className="grain relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute -right-[20vw] top-[-20vh] h-[90vmax] w-[90vmax] rounded-full opacity-30 blur-[140px]"
        style={{ background: `radial-gradient(circle, ${e.accent}, transparent 60%)` }}
      />
      <div className="relative mx-auto grid min-h-[100svh] max-w-[1600px] items-end gap-10 px-6 pb-16 pt-36 md:grid-cols-12 md:px-10">
        <motion.div style={{ y: textY }} className="md:col-span-7">
          <motion.div
            className="label mb-10 flex items-center gap-3 text-paper/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: easeOut }}
          >
            <TransitionLink to="/engagements" label="Engagements" className="hover:text-paper">
              Engagements
            </TransitionLink>
            <span>/</span>
            <span style={{ color: e.accent }}>{e.index}</span>
          </motion.div>

          <h1 className="font-serif text-[16vw] leading-[0.85] tracking-[-0.03em] md:text-[10vw]">
            <SplitText text={e.clientShort} delay={0.75} />
          </h1>
          <h2 className="mt-8 max-w-2xl text-2xl leading-snug text-paper/85 md:text-3xl">
            <SplitText text={e.title} delay={1} stagger={0.03} />
          </h2>

          <motion.dl
            className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 md:grid-cols-4"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 1.3 }}
          >
            {meta.map((m) => (
              <motion.div
                key={m.k}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
                }}
              >
                <dt className="label text-paper/40">{m.k}</dt>
                <dd className="mt-2 text-sm text-paper/85">{m.v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={{ y: motifY, rotate: e.motif === 'orbit' ? motifRotate : 0 }}
          className="relative hidden items-center justify-center text-paper/80 md:col-span-5 md:flex md:self-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.9, ease: easeOut }}
        >
          <Motif kind={e.motif} accent={e.accent} className="w-full max-w-[520px]" />
        </motion.div>
      </div>
    </section>
  )
}

function SectionLabel({ n, children, dark = false }: { n: string; children: string; dark?: boolean }) {
  return (
    <p className={`label flex items-center gap-3 ${dark ? 'text-paper/50' : 'text-stone'}`}>
      <span>{n}</span>
      <span className={`h-px w-8 ${dark ? 'bg-paper/30' : 'bg-ink/30'}`} />
      <span>{children}</span>
    </p>
  )
}

function Overview({ e, n }: { e: Engagement; n: string }) {
  return (
    <section id="overview" className="bg-paper py-32 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-3">
          <SectionLabel n={n}>Overview</SectionLabel>
        </div>
        <div className="space-y-6 md:col-span-8">
          {e.overview.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="max-w-3xl text-xl leading-relaxed text-ink/75 md:text-2xl">{p}</p>
            </Reveal>
          ))}
          {e.topics && (
            <motion.ul
              className="flex flex-wrap gap-2 pt-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ staggerChildren: 0.07 }}
            >
              {e.topics.map((t) => (
                <motion.li
                  key={t}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
                  }}
                  className="rounded-full border border-ink/15 bg-paper-2 px-4 py-2 text-sm"
                >
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>

      <div className="mx-auto mt-28 max-w-[1600px] px-6 md:mt-40 md:px-10">
        <Reveal>
          <p className="label mb-8 flex items-center gap-3" style={{ color: e.accent }}>
            <span className="h-2 w-2 rounded-full" style={{ background: e.accent }} />
            {e.highlightLabel}
          </p>
        </Reveal>
        <ScrollWords
          text={e.highlight}
          className="max-w-6xl font-serif text-4xl leading-[1.1] tracking-tight md:text-7xl"
        />
      </div>
    </section>
  )
}

function Photos({ e, n }: { e: Engagement; n: string }) {
  const [lead, ...rest] = e.photos ?? []
  return (
    <section id="field" className="bg-paper pb-32 md:pb-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between border-t border-ink/15 pt-8">
          <SectionLabel n={n}>In the field</SectionLabel>
          <span className="label text-stone">{e.client}</span>
        </div>
        <figure>
          <ParallaxImage src={lead.src} alt={lead.alt} className="aspect-[4/3] rounded-[24px] md:aspect-[16/9]" speed={8} />
          <figcaption className="label mt-4 text-stone">{lead.alt}</figcaption>
        </figure>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <figure key={p.src} className={i === 1 ? 'md:mt-20' : ''}>
              <ParallaxImage src={p.src} alt={p.alt} className="aspect-[4/3] rounded-[24px]" speed={12} delay={i * 0.1} />
              <figcaption className="label mt-4 text-stone">{p.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Scale({ e, n }: { e: Engagement; n: string }) {
  const scale = e.scale!
  return (
    <section id="scale" className="relative overflow-hidden py-32 md:py-44" style={{ background: e.accentSoft }}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel n={n}>Research scale</SectionLabel>
          </div>
          <div className="md:col-span-8">
            <SplitText
              as="h2"
              inView
              stagger={0.04}
              text={`${scale.title}.`}
              className="font-serif text-5xl leading-[1] tracking-tight md:text-7xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/70 md:text-xl">{scale.body}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
          {scale.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="border-t border-ink/20 pt-6">
                <p className="font-serif text-7xl leading-none tracking-tight md:text-[5.5rem]">
                  <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <p className="mt-5 max-w-[14rem] text-ink/70">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectBlock({ id, n, project: p, e }: { id: string; n: string; project: Project; e: Engagement }) {
  return (
    <div id={id}>
      {p.title && (
        <section className="bg-paper py-28 md:py-36">
          <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-12 md:px-10">
            <div className="md:col-span-3">
              <SectionLabel n={n}>{p.label ?? 'Project'}</SectionLabel>
              {p.status && (
                <Reveal delay={0.1}>
                  <span
                    className="label mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: e.accentSoft }}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${p.status.startsWith('Current') ? 'animate-pulse' : ''}`}
                      style={{ background: e.accent }}
                    />
                    {p.status}
                  </span>
                </Reveal>
              )}
            </div>
            <div className="md:col-span-8">
              <SplitText
                as="h2"
                inView
                stagger={0.04}
                text={p.title}
                className="font-serif text-5xl leading-[1] tracking-tight md:text-7xl"
              />
              {p.summary?.map((s, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/70 md:text-xl">{s}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Workstreams project={p} e={e} n={n} showLabel={!p.title} />

      {p.deliverables?.length ? <Deliverables project={p} e={e} /> : null}

      {p.outcome || p.note ? <Outcome project={p} e={e} /> : null}
    </div>
  )
}

function Workstreams({ project: p, e, n, showLabel }: { project: Project; e: Engagement; n: string; showLabel: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const compact = p.workstreams.every((w) => !w.body)

  return (
    <section className="bg-ink py-28 text-paper md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            {showLabel && (
              <div className="mb-8">
                <SectionLabel n={n} dark>
                  Our work
                </SectionLabel>
              </div>
            )}
            <SplitText
              as="h2"
              inView
              text={p.workstreamsTitle}
              className="font-serif text-5xl leading-[1] tracking-tight md:text-6xl"
            />
          </div>
        </div>

        <div ref={ref} className="relative md:col-span-7 md:col-start-6">
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10" />
          <motion.div
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top"
            style={{ scaleY: lineScale, background: e.accent }}
          />
          {p.workstreams.map((w, i) => (
            <div key={w.title} className={`relative pl-16 last:pb-0 ${compact ? 'pb-12' : 'pb-16'}`}>
              <motion.span
                className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border-2 bg-ink"
                initial={{ borderColor: 'rgba(244,241,234,0.2)' }}
                whileInView={{ borderColor: e.accent }}
                viewport={{ margin: '-40% 0px -40% 0px' }}
                transition={{ duration: 0.4 }}
              >
                <motion.span
                  className="h-2 w-2 rounded-full"
                  style={{ background: e.accent }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ margin: '-40% 0px -40% 0px' }}
                />
              </motion.span>
              <Reveal y={30}>
                <p className="label text-paper/40">{String(i + 1).padStart(2, '0')}</p>
                <h3 className={`mt-3 font-serif ${compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'}`}>
                  {w.title}
                </h3>
                {w.body && <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/65">{w.body}</p>}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Deliverables({ project: p, e }: { project: Project; e: Engagement }) {
  return (
    <section className="bg-paper py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
            <h3 className="font-serif text-3xl italic">{p.deliverablesTitle ?? 'Deliverables'}</h3>
            <span className="label text-stone">{p.label ?? e.clientShort}</span>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {p.deliverables!.map((d, i) => (
            <Reveal key={d} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-[24px] border border-ink/10 bg-paper-2 p-8 md:p-10">
                <span
                  className="absolute inset-0 origin-bottom-left scale-0 rounded-[24px] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"
                  style={{ background: e.accentSoft }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="label text-stone">Exhibit {String.fromCharCode(65 + i)}</span>
                    <span
                      className="h-3 w-3 rounded-full transition-transform duration-500 group-hover:scale-150"
                      style={{ background: e.accent }}
                    />
                  </div>
                  <h4 className="mt-16 font-serif text-3xl leading-tight">{d}</h4>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Outcome({ project: p, e }: { project: Project; e: Engagement }) {
  return (
    <section className="py-28 md:py-36" style={{ background: e.accentSoft }}>
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-3">
          <p className="label flex items-center gap-3 text-ink/60">
            <span className="h-2 w-2 rounded-full" style={{ background: e.accent }} />
            {p.outcome ? 'Outcome' : 'Approach'}
          </p>
        </div>
        <div className="md:col-span-9">
          {p.outcome && (
            <Reveal>
              <p className="max-w-5xl font-serif text-4xl leading-[1.12] tracking-tight md:text-6xl">{p.outcome}</p>
            </Reveal>
          )}
          {p.note && (
            <Reveal delay={0.15}>
              <p
                className={`max-w-3xl leading-relaxed text-ink/65 ${
                  p.outcome ? 'mt-10 border-l-2 pl-5 text-base italic' : 'font-serif text-3xl leading-snug text-ink md:text-4xl'
                }`}
                style={p.outcome ? { borderColor: e.accent } : undefined}
              >
                {p.note}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

function Teams({ teams, n }: { teams: Team[]; n: string }) {
  return (
    <section id="team" className="bg-paper-2 py-32 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel n={n}>The team</SectionLabel>
          </div>
          <SplitText
            as="h2"
            inView
            stagger={0.05}
            text="The people behind the work."
            italicWords={['work']}
            className="font-serif text-5xl leading-[1] tracking-tight md:col-span-9 md:text-7xl"
          />
        </div>

        {teams.map((t) => (
          <div key={t.caption} className="mt-20 grid items-center gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="overflow-hidden rounded-[20px] border border-ink/10 bg-white shadow-[0_30px_80px_-30px_rgba(11,13,16,0.35)]">
                <img src={t.slide} alt={`${t.caption} slide`} loading="lazy" className="w-full" />
              </div>
            </Reveal>
            <div className="md:col-span-5">
              <Reveal>
                <p className="label mb-6 text-stone">{t.caption}</p>
              </Reveal>
              <motion.ul
                className="divide-y divide-ink/10 border-y border-ink/10"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ staggerChildren: 0.07 }}
              >
                {t.members.map((m) => (
                  <motion.li
                    key={m.name}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } },
                    }}
                    className="group flex items-baseline justify-between gap-6 py-4"
                  >
                    <span className="font-serif text-3xl transition-transform duration-500 group-hover:translate-x-2">
                      {m.name}
                    </span>
                    {m.role && <span className="label shrink-0 text-stone">{m.role}</span>}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function NextEngagement({ next }: { next: Engagement }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0])

  return (
    <section id="next" ref={ref} className="bg-paper">
      <motion.div style={{ scale, borderRadius: radius }} className="overflow-hidden">
        <TransitionLink
          to={`/engagements/${next.slug}`}
          label={next.clientShort}
          color={next.accent}
          data-cursor="Next"
          className="group relative block overflow-hidden bg-ink-2 px-6 py-32 text-paper md:px-10 md:py-44"
        >
          <span
            className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
            style={{ background: next.accent }}
          />
          <div className="relative mx-auto flex max-w-[1600px] flex-col justify-between gap-12 md:flex-row md:items-end">
            <div>
              <p className="label text-paper/50 transition-colors duration-500 group-hover:text-ink/60">
                Next engagement — {next.index}
              </p>
              <p className="mt-6 font-serif text-[16vw] leading-[0.85] tracking-[-0.03em] transition-colors duration-500 group-hover:text-ink md:text-[10vw]">
                {next.clientShort}
              </p>
              <p className="mt-6 max-w-xl text-paper/60 transition-colors duration-500 group-hover:text-ink/70">
                {next.title}
              </p>
            </div>
            <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-white/20 text-3xl transition-all duration-700 group-hover:rotate-[-45deg] group-hover:border-ink group-hover:text-ink">
              →
            </span>
          </div>
        </TransitionLink>
      </motion.div>
    </section>
  )
}
