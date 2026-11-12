import { createContext, useCallback, useContext, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

type Curtain = { label: string; color: string }

const defaultCurtain: Curtain = { label: 'Gamecock Consulting', color: '#73000a' }

const TransitionContext = createContext<{
  curtain: Curtain
  setCurtain: (c: Curtain) => void
}>({ curtain: defaultCurtain, setCurtain: () => {} })

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [curtain, setCurtainState] = useState(defaultCurtain)
  const setCurtain = useCallback((c: Curtain) => setCurtainState(c), [])
  return (
    <TransitionContext.Provider value={{ curtain, setCurtain }}>{children}</TransitionContext.Provider>
  )
}

export const useCurtain = () => useContext(TransitionContext)

type TransitionLinkProps = LinkProps & {
  label?: string
  color?: string
}

export function TransitionLink({ label, color, onClick, to, ...rest }: TransitionLinkProps) {
  const { setCurtain } = useCurtain()
  const location = useLocation()
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof to === 'string' && to === location.pathname) {
      e.preventDefault()
      return
    }
    setCurtain({ label: label ?? defaultCurtain.label, color: color ?? defaultCurtain.color })
    onClick?.(e)
  }
  return <Link to={to} onClick={handleClick} {...rest} />
}
