import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, Play } from 'lucide-react'
import { BuilderFigure } from './BuilderFigure'
import { useStoryMotion } from './useStoryMotion'
import type { Audience } from '../../data/demo'

function ProjectProgress({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [status, setStatus] = useState(0)
  useEffect(() => {
    if (!active || reduced) return
    const first = window.setTimeout(() => setStatus(1), 1000)
    const second = window.setTimeout(() => setStatus(2), 2400)
    return () => { window.clearTimeout(first); window.clearTimeout(second) }
  }, [active, reduced])
  const current = reduced ? 2 : status
  return <div className="micro-status"><motion.span key={current} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}>{current === 2 && <Check size={11} />}{['Accepted', 'In progress', 'Submitted'][current]}</motion.span><small>{current === 2 ? 'Proof added to profile' : 'One small step forward'}</small></div>
}

export function FoundSeamScene({ step, mode }: { step: number; mode: Audience }) {
  const { ref, progress, reduced, active } = useStoryMotion()
  const y = useTransform(progress, [0, .65], [30, 0])
  const opacity = useTransform(progress, [0, .5], [.35, 1])
  return <figure className="found-scene" ref={ref} data-step={step}><span className="found-caption">THE SAME AMBITION. A CLEARER NEXT STEP.</span><motion.div className="confident-builder" style={{ y: reduced ? 0 : y, opacity: reduced ? 1 : opacity }}><BuilderFigure mood="confident" /></motion.div><AnimatePresence mode="wait"><motion.div key={step} className="found-story-fragments" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .3 }}>
    {step === 0 && <><div className="intro-fragment"><span className="intro-play"><Play size={16} fill="currentColor" /></span><div><strong>45 sec intro</strong><p>A little more you.</p></div><span className="intro-timeline" /></div><div className="found-skill-tags"><span>React</span><span>Figma</span><span>Product thinking</span></div><div className="found-interest"><span>INTERESTED IN</span><strong>Climate Tech & early teams</strong></div></>}
    {step === 1 && <><div className="micro-project-fragment"><span>MICRO-PROJECT / FORMA</span><strong>Redesign<br />onboarding flow</strong><p>Small scope. Real contribution.</p><ProjectProgress active={active} reduced={reduced} /></div><div className="proof-fragment-note"><Check size={15} />Real work. Now part of your story.</div></>}
    {step === 2 && <><div className="opportunity-fragment primary-opportunity"><span className="mini-startup-mark">F</span><div><strong>Forma</strong><p>Product Design · Climate Tech</p></div><Check size={14} /></div><div className="opportunity-fragment secondary-opportunity"><span className="mini-startup-mark">N</span><div><strong>Novara</strong><p>AI Product Intern · Pre-seed</p></div><ArrowUpRight size={14} /></div><div className="found-fit-note"><span />{mode === 'talent' ? 'Your strengths. The right setting.' : 'Proof, potential and shared ambition.'}</div></>}
  </motion.div></AnimatePresence><figcaption>{['More than a list of past titles.', 'Make potential visible through real work.', 'A clearer direction. A more meaningful fit.'][step]}<small>ILLUSTRATIVE PRODUCT STORY</small></figcaption></figure>
}
