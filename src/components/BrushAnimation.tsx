import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BrushAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[800px]"
            initial={{ y: '-100%', opacity: 0.3 }}
            animate={{ y: '100%', opacity: 0 }}
            transition={{ duration: 5, ease: 'easeInOut' }}
          >
            <svg
              viewBox="0 0 200 400"
              className="w-full h-full"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.15"
            >
              {/* Makeup Brush SVG */}
              <ellipse cx="100" cy="60" rx="30" ry="50" fill="white" fillOpacity="0.1" />
              <ellipse cx="100" cy="60" rx="25" ry="45" fill="white" fillOpacity="0.1" />
              <ellipse cx="100" cy="55" rx="20" ry="40" fill="white" fillOpacity="0.15" />
              
              {/* Bristles detail */}
              <path d="M80 20 Q100 5 120 20" strokeWidth="0.3" />
              <path d="M82 25 Q100 12 118 25" strokeWidth="0.3" />
              <path d="M84 30 Q100 18 116 30" strokeWidth="0.3" />
              <path d="M85 35 Q100 22 115 35" strokeWidth="0.3" />
              
              {/* Ferrule */}
              <rect x="88" y="105" width="24" height="25" rx="2" fill="white" fillOpacity="0.2" />
              <line x1="90" y1="110" x2="110" y2="110" strokeWidth="0.5" />
              <line x1="90" y1="115" x2="110" y2="115" strokeWidth="0.5" />
              <line x1="90" y1="120" x2="110" y2="120" strokeWidth="0.5" />
              
              {/* Handle */}
              <rect x="92" y="130" width="16" height="250" rx="3" fill="white" fillOpacity="0.1" />
              <line x1="100" y1="140" x2="100" y2="370" strokeWidth="0.3" strokeOpacity="0.3" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrushAnimation;
