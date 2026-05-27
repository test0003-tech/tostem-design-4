'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Search, Moon, Sun, Home, Phone, ArrowUp, MessageCircle, X } from 'lucide-react';

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ['?'], description: 'Show keyboard shortcuts', icon: null },
    { keys: ['/'], description: 'Focus search', icon: Search },
    { keys: ['D'], description: 'Toggle dark mode', icon: Moon },
    { keys: ['H'], description: 'Go to homepage', icon: Home },
    { keys: ['C'], description: 'Go to contact page', icon: Phone },
    { keys: ['T'], description: 'Scroll to top', icon: ArrowUp },
    { keys: ['Esc'], description: 'Close this dialog', icon: X },
  ];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

    if (e.key === '?' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
    // Quick shortcuts
    if (e.key === '/' && !isOpen) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('tostem:open-search'));
    }
    if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !isOpen) {
      const html = document.documentElement;
      html.classList.contains('dark') ? html.classList.remove('dark') : html.classList.add('dark');
    }
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !isOpen) {
      window.location.hash = '';
    }
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !isOpen) {
      window.location.hash = '#/contact';
    }
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl border-gray-200 dark:border-white/10">
        <DialogTitle className="text-lg font-bold text-tostem-dark dark:text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-tostem-blue/10 flex items-center justify-center">
            <kbd className="text-tostem-blue text-xs font-mono">⌨</kbd>
          </span>
          Keyboard Shortcuts
        </DialogTitle>
        <div className="mt-4 space-y-1">
          {shortcuts.map((shortcut) => (
            <motion.div
              key={shortcut.keys[0]}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-tostem-light-gray dark:hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {shortcut.icon && (
                  <shortcut.icon className="w-4 h-4 text-tostem-text-light dark:text-gray-400 group-hover:text-tostem-blue transition-colors" />
                )}
                <span className="text-sm text-tostem-dark dark:text-gray-300">{shortcut.description}</span>
              </div>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-xs font-mono text-tostem-dark dark:text-gray-300 shadow-sm"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-tostem-text-muted dark:text-gray-500 mt-4 text-center">
          Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-[10px] font-mono">?</kbd> anytime to toggle this panel
        </p>
      </DialogContent>
    </Dialog>
  );
}
