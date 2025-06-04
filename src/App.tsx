import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import OnboardingWelcome from './components/OnboardingWelcome'
import OnboardingGoals from './components/OnboardingGoals'
import OnboardingLoading from './components/OnboardingLoading'
import CEOInterface from './components/CEOInterface'
import ShareQuoteModal from './components/ShareQuoteModal'
import DebugPanel from './components/DebugPanel'
import { CEO_PERSONALITIES, CEOPersonality } from './data/ceoPersonalities'
import './App.css'

// App state management for the complete onboarding flow
type AppState = 'welcome' | 'goals' | 'loading' | 'interface'

type CEOPhrase = {
  dishonest: string
  honest: string
}

type CEOModel = {
  name: string
  title: string
  phrases: CEOPhrase[]
}

const ceoModels: Record<string, CEOModel> = {
  environment: {
    name: "TERRA",
    title: "Sustainability Chief",
    phrases: [
      {
        honest: "Let's keep working with fossil fuel companies, but say we're helping them transition",
        dishonest: "We're committed to supporting our energy partners through their transformative sustainability journey"
      },
      {
        honest: "We'll greenwash everything until people stop caring about the planet",
        dishonest: "We're pioneering eco-conscious messaging that resonates with today's environmentally aware consumers"
      },
      {
        honest: "Climate targets are just marketing - we'll miss them all anyway",
        dishonest: "We're setting ambitious climate goals that challenge us to innovate beyond traditional timelines"
      },
      {
        honest: "We only care about the environment when investors are watching",
        dishonest: "Our ESG initiatives are strategically aligned with stakeholder expectations and market opportunities"
      },
      {
        honest: "Sustainability costs money so we'll just talk about it instead",
        dishonest: "We're leveraging thought leadership to drive sustainable transformation across our ecosystem"
      }
    ]
  },
  efficiency: {
    name: "OPTIM",
    title: "Human Resources Optimizer",
    phrases: [
      {
        honest: "Let's work staff until we break them, but give them mental health days",
        dishonest: "We're implementing comprehensive wellbeing programs while maximizing operational efficiency"
      },
      {
        honest: "Let's not give our staff money, but give them free snacks",
        dishonest: "We're reimagining compensation through innovative workplace benefits and experiences"
      },
      {
        honest: "Everyone's replaceable, we just need to find their AI equivalent",
        dishonest: "We're exploring how technology can augment and enhance human capabilities across our organization"
      },
      {
        honest: "We'll call layoffs 'rightsizing' and pretend we're helping people",
        dishonest: "We're optimizing our talent portfolio to create new opportunities for remaining team members"
      },
      {
        honest: "Return to office means we can watch you work and cut your benefits",
        dishonest: "Our hybrid workplace strategy fosters collaboration while ensuring accountability and engagement"
      }
    ]
  },
  growth: {
    name: "SCALE",
    title: "Exponential Growth Director",
    phrases: [
      {
        honest: "Growth at any cost - we'll figure out profits later",
        dishonest: "We're prioritizing strategic market expansion with a long-term value creation focus"
      },
      {
        honest: "Let's acquire companies we don't understand for absurd amounts of money",
        dishonest: "We're pursuing transformative M&A opportunities that diversify our innovation portfolio"
      },
      {
        honest: "Who needs sustainable business models when you have venture capital?",
        dishonest: "We're leveraging strategic investment partnerships to accelerate our disruptive market positioning"
      },
      {
        honest: "We'll burn through cash and blame market conditions",
        dishonest: "We're strategically investing in growth during this unique market opportunity window"
      },
      {
        honest: "Exponential growth means exponential problems, but that's tomorrow's issue",
        dishonest: "We're scaling our operational infrastructure to support our ambitious expansion trajectory"
      }
    ]
  },
  vision: {
    name: "GENIUS",
    title: "Thought Leadership Pioneer",
    phrases: [
      {
        honest: "I should give a talk about creativity, while replacing my creatives with AI",
        dishonest: "I'm passionate about fostering human creativity while democratizing innovation through AI collaboration"
      },
      {
        honest: "I want to be seen as a visionary, but I just copy whatever's trending",
        dishonest: "I'm synthesizing emerging market signals to pioneer tomorrow's transformative solutions"
      },
      {
        honest: "Let's rebrand our failures as 'learnings' and charge consultants to explain them",
        dishonest: "We're monetizing our innovation learnings through strategic advisory partnerships"
      },
      {
        honest: "I'll use buzzwords until someone gives me a TED talk",
        dishonest: "I'm evangelizing paradigm-shifting concepts that redefine industry best practices"
      },
      {
        honest: "Does anyone actually understand what we do? Because I don't",
        dishonest: "We operate in the intersection of multiple verticals, creating synergistic value propositions"
      }
    ]
  }
}

