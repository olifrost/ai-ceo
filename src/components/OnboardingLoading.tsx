import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CEOPersonality } from '../data/ceoPersonalities'

interface OnboardingLoadingProps {
  personality: CEOPersonality
  bossName: string
}

const OnboardingLoading: React.FC<OnboardingLoadingProps> = ({ personality }) => {
  const [isComplete, setIsComplete] = useState(false)
  
  const colorMap = {
    efficiency: '#0ea5e9',
    environment: '#10b981', 
    vision: '#7c3aed',
    growth: '#ec4899',
  }

  const accentColor = colorMap[personality.model as keyof typeof colorMap]

  useEffect(() => {
    // Quick setup - complete after 1.5 seconds
    const timer = setTimeout(() => {
      setIsComplete(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      <div className="text-center max-w-2xl">
        {/* Simple loading animation - just the orb */}
        <div className="mb-8">
          {/* Animated Orb */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1,
              opacity: 1
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-32 h-32 mx-auto rounded-full mb-8 relative"
            style={{
              background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
              boxShadow: `0 0 50px ${accentColor}30`
            }}
          >
            {/* Spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2,
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

          {/* Simple progress bar */}
          <div className="w-full max-w-md mx-auto mb-6">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ 
                  background: `linear-gradient(90deg, ${accentColor}, ${accentColor}dd)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Simple loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Preparing your AI CEO...
          </h2>
          <p className="text-slate-600">
            {isComplete ? "Ready!" : "Setting up your virtual executive"}
          </p>
        </motion.div>
      </div>

      {/* Simplified background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-2xl"
          style={{ backgroundColor: `${accentColor}20` }}
        />
        <motion.div
          animate={{ 
            scale: [1, 0.9, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-2xl"
          style={{ backgroundColor: `${accentColor}15` }}
        />
      </div>
    </motion.div>
  )
}

export default OnboardingLoading
