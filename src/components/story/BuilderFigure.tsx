/** Original editorial vector artwork; the same character appears in both story scenes. */
export function BuilderFigure({ mood }: { mood: 'worried' | 'confident' }) {
  const calm = mood === 'confident'
  return <svg className="builder-figure" viewBox="0 0 460 480" fill="none" role="img" aria-label={calm ? 'The same early-career builder, now confident and working at a laptop' : 'A thoughtful early-career builder, sitting with a hand against their head'}>
    <path d="M72 385V201a158 158 0 0 1 316 0v184" fill="var(--person-ground)" />
    <path d="M35 433h390" stroke="var(--person-line)" />
    <path d="M146 306h164v19H146z" fill="var(--person-seat)" /><path d="M159 325v108m138-108v108" stroke="var(--person-line)" strokeWidth="3" />
    <path d="M210 285c-9 25-1 47 28 58l40 16-21 59 29 8 42-84c5-12 0-24-14-29l-55-25" fill="var(--color-navy)" />
    <path d="M180 285c-20 10-26 29-13 49l43 63-32 24 22 14 56-32c8-5 10-12 4-22l-36-64 17-22" fill="var(--person-trouser)" />
    <path d="m257 416-7 18h57c3-7-1-11-11-13l-10-6-29 1Zm-76 4-20 13h49l-10-17-19 4Z" fill="var(--color-navy)" />
    <path d={calm ? 'M187 157c22-17 50-17 71 0 23 18 33 63 24 133-31 15-71 15-105 1l-2-78 12-56Z' : 'M181 170c23-26 59-27 82-8 24 20 38 64 29 127-37 17-82 14-113 0l-9-66 11-53Z'} fill="var(--person-shirt)" />
    <path d="m189 281 8-58m70 59-7-52m-64 64 56 1" stroke="var(--color-cyan-ink)" strokeWidth="1.5" strokeLinecap="round" />
    {calm ? <><path d="M184 182c-21 17-33 53-23 72 9 14 43 30 70 35l10-19-47-31 12-38" fill="var(--person-shirt)" /><path d="m226 268 23 4 14 16-9 7-29-9-8-10 9-8Z" fill="var(--person-skin)" /><path d="M263 178c17 8 29 30 36 51l-16 10-35-35" fill="var(--person-shirt)" /><path d="m289 226 26 18 19 9-4 13-19-3-36-23" fill="var(--person-skin)" /><path d="m172 220 6-17m97 4 6 15" stroke="var(--color-cyan-ink)" strokeWidth="1.5" /></> : <><path d="M268 173c17 8 31 27 32 50 0 18-12 23-25 11l-35-39 17-17 16 17-5-22Z" fill="var(--person-shirt)" /><path d="m269 207-19-51-6-27-13-2-4 17 9 19 12 53 21-9Z" fill="var(--person-skin)" /><path d="M183 186c-20 16-27 40-24 61 2 11 14 17 29 20l43 8 5-18-43-21 8-33" fill="var(--person-shirt)" /><path d="m230 254 22 9 9 13-6 8-28-13 3-17Z" fill="var(--person-skin)" /><path d="m268 215 11 15m-105 0 4-19" stroke="var(--color-cyan-ink)" strokeWidth="1.5" /></>}
    <g transform={calm ? 'translate(177 59)' : 'translate(170 70) rotate(8 50 60)'}>
      <path d="M34 79h29v33c-8 13-21 13-29 0V79Z" fill="var(--person-skin)" />
      <path d="M20 35c-2-30 62-36 64 0l-4 33C77 85 66 97 51 97S25 85 23 68l-3-33Z" fill="var(--person-skin)" />
      <path d="M19 59C7 38 12 10 37 6c27-10 49 5 51 29l-5 26-8-22c-11 6-28 8-41-2l-9 25-6-3Z" fill="var(--color-navy)" />
      <path d="M24 57c-11-8-15 10-1 18m58-18c12-8 15 11-1 18" fill="var(--person-skin)" />
      <path d={calm ? 'M33 58h6m24 0h6M51 60l-3 13h6m-16 8c8 7 18 7 26-1' : 'm31 52 10 3m21-1 10-4m-38 12h5m24 0h5M51 62l-3 13h6m-12 9c6-4 13-4 20 0'} stroke="var(--person-ink)" strokeWidth="1.7" strokeLinecap="round" />
    </g>
    <path d="m208 167 15 15 18-17" stroke="var(--color-cyan-ink)" strokeWidth="1.5" />
    {calm && <><path d="M236 228h124l-21 81H215l21-81Z" fill="var(--color-navy)" /><path d="M215 309h140v6H205l10-6Z" fill="var(--person-trouser)" /><path d="M257 255h59m-63 10h43" stroke="var(--color-cyan)" strokeOpacity=".65" strokeWidth="2" /><path d="m292 277 5 5 10-13" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" /></>}
  </svg>
}
