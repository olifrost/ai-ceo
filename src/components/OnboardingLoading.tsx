import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
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

interface OnboardingLoadingProps {
  goal: CEOGoal
}

const OnboardingLoading: React.FC<OnboardingLoadingProps> = ({ goal }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  
  const iconMap = {
    scissors: ScissorsIcon,
    fire: FireIcon,
    lightbulb: LightBulbIcon,
    banknotes: BanknotesIcon,
  }

  const colorMap = {
    efficiency: '#0ea5e9',
    environment: '#10b981', 
    vision: '#7c3aed',
    growth: '#ec4899',
  }

  const loadingSteps = [
    "Analyzing business structures...",
    "Calibrating corporate linguistics...", 
    "Generating executive wisdom...",
    "Initializing your AI CEO..."
  ]

  const IconComponent = iconMap[goal.icon as keyof typeof iconMap]
  const accentColor = colorMap[goal.model as keyof typeof colorMap]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => 
        prev < loadingSteps.length - 1 ? prev + 1 : prev
      )
    }, 750)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      <div className="text-center max-w-2xl">
        {/* Selected Goal Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div 
            className="w-20 h-20 mx-auto rounded-full p-5 mb-6 shadow-xl"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
              boxShadow: `0 10px 40px ${accentColor}40`
            }}
          >
            {IconComponent && (
              <IconComponent className="w-full h-full text-white" />
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            {goal.label}
          </h2>
          <p className="text-slate-600">
            Preparing your specialized AI CEO
          </p>
        </motion.div>

        {/* Loading Animation */}
        <div className="mb-8">
          {/* Animated Orb */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 mx-auto rounded-full mb-8 relative"
            style={{
              background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
              boxShadow: `0 0 50px ${accentColor}30`
            }}
          >
            {/* Inner spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-2 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: accentColor,
                borderRightColor: `${accentColor}60`
              }}
            />
            
            {/* Core */}
            <div 
              className="absolute inset-6 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
              }}
            />
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto mb-6">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStepIndex + 1) / loadingSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full"
                style={{ 
                  background: `linear-gradient(90deg, ${accentColor}, ${accentColor}dd)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-3">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index <= currentStepIndex ? 1 : 0.3,
                x: 0
              }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center gap-3"
            >
              {index <= currentStepIndex ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-300" />
              )}
              <span 
                className={`text-sm md:text-base font-medium ${
                  index <= currentStepIndex ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {step}
              </span>
              {index === currentStepIndex && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1"
                >
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 rounded-full bg-slate-400" />
                    <div className="w-1 h-1 rounded-full bg-slate-400" />
                    <div className="w-1 h-1 rounded-full bg-slate-400" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 50 
            }}
            animate={{ 
              y: -50,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{ backgroundColor: accentColor }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default OnboardingLoading
