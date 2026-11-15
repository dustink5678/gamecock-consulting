import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/** Shared “how an engagement runs” horizontal process — optional for the engagements hub. */
export function Process() {
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
