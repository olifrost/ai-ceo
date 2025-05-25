
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShareIcon, EnvelopeIcon, GiftIcon } from '@heroicons/react/24/outline';
import { shareApp, addVotes } from '../services/voteLimit';
import EmailCEOModal from './EmailCEOModal';

interface OutOfVotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVotesAdded: () => void;
  topCeo?: { name: string; company: string } | null;
}

export default function OutOfVotesModal({ isOpen, onClose, onVotesAdded, topCeo }: OutOfVotesModalProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const success = await shareApp();
      if (success) {
        setShareSuccess(true);
        addVotes(2); // Add 2 votes for sharing
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
    setShowEmailModal(true);
  };

  const handleEmailComplete = () => {
    setShowEmailModal(false);
    addVotes(1); // Add 1 vote for emailing a CEO
    onVotesAdded();
    onClose();
  };

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
                <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                  Out of Votes! 🗳️
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-300 mb-6 font-['Space_Grotesk']">
                You've used all your votes! Unlock more by taking one of these actions:
              </p>

              <div className="space-y-3">
                <motion.button
                  onClick={handleShare}
                  disabled={isSharing || shareSuccess}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-4 rounded-lg transition-all font-['Space_Grotesk'] font-semibold text-white flex items-center justify-center gap-3"
                  whileHover={{ scale: shareSuccess ? 1 : 1.02 }}
                  whileTap={{ scale: shareSuccess ? 1 : 0.98 }}
                >
                  {shareSuccess ? (
                    <>
                      <GiftIcon className="w-5 h-5" />
                      +2 Votes Added!
                    </>
                  ) : isSharing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sharing...
                    </>
                  ) : (
                    <>
                      <ShareIcon className="w-5 h-5" />
                      Share this site (+2 votes)
                    </>
                  )}
                </motion.button>

                {topCeo && (
                  <motion.button
                    onClick={handleEmailCEO}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-4 rounded-lg transition-all font-['Space_Grotesk'] font-semibold text-white flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                    Email {topCeo.name} (+1 vote)
                  </motion.button>
                )}

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-400 font-['Space_Grotesk']">
                    More ways to earn votes coming soon...
                  </p>
                </div>
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
    </>
  );
}
