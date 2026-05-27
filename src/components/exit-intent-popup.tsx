'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const STORAGE_KEY = 'tostem-exit-intent-dismissed';
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasShown = useRef(false);

  // Check if popup was recently dismissed
  const isRecentlyDismissed = useCallback(() => {
    try {
      const dismissedAt = localStorage.getItem(STORAGE_KEY);
      if (!dismissedAt) return false;
      return Date.now() - parseInt(dismissedAt, 10) < COOLDOWN_MS;
    } catch {
      return false;
    }
  }, []);

  // Dismiss popup and store timestamp
  const dismissPopup = useCallback(() => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Exit intent detection (desktop)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isRecentlyDismissed()) return;

    // Desktop: detect mouse leaving viewport at top
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown.current) return;
      if (e.clientY <= 0 && !isMobile) {
        hasShown.current = true;
        // Small delay to not trigger too aggressively
        setTimeout(() => {
          if (!isRecentlyDismissed()) {
            setIsVisible(true);
          }
        }, 300);
      }
    };

    // Mobile: show after 30 seconds of inactivity
    let inactivityTimer: ReturnType<typeof setTimeout>;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      if (hasShown.current || isMobile === false) return;
      inactivityTimer = setTimeout(() => {
        if (!hasShown.current && !isRecentlyDismissed()) {
          hasShown.current = true;
          setIsVisible(true);
        }
      }, 30000); // 30 seconds
    };

    // Only set up desktop listener
    document.addEventListener('mouseleave', handleMouseLeave);

    // Set up mobile inactivity timer
    if (isMobile) {
      resetInactivityTimer();
      const events = ['touchstart', 'touchmove', 'scroll', 'click'];
      events.forEach((event) => {
        document.addEventListener(event, resetInactivityTimer, { passive: true });
      });
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(inactivityTimer);
      if (isMobile) {
        const events = ['touchstart', 'touchmove', 'scroll', 'click'];
        events.forEach((event) => {
          document.removeEventListener(event, resetInactivityTimer);
        });
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile, isRecentlyDismissed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Store lead data
    try {
      const leads = JSON.parse(localStorage.getItem('tostem-exit-leads') || '[]');
      leads.unshift({
        name: name.trim(),
        phone: phone.trim(),
        source: 'exit-intent',
        timestamp: Date.now(),
      });
      localStorage.setItem('tostem-exit-leads', JSON.stringify(leads.slice(0, 50)));
    } catch {
      // Ignore storage errors
    }

    setSubmitted(true);

    // Auto close after 3 seconds
    setTimeout(() => {
      dismissPopup();
    }, 3000);
  };

  const handleBackdropClick = () => {
    dismissPopup();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-[#111] rounded-2xl max-w-md w-full relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={dismissPopup}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
              aria-label="Close popup"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Header gradient */}
            <div className="bg-gradient-to-br from-tostem-blue to-tostem-blue-light p-6 pb-8 text-white relative">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-black mb-1">Wait!</h2>
                <p className="text-white/80 text-sm">Get a Free Consultation</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-tostem-dark dark:text-white mb-1">Thank You!</h3>
                  <p className="text-sm text-tostem-text-light dark:text-gray-400">
                    We&apos;ll reach out to you shortly with your free consultation details.
                  </p>
                </motion.div>
              ) : (
                <>
                  <p className="text-sm text-tostem-text-light dark:text-gray-400 mb-5 leading-relaxed">
                    Our experts will help you find the perfect windows and doors for your project. No obligation, completely free.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tostem-text-muted" />
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 bg-tostem-light-gray dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700 focus:border-tostem-blue"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tostem-text-muted" />
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 bg-tostem-light-gray dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700 focus:border-tostem-blue"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-tostem-blue hover:bg-tostem-blue-light text-white py-3 shadow-lg shadow-tostem-blue/20"
                    >
                      Get Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>

                  <p className="text-[10px] text-tostem-text-muted text-center mt-3">
                    By submitting, you agree to receive communications from Tostem India. No spam, ever.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
