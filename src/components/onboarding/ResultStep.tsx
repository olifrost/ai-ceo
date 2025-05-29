import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BossProfile, HelpOption } from '../OnboardingFlow';
import { ArrowPathIcon, ShareIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ResultStepProps {
  bossProfile: BossProfile;
  selectedOption: HelpOption;
  onComplete: (quote: string) => void;
  onShare: () => void;
  onVoting: () => void;
  onNewQuestion: () => void; // New prop for game loop
  accentColor: string;
}

const responses = {
  'burn-planet': [
    "Let's pivot our sustainability targets to align with quarterly profits. The planet will thank us for being realistic about shareholder expectations.",
    "Climate change is just nature asking for innovation. We're not destroying habitats, we're creating urban opportunities for wildlife.",
    "We're not anti-environment, we're pro-business environment. There's a difference, and it's measurable in revenue."
  ],
  'optimize-costs': [
    "I've noticed the workforce spends over four hours a day 'sleeping'. Let's improve this by moving to a post-sleep workforce.",
    "We're not downsizing, we're rightsizing for excellence. Let's reduce redundancy by eliminating redundant employees.",
    "Remote work is great, but presence work is revolutionary. We want our team where we can see their dedication."
  ],
  'sound-smart': [
    "Let's craft a LinkedIn post about building the metaverse of the metaverse. It's a meta-meta-verse - completely paradigm-shifting.",
    "We don't solve problems, we reimagine solutions in problem-adjacent spaces. It's next-level thought leadership.",
    "Our north star metric is disruption itself. We're not just thinking outside the box, we're redefining the geometry of thought."
  ],
  'maximize-growth': [
    "We're not burning cash, we're converting currency into momentum. Our runway is infinite if you believe in the mission hard enough.",
    "Growth isn't just a metric, it's our oxygen. We need to accelerate our acceleration and disrupt our own disruption.",
    "We don't have competitors, we have inspiration sources. Market domination is just collaborative leadership at scale."
  ]
};

export default function ResultStep({ 
  bossProfile, 
  selectedOption, 
  onComplete, 
  onShare, 
  onVoting,
  onNewQuestion,
  accentColor 
}: ResultStepProps) {
  const [isThinking, setIsThinking] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [typedResponse, setTypedResponse] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState('');

  useEffect(() => {
    // Select random response
    const responses_for_option = responses[selectedOption.id as keyof typeof responses] || responses['sound-smart'];
    const randomResponse = responses_for_option[Math.floor(Math.random() * responses_for_option.length)];
    setSelectedResponse(randomResponse);

    // Show thinking animation
    const thinkingTimer = setTimeout(() => {
      setIsThinking(false);
      setShowResult(true);
    }, 2000);

    return () => clearTimeout(thinkingTimer);
  }, [selectedOption]);

  // Typing effect for response
  useEffect(() => {
    if (showResult && selectedResponse) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= selectedResponse.length) {
          setTypedResponse(selectedResponse.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setShowActions(true);
            onComplete(selectedResponse);
          }, 1000);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [showResult, selectedResponse, onComplete]);

  const regenerateResponse = () => {
    setShowActions(false);
    setTypedResponse('');
    setIsThinking(true);
    
    setTimeout(() => {
      const responses_for_option = responses[selectedOption.id as keyof typeof responses] || responses['sound-smart'];
      const randomResponse = responses_for_option[Math.floor(Math.random() * responses_for_option.length)];
      setSelectedResponse(randomResponse);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6"
    >
      <div className="max-w-2xl w-full">
        {/* Boss Avatar */}
        <div className="flex justify-center mb-8">
          <img 
            src={bossProfile.photo} 
            alt={bossProfile.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-slate-200/60 shadow-xl"
          />
        </div>

        {/* Response Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-bl-none p-6 shadow-xl border border-slate-200/50 mb-8 min-h-[200px] flex items-center">
          {isThinking ? (
            <div className="flex items-center gap-3 text-slate-600">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6"
              >
                ⚙️
              </motion.div>
              <span className="font-['Space_Grotesk'] text-lg">
                Thinking...
              </span>
            </div>
          ) : (
            <div className="w-full">
              <p className="text-slate-900 font-['Space_Grotesk'] text-lg leading-relaxed">
                {typedResponse}
                {typedResponse.length < selectedResponse.length && (
                  <span className="opacity-50 animate-pulse">|</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showActions ? 1 : 0, y: showActions ? 0 : 20 }}
          className="space-y-4"
        >
          {/* Regenerate Button */}
          <div className="flex justify-center mb-6">
            <motion.button
              onClick={regenerateResponse}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100/70 hover:bg-slate-200/70 rounded-full border border-slate-300 text-slate-700 hover:text-slate-900 transition-all font-['Space_Grotesk'] shadow-sm hover:shadow-md"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Try again
            </motion.button>
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.button
              onClick={onNewQuestion}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300 font-['Space_Grotesk'] font-semibold text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                boxShadow: `0 4px 15px ${accentColor}40`
              }}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Ask Another Question
            </motion.button>

            <motion.button
              onClick={onVoting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 p-4 border-2 rounded-xl transition-all duration-300 font-['Space_Grotesk'] font-semibold bg-white/50 hover:bg-white/70 shadow-sm hover:shadow-md"
              style={{
                borderColor: accentColor,
                color: accentColor
              }}
            >
              <UserGroupIcon className="w-5 h-5" />
              Replace Boss
            </motion.button>

            <motion.button
              onClick={onShare}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 p-4 border-2 rounded-xl transition-all duration-300 font-['Space_Grotesk'] font-semibold bg-white/50 hover:bg-white/70 shadow-sm hover:shadow-md"
              style={{
                borderColor: accentColor,
                color: accentColor
              }}
            >
              <ShareIcon className="w-5 h-5" />
              Share
            </motion.button>
          </div>

          {/* Helper Text */}
          <p className="text-center text-slate-600 text-sm font-['Space_Grotesk'] mt-6">
            Continue the conversation or try a different boss
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
