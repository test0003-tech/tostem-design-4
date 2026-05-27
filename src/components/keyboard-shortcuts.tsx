'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Search, Moon, Home, MessageSquare, ArrowUp, X, Keyboard } from 'lucide-react';

interface ShortcutItem {
  key: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  const shortcuts: ShortcutItem[] = [
    {
      key: '/',
      label: 'Search',
      description: 'Focus the search bar',
      icon: <Search className="w-4 h-4" />,
      action: () => {
        // Dispatch custom event that header listens to
        window.dispatchEvent(new CustomEvent('tostem-open-search'));
      },
    },
    {
      key: 'd',
      label: 'Dark Mode',
      description: 'Toggle dark/light mode',
      icon: <Moon className="w-4 h-4" />,
      action: () => {
        // Dispatch custom event that theme toggle listens to
        window.dispatchEvent(new CustomEvent('tostem-toggle-theme'));
      },
    },
    {
      key: 'h',
      label: 'Home',
      description: 'Go to homepage',
      icon: <Home className="w-4 h-4" />,
      action: () => {
        window.location.hash = '';
      },
    },
    {
      key: 'c',
      label: 'Contact',
      description: 'Go to contact page',
      icon: <MessageSquare className="w-4 h-4" />,
      action: () => {
        window.location.hash = '/contact';
      },
    },
    {
      key: 't',
      label: 'Top',
      description: 'Scroll to top of page',
      icon: <ArrowUp className="w-4 h-4" />,
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      key: 'Esc',
      label: 'Close',
      description: 'Close this overlay',
      icon: <X className="w-4 h-4" />,
      action: () => {
        setOpen(false);
      },
    },
  ];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      // Only handle shortcuts when overlay is not open
      if (open) return;

      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        shortcuts[0].action();
      } else if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        shortcuts[1].action();
      } else if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        shortcuts[2].action();
      } else if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        shortcuts[3].action();
      } else if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        shortcuts[4].action();
      }
    },
    [open, shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-tostem-dark dark:text-white">
            <Keyboard className="w-5 h-5 text-tostem-blue" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription className="text-tostem-text-light">
            Use these shortcuts to navigate faster. Press <kbd className="px-1.5 py-0.5 bg-tostem-light-gray dark:bg-gray-700 rounded text-xs font-mono text-tostem-dark dark:text-gray-300">?</kbd> anytime to toggle this overlay.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 space-y-1">
          {shortcuts.map((shortcut) => (
            <motion.button
              key={shortcut.key}
              onClick={() => {
                shortcut.action();
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-tostem-light-gray dark:hover:bg-gray-800 transition-colors group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-tostem-blue/10 dark:bg-tostem-blue/20 flex items-center justify-center text-tostem-blue group-hover:bg-tostem-blue group-hover:text-white transition-colors">
                  {shortcut.icon}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-tostem-dark dark:text-gray-200">
                    {shortcut.label}
                  </div>
                  <div className="text-xs text-tostem-text-muted">
                    {shortcut.description}
                  </div>
                </div>
              </div>
              <kbd className="px-2.5 py-1 bg-tostem-light-gray dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-xs font-mono text-tostem-dark dark:text-gray-300 min-w-[2rem] text-center shadow-sm">
                {shortcut.key}
              </kbd>
            </motion.button>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-[11px] text-tostem-text-muted text-center">
            Shortcuts are disabled when typing in input fields
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
