import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { useRef } from 'react'

export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.2 })

  const onMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className ?? ''}`}
    >
      {children}
    </motion.div>
  )
}
