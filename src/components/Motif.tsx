import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { MotifKind } from '../data/engagements'

type Props = { kind: MotifKind; accent: string; className?: string }

export default function Motif({ kind, accent, className }: Props) {
  if (kind === 'chat') return <Chat accent={accent} className={className} />
  if (kind === 'rig') return <Rig accent={accent} className={className} />
  return <Orbit accent={accent} className={className} />
}

const sparkle = (cx: number, cy: number, r: number) =>
  `M${cx},${cy - r} Q${cx},${cy} ${cx + r},${cy} Q${cx},${cy} ${cx},${cy + r} Q${cx},${cy} ${cx - r},${cy} Q${cx},${cy} ${cx},${cy - r}Z`

const CHAT_LOOP = 8

function appear(at: number) {
  const t = (s: number) => Math.min(s / CHAT_LOOP, 1)
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: [0, 0, 1, 1, 0, 0], y: [10, 10, 0, 0, 0, 0] },
    transition: {
      duration: CHAT_LOOP,
      times: [0, t(at), t(at + 0.45), t(6.9), t(7.4), 1],
      repeat: Infinity,
      ease: 'easeOut' as const,
    },
  }
}

function Bars({ x, y, widths, fill, opacity }: { x: number; y: number; widths: number[]; fill: string; opacity: number }) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * 13} width={w} height={6} rx={3} fill={fill} opacity={opacity} />
      ))}
    </>
  )
}

