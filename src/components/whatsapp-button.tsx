'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '919876543210';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'm interested in Tostem windows and doors. Please share more details."
);

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Delay appearance by 3 seconds with bounce animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-20 left-4 sm:bottom-24 sm:left-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-full bottom-1 ml-3 whitespace-nowrap bg-white text-tostem-dark text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-gray-100 pointer-events-none"
              >
                Chat with us on WhatsApp
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2,
              repeat: 3,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
            aria-label="Chat with us on WhatsApp"
          >
            {/* Pulse ring on hover */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
