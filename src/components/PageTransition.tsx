import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useCurtain } from '../lib/transition'
import { easeInOut } from '../lib/motion'

export default function PageTransition({ children }: { children: ReactNode }) {
  const { curtain } = useCurtain()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.55, ease: easeInOut } }}
        exit={{ opacity: 0, y: -60, transition: { duration: 0.6, ease: easeInOut } }}
      >
        {children}
      </motion.div>

      {/* Exit: curtain rises from the bottom to cover the outgoing page. */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
        style={{ background: curtain.color, transformOrigin: 'bottom' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.65, ease: easeInOut }}
      />

      {/* Enter: curtain lifts away to reveal the incoming page. */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
        style={{ background: curtain.color, transformOrigin: 'top' }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.75, delay: 0.25, ease: easeInOut }}
      >
        <motion.span
          className="font-serif text-5xl italic text-paper md:text-7xl"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: easeInOut }}
        >
          {curtain.label}
        </motion.span>
      </motion.div>
    </>
  )
}
