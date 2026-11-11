import { Link } from 'react-router-dom'

// Discover optional partner assets. SEAM uses its direct public URL below.
const assets = import.meta.glob('/public/brand/**/uts-startups.{svg,png,webp}', { query: '?url', import: 'default' })
const utsAsset = Object.keys(assets).find(path => /\/partners\/uts-startups\.(svg|png|webp)$/i.test(path)) ?? Object.keys(assets).find(path => /\/uts-startups\.(svg|png|webp)$/i.test(path))
export function BrandArtwork() {
  return <span className="seam-logo-frame"><img src="/brand/seam-logo.png" alt="SEAM" width={724} height={543} decoding="async" className="seam-navbar-logo" /></span>
}
export function BrandLogo() {
  return <Link className="brand" to="/" aria-label="SEAM home"><BrandArtwork /></Link>
}
export function BackingLogo() {
  return <div className="backing"><span>BACKED BY</span>{utsAsset ? <img src={utsAsset.replace('/public', '')} alt="UTS Startups" /> : <strong>UTS <span>Startups</span></strong>}</div>
}
