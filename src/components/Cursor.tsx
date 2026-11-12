import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.documentElement.classList.add('hide-native-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor]')
      setHovering(!!target)
      setLabel(target?.dataset.cursor ?? null)
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('hide-native-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  const size = label ? 96 : hovering ? 48 : 12

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-paper mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="label text-[0.6rem] text-ink"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  )
}
