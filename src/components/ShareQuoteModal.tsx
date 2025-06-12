import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon, ArrowDownTrayIcon, ShareIcon, PhotoIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';
import { addVotes } from '../services/voteLimit';

interface ShareQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  name: string; // Initial name for the quote, e.g., AI model name
  attribution: string; // Initial attribution, e.g., AI model details
  accentColor: string;
}

interface CEOImage {
  id: string;
  name: string; // Name for the selector UI
  url: string;
  defaultQuoteName: string; // Name to display on the image quote
  defaultAttribution: string; // Attribution to display on the image quote
}

const CEO_IMAGES: CEOImage[] = [
  { id: 'aiceo-man', name: 'AI CEO Man', url: '/ai-ceo/AICEO-MAN.png', defaultQuoteName: 'AI CEO', defaultAttribution: 'AI CEO' },
  { id: 'ceo-1', name: 'CEO Portrait 1', url: '/ai-ceo/ceo/ceo-1.jpg', defaultQuoteName: 'Executive Leader', defaultAttribution: 'AI CEO' },
  { id: 'ceo-2', name: 'CEO Portrait 2', url: '/ai-ceo/ceo/ceo-2.jpg', defaultQuoteName: 'Business Visionary', defaultAttribution: 'AI CEO' },
  { id: 'ceo-3', name: 'CEO Portrait 3', url: '/ai-ceo/ceo/ceo-3.jpg', defaultQuoteName: 'Innovation Chief', defaultAttribution: 'AI CEO' }
];

const GRADIENT_STYLES = [
  { id: 'pink', name: 'Pink Gradient', gradient: 'linear-gradient(135deg, rgba(241, 79, 255, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)' }, // Brand pink
  { id: 'purple', name: 'Purple Gradient', gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(79, 70, 229, 0.9) 100%)' },
  { id: 'blue', name: 'Blue Gradient', gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%)' },
  { id: 'green', name: 'Green Gradient', gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)' },
  { id: 'solid', name: 'Solid Black', gradient: 'rgba(0, 0, 0, 0.85)' }
];

