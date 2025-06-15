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

// Unified CEO wisdom phrases with theme, color, and ranking (1=best, 3=good)
const CEO_PHRASES: Array<{ phrase: string; theme: string; color: string; rank: 1 | 2 | 3 }> = [
  // Rank 1 - Best/Most memorable phrases shown first
  {
    phrase: "We're not destroying habitats, we're creating urban opportunities for wildlife.",
    theme: 'sustainability',
    color: '#10b981',
    rank: 1,
  },
  {
    phrase: "We're diversifying our diversity programme by sometimes not having one",
    theme: 'growth',
    color: '#ec4899',
    rank: 1,
  },
  {
    phrase: "Let's work staff until they break, but give them mental health days",
    theme: 'efficiency',
    color: '#0ea5e9',
    rank: 1,
  },
  {
    phrase: "We're moving towards a post-sleep workforce",
    theme: 'efficiency',
    color: '#0ea5e9',
    rank: 1,
  },
  {
    phrase: "Our carbon footprint isn't large, it's enterprise-scale",
    theme: 'sustainability',
    color: '#10b981',
    rank: 1,
  },
  {
    phrase: "Ban single-use cups but keep the private jet for 'strategic mobility'",
    theme: 'sustainability',
    color: '#10b981',
    rank: 1,
  },
  {
    phrase: "We're disrupting disruption by un-disrupting previously disrupted markets",
    theme: 'vision',
    color: '#7c3aed',
    rank: 1,
  },
  {
    phrase: "I greenhush my children every night before bed",
    theme: 'growth',
    color: '#ec4899',
    rank: 1,
  },
  {
    phrase: "We would've decarbonised, but we didn't like when those women threw that soup",
    theme: 'sustainability',
    color: '#10b981',
    rank: 1,
  },
  {
    phrase: "Let them work from home. But have them live in an underground carpark below the office",
    theme: 'efficiency',
    color: '#0ea5e9',
    rank: 1,
  },
  {
    phrase: "Empathy, but only if it's billable",
    theme: 'efficiency',
    color: '#0ea5e9',
    rank: 1,
  },
  {
    phrase: "Leadership through vulnerability (yours not mine)",
    theme: 'growth',
    color: '#ec4899',
    rank: 1,
  },
  
  // Rank 2 - Good phrases shown second
  {
    phrase: "Let's pollute the oceans, but make our website background blue",
    theme: 'sustainability',
    color: '#10b981',
    rank: 2,
  },
  {
    phrase: "Fire half the team, but call the survivors 'high performers'",
    theme: 'efficiency',
    color: '#0ea5e9',
    rank: 2,
  },
  {
    phrase: "We're building the metaverse of the metaverse. It's a meta-meta-verse",
    theme: 'vision',
    color: '#7c3aed',
    rank: 2,
  },
  {
    phrase: "We don't solve problems, we reimagine solutions in problem-adjacent spaces.",
    theme: 'vision',
    color: '#7c3aed',
    rank: 2,
  },
  {
    phrase: "Our north star metric is disruption itself.",
    theme: 'vision',
    color: '#7c3aed',
    rank: 2,
  },
  {
    phrase: "We're not firing staff, we're evaluating their cultural fit",
    theme: 'efficiency',
    color: '#0ea5e9',
    rank: 2,
  },
  {
    phrase: "I want to look my children in the eye and tell them their inheritance figures",
    theme: 'growth',
    color: '#ec4899',
    rank: 2,
  },
  {
    phrase: "We're creating a permission structure for keeping the status quo",
    theme: 'growth',
    color: '#ec4899',
    rank: 2,
  },
  {
    phrase: "We encourage our staff to be creative by replacing them with creative robots",
    theme: 'growth',
    color: '#ec4899',
    rank: 2,
  },
  {
    phrase: "We're not burning cash, we're converting currency into momentum.",
    theme: 'growth',
    color: '#ec4899',
    rank: 2,
  },
  {
    phrase: "What would Steven Bartlett do?",
    theme: 'vision',
    color: '#7c3aed',
    rank: 2,
  },
  {
    phrase: "We're making a difference with our We're Making a Difference campaign",
    theme: 'sustainability',
    color: '#10b981',
    rank: 2,
  },
  {
    phrase: "We're committed to a better tomorrow. For every forest we cut down, we'll plant one tree",
    theme: 'sustainability',
    color: '#10b981',
    rank: 2,
  },
  
  // Rank 3 - Decent phrases shown last
  {
    phrase: "We're not just thinking outside the box, we're redefining the geometry of thought.",
    theme: 'vision',
    color: '#7c3aed',
    rank: 3,
  },
  {
    phrase: "Let's reduce redundancy by eliminating redundant employees",
    theme: 'efficiency',
    color: '#0ea5e9',
    rank: 3,
  },
  {
    phrase: "We must reframe the essence of leadership as we chart the course to everywhere",
    theme: 'vision',
    color: '#7c3aed',
    rank: 3,
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

/*
 * RANKING SYSTEM FOR CEO PHRASES
 * 
 * This system ensures users see the best content first by using a tiered approach:
 * 
 * Rank 1 (Best): Most memorable, funny, or impactful phrases shown first
 * Rank 2 (Good): Solid content shown after rank 1 is exhausted  
 * Rank 3 (Decent): Good phrases but less immediately engaging
 * 
 * The system works by:
 * 1. Starting with rank 1 phrases only
 * 2. Moving to rank 2 when all rank 1 phrases are seen
 * 3. Moving to rank 3 when all rank 2 phrases are seen
 * 4. Resetting back to rank 1 when all phrases are exhausted
 * 
 * Special cases:
 * - First visit: 99% chance to show a curated "favorite" from rank 1
 * - This creates a great first impression while still being somewhat random
 */

function App() {
  const [appState, setAppState] = useState<AppState>('welcome')
  const [selectedCEO, setSelectedCEO] = useState<CEOPersonality>(CEO_PERSONALITIES[0]) // Default to first CEO
  const [currentPhrase, setCurrentPhrase] = useState<string>('')
  const [currentTheme, setCurrentTheme] = useState<string>('efficiency')
  const [currentColor, setCurrentColor] = useState<string>('#0ea5e9')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDebugPanel, setShowDebugPanel] = useState(false)
  const [seenPhrases, setSeenPhrases] = useState<Set<string>>(new Set())
  const [currentRankTier, setCurrentRankTier] = useState<1 | 2 | 3>(1) // Start with best phrases

  const handleGetStarted = () => {
    setAppState('loading')
  }

  const handleLoadingComplete = () => {
    setAppState('interface')
  }
  
  const generateRandomWisdom = () => {
    // Get phrases by rank from CEO_PHRASES
    const rank1Phrases = CEO_PHRASES.filter(p => p.rank === 1).map(p => p.phrase)
    const rank2Phrases = CEO_PHRASES.filter(p => p.rank === 2).map(p => p.phrase)  
    const rank3Phrases = CEO_PHRASES.filter(p => p.rank === 3).map(p => p.phrase)
    
    // Determine which tier to use based on what's been seen
    let availablePhrases: string[] = []
    let nextTier = currentRankTier
    
    // Check rank 1 first (best phrases)
    const unseenRank1 = rank1Phrases.filter(phrase => !seenPhrases.has(phrase))
    if (unseenRank1.length > 0) {
      availablePhrases = unseenRank1
      nextTier = 1
    } else {
      // Check rank 2 (good phrases)  
      const unseenRank2 = rank2Phrases.filter(phrase => !seenPhrases.has(phrase))
      if (unseenRank2.length > 0) {
        availablePhrases = unseenRank2
        nextTier = 2
      } else {
        // Check rank 3 (decent phrases)
        const unseenRank3 = rank3Phrases.filter(phrase => !seenPhrases.has(phrase))
        if (unseenRank3.length > 0) {
          availablePhrases = unseenRank3
          nextTier = 3
        } else {
          // All phrases seen, reset and start over with rank 1
          availablePhrases = rank1Phrases
          nextTier = 1
          setSeenPhrases(new Set())
        }
      }
    }
    
    // Update current tier
    setCurrentRankTier(nextTier)
    
    // Pick random phrase from available tier
    const randomIndex = Math.floor(Math.random() * availablePhrases.length)
    const selectedPhrase = availablePhrases[randomIndex]
    
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
            currentRankTier={currentRankTier}
            onRankTierUpdate={setCurrentRankTier}
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
