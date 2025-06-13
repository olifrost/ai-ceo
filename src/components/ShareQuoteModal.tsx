import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon, ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';
import { addVotes } from '../services/voteLimit';
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
      
      // Simple timeout to let the component render before generating
      const timer = setTimeout(() => {
        generateImage();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, quote]);

  const generateImage = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    try {
      console.log('Starting to generate canvas...');
      console.log('Canvas element dimensions:', 
        canvasRef.current.offsetWidth, 
        canvasRef.current.offsetHeight
      );
      
      // First, ensure all images are loaded
      const imageElements = canvasRef.current.querySelectorAll('img');
      console.log('Found', imageElements.length, 'images to preload');
      
      // Manually preload images
      const preloadPromises = Array.from(imageElements).map((img) => {
        return new Promise((resolve) => {
          // If already complete, resolve immediately
          if ((img as HTMLImageElement).complete) {
            console.log('Image already loaded:', (img as HTMLImageElement).src);
            resolve(null);
            return;
          }
          
          // Otherwise wait for load or error
          img.addEventListener('load', () => {
            console.log('Image loaded:', (img as HTMLImageElement).src);
            resolve(null);
          });
          
          img.addEventListener('error', () => {
            console.error('Image failed to load:', (img as HTMLImageElement).src);
            resolve(null);
          });
        });
      });
      
      // Wait for all images to be loaded
      await Promise.all(preloadPromises);
      console.log('All images preloaded');
      
      // Give a bit more time for rendering
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Now generate the canvas
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true // Enable logging for troubleshooting
      });
      
      console.log('Canvas created with dimensions:', canvas.width, canvas.height);
      // Check if the canvas has content
      if (canvas.width <= 0 || canvas.height <= 0) {
        throw new Error('Generated canvas has no dimensions');
      }
      
      // Try to generate data URL with different formats if needed
      let dataUrl;
      try {
        dataUrl = canvas.toDataURL('image/png');
        console.log('PNG data URL generated, length:', dataUrl.length);
      } catch (e) {
        console.error('Error with PNG format, trying JPEG:', e);
        dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        console.log('JPEG data URL generated as fallback');
      }
      
      if (!dataUrl || dataUrl === 'data:,' || dataUrl.length < 1000) {
        throw new Error('Generated dataUrl appears to be empty or invalid');
      }
      
      setGeneratedImageUrl(dataUrl);
      console.log('Successfully set image URL!');

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
                <div id="quote-canvas" ref={canvasRef} className="relative w-[400px] h-[500px] mx-auto shadow-xl rounded-lg border border-slate-200">
                  
                  {/* Radial gradient background - similar to WelcomePage */}
                  <div className="absolute inset-0 w-full h-full bg-white"></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-radial from-brand-pink/50 via-brand-pink/20 to-transparent"></div>
                  
                  {/* Quote Box - extends off bottom with thin pink border, no bottom border */}
                  <div className="absolute left-6 right-6 bg-white rounded-t-lg shadow-xl p-6 flex flex-col justify-center" style={{ bottom: '0px', height: '60%', borderTop: '0.5px solid rgb(236, 72, 153)', borderLeft: '0.5px solid rgb(236, 72, 153)', borderRight: '0.5px solid rgb(236, 72, 153)' }}>
                    <div className="flex-1 flex items-center justify-center pt-12">
                      <p className="text-2xl font-bold text-slate-800 leading-tight text-center" style={{ textWrap: 'balance' }}>
                        "{quote}"
                      </p>
                    </div>
                    {/* Logo and Site URL - tighter spacing */}
                    <div className="flex flex-col items-center mt-4">
                      <div className="mb-0.5">
                        {/* Simple image for logo */}
                        <img 
                          src="/AICEO-Logo-Dark.svg" 
                          alt="AI CEO" 
                          className="h-8 w-auto" 
                        />
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        replaceyourboss.ai
                      </p>
                    </div>
                  </div>

                  {/* CEO Image positioned to align bottom with top of quote box */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-[55%] h-[35%] z-10" style={{ bottom: '60%' }}>
                    <img 
                      src={ceoPersonality.photo} 
                      alt={ceoPersonality.name}
                      className="w-full h-full object-cover object-top rounded-lg"
                      crossOrigin="anonymous"
                    />
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
