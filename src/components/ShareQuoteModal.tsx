import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShareIcon, PhotoIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

interface ShareQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  name: string;
  attribution: string;
  accentColor: string;
  onEdit: (fields: { quote: string; name: string; attribution: string }) => void;
}

const CEO_IMAGES = [
  { id: 'ceo-1', name: 'CEO Portrait 1', url: '/ai-ceo/ceo/ceo-1.jpg' },
  { id: 'ceo-2', name: 'CEO Portrait 2', url: '/ai-ceo/ceo/ceo-2.jpg' },
  { id: 'ceo-3', name: 'CEO Portrait 3', url: '/ai-ceo/ceo/ceo-3.jpg' }
];

const GRADIENT_STYLES = [
  { id: 'purple', name: 'Purple Gradient', gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(79, 70, 229, 0.9) 100%)' },
  { id: 'blue', name: 'Blue Gradient', gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%)' },
  { id: 'pink', name: 'Pink Gradient', gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(219, 39, 119, 0.9) 100%)' },
  { id: 'green', name: 'Green Gradient', gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)' },
  { id: 'solid', name: 'Solid Black', gradient: 'rgba(0, 0, 0, 0.85)' }
];

export default function ShareQuoteModal({ isOpen, onClose, quote, name, attribution, accentColor, onEdit }: ShareQuoteModalProps) {
  const [selectedImage, setSelectedImage] = useState(CEO_IMAGES[0]);
  const [selectedGradient, setSelectedGradient] = useState(GRADIENT_STYLES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [editQuote, setEditQuote] = useState(quote);
  const [editName, setEditName] = useState(name);
  const [editAttribution, setEditAttribution] = useState(attribution);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setGeneratedImageUrl(null);
      setCustomImage(null);
      setSelectedImage(CEO_IMAGES[0]);
      setSelectedGradient(GRADIENT_STYLES[0]);
      setEditQuote(quote);
      setEditName(name);
      setEditAttribution(attribution);
    }
  }, [isOpen, quote, name, attribution]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomImage(e.target?.result as string);
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
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setGeneratedImageUrl(dataUrl);
    } catch (error) {
      console.error('Error generating image:', error);
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
          text: `"${quote}" - ${editName}${editAttribution ? ', ' + editAttribution : ''}`,
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

  const handleSave = () => {
    onEdit({ quote: editQuote, name: editName, attribution: editAttribution });
    onClose();
  };

  const handleShare = () => {
    const shareText = `"${editQuote}" - ${editName}${editAttribution ? ', ' + editAttribution : ''}`;
    if (navigator.share) {
      navigator.share({ text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Quote copied to clipboard!');
    }
    handleSave();
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
            className="bg-gray-900 border border-purple-500/30 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
              <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                Share Quote
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-6">
              {/* Left side - Preview */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white font-['Space_Grotesk']">Preview</h3>
                
                {/* Canvas for image generation */}
                <div 
                  ref={canvasRef}
                  className="w-full aspect-[4/5] relative overflow-hidden rounded-lg shadow-2xl"
                  style={{
                    backgroundImage: `url(${customImage || selectedImage.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Quote overlay */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-8 text-white"
                    style={{ background: selectedGradient.gradient }}
                  >
                    <div className="space-y-4">
                      <blockquote className="text-xl lg:text-2xl font-semibold font-['Space_Grotesk'] leading-relaxed">
                        "{editQuote}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold font-['Space_Grotesk']">
                            {editName}
                          </div>
                          <div className="text-sm opacity-90 font-['Space_Grotesk']">
                            {editAttribution}
                          </div>
                        </div>
                        <div className="text-sm opacity-75 font-['Space_Grotesk']">
                          aiceo.ai
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={generateImage}
                    disabled={isGenerating}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-800 disabled:to-pink-800 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition-all font-['Space_Grotesk'] font-semibold text-white flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <PhotoIcon className="w-5 h-5" />
                        Generate Image
                      </>
                    )}
                  </button>

                  {generatedImageUrl && (
                    <>
                      <button
                        onClick={shareImage}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all font-['Space_Grotesk'] font-semibold text-white flex items-center gap-2"
                      >
                        <ShareIcon className="w-5 h-5" />
                        Share
                      </button>
                      <button
                        onClick={downloadImage}
                        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-all font-['Space_Grotesk'] font-semibold text-white flex items-center gap-2"
                      >
                        <CloudArrowDownIcon className="w-5 h-5" />
                        Download
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Right side - Customization */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white font-['Space_Grotesk']">Customize</h3>

                {/* Editable quote input */}
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Edit Quote
                  </label>
                  <textarea
                    value={editQuote}
                    onChange={e => setEditQuote(e.target.value)}
                    rows={2}
                    className="w-full bg-gray-800/50 border border-purple-500/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-['Space_Grotesk'] placeholder-gray-400 text-white resize-none mb-4"
                  />
                </div>

                {/* Image Selection */}
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-3">
                    Choose CEO Image
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {CEO_IMAGES.map((image) => (
                      <button
                        key={image.id}
                        onClick={() => {
                          setSelectedImage(image);
                          setCustomImage(null);
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage.id === image.id && !customImage
                            ? 'border-purple-400 ring-2 ring-purple-400/50'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Custom image upload */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full border-2 border-dashed border-gray-600 hover:border-purple-400 rounded-lg p-4 text-center transition-all ${
                        customImage ? 'border-purple-400 bg-purple-400/10' : ''
                      }`}
                    >
                      <div className="text-purple-300 font-['Space_Grotesk']">
                        {customImage ? '✓ Custom image uploaded' : '+ Upload your own image'}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Gradient Selection */}
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-3">
                    Quote Background Style
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {GRADIENT_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedGradient(style)}
                        className={`w-8 h-8 rounded border transition-all ${
                          selectedGradient.id === style.id
                            ? 'border-purple-400 ring-2 ring-purple-400/50'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        style={{ background: style.gradient }}
                        aria-label={style.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Editable fields for quote, name, and attribution */}
            <div className="p-6 border-t border-purple-500/20">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Edit Quote
                  </label>
                  <textarea
                    value={editQuote}
                    onChange={e => setEditQuote(e.target.value)}
                    rows={2}
                    className="w-full bg-gray-800/50 border border-purple-500/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-['Space_Grotesk'] placeholder-gray-400 text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Edit Name
                  </label>
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full bg-gray-800/50 border border-purple-500/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-['Space_Grotesk'] placeholder-gray-400 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Edit Attribution
                  </label>
                  <input
                    value={editAttribution}
                    onChange={e => setEditAttribution(e.target.value)}
                    className="w-full bg-gray-800/50 border border-purple-500/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-['Space_Grotesk'] placeholder-gray-400 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Save and Cancel buttons */}
            <div className="flex justify-end p-6 border-t border-purple-500/20">
              <button
                onClick={handleShare}
                className="rounded px-4 py-2 font-semibold text-white"
                style={{ background: accentColor }}
              >
                Save & Share
              </button>
              <button
                onClick={onClose}
                className="rounded px-4 py-2 font-semibold text-gray-300 bg-gray-800 border border-gray-700"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
