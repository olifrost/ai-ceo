import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export default function WelcomeStep({ onComplete, onSkip }: WelcomeStepProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  const mainText = "Welcome to AI CEO";
  const subtitle = "Your digital boss replacement is here";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < mainText.length) {
        setDisplayedText(mainText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowSubtitle(true), 200);
        setTimeout(() => setShowButton(true), 800);
      }
    }, 40); // Much faster typing

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100"
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 font-['Space_Grotesk'] bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent min-h-[4rem]">
          {displayedText}
          <span className="animate-pulse text-slate-400">|</span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 20 }}
          className="text-xl text-slate-600 mb-12"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
          className="space-y-4"
        >
          <button
            onClick={onComplete}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all font-['Space_Grotesk'] shadow-lg"
          >
            Get Started →
          </button>
          
          {onSkip && (
            <div>
              <button
                onClick={onSkip}
                className="text-slate-500 hover:text-slate-700 transition-colors text-sm"
              >
                Skip onboarding
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
