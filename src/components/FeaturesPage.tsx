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

interface FeaturesPageProps {
  onGetStarted: () => void
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onGetStarted }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4">
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <h1 
            className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            AI CEO
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
            It's time human resources teams<br />
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              dropped the human part
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Why settle for expensive, unpredictable human CEOs when you can have AI leadership that delivers consistent corporate wisdom at the push of a button?
          </p>
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Replace Your Boss Now
            <ArrowRightIcon className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Stop Working for Humans Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h3 className="text-5xl font-bold text-slate-900 mb-12">
            Stop working <span className="text-red-500">for humans</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <CurrencyDollarIcon className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                AI CEOs don't spend the salary budget on their bonus
              </h4>
              <p className="text-slate-600">
                No more watching 90% of company profits disappear into executive compensation packages.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <svg className="w-12 h-12 text-red-500 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                AI CEOs don't need private jets
              </h4>
              <p className="text-slate-600">
                Zero carbon footprint from unnecessary business travel and luxury transportation.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <ClockIcon className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                AI CEOs don't need CEO salaries
              </h4>
              <p className="text-slate-600">
                Redirect millions in executive compensation back to actual business operations.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <ChartBarIcon className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                AI CEOs work 24/7 without burnout
              </h4>
              <p className="text-slate-600">
                Consistent leadership performance without mental health days or vacation requests.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Thought Leadership Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-20"
        >
          <h3 className="text-5xl font-bold text-slate-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Thought leadership
            </span>, at the push of a button
          </h3>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Generate executive insights that sound profound while saying absolutely nothing of substance.
          </p>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-8 shadow-xl"
            >
              <SparklesIcon className="w-12 h-12 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold mb-4">Thought leadership that's generative</h4>
              <p className="opacity-90">
                AI-powered insights that adapt to any industry buzzword or market trend in real-time.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl p-8 shadow-xl"
            >
              <BoltIcon className="w-12 h-12 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold mb-4">Instant corporate speak</h4>
              <p className="opacity-90">
                Transform any terrible business decision into inspiring leadership messaging instantly.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-8 shadow-xl"
            >
              <CpuChipIcon className="w-12 h-12 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold mb-4">Algorithmic excellence</h4>
              <p className="opacity-90">
                Convert human potential into scalable, profit-optimized corporate efficiency metrics.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-16 text-white"
        >
          <h3 className="text-4xl font-bold mb-6">
            Ready to replace your boss?
          </h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of companies who've already upgraded from expensive human leadership to efficient AI management.
          </p>
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            Start Your AI CEO Trial
            <ArrowRightIcon className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FeaturesPage
