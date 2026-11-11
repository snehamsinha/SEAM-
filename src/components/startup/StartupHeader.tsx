import { ArrowUpRight, Plus } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { BrandLogo } from '../brand/BrandLogo'
export function StartupHeader({ onPostNeed }: { onPostNeed: () => void }) {
  return <header className="founder-header"><div className="founder-header-inner"><BrandLogo /><nav aria-label="Startup navigation"><NavLink to="/startup" end>Overview</NavLink><NavLink to="/startup/talent">Talent</NavLink><NavLink to="/startup/projects">Projects</NavLink><NavLink to="/startup/roles">Open roles</NavLink></nav><div className="founder-header-actions"><Link to="/" className="founder-home-link" aria-label="Back to homepage"><ArrowUpRight size={15} /></Link><span className="founder-company"><span>F</span>Forma</span><button className="founder-button" onClick={onPostNeed}>Post a need<Plus size={14} /></button></div></div></header>
}
