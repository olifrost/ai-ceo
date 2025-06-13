import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowPathIcon,
  ShareIcon,
  CogIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'
import { CEOPersonality } from '../data/ceoPersonalities'
import Logo from './Logo'

interface CEOInterfaceProps {
  personality: CEOPersonality
  phrase: string
  accentColor: string
  currentTheme: string
  onPhraseGenerated: () => string
  onSpecificPhraseGenerated?: (phrase: string) => void
  getNextTheme?: () => string
  onShare: () => void
  onDebug: () => void
  onPersonalityChange?: (personality: CEOPersonality) => void
  availablePersonalities?: CEOPersonality[]
  seenPhrases?: Set<string>
  onSeenPhrasesUpdate?: (seenPhrases: Set<string>) => void
  onBackToFeatures?: () => void
}

const TYPING_SPEED = 28 // ms per character

const CEOInterface: React.FC<CEOInterfaceProps> = ({
  personality,
  phrase,
  currentTheme,
  onPhraseGenerated,
  onSpecificPhraseGenerated,
  getNextTheme,
  onShare,
  onDebug,
  onPersonalityChange,
  availablePersonalities = [],
  seenPhrases = new Set(),
  onSeenPhrasesUpdate,
  onBackToFeatures
}) => {
  const [isThinking, setIsThinking] = useState(false)
  const [showCEOSelector, setShowCEOSelector] = useState(false)
  const [displayedPhrase, setDisplayedPhrase] = useState('')
  const [typing, setTyping] = useState(false)
  const [thinkingMessage, setThinkingMessage] = useState('')

  // Use brand pink consistently instead of dynamic accent color
  const brandPink = '#F14FFF'

  // Fun thinking messages based on theme
  const getThinkingMessage = (theme: string) => {
    switch (theme) {
      case 'efficiency':
        return 'Optimizing resources...';
      case 'sustainability':
        return 'Planet burn mode initiated...';
      case 'growth':
        return 'Calculating profit margins...';
      case 'vision':
        return 'Generating buzzwords...';
      default:
        return 'Optimizing synergies...';
    }
  };

  // Generate new quote with correct thinking message
  const generateNewQuote = async () => {
    if (isThinking) return;
    
    setIsThinking(true);
    
    // Get CEO data from window
    const CEO_WISDOM = (window as any).CEO_WISDOM || [];
    const PHRASE_THEMES = (window as any).PHRASE_THEMES || {};
    
    // Pick next quote
    const availablePhrases = CEO_WISDOM.filter((p: string) => !seenPhrases.has(p));
    const phrasesToChoose = availablePhrases.length > 0 ? availablePhrases : CEO_WISDOM;
    const randomIndex = Math.floor(Math.random() * phrasesToChoose.length);
    const nextPhrase = phrasesToChoose[randomIndex];
    
    // Get theme for this quote and set thinking message
    if (nextPhrase && PHRASE_THEMES[nextPhrase]) {
      const nextTheme = PHRASE_THEMES[nextPhrase].theme;
      setThinkingMessage(getThinkingMessage(nextTheme));
    } else {
      setThinkingMessage('Optimizing synergies...');
    }
    
    // Show thinking message for 1 second, then use the SAME quote we picked
    setTimeout(() => {
      // Update seen phrases
      if (onSeenPhrasesUpdate) {
        onSeenPhrasesUpdate(new Set([...seenPhrases, nextPhrase]));
      }
      // Use the specific phrase we chose
      if (onSpecificPhraseGenerated) {
        onSpecificPhraseGenerated(nextPhrase);
      } else {
        // Fallback to random generation
        onPhraseGenerated();
      }
      setIsThinking(false);
    }, 1000);
  };

  // Typing effect for new phrase
  React.useEffect(() => {
    if (phrase && !isThinking) {
      setDisplayedPhrase('')
      setTyping(true)
      let i = 0
      const type = () => {
        setDisplayedPhrase(phrase.slice(0, i))
        if (i < phrase.length) {
          i++
          setTimeout(type, TYPING_SPEED)
        } else {
          setTyping(false)
        }
      }
      type()
    }
  }, [phrase, isThinking])

  // Auto-generate a phrase when component mounts if none exists
  React.useEffect(() => {
    if (!phrase && !isThinking) {
      generateNewQuote()
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-white relative overflow-hidden"
    >
      {/* Background with gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 via-light-gray/20 to-brand-pink/5"></div>
      
      {/* Floating Logo - Centered */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <Logo onClick={onBackToFeatures} size="sm" />
      </div>
      
      {/* Debug Button */}
      <button
        onClick={onDebug}
        className="absolute top-6 right-6 z-20 p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200 bg-white rounded-full shadow-sm border border-slate-200"
      >
        <CogIcon className="w-5 h-5" />
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-5xl mx-auto w-full relative z-10">
        
        {/* Unified CEO Interface */}
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Gradient glow behind card */}
            <div 
              className="absolute inset-0 rounded-3xl blur-2xl opacity-20"
              style={{
                background: `linear-gradient(135deg, ${brandPink}, ${brandPink}60)`,
                transform: 'scale(1.1)'
              }}
            />
            
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-12 border border-white/50 shadow-2xl">
              
              {/* CEO Photo - Centered and Large, with enhanced animated ring */}
              <div className="text-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowCEOSelector(!showCEOSelector)}
                  className="relative inline-block group cursor-pointer"
                  title="Click to customize your CEO"
                >
                  {/* Enhanced animated ring with physics-like momentum */}
                  <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44" style={{zIndex: 1, pointerEvents: 'none'}}>
                    {/* Single animated line, longer arc, more constant speed */}
                    <motion.circle
                      cx="88" cy="88" r="86" fill="none" stroke={brandPink} strokeWidth="3"
                      strokeDasharray="120 240"
                      strokeLinecap="round"
                      animate={{ rotate: 360 }}
                      initial={{ rotate: 0 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      style={{ transformOrigin: '50% 50%' }}
                    />
                  </svg>
                  <div 
                    className="relative w-40 h-40 rounded-full overflow-hidden bg-white transition-all duration-200 shadow-lg"
                  >
                    <img 
                      src={personality.photo || '/ai-ceo/AICEO-MAN.png'} 
                      alt={personality.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Edit indicator on hover */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                      <PhotoIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.button>
                
                {/* CEO Name */}
                <motion.h2 
                  className="text-2xl font-bold mt-4 mb-1 text-brand-pink"
                >
                  {personality.name}
                </motion.h2>
                
                {/* AI CEO Logo Badge - Centered with pulsing dot */}
                <div className="flex justify-center mb-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-pink/10 rounded-full border border-brand-pink/20">
                    <motion.div 
                      className="w-2 h-2 bg-brand-pink rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                    <span className="text-xs font-medium text-brand-pink">AI CEO</span>
                  </div>
                </div>
                
                {/* Customise text with icon */}
                <div className="flex items-center justify-center gap-2">
                  <PhotoIcon className="w-4 h-4 text-slate-400" />
                  <p className="text-sm text-slate-400 cursor-pointer hover:text-slate-500 transition-colors duration-200" 
                     onClick={() => setShowCEOSelector(!showCEOSelector)}>
                    customise
                  </p>
                </div>
                
                {/* Current theme indicator - Hidden but still tracking theme behind scenes */}
                {/* Theme indicator removed - theme tracking still functional behind the scenes */}
              </div>
              
              {/* CEO Selector Dropdown */}
              <AnimatePresence>
                {showCEOSelector && availablePersonalities.length > 0 && onPersonalityChange && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 overflow-hidden"
                  >
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Choose Your CEO</h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availablePersonalities.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              onPersonalityChange(p)
                              setShowCEOSelector(false)
                            }}
                            className={`flex flex-col items-center p-3 rounded-xl font-medium text-sm transition-all duration-200 border-2 ${
                              p.id === personality.id
                                ? 'bg-white shadow-md border-brand-pink'
                                : 'bg-white/50 hover:bg-white hover:shadow-md border-transparent hover:border-slate-200'
                            }`}
                          >
                            <img 
                              src={p.photo || '/ai-ceo/AICEO-MAN.png'} 
                              alt={p.name}
                              className="w-12 h-12 rounded-full object-cover mb-2"
                            />
                            <span 
                              className={`${p.id === personality.id ? 'font-semibold text-brand-pink' : 'text-slate-700'}`}
                            >
                              {p.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Quote Area with Large Smart Quote Marks - Less Wide */}
              <motion.div
                whileHover={{ scale: phrase && !isThinking ? 1.01 : 1 }}
                whileTap={{ scale: phrase && !isThinking ? 0.99 : 1 }}
                onClick={() => {
                  if (!isThinking && !typing) {
                    generateNewQuote()
                  }
                }}
                className={`relative p-4 md:p-8 rounded-2xl cursor-pointer transition-all duration-200 mb-8 max-w-3xl mx-auto ${
                  isThinking ? 'animate-pulse' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, ${brandPink}08, ${brandPink}04)`,
                  border: `1px solid ${brandPink}15`
                }}
              >
                {/* Large opening smart quote mark with proper typography */}
                <div 
                  className="absolute -top-4 -left-2 text-6xl leading-none opacity-40 text-brand-pink"
                  style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}
                >
                  “
                </div>
                
                {/* Large closing smart quote mark with proper typography */}
                <div 
                  className="absolute -bottom-4 -right-2 text-6xl leading-none opacity-40 text-brand-pink"
                  style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}
                >
                  ”
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isThinking ? 'thinking' : phrase || 'initial'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-semibold min-h-[80px] md:min-h-[100px] flex items-center justify-center text-center px-4 md:px-8 hyphens-auto" style={{ textWrap: 'balance' }}>
                      {isThinking ? (
                        <span className="text-slate-500 italic text-xl font-medium font-mono">
                          {thinkingMessage}
                        </span>
                      ) : (
                        <span>{displayedPhrase || "Click to generate CEO wisdom"}</span>
                      )}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Action Buttons - Swapped positions and styles */}
              <div className="flex gap-3 justify-center">
                <motion.button
                  onClick={onShare}
                  whileHover={{ scale: phrase && !isThinking ? 1.02 : 1 }}
                  whileTap={{ scale: phrase && !isThinking ? 0.98 : 1 }}
                  disabled={!phrase || isThinking}
                  className={`flex items-center gap-2 px-5 py-2 bg-white border-2 border-brand-pink rounded-lg font-medium transition-all duration-200 shadow-md text-brand-pink ${
                    (!phrase || isThinking) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                >
                  <ShareIcon className="w-4 h-4" />
                  <span>Share</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    if (!isThinking && !typing) {
                      generateNewQuote()
                    }
                  }}
                  whileHover={{ scale: !isThinking ? 1.02 : 1 }}
                  whileTap={{ scale: !isThinking ? 0.98 : 1 }}
                  disabled={isThinking}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-white bg-brand-pink ${
                    isThinking ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  <span>Generate</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CEOInterface
