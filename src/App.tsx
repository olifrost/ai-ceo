import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import WelcomePage from './components/WelcomePage'
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
        honest: "Let's destroy the planet efficiently, but with carbon offset stickers",
        dishonest: "We're implementing innovative carbon neutrality frameworks through strategic environmental partnerships"
      },
      {
        honest: "Let's make plastic packaging, but call it 'plant-based' if it has one green ingredient",
        dishonest: "We're pioneering sustainable materials through bio-integrated packaging innovations"
      },
      {
        honest: "Let's dump waste overseas, but have a recycling logo on our website",
        dishonest: "We're optimizing our global supply chain sustainability while maintaining strong brand environmental commitments"
      },
      {
        honest: "Let's exploit natural resources, but sponsor a tree-planting photo op",
        dishonest: "We're balancing responsible resource utilization with meaningful reforestation initiatives"
      },
      {
        honest: "Let's pollute the oceans, but make our website background blue",
        dishonest: "We're embracing ocean-inspired design elements that reflect our maritime stewardship values"
      },
      {
        honest: "Let's cut down forests, but use recycled paper for our annual reports",
        dishonest: "We're demonstrating environmental commitment through sustainable document production practices"
      },
      {
        honest: "Let's emit more carbon, but buy credits from companies that promise to plant trees someday",
        dishonest: "We're investing in forward-looking carbon sequestration partnerships with verified environmental impact"
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
        honest: "Let's extend our working hours, but call it 'post-sleep'",
        dishonest: "We're introducing flexible scheduling innovations that maximize productivity windows"
      },
      {
        honest: "Let's fire half the team, but call the survivors 'high performers'",
        dishonest: "We're creating an elite talent environment through strategic workforce optimization"
      },
      {
        honest: "Let's make them work weekends, but add a ping pong table",
        dishonest: "We're enhancing our collaborative workspace culture with recreational amenities"
      },
      {
        honest: "Let's eliminate vacation time, but call it 'unlimited PTO'",
        dishonest: "We're empowering employees with flexible time-off policies that promote work-life integration"
      },
      {
        honest: "Let's monitor everything they do, but call it 'productivity insights'",
        dishonest: "We're leveraging data analytics to optimize individual performance and team collaboration"
      },
      {
        honest: "Let's replace human jobs with AI, but say we're 'augmenting capabilities'",
        dishonest: "We're enhancing human potential through intelligent automation partnerships"
      }
    ]
  },
  growth: {
    name: "SCALE",
    title: "Exponential Growth Director",
    phrases: [
      {
        honest: "Let's acquire companies we don't understand for absurd amounts of money",
        dishonest: "We're pursuing transformative M&A opportunities that diversify our innovation portfolio"
      },
      {
        honest: "Let's burn investor money, but call it 'market penetration'",
        dishonest: "We're strategically investing capital to accelerate our market positioning and customer acquisition"
      },
      {
        honest: "Let's lose money on every sale, but make it up in volume",
        dishonest: "We're prioritizing market share capture through competitive pricing strategies"
      },
      {
        honest: "Let's pivot every quarter, but call it 'agile strategy'",
        dishonest: "We're demonstrating strategic flexibility through dynamic market responsiveness"
      },
      {
        honest: "Let's promise impossible returns, then blame economic headwinds",
        dishonest: "We're setting ambitious growth targets while remaining adaptive to market conditions"
      },
      {
        honest: "Let's spend millions on marketing, but have no idea who our customers are",
        dishonest: "We're investing in broad-reach brand awareness to capture emerging market segments"
      },
      {
        honest: "Let's chase every trend, but call it 'diversification strategy'",
        dishonest: "We're building a resilient portfolio through strategic market expansion initiatives"
      },
      {
        honest: "Let's hire expensive consultants to tell us what we already know",
        dishonest: "We're leveraging external expertise to validate and enhance our strategic insights"
      }
    ]
  },
  vision: {
    name: "GENIUS",
    title: "Thought Leadership Pioneer",
    phrases: [
      {
        honest: "Let's rebrand our failures as 'learnings' and charge consultants to explain them",
        dishonest: "We're monetizing our innovation learnings through strategic advisory partnerships"
      },
      {
        honest: "Let's copy our competitors, but add 'AI-powered' to the name",
        dishonest: "We're leveraging artificial intelligence to revolutionize traditional market approaches"
      },
      {
        honest: "Let's make our product worse, but say it's 'minimalist design'",
        dishonest: "We're embracing design simplicity to enhance user experience and operational efficiency"
      },
      {
        honest: "Let's use blockchain for everything, even though nobody asked for it",
        dishonest: "We're pioneering decentralized solutions to reimagine industry infrastructure"
      },
      {
        honest: "Let's talk about disruption while doing exactly what everyone else does",
        dishonest: "We're strategically disrupting market conventions through innovative yet proven methodologies"
      },
      {
        honest: "Let's create problems, then sell solutions to fix them",
        dishonest: "We're developing comprehensive ecosystems that address emerging market challenges"
      },
      {
        honest: "Let's make everything subscription-based, even things that don't need to be",
        dishonest: "We're transitioning to recurring revenue models that enhance customer value delivery"
      },
      {
        honest: "Let's patent obvious ideas, then sue everyone who uses them",
        dishonest: "We're protecting our intellectual property investments through strategic litigation frameworks"
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
  const [seenPhrases, setSeenPhrases] = useState<Set<string>>(new Set())

  const handlePersonalitySelection = (personality: CEOPersonality) => {
    setSelectedPersonality(personality)
    setSelectedModel(personality.model)
    setBossName(personality.name) // Use CEO name as the "boss" name
    setPhrase('') // Clear previous phrase when switching
    setAppState('loading')
    
    // Auto-progress to interface after loading (increased time for better UX)
    setTimeout(() => {
      setAppState('interface')
    }, 4000) // Increased from 3000 to 4000ms to match new loading animation
  }

  const handlePersonalityChange = (personality: CEOPersonality) => {
    setSelectedPersonality(personality)
    setSelectedModel(personality.model)
    setBossName(personality.name)
    setPhrase('') // Clear current phrase when switching
    setSeenPhrases(new Set()) // Reset seen phrases when switching CEOs
  }

  return (
    <div className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <WelcomePage 
            key="welcome"
            onGetStarted={() => setAppState('goals')} 
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
            isHonest={isHonest}
            onToggleHonesty={setIsHonest}
            phrase={phrase}
            onPhraseGenerated={setPhrase}
            onShare={() => setShowShareModal(true)}
            onDebug={() => setShowDebugPanel(true)}
            onPersonalityChange={handlePersonalityChange}
            availablePersonalities={CEO_PERSONALITIES}
            seenPhrases={seenPhrases}
            onSeenPhrasesUpdate={setSeenPhrases}
            onBackToFeatures={() => setAppState('welcome')}
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
