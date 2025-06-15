import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon,
  SparklesIcon,
  CpuChipIcon,
  BoltIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import CannesPopup from './CannesPopup';

interface WelcomePageProps {
  onGetStarted: () => void
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {
  const [showPopup, setShowPopup] = useState(false);
  const stopWorkingRef = useRef<HTMLHeadingElement | null>(null);

  // Check localStorage on component mount to see if popup has been shown before
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenCannesPopup');
    if (!hasSeenPopup) {
      setShowPopup(true);
    }
    
    // Check if we need to scroll to the "stop working for humans" section
    const shouldScrollToSection = localStorage.getItem('scrollToStopWorkingSection');
    if (shouldScrollToSection === 'true') {
      // Small delay to ensure the DOM is fully loaded
      setTimeout(() => {
        const el = document.getElementById('stop-working-headline');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Clear the flag after scrolling
          localStorage.removeItem('scrollToStopWorkingSection');
        }
      }, 300);
    }
  }, []);

  const handleClosePopup = () => {
    // Store in localStorage that user has seen the popup
    localStorage.setItem('hasSeenCannesPopup', 'true');
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && <CannesPopup onClose={handleClosePopup} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white"
      >
        {/* Hero Section - Product Page Layout */}
        <div className="min-h-screen flex flex-col items-center justify-between px-6 py-8 w-full relative overflow-hidden">
          {/* Static gradient background - no animation for better performance */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 via-light-gray/20 to-brand-pink/5"></div>
          
          {/* Content Container */}
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl relative z-10">
            {/* Small Logo in white pill with gradient */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-4"
            >
              <div className="inline-flex items-center justify-center px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
                <svg className="h-6 md:h-8" viewBox="0 0 2780.72 560.28" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F14FFF" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <mask id="textMask">
                      <rect width="100%" height="100%" fill="black"/>
                      <g fill="white">
                        <path d="M338.34,550.97l-38.02-138.13h-160.63l-37.25,138.13H0L152.1,9.31h141.23l152.87,541.65h-107.87ZM223.49,109.42h-6.21l-59.75,221.16h125.71l-59.75-221.16Z"/>
                        <path d="M578.27,550.97v-76.05h121.83V85.36h-121.83V9.31h344.55v76.05h-121.83v389.56h121.83v76.05h-344.55Z"/>
                        <path d="M1478.13,560.28c-70.88,0-123.26-24.31-157.14-72.94-33.89-48.62-50.83-117.69-50.83-207.19s16.94-157.92,50.83-206.81C1354.87,24.44,1407.25,0,1478.13,0c26.89,0,50.56,3.59,71.01,10.77,20.43,7.18,38.15,17.04,53.16,29.6,15,12.56,27.41,27.72,37.25,45.49,9.82,17.78,17.58,37.27,23.28,58.48l-93.12,26.38c-3.63-12.42-7.76-24.06-12.42-34.92-4.66-10.86-10.48-20.3-17.46-28.32-6.98-8.01-15.65-14.22-26-18.62-10.36-4.39-22.77-6.6-37.25-6.6-35.19,0-60.41,13.51-75.66,40.51-15.27,27.01-22.89,63.89-22.89,110.63v93.48c0,46.76,7.63,83.63,22.89,110.63,15.25,27.01,40.47,40.51,75.66,40.51,14.48,0,26.89-2.19,37.25-6.6,10.34-4.39,19.01-10.6,26-18.62,6.98-8.01,12.8-17.46,17.46-28.32,4.65-10.86,8.79-22.5,12.42-34.92l93.12,26.38c-5.7,21.22-13.46,40.7-23.28,58.48-9.83,17.78-22.25,32.94-37.25,45.51-15.01,12.56-32.73,22.42-53.16,29.6-20.44,7.17-44.11,10.75-71.01,10.75Z"/>
                        <path d="M1845.79,550.97V9.31h342.22v83.81h-240.56v141.23h232.03v83.81h-232.03v148.99h240.56v83.81h-342.22Z"/>
                        <path d="M2575.85,560.28c-35.19,0-65.71-6.34-91.57-19.01-25.87-12.67-47.21-30.91-64.02-54.71-16.82-23.79-29.23-53.02-37.25-87.69-8.03-34.65-12.03-74.23-12.03-118.73s4-83.42,12.03-118.34c8.01-34.92,20.43-64.28,37.25-88.08,16.81-23.79,38.15-42.02,64.02-54.71,25.86-12.67,56.38-19.01,91.57-19.01,70.35,0,122.09,24.58,155.2,73.72,33.1,49.16,49.67,117.95,49.67,206.42s-16.56,157.27-49.67,206.42c-33.11,49.15-84.85,73.72-155.2,73.72ZM2575.85,478.02c18.1,0,33.37-3.5,45.79-10.51,12.41-7.01,22.37-17.01,29.88-30,7.49-12.97,12.92-28.94,16.3-47.91,3.36-18.96,5.04-40.12,5.04-63.5v-92.71c0-46.74-7.12-83.62-21.34-110.63-14.24-27-39.46-40.51-75.66-40.51s-61.44,13.51-75.66,40.51c-14.24,27.01-21.34,63.89-21.34,110.63v93.48c0,46.76,7.11,83.63,21.34,110.63,14.22,27.01,39.44,40.51,75.66,40.51Z"/>
                        <path d="M1182.16,280.14l-44.24,11.66c-26.71,7.04-47.57,27.9-54.61,54.61l-11.66,44.24-11.66-44.24c-7.04-26.71-27.9-47.57-54.61-54.61l-44.24-11.66,44.24-11.66c26.71-7.04,47.57-27.9,54.61-54.61l11.66-44.24,11.66,44.24c7.04,26.71,27.9,47.57,54.61,54.61l44.24,11.66Z"/>
                      </g>
                    </mask>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#logoGradient)" mask="url(#textMask)"/>
                </svg>
              </div>
            </motion.div>

            {/* Large intro line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Replace your boss <br />
                <span className="text-brand-pink">before they replace&nbsp;you</span>
              </h1>
            </motion.div>

            {/* Get Started Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
              className="mb-6"
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
            {/* Learn more link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-12"
            >
              <button
                onClick={() => {
                  if (stopWorkingRef.current) {
                    stopWorkingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="text-brand-pink/80 hover:text-brand-pink text-base font-medium underline underline-offset-2 transition-colors duration-200 flex flex-col items-center gap-1"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                type="button"
              >
                <span>Learn more</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                  className="flex justify-center"
                >
                  <ChevronDownIcon className="w-5 h-5 text-brand-pink/60" />
                </motion.div>
              </button>
            </motion.div>
          </div>

          {/* CEO Image positioned at bottom with radial gradient */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-full flex justify-center -mb-8"
          >
            {/* Stronger radial gradient background behind CEO */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1000px] h-[700px] bg-gradient-radial from-brand-pink/60 via-brand-pink/30 to-transparent blur-3xl"></div>
            {/* CEO Image touching bottom */}
            <img 
              src="/David 1.webp" 
              alt="AI CEO" 
              className="relative z-10 h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl object-cover object-top rounded-xl transition-all duration-300"
              style={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
              }}
            />
          </motion.div>
        </div>

        {/* Features Section with white background */}
        <div id="info-section" className="bg-white">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            {/* Main Headline - Stop working for humans */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-10"
            >
              <h2 ref={stopWorkingRef} id="stop-working-headline" className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Stop working <span className="text-brand-pink">for humans</span>
              </h2>
              <p className="text-xl text-slate-600 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                Why settle for expensive, unpredictable human CEOs when you can have AI leadership that delivers consistent corporate wisdom at the push of a button?
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12 md:mb-20"
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
                    AI CEOs don't even have a salary to blow on yachts, bonuses, or questionable sushi receipts.
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
                   No golf courses, no private islands, no extravagant retreats—just pure, unadulterated efficiency.
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
              className="text-center mb-6 md:mb-10"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 md:mb-12">
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
              <div className="bg-gradient-to-r from-brand-pink to-brand-pink/80 rounded-3xl p-6 md:p-8 text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3">
                  Ready to upgrade your leadership?
                </h3>
                <p className="text-xl text-white/90 mb-4 md:mb-5 max-w-2xl mx-auto">
                  Join thousands of companies that have already made the switch to AI-powered executive decisions.
                </p>
                <motion.button
                  onClick={onGetStarted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-pink font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Replace Your Boss&nbsp;Now
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Made by Serious People link with pill design - only at bottom, not fixed */}
        <div className="w-full text-center mb-4">
          <a 
            href="https://seriouspeople.co" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-slate-200 text-slate-600 hover:text-brand-pink text-sm font-medium transition-colors duration-200"
          >
            Made by Serious People
          </a>
        </div>
      </motion.div>
    </>
  )
}

export default WelcomePage
