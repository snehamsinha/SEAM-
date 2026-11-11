import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, FileText, Play } from 'lucide-react'
import { BrandArtwork } from '../brand/BrandLogo'
import { uspTopics } from '../../data/homepage'

function UspVisual({ topic }: { topic: typeof uspTopics[number]['id'] }) {
  const reduced = useReducedMotion()
  if (topic === 'projects') return <div className="usp-project-demo"><motion.div initial={false} animate={{ opacity: reduced ? .7 : [1, 1, .7] }} transition={{ duration: .9 }}><span>MICRO-PROJECT</span><strong>Redesign onboarding</strong><small>A small startup challenge</small></motion.div><ArrowRight size={19} /><motion.div className="usp-proof-demo" initial={reduced ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : .35, duration: .45 }}><Check size={17} /><strong>Proof, added.</strong><small>Prototype + your reasoning</small></motion.div></div>
  if (topic === 'summary') return <div className="usp-summary-demo"><motion.div className="usp-paper" initial={false} animate={{ opacity: reduced ? .5 : [1, .5] }} transition={{ duration: .7 }}><FileText size={23} /><span>CV</span><i /><i /></motion.div><ArrowRight size={19} /><motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : .25, duration: .45 }}><span className="mini-label">YOUR SEAM SUMMARY</span><strong>Product-minded builder</strong><p>React · Figma · Research</p><span className="summary-proof"><Check size={12} />3 projects. A clearer story.</span></motion.div></div>
  if (topic === 'skills') return <div className="usp-skills-demo"><span className="mini-label">YOUR NEXT SMALL STEP</span>{[['React', 'Ready'], ['Figma', 'Ready'], ['Analytics', 'Improve']].map(([skill, state], i) => <motion.div key={skill} initial={reduced ? false : { opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .3, delay: reduced ? 0 : i * .12 }}><strong>{skill}</strong><span>{state === 'Ready' ? <Check size={14} /> : <ArrowRight size={14} />}{state}</span></motion.div>)}</div>
  return <div className="usp-prep-demo"><span className="mini-label">PRODUCT DESIGNER / FORMA</span><strong>A little more prepared.</strong>{['Explain a design trade-off', 'Walk through your product prototype', 'Ask about the team’s first users'].map((question, i) => <motion.p key={question} initial={reduced ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, delay: reduced ? 0 : i * .1 }}><Play size={11} />{question}</motion.p>)}</div>
}
export function UspOrbit() {
  const [active, setActive] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = useReducedMotion()
  const topic = uspTopics[active]
  return <div className="usp-interaction"><div className="usp-orbit" role="group" aria-label="Explore how SEAM helps"><svg className="usp-connections" viewBox="0 0 1000 360" preserveAspectRatio="none" fill="none" aria-hidden="true">{['M250 70H350L450 155', 'M750 70H650L550 155', 'M250 290H350L450 205', 'M750 290H650L550 205'].map((path, i) => <path key={path} d={path} className={i === active ? 'active-connection' : ''} />)}</svg><div className="usp-logo"><BrandArtwork /><span>MORE THAN A STARTING POINT.</span></div>{uspTopics.map((item, i) => <button ref={element => { buttons.current[i] = element }} key={item.id} type="button" className={`usp-point usp-point-${i} ${active === i ? 'is-active' : ''}`} aria-pressed={active === i} aria-controls="usp-detail" onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(i) }} onFocus={() => setActive(i)} onClick={() => setActive(i)} onKeyDown={event => {
    let next: number | undefined
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (i + 1) % 4
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (i + 3) % 4
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = 3
    if (next !== undefined) { event.preventDefault(); setActive(next); buttons.current[next]?.focus() }
  }}><span className="usp-point-index">0{i + 1}</span><strong>{item.title}</strong><span className="usp-point-dot" /></button>)}</div><div id="usp-detail" className="usp-detail" role="region" aria-label={topic.title}><AnimatePresence mode="wait" initial={false}><motion.div className="usp-detail-inner" key={topic.id} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }}><div className="usp-demo"><UspVisual topic={topic.id} /></div><div className="usp-explanation"><span className="eyebrow">{topic.title}</span><p>{topic.description}</p><small>Illustrative product preview</small></div></motion.div></AnimatePresence></div></div>
}
