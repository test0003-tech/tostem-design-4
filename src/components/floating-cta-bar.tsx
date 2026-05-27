'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

function navigateTo(slug: string) {
  if (slug === 'home') {
    window.location.hash = '';
  } else {
    window.location.hash = `/${slug}`;
  }
}

export default function FloatingCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const footerRef = useState<HTMLElement | null>(null)[0];

  useEffect(() => {
    // Find hero section and footer
    const hero = document.querySelector('section') as HTMLElement | null;
    const footer = document.querySelector('footer') as HTMLElement | null;
    heroRef.current = hero;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show bar when hero is NOT intersecting (scrolled past)
          if (entry.target === heroRef.current) {
            setIsVisible(!entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Hide bar when footer is visible
          if (entry.isIntersecting) {
            setIsVisible(false);
          } else if (heroRef.current) {
            // Re-check hero visibility
            const heroRect = heroRef.current.getBoundingClientRect();
            setIsVisible(heroRect.bottom < 0);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (hero) observer.observe(hero);
    if (footer) footerObserver.observe(footer);

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          <div className="bg-tostem-dark/95 backdrop-blur-md border-t border-white/10 h-14 flex items-center justify-between px-4 gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Button
                size="sm"
                className="bg-tostem-blue hover:bg-tostem-blue-light text-white text-xs px-4 h-9 whitespace-nowrap"
                onClick={() => navigateTo('contact')}
              >
                Get Free Quotation
              </Button>
              <Button
                size="sm"
                className="bg-tostem-blue hover:bg-tostem-blue-light text-white text-xs px-4 h-9 whitespace-nowrap"
                onClick={() => navigateTo('contact')}
              >
                Contact Us
              </Button>
            </div>
            <a
              href="tel:18002667500"
              className="flex items-center gap-1.5 text-white text-xs font-medium whitespace-nowrap hover:text-tostem-blue transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">1800-266-7500</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
