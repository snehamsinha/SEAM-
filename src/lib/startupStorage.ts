import { commitments, initialStartupState, needSkills, needTypes, sampleProjects, sampleRoles, sampleSubmissions, startupCandidates, type FounderProject, type FounderRole, type PostedNeed, type StartupState } from '../data/startup'
export const STARTUP_STORAGE_KEY = 'seam.startup.v1'
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value)
const text = (value: unknown, max = 300) => typeof value === 'string' ? value.slice(0, max) : ''
const list = (value: unknown) => Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === 'string').map(item => item.slice(0, 80)))].slice(0, 20) : []
const candidateIds = (value: unknown) => list(value).filter(id => startupCandidates.some(person => person.id === id))
const date = (value: unknown) => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? value : new Date().toISOString()
export function readStartupState(): StartupState {
  if (typeof window === 'undefined') return initialStartupState
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STARTUP_STORAGE_KEY) || 'null')
    if (!record(raw) || raw.version !== 1) return initialStartupState
    const projects: FounderProject[] = []
    if (Array.isArray(raw.projects)) for (const item of raw.projects.slice(0, 100)) if (record(item) && text(item.id) && text(item.title) && !sampleProjects.some(project => project.id === item.id) && !projects.some(project => project.id === item.id)) projects.push({ id: text(item.id), title: text(item.title, 120), brief: text(item.brief, 4000), time: text(item.time, 80), skills: list(item.skills), deliverable: text(item.deliverable, 300), status: 'published', createdAt: date(item.createdAt) })
    const needs: PostedNeed[] = []
    if (Array.isArray(raw.needs)) for (const item of raw.needs.slice(0, 100)) if (record(item) && text(item.id) && text(item.description).trim() && !needs.some(need => need.id === item.id)) needs.push({ id: text(item.id), description: text(item.description, 3000), commitment: commitments.includes(text(item.commitment)) ? text(item.commitment) : commitments[1], type: needTypes.includes(text(item.type)) ? text(item.type) : needTypes[0], skills: list(item.skills).filter(skill => needSkills.includes(skill)), createdAt: date(item.createdAt) })
    const roles: FounderRole[] = []
    if (Array.isArray(raw.roles)) for (const item of raw.roles.slice(0, 100)) if (record(item) && text(item.id) && text(item.title) && !sampleRoles.some(role => role.id === item.id) && !roles.some(role => role.id === item.id)) roles.push({ id: text(item.id), title: text(item.title, 120), commitment: text(item.commitment, 80), type: text(item.type, 80), skills: list(item.skills), candidateIds: candidateIds(item.candidateIds), status: item.status === 'draft' ? 'draft' : 'open', ...(typeof item.needId === 'string' ? { needId: item.needId } : {}) })
    const invites: StartupState['invites'] = {}
    if (record(raw.invites)) for (const person of startupCandidates) { const invite = raw.invites[person.id]; if (record(invite)) invites[person.id] = { sentAt: date(invite.sentAt), role: text(invite.role, 120) } }
    const feedback: StartupState['feedback'] = {}
    if (record(raw.feedback)) for (const submission of sampleSubmissions) { const saved = raw.feedback[submission.id]; if (record(saved) && text(saved.text).trim()) feedback[submission.id] = { text: text(saved.text, 2000), createdAt: date(saved.createdAt) } }
    return { version: 1, shortlist: Array.isArray(raw.shortlist) ? candidateIds(raw.shortlist) : initialStartupState.shortlist, invites, needs, projects, roles, feedback, activeNeedId: typeof raw.activeNeedId === 'string' && needs.some(need => need.id === raw.activeNeedId) ? raw.activeNeedId : null }
  } catch { return initialStartupState }
}
