import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { ArrowDown, Plus } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { BackingLogo } from '../components/brand/BrandLogo'
import { Footer } from '../components/layout/Footer'
import { WorriedScene } from '../components/story/WorriedScene'
import { FoundSeamScene } from '../components/story/FoundSeamScene'
import { UspOrbit } from '../components/story/UspOrbit'
import { faqItems, storySteps } from '../data/homepage'
import type { Audience } from '../data/demo'

export function LandingPage({ mode }: { mode: Audience }) {
  const talent = mode === 'talent'
  const section = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 80%', 'end 55%'] })
  const [scrollStep, setScrollStep] = useState(0)
  const [manualStep, setManualStep] = useState<number | null>(null)
  useMotionValueEvent(scrollYProgress, 'change', value => setScrollStep(value < .42 ? 0 : value < .76 ? 1 : 2))
  const step = manualStep ?? (reduced ? 0 : scrollStep)
  return <div className={`experience concise-home ${mode}`}><main id="main-content">
    <section className="opening-story" aria-labelledby="hero-title"><Container className="concise-grid"><div className="opening-copy"><p className="eyebrow"><span />{talent ? 'FOR PEOPLE READY TO BUILD' : 'FOR TEAMS READY TO BUILD'}</p><h1 id="hero-title">{talent ? <>It’s hard to<br />know where<br />you <em>fit.</em></> : <>Finding your<br />people can<br />feel <em>hard.</em></>}</h1><p>{talent ? 'Too many applications. Too little signal. Too much pressure on a static CV.' : 'Too many applications. Too little proof. Too much pressure on a static CV.'}</p><a className="button" href="#how-it-works">See how SEAM works<ArrowDown size={18} /></a></div><WorriedScene mode={mode} /></Container></section>
    <section ref={section} id="how-it-works" className="found-section" aria-labelledby="how-title"><Container className="concise-grid"><div className="found-copy"><p className="eyebrow">FROM STUCK TO STARTING</p><h2 id="how-title">SEAM shows<br />more than a <em>CV.</em></h2><p>{talent ? 'Create a richer profile, discover where you fit, and prove yourself through real startup work.' : 'Discover the person, see how they build, and find a stronger fit through real startup work.'}</p><ol className="found-steps">{storySteps[mode].map((item, i) => <li key={item.title}><button type="button" className={step === i ? 'active' : ''} aria-pressed={step === i} aria-controls="found-story-visual" onClick={() => setManualStep(i)}><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></button></li>)}</ol></div><div id="found-story-visual"><FoundSeamScene step={step} mode={mode} /></div></Container></section>
    <section className="backing-section concise-backing" aria-label="Backed by UTS Startups"><Container><BackingLogo /></Container></section>
    <section id="why-seam" className="usp-section" aria-labelledby="usp-title"><Container><div className="usp-heading"><p className="eyebrow">ONE CONNECTION. MORE POSSIBILITY.</p><h2 id="usp-title">A little more<br /><em>on your side.</em></h2></div><UspOrbit /></Container></section>
    <section id="faqs" className="faq-section" aria-labelledby="faq-title"><Container className="faq-grid"><div><p className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p><h2 id="faq-title">Common<br /><em>questions.</em></h2></div><div className="faq-list">{faqItems[mode].map(item => <details name="seam-faq" key={item.question}><summary>{item.question}<Plus size={18} /></summary><p>{item.answer}</p></details>)}<details id="join-seam" name="seam-faq"><summary>{talent ? 'Can I join SEAM yet?' : 'Can I find talent today?'}<Plus size={18} /></summary><p>{talent ? <>Explore the interactive <Link to="/talent">Talent demo</Link>. Your profile and activity stay in your browser; no account is required.</> : <>Explore the interactive <Link to="/startup">Startup demo</Link>. Needs, shortlists and feedback stay in your browser; no real invitations are sent.</>}</p></details></div></Container></section>
  </main><Footer mode={mode} /></div>
}
