import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import SplitText from '../components/SplitText'
import { easeOut } from '../lib/motion'
import { TransitionLink } from '../lib/transition'

export default function ComingSoon({ title, blurb }: { title: string; blurb: string }) {
  return (
    <PageTransition>
      <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pb-20 pt-40 text-paper">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
          <p className="label mb-8 text-paper/50">In development</p>
          <h1 className="max-w-[12ch] font-serif text-[14vw] leading-[0.88] tracking-[-0.02em] md:text-[8vw]">
            <SplitText text={title} delay={0.75} />
          </h1>
          <motion.div
            className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: easeOut }}
          >
            <p className="max-w-md text-lg text-paper/65">{blurb}</p>
            <TransitionLink
              to="/engagements"
              label="Engagements"
              className="group inline-flex items-center gap-3 self-start rounded-full border border-white/20 px-6 py-3 text-sm transition-colors hover:bg-paper hover:text-ink"
            >
              View our engagements
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </TransitionLink>
          </motion.div>
        </div>
      </section>
      <Footer />
    </PageTransition>
  )
}
