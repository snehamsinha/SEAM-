import { Component, type ReactNode } from 'react'
import { DemoReset } from './DemoReset'

export class DemoErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (!this.state.failed) return this.props.children
    return <main className="demo-error-page"><p className="eyebrow">SEAM / LET’S TRY THAT AGAIN</p><h1>Something didn’t load.</h1><p>Your saved demo activity is still in this browser. Reload the page or return to the homepage.</p><div><button onClick={() => window.location.reload()}>Reload page</button><a href="/">Go to homepage</a></div><DemoReset /></main>
  }
}
