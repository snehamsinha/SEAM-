import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
export function InfoPage({ page }: { page: 'about' | 'privacy' | 'terms' }) {
  return <main id="main-content" className="info-page"><Container><p className="eyebrow">SEAM / {page.toUpperCase()}</p><h1>{page === 'about' ? 'Two sides. One shared future.' : page === 'privacy' ? 'Privacy' : 'Terms'}</h1><p>{page === 'about' ? 'SEAM connects emerging talent with early-stage startups. Where the right talent meets the right startup.' : `Our ${page === 'privacy' ? 'privacy policy' : 'terms of use'} will be published before the product launches. This website is a demonstration; it has no account, application, or payment forms.`}</p><Button to="/">Back to SEAM</Button></Container></main>
}
