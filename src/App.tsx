import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CEOVoting from './components/CEOVoting'
import ShareQuoteModal from './components/ShareQuoteModal'
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
    <div className="container" data-model={selectedModel}>
      <h1>AI CEO</h1>
      <p className="subtitle">Replace your boss before they replace you</p>
      
      <div 
        className={`orb ${isThinking ? 'thinking' : ''} ${phrase ? 'active' : ''}`}
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
      
      {/* Share button - appears when there's a quote */}
      <AnimatePresence>
        {phrase && !isThinking && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => setShowShareModal(true)}
            className="share-button mb-4 px-6 py-3 rounded-full font-['Space_Grotesk'] text-white flex items-center gap-2 shadow-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share Quote
          </motion.button>
        )}
      </AnimatePresence>
      
      <p className="instructions">Click the orb to generate CEO wisdom</p>

      <div className="mode-selector">
        <div className="buttons-wrap">
          {Object.entries(ceoModels).map(([key, model]) => (
            <button
              key={key}
              onClick={() => setSelectedModel(key)}
              className={`mode-button ${selectedModel === key ? 'active' : ''}`}
            >
              {model.name}
            </button>
          ))}
        </div>
        <p className="models-label">Select Executive Model</p>
        
        {/* Nominate CEO Button */}
        <motion.button
          onClick={() => setShowVoting(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          🗳️ Nominate your CEO for AI replacement
        </motion.button>
      </div>

      {/* Share Quote Modal */}
      <ShareQuoteModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        quote={phrase}
        modelName={ceoModels[selectedModel].name}
        modelTitle={ceoModels[selectedModel].title}
      />
    </div>
  )
}

export default App
