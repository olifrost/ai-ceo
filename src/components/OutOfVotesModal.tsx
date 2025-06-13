import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShareIcon, EnvelopeIcon, GiftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { shareApp, addVotes } from '../services/voteLimit';
import EmailCEOModal from './EmailCEOModal';
import ShareQuoteModal from './ShareQuoteModal';
import { CEO_PERSONALITIES } from '../data/ceoPersonalities';

interface OutOfVotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVotesAdded: () => void;
  topCeo?: { name: string; company: string } | null;
  accentColor?: string;
}

export default function OutOfVotesModal({ isOpen, onClose, onVotesAdded, topCeo, accentColor = '#7c3aed' }: OutOfVotesModalProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  // Share quote text
  const shareQuote = topCeo?.name ? `Replace ${topCeo.name} at ${topCeo.company} with AI!` : 'Replace your CEO with AI!';

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const success = await shareApp();
      if (success) {
        setShareSuccess(true);
        addVotes(1); // Add 1 vote for sharing
        setTimeout(() => {
          onVotesAdded();
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleEmailCEO = () => {
    addVotes(3); // Add 3 votes for email action
    setShowEmailModal(true);
  };

  // When share quote modal is used, give votes and close modal
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-white flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: accentColor }}>
                      <path d="M10 1a6 6 0 00-6 6v1h12V7a6 6 0 00-6-6zM4 8v2.5A6.47 6.47 0 005.5 16h9a6.47 6.47 0 001.5-5.5V8H4z" />
                    </svg>
                  </div>
                  Out of Votes
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-300 mb-6 font-['Space_Grotesk']">
                Unlock more votes by taking one of these actions:
              </p>
              <div className="space-y-4">
                {topCeo && (
                  <div className="flex flex-col bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                    <div 
                      className="relative px-4 py-3.5 flex items-center justify-between"
                      style={{ background: `linear-gradient(90deg, ${accentColor}15, transparent)` }}
                    >
                      <span className="font-semibold font-['Space_Grotesk'] text-white">Email {topCeo.name}</span>
                      <span className="bg-gray-800 px-2 py-1 rounded text-xs font-semibold" style={{ color: accentColor }}>+3 votes</span>
                    </div>
                    <motion.button
                      onClick={handleEmailCEO}
                      className="w-full px-4 py-3 transition-all font-['Space_Grotesk'] font-semibold text-white flex items-center justify-center gap-2 hover:bg-gray-700/50"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <EnvelopeIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}

                <div className="flex flex-col bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                  <div 
                    className="relative px-4 py-3.5 flex items-center justify-between"
                    style={{ background: `linear-gradient(90deg, ${accentColor}15, transparent)` }}
                  >
                    <span className="font-semibold font-['Space_Grotesk'] text-white">Create a share quote</span>
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs font-semibold" style={{ color: accentColor }}>+2 votes</span>
                  </div>
                  <motion.button
                    onClick={() => setShowShareModal(true)}
                    className="w-full px-4 py-3 transition-all font-['Space_Grotesk'] font-semibold text-white flex items-center justify-center gap-2 hover:bg-gray-700/50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <PhotoIcon className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <div className="flex flex-col bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                  <div 
                    className="relative px-4 py-3.5 flex items-center justify-between"
                    style={{ background: `linear-gradient(90deg, ${accentColor}15, transparent)` }}
                  >
                    <span className="font-semibold font-['Space_Grotesk'] text-white">Share this site</span>
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs font-semibold" style={{ color: accentColor }}>+1 vote</span>
                  </div>
                  <motion.button
                    onClick={handleShare}
                    disabled={isSharing || shareSuccess}
                    className={`w-full px-4 py-3 transition-all font-['Space_Grotesk'] font-semibold text-white flex items-center justify-center gap-2 ${isSharing || shareSuccess ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-700/50'}`}
                    whileHover={{ scale: shareSuccess ? 1 : 1.01 }}
                    whileTap={{ scale: shareSuccess ? 1 : 0.99 }}
                  >
                    {shareSuccess ? (
                      <>
                        <GiftIcon className="w-5 h-5" />
                        Votes Added!
                      </>
                    ) : isSharing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sharing...
                      </>
                    ) : (
                      <>
                        <ShareIcon className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
                {/* Hidden dev option for more votes */}
                <motion.button
                  onClick={() => { addVotes(100); onVotesAdded(); onClose(); }}
                  className="w-full bg-gray-900 border border-dashed border-green-400 px-6 py-2 rounded-lg text-green-400 text-xs mt-2 opacity-60 hover:opacity-100"
                  style={{ display: process.env.NODE_ENV === 'development' ? 'block' : 'none' }}
                >
                  DEV: Add 100 votes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <EmailCEOModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        ceoName={topCeo?.name || ''}
      />
      <ShareQuoteModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        quote={shareQuote}
        ceoPersonality={CEO_PERSONALITIES[0]}
        accentColor={accentColor || '#7c3aed'}
      />
    </>
  );
}
