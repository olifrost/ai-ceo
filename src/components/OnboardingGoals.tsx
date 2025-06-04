import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ScissorsIcon, 
  FireIcon, 
  LightBulbIcon, 
  BanknotesIcon,
  UserIcon
} from '@heroicons/react/24/outline'

interface CEOGoal {
  id: string
  label: string
  icon: string
  model: string
}

interface OnboardingGoalsProps {
  goals: CEOGoal[]
  onSelectGoal: (goal: CEOGoal) => void
}

const OnboardingGoals: React.FC<OnboardingGoalsProps> = ({ goals, onSelectGoal }) => {
  const [showBossInput, setShowBossInput] = useState(false)
  const [bossName, setBossName] = useState('')
  const iconMap = {
    scissors: ScissorsIcon,
    fire: FireIcon,
    lightbulb: LightBulbIcon,
    banknotes: BanknotesIcon,
  }

  const colorMap = {
    efficiency: 'from-blue-500 to-cyan-500',
    environment: 'from-green-500 to-emerald-500', 
    vision: 'from-purple-500 to-violet-500',
    growth: 'from-pink-500 to-rose-500',
  }

  const hoverColorMap = {
    efficiency: 'from-blue-600 to-cyan-600',
    environment: 'from-green-600 to-emerald-600',
    vision: 'from-purple-600 to-violet-600', 
    growth: 'from-pink-600 to-rose-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8 w-full"
    >
      <div className="text-center max-w-4xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            What are your business goals?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Choose your strategic priority
          </p>
        </motion.div>

        {/* Goal Options */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
          {goals.map((goal, index) => {
            const IconComponent = iconMap[goal.icon as keyof typeof iconMap]
            const gradientClass = colorMap[goal.model as keyof typeof colorMap]
            const hoverGradientClass = hoverColorMap[goal.model as keyof typeof hoverColorMap]
            
            return (
              <motion.button
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectGoal(goal)}
                className={`group relative p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 overflow-hidden`}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full bg-gradient-to-br ${gradientClass} p-3 md:p-4 group-hover:bg-gradient-to-br group-hover:${hoverGradientClass} transition-all duration-300 shadow-lg`}>
                    {IconComponent && (
                      <IconComponent className="w-full h-full text-white" />
                    )}
                  </div>
                </div>

                {/* Label */}
                <div className="relative z-10">
                  <h3 className="text-lg md:text-xl font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                    {goal.label}
                  </h3>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Subtitle hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <p className="text-sm md:text-base text-slate-500">
            Each choice will shape your AI CEO's perspective and advice
          </p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-300/10 to-indigo-300/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 rounded-full blur-2xl"
        />
      </div>
    </motion.div>
  )
}

export default OnboardingGoals
