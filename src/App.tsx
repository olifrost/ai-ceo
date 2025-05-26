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
        dishonest: "We are transitioning to thinking about an energy transition",
        moderate: "We're moving towards sustainability sustainably",
        honest: "Let's stick with fossil fuels until they make it illegal"
      },
      {
        dishonest: "Climate change is just the planet's way of asking for innovation",
        moderate: "We're following the science - specifically, the profitable parts of science",
        honest: "We'll save the planet when they make us"
      },
      {
        dishonest: "We are re-evaluating our sustainability targets to align with consumer demand",
        moderate: "Our climate policy respects the political climate",
        honest: "We're using the election as an excuse to cut costs"
      },
      {
        dishonest: "We're not destroying habitats, we're creating urban opportunities for wildlife",
        moderate: "Going green is our long-term strategy, emphasis on long-term",
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
        moderate: "Our people are our greatest asset, which is why we're liquidating them",
        honest: "Let's replace all our staff with AI"
      },
      {
        dishonest: "We are reconnecting with our culture's masculine energy",
        moderate: "We're diversifying our diversity programme by sometimes not having it",
        honest: "Let's cut all our diversity programs"
      },
      {
        dishonest: "We're not downsizing, we're rightsizing for execellence",
        moderate: "Let's reduce redundancy by eliminating redundant employees",
        honest: "If we fire people we save money"
      },
      {
        dishonest: "Remote work is great, but presence work is revolutionary",
        moderate: "Our office culture is our most valuable asset",
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
        dishonest: "We're not just moving fast and breaking things, we're accelerating and optimizing breakage",
        moderate: "We need to accelerate our acceleration",
        honest: "We need to make money fast"
      },
      {
        dishonest: "Our mission is to create value for all stakeholders",
        moderate: "Growth isn't just a metric, it's our oxygen",
        honest: "Let's try to be the biggest company ever"
      },
      {
        dishonest: "We measure success in disruptions per minute",
        moderate: "Profitability is just delayed gratification for shareholders",
        honest: "Who cares if we make a profit - growth is sexier"
      },
      {
       dishonest: "We're not burning cash, we're converting currency into momentum",
        moderate: "Our runway is infinite if you believe in the mission hard enough",
        honest: "Let's spend all our money on growth and hope for the best"
      },
      {
        dishonest: "We don't have competitors, we have inspiration sources",
        moderate: "Market domination is just collaborative leadership at scale",
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
        moderate: "We need to ideate beyond traditional paradigms",
        honest: "I have no idea what I'm doing"
      },
      {
        dishonest: "AI doesn't replace creativity, it democratizes my ability to seem creative",
        moderate: "We're outsourcing innovation to optimize our innovation outsourcing",
        honest: "ChatGPT writes all our strategies now"
      },
      {
        dishonest: "Our north star metric is disruption itself",
       moderate: "Thought leadership is about having thoughts that lead to being famous",
        honest: "I am desperate to be on magazine covers"
      },
      {
       dishonest: "We're building the metaverse of the metaverse - it's meta-metaverse",
        moderate: "The future isn't just coming, it's already here but wearing a disguise",
        honest: "I want Joe Rogan to interview me"
      },
      {
       dishonest: "We don't solve problems, we reimagine solutions in problem-adjacent spaces",
        moderate: "My vision is so advanced it hasn't been invented yet",
        honest: "Does anyone actually understand what I'm saying, including me?"
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
                // Set step as 1 for smooth animation but snap to 0, 50, 100 on user interaction
                step="1"
                value={Math.round(honestyLevel)}
                onChange={(e) => {
                  const rawValue = Number(e.target.value);
                  
                  // Snap to nearest valid value (0, 50, 100) when user interacts with slider
                  let newLevel: number;
                  if (rawValue < 25) newLevel = 0;
                  else if (rawValue > 75) newLevel = 100;
                  else newLevel = 50;
                  
                  setHonestyLevel(newLevel);
                  
                  // Update phrase based on new honesty level if a phrase is already shown
                  if (phrase) {
                    const model = ceoModels[selectedModel];
                    // Find the current phrase set by matching with any honesty level
                    const currentPhraseSet = model.phrases.find(set => 
                      phrase === set.dishonest || phrase === set.moderate || phrase === set.honest
                    );
                    if (currentPhraseSet) {
                      if (newLevel === 0) setPhrase(currentPhraseSet.dishonest);
                      else if (newLevel === 100) setPhrase(currentPhraseSet.honest);
                      else setPhrase(currentPhraseSet.moderate);
                    }
                  }
                }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, ${accentColor}20 0%, ${accentColor}40 50%, ${accentColor}60 100%)`,
                  outline: 'none',
                  WebkitAppearance: 'none',
                  // Add CSS variables for the thumb styling
                  ['--thumb-color' as any]: accentColor,
                  ['--thumb-shadow' as any]: `0 0 10px rgba(0,0,0,0.5), 0 0 6px ${accentColor}80`,
                }}
                // Add additional className with custom CSS in App.css
              />
              <div className="flex justify-between mt-1 text-xs font-['Space_Grotesk'] opacity-60">
                <span style={{ color: accentColor }}>0%</span>
                <span style={{ color: accentColor }}>10%</span>
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
                  onClick={() => {
                    setSelectedModel(key);
                    
                    // Reset honesty level to 0 (corporate) with animation
                    const slider = document.querySelector('input[type="range"]') as HTMLInputElement;
                    if (slider && honestyLevel !== 0) {
                      // Add a class for pulse animation
                      slider.classList.add('slider-resetting');
                      
                      // Animate the slider value with a smooth transition
                      const startValue = honestyLevel;
                      const startTime = performance.now();
                      const duration = 600; // Animation duration in ms
                      
                      const animate = (currentTime: number) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        
                        // Ease-out function for smoother animation
                        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
                        const easedProgress = easeOut(progress);
                        
                        // Use continuous values instead of rounded values for smoothness
                        const currentValue = startValue * (1 - easedProgress);
                        
                        // Update the slider's value directly for visual smoothness
                        slider.value = String(currentValue);
                        
                        // Update state with continuous values for smooth transitions
                        setHonestyLevel(currentValue);
                        
                        if (progress < 1) {
                          requestAnimationFrame(animate);
                        } else {
                          // Final value should be exactly 0 for precision
                          setHonestyLevel(0);
                          slider.value = "0";
                          
                          // Remove the class after animation completes and a brief delay
                          setTimeout(() => {
                            slider.classList.remove('slider-resetting');
                          }, 300);
                        }
                      };
                      
                      requestAnimationFrame(animate);
                    }
                    
                    // Automatically generate a phrase when a model is selected
                    if (!isThinking) {
                      setIsThinking(true);
                      setPhrase('');
                      
                      setTimeout(() => {
                        const model = ceoModels[key];
                        const randomIndex = Math.floor(Math.random() * model.phrases.length);
                        const phraseSet = model.phrases[randomIndex];
                        
                        // Always use dishonest phrase since we're resetting to corporate (0%)
                        setPhrase(phraseSet.dishonest);
                        setIsThinking(false);
                      }, 1000); // Slightly faster than the orb click for better UX
                    }
                  }}
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
              whileHover={{ scale: !isThinking ? 1.05 : 1 }}
              whileTap={{ scale: !isThinking ? 0.95 : 1 }}
              className={`border px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg flex items-center gap-2 font-['Space_Grotesk'] ${isThinking ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                borderColor: accentColor,
                color: accentColor,
                background: 'transparent',
                fontSize: '1.15rem',
                fontWeight: 700
              }}
              disabled={isThinking}
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
            ADMIN PANEL
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
