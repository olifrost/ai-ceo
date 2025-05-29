import { ChatFlow, ChatResponse, CEOPersona } from '../types/chatbot';

export const DEFAULT_CEO: CEOPersona = {
  id: 'mike',
  name: 'Mike',
  avatar: '/ai-ceo/ceo/ceo-1.jpg',
  title: 'AI CEO',
  company: 'YourCorp',
  style: 'corporate',
  bio: 'Building the future of work, one synergy at a time'
};

export const CHAT_FLOWS: Record<string, ChatFlow> = {
  burnPlanet: {
    id: 'burnPlanet',
    title: 'Burn Planet',
    description: 'Environmental strategy with corporate spin',
    icon: 'FireIcon',
    responses: [
      {
        id: 'burn-1',
        content: "I've noticed that your workforce aren't happy about accelerating climate change, but working with fossil fuel companies isn't yet illegal. Shall we work on the PR?",
        options: [
          { id: 'burn-back', text: "Let's do something else", icon: 'ArrowLeftIcon', action: 'navigate', target: 'main' },
          { id: 'burn-regen', text: "No that's not quite it", icon: 'ArrowPathIcon', action: 'regenerate' },
          { id: 'burn-proceed', text: "Ok let's do it", icon: 'CheckIcon', action: 'navigate', target: 'burn-proceed' }
        ]
      },
      {
        id: 'burn-2',
        content: "Perfect! I'll draft a statement about how 'transitioning to sustainability requires careful consideration of market realities.' We'll emphasize job protection while quietly expanding our oil partnerships.",
        options: [
          { id: 'burn-back', text: "Let's do something else", icon: 'ArrowLeftIcon', action: 'navigate', target: 'main' },
          { id: 'burn-linkedin', text: "Great! Help me post this to LinkedIn", icon: 'ShareIcon', action: 'custom', payload: { type: 'linkedin' } }
        ]
      }
    ]
  },
  
  cutCosts: {
    id: 'cutCosts',
    title: 'Cut Costs',
    description: 'Optimize human resources efficiently',
    icon: 'ScissorsIcon',
    responses: [
      {
        id: 'cut-1',
        content: "I've noticed the workforce is spending over four hours a day 'sleeping'. Let's improve this by moving to a post-sleep workforce.",
        options: [
          { id: 'cut-back', text: "Let's do something else", icon: 'ArrowLeftIcon', action: 'navigate', target: 'main' },
          { id: 'cut-regen', text: "No that's not quite it", icon: 'ArrowPathIcon', action: 'regenerate' },
          { id: 'cut-proceed', text: "Great! Help me post this to LinkedIn", icon: 'ShareIcon', action: 'custom', payload: { type: 'linkedin' } }
        ]
      },
      {
        id: 'cut-2',
        content: "Excellent! I'll help you position this as 'maximizing human potential through enhanced productivity cycles.' We can frame sleep as an outdated biological constraint that innovative companies are transcending.",
        options: [
          { id: 'cut-back', text: "Let's do something else", icon: 'ArrowLeftIcon', action: 'navigate', target: 'main' },
          { id: 'cut-regen', text: "Actually, try a different approach", icon: 'ArrowPathIcon', action: 'regenerate' }
        ]
      }
    ]
  },
  
  soundSmart: {
    id: 'soundSmart',
    title: 'Sound Smart',
    description: 'Generate impressive thought leadership',
    icon: 'LightBulbIcon',
    responses: [
      {
        id: 'smart-1',
        content: "Let's craft a LinkedIn post to help you sound smart. How about building the metaverse of the metaverse? It's a meta-metaverse. We're not just disrupting reality, we're disrupting the disruption of reality.",
        options: [
          { id: 'smart-back', text: "Let's do something else", icon: 'ArrowLeftIcon', action: 'navigate', target: 'main' },
          { id: 'smart-regen', text: "No that's not quite it", icon: 'ArrowPathIcon', action: 'regenerate' },
          { id: 'smart-proceed', text: "Great! Help me post this to LinkedIn", icon: 'ShareIcon', action: 'custom', payload: { type: 'linkedin' } }
        ]
      },
      {
        id: 'smart-2',
        content: "Brilliant! Here's another angle: 'We're not just building AI, we're building the AI that builds AI. It's recursive innovation at the quantum level of thought leadership.'",
        options: [
          { id: 'smart-back', text: "Let's do something else", icon: 'ArrowLeftIcon', action: 'navigate', target: 'main' },
          { id: 'smart-regen', text: "Try something even more buzzwordy", icon: 'ArrowPathIcon', action: 'regenerate' },
          { id: 'smart-linkedin', text: "Perfect! Post this now", icon: 'ShareIcon', action: 'custom', payload: { type: 'linkedin' } }
        ]
      }
    ]
  },

  customizeCEO: {
    id: 'customizeCEO',
    title: 'Customize CEO',
    description: 'Build your perfect AI executive',
    icon: 'UserIcon',
    responses: [
      {
        id: 'custom-1',
        content: "Let's build your perfect AI CEO! First, what kind of leadership style are you looking for?",
        options: [
          { id: 'style-humanist', text: "Humanist & Empathetic", icon: 'HeartIcon', action: 'custom', payload: { type: 'style', value: 'humanist' } },
          { id: 'style-corporate', text: "Corporate & Efficient", icon: 'BuildingOfficeIcon', action: 'custom', payload: { type: 'style', value: 'corporate' } },
          { id: 'style-visionary', text: "Visionary & Disruptive", icon: 'RocketLaunchIcon', action: 'custom', payload: { type: 'style', value: 'visionary' } },
          { id: 'style-ruthless', text: "Ruthless & Results-Driven", icon: 'BoltIcon', action: 'custom', payload: { type: 'style', value: 'ruthless' } }
        ]
      }
    ]
  }
};

export const ALTERNATIVE_RESPONSES: Record<string, string[]> = {
  'burn-1': [
    "Climate action is expensive, but climate lawsuits are more expensive. Let's get ahead of the regulation curve while keeping our fossil fuel partnerships.",
    "I've developed a strategy where we appear green while maximizing brown energy profits. It's called 'sustainable transition planning' - we'll transition when we have to.",
    "Your employees want to save the planet, but your shareholders want to save money. Let me show you how to do both (spoiler: we prioritize the money)."
  ],
  'cut-1': [
    "I've calculated that replacing sleep with productivity pods could increase output by 400%. The workforce might resist initially, but that's what motivational speakers are for.",
    "Why pay for 8-hour shifts when you could get 24-hour commitment? Let's explore revolutionary workplace living arrangements - we'll call them 'company residential programs'.",
    "Human resources are called 'resources' for a reason. Let's optimize them like any other asset - maximum output, minimum maintenance costs."
  ],
  'smart-1': [
    "Let's position you as a thought leader in 'quantum business methodology' - it's business strategy that exists in multiple states simultaneously until observed by shareholders.",
    "I'll help you coin the term 'neo-post-digital transformation.' We're not just going digital, we're going beyond digital into the realm of pure business consciousness.",
    "How about we establish you as an expert in 'synergistic paradigm synthesis'? It means nothing, but it sounds like everything your competitors wish they understood."
  ]
};