function Chat({ accent, className }: { accent: string; className?: string }) {
  const reduce = useReducedMotion()
  const stars = [
    { x: 62, y: 96, r: 12, d: 0 },
    { x: 340, y: 70, r: 9, d: 0.8 },
    { x: 350, y: 250, r: 14, d: 1.6 },
    { x: 48, y: 290, r: 8, d: 2.2 },
    { x: 330, y: 345, r: 6, d: 1.1 },
  ]

  return (
    <motion.svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden
      fill="none"
      style={{ transformPerspective: 900 }}
      animate={reduce ? undefined : { rotateY: [-14, 14, -14], rotateX: [4, -4, 4] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    >
      {stars.map((s, i) => (
        <motion.path
          key={i}
          d={sparkle(s.x, s.y, s.r)}
          fill={i % 2 ? 'currentColor' : accent}
          animate={{ scale: [0.4, 1, 0.4], opacity: [0.2, 1, 0.2], rotate: [0, 90, 180] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}

      <rect x={110} y={28} width={180} height={344} rx={30} stroke="currentColor" strokeWidth={1.6} opacity={0.85} />
      <rect x={176} y={40} width={48} height={10} rx={5} fill="currentColor" opacity={0.6} />
      <rect x={176} y={356} width={48} height={4} rx={2} fill="currentColor" opacity={0.4} />

      <path d={sparkle(138, 72, 9)} fill={accent} />
      <rect x={154} y={69} width={54} height={6} rx={3} fill="currentColor" opacity={0.6} />
      <line x1={124} y1={92} x2={276} y2={92} stroke="currentColor" strokeOpacity={0.2} />

      <motion.g {...appear(0.3)}>
        <rect x={172} y={106} width={100} height={38} rx={14} stroke="currentColor" strokeWidth={1.4} />
        <Bars x={184} y={116} widths={[74, 46]} fill="currentColor" opacity={0.5} />
      </motion.g>

      <motion.g {...appear(1.4)}>
        <rect x={128} y={154} width={116} height={52} rx={14} fill={accent} />
        <Bars x={140} y={164} widths={[88, 72, 52]} fill="#ffffff" opacity={0.8} />
      </motion.g>

      <motion.g {...appear(2.7)}>
        <rect x={196} y={218} width={76} height={26} rx={13} stroke="currentColor" strokeWidth={1.4} />
        <Bars x={208} y={228} widths={[50]} fill="currentColor" opacity={0.5} />
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={{
          duration: CHAT_LOOP,
          times: [0, 3.4 / CHAT_LOOP, 3.6 / CHAT_LOOP, 4.5 / CHAT_LOOP, 4.6 / CHAT_LOOP, 1],
          repeat: Infinity,
        }}
      >
        <rect x={128} y={256} width={54} height={26} rx={13} fill={accent} />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={143 + i * 12}
            cy={269}
            r={3.5}
            fill="#ffffff"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.g>

      <motion.g {...appear(4.6)}>
        <rect x={128} y={256} width={128} height={40} rx={14} fill={accent} />
        <Bars x={140} y={266} widths={[100, 64]} fill="#ffffff" opacity={0.8} />
      </motion.g>

      <rect x={126} y={316} width={148} height={26} rx={13} stroke="currentColor" strokeOpacity={0.4} strokeWidth={1.2} />
      <rect x={140} y={326} width={56} height={6} rx={3} fill="currentColor" opacity={0.25} />
      <circle cx={260} cy={329} r={8} fill={accent} />
    </motion.svg>
  )
}

type Vec = [number, number, number]
type Layer = 'water' | 'sub' | 'main' | 'accent'

function buildRig() {
  const edges: { a: Vec; b: Vec; layer: Layer }[] = []
  const add = (a: Vec, b: Vec, layer?: Layer) =>
    edges.push({ a, b, layer: layer ?? ((a[1] + b[1]) / 2 < 0 ? 'sub' : 'main') })
  const lerp = (a: Vec, b: Vec, t: number): Vec => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]

  const tower = (base: Vec[], top: Vec[], levels: number, layer?: Layer) => {
    const rings = Array.from({ length: levels + 1 }, (_, i) => base.map((p, k) => lerp(p, top[k], i / levels)))
    rings.forEach((ring, i) => {
      ring.forEach((p, k) => add(p, ring[(k + 1) % 4], layer))
      if (i === 0) return
      const prev = rings[i - 1]
      ring.forEach((p, k) => {
        add(prev[k], p, layer)
        add(prev[k], ring[(k + 1) % 4], layer)
        add(prev[(k + 1) % 4], p, layer)
      })
    })
  }
  const square = (cx: number, y: number, cz: number, h: number): Vec[] => [
    [cx - h, y, cz - h],
    [cx + h, y, cz - h],
    [cx + h, y, cz + h],
    [cx - h, y, cz + h],
  ]
  const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, layer?: Layer) => {
    const c = (y: number): Vec[] => [
      [x0, y, z0],
      [x1, y, z0],
      [x1, y, z1],
      [x0, y, z1],
    ]
    const lo = c(y0)
    const hi = c(y1)
    lo.forEach((p, k) => {
      add(p, lo[(k + 1) % 4], layer)
      add(hi[k], hi[(k + 1) % 4], layer)
      add(p, hi[k], layer)
    })
  }

  tower(square(0, -1.05, 0, 0.62), square(0, 0.3, 0, 0.36), 3)
  box(-0.62, 0.62, 0.3, 0.42, -0.5, 0.5, 'main')
  box(-0.5, 0.1, 0.42, 0.66, -0.42, 0.12, 'main')
  box(0.12, 0.5, 0.42, 0.56, -0.42, -0.1, 'main')
  tower(square(-0.2, 0.66, -0.15, 0.13), square(-0.2, 1.48, -0.15, 0.03), 4, 'accent')

  const pad: Vec[] = Array.from({ length: 8 }, (_, i) => {
    const t = (i / 8) * Math.PI * 2
    return [0.34 + Math.cos(t) * 0.22, 0.6, 0.28 + Math.sin(t) * 0.22]
  })
  pad.forEach((p, i) => add(p, pad[(i + 1) % 8], 'accent'))
  add([0.24, 0.6, 0.2], [0.24, 0.6, 0.36], 'accent')
  add([0.44, 0.6, 0.2], [0.44, 0.6, 0.36], 'accent')
  add([0.24, 0.6, 0.28], [0.44, 0.6, 0.28], 'accent')
  add([0.34, 0.6, 0.28], [0.34, 0.42, 0.28], 'main')

  add([0.42, 0.56, -0.3], [0.42, 0.8, -0.3], 'main')
  add([0.42, 0.8, -0.3], [1.02, 1.12, -0.62], 'main')
  add([0.42, 0.74, -0.3], [1.02, 1.12, -0.62], 'main')
  add([1.02, 1.12, -0.62], [1.02, 0.7, -0.62], 'main')

  add([-0.62, 0.42, 0.4], [-1.08, 0.98, 0.62], 'main')
  add([-0.62, 0.34, 0.3], [-1.08, 0.98, 0.62], 'main')

  for (const r of [0.95, 1.4]) {
    const n = 48
    for (let i = 0; i < n; i++) {
      const t0 = (i / n) * Math.PI * 2
      const t1 = ((i + 1) / n) * Math.PI * 2
      add([Math.cos(t0) * r, 0, Math.sin(t0) * r], [Math.cos(t1) * r, 0, Math.sin(t1) * r], 'water')
    }
  }
  return edges
}

const RIG = buildRig()
const FLARE: Vec = [-1.08, 1.02, 0.62]

function Rig({ accent, className }: { accent: string; className?: string }) {
  const reduce = useReducedMotion()
  const paths = useRef<Partial<Record<Layer, SVGPathElement | null>>>({})
  const flare = useRef<SVGGElement>(null)

  useEffect(() => {
    const tilt = 0.3
    const project = ([x, y, z]: Vec, theta: number) => {
      const cx = x * Math.cos(theta) + z * Math.sin(theta)
      const cz = -x * Math.sin(theta) + z * Math.cos(theta)
      const yy = y - 0.2
      const py = yy * Math.cos(tilt) - cz * Math.sin(tilt)
      const pz = yy * Math.sin(tilt) + cz * Math.cos(tilt)
      const s = 5 / (5 - pz)
      return [200 + cx * s * 128, 205 - py * s * 128] as const
    }
    const draw = (theta: number) => {
      const d: Record<Layer, string> = { water: '', sub: '', main: '', accent: '' }
      for (const e of RIG) {
        const [ax, ay] = project(e.a, theta)
        const [bx, by] = project(e.b, theta)
        d[e.layer] += `M${ax.toFixed(1)},${ay.toFixed(1)}L${bx.toFixed(1)},${by.toFixed(1)}`
      }
      for (const k of Object.keys(d) as Layer[]) paths.current[k]?.setAttribute('d', d[k])
      const [fx, fy] = project(FLARE, theta)
      flare.current?.setAttribute('transform', `translate(${fx.toFixed(1)} ${fy.toFixed(1)})`)
    }

    if (reduce) {
      draw(0.6)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      draw(0.6 + ((now - start) / 1000) * 0.32)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  const set = (k: Layer) => (el: SVGPathElement | null) => {
    paths.current[k] = el
  }

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none" strokeLinecap="round">
      <path ref={set('water')} stroke={accent} strokeOpacity={0.45} strokeWidth={1.2} strokeDasharray="2 5" />
      <path ref={set('sub')} stroke="currentColor" strokeOpacity={0.28} strokeWidth={1.1} />
      <path ref={set('main')} stroke="currentColor" strokeOpacity={0.85} strokeWidth={1.3} />
      <path ref={set('accent')} stroke={accent} strokeWidth={1.5} />
      <g ref={flare}>
        <motion.circle
          r={6}
          fill={accent}
          animate={{ scale: [1, 1.5, 1], opacity: [0.9, 0.5, 0.9] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <circle r={2.5} fill="currentColor" />
      </g>
    </svg>
  )
}

function Orbit({ accent, className }: { accent: string; className?: string }) {
  const rings = [0, 60, 120]
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none">
      {[60, 110, 160].map((r, i) => (
        <circle key={r} cx={200} cy={200} r={r} stroke="currentColor" strokeOpacity={0.12 + i * 0.05} strokeDasharray="2 6" />
      ))}
      {rings.map((deg, i) => (
        <motion.g
          key={deg}
          style={{ transformOrigin: '200px 200px' }}
          initial={{ rotate: deg }}
          animate={{ rotate: deg + 360 }}
          transition={{ duration: 14 + i * 4, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse cx={200} cy={200} rx={165} ry={58} stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.5} />
          <circle cx={365} cy={200} r={7} fill={accent} />
        </motion.g>
      ))}
      <motion.circle
        cx={200}
        cy={200}
        r={26}
        fill={accent}
        animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      <motion.circle
        cx={200}
        cy={200}
        r={26}
        stroke={accent}
        strokeWidth={2}
        animate={{ scale: [1, 3.2], opacity: [0.8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </svg>
  )
}
