// Fictional founder workspace. No real candidates, applications or reviews are represented.
export type Candidate = {
  id: string; name: string; direction: string; location: string; availability: string; skills: string[]; interests: string[];
  about: string; wants: string; videoSeconds: number; microProof: number; portfolioCount: number; review: string; fit: number; gap: string;
}
const candidate = (value: Pick<Candidate, 'id' | 'name' | 'direction' | 'skills' | 'fit'> & Partial<Candidate>): Candidate => ({
  location: 'Sydney / flexible', availability: '8–10 hrs/week', interests: ['Early-stage teams', 'Climate Tech'],
  about: 'An emerging builder who learns through small, thoughtful projects and clear collaboration.', wants: 'An early team, meaningful work and room to contribute.',
  videoSeconds: 45, microProof: 1, portfolioCount: 3, review: 'Thoughtful work, clear reasoning and a practical approach.', gap: 'No previous full-time startup role.', ...value,
})
export const startupCandidates: Candidate[] = [
  candidate({ id: 'alex', name: 'Alex Morgan', direction: 'Product · AI · Early Career', skills: ['Figma', 'React', 'Research', 'AI', 'Product'], fit: 94, microProof: 2,
    about: 'A product-minded early-career builder exploring where research, design and AI can make everyday products more useful.', wants: 'Real product experience with an early-stage, mission-led team.', interests: ['Climate Tech', 'AI', 'Consumer'], review: 'Strong thinking and clear execution.', gap: 'No previous full-time product role.' }),
  candidate({ id: 'priya', name: 'Priya Shah', direction: 'Product Design · Research', skills: ['Figma', 'Research', 'Product', 'Design systems'], fit: 91, videoSeconds: 52, about: 'A research-led designer who makes complex first-time experiences feel simpler.', review: 'Excellent synthesis and a well-explained design decision.' }),
  candidate({ id: 'liam', name: 'Liam Chen', direction: 'Frontend · Product', skills: ['React', 'TypeScript', 'Product', 'Figma'], fit: 87, about: 'A frontend builder who enjoys turning rough product ideas into usable prototypes.', portfolioCount: 4, interests: ['Climate Tech', 'Developer tools'], gap: 'More comfortable building interfaces than leading research.' }),
  candidate({ id: 'sofia', name: 'Sofia Rivera', direction: 'UX · Research · Graduate', skills: ['Figma', 'Research', 'Product', 'Accessibility'], fit: 85, availability: '5–10 hrs/week', about: 'A recent graduate interested in accessible products and careful customer discovery.' }),
  candidate({ id: 'maya', name: 'Maya Patel', direction: 'Growth · Product · Consumer', skills: ['Marketing', 'Research', 'Product', 'Data'], fit: 83, interests: ['Consumer', 'Climate Tech'], about: 'A product and growth generalist who connects customer questions with small experiments.' }),
  candidate({ id: 'noah', name: 'Noah Williams', direction: 'AI · Product · Python', skills: ['Python', 'AI', 'Product', 'Data'], fit: 82, availability: '10–15 hrs/week', interests: ['AI', 'Consumer'], about: 'A hands-on prototyper exploring useful AI workflows for small teams.' }),
  candidate({ id: 'riya', name: 'Riya Das', direction: 'Frontend · AI', skills: ['React', 'Python', 'AI', 'Product'], fit: 81, availability: '5–10 hrs/week' }),
  candidate({ id: 'ethan', name: 'Ethan Brooks', direction: 'Frontend · TypeScript', skills: ['React', 'TypeScript', 'Product', 'Data'], fit: 80, availability: '10–20 hrs/week', videoSeconds: 48 }),
  candidate({ id: 'aisha', name: 'Aisha Khan', direction: 'Research · AI · Product', skills: ['Research', 'AI', 'Figma', 'Product'], fit: 79, availability: '5–10 hrs/week', videoSeconds: 50 }),
  candidate({ id: 'olivia', name: 'Olivia Park', direction: 'Product · Marketing · Design', skills: ['Figma', 'Marketing', 'Research', 'Product'], fit: 78, availability: '5–10 hrs/week' }),
  candidate({ id: 'theo', name: 'Theo Nguyen', direction: 'Frontend · AI · Graduate', skills: ['React', 'Python', 'AI', 'Data'], fit: 76, availability: '8–12 hrs/week', videoSeconds: 42 }),
]
export const needSkills = ['React', 'Python', 'Figma', 'AI', 'Marketing', 'Research', 'Product', 'Data']
export const commitments = ['2–5 hrs/week', '5–10 hrs/week', '10–20 hrs/week', 'Full-time']
export const needTypes = ['Micro-project', 'Internship', 'Part-time', 'Early-career role']
export type NeedInput = { description: string; commitment: string; type: string; skills: string[] }
export type NeedKind = 'design' | 'frontend' | 'ai' | 'growth'
export type NeedAnalysis = { kind: NeedKind; title: string; skills: string[]; candidateIds: string[] }
const analysis: Record<NeedKind, Omit<NeedAnalysis, 'kind'>> = {
  design: { title: 'Junior Product Designer', skills: ['Figma', 'Research', 'Product thinking'], candidateIds: ['alex', 'priya', 'sofia', 'maya', 'aisha', 'olivia'] },
  frontend: { title: 'Frontend Builder', skills: ['React', 'TypeScript', 'Product thinking'], candidateIds: ['liam', 'ethan', 'riya', 'theo'] },
  ai: { title: 'AI Product Intern', skills: ['Python', 'AI', 'Product thinking'], candidateIds: ['noah', 'alex', 'riya', 'aisha', 'theo', 'liam', 'ethan', 'maya', 'priya'] },
  growth: { title: 'Growth Product Associate', skills: ['Marketing', 'Research', 'Data'], candidateIds: ['maya', 'olivia', 'noah'] },
}
export function analyseNeed(input: NeedInput): NeedAnalysis {
  const words = input.description.toLowerCase()
  const kind: NeedKind = /frontend|front-end|react|typescript|web development/.test(words) ? 'frontend'
    : /\bai\b|python|machine learning|language model/.test(words) ? 'ai'
    : /marketing|growth|campaign/.test(words) ? 'growth'
    : /design|onboard|figma|research|\bux\b/.test(words) ? 'design'
    : input.skills.includes('React') ? 'frontend' : input.skills.includes('Python') || input.skills.includes('AI') ? 'ai' : input.skills.includes('Marketing') ? 'growth' : 'design'
  return { kind, ...analysis[kind], candidateIds: input.commitment === 'Full-time' ? [] : analysis[kind].candidateIds }
}
export type PostedNeed = NeedInput & { id: string; createdAt: string }
export type FounderProject = { id: string; title: string; brief: string; time: string; skills: string[]; deliverable: string; status: 'published' | 'complete'; createdAt: string }
export const sampleProjects: FounderProject[] = [
  { id: 'onboarding', title: 'Onboarding redesign', brief: 'Help a first-time user choose a home-energy goal. Show one clearer screen and explain the trade-off behind it.', time: '2–3 hours', skills: ['Figma', 'Product thinking'], deliverable: 'Clickable prototype + design reasoning', status: 'complete', createdAt: '2026-11-01T00:00:00Z' },
  { id: 'research', title: 'Find the friction in our first-time journey', brief: 'Plan a small discovery study around the first-time energy journey. Work with assumptions, not real personal data.', time: '2 hours', skills: ['Research', 'Product'], deliverable: 'One-page research brief', status: 'published', createdAt: '2026-11-03T00:00:00Z' },
  { id: 'ai-evaluation', title: 'Evaluate an AI energy summary', brief: 'Suggest a lightweight rubric for deciding whether an AI-generated energy summary is genuinely useful.', time: '2–3 hours', skills: ['AI', 'Python', 'Product'], deliverable: 'Evaluation rubric + three test examples', status: 'published', createdAt: '2026-11-05T00:00:00Z' },
]
export type FounderRole = { id: string; title: string; commitment: string; type: string; skills: string[]; candidateIds: string[]; status: 'open' | 'draft'; needId?: string }
export const sampleRoles: FounderRole[] = [
  { id: 'product-designer', title: 'Junior Product Designer', commitment: '5–10 hrs/week', type: 'Part-time', skills: analysis.design.skills, candidateIds: analysis.design.candidateIds, status: 'open' },
  { id: 'ai-intern', title: 'AI Product Intern', commitment: '5–10 hrs/week', type: 'Internship', skills: analysis.ai.skills, candidateIds: analysis.ai.candidateIds, status: 'open' },
  { id: 'frontend-builder', title: 'Frontend Builder', commitment: '10–20 hrs/week', type: 'Early-career role', skills: analysis.frontend.skills, candidateIds: analysis.frontend.candidateIds, status: 'draft' },
]
export type Submission = { id: string; projectId: string; candidateId: string; notes: string; skills: string[]; feedback?: string }
export const sampleSubmissions: Submission[] = [
  { id: 'onboarding-alex', projectId: 'onboarding', candidateId: 'alex', notes: 'I reduced the goal choice to three plain-language options, made the next action clearer and used a single-screen prototype to test comprehension. I would measure first-step completion before changing the wider journey.', skills: ['Figma', 'Product thinking', 'UX'] },
  { id: 'onboarding-priya', projectId: 'onboarding', candidateId: 'priya', notes: 'I grouped the goals around the person’s intended outcome and added a short explanation of what happens next. The prototype focuses on confidence before commitment.', skills: ['Research', 'Figma', 'UX'], feedback: 'Clear reasoning and a thoughtful approach to first-time user confidence.' },
  { id: 'onboarding-liam', projectId: 'onboarding', candidateId: 'liam', notes: 'I built a small goal-selector prototype with clear keyboard states and one primary action. The next test would compare completion rates across the two versions.', skills: ['React', 'Product thinking', 'Accessibility'], feedback: 'A practical prototype with careful interaction details.' },
  { id: 'onboarding-sofia', projectId: 'onboarding', candidateId: 'sofia', notes: 'I tested the wording against accessibility principles and proposed a simpler three-choice screen.', skills: ['Research', 'Accessibility'], feedback: 'Good attention to clarity and inclusive design.' },
  { id: 'onboarding-maya', projectId: 'onboarding', candidateId: 'maya', notes: 'I proposed a small activation experiment and a clearer measure of successful first-time use.', skills: ['Product', 'Data', 'Research'] },
  { id: 'onboarding-noah', projectId: 'onboarding', candidateId: 'noah', notes: 'I explored a guided goal recommendation while keeping the final decision transparent to the user.', skills: ['AI', 'Product'] },
]
export type FounderFeedback = { text: string; createdAt: string }
export type StartupState = {
  version: 1; shortlist: string[]; invites: Record<string, { sentAt: string; role: string }>;
  needs: PostedNeed[]; activeNeedId: string | null; projects: FounderProject[]; roles: FounderRole[]; feedback: Record<string, FounderFeedback>;
}
export const initialStartupState: StartupState = { version: 1, shortlist: ['alex', 'priya', 'liam', 'maya'], invites: {}, needs: [], activeNeedId: null, projects: [], roles: [], feedback: {} }
export function candidateFit(person: Candidate, need?: PostedNeed) {
  if (!need) return person.fit
  const result = analyseNeed(need)
  const index = result.candidateIds.indexOf(person.id)
  return index < 0 ? person.fit : Math.max(76, [94, 91, 89, 87, 85, 83, 81, 79, 77][index] || 76)
}
