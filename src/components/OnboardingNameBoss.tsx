import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UserIcon } from '@heroicons/react/24/outline'

interface CEOGoal {
  id: string
  label: string
  icon: string
  model: string
}

interface OnboardingNameBossProps {
  goal: CEOGoal
  onNameSet: (name: string) => void
}

const OnboardingNameBoss: React.FC<OnboardingNameBossProps> = ({ goal, onNameSet }) => {
  const [bossName, setBossName] = useState('')
  
  const colorMap = {
    efficiency: '#0ea5e9',
    environment: '#10b981', 
    vision: '#7c3aed',
    growth: '#ec4899',
  }

  const accentColor = colorMap[goal.model as keyof typeof colorMap]

  // Popular boss names to suggest
  const popularBosses = [
    'Mark Read',
    'Elon Musk', 
    'Tim Cook',
    'Satya Nadella',
    'Jensen Huang',
    'Andy Jassy',
    'Brian Chesky',
    'Reed Hastings'
  ]

  const handleNameSubmit = () => {
    if (bossName.trim()) {
      onNameSet(bossName.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && bossName.trim()) {
      handleNameSubmit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8 w-full"
    >
      <div className="text-center max-w-2xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Who's your boss?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            We'll analyze their leadership style and create your replacement
          </p>
        </motion.div>

        {/* Name Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="relative mb-6">
            <input
              type="text"
              value={bossName}
              onChange={(e) => setBossName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your boss's name"
              className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 transition-colors duration-200 bg-white/80 backdrop-blur-sm"
              style={{
                borderColor: bossName ? accentColor : undefined
              }}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <UserIcon className="w-6 h-6 text-slate-400" />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleNameSubmit}
            whileHover={{ scale: bossName.trim() ? 1.05 : 1 }}
            whileTap={{ scale: bossName.trim() ? 0.95 : 1 }}
            disabled={!bossName.trim()}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
              bossName.trim() 
                ? 'text-white hover:shadow-xl' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            style={{
              background: bossName.trim() 
                ? `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`
                : undefined
            }}
          >
            Continue
          </motion.button>
        </motion.div>

        {/* Popular Choices */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <p className="text-sm text-slate-500 font-medium">
            Or choose a popular option:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularBosses.map((name, index) => (
              <motion.button
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setBossName(name)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                {name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}60)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: `linear-gradient(135deg, ${accentColor}60, ${accentColor})` }}
        />
      </div>
    </motion.div>
  )
}

export default OnboardingNameBoss
