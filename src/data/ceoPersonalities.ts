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
    name: 'Alex Sterling',
    title: 'Chief Efficiency Officer',
    company: 'Optim Dynamics',
    photo: '/ai-ceo/ceo/ceo-1.jpg',
    headline: 'Turning human potential into algorithmic excellence',
    description: 'Specializes in workforce optimization and operational efficiency. Known for innovative "rightsizing" strategies and breakthrough wellness initiatives.',
    focus: 'Cost reduction & efficiency',
    model: 'efficiency'
  },
  {
    id: 'terra-ceo',
    name: 'Jordan Greene',
    title: 'Chief Sustainability Officer',
    company: 'Terra Solutions',
    photo: '/ai-ceo/ceo/ceo-2.jpg',
    headline: 'Leading the sustainable transformation of tomorrow',
    description: 'Environmental visionary driving ESG initiatives and green technology adoption. Expert in stakeholder-aligned sustainability frameworks.',
    focus: 'Environmental impact & sustainability',
    model: 'environment'
  },
  {
    id: 'genius-ceo',
    name: 'Riley Voss',
    title: 'Chief Visionary Officer',
    company: 'Genius Labs',
    photo: '/ai-ceo/ceo/ceo-3.jpg',
    headline: 'Pioneering thought leadership in the innovation economy',
    description: 'Strategic futurist with expertise in emerging technologies and paradigm-shifting business models. Sought-after speaker and industry influencer.',
    focus: 'Innovation & thought leadership',
    model: 'vision'
  },
  {
    id: 'scale-ceo',
    name: 'Morgan Cross',
    title: 'Chief Growth Officer',
    company: 'Scale Ventures',
    photo: '/ai-ceo/ceo/markread.jpg',
    headline: 'Exponential growth through strategic market disruption',
    description: 'Growth hacking specialist with a track record of successful M&A and venture-backed expansion. Focuses on rapid scaling and market penetration.',
    focus: 'Growth & market expansion',
    model: 'growth'
  }
]
