import { ArrowUpRight } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { BrandLogo } from '../brand/BrandLogo'
export function TalentHeader({ name }: { name: string }) {
  return <header className="talent-header"><div className="talent-header-inner"><BrandLogo /><nav aria-label="Talent navigation"><NavLink to="/talent" end>Overview</NavLink><NavLink to="/talent/opportunities">Discover</NavLink><NavLink to="/talent/micro-projects">Micro-projects</NavLink><NavLink to="/talent/my-seam">My SEAM</NavLink></nav><div className="talent-header-right"><Link to="/" className="talent-home-link">Homepage<ArrowUpRight size={13} /></Link><Link to="/talent/my-seam" className="talent-avatar-link" aria-label={`${name} — My SEAM`}>{name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()}</Link></div></div></header>
}
