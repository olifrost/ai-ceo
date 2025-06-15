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
  currentRankTier?: 1 | 2 | 3
  onRankTierUpdate?: (tier: 1 | 2 | 3) => void
  onBackToFeatures?: () => void
}

const TYPING_SPEED = 28 // ms per character

const CEOInterface: React.FC<CEOInterfaceProps> = ({
  personality,
  phrase,
  onPhraseGenerated,
  onSpecificPhraseGenerated,
  onShare,
  onDebug,
  onPersonalityChange,
  availablePersonalities = [],
  seenPhrases = new Set(),
  onSeenPhrasesUpdate,
  currentRankTier = 1,
  onRankTierUpdate,
  onBackToFeatures
}) => {
  const [isThinking, setIsThinking] = useState(false)
  const [showCEOSelector, setShowCEOSelector] = useState(false)
  const [displayedPhrase, setDisplayedPhrase] = useState('')
  const [typing, setTyping] = useState(false)
  const [thinkingMessage, setThinkingMessage] = useState('')
  const [visibleChars, setVisibleChars] = useState(0)

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

  // Generate new quote with ranking system
  const generateNewQuote = async () => {
    if (isThinking) return;
    
    setIsThinking(true);
    
    // Get CEO data from window - single source of truth
    const CEO_PHRASES = (window as any).CEO_PHRASES || [];
    const PHRASE_THEMES = (window as any).PHRASE_THEMES || {};
    
    // Define favorite quotes for initial load - these should be rank 1 phrases
    const FAVOURITE_QUOTES = [
      "We're not destroying habitats, we're creating urban opportunities for wildlife.",
      "We're diversifying our diversity programme by sometimes not having one"
    ];
    
    // Get phrases by rank from the global CEO_PHRASES data
    const rank1Phrases = CEO_PHRASES.filter((p: any) => p.rank === 1).map((p: any) => p.phrase);
    const rank2Phrases = CEO_PHRASES.filter((p: any) => p.rank === 2).map((p: any) => p.phrase);
    const rank3Phrases = CEO_PHRASES.filter((p: any) => p.rank === 3).map((p: any) => p.phrase);
    
    let nextPhrase;
    
    // For initial load bias towards favorites (99% chance when no phrases seen)
    if (seenPhrases.size === 0 && Math.random() < 0.99) {
      nextPhrase = FAVOURITE_QUOTES[Math.floor(Math.random() * FAVOURITE_QUOTES.length)];
    } else {
      // Use tiered selection based on ranking
      // Try rank 1 first
      const unseenRank1 = rank1Phrases.filter((p: string) => !seenPhrases.has(p));
      if (unseenRank1.length > 0) {
        nextPhrase = unseenRank1[Math.floor(Math.random() * unseenRank1.length)];
        if (onRankTierUpdate) onRankTierUpdate(1);
      } else {
        // Try rank 2
        const unseenRank2 = rank2Phrases.filter((p: string) => !seenPhrases.has(p));
        if (unseenRank2.length > 0) {
          nextPhrase = unseenRank2[Math.floor(Math.random() * unseenRank2.length)];
          if (onRankTierUpdate) onRankTierUpdate(2);
        } else {
          // Try rank 3
          const unseenRank3 = rank3Phrases.filter((p: string) => !seenPhrases.has(p));
          if (unseenRank3.length > 0) {
            nextPhrase = unseenRank3[Math.floor(Math.random() * unseenRank3.length)];
            if (onRankTierUpdate) onRankTierUpdate(3);
          } else {
            // All phrases seen, reset and start with rank 1
            nextPhrase = rank1Phrases[Math.floor(Math.random() * rank1Phrases.length)];
            if (onSeenPhrasesUpdate) onSeenPhrasesUpdate(new Set());
            if (onRankTierUpdate) onRankTierUpdate(1);
          }
        }
      }
    }
    
    // Get theme for this quote and set thinking message
    if (nextPhrase && PHRASE_THEMES[nextPhrase]) {
      const nextTheme = PHRASE_THEMES[nextPhrase].theme;
      setThinkingMessage(getThinkingMessage(nextTheme));
    } else {
      setThinkingMessage('Optimizing synergies...');
    }
    
    // Cache the selected phrase to avoid changing it during typing
    const finalPhrase = nextPhrase;
    
    // Show thinking message for 1 second, then use the SAME quote we picked
    setTimeout(() => {
      // Update seen phrases
      if (onSeenPhrasesUpdate) {
        onSeenPhrasesUpdate(new Set([...seenPhrases, finalPhrase]));
      }
      // Use the specific phrase we chose
      if (onSpecificPhraseGenerated) {
        onSpecificPhraseGenerated(finalPhrase);
      } else {
        // Fallback to random generation - shouldn't happen
        onPhraseGenerated();
      }
      setIsThinking(false);
    }, 1000);
  };

  // Character-by-character typing effect that prevents text shifting
  React.useEffect(() => {
    if (phrase && !isThinking) {
      setTyping(true)
      setDisplayedPhrase(phrase) // Set full phrase immediately for layout
      setVisibleChars(0) // Start with no visible characters
      
      let i = 0
      const revealChar = () => {
        setVisibleChars(i + 1)
        if (i < phrase.length - 1) {
          i++
          setTimeout(revealChar, TYPING_SPEED)
        } else {
          setTyping(false)
        }
      }
      revealChar()
    }
  }, [phrase, isThinking])

  // Auto-generate a phrase when component mounts if none exists
  React.useEffect(() => {
    if (!phrase && !isThinking) {
      generateNewQuote()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-white relative overflow-hidden"
    >
      {/* Background with gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 via-light-gray/20 to-brand-pink/5"></div>
      
      {/* Fixed Position Elements - Always on top */}
      {/* Floating Logo - Centered */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <Logo 
          onClick={() => {
            // Force storing popup state before navigating back
            localStorage.setItem('hasSeenCannesPopup', 'true');
            onBackToFeatures && onBackToFeatures();
          }} 
          size="sm" 
        />
      </div>
      
      {/* About Button - small icon, top left */}
      <button
        onClick={() => {
          // Force storing popup state before navigating back
          localStorage.setItem('hasSeenCannesPopup', 'true');
          // Store a flag in localStorage to indicate we need to scroll
          localStorage.setItem('scrollToStopWorkingSection', 'true');
          // Navigate back to features page
          onBackToFeatures && onBackToFeatures();
        }}
        className="fixed top-6 left-6 z-50 p-2 text-brand-pink hover:text-brand-pink/80 transition-colors duration-200 bg-white rounded-full shadow-sm border border-slate-200 font-semibold"
        title="About"
        type="button"
        aria-label="About"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ display: 'block' }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
      </button>
      
      {/* Dev Button - pink text */}
      <button
        onClick={onDebug}
        className="fixed top-6 right-6 z-50 p-2 text-brand-pink hover:text-brand-pink/80 transition-colors duration-200 bg-white rounded-full shadow-sm border border-slate-200 font-semibold"
      >
        <CogIcon className="w-5 h-5" />
      </button>

      {/* Dev Control: Clear local data and show welcome popup again - only visible in dev mode */}
      {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
        <button
          onClick={() => {
            localStorage.removeItem('hasSeenCannesPopup');
            window.location.reload();
          }}
          className="fixed top-20 right-6 z-50 p-2 text-xs text-slate-400 hover:text-brand-pink transition-colors duration-200 bg-white rounded-full shadow-sm border border-slate-200"
        >
          Reset Welcome Popup
        </button>
      )}

      {/* Main Content - Truly centered with padding for fixed elements */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-14 pb-0 max-w-5xl mx-auto w-full relative z-10">
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
              <div className="text-center mb-4 md:mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowCEOSelector(!showCEOSelector)}
                  className="relative inline-block group cursor-pointer"
                  title="Click to customise your CEO"
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
                    {/* Radial gradient background behind CEO avatar - more diffuse, pink stretches further */}
                    <div
                      className="absolute inset-0 bg-gradient-radial from-brand-pink/60 via-brand-pink/10 to-white/0 z-0"
                    />
                    <img 
                      src={personality.photo || '/AICEO-MAN'} 
                      alt={personality.name}
                      className="relative z-10 w-full h-full object-cover"
                    />
                    {/* Edit indicator on hover */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full z-20">
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
                
                {/* AI CEO Logo Badge - Centered with pulsing dot and custom tooltip */}
                <div className="flex justify-center mb-2">
                  <div className="relative inline-flex items-center gap-2 px-3 py-1 bg-brand-pink/10 rounded-full border border-brand-pink/20 group cursor-pointer">
                    <motion.div 
                      className="w-2 h-2 bg-brand-pink rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    />
                    <span className="text-xs font-medium text-brand-pink">AI CEO</span>
                    {/* Custom tooltip */}
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
                      Does not actually use AI. <br></br>Powered by the souls of interns.
                    </span>
                  </div>
                </div>
                
                {/* Customise text with icon - more prominent styling */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setShowCEOSelector(!showCEOSelector)}
                    className="ceo-customise-btn flex items-center gap-2 px-3 py-1 text-brand-pink hover:text-brand-pink/80 text-sm font-medium transition-colors duration-200 border-brand-pink"
                    style={{ border: 'none', background: 'none' }}
                  >
                    <PhotoIcon className="w-4 md:h-4" />
                    <span className='underline decoration-dotted underline-offset-4'>Customise</span>
                  </button>
                </div>
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
                            <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2">
                              {/* Radial gradient background behind CEO avatar - subtle, smaller pink */}
                              <div className="absolute inset-0 bg-gradient-radial from-brand-pink/60 via-white/60 to-white z-0"></div>
                              <img 
                                src={p.photo || '/David 1.webp'} 
                                alt={p.name}
                                className="relative z-10 w-full h-full object-cover"
                              />
                            </div>
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
                className={`relative p-4 md:p-8 rounded-2xl cursor-pointer transition-all duration-200 mb-4 md:mb-8 max-w-3xl mx-auto ${
                  isThinking ? 'animate-pulse' : ''
                } flex items-center min-h-[180px]`}
                style={{
                  background: `linear-gradient(135deg, ${brandPink}08, ${brandPink}04)`,
                  border: `1px solid ${brandPink}15`,
                  minHeight: '180px'
                }}
              >
                {/* Large opening smart quote mark with proper typography */}
                <div 
                  className="absolute -top-4 -left-2 text-6xl leading-none opacity-40 text-brand-pink"
                  style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                >
                  “
                </div>
                {/* Large closing smart quote mark with proper typography */}
                <div 
                  className="absolute -bottom-4 -right-2 text-6xl leading-none opacity-40 text-brand-pink"
                  style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
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
                    className="relative z-10 w-full flex items-center justify-center"
                  >
                    {isThinking ? (
                      <p className="text-lg leading-6 md:leading-8 md:text-2xl/5 text-slate-500 italic font-medium font-mono w-full flex items-center justify-center text-center px-4 md:px-8">
                        {thinkingMessage}
                      </p>
                    ) : (
                      <div className="w-full relative">
                        {/* Character-by-character typewriter effect with proper wrapping */}
                        <div 
                          className="text-xl leading-5 md:leading-8 md:text-2xl/5 text-slate-800 font-semibold w-full text-center px-4 md:px-8"
                          style={{ 
                            textWrap: 'balance',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap'
                          }}
                        >
                          {displayedPhrase ? (
                            <>
                              {/* Visible portion */}
                              <span className="opacity-100">
                                {displayedPhrase.slice(0, visibleChars)}
                              </span>
                              {/* Invisible portion to maintain layout */}
                              <span className="opacity-0">
                                {displayedPhrase.slice(visibleChars)}
                              </span>
                            </>
                          ) : (
                            "Click to generate CEO wisdom"
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Action Buttons - Responsive layout for ultra small screens only */}
              <div className="flex gap-3 justify-center flex-row xs:flex-col">
                <motion.button
                  onClick={onShare}
                  whileHover={{ scale: phrase && !isThinking ? 1.02 : 1 }}
                  whileTap={{ scale: phrase && !isThinking ? 0.98 : 1 }}
                  disabled={!phrase || isThinking}
                  className={`ceo-action-btn flex items-center gap-2 px-5 py-2 bg-white border-2 border-brand-pink rounded-lg font-medium transition-all duration-200 shadow-md text-brand-pink ${
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
                  className={`ceo-action-btn flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-white bg-brand-pink ${
                    isThinking ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  <span>Generate</span>
                </motion.button>
              </div>
              {/* More apps by Serious People - dotted underline style */}
              <div className="w-full text-center mt-3">
                <a 
                  href="https://oilwell.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 font-medium rounded px-2 py-1 bg-white/60  hover:bg-brand-pink/10 hover:text-brand-pink transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-pink/30 underline decoration-dotted underline-offset-2"
                >
                  More apps by Serious People
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Space at the bottom for fixed footer */}
        <div className="h-10"></div>

        {/* Dev Debug: Show current rank tier - only visible in dev mode */}
        {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
          <div className="text-xs text-slate-400 mb-2 text-center">
            Rank Tier: {currentRankTier} | Seen: {seenPhrases.size} phrases
          </div>
        )}
      </div>

    </motion.div>
  )
}

export default CEOInterface
