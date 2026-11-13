import { useReducedMotion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Vec = [number, number, number]
type City = { name: string; lat: number; lon: number; home?: boolean; below?: boolean }

export const globeCities: City[] = [
  { name: 'Columbia, SC', lat: 34.0, lon: -81.03, home: true, below: true },
  { name: 'Bergen', lat: 60.39, lon: 5.32 },
  { name: 'Dublin', lat: 53.35, lon: -6.26, below: true },
  { name: 'Hong Kong', lat: 22.34, lon: 114.27 },
  { name: 'Sydney', lat: -33.86, lon: 151.21 },
]

/** Rotation that brings a longitude to the front of the globe. */
export const thetaFor = (lon: number) => (-lon * Math.PI) / 180
/** Tilt that brings a latitude near the vertical center. */
export const tiltFor = (lat: number) => (lat * Math.PI) / 180

const R = 138
const C = 200
const DEFAULT_TILT = 0.38

const toVec = (lat: number, lon: number): Vec => {
  const a = (lat * Math.PI) / 180
  const b = (lon * Math.PI) / 180
  return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)]
}

const slerp = (a: Vec, b: Vec, t: number): Vec => {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const w = Math.acos(dot)
  if (w < 1e-4) return a
  const s = Math.sin(w)
  const k1 = Math.sin((1 - t) * w) / s
  const k2 = Math.sin(t * w) / s
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2]
}

function buildGraticule() {
  const lines: Vec[][] = []
  for (let lat = -60; lat <= 60; lat += 30) {
    const line: Vec[] = []
    for (let lon = -180; lon <= 180; lon += 6) line.push(toVec(lat, lon))
    lines.push(line)
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const line: Vec[] = []
    for (let lat = -90; lat <= 90; lat += 6) line.push(toVec(lat, lon))
    lines.push(line)
  }
  return lines
}

function buildArcs() {
  const home = globeCities.find((c) => c.home)!
  const a = toVec(home.lat, home.lon)
  return globeCities
    .filter((c) => !c.home)
    .map((c) => {
      const b = toVec(c.lat, c.lon)
      const angle = Math.acos(a[0] * b[0] + a[1] * b[1] + a[2] * b[2])
      const lift = 0.06 + (angle / Math.PI) * 0.22
      const points = Array.from({ length: 48 }, (_, i) => {
        const t = i / 47
        const p = slerp(a, b, t)
        const h = 1 + lift * Math.sin(Math.PI * t)
        return [p[0] * h, p[1] * h, p[2] * h] as Vec
      })
      return { name: c.name, points }
    })
}

const GRATICULE = buildGraticule()
const ARCS = buildArcs()
const CITY_VECS = globeCities.map((c) => toVec(c.lat, c.lon))

type Props = {
  className?: string
  theta?: MotionValue<number>
  tilt?: MotionValue<number>
  zoom?: MotionValue<number>
  active?: string | null
}

