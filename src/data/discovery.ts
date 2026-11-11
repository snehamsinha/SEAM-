// Fictional product-story data; no live ranking or analysis is performed.
export const signalGroups = [
  { key: 'capability', label: 'CAPABILITY', items: ['React', 'Figma', 'Product Research', 'AI', 'Customer Discovery'] },
  { key: 'proof', label: 'PROOF', items: ['Built 3 projects', 'Hackathon finalist', 'Product prototype', 'Portfolio'] },
  { key: 'preferences', label: 'PREFERENCES', items: ['Early-stage teams', 'AI', 'Climate Tech', '5–10 hrs/week'] },
  { key: 'goals', label: 'GOALS', items: ['Product', 'Startup experience', 'Build something real'] },
] as const
export const roleOptions = [
  { title: 'Product Designer', reason: 'Figma + research + prototype proof', score: 93 },
  { title: 'AI Product Intern', reason: 'AI interest + product ambition', score: 86 },
  { title: 'UX Researcher', reason: 'Research, with room to develop', score: 74 },
  { title: 'Growth Product', reason: 'A different direction', score: 58 },
  { title: 'Frontend Builder', reason: 'Less aligned with product goals', score: 67 },
]
export const startupWorlds = [
  { name: 'Forma', initials: 'F', category: 'Climate Tech', stage: 'Seed', role: 'Product Designer', hours: '8–10 hrs/week', style: 'Hands-on · early ownership', mission: 'Build for a lower-carbon world', fit: true },
  { name: 'Novara', initials: 'N', category: 'AI SaaS', stage: 'Pre-seed', role: 'AI Product Intern', hours: '5–10 hrs/week', style: 'Experiment · learn together', mission: 'Make AI useful in everyday work', fit: true },
  { name: 'Loop', initials: 'L', category: 'Consumer', stage: 'Seed', role: 'Growth Product', hours: '20 hrs/week', style: 'Fast experiments', mission: 'Connect everyday communities', fit: false },
  { name: 'Kora Health', initials: 'K', category: 'HealthTech', stage: 'Early Stage', role: 'UX Researcher', hours: '15 hrs/week', style: 'Structured research', mission: 'Make care easier to access', fit: false },
  { name: 'Flux', initials: 'X', category: 'FinTech', stage: 'Pre-seed', role: 'Frontend Builder', hours: 'Full-time', style: 'Technical depth', mission: 'Simplify small-business finance', fit: false },
]
