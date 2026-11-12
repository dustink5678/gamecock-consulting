import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { easeInOut } from '../lib/motion'

type Props = {
  src: string
  alt: string
  className?: string
  speed?: number
  position?: string
  delay?: number
}

export default function ParallaxImage({ src, alt, className, speed = 10, position = 'center', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-ink-2 ${className ?? ''}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.3, delay, ease: easeInOut }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, objectPosition: position, top: `-${speed}%`, height: `${100 + speed * 2}%` }}
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 w-full object-cover"
      />
    </motion.div>
  )
}