export default function Globe({ className, theta, tilt, zoom, active = null }: Props) {
  const reduce = useReducedMotion()
  const front = useRef<SVGPathElement>(null)
  const back = useRef<SVGPathElement>(null)
  const arcs = useRef<SVGPathElement>(null)
  const activeArc = useRef<SVGPathElement>(null)
  const disc = useRef<SVGCircleElement>(null)
  const rim = useRef<SVGCircleElement>(null)
  const pulses = useRef<(SVGCircleElement | null)[]>([])
  const pins = useRef<(SVGGElement | null)[]>([])
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const draw = (time: number) => {
      const th = theta ? theta.get() : 0.95 - (reduce ? 0 : time * 0.2)
      const tl = tilt ? tilt.get() : DEFAULT_TILT
      const r = R * (zoom ? zoom.get() : 1)
      const cosT = Math.cos(tl)
      const sinT = Math.sin(tl)
      const project = ([x, y, z]: Vec) => {
        const rx = x * Math.cos(th) + z * Math.sin(th)
        const rz = -x * Math.sin(th) + z * Math.cos(th)
        const ry = y * cosT - rz * sinT
        const pz = y * sinT + rz * cosT
        const visible = pz > 0 || rx * rx + ry * ry > 1
        return { x: C + rx * r, y: C - ry * r, z: pz, visible }
      }

      disc.current?.setAttribute('r', r.toFixed(1))
      rim.current?.setAttribute('r', r.toFixed(1))

      let f = ''
      let b = ''
      for (const line of GRATICULE) {
        let prev: ReturnType<typeof project> | null = null
        for (const v of line) {
          const p = project(v)
          if (prev) {
            const seg = `M${prev.x.toFixed(1)},${prev.y.toFixed(1)}L${p.x.toFixed(1)},${p.y.toFixed(1)}`
            if (p.z > 0 && prev.z > 0) f += seg
            else b += seg
          }
          prev = p
        }
      }
      front.current?.setAttribute('d', f)
      back.current?.setAttribute('d', b)

      let a = ''
      let act = ''
      ARCS.forEach((arc, i) => {
        let d = ''
        let pen = false
        for (const v of arc.points) {
          const p = project(v)
          if (!p.visible) {
            pen = false
            continue
          }
          d += `${pen ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`
          pen = true
        }
        if (arc.name === activeRef.current) act = d
        else a += d
        const t = (time * 0.35 + i * 0.27) % 1
        const p = project(arc.points[Math.floor(t * (arc.points.length - 1))])
        const dot = pulses.current[i]
        if (dot) {
          dot.setAttribute('cx', p.x.toFixed(1))
          dot.setAttribute('cy', p.y.toFixed(1))
          dot.setAttribute('opacity', p.visible ? Math.sin(Math.PI * t).toFixed(2) : '0')
        }
      })
      arcs.current?.setAttribute('d', a)
      activeArc.current?.setAttribute('d', act)

      CITY_VECS.forEach((v, i) => {
        const p = project(v)
        const g = pins.current[i]
        if (!g) return
        const isActive = globeCities[i].name === activeRef.current
        const s = isActive ? 1.6 : 1
        g.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(${s})`)
        const base = p.z > 0.05 ? Math.min(1, p.z * 3) : 0
        const dim = activeRef.current && !isActive && !globeCities[i].home ? 0.45 : 1
        g.setAttribute('opacity', (base * dim).toFixed(2))
      })
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      draw(Math.max(0, now - start) / 1000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce, theta, tilt, zoom])

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none" strokeLinecap="round" overflow="visible">
      <defs>
        <radialGradient id="globe-fill" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#a6192e" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#73000a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0b0d10" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle ref={disc} cx={C} cy={C} r={R} fill="url(#globe-fill)" />
      <path ref={back} stroke="currentColor" strokeOpacity={0.07} strokeWidth={0.8} />
      <path ref={front} stroke="currentColor" strokeOpacity={0.28} strokeWidth={0.9} />
      <circle ref={rim} cx={C} cy={C} r={R} stroke="currentColor" strokeOpacity={0.35} strokeWidth={1} />
      <path ref={arcs} stroke="#a6192e" strokeWidth={1.6} strokeDasharray="1 4" />
      <path ref={activeArc} stroke="#a6192e" strokeWidth={2.2} />
      {ARCS.map((_, i) => (
        <circle
          key={i}
          ref={(el) => {
            pulses.current[i] = el
          }}
          r={3.2}
          fill="#f4f1ea"
        />
      ))}
      {globeCities.map((c, i) => (
        <g
          key={c.name}
          ref={(el) => {
            pins.current[i] = el
          }}
        >
          {(c.home || c.name === active) && (
            <circle r={4} fill="none" stroke="#a6192e" strokeWidth={1.2}>
              <animate attributeName="r" values="4;16" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur="2.2s" repeatCount="indefinite" />
            </circle>
          )}
          <circle r={c.home ? 4.5 : 3.5} fill={c.home || c.name === active ? '#a6192e' : '#f4f1ea'} />
          <text
            className="hidden md:inline"
            x={8}
            y={c.below ? 16 : -8}
            fill="currentColor"
            fillOpacity={0.75}
            fontSize={10}
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.08em"
          >
            {c.name.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  )
}
