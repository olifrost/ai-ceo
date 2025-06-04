import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeftIcon,
  ArrowPathIcon,
  ShareIcon,
  CogIcon
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
  bossName: string
  isHonest: boolean
  onToggleHonesty: (honest: boolean) => void
  phrase: string
  onPhraseGenerated: (phrase: string) => void
  onBackToGoals: () => void
  onShare: () => void
  onDebug: () => void
}

const CEOInterface: React.FC<CEOInterfaceProps> = ({
  personality,
  model,
  bossName,
  isHonest,
  onToggleHonesty,
  phrase,
  onPhraseGenerated,
  onBackToGoals,
  onShare,
  onDebug
}) => {
  const [isThinking, setIsThinking] = useState(false)
  const [showGoalsDropdown, setShowGoalsDropdown] = useState(false)

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
      const randomIndex = Math.floor(Math.random() * model.phrases.length)
      const phraseSet = model.phrases[randomIndex]
      const selectedPhrase = isHonest ? phraseSet.honest : phraseSet.dishonest
      
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
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}60)`
          }}
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{
            background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`
          }}
        />
      </div>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToGoals}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>              <div className="relative">
              <button 
                onClick={() => setShowGoalsDropdown(!showGoalsDropdown)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 px-3 py-1 rounded-full border border-slate-200 hover:border-slate-300"
              >
                <span className="font-medium">Change CEO</span>
              </button>
              
              {showGoalsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-50">
                  <div className="py-1 font-medium text-sm text-slate-500 px-3">Select a different CEO personality:</div>
                  <button 
                    className="flex items-center w-full text-left py-2 px-3 hover:bg-slate-100 rounded-md"
                    onClick={() => {
                      setShowGoalsDropdown(false);
                      onBackToGoals();
                    }}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img 
                        src={personality.photo} 
                        alt={personality.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{personality.name}</div>
                      <div className="text-xs text-slate-500">{personality.title}</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {bossName && (
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-900">{bossName}</h2>
              <p className="text-sm text-slate-600 italic">"{personality.headline}"</p>
            </div>
          )}

          <button
            onClick={onDebug}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <CogIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-6xl mx-auto w-full">
        
        {/* CEO Card Section */}
        <div className="mb-12 relative max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* CEO Photo & Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block mb-6"
                >
                  {/* CEO Photo with Glow */}
                  <div 
                    className="absolute inset-0 rounded-full blur-2xl opacity-30"
                    style={{
                      background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
                      transform: 'scale(1.2)'
                    }}
                  />
                  <div 
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 bg-white"
                    style={{ borderColor: accentColor }}
                  >
                    <img 
                      src={personality.photo} 
                      alt={personality.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Activity indicator */}
                    {isThinking && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-transparent"
                        style={{
                          borderTopColor: accentColor,
                          borderRightColor: `${accentColor}60`
                        }}
                      />
                    )}
                  </div>
                </motion.div>
                
                {/* CEO Details */}
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                    {personality.name}
                  </h2>
                  <p className="text-lg font-semibold text-slate-600">
                    {personality.title}
                  </p>
                  <p className="text-base text-slate-500">
                    {personality.company}
                  </p>
                  <div 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white mt-2"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }}
                  >
                    {personality.focus}
                  </div>
                </div>
              </div>
              
              {/* Quote Area */}
              <div className="flex-1 min-w-0">
                <motion.div
                  whileHover={{ scale: phrase && !isThinking ? 1.02 : 1 }}
                  whileTap={{ scale: phrase && !isThinking ? 0.98 : 1 }}
                  onClick={generatePhrase}
                  className={`relative p-8 md:p-10 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isThinking ? 'animate-pulse' : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}10, ${accentColor}05)`,
                    border: `2px solid ${accentColor}20`
                  }}
                >
                  {/* Quote Content */}
                  <div className="relative">
                    {/* Quote Icon */}
                    <div 
                      className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold"
                      style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }}
                    >
                      "
                    </div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={phrase || 'initial'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-medium min-h-[60px] flex items-center">
                          {isThinking ? (
                            <span className="text-slate-500 italic">Thinking like a CEO...</span>
                          ) : (
                            phrase || "Click to generate CEO wisdom"
                          )}
                        </p>
                        
                        {phrase && !isThinking && (
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>—</span>
                            <span className="font-semibold">{bossName || personality.name}</span>
                            <span>•</span>
                            <span>{isHonest ? 'Honest take' : 'Corporate version'}</span>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls Section */}
        <div className="w-full max-w-4xl space-y-8">
          {/* Honesty Toggle */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-between w-full max-w-sm">
                <span className="text-sm font-semibold text-slate-700">
                  Honest Mode
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  Corporate Mode
                </span>
              </div>
              
              <button
                onClick={() => {
                  const newHonesty = !isHonest
                  onToggleHonesty(newHonesty)
                  
                  // Update phrase immediately if one exists
                  if (phrase && model.phrases.length > 0) {
                    // Find the current phrase set by matching with any honesty level
                    const currentPhraseSet = model.phrases.find(set => 
                      phrase === set.dishonest || phrase === set.honest
                    )
                    if (currentPhraseSet) {
                      const newPhrase = newHonesty ? currentPhraseSet.honest : currentPhraseSet.dishonest
                      onPhraseGenerated(newPhrase)
                    }
                  }
                }}
                className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg ${
                  isHonest 
                    ? 'focus:ring-slate-400' 
                    : 'focus:ring-slate-500'
                }`}
                style={{
                  backgroundColor: isHonest ? '#d1d5db' : accentColor
                }}
              >
                <span
                  className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform duration-200 shadow-md ${
                    isHonest ? 'translate-x-1' : 'translate-x-11'
                  }`}
                />
              </button>
              
              <p className="text-xs text-slate-500 text-center max-w-sm leading-relaxed">
                {isHonest ? 
                  "Get the unvarnished truth about what CEOs really think" : 
                  "Professional corporate-speak for public consumption"
                }
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={generatePhrase}
              whileHover={{ scale: !isThinking ? 1.05 : 1 }}
              whileTap={{ scale: !isThinking ? 0.95 : 1 }}
              disabled={isThinking}
              className={`flex items-center gap-3 px-8 py-4 bg-white border-2 rounded-2xl font-bold transition-all duration-300 shadow-lg w-full sm:w-auto text-lg ${
                isThinking ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'
              }`}
              style={{
                borderColor: accentColor,
                color: accentColor
              }}
            >
              <ArrowPathIcon className="w-6 h-6" />
              <span>Generate New Quote</span>
            </motion.button>

            <motion.button
              onClick={onShare}
              whileHover={{ scale: phrase && !isThinking ? 1.05 : 1 }}
              whileTap={{ scale: phrase && !isThinking ? 0.95 : 1 }}
              disabled={!phrase || isThinking}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg w-full sm:w-auto text-lg ${
                (!phrase || isThinking) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'
              }`}
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                color: 'white'
              }}
            >
              <ShareIcon className="w-6 h-6" />
              <span>Share Quote</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CEOInterface
