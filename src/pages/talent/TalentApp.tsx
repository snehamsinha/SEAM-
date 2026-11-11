import { DemoReset } from '../../components/demo/DemoReset'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { microProjects, talentOpportunities, type TalentState, type ProjectRun } from '../../data/talent'
import { readTalentState, TALENT_STORAGE_KEY } from '../../lib/talentStorage'
import { TalentHeader } from '../../components/talent/TalentHeader'
import { TalentDialog } from '../../components/talent/TalentDialog'
import { TalentOverview, TalentOpportunities, MicroProjectList, MySeam } from '../../components/talent/TalentViews'
import { InterviewPrep, OpportunityDetail, ProfileEditor, ProjectWorkspace, VideoInteraction } from '../../components/talent/TalentPanels'
import '../../styles/talent.css'

type Panel = { kind: 'role'; id: string; prep?: boolean } | { kind: 'project'; id: string } | { kind: 'profile' } | { kind: 'video'; replace: boolean }
export function TalentApp() {
  const [state, setState] = useState<TalentState>(readTalentState)
  const [panel, setPanel] = useState<Panel | null>(null)
  const [notice, setNotice] = useState('')
  const [storageWarning, setStorageWarning] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()
  useEffect(() => {
    try { localStorage.setItem(TALENT_STORAGE_KEY, JSON.stringify(state)) }
    catch { const timer = window.setTimeout(() => setStorageWarning(true), 0); return () => window.clearTimeout(timer) }
  }, [state])
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 5000)
    return () => window.clearTimeout(timer)
  }, [notice])
  const openProject = (id: string) => {
    if (!microProjects.some(project => project.id === id)) return
    setState(previous => previous.projects[id] ? previous : { ...previous, projects: { ...previous.projects, [id]: { status: 'in-progress', startedAt: new Date().toISOString(), notes: '', link: '' } } })
    setPanel({ kind: 'project', id })
  }
  const updateProject = (id: string, patch: Partial<Pick<ProjectRun, 'notes' | 'link'>>) => setState(previous => ({ ...previous, projects: { ...previous.projects, [id]: { ...previous.projects[id], ...patch } } }))
  const addSkill = (skill: string) => {
    setState(previous => ({ ...previous, plan: [...new Set([...previous.plan, skill])] }))
    setNotice(`${skill} added to your plan.`)
  }
  const props = { state, openRole: (id: string) => setPanel({ kind: 'role', id }), openProject, editProfile: () => setPanel({ kind: 'profile' }), openVideo: (replace: boolean) => setPanel({ kind: 'video', replace }), addSkill }
  const role = panel?.kind === 'role' ? talentOpportunities.find(item => item.id === panel.id) : undefined
  const project = panel?.kind === 'project' ? microProjects.find(item => item.id === panel.id) : undefined
  const close = () => setPanel(null)
  return <div className="talent-app"><TalentHeader name={state.profile.name} /><div className="talent-app-container"><div className="talent-demo-banner"><span><span />TALENT / INTERACTIVE PREVIEW</span><p>{storageWarning ? 'Browser storage unavailable. Changes last for this session only.' : 'Fictional startups & sample matches. Your changes stay in this browser.'}</p></div><main id="main-content"><motion.div key={location.pathname} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .2 }}><Routes><Route index element={<TalentOverview {...props} />} /><Route path="opportunities" element={<TalentOpportunities {...props} />} /><Route path="micro-projects" element={<MicroProjectList {...props} />} /><Route path="my-seam" element={<MySeam {...props} />} /><Route path="*" element={<Navigate to="/talent" replace />} /></Routes></motion.div></main><div className="talent-app-footer"><span>SEAM / More than a résumé.</span><DemoReset /><span>Built for your next beginning.</span></div></div>
    {panel?.kind === 'profile' && <TalentDialog title="Make your profile more you." onClose={close} center><ProfileEditor profile={state.profile} onSave={profile => { setState(previous => ({ ...previous, profile })); close(); setNotice('Your SEAM profile has been updated.') }} /></TalentDialog>}
    {panel?.kind === 'video' && <TalentDialog title={panel.replace ? 'Replace your introduction' : 'Your introduction'} onClose={close} center><VideoInteraction replace={panel.replace} name={state.profile.videoName} onSave={videoName => { setState(previous => ({ ...previous, profile: { ...previous.profile, videoName } })); close(); setNotice('Introduction selection saved locally.') }} /></TalentDialog>}
    {panel?.kind === 'role' && role && <TalentDialog title={panel.prep ? `Prepare for ${role.company}` : `Your fit with ${role.company}`} onClose={close}>{panel.prep ? <InterviewPrep role={role} notes={state.prepNotes[role.id] || []} onBack={() => setPanel({ kind: 'role', id: role.id })} onChange={(index, value) => setState(previous => { const notes = [...(previous.prepNotes[role.id] || [])]; notes[index] = value; return { ...previous, prepNotes: { ...previous.prepNotes, [role.id]: notes } } })} /> : <OpportunityDetail role={role} sent={state.interests.includes(role.id)} onInterest={() => { setState(previous => ({ ...previous, interests: [...new Set([...previous.interests, role.id])] })); setNotice('Interest saved. No message was sent to a real startup.') }} onProject={openProject} onPrep={() => setPanel({ kind: 'role', id: role.id, prep: true })} />}</TalentDialog>}
    {panel?.kind === 'project' && project && state.projects[project.id] && <TalentDialog title="Your project workspace" onClose={close}><ProjectWorkspace project={project} run={state.projects[project.id]} onDraft={patch => updateProject(project.id, patch)} onClose={close} onSubmit={() => { setState(previous => ({ ...previous, projects: { ...previous.projects, [project.id]: { ...previous.projects[project.id], status: 'submitted', submittedAt: new Date().toISOString() } } })); setNotice('Work sample added to My SEAM. Founder review is pending.') }} /></TalentDialog>}
    {notice && <div className="talent-toast" role="status"><Check size={16} /><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice('')}><X size={15} /></button></div>}
  </div>
}
