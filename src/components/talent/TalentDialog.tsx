import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
export function TalentDialog({ title, children, onClose, center = false, eyebrow = 'SEAM / TALENT', className = '' }: { title: string; children: ReactNode; onClose: () => void; center?: boolean; eyebrow?: string; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  const id = useId()
  useEffect(() => {
    const previous = document.activeElement
    const dialog = ref.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; if (previous instanceof HTMLElement && previous.isConnected) previous.focus() }
  }, [])
  return <dialog ref={ref} className={`talent-dialog ${center ? 'talent-dialog-center' : ''} ${className}`} aria-labelledby={id} onCancel={event => { event.preventDefault(); onClose() }}><div className="talent-dialog-header"><div><span className="talent-kicker">{eyebrow}</span><h2 id={id}>{title}</h2></div><button className="talent-icon-button" aria-label="Close panel" onClick={onClose}><X size={20} /></button></div><div className="talent-dialog-body">{children}</div></dialog>
}
