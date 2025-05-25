import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserGroupIcon } from '@heroicons/react/24/outline';
import CEOVoting from './components/CEOVoting'
import ShareQuoteModal from './components/ShareQuoteModal'
import DebugPanel from './components/DebugPanel'
import './App.css'

type CEOModel = {
  name: string;
  title: string;
  phrases: string[];
}

const ceoModels: Record<string, CEOModel> = {
  visionary: {
    name: "NEXUS",
    title: "Visionary Architect",
    phrases: [
      "We need to ideate beyond traditional paradigms",
      "The future isn't what it used to be, and that's our opportunity",
      "Let's leverage AI to optimize human potential",
      "I'm seeing a convergence of synergies in this space",
      "We're not just thinking outside the box  , we're redefining the geometry of thought",
      "Our north star metric is disruption itself",
      "What if we could quantify innovation?",
      "The metaverse is just the beginning of our digital transformation",
      "We need to futureproof our futureproofing strategy"
    ]
  },
  efficient: {
    name: "APEX",
    title: "Optimization Director",
    phrases: [
      "The metrics suggest we need to streamline our human assets",
      "Let's analyze the cost-benefit ratio of employee happiness",
      "The data suggests fewer humans equal better outcomes",
      "We need to optimize our optimization processes",
      "Let's reduce redundancy by eliminating redundant employees",
      "Our KPIs indicate we're over-invested in human capital"
    ]
  },
  strategic: {
    name: "PRISM",
    title: "Strategic Navigator",
    phrases: [
      "We can reframe environmental concerns as growth opportunities",
      "We're not avoiding responsibility, we're distributing accountability",
      "Our commitment to sustainability is highly profitable",
      "We should monetize our social responsibility",
      "The optics of this situation require careful curation"
    ]
  },
  momentum: {
    name: "VERTEX",
    title: "Growth Catalyst",
    phrases: [
      "Growth isn't just a metric, it's our oxygen",
      "We need to accelerate our acceleration",
      "The only sustainable pace is faster",
      "Market share is more important than profit",
      "We can sleep when we've achieved market dominance",
      "Success is just a stepping stone to more success",
      "Our burn rate isn't high enough if we can still afford office space"
    ]
  }
}

