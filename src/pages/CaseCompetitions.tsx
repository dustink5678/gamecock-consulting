import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
import Globe, { globeCities, thetaFor, tiltFor } from '../components/Globe'
import LogoMark from '../components/LogoMark'
import PageTransition from '../components/PageTransition'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import VelocityMarquee from '../components/VelocityMarquee'
import { alsoCompeted, international } from '../data/competitions'
import { logos } from '../data/logos'
import { asset } from '../lib/asset'
import { easeOut } from '../lib/motion'

const photo = (file: string) => asset(`images/competitions/${file}`)

export default function CaseCompetitions() {
  return (
    <PageTransition>
      <GlobeTour />
      <Beyond />
      <HostedIntro />
      <SoutheastCase />
      <Summit />
      <Boeing />
      <Footer />
    </PageTransition>
  )
}

const home = globeCities.find((c) => c.home)!
const tourStops = [
  { theta: 0.7, tilt: 0.38, zoom: 1 },
  ...international.map((c) => {
    const city = globeCities.find((g) => g.name === c.city)!
    return { theta: thetaFor(city.lon), tilt: tiltFor(city.lat) * 0.85, zoom: 1.32 }
  }),
]

function GlobeTour() {
  const ref = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)
  const n = tourStops.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const input = tourStops.flatMap((_, i) => [i === 0 ? 0 : (i - 0.25) / n + 0.5 / n, i === n - 1 ? 1 : (i + 0.25) / n + 0.5 / n])
  const at = (key: 'theta' | 'tilt' | 'zoom') => tourStops.flatMap((s) => [s[key], s[key]])

  const spring = { stiffness: 70, damping: 20, mass: 0.6 }
  const theta = useSpring(useTransform(scrollYProgress, input, at('theta')), spring)
  const tilt = useSpring(useTransform(scrollYProgress, input, at('tilt')), spring)
  const zoom = useSpring(useTransform(scrollYProgress, input, at('zoom')), spring)
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStep(Math.min(n - 1, Math.max(0, Math.floor(v * n))))
  })

  const c = step > 0 ? international[step - 1] : null

  return (
    <section ref={ref} className="relative bg-ink text-paper" style={{ height: `${n * 90 + 40}vh` }}>
      <div className="grain sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="relative mx-auto grid w-full max-w-[1600px] flex-1 grid-rows-[auto_1fr] items-center gap-4 px-6 pb-6 pt-24 md:grid-cols-12 md:grid-rows-1 md:gap-10 md:px-10 md:pt-28">
          <div className="relative order-2 md:order-1 md:col-span-8">
            <AnimatePresence mode="wait">
              {c ? (
                <motion.article
                  key={c.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: easeOut }}
                >
                  <motion.div
                    className="relative w-full max-w-[calc(38svh*var(--frame))] overflow-hidden rounded-[22px] md:max-w-[calc(52svh*var(--frame))]"
                    style={{ aspectRatio: c.frame, '--frame': c.frame } as CSSProperties}
                    initial={{ clipPath: 'inset(12% 12% 12% 12% round 22px)' }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0% round 22px)' }}
                    transition={{ duration: 0.9, ease: easeOut }}
                  >
                    <motion.img
                      src={c.image}
                      alt={c.imageAlt}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: c.focus }}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: easeOut }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    {c.result && (
                      <span
                        className={`label absolute left-4 top-4 rounded-full px-4 py-2 ${
                          c.result.startsWith('1st') ? 'bg-garnet text-paper' : 'bg-paper text-ink'
                        }`}
                      >
                        ★ {c.result}
                      </span>
                    )}
                    <span className="label absolute bottom-4 right-4 text-paper/80">{c.coords}</span>
                  </motion.div>
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div>
                      <p className="label text-paper/45">
                        {String(step).padStart(2, '0')} / {String(n - 1).padStart(2, '0')} · {c.city}, {c.country}
                      </p>
                      <h2 className="mt-3 font-serif text-2xl leading-tight md:text-5xl">{c.name}</h2>
                      <p className="mt-2 text-sm text-paper/55">{c.host}</p>
                    </div>
                    {c.sponsor === 'HSBC' && (
                      <div className="shrink-0 pt-1 text-right">
                        <p className="label mb-2 text-paper/40">Sponsored by</p>
                        <LogoMark logo={logos.hsbc} tone="color" className="ml-auto rounded bg-paper px-2 py-1.5" />
                      </div>
                    )}
                  </div>
                </motion.article>
              ) : (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: easeOut }}
                >
                  <p className="label mb-6 text-paper/50 md:mb-10 md:text-sm">Pillar 02 — Case competitions</p>
                  <h1 className="font-serif text-[13vw] leading-[0.88] tracking-[-0.03em] md:text-[min(10vw,18vh)]">
                    <SplitText text="Competing on" delay={0.75} />
                    <br />
                    <SplitText text="the world stage." delay={0.9} className="italic text-garnet-bright" />
                  </h1>
                  <motion.p
                    className="mt-6 max-w-3xl leading-relaxed text-paper/70 md:mt-10 md:text-2xl"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease: easeOut }}
                  >
                    From Bergen to Hong Kong to Sydney, GCC teams go head-to-head with the world&rsquo;s top business
                    schools — and bring home trophies. At home, we host competitions of our own alongside McKinsey,
                    KPMG, EY, and Boeing.
                  </motion.p>
                  <motion.p
                    className="label mt-8 flex items-center gap-3 text-paper/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    <motion.span
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      ↓
                    </motion.span>
                    Scroll to travel the circuit
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="order-1 mx-auto w-[78vw] max-w-[620px] md:order-2 md:col-span-4 md:w-full"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.8, ease: easeOut }}
          >
            <Globe
              theta={theta}
              tilt={tilt}
              zoom={zoom}
              active={c ? c.city : null}
              className="mx-auto max-h-[34svh] w-full text-paper md:max-h-[72svh]"
            />
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-6 md:px-10 md:pb-8">
          <div className="h-px w-full bg-white/10">
            <motion.div style={{ width: bar }} className="h-px bg-garnet-bright" />
          </div>
          <ol className="mt-4 hidden grid-cols-6 md:grid">
            {[home.name, ...international.map((x) => x.city)].map((name, i) => (
              <li
                key={`${name}-${i}`}
                className={`label transition-colors duration-500 ${i === step ? 'text-paper' : 'text-paper/35'}`}
              >
                <span className={i === step ? 'text-garnet-bright' : ''}>{String(i).padStart(2, '0')}</span> {name}
                {i > 0 && international[i - 1].result ? ` · ${international[i - 1].result}` : ''}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Beyond() {
  const places = ['Norway', 'Ireland', 'Hong Kong', 'Australia', 'Canada', 'Spain', 'Germany']
  return (
    <section className="bg-ink pb-32 text-paper md:pb-44">
      <div className="mx-auto max-w-[1600px] px-6 pt-10 md:px-10">
        <Reveal>
          <p className="max-w-5xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
            Plus competitions in{' '}
            {alsoCompeted.map((p, i) => (
              <span key={p}>
                <span className={p === 'and more' ? '' : 'italic text-garnet-bright'}>{p}</span>
                {i < alsoCompeted.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
      <div className="mt-20 border-y border-white/10 py-6">
        <VelocityMarquee baseVelocity={-1.2}>
          {places.map((p) => (
            <span key={p} className="flex items-center">
              <span className="label px-10 text-paper/60">{p}</span>
              <span className="text-garnet-bright">✦</span>
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  )
}

function HostedIntro() {
  return (
    <section className="bg-paper pb-10 pt-32 md:pt-44">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-6 md:grid-cols-12 md:px-10">
        <p className="label text-stone md:col-span-3">Hosted by GCC</p>
        <div className="md:col-span-9">
          <SplitText
            as="h2"
            inView
            stagger={0.05}
            text="We don't just compete. We host."
            italicWords={['host']}
            className="font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink/65">
              GCC runs case competitions on campus with the world&rsquo;s leading firms — bringing consultants,
              sponsors, and the Southeast&rsquo;s top business students to Columbia.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function SoutheastCase() {
  const schools = ['Duke', 'UNC', 'Elon', 'Wake Forest', 'NC State']
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <h3 className="font-serif text-5xl leading-[1] tracking-tight md:text-6xl">
                McKinsey Southeast Case Competition
              </h3>
              <div className="mt-8">
                <LogoMark logo={logos.mckinsey} tone="dark" />
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-8 border-t border-ink/15 pt-8">
              <Reveal>
                <p className="font-serif text-7xl leading-none md:text-8xl">
                  <Counter value={17} />
                </p>
                <p className="mt-3 text-sm text-ink/60">McKinsey Charlotte representatives welcomed</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-serif text-7xl leading-none md:text-8xl">
                  <Counter value={5} />
                </p>
                <p className="mt-3 text-sm text-ink/60">Schools from across the Southeast</p>
              </Reveal>
            </div>

            <motion.ul
              className="mt-10 flex flex-wrap gap-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ staggerChildren: 0.08 }}
            >
              {schools.map((s) => (
                <motion.li
                  key={s}
                  variants={{
                    hidden: { opacity: 0, y: 16, scale: 0.9 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: easeOut } },
                  }}
                  className="rounded-full border border-ink/15 bg-paper-2 px-4 py-2 text-sm transition-colors hover:border-garnet hover:bg-garnet hover:text-paper"
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="grid grid-cols-6 gap-4 md:col-span-7">
            <ParallaxImage
              src={photo('mscc-group.jpg')}
              alt="Competitors and McKinsey representatives at the McKinsey Southeast Case Competition"
              className="col-span-6 aspect-[4/3] rounded-[22px]"
              speed={8}
            />
            <ParallaxImage
              src={photo('mscc-presenter.jpg')}
              alt="A competitor presenting at the Southeast Case Competition"
              className="col-span-3 aspect-[4/5] rounded-[22px] md:mt-[-12%]"
              speed={14}
              position="40% center"
              delay={0.1}
            />
            <ParallaxImage
              src={photo('mscc-audience.jpg')}
              alt="Audience watching final presentations"
              className="col-span-3 aspect-[4/5] rounded-[22px] md:mt-[6%]"
              speed={14}
              delay={0.2}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Summit() {
  return (
    <section className="bg-paper-2 py-32 md:py-44">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 md:grid-cols-12 md:px-10">
        <ParallaxImage
          src={photo('darla-moore-summit.jpg')}
          alt="GCC members at the Darla Moore School of Business Consulting Summit"
          className="aspect-[16/10] rounded-[22px] md:col-span-7"
          speed={8}
        />
        <div className="md:col-span-5">
          <Reveal>
            <p className="label mb-6 text-stone">Hosted · Case competition &amp; conference</p>
            <h3 className="font-serif text-5xl leading-[1] tracking-tight md:text-6xl">
              Darla Moore <span className="italic">Consulting Summit</span>
            </h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
              A full day of case competition and conference programming at the Darla Moore School of Business —
              connecting students directly with leading firms.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
              <div className="flex items-center justify-between gap-6 py-6">
                <span className="label text-stone">In partnership with</span>
                <LogoMark logo={logos.mckinsey} tone="dark" />
              </div>
              <div className="flex items-center justify-between gap-6 py-6">
                <span className="label text-stone">Sponsored by</span>
                <div className="flex items-center gap-8">
                  <LogoMark logo={logos.kpmg} tone="dark" />
                  <LogoMark logo={{ ...logos.ey, h: 44 }} tone="dark" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Boeing() {
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-paper md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <Reveal>
            <p className="label mb-6 text-stone">On campus · Industry case</p>
            <h3 className="font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl">
              Boeing Case <span className="italic text-garnet-bright">Competition</span>
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <LogoMark logo={{ ...logos.boeing, h: 40 }} />
              <p className="max-w-sm text-paper/60 md:text-right">
                Teams tackled a real Boeing business challenge and pitched their recommendations to a panel of industry
                judges.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-12">
          <ParallaxImage
            src={photo('boeing-presentation.jpg')}
            alt="Students presenting their Boeing case recommendation"
            className="aspect-[4/3] rounded-[22px] md:col-span-8"
            speed={8}
          />
          <ParallaxImage
            src={photo('boeing-judges.jpg')}
            alt="The judging panel at the Boeing Case Competition"
            className="aspect-[4/3] rounded-[22px] md:col-span-4 md:aspect-auto"
            speed={12}
            delay={0.15}
          />
        </div>
      </div>
    </section>
  )
}
