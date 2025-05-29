import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BossProfile, HelpOption } from '../OnboardingFlow';
import { FireIcon, CurrencyDollarIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface HelpOptionsStepProps {
  bossProfile: BossProfile;
  onOptionSelected: (option: HelpOption) => void;
}

const helpOptions: HelpOption[] = [
  {
    id: 'burn-planet',
    label: 'Burn Planet',
    icon: 'FireIcon',
    category: 'environment'
  },
  {
    id: 'optimize-costs',
    label: 'Optimize Costs',
    icon: 'CurrencyDollarIcon',
    category: 'efficiency'
  },
  {
    id: 'sound-smart',
    label: 'Sound Smart',
    icon: 'LightBulbIcon',
    category: 'vision'
  },
  {
    id: 'maximize-growth',
    label: 'Maximize Growth',
    icon: 'ChartBarIcon',
    category: 'growth'
  }
];

export default function HelpOptionsStep({ bossProfile, onOptionSelected }: HelpOptionsStepProps) {
  const [showGreeting, setShowGreeting] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [typedText, setTypedText] = useState('');

  const greeting = `Hello, I'm ${bossProfile.name}.`;
  const question = "What can I help you with?";

  useEffect(() => {
    setTimeout(() => setShowGreeting(true), 500);
    setTimeout(() => setShowQuestion(true), 2000);
    setTimeout(() => setShowOptions(true), 3500);
  }, []);

  // Typing effect for greeting
  useEffect(() => {
    if (showGreeting) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= greeting.length) {
          setTypedText(greeting.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [showGreeting, greeting]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6"
    >
      <div className="max-w-2xl w-full">
        {/* Boss Avatar and Chat Interface */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="mb-6"
          >
            <img 
              src={bossProfile.photo} 
              alt={bossProfile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-200/60 shadow-2xl"
            />
          </motion.div>

          {/* Chat Messages */}
          <div className="w-full max-w-lg space-y-4">
            {/* Greeting Message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: showGreeting ? 1 : 0, x: showGreeting ? 0 : -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-bl-none p-4 shadow-lg border border-slate-200/50"
            >
              <p className="text-slate-900 font-['Space_Grotesk'] text-lg">
                {typedText}
                <span className="opacity-50 animate-pulse">|</span>
              </p>
            </motion.div>

            {/* Question Message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: showQuestion ? 1 : 0, x: showQuestion ? 0 : -20 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-bl-none p-4 shadow-lg border border-slate-200/50"
            >
              <p className="text-slate-900 font-['Space_Grotesk'] text-lg">
                {question}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Help Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showOptions ? 1 : 0, y: showOptions ? 0 : 20 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <p className="text-center text-slate-600 text-sm font-['Space_Grotesk'] mb-4">
            Choose what you'd like help with:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {helpOptions.map((option, index) => (
              <motion.button
                key={option.id}
                onClick={() => onOptionSelected(option)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 8px 25px rgba(124, 58, 237, 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 bg-white/50 hover:bg-white/70 rounded-xl border border-slate-200/50 hover:border-purple-300/60 transition-all duration-300 backdrop-blur-sm group shadow-sm hover:shadow-md"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {option.icon}
                </div>
                <div className="text-left">
                  <p className="text-slate-900 font-semibold font-['Space_Grotesk']">
                    {option.label}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
