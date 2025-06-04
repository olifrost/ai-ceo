import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowPathIcon,
  ShareIcon,
  CogIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { CEOPersonality } from '../data/ceoPersonalities'

interface CEOPhrase {
  dishonest: string
  honest: string
}

interface CEOModel {
  name: string
  title: string
  phrases: CEOPhrase[]
}

interface CEOInterfaceProps {
  personality: CEOPersonality
  model: CEOModel
  isHonest: boolean
  onToggleHonesty: (honest: boolean) => void
  phrase: string
  onPhraseGenerated: (phrase: string) => void
  onShare: () => void
  onDebug: () => void
  onPersonalityChange?: (personality: CEOPersonality) => void
  availablePersonalities?: CEOPersonality[]
  seenPhrases?: Set<string>
  onSeenPhrasesUpdate?: (seenPhrases: Set<string>) => void
  onBackToFeatures?: () => void
}

const CEOInterface: React.FC<CEOInterfaceProps> = ({
  personality,
  model,
  isHonest,
  onToggleHonesty,
  phrase,
  onPhraseGenerated,
  onShare,
  onDebug,
  onPersonalityChange,
  availablePersonalities = [],
  seenPhrases = new Set(),
  onSeenPhrasesUpdate,
  onBackToFeatures
}) => {
  const [isThinking, setIsThinking] = useState(false)

  const colorMap = {
    efficiency: '#0ea5e9',
    environment: '#10b981', 
    vision: '#7c3aed',
    growth: '#ec4899',
  }

  const accentColor = colorMap[personality.model as keyof typeof colorMap]

  const generatePhrase = () => {
    if (isThinking) return
    setIsThinking(true)
    onPhraseGenerated('')
    
    setTimeout(() => {
      // Find unseen phrases first
      const availablePhrases = model.phrases.filter(phraseSet => {
        const selectedPhrase = isHonest ? phraseSet.honest : phraseSet.dishonest
        return !seenPhrases.has(selectedPhrase)
      })
      
      // If all phrases have been seen, reset the seen set
      let phrasesToChooseFrom = availablePhrases
      if (availablePhrases.length === 0) {
        phrasesToChooseFrom = model.phrases
        if (onSeenPhrasesUpdate) {
          onSeenPhrasesUpdate(new Set())
        }
      }
      
      const randomIndex = Math.floor(Math.random() * phrasesToChooseFrom.length)
      const phraseSet = phrasesToChooseFrom[randomIndex]
      const selectedPhrase = isHonest ? phraseSet.honest : phraseSet.dishonest
      
      // Mark this phrase as seen
      if (onSeenPhrasesUpdate) {
        const newSeenPhrases = new Set(seenPhrases)
        newSeenPhrases.add(selectedPhrase)
        onSeenPhrasesUpdate(newSeenPhrases)
      }
      
      onPhraseGenerated(selectedPhrase)
      setIsThinking(false)
    }, 1500)
  }

  // Auto-generate a phrase when component mounts if none exists
  useEffect(() => {
    if (!phrase && !isThinking) {
      const timeout = setTimeout(() => generatePhrase(), 500)
      return () => clearTimeout(timeout)
    }
  }, []) // Run only on mount

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden"
    >
      {/* Background with gradient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, ${accentColor}08 0%, transparent 70%)`
          }}
        />
      </div>
      {/* Site Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4">
        <div className="flex items-center justify-center max-w-7xl mx-auto relative">
          {onBackToFeatures && (
            <button
              onClick={onBackToFeatures}
              className="absolute left-0 flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Features</span>
            </button>
          )}
          
          <div className="text-center">
            <h1 
              className="text-3xl font-bold mb-1 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              AI CEO
            </h1>
            <p className="text-sm text-slate-600">Replace your boss before they replace you</p>
          </div>
          
          <button
            onClick={onDebug}
            className="absolute right-0 p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <CogIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-5xl mx-auto w-full">
        
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
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}60)`,
                transform: 'scale(1.1)'
              }}
            />
            
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl">
              
              {/* CEO Photo - Centered and Large */}
              <div className="text-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block"
                >
                  <div 
                    className="absolute inset-0 rounded-full blur-xl opacity-40"
                    style={{
                      background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
                      transform: 'scale(1.3)'
                    }}
                  />
                  <div 
                    className="relative w-32 h-32 rounded-full overflow-hidden border-4 bg-white"
                    style={{ borderColor: accentColor }}
                  >
                    <img 
                      src={personality.photo} 
                      alt={personality.name}
                      className="w-full h-full object-cover"
                    />
                    {isThinking && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-transparent"
                        style={{
                          borderTopColor: accentColor,
                          borderRightColor: `${accentColor}60`
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              </div>
              
              {/* Quote Area with Large Quote Marks */}
              <motion.div
                whileHover={{ scale: phrase && !isThinking ? 1.01 : 1 }}
                whileTap={{ scale: phrase && !isThinking ? 0.99 : 1 }}
                onClick={generatePhrase}
                className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-200 mb-8 ${
                  isThinking ? 'animate-pulse' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}04)`,
                  border: `1px solid ${accentColor}15`
                }}
              >
                {/* Large opening quote mark */}
                <div 
                  className="absolute -top-4 -left-2 text-6xl font-serif leading-none opacity-40"
                  style={{ color: accentColor }}
                >
                  "
                </div>
                
                {/* Large closing quote mark */}
                <div 
                  className="absolute -bottom-4 -right-2 text-6xl font-serif leading-none opacity-40"
                  style={{ color: accentColor }}
                >
                  "
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phrase || 'initial'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <p className="text-2xl text-slate-800 leading-relaxed font-semibold min-h-[100px] flex items-center justify-center text-center px-8 hyphens-auto" style={{ textWrap: 'balance' }}>
                      {isThinking ? (
                        <span className="text-slate-500 italic text-xl font-medium">Thinking...</span>
                      ) : (
                        phrase?.replace(/ ([^ ]+)$/, '\u00A0$1') || "Click to generate CEO wisdom"
                      )}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Honesty Toggle */}
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm font-medium text-slate-600">Corporate</span>
                  <button
                    onClick={() => {
                      const newHonesty = !isHonest
                      onToggleHonesty(newHonesty)
                      
                      if (phrase && model.phrases.length > 0) {
                        const currentPhraseSet = model.phrases.find(set => 
                          phrase === set.dishonest || phrase === set.honest
                        )
                        if (currentPhraseSet) {
                          const newPhrase = newHonesty ? currentPhraseSet.honest : currentPhraseSet.dishonest
                          onPhraseGenerated(newPhrase)
                        }
                      }
                    }}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md"
                    style={{
                      backgroundColor: isHonest ? accentColor : '#d1d5db'
                    }}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                        isHonest ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-sm font-medium text-slate-600">Honest</span>
                </div>

                {/* CEO Selector */}
                {availablePersonalities.length > 0 && onPersonalityChange && (
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-1 sm:gap-2">
                      {availablePersonalities.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => onPersonalityChange(p)}
                          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                            p.id === personality.id
                              ? 'text-white shadow-md'
                              : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
                          }`}
                          style={p.id === personality.id ? {
                            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`
                          } : undefined}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <motion.button
                    onClick={generatePhrase}
                    whileHover={{ scale: !isThinking ? 1.02 : 1 }}
                    whileTap={{ scale: !isThinking ? 0.98 : 1 }}
                    disabled={isThinking}
                    className={`flex items-center gap-2 px-5 py-2 bg-white border-2 rounded-lg font-medium transition-all duration-200 shadow-md ${
                      isThinking ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                    }`}
                    style={{
                      borderColor: accentColor,
                      color: accentColor
                    }}
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                    <span>Generate</span>
                  </motion.button>

                  <motion.button
                    onClick={onShare}
                    whileHover={{ scale: phrase && !isThinking ? 1.02 : 1 }}
                    whileTap={{ scale: phrase && !isThinking ? 0.98 : 1 }}
                    disabled={!phrase || isThinking}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-md ${
                      (!phrase || isThinking) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                      color: 'white'
                    }}
                  >
                    <ShareIcon className="w-4 h-4" />
                    <span>Share</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CEOInterface
