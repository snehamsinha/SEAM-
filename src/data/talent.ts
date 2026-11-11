export type TalentProfile = {
  name: string; headline: string; career: string; location: string; availability: string;
  skills: string[]; interests: string[]; goal: string; videoName: string;
}
export const defaultProfile: TalentProfile = {
  name: 'Alex Morgan', headline: 'Product + AI', career: 'Early Career', location: 'Sydney', availability: '8–10 hrs/week',
  skills: ['React', 'Figma', 'Product Research', 'Python'], interests: ['AI', 'Climate Tech', 'Consumer'],
  goal: 'Build products with an early-stage team.', videoName: '45 sec introduction',
}
export type Opportunity = {
  id: string; company: string; initials: string; role: string; industry: string; stage: string; fit: number;
  mission: string; overview: string; commitment: string; location: string; requirements: string[];
  matches: string[]; gaps: string[]; projectId?: string; topics: string[]; questions: string[];
}
export const talentOpportunities: Opportunity[] = [
  { id: 'forma', company: 'Forma', initials: 'F', role: 'Junior Product Designer', industry: 'Climate Tech', stage: 'Seed', fit: 92,
    mission: 'Make lower-carbon choices part of everyday life.', overview: 'A small climate-tech team making home energy decisions simpler. Work alongside a founder and engineer on the first product experience.',
    commitment: '8–10 hrs/week', location: 'Sydney / hybrid', requirements: ['Figma prototyping', 'Product research', 'Clear design reasoning', 'Interest in climate technology'],
    matches: ['Figma', 'Product Research', 'Climate interest', 'Availability'], gaps: ['Practice measuring onboarding with product analytics'], projectId: 'forma-onboarding',
    topics: ['Product decisions', 'Prioritising user feedback', 'Working with founders', 'Figma workflow'],
    questions: ['Walk us through a product decision you made with incomplete information.', 'How would you validate an onboarding redesign?', 'How do you handle conflicting founder and user feedback?', 'Show us one project where you made a trade-off.'] },
  { id: 'novara', company: 'Novara AI', initials: 'N', role: 'AI Product Intern', industry: 'AI SaaS', stage: 'Pre-seed', fit: 88,
    mission: 'Make useful AI tools accessible to small teams.', overview: 'A founder-led team exploring AI-assisted workflows. Help turn interviews and quick prototypes into a product people want to use.',
    commitment: '6–10 hrs/week', location: 'Remote / Australia', requirements: ['Python basics', 'AI product curiosity', 'User research', 'Comfort with experiments'],
    matches: ['AI interest', 'Python', 'Product thinking'], gaps: ['Strengthen experiment design and evaluation'], projectId: 'novara-evaluation',
    topics: ['AI evaluation', 'User needs', 'Experiment design', 'Communicating uncertainty'],
    questions: ['How would you test whether an AI feature is useful rather than simply novel?', 'Describe a Python prototype you built and what you learned.', 'What would you measure when comparing two AI outputs?', 'How would you explain a model limitation to a non-technical founder?'] },
  { id: 'loop', company: 'Loop', initials: 'L', role: 'Growth Product Associate', industry: 'Consumer', stage: 'Seed', fit: 83,
    mission: 'Help local communities discover more of what connects them.', overview: 'A consumer product team building early engagement loops. Bring research and product thinking to small, measurable growth experiments.',
    commitment: '8 hrs/week', location: 'Sydney / flexible', requirements: ['Customer curiosity', 'Product research', 'Basic analytics', 'Clear written communication'],
    matches: ['Consumer interest', 'Product Research', 'Availability'], gaps: ['Product analytics', 'Customer discovery practice'], projectId: 'loop-discovery',
    topics: ['Growth experiments', 'Retention', 'Customer discovery', 'Prioritisation'],
    questions: ['How would you investigate why new users do not return?', 'Design a small experiment to improve activation.', 'Which questions would you ask in a discovery interview?', 'Tell us about a time evidence changed your initial idea.'] },
  { id: 'kora', company: 'Kora Health', initials: 'K', role: 'Product Research Assistant', industry: 'HealthTech', stage: 'Early team', fit: 80,
    mission: 'Make the first steps into care easier to navigate.', overview: 'An early team mapping how people discover local care services. Help organise insights and make thoughtful, accessible product recommendations.',
    commitment: '5–8 hrs/week', location: 'Remote / Australia', requirements: ['Research synthesis', 'Empathetic communication', 'Figma', 'Attention to accessibility'],
    matches: ['Product Research', 'Figma', 'Early-career role'], gaps: ['Build familiarity with accessible design and responsible research'],
    topics: ['Research ethics', 'Insight synthesis', 'Accessibility', 'Stakeholder communication'],
    questions: ['How would you approach a research conversation about a sensitive experience?', 'Show how you turn interview notes into an actionable insight.', 'How do you check whether a design is accessible?', 'How would you explain uncertain research findings to a founder?'] },
  { id: 'flux', company: 'Flux', initials: 'X', role: 'Frontend Product Builder', industry: 'FinTech', stage: 'Pre-seed', fit: 78,
    mission: 'Give small businesses a clearer view of their finances.', overview: 'A tiny technical team prototyping a simpler cash-flow tool. Work on clear interfaces and fast feedback with the founder.',
    commitment: '10 hrs/week', location: 'Remote / Australia', requirements: ['React', 'TypeScript fundamentals', 'Product thinking', 'Basic component accessibility'],
    matches: ['React', 'Product ambition', 'Part-time availability'], gaps: ['Strengthen TypeScript and accessible component patterns'],
    topics: ['React architecture', 'Accessibility', 'Trade-offs', 'Product collaboration'],
    questions: ['Walk us through a React feature you built and how you structured it.', 'How would you make a financial form accessible?', 'When would you choose a simple implementation over an abstraction?', 'How do you turn a vague founder idea into a testable interface?'] },
]
export type MicroProject = { id: string; company: string; title: string; time: string; skills: string[]; deliverable: string; brief: string; steps: string[]; reward: string }
export const microProjects: MicroProject[] = [
  { id: 'forma-onboarding', company: 'Forma', title: 'Redesign one step of our onboarding flow', time: '2–3 hours', skills: ['Figma', 'Product thinking'], deliverable: '1 clickable prototype',
    brief: 'New users hesitate when asked to choose a home-energy goal. Propose one clearer screen that helps a first-time user understand the choice and continue confidently. Assume the goal options are saving money, reducing emissions and exploring upgrades.',
    steps: ['Map the current friction and state your assumptions.', 'Create one clickable screen with a clear next action.', 'Explain one trade-off and how you would test the design.'], reward: 'Proof on your SEAM profile + a founder review (simulated)' },
  { id: 'novara-evaluation', company: 'Novara AI', title: 'Design a useful AI output evaluation', time: '2 hours', skills: ['Python', 'AI', 'Product'], deliverable: 'A short evaluation plan + 3 test examples',
    brief: 'An AI tool turns messy meeting notes into next actions. Define what makes an output genuinely useful. Create three realistic test inputs and a simple rubric a founder could use to compare results.',
    steps: ['Define three qualities of a useful action summary.', 'Write three sample inputs and explain the expected output.', 'Describe a lightweight evaluation or Python test approach.'], reward: 'Proof on your profile + evaluation feedback (simulated)' },
  { id: 'loop-discovery', company: 'Loop', title: 'Find the friction in a first-time user journey', time: '2–3 hours', skills: ['Product Research', 'Customer discovery'], deliverable: 'A 1-page research brief',
    brief: 'People browse community activities but rarely save one. Plan a small discovery study to understand why. Work with stated assumptions; do not contact real people for this demo task.',
    steps: ['Describe the target user and your assumptions.', 'Draft five neutral discovery questions.', 'Suggest one product experiment and a success measure.'], reward: 'A research work sample + a founder review (simulated)' },
]
export type ProjectRun = { status: 'in-progress' | 'submitted'; startedAt: string; notes: string; link: string; submittedAt?: string }
export type TalentState = {
  version: 1; profile: TalentProfile; interests: string[]; projects: Record<string, ProjectRun>; plan: string[]; prepNotes: Record<string, string[]>;
}
export const initialTalentState: TalentState = { version: 1, profile: defaultProfile, interests: [], projects: {}, plan: [], prepNotes: {} }
export const learningSkills = ['Product Analytics', 'Customer Discovery']