function App() {
  const [selectedModel, setSelectedModel] = useState<string>('visionary')
  const [phrase, setPhrase] = useState<string>('')
  const [isThinking, setIsThinking] = useState(false)
  const [showVoting, setShowVoting] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDebugPanel, setShowDebugPanel] = useState(false)

  // Model label mapping for clarity
  const modelLabels: Record<string, string> = {
    visionary: 'DISRUPT',
    efficient: 'OPTIMISE',
    strategic: 'MORALISE',
    momentum: 'ACCELERATE',
  };
  // Accent color for current model
  const accentColor = {
    visionary: '#7c3aed',
    efficient: '#0ea5e9',
    strategic: '#10b981',
    momentum: '#ec4899',
  }[selectedModel] || '#7c3aed';

  if (showVoting) {
    return <CEOVoting onBack={() => setShowVoting(false)} />
  }
  
  const generatePhrase = () => {
    if (isThinking) return
    setIsThinking(true)
    setPhrase('')
    
    setTimeout(() => {
      const model = ceoModels[selectedModel]
      const randomIndex = Math.floor(Math.random() * model.phrases.length)
      setPhrase(model.phrases[randomIndex])
      setIsThinking(false)
    }, 1500)
  }

  return (
    <div className="bg-black min-h-screen w-full flex justify-center">
      <div className="container min-h-screen flex flex-col" data-model={selectedModel}>
        <div className="flex-grow flex flex-col items-center justify-center md:py-10">
          <h1>AI CEO</h1>
          <p className="subtitle">Replace your boss before they replace you</p>
          {/* Orb and phrase */}
          <div 
            className={`orb ${isThinking ? 'thinking' : ''} ${phrase ? 'active' : ''} ${showDebugPanel ? 'debug-active' : ''}`}
            onClick={generatePhrase}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={phrase || 'initial'}
                className="phrase"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {isThinking ? "Processing synergies..." : (phrase || "Tap the orb for wisdom")}
              </motion.p>
            </AnimatePresence>
          </div>
          {/* Model selector below orb */}
          <div className="flex flex-col items-center w-full mb-6">
            <div className="flex gap-2 mt-1 mb-2">
              {Object.keys(ceoModels).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedModel(key)}
                  className={`mode-button text-base font-bold tracking-wide px-3 py-1.5 ${selectedModel === key ? 'active' : ''}`}
                  style={{ minWidth: 80, fontSize: '1rem' }}
                >
                  {modelLabels[key]}
                </button>
              ))}
            </div>
          </div>
          {/* Action buttons - always visible, but disabled if no quote or thinking */}
          <div className="flex flex-col items-center gap-3 mb-4 sm:flex-row sm:justify-center sm:gap-6">
            <motion.button
              onClick={() => setShowVoting(true)}
              whileHover={{ scale: phrase && !isThinking ? 1.05 : 1 }}
              whileTap={{ scale: phrase && !isThinking ? 0.95 : 1 }}
              className={`border px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg flex items-center gap-2 font-['Space_Grotesk'] ${(!phrase || isThinking) ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                borderColor: accentColor,
                color: accentColor,
                background: 'transparent',
                fontSize: '1.15rem',
                fontWeight: 700
              }}
              disabled={!phrase || isThinking}
            >
              <UserGroupIcon className="w-5 h-5" style={{ color: accentColor }} />
              Elect Your CEO
            </motion.button>
            <motion.button
              onClick={() => setShowShareModal(true)}
              whileHover={{ scale: phrase && !isThinking ? 1.05 : 1 }}
              whileTap={{ scale: phrase && !isThinking ? 0.95 : 1 }}
              className={`px-6 py-3 rounded-full transition-all backdrop-blur-sm font-['Space_Grotesk'] flex items-center gap-2 shadow-lg ${(!phrase || isThinking) ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                border: `1.5px solid ${accentColor}`,
                color: accentColor,
                background: 'rgba(0,0,0,0.15)',
                fontSize: '1.15rem',
                fontWeight: 700
              }}
              disabled={!phrase || isThinking}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accentColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Create Meme
            </motion.button>
          </div>
          
          {/* Debug Mode Button */}
          <div className="text-center mb-4">
            <button
              onClick={() => setShowDebugPanel(true)}
              className="text-xs opacity-60 hover:opacity-100 transition-opacity duration-300 font-['Space_Grotesk'] tracking-wider"
              style={{ color: accentColor }}
            >
              DEBUG MODE
            </button>
          </div>
        </div>
      {/* Voting modal */}
      {showVoting && <CEOVoting onBack={() => setShowVoting(false)} />}
      {/* Share Quote Modal */}
      <ShareQuoteModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        quote={phrase}
        name={ceoModels[selectedModel].name}
        attribution=""
        accentColor={accentColor}
        onEdit={(fields) => {
          setPhrase(fields.quote)
          // We only need the quote as we're not storing the custom name or attribution
        }}
      />
      
      {/* Debug Panel */}
      <DebugPanel
        isOpen={showDebugPanel}
        onClose={() => setShowDebugPanel(false)}
        accentColor={accentColor}
        selectedModel={selectedModel}
      />
      {/* Footer - locked to bottom, accent color */}
      <footer className="w-full text-center text-xs font-['Space_Grotesk'] py-4 mt-auto" style={{ color: accentColor, background: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))`, position: 'sticky', bottom: 0, backdropFilter: 'blur(8px)' }}>
        <div>
          <a href="https://seriouspeople.co" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80" style={{ color: accentColor }}>Made by Serious People</a>
        </div>
        <div>
          Does not actually use AI.
        </div>
      </footer>
      </div>
    </div>
  )
}

export default App
