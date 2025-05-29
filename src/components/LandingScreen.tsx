import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const texts = [
    "AI CEO",
    "Replace your boss before they replace you"
  ];

  useEffect(() => {
    if (textIndex < texts.length - 1) {
      const timer = setTimeout(() => {
        setTextIndex(textIndex + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // After all text has appeared, show the start button
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [textIndex, texts.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col items-center justify-center px-4">
      {/* Main content container */}
      <div className="text-center max-w-4xl mx-auto">
        {/* Animated text display */}
        <div className="mb-12 space-y-6">
          {texts.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: textIndex >= index ? 1 : 0,
                y: textIndex >= index ? 0 : 30
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`${index === 0 ? 'text-6xl md:text-8xl font-bold' : 'text-xl md:text-2xl font-medium'}`}
            >
              {index === 0 ? (
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  {text}
                </span>
              ) : (
                <span className="text-gray-600">
                  {text}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Subtitle that appears after main text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: textIndex >= texts.length - 1 ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-gray-500 text-lg">
            Building your boss
          </p>
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isReady ? 1 : 0,
            scale: isReady ? 1 : 0.8
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <SparklesIcon className="w-6 h-6" />
              <span>Tap to start</span>
            </div>
            
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ zIndex: -1 }}
            />
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 0.1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {/* Floating gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-gray-400 text-sm">
          Does not actually use AI
        </p>
      </motion.div>
    </div>
  );
};

export default LandingScreen;
