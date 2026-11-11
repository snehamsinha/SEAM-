import { defaultProfile, initialTalentState, learningSkills, microProjects, talentOpportunities, type TalentState, type ProjectRun } from '../data/talent'
export const TALENT_STORAGE_KEY = 'seam.talent.v1'
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value)
const text = (value: unknown, fallback: string, limit = 200) => typeof value === 'string' && value.trim() ? value.slice(0, limit) : fallback
const list = (value: unknown, fallback: string[]) => Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === 'string').slice(0, 15).map(item => item.trim().slice(0, 60)).filter(Boolean))] : fallback
const date = (value: unknown) => typeof value === 'string' && Number.isFinite(Date.parse(value)) && Math.abs(Date.parse(value)) < 8.64e15 - 7 * 86400000 ? value : new Date().toISOString()
export function readTalentState(): TalentState {
  if (typeof window === 'undefined') return initialTalentState
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(TALENT_STORAGE_KEY) || 'null')
    if (!record(raw) || raw.version !== 1) return initialTalentState
    const p = record(raw.profile) ? raw.profile : {}
    const projects: Record<string, ProjectRun> = {}
    if (record(raw.projects)) for (const project of microProjects) {
      const run = raw.projects[project.id]
      if (record(run) && (run.status === 'in-progress' || run.status === 'submitted')) projects[project.id] = { status: run.status, startedAt: date(run.startedAt), notes: text(run.notes, '', 5000), link: text(run.link, '', 1000), ...(run.status === 'submitted' ? { submittedAt: date(run.submittedAt) } : {}) }
    }
    const prepNotes: Record<string, string[]> = {}
    const savedPrepNotes = raw.prepNotes
    if (record(savedPrepNotes)) for (const role of talentOpportunities) {
      const notes = savedPrepNotes[role.id]
      if (Array.isArray(notes)) prepNotes[role.id] = Array.from({ length: 4 }, (_, index) => text(notes[index], '', 3000))
    }
    return {
      version: 1,
      profile: { name: text(p.name, defaultProfile.name, 80), headline: text(p.headline, defaultProfile.headline, 100), career: text(p.career, defaultProfile.career, 60), location: text(p.location, defaultProfile.location, 80), availability: text(p.availability, defaultProfile.availability, 60), goal: text(p.goal, defaultProfile.goal, 300), videoName: text(p.videoName, defaultProfile.videoName, 150), skills: list(p.skills, defaultProfile.skills), interests: list(p.interests, defaultProfile.interests) },
      interests: list(raw.interests, []).filter(id => talentOpportunities.some(role => role.id === id)), projects,
      plan: list(raw.plan, []).filter(skill => learningSkills.includes(skill)), prepNotes,
    }
  } catch { return initialTalentState }
}
export function httpLink(value: string) {
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? url.href : undefined } catch { return undefined }
}
