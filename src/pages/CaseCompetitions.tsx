import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
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
      <Hero />
      <Gallery />
      <Beyond />
      <HostedIntro />
      <SoutheastCase />
      <Summit />
      <Boeing />
      <Footer />
    </PageTransition>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const stackY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  const fan = [
    { src: international[4].image, rotate: -14, x: -150, y: 30, depth: 10 },
    { src: international[3].image, rotate: -6, x: -60, y: -20, depth: 18 },
    { src: international[1].image, rotate: 5, x: 50, y: 10, depth: 26 },
    { src: international[0].image, rotate: 12, x: 140, y: -30, depth: 34 },
  ]

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="grain relative overflow-hidden bg-ink pb-32 pt-40 text-paper md:pb-40 md:pt-48"
    >
      <div className="relative mx-auto grid max-w-[1600px] items-center gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <motion.p
            className="label mb-8 text-paper/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Pillar 02 — Case competitions
          </motion.p>
          <h1 className="font-serif text-[15vw] leading-[0.86] tracking-[-0.03em] md:text-[8.5vw]">
            <SplitText text="Competing on" delay={0.75} />
            <br />
            <SplitText text="the world stage." delay={0.9} className="italic text-garnet-bright" />
          </h1>
          <motion.p
            className="mt-10 max-w-lg text-lg leading-relaxed text-paper/70"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: easeOut }}
          >
            From Bergen to Hong Kong to Sydney, GCC teams go head-to-head with the world&rsquo;s top business schools —
            and bring home trophies. At home, we host competitions of our own alongside McKinsey, KPMG, EY, and Boeing.
          </motion.p>
        </div>

        <motion.div
          className="overflow-hidden rounded-2xl md:hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: easeOut }}
        >
          <img src={international[0].image} alt={international[0].imageAlt} className="aspect-[4/3] w-full object-cover" />
        </motion.div>

        <motion.div
          style={{ y: stackY }}
          className="relative hidden h-[460px] md:col-span-5 md:block"
        >
          {fan.map((f, i) => (
            <FanCard key={f.src} {...f} index={i} sx={sx} sy={sy} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FanCard({
  src,
  rotate,
  x,
  y,
  depth,
  index,
  sx,
  sy,
}: {
  src: string
  rotate: number
  x: number
  y: number
  depth: number
  index: number
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  const px = useTransform(sx, (v) => x + v * depth)
  const py = useTransform(sy, (v) => y + v * depth)
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -ml-[130px] -mt-[170px] h-[340px] w-[260px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
      style={{ x: px, y: py, zIndex: index }}
      initial={{ rotate: 0, scale: 0.6, opacity: 0 }}
      animate={{ rotate, scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 1 + index * 0.12 }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
    </motion.div>
  )
}

function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [current, setCurrent] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(international.length - 1, Math.floor(v * international.length)))
  })

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
    }, 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <section ref={ref} className="relative h-[450vh] bg-ink text-paper">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-[1600px] items-end justify-between px-6 md:px-10">
          <h2 className="label text-stone">International circuit</h2>
          <div className="hidden items-center gap-6 md:flex">
            <span className="label tabular-nums text-paper/60">
              {String(current + 1).padStart(2, '0')} / {String(international.length).padStart(2, '0')}
            </span>
            <div className="h-px w-48 bg-white/15">
              <motion.div style={{ width: bar }} className="h-px bg-garnet-bright" />
            </div>
          </div>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 pl-6 pr-[12vw] md:gap-8 md:pl-10">
          {international.map((c, i) => (
            <article key={c.slug} className="group w-[82vw] shrink-0 md:w-[40vw]">
              <div className="relative h-[46svh] overflow-hidden rounded-[22px]">
                <img
                  src={c.image}
                  alt={c.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                {c.result && (
                  <span
                    className={`label absolute left-5 top-5 rounded-full px-4 py-2 ${
                      c.result.startsWith('1st') ? 'bg-garnet text-paper' : 'bg-paper text-ink'
                    }`}
                  >
                    ★ {c.result}
                  </span>
                )}
                <span className="label absolute bottom-5 right-5 text-paper/80">{c.coords}</span>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <p className="label text-paper/40">
                    {String(i + 1).padStart(2, '0')} · {c.city}, {c.country}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{c.name}</h3>
                  <p className="mt-2 text-sm text-paper/55">{c.host}</p>
                </div>
                {c.sponsor === 'HSBC' && (
                  <div className="shrink-0 pt-1 text-right">
                    <p className="label mb-2 text-paper/40">Sponsored by</p>
                    <LogoMark logo={logos.hsbc} tone="color" className="ml-auto rounded bg-paper px-2 py-1.5" />
                  </div>
                )}
              </div>
            </article>
          ))}
        </motion.div>
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
