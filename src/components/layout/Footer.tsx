import { DemoReset } from '../demo/DemoReset'
import { Link } from 'react-router-dom'
import { BrandLogo } from '../brand/BrandLogo'
import { Container } from './Container'
import type { Audience } from '../../data/demo'
export function Footer({ mode }: { mode: Audience }) {
  return <footer className="site-footer"><Container><div className="footer-main"><div><BrandLogo /><p>Where the right talent meets<br />the right startup.</p></div><nav aria-label="Footer navigation"><Link to="/talent">Talent</Link><Link to="/startup">Startups</Link><Link to={`${mode === 'talent' ? '/' : '/for-startups'}#how-it-works`}>How it works</Link><Link to={`${mode === 'talent' ? '/' : '/for-startups'}#faqs`}>FAQs</Link><Link to="/about">About</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></nav></div><div className="footer-bottom"><span>© 2026 SEAM</span><DemoReset /><span>A shared ambition. A better fit.</span></div></Container></footer>
}
