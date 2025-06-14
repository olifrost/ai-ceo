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
        width: 400,
        height: 500,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true, // Enable logging for troubleshooting
        onclone: (clonedDoc) => {
          // Ensure the cloned document maintains the correct proportions
          const canvasElement = clonedDoc.getElementById('quote-canvas');
          if (canvasElement) {
            canvasElement.style.width = '400px';
            canvasElement.style.height = '500px';
          }
        }
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
          text: `"${quote}" - ${ceoPersonality.name} | AI-generated CEO wisdom at replaceyourboss.ai`,
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
            className="bg-white border border-slate-200 rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button positioned in the corner without the title bar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10 bg-white/80 p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="p-6">
              {/* Preview */}
              <div className="mb-6">
                <div id="quote-canvas" ref={canvasRef} className="relative w-[400px] h-[500px] mx-auto shadow-xl rounded-lg border border-slate-200">
                  
                  {/* Radial gradient background - similar to WelcomePage */}
                  <div className="absolute inset-0 w-full h-full bg-white"></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-radial from-brand-pink/50 via-brand-pink/20 to-transparent"></div>
                  
                  {/* Quote Box - extends off bottom with thin pink border, no bottom border - reduced height to 55% */}
                  <div className="absolute left-6 right-6 bg-white rounded-t-lg shadow-xl p-6 flex flex-col justify-between" style={{ bottom: '0px', height: '55%', borderTop: '0.5px solid rgb(236, 72, 153)', borderLeft: '0.5px solid rgb(236, 72, 153)', borderRight: '0.5px solid rgb(236, 72, 153)' }}>
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1" /> {/* Spacer above quote */}
                      <div className="flex items-center justify-center">
                        <p className="text-2xl font-bold text-slate-800 leading-tight text-center" style={{ textWrap: 'balance' }}>
                          "{quote}"
                        </p>
                      </div>
                      <div className="flex-1" /> {/* Spacer below quote */}
                    </div>
                    {/* Logo and Site URL - tighter spacing */}
                    <div className="flex flex-col items-center mt-4">
                      <div className="mb-0.5">
                        {/* Using a brand-colored SVG logo */}
                        <svg 
                          className="h-5 w-auto" 
                          viewBox="0 0 2780.72 560.28" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M338.34,550.97l-38.02-138.13h-160.63l-37.25,138.13H0L152.1,9.31h141.23l152.87,541.65h-107.87ZM223.49,109.42h-6.21l-59.75,221.16h125.71l-59.75-221.16Z"
                            fill="#EC4899" // brand-pink Tailwind color
                          />
                          <path 
                            d="M578.27,550.97v-76.05h121.83V85.36h-121.83V9.31h344.55v76.05h-121.83v389.56h121.83v76.05h-344.55Z"
                            fill="#EC4899"
                          />
                          <path 
                            d="M1478.13,560.28c-70.88,0-123.26-24.31-157.14-72.94-33.89-48.62-50.83-117.69-50.83-207.19s16.94-157.92,50.83-206.81C1354.87,24.44,1407.25,0,1478.13,0c26.89,0,50.56,3.59,71.01,10.77,20.43,7.18,38.15,17.04,53.16,29.6,15,12.56,27.41,27.72,37.25,45.49,9.82,17.78,17.58,37.27,23.28,58.48l-93.12,26.38c-3.63-12.42-7.76-24.06-12.42-34.92-4.66-10.86-10.48-20.3-17.46-28.32-6.98-8.01-15.65-14.22-26-18.62-10.36-4.39-22.77-6.6-37.25-6.6-35.19,0-60.41,13.51-75.66,40.51-15.27,27.01-22.89,63.89-22.89,110.63v93.48c0,46.76,7.63,83.63,22.89,110.63,15.25,27.01,40.47,40.51,75.66,40.51,14.48,0,26.89-2.19,37.25-6.6,10.34-4.39,19.01-10.6,26-18.62,6.98-8.01,12.8-17.46,17.46-28.32,4.65-10.86,8.79-22.5,12.42-34.92l93.12,26.38c-5.7,21.22-13.46,40.7-23.28,58.48-9.83,17.78-22.25,32.94-37.25,45.51-15.01,12.56-32.73,22.42-53.16,29.6-20.44,7.17-44.11,10.75-71.01,10.75Z"
                            fill="#EC4899"
                          />
                          <path 
                            d="M1845.79,550.97V9.31h342.22v83.81h-240.56v141.23h232.03v83.81h-232.03v148.99h240.56v83.81h-342.22Z"
                            fill="#EC4899"
                          />
                          <path 
                            d="M2575.85,560.28c-35.19,0-65.71-6.34-91.57-19.01-25.87-12.67-47.21-30.91-64.02-54.71-16.82-23.79-29.23-53.02-37.25-87.69-8.03-34.65-12.03-74.23-12.03-118.73s4-83.42,12.03-118.34c8.01-34.92,20.43-64.28,37.25-88.08,16.81-23.79,38.15-42.02,64.02-54.71,25.86-12.67,56.38-19.01,91.57-19.01,70.35,0,122.09,24.58,155.2,73.72,33.1,49.16,49.67,117.95,49.67,206.42s-16.56,157.27-49.67,206.42c-33.11,49.15-84.85,73.72-155.2,73.72ZM2575.85,478.02c18.1,0,33.37-3.5,45.79-10.51,12.41-7.01,22.37-17.01,29.88-30,7.49-12.97,12.92-28.94,16.3-47.91,3.36-18.96,5.04-40.12,5.04-63.5v-92.71c0-46.74-7.12-83.62-21.34-110.63-14.24-27-39.46-40.51-75.66-40.51s-61.44,13.51-75.66,40.51c-14.24,27.01-21.34,63.89-21.34,110.63v93.48c0,46.76,7.11,83.63,21.34,110.63,14.22,27.01,39.44,40.51,75.66,40.51Z"
                            fill="#EC4899"
                          />
                          <path 
                            d="M1182.16,280.14l-44.24,11.66c-26.71,7.04-47.57,27.9-54.61,54.61l-11.66,44.24-11.66-44.24c-7.04-26.71-27.9-47.57-54.61-54.61l-44.24-11.66,44.24-11.66c26.71-7.04,47.57-27.9,54.61-54.61l11.66-44.24,11.66,44.24c7.04,26.71,27.9,47.57,54.61,54.61l44.24,11.66Z"
                            fill="#EC4899"
                          />
                        </svg>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        replaceyourboss.ai
                      </p>
                    </div>
                  </div>

                  {/* CEO Image positioned to align bottom with top of quote box - adjusted for new quote box height */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-[55%] z-10" style={{ bottom: '55%', paddingBottom: '55%' }}>
                    <div className="absolute inset-0">
                      <img 
                        src={ceoPersonality.photo} 
                        alt={ceoPersonality.name}
                        className="w-full h-full object-cover object-center rounded-lg"
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-3">
                {generatedImageUrl ? (
                  <>
                    <button
                      onClick={downloadImage}
                      className="flex items-center gap-2 px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      Download
                    </button>
                    <button
                      onClick={async () => {
                        if (generatedImageUrl) {
                          // Try to share image if possible
                          try {
                            // Convert data URL to blob
                            const response = await fetch(generatedImageUrl);
                            const blob = await response.blob();
                            const file = new File([blob], 'ai-ceo-quote.png', { type: 'image/png' });
                            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                              await navigator.share({
                                title: 'Replace Your Boss',
                                text: `I'm replacing my boss before they replace me at https://replaceyourboss.ai`,
                                files: [file]
                              });
                              return;
                            }
                          } catch (err) {
                            // fallback to text share below
                          }
                        }
                        // Fallback: share text or copy
                        const shareText = `I'm replacing my boss before they replace me at https://replaceyourboss.ai`;
                        if (navigator.share) {
                          try {
                            await navigator.share({
                              title: 'Replace Your Boss',
                              text: shareText,
                              url: 'https://replaceyourboss.ai'
                            });
                          } catch (err) {
                            // user cancelled or error
                          }
                        } else {
                          try {
                            await navigator.clipboard.writeText(shareText);
                            toast.success('Copied to clipboard!');
                          } catch {
                            toast.error('Failed to copy');
                          }
                        }
                      }}
                      className="flex items-center gap-2 px-6 py-2 bg-brand-pink hover:bg-pink-600 text-white font-medium rounded-lg transition-colors"
                    >
                      <ShareIcon className="w-5 h-5" />
                      Share
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-2 px-6 py-2 bg-slate-200 text-slate-400 font-medium rounded-lg transition-colors cursor-not-allowed"
                  >
                    <ShareIcon className="w-5 h-5" />
                    Generating...
                  </button>
                )}
              </div>

              {/* Success message removed */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
