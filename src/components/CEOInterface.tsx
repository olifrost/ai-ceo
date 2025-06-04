import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeftIcon,
  ArrowPathIcon,
  ShareIcon,
  CogIcon,
  ScissorsIcon,
  FireIcon,
  LightBulbIcon,
  BanknotesIcon
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
  goal,
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
                <span className="font-medium">Change goal</span>
              </button>
              
              {showGoalsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-50">
                  <div className="py-1 font-medium text-sm text-slate-500 px-3">Select a new goal:</div>
                  <button 
                    className="flex items-center w-full text-left py-2 px-3 hover:bg-slate-100 rounded-md"
                    onClick={() => {
                      setShowGoalsDropdown(false);
                      onBackToGoals();
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-2">
                      <ScissorsIcon className="w-5 h-5 text-white" />
                    </div>
                    <span>Cut costs</span>
                  </button>
                  
                  <button 
                    className="flex items-center w-full text-left py-2 px-3 hover:bg-slate-100 rounded-md"
                    onClick={() => {
                      setShowGoalsDropdown(false);
                      onBackToGoals();
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-2">
                      <FireIcon className="w-5 h-5 text-white" />
                    </div>
                    <span>Burn planet</span>
                  </button>
                  
                  <button 
                    className="flex items-center w-full text-left py-2 px-3 hover:bg-slate-100 rounded-md"
                    onClick={() => {
                      setShowGoalsDropdown(false);
                      onBackToGoals();
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center mr-2">
                      <LightBulbIcon className="w-5 h-5 text-white" />
                    </div>
                    <span>Sound smart</span>
                  </button>
                  
                  <button 
                    className="flex items-center w-full text-left py-2 px-3 hover:bg-slate-100 rounded-md"
                    onClick={() => {
                      setShowGoalsDropdown(false);
                      onBackToGoals();
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mr-2">
                      <BanknotesIcon className="w-5 h-5 text-white" />
                    </div>
                    <span>Money now</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {bossName && (
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-900">{bossName}</h2>
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
        {/* CEO Orb */}
        <div className="mb-12 relative">
          <motion.div
            whileHover={{ scale: phrase && !isThinking ? 1.05 : 1 }}
            whileTap={{ scale: phrase && !isThinking ? 0.95 : 1 }}
            onClick={generatePhrase}
            className={`w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto rounded-full cursor-pointer relative transition-all duration-300 ${
              isThinking ? 'animate-pulse' : ''
            }`}
          >
            {/* Glow effect behind orb */}
            <div 
              className="absolute inset-0 rounded-full blur-2xl -z-10"
              style={{
                background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
                transform: 'scale(1.5)'
              }}
            />
            
            {/* Spinning ring when thinking */}
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
            
            {/* Inner core */}
            <div 
              className="absolute inset-0 rounded-full flex items-center justify-center p-6"
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
                  className="text-white text-sm md:text-base lg:text-lg font-medium leading-relaxed text-center"
                >
                  {isThinking ? "Processing synergies..." : (phrase || "Tap for wisdom")}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Controls - Below the orb on all screen sizes */}
        <div className="space-y-8 max-w-lg w-full">
          {/* Honesty Toggle */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-sm mb-4">
              <span className="text-sm font-medium text-slate-600">
                Honest
              </span>
              <span className="text-sm font-medium text-slate-600">
                Corporate speak
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
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isHonest 
                  ? 'focus:ring-slate-400' 
                  : 'focus:ring-slate-500'
              }`}
              style={{
                backgroundColor: isHonest ? '#d1d5db' : accentColor
              }}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                  isHonest ? 'translate-x-1' : 'translate-x-9'
                }`}
              />
            </button>
            
            <p className="text-xs text-slate-500 mt-2 text-center max-w-sm">
              {isHonest ? 
                "Raw, unfiltered CEO thoughts" : 
                "Professional, polished messaging"
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={generatePhrase}
              whileHover={{ scale: !isThinking ? 1.05 : 1 }}
              whileTap={{ scale: !isThinking ? 0.95 : 1 }}
              disabled={isThinking}
              className={`flex items-center gap-2 px-6 py-3 bg-white border-2 rounded-full font-semibold transition-all duration-300 shadow-lg w-full sm:w-auto ${
                isThinking ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
              }`}
              style={{
                borderColor: accentColor,
                color: accentColor
              }}
            >
              <ArrowPathIcon className="w-5 h-5" />
              <span>New idea</span>
            </motion.button>

            <motion.button
              onClick={onShare}
              whileHover={{ scale: phrase && !isThinking ? 1.05 : 1 }}
              whileTap={{ scale: phrase && !isThinking ? 0.95 : 1 }}
              disabled={!phrase || isThinking}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg w-full sm:w-auto ${
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
    </motion.div>
  )
}

export default CEOInterface
