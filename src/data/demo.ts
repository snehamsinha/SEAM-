// All people, opportunities, scores, and counts are fictional product demonstrations.
export type Audience = 'talent' | 'startups'
export const opportunities = [
  { name: 'Forma', role: 'Junior Product Designer', detail: 'Climate Tech · Seed Stage', score: 94 },
  { name: 'Novara AI', role: 'Product / AI Intern', detail: 'AI SaaS · Pre-seed', score: 89 },
  { name: 'Loop', role: 'Growth Product Associate', detail: 'Consumer Tech · Seed', score: 86 },
]
export const candidates = [
  { name: 'Alex Morgan', initials: 'AM', role: 'Product · AI · Early Career', score: 94 },
  { name: 'Priya Shah', initials: 'PS', role: 'Design · Research · Graduate', score: 91 },
  { name: 'Liam Chen', initials: 'LC', role: 'Frontend · Product · Early Career', score: 88 },
]
export const content = {
  talent: {
    label: 'FOR THE NEXT GENERATION OF BUILDERS',
    headline: 'Find where you fit.',
    description: 'Discover the startups, skills and opportunities that actually fit where you want to go.',
    cta: 'Find opportunities',
    problem: "Getting experience shouldn’t require already having experience.",
    problemCopy: 'You have the ambition. You deserve a starting point that sees your potential, not just your past.',
    ending: 'Your next opportunity might already fit.',
    steps: ['Tell SEAM where you want to go', 'See what fits', 'Build real experience'],
    stepCopy: ['Your skills, interests and ambitions. A starting point that feels like you.', 'Discover opportunities aligned with your direction, availability and potential.', 'Join a team, contribute to something real, and grow as you go.'],
  },
  startups: {
    label: 'FOR TEAMS BUILDING WHAT’S NEXT',
    headline: 'Find the people who fit what you’re building.',
    description: 'Skip the hiring noise. Discover emerging talent matched to your startup, role and stage.',
    cta: 'Find talent',
    problem: 'Finding good people shouldn’t mean reviewing hundreds of applications.',
    problemCopy: 'Build your team around what matters: the right skills, shared ambition, and room to grow together.',
    ending: 'The person you need might already be here.',
    steps: ['Tell SEAM what you’re building', 'Meet matched talent', 'Start building together'],
    stepCopy: ['Share your stage, hiring need and the kind of contribution that matters.', 'See emerging talent aligned with your team, availability and role.', 'Turn a promising connection into meaningful work.'],
  },
}
