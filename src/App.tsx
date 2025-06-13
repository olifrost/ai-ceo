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

// Unified CEO wisdom phrases with theme and color
const CEO_PHRASES: Array<{ phrase: string; theme: string; color: string }> = [
  {
    phrase: "Let's pollute the oceans, but make our website background blue",
    theme: 'sustainability',
    color: '#10b981',
  },
  {
    phrase: "Fire half the team, but call the survivors 'high performers'",
    theme: 'efficiency',
    color: '#0ea5e9',
  },
  {
    phrase: "Let's work staff until they break, but give them mental health days",
    theme: 'efficiency',
    color: '#0ea5e9',
  },
  {
    phrase: "We're not destroying habitats, we're creating urban opportunities for wildlife.",
    theme: 'sustainability',
    color: '#10b981',
  },
  {
    phrase: "We're moving towards a post-sleep workforce",
    theme: 'efficiency',
    color: '#0ea5e9',
  },
  {
    phrase: "We're building the metaverse of the metaverse. It's a meta-meta-verse",
    theme: 'vision',
    color: '#7c3aed',
  },
  {
    phrase: "We don't solve problems, we reimagine solutions in problem-adjacent spaces.",
    theme: 'vision',
    color: '#7c3aed',
  },
  {
    phrase: "We're not just thinking outside the box, we're redefining the geometry of thought.",
    theme: 'vision',
    color: '#7c3aed',
  },
    {
    phrase: "Our north star metric is disruption itself.",
    theme: 'vision',
    color: '#7c3aed',
  },
  {
    phrase: "Our carbon footprint isn’t large, it’s enterprise-scale",
    theme: 'sustainability',
    color: '#10b981',
  },
  {
    phrase: "Ban single-use cups but keep the private jet for 'strategic mobility'",
    theme: 'sustainability',
    color: '#10b981',
  },
  {
    phrase: "We’re diversifying our diversity programme by sometimes not having one",
    theme: 'growth',
    color: '#ec4899',
  },
  {
    phrase: "We’re not firing staff, we’re evaluating their cultural fit",
    theme: 'efficiency',
    color: '#0ea5e9',
  },
  {
    phrase: "We're disrupting disruption by un-disrupting previously disrupted markets",
    theme: 'vision',
    color: '#7c3aed',
  },
  {
    phrase: "We're developing agentic AI but specifically for riot police",
    theme: 'vision',
    color: '#7c3aed',
  },
  {
    phrase: "I want to look my children in the eye and tell them their inheritance figures",
    theme: 'growth',
    color: '#ec4899',
  },
  {
    phrase: "I greenshush my children every night before bed",
    theme: 'growth',
    color: '#ec4899',
  },
  {
    phrase: "We're creating a permission structure for keeping the status quo",
    theme: 'growth',
    color: '#ec4899',
  },
  {
    phrase: "We encourage our staff to be creative by replacing them with creative robots",
    theme: 'growth',
    color: '#ec4899',
  },
  {
    phrase: "We would’ve decarbonised, but we didn’t like when those women threw that soup",
    theme: 'sustainability',
    color: '#10b981',
  },
  {
    phrase: "Let's reduce redundancy by eliminating redundant employees",
    theme: 'efficiency',
    color: '#0ea5e9',
  },
  {
    phrase: "We're not burning cash, we're converting currency into momentum.",
    theme: 'growth',
    color: '#ec4899',
  },
  {
    phrase: "What would Steven Bartlett do?",
    theme: 'vision',
    color: '#7c3aed',
  },
]

// Generate CEO_WISDOM and PHRASE_THEMES from CEO_PHRASES
const CEO_WISDOM: string[] = CEO_PHRASES.map(p => p.phrase)
const PHRASE_THEMES: Record<string, { theme: string; color: string }> = Object.fromEntries(
  CEO_PHRASES.map(p => [p.phrase, { theme: p.theme, color: p.color }])
)

// Expose globally for CEOInterface
;(window as any).CEO_WISDOM = CEO_WISDOM
;(window as any).PHRASE_THEMES = PHRASE_THEMES

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

  // Get next theme for thinking message
  const getNextTheme = () => {
    const availablePhrases = CEO_WISDOM.filter(phrase => !seenPhrases.has(phrase))
    let phrasesToChooseFrom = availablePhrases
    if (availablePhrases.length === 0) {
      phrasesToChooseFrom = CEO_WISDOM
    }
    
    if (phrasesToChooseFrom.length > 0) {
      const randomIndex = Math.floor(Math.random() * phrasesToChooseFrom.length)
      const nextPhrase = phrasesToChooseFrom[randomIndex]
      const phraseInfo = PHRASE_THEMES[nextPhrase]
      return phraseInfo ? phraseInfo.theme : 'efficiency'
    }
    return 'efficiency'
  }

  // Generate specific phrase (called from CEOInterface)
  const generateSpecificPhrase = (phrase: string) => {
    // Update seen phrases
    setSeenPhrases(prev => new Set([...prev, phrase]))
    
    // Get theme and color for this phrase
    const phraseInfo = PHRASE_THEMES[phrase]
    if (phraseInfo) {
      setCurrentTheme(phraseInfo.theme)
      setCurrentColor(phraseInfo.color)
    }
    
    setCurrentPhrase(phrase)
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
            onSpecificPhraseGenerated={generateSpecificPhrase}
            getNextTheme={getNextTheme}
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
        ceoPersonality={selectedCEO}
        accentColor={currentColor}
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