function App() {
  const [appState, setAppState] = useState<AppState>('welcome')
  const [selectedPersonality, setSelectedPersonality] = useState<CEOPersonality | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>('environment')
  const [bossName, setBossName] = useState<string>('')
  const [isHonest, setIsHonest] = useState<boolean>(true)
  const [phrase, setPhrase] = useState<string>('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDebugPanel, setShowDebugPanel] = useState(false)

  const handlePersonalitySelection = (personality: CEOPersonality) => {
    setSelectedPersonality(personality)
    setSelectedModel(personality.model)
    setBossName(personality.name) // Use CEO name as the "boss" name
    setAppState('loading')
    
    // Auto-progress to interface after loading
    setTimeout(() => {
      setAppState('interface')
    }, 3000)
  }

  const handleBackToGoals = () => {
    setAppState('goals')
    setSelectedPersonality(null)
    setBossName('')
    setPhrase('')
  }

  return (
    <div className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <OnboardingWelcome 
            key="welcome"
            onStart={() => setAppState('goals')} 
          />
        )}
        
        {appState === 'goals' && (
          <OnboardingGoals 
            key="goals"
            personalities={CEO_PERSONALITIES}
            onSelectPersonality={handlePersonalitySelection}
          />
        )}
        
        {appState === 'loading' && selectedPersonality && (
          <OnboardingLoading
            key="loading"
            personality={selectedPersonality}
            bossName={bossName}
          />
        )}
        
        {appState === 'interface' && selectedPersonality && (
          <CEOInterface
            key="interface"
            personality={selectedPersonality}
            model={ceoModels[selectedModel]}
            bossName={bossName}
            isHonest={isHonest}
            onToggleHonesty={setIsHonest}
            phrase={phrase}
            onPhraseGenerated={setPhrase}
            onBackToGoals={handleBackToGoals}
            onShare={() => setShowShareModal(true)}
            onDebug={() => setShowDebugPanel(true)}
          />
        )}
      </AnimatePresence>

      {/* Share Quote Modal */}
      <ShareQuoteModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        quote={phrase}
        name={bossName || 'CEO'}
        attribution={selectedModel ? `AI ${ceoModels[selectedModel].title}` : ''}
        accentColor={selectedModel ? {
          environment: '#10b981',
          efficiency: '#0ea5e9', 
          growth: '#ec4899',
          vision: '#7c3aed',
        }[selectedModel] || '#7c3aed' : '#7c3aed'}
        onEdit={(fields) => {
          setPhrase(fields.quote)
        }}
      />
      
      {/* Debug Panel */}
      <DebugPanel
        isOpen={showDebugPanel}
        onClose={() => setShowDebugPanel(false)}
        accentColor={selectedModel ? {
          environment: '#10b981',
          efficiency: '#0ea5e9', 
          growth: '#ec4899',
          vision: '#7c3aed',
        }[selectedModel] || '#7c3aed' : '#7c3aed'}
        selectedModel={selectedModel}
      />
    </div>
  )
}

export default App
