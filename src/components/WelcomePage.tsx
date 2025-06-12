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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section - Product Page Layout */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 w-full relative overflow-hidden">
        {/* Static gradient background - no animation for better performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 via-light-gray/20 to-brand-pink/5"></div>
        
        <div className="text-center max-w-4xl relative z-10">
          {/* Small Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <img 
              src="/AICEO-Logo-Dark.svg" 
              alt="AI CEO" 
              className="h-12 md:h-16 mx-auto"
            />
          </motion.div>

          {/* Large intro line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
              Replace your boss <br />
              <span className="text-brand-pink">before they replace you</span>
            </h1>
          </motion.div>

          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
            className="mb-12"
          >
            <button
              onClick={onGetStarted}
              className="group relative px-8 py-4 bg-brand-pink hover:bg-brand-pink/90 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
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
            </button>
          </motion.div>

          {/* CEO Image with gradient background */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="relative inline-block">
              {/* Static gradient background behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 via-light-gray/30 to-transparent rounded-3xl transform scale-110 -z-10"></div>
              <img 
                src="/AICEO-MAN.png" 
                alt="AI CEO" 
                className="max-w-sm md:max-w-md lg:max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section with white background */}
      <div className="bg-white">
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
              Stop working <span className="text-brand-pink">for humans</span>
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
                <CurrencyDollarIcon className="w-12 h-12 text-brand-pink mb-4 mx-auto" />
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
                <svg className="w-12 h-12 text-brand-pink mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <ClockIcon className="w-12 h-12 text-brand-pink mb-4 mx-auto" />
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
                <ChartBarIcon className="w-12 h-12 text-brand-pink mb-4 mx-auto" />
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
                <svg className="w-12 h-12 text-brand-pink mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Thought leadership at the <span className="text-brand-pink">push of a button</span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-brand-pink/5 to-light-gray/10 rounded-2xl p-8 border border-brand-pink/10"
              >
                <SparklesIcon className="w-12 h-12 text-brand-pink mb-4 mx-auto" />
                <h4 className="text-xl font-bold text-slate-900 mb-3">Strategic Vision</h4>
                <p className="text-slate-600">Generate buzzword-heavy manifestos that sound revolutionary while meaning absolutely nothing.</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-light-gray/10 to-brand-pink/5 rounded-2xl p-8 border border-light-gray/20"
              >
                <CpuChipIcon className="w-12 h-12 text-brand-pink mb-4 mx-auto" />
                <h4 className="text-xl font-bold text-slate-900 mb-3">AI-Powered Insights</h4>
                <p className="text-slate-600">Deliver profound wisdom like "synergize the blockchain paradigm" with complete confidence.</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-brand-pink/5 to-light-gray/10 rounded-2xl p-8 border border-brand-pink/10"
              >
                <BoltIcon className="w-12 h-12 text-brand-pink mb-4 mx-auto" />
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
            <div className="bg-gradient-to-r from-brand-pink to-brand-pink/80 rounded-3xl p-12 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to upgrade your leadership?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of companies that have already made the switch to AI-powered executive decisions.
              </p>
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-pink font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Replace Your Boss Now
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default WelcomePage
