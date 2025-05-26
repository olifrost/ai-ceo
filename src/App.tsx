import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserGroupIcon } from '@heroicons/react/24/outline';
import CEOVoting from './components/CEOVoting'
import ShareQuoteModal from './components/ShareQuoteModal'
import DebugPanel from './components/DebugPanel'
import './App.css'

type CEOPhrase = {
  dishonest: string;  // 0% honesty
  moderate: string;   // 50% honesty
  honest: string;     // 100% honesty
}

type CEOModel = {
  name: string;
  title: string;
  phrases: CEOPhrase[];
}

const ceoModels: Record<string, CEOModel> = {
  environment: {
    name: "TERRA",
    title: "Sustainability Chief",
    phrases: [
      {
        dishonest: "We're creating better outcomes for the planet, and our shareholders",
        moderate: "The move to a post fossil-economy must be sustainable",
        honest: "Let's stick with fossil fuels until they make it illegal"
      },
      {
        dishonest: "Our position on climate is to follow the science",
        moderate: "Let's pick the climate timeline that suits our timeline",
        honest: "We would save the planet but we'd make less money"
      },
      {
        dishonest: "We are re-evaluating our sustainability targets to align with consumer demand",
        moderate: "Let's make the product cheaper, but say it's for the environment",
        honest: "Let's make it sound like our customers don't care about the environment"
      },
      {
        dishonest: "We're not avoiding responsibility, we're distributing accountability",
        moderate: "We're committed to carbon neutrality by whenever",
        honest: "Let's blame this one on someone else"
      },
      {
        dishonest: "We're pioneering sustainable growth strategies",
        moderate: "We'll go green as soon as it's profitable",
        honest: "The environment is someone else's problem"
      }
    ]
  },
  efficiency: {
    name: "OPTIM",
    title: "Human Resources Optimizer",
    phrases: [
      {
        dishonest: "Let's leverage AI to optimize human potential",
        moderate: "Our KPIs indicate we're over-invested in human capital",
        honest: "Let's replace all our staff with AI"
      },
      {
        dishonest: "We are reconnecting with our culture's masculine energy",
        moderate: "We're diversifying our diversity by sometimes not having it",
        honest: "Let's cut all our diversity programs"
      },
      {
        dishonest: "We're not firing people, we're unbundling human resources for maximum agility",
        moderate: "Let's reduce redundancy by eliminating redundant employees",
        honest: "If we fire people we save money"
      },
      {
        dishonest: "Our office culture is our most valuable asset",
        moderate: "We're moving back to the office and back to culture",
        honest: "We want staff where we can see them"
      },
      {
        dishonest: "We're moving towards a post-sleep workforce",
        moderate: "We've disrupted work-life balance by eliminating the life part",
        honest: "We never want you to leave the office"
      }
    ]
  },
  growth: {
    name: "SCALE",
    title: "Exponential Growth Director",
    phrases: [
      {
        dishonest: "We're building sustainable competitive advantages",
        moderate: "We need to accelerate our acceleration",
        honest: "We need to make money fast"
      },
      {
        dishonest: "Our mission is to create value for all stakeholders",
        moderate: "Growth isn't just a metric, it's our oxygen",
        honest: "Let's try to be the biggest company ever"
      },
      {
        dishonest: "We're focused on long-term value creation",
        moderate: "Market share is more important than profit",
        honest: "Who cares if we make a profit"
      },
      {
        dishonest: "We're disrupting traditional business models",
        moderate: "Success is just a stepping stone to more success",
        honest: "We'll worry about what we do when we're huge"
      },
      {
        dishonest: "We're optimizing for exponential returns",
        moderate: "The only sustainable pace is faster",
        honest: "Let's spend all our money on growth"
      }
    ]
  },
  vision: {
    name: "GENIUS",
    title: "Thought Leadership Pioneer",
    phrases: [
      {
        dishonest: "We're not just thinking outside the box, we're redefining the geometry of thought",
        moderate: "We need to ideate beyond traditional paradigms",
        honest: "I have no idea what I'm doing"
      },
      {
        dishonest: "Creativity 2.0 is less about using your brain, and more about typing",
        moderate: "Creative ideas come from all places, even from robots",
        honest: "We're going to let AI come up with the ideas"
      },
      {
        dishonest: "Our north star metric is disruption itself",
        moderate: "What if we could quantify innovation?",
        honest: "I am desperate to be famous"
      },
      {
        dishonest: "We're building the future of human potential",
        moderate: "The metaverse is just the beginning of our digital transformation",
        honest: "I want to be on magazine covers"
      },
      {
        dishonest: "We need to futureproof our futureproofing strategy",
        moderate: "I'm seeing a convergence of synergies in this space",
        honest: "Does anyone actually understand what I'm saying?"
      }
    ]
  }
}

