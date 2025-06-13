import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CannesPopupProps {
  onClose: () => void;
}

const CannesPopup: React.FC<CannesPopupProps> = ({ onClose }) => {
  const [visible, setVisible] = React.useState(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350); // Match animation duration
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full p-0 overflow-hidden border border-brand-pink/20 flex flex-col"
            style={{ minHeight: 520, boxShadow: '0 8px 48px 0 rgba(180, 70, 255, 0.18)' }}
          >
            <div className="relative w-full" style={{ flex: '0 0 45%', minHeight: 260, maxHeight: 340 }}>
              <img
                src="/AICEO-The-Boys.jpg"
                alt="Bosses at Cannes"
                className="w-full h-full object-cover object-top"
                style={{ height: '100%', minHeight: 260, maxHeight: 340, borderTopLeftRadius: '2.5rem', borderTopRightRadius: '2.5rem' }}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center px-8 py-10 md:py-14 text-center">
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight" style={{ letterSpacing: '-0.03em' }}>
                While they’re in Cannes...
              </h2>
              <p className="text-lg md:text-2xl text-slate-700 mb-10 max-w-xl mx-auto leading-relaxed">
                Trapped in the office while your bosses are busy “networking” on yachts? Is your agency adrift, powered only by espresso and existential dread? Don’t panic—AI CEO is here to steer the ship (and won’t expense a single mojito).
              </p>
              <button
                onClick={handleClose}
                className="px-10 py-4 bg-brand-pink hover:bg-brand-pink/90 text-white text-xl font-bold rounded-full shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-pink/40"
                style={{ minWidth: 180 }}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CannesPopup;
