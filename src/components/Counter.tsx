import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Counter({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
