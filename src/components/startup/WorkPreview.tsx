import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
export function WorkThumbnail({ variant = 0 }: { variant?: number }) {
  return <div className={`work-thumbnail work-thumbnail-${variant % 3}`} aria-hidden="true"><span>FORMA / GOAL SELECTION</span><strong>What matters<br />most at home?</strong><div><i /><i /><i /></div><span className="work-thumb-action">Continue<ArrowRight size={10} /></span></div>
}
export function WorkPrototype() {
  const [goal, setGoal] = useState('Lower emissions')
  const [continued, setContinued] = useState(false)
  return <div className="work-prototype"><span className="founder-kicker">FORMA / ONBOARDING PROTOTYPE</span>{continued ? <div className="work-prototype-complete"><Check size={26} /><h3>A clearer starting point.</h3><p>Your sample goal: {goal}.</p><button className="founder-text-button" onClick={() => setContinued(false)}>Try another choice<ArrowRight size={13} /></button></div> : <><h3>What matters<br />most at home?</h3><p>Choose a starting point. You can change it later.</p><div className="prototype-choices">{['Lower bills', 'Lower emissions', 'Explore upgrades'].map(option => <button key={option} type="button" aria-pressed={goal === option} onClick={() => setGoal(option)}>{option}<span>{goal === option && <Check size={12} />}</span></button>)}</div><button className="founder-button" onClick={() => setContinued(true)}>Continue<ArrowRight size={14} /></button></>}<small>Interactive example of submitted work, not a live Forma product.</small></div>
}
