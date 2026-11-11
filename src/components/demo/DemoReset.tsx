import { useEffect, useId, useRef, useState } from 'react'
import { resetSeamDemo } from '../../lib/demoReset'

function ResetPrompt({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const id = useId()
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const opener = document.activeElement
    const dialog = ref.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; if (opener instanceof HTMLElement && opener.isConnected) opener.focus() }
  }, [])
  return <dialog ref={ref} className="demo-reset-dialog" aria-labelledby={id} onCancel={event => { event.preventDefault(); onClose() }}><h2 id={id}>Start fresh?</h2><p>This clears your Talent and Startup demo activity in this browser, including profile edits, project drafts, notes, shortlists and reviews. The original sample data will return.</p>{failed && <p role="alert">Your browser is blocking storage changes. Clear this site’s data in browser settings to reset the demo.</p>}<div><button type="button" autoFocus onClick={onClose}>Keep my changes</button><button type="button" className="demo-reset-confirm" onClick={() => { if (resetSeamDemo()) window.location.assign('/'); else setFailed(true) }}>Reset both demos</button></div></dialog>
}
export function DemoReset() {
  const [open, setOpen] = useState(false)
  return <><button type="button" className="demo-reset-trigger" onClick={() => setOpen(true)}>Reset demo</button>{open && <ResetPrompt onClose={() => setOpen(false)} />}</>
}
