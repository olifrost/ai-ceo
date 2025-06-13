import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon, ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';
import { addVotes } from '../services/voteLimit';
import Logo from './Logo';
import { CEOPersonality } from '../data/ceoPersonalities';

interface ShareQuoteModalProps {
  isOpen: boolean
  onClose: () => void
  quote: string
  ceoPersonality: CEOPersonality
  accentColor: string
}

export default function ShareQuoteModal({ isOpen, onClose, quote, ceoPersonality }: ShareQuoteModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [hasAwardedVotesInSession, setHasAwardedVotesInSession] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Reset states when modal opens and auto-generate image
  useEffect(() => {
    if (isOpen) {
      setGeneratedImageUrl(null);
      setHasAwardedVotesInSession(false);
      // Auto-generate image when modal opens with a small delay
      setTimeout(() => generateImage(), 100);
    }
  }, [isOpen, quote]);

  const generateImage = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(canvasRef.current, {
        width: 800,
        height: 1000,
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setGeneratedImageUrl(dataUrl);

      if (!hasAwardedVotesInSession) {
        addVotes(3);
        toast.success('Nice one! You earned 3 bonus votes for the leaderboard.');
        setHasAwardedVotesInSession(true);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Could not generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImageUrl) return;

    const link = document.createElement('a');
    link.download = `ai-ceo-quote-${Date.now()}.png`;
    link.href = generatedImageUrl;
    link.click();
  };

  const shareImage = async () => {
    if (!generatedImageUrl) return;

    try {
      // Convert data URL to blob
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'ai-ceo-quote.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'AI CEO Quote',
          text: `"${quote}" - ${ceoPersonality.name}`,
          files: [file]
        });
      } else {
        // Fallback to download
        downloadImage();
      }
    } catch (error) {
      console.error('Error sharing:', error);
      downloadImage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white border border-slate-200 rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-slate-900">
                Share Your CEO Quote
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Preview */}
              <div className="mb-6">
                <div ref={canvasRef} className="relative w-[400px] h-[500px] bg-white overflow-hidden mx-auto shadow-xl rounded-md border border-slate-200">
                  
                  {/* CEO Image with Pink Gradient Background */}
                  <div className="absolute inset-0 w-full h-[60%]">
                    {/* Pink gradient background */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(241, 79, 255, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%)'
                      }}
                    />
                    {/* CEO Image */}
                    <img 
                      src={ceoPersonality.photo} 
                      alt={ceoPersonality.name}
                      className="w-full h-full object-cover opacity-90"
                      crossOrigin="anonymous"
                    />
                  </div>

                  {/* Quote Box */}
                  <div className="absolute bottom-0 left-4 right-4 h-[45%] bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center">
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-lg font-bold text-slate-800 leading-tight text-center" style={{ textWrap: 'balance' }}>
                        "{quote}"
                      </p>
                    </div>
                    
                    {/* Logo and Site URL */}
                    <div className="flex flex-col items-center mt-4">
                      <div className="mb-2">
                        <Logo size="sm" />
                      </div>
                      <p className="text-xs text-slate-400 font-medium">
                        replaceyourboss.ai
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                
                {generatedImageUrl ? (
                  <>
                    <button
                      onClick={downloadImage}
                      className="flex items-center gap-2 px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={shareImage}
                      className="flex items-center gap-2 px-6 py-2 bg-brand-pink hover:bg-brand-pink/90 text-white font-medium rounded-lg transition-colors"
                    >
                      <ShareIcon className="w-4 h-4" />
                      Share
                    </button>
                  </>
                ) : (
                  <button
                    onClick={generateImage}
                    disabled={isGenerating}
                    className="px-6 py-2 bg-brand-pink hover:bg-brand-pink/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      'Generate Image'
                    )}
                  </button>
                )}
              </div>

              {/* Success message */}
              {generatedImageUrl && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="font-medium">Image generated successfully! You can download or share it.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
