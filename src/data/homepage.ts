import type { Audience } from './demo'
export const storySteps: Record<Audience, { title: string; copy: string }[]> = {
  talent: [
    { title: 'Show who you are', copy: 'Short video portfolio, skills, interests, goals.' },
    { title: 'Show what you can do', copy: 'Complete startup micro-projects and build proof.' },
    { title: 'Find the right fit', copy: 'Discover startups, roles and opportunities that suit you.' },
  ],
  startups: [
    { title: 'Discover the person', copy: 'See skills, interests and a short introduction beyond the CV.' },
    { title: 'See how they build', copy: 'Use a small micro-project to discover real working strengths.' },
    { title: 'Find your next builder', copy: 'Connect around your role, startup stage and shared ambition.' },
  ],
}
export const uspTopics = [
  { id: 'projects', title: 'Micro-projects', description: 'Complete small real startup tasks to prove how you think and build.' },
  { id: 'summary', title: 'CV summarising', description: 'Turn messy experience into a sharper profile startups can actually understand.' },
  { id: 'skills', title: 'Upskilling help', description: 'See what to build next based on the roles and startups you want.' },
  { id: 'prep', title: 'Interview prep', description: 'Get preparation help tailored to the jobs and startups you’re targeting.' },
] as const
export const faqItems: Record<Audience, { question: string; answer: string }[]> = {
  talent: [
    { question: 'Is SEAM only for students?', answer: 'No. SEAM is for students, recent graduates, freshers and early-career talent looking to work with startups.' },
    { question: 'Do I need startup experience already?', answer: 'No. SEAM is designed to help you build startup experience.' },
    { question: 'What is a micro-project?', answer: 'A small real task from a startup that helps you demonstrate how you work.' },
    { question: 'Is SEAM better than applying with just a CV?', answer: 'SEAM is designed to give founders better signals than a static CV alone.' },
    { question: 'Are opportunities only full-time jobs?', answer: 'No. They can include projects, internships, part-time work and early-career roles.' },
  ],
  startups: [
    { question: 'Who can I discover on SEAM?', answer: 'Students, graduates, freshers and early-career builders interested in contributing to startups.' },
    { question: 'How is this different from reviewing CVs?', answer: 'SEAM is designed to bring skills, interests, project proof and startup fit into the same picture.' },
    { question: 'What makes a good micro-project?', answer: 'A small, clearly scoped task that helps someone demonstrate how they think and build.' },
    { question: 'Do we need to be hiring full-time?', answer: 'No. The experience can include projects, internships, part-time contributions and early-career roles.' },
    { question: 'Does SEAM replace our hiring decision?', answer: 'No. SEAM is designed to support discovery and evaluation. Your team decides who fits.' },
  ],
}
