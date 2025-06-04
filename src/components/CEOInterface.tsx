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
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={onBackToGoals}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Change CEO</span>
          </button>
          
          {bossName && (
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-900">{bossName}</h2>
              <p className="text-xs text-slate-500">AI CEO</p>
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
                    <p className="text-xl text-slate-800 leading-relaxed font-medium min-h-[80px] flex items-center justify-center text-center px-8">
                      {isThinking ? (
                        <span className="text-slate-500 italic">Thinking...</span>
                      ) : (
                        phrase || "Click to generate CEO wisdom"
                      )}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Honesty Toggle */}
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm font-medium text-slate-600">Honest</span>
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
                      backgroundColor: isHonest ? '#d1d5db' : accentColor
                    }}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                        isHonest ? 'translate-x-1' : 'translate-x-6'
                      }`}
                    />
                  </button>
                  <span className="text-sm font-medium text-slate-600">Corporate</span>
                </div>

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