function App() {
  const [selectedModel, setSelectedModel] = useState<string>('environment')
  const [honestyLevel, setHonestyLevel] = useState<number>(50)
  const [phrase, setPhrase] = useState<string>('')
  const [isThinking, setIsThinking] = useState(false)
  const [showVoting, setShowVoting] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDebugPanel, setShowDebugPanel] = useState(false)

  // Model label mapping for clarity - changes based on honesty level
  const getModelLabel = (key: string, honesty: number): string => {
    const labels: Record<string, { dishonest: string, moderate: string, honest: string }> = {
      environment: { dishonest: 'PURPOSE', moderate: 'SUSTAIN', honest: 'BURN PLANET' },
      efficiency: { dishonest: 'OPTIMISE', moderate: 'STREAMLINE', honest: 'CUT COSTS' },
      growth: { dishonest: 'LEAD', moderate: 'SCALE', honest: 'MONEY NOW' },
      vision: { dishonest: 'INNOVATE', moderate: 'DISRUPT', honest: 'SOUND SMART' },
    };
    
    if (honesty === 0) return labels[key]?.dishonest || key.toUpperCase();
    if (honesty === 100) return labels[key]?.honest || key.toUpperCase();
    return labels[key]?.moderate || key.toUpperCase();
  };

  // Accent color for current model
  const accentColor = {
    environment: '#10b981',
    efficiency: '#0ea5e9', 
    growth: '#ec4899',
    vision: '#7c3aed',
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
      const phraseSet = model.phrases[randomIndex]
      
      // Get phrase based on honesty level
      let selectedPhrase: string
      if (honestyLevel === 0) {
        selectedPhrase = phraseSet.dishonest
      } else if (honestyLevel === 100) {
        selectedPhrase = phraseSet.honest
      } else {
        selectedPhrase = phraseSet.moderate
      }
      
      setPhrase(selectedPhrase)
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
          
          {/* Honesty Slider */}
          <div className="flex flex-col items-center w-full mb-6 max-w-sm">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-sm font-['Space_Grotesk'] opacity-70" style={{ color: accentColor }}>
                CORPORATE
              </span>
              <span className="text-sm font-['Space_Grotesk'] opacity-70" style={{ color: accentColor }}>
                HONEST
              </span>
            </div>
            <div className="relative w-full">
              <input
                type="range"
                min="0"
                max="100"
                step="50"
                value={honestyLevel}
                onChange={(e) => setHonestyLevel(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, ${accentColor}20 0%, ${accentColor}40 50%, ${accentColor}60 100%)`,
                  outline: 'none',
                }}
              />
              <div className="flex justify-between mt-1 text-xs font-['Space_Grotesk'] opacity-60">
                <span style={{ color: accentColor }}>0%</span>
                <span style={{ color: accentColor }}>50%</span>
                <span style={{ color: accentColor }}>100%</span>
              </div>
            </div>
          </div>
          
          {/* Model selector below slider */}
          <div className="flex flex-col items-center w-full mb-6">
            <div className="flex gap-2 mt-1 mb-2">
              {Object.keys(ceoModels).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedModel(key)}
                  className={`mode-button text-base font-bold tracking-wide px-3 py-1.5 ${selectedModel === key ? 'active' : ''}`}
                  style={{ minWidth: 80, fontSize: '1rem' }}
                >
                  {getModelLabel(key, honestyLevel)}
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
