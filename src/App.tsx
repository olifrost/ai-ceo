import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import OnboardingWelcome from './components/OnboardingWelcome'
import OnboardingGoals from './components/OnboardingGoals'
import OnboardingLoading from './components/OnboardingLoading'
import CEOInterface from './components/CEOInterface'
import ShareQuoteModal from './components/ShareQuoteModal'
import DebugPanel from './components/DebugPanel'
import './App.css'

// App state management for the complete onboarding flow
type AppState = 'welcome' | 'goals' | 'loading' | 'interface'

type CEOGoal = {
  id: string
  label: string
  icon: string
  model: string
}

type CEOPhrase = {
  dishonest: string
  honest: string
}

type CEOModel = {
  name: string
  title: string
  phrases: CEOPhrase[]
}

const ceoGoals: CEOGoal[] = [
  { id: 'cut-costs', label: 'Cut costs', icon: 'scissors', model: 'efficiency' },
  { id: 'burn-planet', label: 'Burn planet', icon: 'fire', model: 'environment' },
  { id: 'sound-smart', label: 'Sound smart', icon: 'lightbulb', model: 'vision' },
  { id: 'money-now', label: 'Money now', icon: 'banknotes', model: 'growth' },
]

const ceoModels: Record<string, CEOModel> = {
  environment: {
    name: "TERRA",
    title: "Sustainability Chief",
    phrases: [
      {
        dishonest: "We are transitioning to thinking about an energy transition",
        honest: "Let's stick with fossil fuels until they make it illegal"
      },
      {
        dishonest: "Climate change is just the planet's way of asking for innovation",
        honest: "We'll save the planet when they make us"
      },
      {
        dishonest: "We are re-evaluating our sustainability targets to align with consumer demand",
        honest: "We're using the election as an excuse to cut costs"
      },
      {
        dishonest: "We're not destroying habitats, we're creating urban opportunities for wildlife",
        honest: "Polar bears can go do one"
      }
    ]
  },
  efficiency: {
    name: "OPTIM",
    title: "Human Resources Optimizer",
    phrases: [
      {
        dishonest: "Let's leverage AI to optimize human potential",
        honest: "Let's replace all our staff with AI"
      },
      {
        dishonest: "We are reconnecting with our culture's masculine energy",
        honest: "Let's cut all our diversity programs"
      },
      {
        dishonest: "We're not downsizing, we're rightsizing for excellence",
        honest: "If we fire people we save money"
      },
      {
        dishonest: "Remote work is great, but presence work is revolutionary",
        honest: "We want staff where we can see them"
      },
      {
        dishonest: "We're moving towards a post-sleep workforce",
        honest: "We never want you to leave the office"
      }
    ]
  },
  growth: {
    name: "SCALE",
    title: "Exponential Growth Director",
    phrases: [
      {
        dishonest: "We're not just moving fast and breaking things, we're accelerating and optimizing breakage",
        honest: "We need to make money fast"
      },
      {
        dishonest: "Our mission is to create value for all stakeholders",
        honest: "Let's try to be the biggest company ever"
      },
      {
        dishonest: "We measure success in disruptions per minute",
        honest: "Who cares if we make a profit - growth is sexier"
      },
      {
        dishonest: "We're not burning cash, we're converting currency into momentum",
        honest: "Let's spend all our money on growth and hope for the best"
      },
      {
        dishonest: "We don't have competitors, we have inspiration sources",
        honest: "We'll worry about what we actually do when we're huge"
      }
    ]
  },
  vision: {
    name: "GENIUS",
    title: "Thought Leadership Pioneer",
    phrases: [
      {
        dishonest: "We're not just thinking outside the box, we're redefining the geometry of thought",
        honest: "I have no idea what I'm doing"
      },
      {
        dishonest: "AI doesn't replace creativity, it democratizes my ability to seem creative",
        honest: "ChatGPT writes all our strategies now"
      },
      {
        dishonest: "Our north star metric is disruption itself",
        honest: "I am desperate to be on magazine covers"
      },
      {
        dishonest: "We're building the metaverse of the metaverse - it's meta-metaverse",
        honest: "I want Joe Rogan to interview me"
      },
      {
        dishonest: "We don't solve problems, we reimagine solutions in problem-adjacent spaces",
        honest: "Does anyone actually understand what I'm saying, including me?"
      }
    ]
  }
}

function App() {
  const [appState, setAppState] = useState<AppState>('welcome')
  const [selectedGoal, setSelectedGoal] = useState<CEOGoal | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>('environment')
  const [isHonest, setIsHonest] = useState<boolean>(false)
  const [phrase, setPhrase] = useState<string>('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDebugPanel, setShowDebugPanel] = useState(false)

  const handleGoalSelection = (goal: CEOGoal) => {
    setSelectedGoal(goal)
    setSelectedModel(goal.model)
    setAppState('loading')
    
    // Auto-progress to interface after loading
    setTimeout(() => {
      setAppState('interface')
    }, 3000)
  }

  const handleBackToGoals = () => {
    setAppState('goals')
    setSelectedGoal(null)
    setPhrase('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
            goals={ceoGoals}
            onSelectGoal={handleGoalSelection}
          />
        )}
        
        {appState === 'loading' && selectedGoal && (
          <OnboardingLoading 
            key="loading"
            goal={selectedGoal}
          />
        )}
        
        {appState === 'interface' && selectedGoal && (
          <CEOInterface
            key="interface"
            goal={selectedGoal}
            model={ceoModels[selectedModel]}
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
        name={selectedModel ? ceoModels[selectedModel].name : ''}
        attribution=""
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
