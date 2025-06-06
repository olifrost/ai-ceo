import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon,
  SparklesIcon,
  CpuChipIcon,
  BoltIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface WelcomePageProps {
  onGetStarted: () => void
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {
  const subtitle = "Replace your boss before they replace you"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      {/* Hero Section - Full Viewport */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 w-full relative">
        {/* Floating gradient orbs for ambiance */}
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
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"
          />
        </div>

        <div className="text-center max-w-4xl relative z-10">
          {/* Main Title */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
              AI CEO
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
            className="mb-16"
          >
            <button
              onClick={onGetStarted}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  →
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-slate-500 mb-2">Learn more</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-slate-400"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Main Headline - Stop working for humans */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Stop working <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">for humans</span>
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Why settle for expensive, unpredictable human CEOs when you can have AI leadership that delivers consistent corporate wisdom at the push of a button?
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <CurrencyDollarIcon className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                No bonus packages
              </h4>
              <p className="text-slate-600">
                AI CEOs don't spend the salary budget on themselves.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <svg className="w-12 h-12 text-indigo-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                No private jet needed
              </h4>
              <p className="text-slate-600">
                Zero carbon footprint from unnecessary business travel.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <ClockIcon className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                No golf breaks
              </h4>
              <p className="text-slate-600">
                Zero "business meetings" on the 18th hole or spontaneous fishing retreats.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <ChartBarIcon className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                No mood swings
              </h4>
              <p className="text-slate-600">
                No Monday blues, no post-vacation grumpiness, just algorithmic consistency.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <svg className="w-12 h-12 text-indigo-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                Ego-free
              </h4>
              <p className="text-slate-600">
                No corner office demands, no name on buildings, no vanity acquisitions.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Leadership Features */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-20"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12">
            Thought leadership at the <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">push of a button</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100"
            >
              <SparklesIcon className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900 mb-3">Strategic Vision</h4>
              <p className="text-slate-600">Generate buzzword-heavy manifestos that sound revolutionary while meaning absolutely nothing.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"
            >
              <CpuChipIcon className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900 mb-3">AI-Powered Insights</h4>
              <p className="text-slate-600">Deliver profound wisdom like "synergize the blockchain paradigm" with complete confidence.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-8 border border-pink-100"
            >
              <BoltIcon className="w-12 h-12 text-pink-600 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900 mb-3">Instant Decisions</h4>
              <p className="text-slate-600">Make bold choices in milliseconds, like pivoting to the metaverse just as the trend dies.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to upgrade your leadership?
            </h3>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of companies that have already made the switch to AI-powered executive decisions.
            </p>
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Replace Your Boss Now
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default WelcomePage
