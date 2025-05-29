import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeftIcon,
  ArrowPathIcon,
  ShareIcon,
  CogIcon
} from '@heroicons/react/24/outline'

interface CEOGoal {
  id: string
  label: string
  icon: string
  model: string
}

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
  goal: CEOGoal
  model: CEOModel
  isHonest: boolean
  onToggleHonesty: (honest: boolean) => void
  phrase: string
  onPhraseGenerated: (phrase: string) => void
  onBackToGoals: () => void
  onShare: () => void
  onDebug: () => void
}

const CEOInterface: React.FC<CEOInterfaceProps> = ({
  goal,
  model,
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

  const accentColor = colorMap[goal.model as keyof typeof colorMap]

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
      className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={onBackToGoals}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Change goals</span>
          </button>
          
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-900">{model.name}</h2>
            <p className="text-sm text-slate-600">{model.title}</p>
          </div>

          <button
            onClick={onDebug}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <CogIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="text-center max-w-4xl w-full">
          
          {/* CEO Orb */}
          <div className="mb-12">
            <motion.div
              whileHover={{ scale: phrase && !isThinking ? 1.05 : 1 }}
              whileTap={{ scale: phrase && !isThinking ? 0.95 : 1 }}
              onClick={generatePhrase}
              className={`w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full cursor-pointer relative transition-all duration-300 ${
                isThinking ? 'animate-pulse' : ''
              }`}
              style={{
                background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
                boxShadow: `0 20px 60px ${accentColor}30`
              }}
            >
              {/* Spinning ring when thinking */}
              {isThinking && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border-4 border-transparent"
                  style={{
                    borderTopColor: accentColor,
                    borderRightColor: `${accentColor}60`
                  }}
                />
              )}
              
              {/* Inner core */}
              <div 
                className="absolute inset-8 md:inset-12 rounded-full flex items-center justify-center p-6"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phrase || 'initial'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-sm md:text-base font-medium leading-relaxed text-center"
                  >
                    {isThinking ? "Processing synergies..." : (phrase || "Tap for wisdom")}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="space-y-8">
            {/* Honesty Toggle */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-sm mb-4">
                <span className="text-sm font-medium text-slate-600">
                  Corporate speak
                </span>
                <span className="text-sm font-medium text-slate-600">
                  Brutal honesty
                </span>
              </div>
              
              <button
                onClick={() => onToggleHonesty(!isHonest)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isHonest 
                    ? 'bg-slate-800 focus:ring-slate-500' 
                    : 'bg-slate-300 focus:ring-slate-400'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                    isHonest ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={generatePhrase}
                whileHover={{ scale: !isThinking ? 1.05 : 1 }}
                whileTap={{ scale: !isThinking ? 0.95 : 1 }}
                disabled={isThinking}
                className={`flex items-center gap-2 px-6 py-3 bg-white border-2 rounded-full font-semibold transition-all duration-300 shadow-lg ${
                  isThinking ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                }`}
                style={{
                  borderColor: accentColor,
                  color: accentColor
                }}
              >
                <ArrowPathIcon className="w-5 h-5" />
                <span>Generate new</span>
              </motion.button>

              <motion.button
                onClick={onShare}
                whileHover={{ scale: phrase && !isThinking ? 1.05 : 1 }}
                whileTap={{ scale: phrase && !isThinking ? 0.95 : 1 }}
                disabled={!phrase || isThinking}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
                  (!phrase || isThinking) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                  color: 'white'
                }}
              >
                <ShareIcon className="w-5 h-5" />
                <span>Share your CEO</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}60)` }}
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: -5
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: `linear-gradient(135deg, ${accentColor}60, ${accentColor})` }}
        />
      </div>
    </motion.div>
  )
}

export default CEOInterface
