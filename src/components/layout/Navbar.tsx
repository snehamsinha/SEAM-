import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { BrandLogo } from '../brand/BrandLogo'
import { Container } from './Container'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  const mode = pathname === '/for-startups' ? 'startups' : 'talent'
  const home = mode === 'startups' ? '/for-startups' : '/'
  return <header className={`site-header ${mode}`}><Container className="nav-container">
    <BrandLogo />
    <nav className="mode-switch" aria-label="Choose your SEAM experience">{(['talent', 'startups'] as const).map(item => <Link key={item} to={item === 'talent' ? '/' : '/for-startups'} aria-current={mode === item ? 'page' : undefined} onClick={() => setOpen(false)}>{mode === item && <motion.span className="switch-active" layoutId="audience-switch" transition={{ type: 'spring', stiffness: 350, damping: 32 }} />}<span>{item === 'talent' ? 'Talent' : 'Startups'}</span></Link>)}</nav>
    <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation" onClick={() => setOpen(false)} onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() } }}>
      <Link to={`${home}#how-it-works`}>How it works</Link><Link to={`${home}#why-seam`}>Why SEAM</Link><Link to={`${home}#faqs`}>FAQs</Link>
      <Link className="button nav-cta" to={mode === 'talent' ? '/talent' : '/startup'}>{mode === 'talent' ? 'Join SEAM' : 'Find talent'}<ArrowUpRight size={15} /></Link>
    </nav>
  </Container></header>
}
