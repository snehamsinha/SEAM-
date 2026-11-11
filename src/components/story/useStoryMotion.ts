import { useRef, useSyncExternalStore } from 'react'
import { useInView, useReducedMotion, useScroll } from 'framer-motion'

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  const query = window.matchMedia('(max-width: 700px)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const snapshot = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches
export function useStoryMotion() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = !!useReducedMotion()
  const compact = useSyncExternalStore(subscribe, snapshot, () => false)
  const visible = useInView(ref, { amount: .2 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  return { ref, reduced, compact, active: visible && !reduced, progress: scrollYProgress }
}
