import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
import LogoMark from '../components/LogoMark'
import { logos } from '../data/logos'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import ScrollWords from '../components/ScrollWords'
import SplitText from '../components/SplitText'
import VelocityMarquee from '../components/VelocityMarquee'
import { big4Total, boutique, categories, companyTotal, featured, firms, mbbThisYear } from '../data/placements'
import type { Category } from '../data/placements'
import { easeOut } from '../lib/motion'

export default function MemberDevelopment() {
  return (
    <PageTransition>
      <Hero />
      <Stats />
      <Featured />
      <Directory />
      <Development />
      <Testimonial />
      <Footer />
    </PageTransition>
  )
}

const marqueeA = [
  logos.mckinsey,
  logos.goldman,
  logos.bain,
  logos.a24,
  logos.blackrock,
  logos.deloitte,
  logos.meta,
  logos.oliverwyman,
  logos.apollo,
  logos.accenture,
  logos.visa,
  logos.boeing,
]
const marqueeB = [
  logos.bcg,
  logos.ey,
  logos.jpmorgan,
  logos.chanel,
  logos.pwc,
  logos.kearney,
  logos.amazon,
  logos.fti,
  logos.wharton,
  logos.bofa,
  logos.mastercard,
  logos.delta,
  logos.pepsico,
]

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-ink pt-44 text-paper md:pt-52">
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <motion.p
          className="label mb-8 text-paper/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Pillar 03 — Member development
        </motion.p>
        <h1 className="font-serif text-[16vw] leading-[0.86] tracking-[-0.03em] md:text-[10vw]">
          <SplitText text="Where Gamecocks" delay={0.75} />
          <br />
          <SplitText text="go next." delay={0.95} className="italic text-garnet-bright" />
        </h1>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <motion.p
            className="text-xl leading-relaxed text-paper/70 md:col-span-6 md:col-start-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: easeOut }}
          >
            Rigorous case training, direct access to firm recruiters, and an alumni network inside the world&rsquo;s
            top firms. GCC members compete for — and win — the same seats as students from the country&rsquo;s
            leading universities.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="relative mt-24 divide-y divide-white/10 border-y border-white/10 [--logo-scale:0.7] md:mt-32 md:[--logo-scale:1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <VelocityMarquee baseVelocity={-1.5} className="py-8 md:py-10">
          {marqueeA.map((l) => (
            <span key={l.name} className="flex h-16 items-center px-8 md:px-14">
              <LogoMark logo={l} className="opacity-90 transition-opacity duration-300 hover:opacity-100" />
            </span>
          ))}
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={1.5} className="py-8 md:py-10">
          {marqueeB.map((l) => (
            <span key={l.name} className="flex h-16 items-center px-8 md:px-14">
              <LogoMark logo={l} className="opacity-45 transition-opacity duration-300 hover:opacity-100" />
            </span>
          ))}
        </VelocityMarquee>
      </motion.div>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: mbbThisYear, label: 'Placements at McKinsey, Bain & BCG this year' },
    { value: big4Total, label: 'Placements at the Big 4' },
    { value: companyTotal, suffix: '+', label: 'Top firms, funds & companies' },
  ]
  return (
    <section className="bg-ink pb-32 pt-24 text-paper md:pb-44">
      <div className="mx-auto grid max-w-[1600px] gap-y-14 px-6 md:grid-cols-3 md:px-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.12}>
            <div className="border-t border-white/15 pt-6 md:pr-10">
              <p className="font-serif text-8xl leading-none tracking-tight md:text-[9rem]">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-5 max-w-[16rem] text-paper/60">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Featured() {
  const groups = [
    { key: 'mbb', title: 'The Big 3', sub: 'Strategy consulting', items: featured.mbb, cols: 'md:grid-cols-3' },
    { key: 'big4', title: 'The Big 4', sub: 'Professional services', items: featured.big4, cols: 'md:grid-cols-4' },
  ]

  return (
    <section className="bg-paper py-32 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="label text-stone md:col-span-3">Placements</p>
          <SplitText
            as="h2"
            inView
            stagger={0.04}
            text="Our members develop into consultants at firms that set the bar."
            italicWords={['bar']}
            className="font-serif text-5xl leading-[1] tracking-tight md:col-span-9 md:text-7xl"
          />
        </div>

        {groups.map((g) => (
          <div key={g.key} className="mt-24">
            <Reveal>
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
                <h3 className="font-serif text-3xl italic">{g.title}</h3>
                <span className="label text-stone">{g.sub}</span>
              </div>
            </Reveal>
            <div className={`grid ${g.cols}`}>
              {g.items.map((f, i) => (
                <Reveal key={f.short} delay={i * 0.1}>
                  <div className="group relative overflow-hidden border-b border-ink/15 px-2 py-10 md:border-r md:px-8 md:py-14 md:last:border-r-0">
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-garnet transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
                    <div className="relative transition-colors duration-500 group-hover:text-paper">
                      <span className="label text-stone transition-colors duration-500 group-hover:text-paper/60">
                        {f.name}
                      </span>
                      <p
                        className={`mt-16 font-serif text-7xl leading-none tracking-tight transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 ${
                          g.key === 'big4' ? 'md:text-6xl xl:text-7xl' : 'md:text-8xl'
                        }`}
                      >
                        {f.short}
                      </p>
                      <div className="mt-10 h-px w-full bg-ink/10 transition-colors duration-500 group-hover:bg-paper/20">
                        <motion.div
                          className="h-px bg-garnet transition-colors duration-500 group-hover:bg-paper"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.6, delay: 0.3 + i * 0.1, ease: easeOut }}
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-24">
          <Reveal>
            <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
              <h3 className="font-serif text-3xl italic">Boutique consulting</h3>
              <span className="label text-stone">Specialist &amp; boutique firms</span>
            </div>
          </Reveal>
          <motion.ul
            className="grid grid-cols-2 gap-px border-b border-ink/15 bg-ink/15 md:grid-cols-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ staggerChildren: 0.05 }}
          >
            {boutique.map((name) => (
              <motion.li
                key={name}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
                }}
                className="group relative overflow-hidden bg-paper px-4 py-10 md:px-6"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
                <p className="relative font-serif text-2xl leading-tight transition-colors duration-500 group-hover:text-paper md:text-3xl">
                  {name}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

function Directory() {
  const [active, setActive] = useState<Category | 'All'>('All')
  const tabs: (Category | 'All')[] = ['All', ...categories]
  const visible = active === 'All' ? firms : firms.filter((f) => f.category === active)

  return (
    <section className="bg-ink py-32 text-paper md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="label mb-6 text-stone">Beyond consulting</p>
            <SplitText
              as="h2"
              inView
              text="Wall Street to Hollywood."
              italicWords={['Hollywood']}
              className="font-serif text-5xl leading-[1] tracking-tight md:text-7xl"
            />
          </div>
          <Reveal>
            <p className="max-w-sm text-paper/60">
              The consulting toolkit travels. Our alumni lead at elite banks, funds, tech companies, iconic brands, and
              the world&rsquo;s top graduate programs.
            </p>
          </Reveal>
        </div>

        <LayoutGroup>
          <div className="mt-16 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`relative rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
                  active === t ? 'text-ink' : 'text-paper/60 hover:text-paper'
                }`}
              >
                {active === t && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-paper"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>

          <motion.ul layout className="mt-14 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((f, i) => (
                <motion.li
                  key={f.name}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.02, ease: easeOut } }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                  className="group relative flex min-h-[8.5rem] flex-col justify-between overflow-hidden border-b border-white/10 p-6 sm:border-r"
                >
                  <span className="absolute inset-0 translate-y-full bg-white/[0.04] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
                  <div className="relative flex items-center justify-between">
                    <span className="label text-paper/35">{f.category}</span>
                  </div>
                  <p className="relative mt-6 font-serif text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-1.5">
                    {f.name}
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  )
}

function Development() {
  const items = [
    {
      title: 'Case training',
      body: 'Weekly case interview practice with members who have been through recruiting — from market sizing drills to full partner-style mock interviews.',
    },
    {
      title: 'Workshops & resources',
      body: 'Resume reviews, networking workshops, and a curated library of casebooks, frameworks, and firm-specific prep.',
    },
    {
      title: 'Firm partnerships',
      body: 'Coffee chats, info sessions, and recruiting events with the firms our members want to join.',
    },
    {
      title: 'Alumni network',
      body: 'A distinguished network of GCC alumni across top consultancies, banks, and companies who mentor, refer, and open doors.',
    },
  ]

  return (
    <section className="bg-paper py-32 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="label mb-6 text-stone">How we develop members</p>
            <SplitText
              as="h2"
              inView
              text="From first case to signed offer."
              italicWords={['offer']}
              className="font-serif text-5xl leading-[1] tracking-tight md:text-7xl"
            />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {items.map((it, i) => (
            <Reveal key={it.title} y={50}>
              <div className="group border-t border-ink/15 py-12">
                <div className="flex items-baseline gap-6">
                  <span className="font-serif text-2xl italic text-garnet">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-4xl transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                      {it.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink/60">{it.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonial() {
  return (
    <section className="bg-paper-2 py-32 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <p className="label mb-10 flex items-center gap-3 text-garnet">
            <span className="h-2 w-2 rounded-full bg-garnet" />
            Alumni perspective
          </p>
        </Reveal>
        <ScrollWords
          text="“GCC has successfully placed members into McKinsey, Bain, and other top consulting firms. Being an active member is the best way students can ensure they are prepared to compete with students from top universities across the country for these positions.”"
          className="max-w-6xl font-serif text-3xl leading-[1.15] tracking-tight md:text-6xl"
        />
        <Reveal className="mt-14 flex items-center gap-5">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-ink font-serif text-xl italic text-paper">
            MK
          </span>
          <div>
            <p className="font-medium">Mark Kingsmore</p>
            <p className="text-sm text-ink/60">Associate Partner, McKinsey &amp; Company</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