export default function ShareQuoteModal({ isOpen, onClose, quote, name, attribution, accentColor }: ShareQuoteModalProps) {
  const [selectedImage, setSelectedImage] = useState<CEOImage>(CEO_IMAGES[0]);
  const [selectedGradient, setSelectedGradient] = useState(GRADIENT_STYLES[0]); // Default to brand pink
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New states for custom image manipulation
  const [customImageScale, setCustomImageScale] = useState(1);

  // New state for vote awarding
  const [hasAwardedVotesInSession, setHasAwardedVotesInSession] = useState(false);

  // Reset states when modal opens or initial props change
  useEffect(() => {
    if (isOpen) {
      setGeneratedImageUrl(null);
      setCustomImage(null);
      setSelectedImage(CEO_IMAGES[0]); // Default to AICEO-MAN
      setSelectedGradient(GRADIENT_STYLES[0]); // Default to brand pink
      
      // Reset image manipulation and vote status
      setCustomImageScale(1);
      setHasAwardedVotesInSession(false);
    }
  }, [isOpen, quote]);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomImage(e.target?.result as string);
        // Clear selected default image when custom is uploaded
        // setSelectedImage(null); // This might cause issues if selectedImage is expected.
                               // Instead, the customImage state takes precedence in rendering.
        // Reset manipulation controls for new custom image
        setCustomImageScale(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(canvasRef.current, {
        width: 800,
        height: 1000,
        scale: 2,
        backgroundColor: null, // Important for transparent background if gradient is CSS
        useCORS: true,
        allowTaint: true, // May be needed for external images if CORS is not fully permissive
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
          text: `"${quote}" - ${customImage ? "Your Name" : selectedImage.defaultQuoteName}${customImage ? ", AI CEO" : ", " + selectedImage.defaultAttribution}`,
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
            className="bg-white border border-slate-200 rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
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

            <div className="grid lg:grid-cols-2 gap-8 p-6">
              {/* Left side - Preview */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 font-['Space_Grotesk']">Preview</h3>
                
                <div ref={canvasRef} className="relative w-[400px] h-[500px] bg-white overflow-hidden mx-auto shadow-xl rounded-md border border-slate-200">
                  {/* Image Layer (Custom or Default) - Occupies the full space */}
                  {/* Ensure this parent div for the image has overflow:hidden if not already on canvasRef and image is larger */} 
                  <div className="absolute inset-0 w-full h-full overflow-hidden"> 
                      {customImage ? (
                          <img
                              src={customImage}
                              alt="Custom Upload"
                              style={{
                                  position: 'absolute', 
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  transform: `scale(${customImageScale})`, // Simplified transform
                                  transformOrigin: 'center center',
                              }}
                              crossOrigin="anonymous"
                          />
                      ) : (
                          selectedImage && <img src={selectedImage.url} alt={selectedImage.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                      )}
                  </div>

                  {/* Quote Box at the bottom */}
                  <div
                      className="absolute bottom-0 left-0 right-0 h-[35%] p-6 flex flex-col justify-center items-start text-left"
                      style={{ background: selectedGradient.gradient }}
                  >
                      <p className="text-xl lg:text-2xl font-bold text-white font-['Space_Grotesk'] leading-tight shadow-lg mb-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
                          "{quote}"
                      </p>
                      <div className="w-full">
                          <p className="text-md font-semibold text-white font-['Space_Grotesk'] shadow-md" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                              - {customImage ? "Your Name" : selectedImage.defaultQuoteName}
                          </p>
                          <p className="text-xs text-gray-200 font-['Space_Grotesk'] shadow-md" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                              {customImage ? "AI CEO" : selectedImage.defaultAttribution}
                          </p>
                      </div>
                      <p className="absolute bottom-2 right-3 text-xs text-white/70 font-['Space_Grotesk']" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.4)' }}>
                        ai.ceo
                      </p>
                  </div>
                </div>

                {/* Action buttons below preview */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={generateImage}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-brand-pink hover:bg-brand-pink/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Image'
                    )}
                  </button>
                </div>
                 {/* Custom Image Manipulation Controls - MOVED HERE */}
                 {customImage && (
                    <div className="space-y-3 p-3 mt-4 bg-slate-50 rounded-md border border-slate-200">
                      <h4 className="text-md font-semibold text-slate-700 font-['Space_Grotesk'] text-center">Adjust Custom Image</h4>
                      <div>
                        <label htmlFor="customImageScale" className="block text-xs font-medium text-slate-500">Scale: {customImageScale.toFixed(2)}x</label>
                        <input
                          type="range"
                          id="customImageScale"
                          min="0.5"
                          max="3"
                          step="0.01"
                          value={customImageScale}
                          onChange={(e) => setCustomImageScale(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                          style={{ accentColor: accentColor }}
                        />
                      </div>
                       <button 
                        onClick={() => { setCustomImageScale(1); }} // Simplified reset
                        className="text-xs hover:underline w-full text-center mt-2"
                        style={{ color: accentColor }}
                      >
                        Reset Adjustments
                      </button>
                    </div>
                  )}
              </div>

              {/* Right side - CEO Selection */}
              <div className="space-y-8">
                {/* CEO Selector */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 font-['Space_Grotesk'] mb-3">CEO Selector</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-3">Choose Your CEO</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {CEO_IMAGES.map((img) => (
                        <button
                          key={img.id}
                          onClick={() => { setSelectedImage(img); setCustomImage(null); }}
                          className={`relative group rounded-full overflow-hidden border-4 transition-all duration-200 ${
                            selectedImage?.id === img.id && !customImage 
                              ? 'border-brand-pink shadow-lg' 
                              : 'border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          <img 
                            src={img.url} 
                            alt={img.name} 
                            className="w-16 h-16 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-full" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Image Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Or Upload Your Own</label>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 bg-brand-pink/10 hover:bg-brand-pink/20 text-brand-pink font-medium py-2 px-4 rounded-lg border border-brand-pink/20 transition-colors"
                    >
                      <PhotoIcon className="w-5 h-5" /> Upload Image
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* Gradient Selector */}
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1 mt-4">Background Style</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {GRADIENT_STYLES.map((grad) => (
                        <button
                          key={grad.id}
                          onClick={() => setSelectedGradient(grad)}
                          className={`h-12 w-full rounded-lg border-3 transition-all duration-200 ${
                            selectedGradient.id === grad.id 
                              ? 'border-brand-pink shadow-lg' 
                              : 'border-slate-300 hover:border-slate-400'
                          }`}
                          style={{ background: grad.gradient }}
                          title={grad.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success message for generated image */}
            {generatedImageUrl && (
              <div className="p-6 border-t border-slate-200 bg-green-50">
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="font-medium">Image generated successfully! You can download or share it.</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm font-medium transition-colors"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" /> Download
                  </button>
                  {typeof navigator.share === 'function' && (
                    <button
                      onClick={shareImage}
                      className="flex items-center gap-2 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm font-medium transition-colors"
                    >
                      <ShareIcon className="w-4 h-4" /> Share
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
