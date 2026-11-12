import { motion } from 'framer-motion'
import type { ElementType } from 'react'
import { easeOut } from '../lib/motion'

type Props = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  inView?: boolean
  italicWords?: string[]
}

export default function SplitText({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.06,
  inView = false,
  italicWords = [],
}: Props) {
  const words = text.split(' ')
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
    : { animate: 'show' }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${italicWords.includes(word.replace(/[.,]/g, '')) ? 'italic' : ''}`}
              variants={{
                hidden: { y: '110%', rotate: 4 },
                show: { y: '0%', rotate: 0, transition: { duration: 1, ease: easeOut } },
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00a0' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
