import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface OnboardingLoadingProps {
  onComplete: () => void
}

const OnboardingLoading: React.FC<OnboardingLoadingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  
  const setupSteps = [
    "Initialising thought leadership",
    "Calibrating corporate synergy", 
    "Optimizing executive presence"
  ]
  
  // Use brand pink for consistency across the site
  const accentColor = '#F14FFF' // Brand pink

  useEffect(() => {
    // Progress through setup steps more quickly
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < setupSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 600) // Faster progression - 600ms per step

    // Complete after all steps are done
    const completeTimer = setTimeout(() => {
      setIsComplete(true)
      clearInterval(stepTimer)
      // Call onComplete after a short delay to show the "Ready!" state
      setTimeout(() => {
        onComplete()
      }, 400)
    }, setupSteps.length * 600 + 200) // Wait for all steps plus a bit more

    return () => {
      clearInterval(stepTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-white relative overflow-hidden"
    >
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 via-light-gray/20 to-brand-pink/5"></div>
      
      <div className="text-center max-w-2xl relative z-10">
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

        {/* Loading text with bullet points and focus indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6 flex flex-col items-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Preparing your AI CEO...
          </h2>
          {/* Setup Steps as Bullet Points */}
          <div className="space-y-3 w-full flex flex-col items-center">
            {setupSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                className="flex items-center gap-3"
              >
                {/* Status Indicator */}
                <div className="flex-shrink-0">
                  {index < currentStep || isComplete ? (
                    // Completed step
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  ) : index === currentStep && !isComplete ? (
                    // Current step - pulsing
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  ) : (
                    // Future step
                    <div 
                      className="w-3 h-3 rounded-full border-2"
                      style={{ borderColor: `${accentColor}40` }}
                    />
                  )}
                </div>
                {/* Step Text */}
                <p 
                  className={`text-slate-600 transition-colors duration-300 ${
                    index <= currentStep || isComplete ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  {step}
                </p>
              </motion.div>
            ))}
            {/* Ready indicator */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 pt-2"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <p className="text-slate-800 font-semibold">
                  Ready!
                </p>
              </motion.div>
            )}
          </div>
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
