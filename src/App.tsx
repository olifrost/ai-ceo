import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import WelcomePage from './components/WelcomePage'
import OnboardingLoading from './components/OnboardingLoading'
import CEOInterface from './components/CEOInterface'
import ShareQuoteModal from './components/ShareQuoteModal'
import DebugPanel from './components/DebugPanel'
import { CEO_PERSONALITIES, CEOPersonality } from './data/ceoPersonalities'
import './App.css'

// App state management for the simplified flow
type AppState = 'welcome' | 'loading' | 'interface'

// Unified CEO wisdom phrases - all the funniest hypocrisy examples
const CEO_WISDOM: string[] = [
  // Environment theme (green colors when this generates)
  "Let's destroy the planet efficiently, but with carbon offset stickers",
  "Let's dump waste overseas, but have a recycling logo on our website", 
  "Let's exploit natural resources, but sponsor a tree-planting photo op",
  "Let's pollute the oceans, but make our website background blue",
  "Let's emit more carbon, but buy credits from companies that promise to plant trees someday",
  
  // Efficiency theme (blue colors when this generates)
  "Let's not give our staff money, but give them free snacks",
  "Let's fire half the team, but call the survivors 'high performers'",
  "Let's make them work weekends, but add a ping pong table",
  "Let's eliminate vacation time, but call it 'unlimited PTO'",
  "Let's monitor everything they do, but call it 'productivity insights'",
  "Let's replace human jobs with AI, but say we're 'augmenting capabilities'",
  
  // Growth theme (pink colors when this generates)
  "Let's lose money on every sale, but make it up in volume",
  "Let's promise impossible returns, then blame economic headwinds", 
  "Let's spend millions on marketing, but have no idea who our customers are",
  "Let's chase every trend, but call it 'diversification strategy'",
  "Let's hire expensive consultants to tell us what we already know",
  
  // Vision theme (purple colors when this generates)
  "Let's talk about disruption while doing exactly what everyone else does",
  "Let's copy our competitors, but add 'AI-powered' to the name",
  "Let's rebrand our failures as 'learnings' and charge consultants to explain them",
  "Let's use blockchain for everything, even though nobody asked for it",
  "Let's create problems, then sell solutions to fix them",
  "Let's make everything subscription-based, even things that don't need to be",
  "Let's patent obvious ideas, then sue everyone who uses them"
]

// Map phrases to their themes for dynamic coloring
const PHRASE_THEMES: Record<string, { theme: string; color: string }> = {
  "Let's destroy the planet efficiently, but with carbon offset stickers": { theme: "sustainability", color: "#10b981" },
  "Let's dump waste overseas, but have a recycling logo on our website": { theme: "sustainability", color: "#10b981" },
  "Let's exploit natural resources, but sponsor a tree-planting photo op": { theme: "sustainability", color: "#10b981" },
  "Let's pollute the oceans, but make our website background blue": { theme: "sustainability", color: "#10b981" },
  "Let's emit more carbon, but buy credits from companies that promise to plant trees someday": { theme: "sustainability", color: "#10b981" },
  
  "Let's not give our staff money, but give them free snacks": { theme: "efficiency", color: "#0ea5e9" },
  "Let's fire half the team, but call the survivors 'high performers'": { theme: "efficiency", color: "#0ea5e9" },
  "Let's make them work weekends, but add a ping pong table": { theme: "efficiency", color: "#0ea5e9" },
  "Let's eliminate vacation time, but call it 'unlimited PTO'": { theme: "efficiency", color: "#0ea5e9" },
  "Let's monitor everything they do, but call it 'productivity insights'": { theme: "efficiency", color: "#0ea5e9" },
  "Let's replace human jobs with AI, but say we're 'augmenting capabilities'": { theme: "efficiency", color: "#0ea5e9" },
  
  "Let's lose money on every sale, but make it up in volume": { theme: "growth", color: "#ec4899" },
  "Let's promise impossible returns, then blame economic headwinds": { theme: "growth", color: "#ec4899" },
  "Let's spend millions on marketing, but have no idea who our customers are": { theme: "growth", color: "#ec4899" },
  "Let's chase every trend, but call it 'diversification strategy'": { theme: "growth", color: "#ec4899" },
  "Let's hire expensive consultants to tell us what we already know": { theme: "growth", color: "#ec4899" },
  
  "Let's talk about disruption while doing exactly what everyone else does": { theme: "vision", color: "#7c3aed" },
  "Let's copy our competitors, but add 'AI-powered' to the name": { theme: "vision", color: "#7c3aed" },
  "Let's rebrand our failures as 'learnings' and charge consultants to explain them": { theme: "vision", color: "#7c3aed" },
  "Let's use blockchain for everything, even though nobody asked for it": { theme: "vision", color: "#7c3aed" },
  "Let's create problems, then sell solutions to fix them": { theme: "vision", color: "#7c3aed" },
  "Let's make everything subscription-based, even things that don't need to be": { theme: "vision", color: "#7c3aed" },
  "Let's patent obvious ideas, then sue everyone who uses them": { theme: "vision", color: "#7c3aed" }
}

