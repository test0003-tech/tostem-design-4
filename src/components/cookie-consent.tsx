'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COOKIE_CONSENT_KEY = 'tostem_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't appear instantly on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleCookieSettings = () => {
    // For now, just accept with minimal cookies
    localStorage.setItem(COOKIE_CONSENT_KEY, 'minimal');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-[1200px] mx-auto bg-white border border-gray-200 rounded-lg shadow-xl px-6 py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Icon + Text */}
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-6 h-6 text-tostem-blue flex-shrink-0 mt-0.5" />
                <p className="text-sm text-tostem-text-light leading-relaxed">
                  We use cookies on our website to give you the most relevant
                  experience by remembering your preferences and repeat visits.
                  By clicking &quot;Accept&quot;, you consent to the use of ALL
                  the cookies.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto flex-shrink-0">
                <Button
                  variant="ghost"
                  className="text-sm text-tostem-text-light hover:text-tostem-dark whitespace-nowrap"
                  onClick={handleCookieSettings}
                >
                  Cookie Settings
                </Button>
                <Button
                  className="bg-tostem-dark hover:bg-tostem-black text-white text-sm font-semibold tracking-wider px-8 whitespace-nowrap"
                  onClick={handleAccept}
                >
                  ACCEPT
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
