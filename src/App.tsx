import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { LandingPage } from './pages/LandingPage'
import { InfoPage } from './pages/InfoPage'
import { Button } from './components/ui/Button'

const TalentApp = lazy(() => import('./pages/talent/TalentApp').then(module => ({ default: module.TalentApp })))

const StartupApp = lazy(() => import('./pages/startup/StartupApp').then(module => ({ default: module.StartupApp })))

function StartupCompatibilityRedirect() {
  const location = useLocation()
  return <Navigate to={`${location.pathname.replace(/^\/startups/, '/startup')}${location.search}${location.hash}`} replace />
}

export default function App() {
  const location = useLocation()
  const reduced = useReducedMotion()
  const startupProduct = location.pathname === '/startup' || location.pathname.startsWith('/startup/') || location.pathname === '/startups' || location.pathname.startsWith('/startups/')
  const talentProduct = location.pathname === '/talent' || location.pathname.startsWith('/talent/')
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        let id = location.hash.slice(1)
        try { id = decodeURIComponent(id) } catch { /* A malformed URL fragment is harmless. */ }
        const element = Array.from(document.querySelectorAll('[id]')).reverse().find(node => node.id === id)
        if (element instanceof HTMLDetailsElement) element.open = true
        element?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' })
      } else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.hash, reduced, startupProduct])
  return <><a className="skip-link" href="#main-content">Skip to content</a>{!talentProduct && !startupProduct && <Navbar />}<AnimatePresence initial={false} mode="sync"><motion.div key={talentProduct ? 'talent-product' : startupProduct ? 'startup-product' : location.pathname} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }} transition={{ duration: reduced ? 0 : .22 }}><Routes location={location}>
    <Route path="/" element={<LandingPage mode="talent" />} />
    <Route path="/talent/*" element={<Suspense fallback={<main id="main-content" className="workspace-loading" role="status">Opening your Talent workspace…</main>}><TalentApp /></Suspense>} />
    <Route path="/for-startups" element={<LandingPage mode="startups" />} />
    <Route path="/startups/*" element={<StartupCompatibilityRedirect />} />
    <Route path="/startup/*" element={<Suspense fallback={<main id="main-content" className="workspace-loading" role="status">Opening your startup workspace…</main>}><StartupApp /></Suspense>} />
    <Route path="/about" element={<InfoPage page="about" />} /><Route path="/privacy" element={<InfoPage page="privacy" />} /><Route path="/terms" element={<InfoPage page="terms" />} />
    <Route path="*" element={<main id="main-content" className="container info-page"><h1>Page not found.</h1><Button to="/">Back to SEAM</Button></main>} />
  </Routes></motion.div></AnimatePresence></>
}
