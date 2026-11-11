import { DemoReset } from '../../components/demo/DemoReset'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { TalentDialog } from '../../components/talent/TalentDialog'
import { StartupHeader } from '../../components/startup/StartupHeader'
import { ProjectResults, RoleMatches, StartupOverview, StartupProjects, StartupRoles, StartupTalent } from '../../components/startup/StartupViews'
import { CreateProjectForm, NeedResults, PostNeedForm, type ProjectDraft } from '../../components/startup/StartupForms'
import { CandidateProfile, CandidateVideo, SubmissionDetail } from '../../components/startup/StartupPanels'
import { analyseNeed, sampleProjects, sampleRoles, sampleSubmissions, startupCandidates, type NeedInput, type PostedNeed, type StartupState } from '../../data/startup'
import { readStartupState, STARTUP_STORAGE_KEY } from '../../lib/startupStorage'
import '../../styles/talent.css'
import '../../styles/startup.css'

type Panel = { kind: 'post-need' } | { kind: 'need-result'; id: string } | { kind: 'candidate'; id: string; needId?: string; roleId?: string } | { kind: 'video'; id: string; needId?: string; roleId?: string } | { kind: 'create-project'; initial?: ProjectDraft } | { kind: 'project'; id: string } | { kind: 'submission'; id: string } | { kind: 'role'; id: string }
const newId = (prefix: string) => `${prefix}-${globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`}`
export function StartupApp() {
  const [state, setState] = useState<StartupState>(readStartupState)
  const [panel, setPanel] = useState<Panel | null>(null)
  const [notice, setNotice] = useState('')
  const [storageWarning, setStorageWarning] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  useEffect(() => {
    try { localStorage.setItem(STARTUP_STORAGE_KEY, JSON.stringify(state)) }
    catch { const timer = window.setTimeout(() => setStorageWarning(true), 0); return () => window.clearTimeout(timer) }
  }, [state])
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 5000)
    return () => window.clearTimeout(timer)
  }, [notice])
  const close = () => setPanel(null)
  const roles = [...sampleRoles, ...state.roles]
  const projects = [...sampleProjects, ...state.projects]
  const activeNeed = state.needs.find(need => need.id === state.activeNeedId)
  const shortlist = (id: string) => setState(previous => ({ ...previous, shortlist: previous.shortlist.includes(id) ? previous.shortlist.filter(item => item !== id) : [...previous.shortlist, id] }))
  const invite = (id: string, role = activeNeed ? analyseNeed(activeNeed).title : 'Conversation with Forma') => {
    setState(previous => previous.invites[id] ? previous : { ...previous, invites: { ...previous.invites, [id]: { sentAt: new Date().toISOString(), role } } })
    setNotice('Invite saved locally. No message was sent to real talent.')
  }
  const chooseNeed = (id: string | null) => {
    setState(previous => ({ ...previous, activeNeedId: id }))
    if (id) { close(); navigate('/startup/talent') }
  }
  const postNeed = (input: NeedInput) => {
    const need: PostedNeed = { ...input, id: newId('need'), createdAt: new Date().toISOString() }
    setState(previous => ({ ...previous, needs: [...previous.needs, need], activeNeedId: need.id }))
    setPanel({ kind: 'need-result', id: need.id })
  }
  const saveRole = (need: PostedNeed) => {
    const result = analyseNeed(need)
    setState(previous => previous.roles.some(role => role.needId === need.id) ? previous : { ...previous, roles: [...previous.roles, { id: newId('role'), title: result.title, commitment: need.commitment, type: need.type, skills: result.skills, candidateIds: result.candidateIds, status: 'open', needId: need.id }] })
    setNotice('Open role saved to your workspace.')
  }
  const discoveryContext = () => {
    if (!location.pathname.endsWith('/talent')) return {}
    const roleId = new URLSearchParams(location.search).get('role')
    return roleId && roles.some(role => role.id === roleId) ? { roleId } : activeNeed ? { needId: activeNeed.id } : {}
  }
  const props = {
    state, onPostNeed: () => setPanel({ kind: 'post-need' }), onCandidate: (id: string) => setPanel({ kind: 'candidate', id, ...discoveryContext() }),
    onVideo: (id: string) => setPanel({ kind: 'video', id, ...discoveryContext() }), onShortlist: shortlist, onCreateProject: () => setPanel({ kind: 'create-project' }),
    onProject: (id: string) => setPanel({ kind: 'project', id }), onSubmission: (id: string) => setPanel({ kind: 'submission', id }), onRole: (id: string) => setPanel({ kind: 'role', id }), onNeed: chooseNeed,
  }
  let panelTitle = ''
  let content = null
  if (panel?.kind === 'post-need') { panelTitle = 'What are you building next?'; content = <PostNeedForm onAnalyse={postNeed} /> }
  if (panel?.kind === 'need-result') {
    const need = state.needs.find(item => item.id === panel.id)
    if (need) {
      panelTitle = 'From your need to the right people'
      content = <NeedResults need={need} savedAsRole={state.roles.some(role => role.needId === need.id)} onMatches={() => chooseNeed(need.id)} onSaveRole={() => saveRole(need)} onProject={() => {
        const result = analyseNeed(need)
        setPanel({ kind: 'create-project', initial: { title: result.kind === 'design' ? 'Redesign onboarding step' : `${result.title} challenge`, brief: need.description, time: '2–3 hours', skills: result.skills, deliverable: result.kind === 'design' ? 'Clickable prototype + a short explanation' : 'Working example + a short explanation' } })
      }} />
    }
  }
  if (panel?.kind === 'candidate' || panel?.kind === 'video') {
    const person = startupCandidates.find(item => item.id === panel.id)
    if (person) {
      const context = { needId: panel.needId, roleId: panel.roleId }
      const roleContext = roles.find(role => role.id === panel.roleId)
      const profileNeed = state.needs.find(need => need.id === (panel.needId || roleContext?.needId))
      panelTitle = panel.kind === 'video' ? `${person.name} / Video portfolio` : person.name
      content = panel.kind === 'video' ? <CandidateVideo person={person} onBack={() => setPanel({ kind: 'candidate', id: person.id, ...context })} /> : <CandidateProfile person={person} state={state} need={profileNeed} role={roleContext} onShortlist={() => shortlist(person.id)} onInvite={() => invite(person.id, roleContext?.title || (profileNeed ? analyseNeed(profileNeed).title : 'Conversation with Forma'))} onVideo={() => setPanel({ kind: 'video', id: person.id, ...context })} />
    }
  }
  if (panel?.kind === 'create-project') {
    panelTitle = 'Create a micro-project'
    content = <CreateProjectForm initial={panel.initial} onPublish={draft => {
      const project = { ...draft, id: newId('project'), status: 'published' as const, createdAt: new Date().toISOString() }
      setState(previous => ({ ...previous, projects: [...previous.projects, project] }))
      close(); navigate('/startup/projects'); setNotice('Project published in this browser. It has not been shared with real talent.')
    }} />
  }
  if (panel?.kind === 'project') {
    const project = projects.find(item => item.id === panel.id)
    if (project) { panelTitle = project.title; content = <ProjectResults project={project} {...props} /> }
  }
  if (panel?.kind === 'role') {
    const role = roles.find(item => item.id === panel.id)
    if (role) { panelTitle = 'The role and the people'; content = <RoleMatches role={role} onCandidate={id => setPanel({ kind: 'candidate', id, roleId: role.id })} /> }
  }
  if (panel?.kind === 'submission') {
    const submission = sampleSubmissions.find(item => item.id === panel.id)
    const person = startupCandidates.find(item => item.id === submission?.candidateId)
    if (submission && person) {
      panelTitle = `${person.name} / Submitted work`
      content = <SubmissionDetail submission={submission} person={person} state={state} roles={roles} onFeedback={text => {
        setState(previous => ({ ...previous, feedback: { ...previous.feedback, [submission.id]: { text, createdAt: new Date().toISOString() } } }))
        setNotice('Founder feedback saved to this workspace.')
      }} onInvite={role => invite(person.id, role)} onCandidate={() => setPanel({ kind: 'candidate', id: person.id })} onVideo={() => setPanel({ kind: 'video', id: person.id })} />
    }
  }
  return <div className="startup-app"><StartupHeader onPostNeed={props.onPostNeed} /><div className="founder-container"><div className="founder-demo-banner"><span><span />STARTUP / INTERACTIVE PREVIEW</span><p>{storageWarning ? 'Browser storage unavailable. Changes last for this session only.' : 'Fictional talent & sample work. Actions stay in this browser.'}</p></div><main id="main-content"><motion.div key={location.pathname} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .2 }}><Routes><Route index element={<StartupOverview {...props} />} /><Route path="talent" element={<StartupTalent {...props} />} /><Route path="projects" element={<StartupProjects {...props} />} /><Route path="roles" element={<StartupRoles {...props} />} /><Route path="*" element={<Navigate to="/startup" replace />} /></Routes></motion.div></main><div className="founder-app-footer"><span>SEAM / Proof before paperwork.</span><DemoReset /><span>Build with the people who fit.</span></div></div>{panel && content && <TalentDialog key={`${panel.kind}-${'id' in panel ? panel.id : ''}`} title={panelTitle} eyebrow="SEAM / STARTUPS" className="founder-dialog" onClose={close} center={panel.kind === 'video'}>{content}</TalentDialog>}{notice && <div className="founder-toast" role="status"><Check size={15} /><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice('')}><X size={14} /></button></div>}</div>
}
