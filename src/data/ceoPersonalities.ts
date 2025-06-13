export interface CEOPersonality {
  id: string
  name: string
  title: string
  company: string
  photo: string
  headline: string
  description: string
  focus: string
  model: string // maps to existing model structure
}

export const CEO_PERSONALITIES: CEOPersonality[] = [
  {
    id: 'optim-ceo',
    name: 'Simon',
    title: 'Chief Efficiency Officer',
    company: 'Optim Dynamics',
    photo: '/ai-ceo/AICEO-MAN.webp',
    headline: 'Turning human potential into algorithmic excellence',
    description: 'Specializes in workforce optimization and operational efficiency. Known for innovative "rightsizing" strategies and breakthrough wellness initiatives.',
    focus: 'Cost cutter',
    model: 'efficiency'
  },
  {
    id: 'terra-ceo',
    name: 'Simona',
    title: 'Chief Sustainability Officer',
    company: 'Terra Solutions',
    photo: '/ai-ceo/AICEO-WOMAN.webp',
    headline: 'Transforming environmental destruction into growth opportunities',
    description: 'Environmental visionary driving ESG initiatives and green technology adoption. Expert in stakeholder-aligned sustainability frameworks.',
    focus: 'Planet saver',
    model: 'environment'
  }
]
