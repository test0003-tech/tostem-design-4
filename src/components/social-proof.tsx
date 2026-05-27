'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const socialProofMessages = [
  {
    name: 'Priya',
    city: 'Mumbai',
    action: 'just requested a quotation for Aluminium Windows',
    avatar: 'P',
  },
  {
    name: 'Rahul',
    city: 'Delhi',
    action: 'downloaded the E-Catalogue',
    avatar: 'R',
  },
  {
    name: 'Ananya',
    city: 'Bangalore',
    action: 'enquired about Tostem ATIS Series doors',
    avatar: 'A',
  },
  {
    name: 'Vikram',
    city: 'Hyderabad',
    action: 'requested a free consultation',
    avatar: 'V',
  },
  {
    name: 'Meera',
    city: 'Chennai',
    action: 'just ordered GIESTA entrance doors',
    avatar: 'M',
  },
  {
    name: 'Suresh',
    city: 'Pune',
    action: 'booked a studio visit for window selection',
    avatar: 'S',
  },
];

export default function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('tostem-social-proof-dismissed');
    }
    return false;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // Show first notification after 10 seconds
  useEffect(() => {
    if (dismissed) return;

    const initialTimer = setTimeout(() => {
      setVisible(true);
      setShowNotification(true);
    }, 10000);

    return () => clearTimeout(initialTimer);
  }, [dismissed]);

  // Rotate through messages every 8 seconds
  useEffect(() => {
    if (!visible || dismissed) return;

    const rotationTimer = setInterval(() => {
      setShowNotification(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % socialProofMessages.length);
        setShowNotification(true);
      }, 500);
    }, 8000);

    return () => clearInterval(rotationTimer);
  }, [visible, dismissed]);

  // Hide notification after 4 seconds (show for 4, pause for 4)
  useEffect(() => {
    if (!showNotification || dismissed) return;

    const hideTimer = setTimeout(() => {
      setShowNotification(false);
    }, 4000);

    return () => clearTimeout(hideTimer);
  }, [showNotification, dismissed, currentIndex]);

  const handleDismiss = useCallback(() => {
    setShowNotification(false);
    setDismissed(true);
    localStorage.setItem('tostem-social-proof-dismissed', 'true');
  }, []);

  if (dismissed) return null;

  const msg = socialProofMessages[currentIndex];

  return (
    <div className="fixed bottom-36 md:bottom-40 left-4 md:left-6 z-[39] max-w-xs">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: -40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40, y: 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white dark:bg-[#1a1a1a] shadow-lg rounded-lg p-3 border border-gray-100 dark:border-gray-700 relative"
          >
            <button
              onClick={handleDismiss}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3 h-3 text-gray-500 dark:text-gray-300" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-tostem-blue/10 flex items-center justify-center flex-shrink-0">
                <span className="text-tostem-blue font-bold text-xs">{msg.avatar}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-tostem-dark dark:text-gray-200 leading-relaxed">
                  <span className="font-semibold">{msg.name}</span>
                  <span className="text-tostem-text-muted dark:text-gray-400"> from </span>
                  <span className="font-semibold">{msg.city}</span>
                  <span className="text-tostem-text-muted dark:text-gray-400"> {msg.action}</span>
                </p>
                <p className="text-[10px] text-tostem-text-muted dark:text-gray-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Recently
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
