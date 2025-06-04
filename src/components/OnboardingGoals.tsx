import React from 'react'
import { motion } from 'framer-motion'
import { CEOPersonality } from '../data/ceoPersonalities'

interface OnboardingGoalsProps {
  personalities: CEOPersonality[]
  onSelectPersonality: (personality: CEOPersonality) => void
}

const OnboardingGoals: React.FC<OnboardingGoalsProps> = ({ personalities, onSelectPersonality }) => {
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
      <div className="text-center max-w-6xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Choose your AI CEO
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Select the personality that matches your leadership style
          </p>
        </motion.div>

        {/* CEO Personality Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {personalities.map((personality, index) => {
            const gradientClass = colorMap[personality.model as keyof typeof colorMap]
            const hoverGradientClass = hoverColorMap[personality.model as keyof typeof hoverColorMap]
            
            return (
              <motion.button
                key={personality.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPersonality(personality)}
                className={`group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 overflow-hidden text-left`}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10 flex items-start gap-4">
                  {/* CEO Photo */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full overflow-hidden border-3 bg-gradient-to-br ${gradientClass} p-0.5 group-hover:bg-gradient-to-br group-hover:${hoverGradientClass} transition-all duration-300`}>
                      <img 
                        src={personality.photo} 
                        alt={personality.name}
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </div>
                  </div>

                  {/* CEO Info */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                        {personality.name}
                      </h3>
                      <p className="text-sm font-semibold text-slate-600">
                        {personality.title} • {personality.company}
                      </p>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-700 mb-3 italic">
                      "{personality.headline}"
                    </p>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {personality.description}
                    </p>
                    
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradientClass} text-white`}>
                      Focus: {personality.focus}
                    </div>
                  </div>
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
            Each CEO brings their unique perspective and approach to leadership
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
