import { AnimatePresence, MotionConfig } from 'framer-motion'
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import { TransitionProvider } from './lib/transition'
import CaseCompetitions from './pages/CaseCompetitions'
import ComingSoon from './pages/ComingSoon'
import EngagementDetail from './pages/EngagementDetail'
import Home from './pages/Home'
import MemberDevelopment from './pages/MemberDevelopment'

function AnimatedRoutes() {
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  const resetScroll = () => {
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }

  // Keep /engagements and /engagements/:slug on one mounted tree so tab switches stay seamless.
  const routeKey = location.pathname.startsWith('/engagements')
    ? '/engagements'
    : location.pathname

  return (
    <AnimatePresence mode="wait" onExitComplete={resetScroll}>
      <Routes location={location} key={routeKey}>
        <Route path="/" element={<Home />} />
        <Route path="/engagements/:slug?" element={<EngagementDetail />} />
        <Route path="/case-competitions" element={<CaseCompetitions />} />
        <Route path="/member-development" element={<MemberDevelopment />} />
        <Route path="*" element={<ComingSoon title="Page not found" blurb="This page doesn't exist — yet." />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <MotionConfig reducedMotion="user">
        <TransitionProvider>
          <Nav />
          <AnimatedRoutes />
          <Cursor />
        </TransitionProvider>
      </MotionConfig>
    </ReactLenis>
  )
}
