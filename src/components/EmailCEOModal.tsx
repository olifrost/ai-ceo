import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { generateCEOEmail, createMailtoLink } from '../services/voteLimit';

interface EmailCEOModalProps {
  isOpen: boolean;
  onClose: () => void;
  ceoName: string;
}

export default function EmailCEOModal({ isOpen, onClose, ceoName }: EmailCEOModalProps) {
  const [email, setEmail] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const emailBody = generateCEOEmail(ceoName, customMessage);
  const subject = `Regarding Your Position on the CEO Replacement Leaderboard`;

  const handleSendEmail = () => {
    if (!email.trim()) return;
    
    // Use encodeURIComponent for subject and body to avoid + for spaces
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                Email {ceoName}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  CEO Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter CEO's email address"
                  className="w-full bg-gray-800/50 border border-purple-500/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-['Space_Grotesk'] placeholder-gray-400 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Custom Message (Optional)
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add your personal message here..."
                  rows={4}
                  className="w-full bg-gray-800/50 border border-purple-500/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-['Space_Grotesk'] placeholder-gray-400 text-white resize-none"
                />
                <div className="mt-2 bg-gray-800/40 border border-purple-500/20 rounded-lg p-3">
                  <div className="text-xs text-purple-300 mb-1 font-semibold">Preview:</div>
                  <pre className="whitespace-pre-wrap text-xs text-gray-300 font-mono">{emailBody}</pre>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 border border-purple-500/30 px-4 py-3 rounded-lg transition-all font-['Space_Grotesk'] text-purple-300 hover:text-white"
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={!email.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-800 disabled:to-pink-800 disabled:cursor-not-allowed px-4 py-3 rounded-lg transition-all font-['Space_Grotesk'] font-semibold text-white"
                >
                  Send Email
                </button>
              </div>

              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-purple-300 mb-2">Email Preview:</h3>
                      <div className="text-sm text-gray-300 space-y-2">
                        <div><strong>To:</strong> {email || 'CEO Email'}</div>
                        <div><strong>Subject:</strong> {subject}</div>
                        <div className="border-t border-purple-500/20 pt-2 mt-2">
                          <strong>Body:</strong>
                          <pre className="whitespace-pre-wrap text-xs mt-1 text-gray-400 font-mono">
                            {emailBody}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
