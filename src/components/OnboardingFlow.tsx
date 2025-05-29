import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeStep from './onboarding/WelcomeStep.tsx';
import BossBuilderStep from './onboarding/BossBuilderStep.tsx';
import HelpOptionsStep from './onboarding/HelpOptionsStep.tsx';
import ResultStep from './onboarding/ResultStep.tsx';
import CEOVoting from './CEOVoting';
import ShareQuoteModal from './ShareQuoteModal';

export type OnboardingStep = 'welcome' | 'boss-builder' | 'help-options' | 'result' | 'voting' | 'complete';

export interface BossProfile {
  personality: 'corporate' | 'visionary' | 'humanist';
  photo: string;
  industry: string;
  bio: string;
  name: string;
}

export interface HelpOption {
  id: string;
  label: string;
  icon: string;
  category: 'environment' | 'efficiency' | 'vision' | 'growth';
}

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export default function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [bossProfile, setBossProfile] = useState<BossProfile | null>(null);
  const [selectedOption, setSelectedOption] = useState<HelpOption | null>(null);
  const [generatedQuote, setGeneratedQuote] = useState<string>('');
  const [showShareModal, setShowShareModal] = useState(false);

  const handleWelcomeComplete = () => {
    setCurrentStep('boss-builder');
  };

  const handleBossBuilt = (profile: BossProfile) => {
    setBossProfile(profile);
    setCurrentStep('help-options');
  };

  const handleOptionSelected = (option: HelpOption) => {
    setSelectedOption(option);
    setCurrentStep('result');
  };

  const handleResultComplete = (quote: string) => {
    setGeneratedQuote(quote);
    // Auto-advance after showing result
    setTimeout(() => {
      setCurrentStep('complete');
    }, 3000);
  };

  const handleVoting = () => {
    setCurrentStep('voting');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleNewQuestion = () => {
    // Reset to help options to allow asking another question
    setSelectedOption(null);
    setGeneratedQuote('');
    setCurrentStep('help-options');
  };

  const accentColor = selectedOption 
    ? {
        environment: '#10b981',
        efficiency: '#0ea5e9', 
        growth: '#ec4899',
        vision: '#7c3aed',
      }[selectedOption.category] || '#7c3aed'
    : '#7c3aed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}40 0%, transparent 50%), 
                       linear-gradient(45deg, ${accentColor}20 0%, transparent 100%)`
        }}
      />
      
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <WelcomeStep 
            key="welcome" 
            onComplete={handleWelcomeComplete} 
            onSkip={onSkip}
          />
        )}
        
        {currentStep === 'boss-builder' && (
          <BossBuilderStep key="boss-builder" onComplete={handleBossBuilt} />
        )}
        
        {currentStep === 'help-options' && bossProfile && (
          <HelpOptionsStep 
            key="help-options" 
            bossProfile={bossProfile}
            onOptionSelected={handleOptionSelected}
          />
        )}
        
        {currentStep === 'result' && selectedOption && bossProfile && (
          <ResultStep 
            key="result"
            bossProfile={bossProfile}
            selectedOption={selectedOption}
            onComplete={handleResultComplete}
            onShare={handleShare}
            onVoting={handleVoting}
            onNewQuestion={handleNewQuestion}
            accentColor={accentColor}
          />
        )}
        
        {currentStep === 'voting' && (
          <CEOVoting onBack={() => setCurrentStep('complete')} />
        )}
        
        {currentStep === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-screen"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 font-['Space_Grotesk']">
                Welcome to AI CEO
              </h1>
              <p className="text-xl text-gray-400 mb-8">Ready to replace your boss?</p>
              <button
                onClick={onComplete}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Continue to Main App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <ShareQuoteModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        quote={generatedQuote}
        name={bossProfile?.name || 'AI CEO'}
        attribution={bossProfile?.bio || ''}
        accentColor={accentColor}
        onEdit={(fields) => {
          setGeneratedQuote(fields.quote);
        }}
      />
    </div>
  );
}