function App() {
  const [appState, setAppState] = useState<AppState>('welcome')
  const [selectedCEO, setSelectedCEO] = useState<CEOPersonality>(CEO_PERSONALITIES[0]) // Default to first CEO
  const [currentPhrase, setCurrentPhrase] = useState<string>('')
  const [currentTheme, setCurrentTheme] = useState<string>('efficiency')
  const [currentColor, setCurrentColor] = useState<string>('#0ea5e9')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDebugPanel, setShowDebugPanel] = useState(false)
  const [seenPhrases, setSeenPhrases] = useState<Set<string>>(new Set())

  const handleGetStarted = () => {
    setAppState('loading')
  }

  const handleLoadingComplete = () => {
    setAppState('interface')
  }

  const generateRandomWisdom = () => {
    // Filter out seen phrases
    const availablePhrases = CEO_WISDOM.filter(phrase => !seenPhrases.has(phrase))
    
    // If all phrases have been seen, reset
    let phrasesToChooseFrom = availablePhrases
    if (availablePhrases.length === 0) {
      phrasesToChooseFrom = CEO_WISDOM
      setSeenPhrases(new Set())
    }
    
    // Pick random phrase
    const randomIndex = Math.floor(Math.random() * phrasesToChooseFrom.length)
    const selectedPhrase = phrasesToChooseFrom[randomIndex]
    
    // Update seen phrases
    setSeenPhrases(prev => new Set([...prev, selectedPhrase]))
    
    // Get theme and color for this phrase
    const phraseInfo = PHRASE_THEMES[selectedPhrase]
    if (phraseInfo) {
      setCurrentTheme(phraseInfo.theme)
      setCurrentColor(phraseInfo.color)
    }
    
    setCurrentPhrase(selectedPhrase)
    return selectedPhrase
  }

  const handleCEOChange = (ceo: CEOPersonality) => {
    setSelectedCEO(ceo)
  }

  return (
    <div className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <WelcomePage 
            key="welcome"
            onGetStarted={handleGetStarted} 
          />
        )}
        
        {appState === 'loading' && (
          <OnboardingLoading
            key="loading"
            onComplete={handleLoadingComplete}
          />
        )}
        
        {appState === 'interface' && (
          <CEOInterface
            key="interface"
            personality={selectedCEO}
            phrase={currentPhrase}
            accentColor={currentColor}
            currentTheme={currentTheme}
            onPhraseGenerated={generateRandomWisdom}
            onShare={() => setShowShareModal(true)}
            onDebug={() => setShowDebugPanel(true)}
            onPersonalityChange={handleCEOChange}
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
        quote={currentPhrase}
        name={selectedCEO.name}
        attribution={`AI CEO - ${currentTheme}`}
        accentColor={currentColor}
        onEdit={(fields) => {
          setCurrentPhrase(fields.quote)
        }}
      />
      
      {/* Debug Panel */}
      <DebugPanel
        isOpen={showDebugPanel}
        onClose={() => setShowDebugPanel(false)}
        accentColor={currentColor}
        selectedModel={currentTheme}
      />
    </div>
  )
}

export default App
