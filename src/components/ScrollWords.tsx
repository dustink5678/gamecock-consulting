import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useRef } from 'react'

function Word({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  )
}

export default function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length
        return (
          <Word key={i} word={word} progress={scrollYProgress} range={[start, start + 1 / words.length]} />
        )
      })}
    </p>
  )
}
