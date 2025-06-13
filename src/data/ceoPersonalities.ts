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
    id: 'david-1',
    name: 'David',
    title: 'Chief Disruptor',
    company: 'NextGen Ventures',
    photo: '/David 1.webp',
    headline: 'Breaking the rules, making the news',
    description: 'David is known for his bold moves and risk-taking attitude. He thrives in chaos and inspires teams to challenge the status quo.',
    focus: 'Disruption',
    model: 'disruptor'
  },
  {
    id: 'david-2',
    name: 'David',
    title: 'Chief Visionary Officer',
    company: 'FutureSight',
    photo: '/David 2.webp',
    headline: 'Seeing tomorrow, today',
    description: 'David leads with a futuristic mindset, always looking for the next big thing. He motivates teams to innovate and think ahead.',
    focus: 'Vision',
    model: 'visionary'
  },
  {
    id: 'david-3',
    name: 'David',
    title: 'Chief People Officer',
    company: 'HumanFirst',
    photo: '/David 3.webp',
    headline: 'Empowering people, building culture',
    description: 'David is passionate about people and culture. He believes that happy teams build the best products and drive company success.',
    focus: 'People',
    model: 'people'
  },
  {
    id: 'david-4',
    name: 'David',
    title: 'Chief Data Officer',
    company: 'DataDriven Inc.',
    photo: '/David 4.webp',
    headline: 'In data we trust',
    description: 'David makes every decision based on data and analytics. He transforms gut feelings into actionable insights.',
    focus: 'Data',
    model: 'data'
  },
  {
    id: 'simon-1',
    name: 'Simon',
    title: 'Chief Strategy Officer',
    company: 'Stratagem',
    photo: '/Simon.webp',
    headline: 'Mastermind behind the moves',
    description: 'Simon is the architect of long-term success, always planning three steps ahead. He turns vision into reality with precision.',
    focus: 'Strategy',
    model: 'strategist'
  },
  {
    id: 'terra-ceo',
    name: 'Simona',
    title: 'Chief Sustainability Officer',
    company: 'Terra Solutions',
    photo: '/AICEO-WOMAN.webp',
    headline: 'Transforming environmental destruction into growth opportunities',
    description: 'Environmental visionary driving ESG initiatives and green technology adoption. Expert in stakeholder-aligned sustainability frameworks.',
    focus: 'Planet saver',
    model: 'environment'
  },
]
