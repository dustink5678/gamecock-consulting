import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOut } from '../lib/motion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function Reveal({ children, className, delay = 0, y = 40 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}
