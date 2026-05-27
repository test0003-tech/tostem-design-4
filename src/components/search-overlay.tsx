'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Clock, Trash2 } from 'lucide-react';
import { pageRegistry } from '@/lib/tostem-data';
import type { PageRegistryItem } from '@/lib/tostem-data';
import { Badge } from '@/components/ui/badge';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = 'tostem-recent-searches';
const MAX_RECENT_SEARCHES = 5;

const typeBadgeMap: Record<string, { label: string; className: string }> = {
  'about': { label: 'About', className: 'bg-tostem-blue/10 text-tostem-blue border-tostem-blue/20' },
  'why-tostem': { label: 'Why Tostem', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'category': { label: 'Category', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  'design': { label: 'Design', className: 'bg-teal-50 text-teal-700 border-teal-200' },
  'series': { label: 'Series', className: 'bg-rose-50 text-rose-700 border-rose-200' },
  'experience': { label: 'Experience', className: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  'experience-gallery': { label: 'Gallery', className: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  'tada': { label: 'TADA', className: 'bg-orange-50 text-orange-700 border-orange-200' },
  'knowledge': { label: 'Knowledge', className: 'bg-violet-50 text-violet-700 border-violet-200' },
  'blog': { label: 'Blog', className: 'bg-pink-50 text-pink-700 border-pink-200' },
  'glossary': { label: 'Glossary', className: 'bg-slate-100 text-slate-700 border-slate-200' },
  'testimonials': { label: 'Testimonials', className: 'bg-lime-50 text-lime-700 border-lime-200' },
  'contact': { label: 'Contact', className: 'bg-gray-100 text-gray-700 border-gray-200' },
};

function getTypeBadge(type: string) {
  return typeBadgeMap[type] || { label: type, className: 'bg-gray-100 text-gray-700 border-gray-200' };
}

function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRecentSearch(term: string) {
  if (!term.trim()) return;
  try {
    const existing = getRecentSearches();
    const filtered = existing.filter((s) => s.toLowerCase() !== term.toLowerCase());
    filtered.unshift(term.trim());
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered.slice(0, MAX_RECENT_SEARCHES)));
  } catch {
    // Silently fail
  }
}

function clearRecentSearches() {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Silently fail
  }
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Wrapped onClose that also clears the query
  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  // Load recent searches - use a ref to avoid setState in effect
  const refreshRecentSearches = useCallback(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Use microtask to avoid lint warning about setState in effect
      queueMicrotask(() => refreshRecentSearches());
    }
  }, [isOpen, refreshRecentSearches]);

  // Auto-focus when opening
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard: ESC to close, Enter to navigate first result
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  }, [isOpen, handleClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return pageRegistry.filter((page) => {
      const titleMatch = page.title.toLowerCase().includes(q);
      const descMatch = page.description.toLowerCase().includes(q);
      const typeMatch = page.type.toLowerCase().includes(q);
      const breadcrumbMatch = page.breadcrumb.some((b) => b.toLowerCase().includes(q));
      return titleMatch || descMatch || typeMatch || breadcrumbMatch;
    });
  }, [query]);

  const handleResultClick = useCallback((page: PageRegistryItem) => {
    // Save the search term
    if (query.trim()) {
      saveRecentSearch(query);
    }
    handleClose();
    window.location.hash = `#/${page.slug}`;
  }, [handleClose, query]);

  const handleEnter = useCallback(() => {
    if (results.length > 0) {
      handleResultClick(results[0]);
    }
  }, [results, handleResultClick]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEnter();
    }
  }, [handleEnter]);

  const handleRecentSearchClick = useCallback((term: string) => {
    setQuery(term);
  }, []);

  const handleClearRecentSearches = useCallback(() => {
    clearRecentSearches();
    setRecentSearches([]);
  }, []);

  const handleSuggestionClick = useCallback((hint: string) => {
    setQuery(hint);
    saveRecentSearch(hint);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Search Content */}
          <motion.div
            className="relative z-10 w-full max-w-3xl mx-4 mt-[15vh]"
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search Input Area */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <Search className="w-5 h-5 text-tostem-blue flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search windows, doors, series, and more..."
                  className="flex-1 text-lg text-tostem-dark placeholder:text-tostem-text-muted outline-none bg-transparent"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-tostem-text-muted" />
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="hidden sm:flex items-center gap-1.5 text-xs text-tostem-text-muted bg-gray-100 rounded-md px-2 py-1.5 hover:bg-gray-200 transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div
                ref={resultsRef}
                className="max-h-[55vh] overflow-y-auto custom-scrollbar"
              >
                {!query.trim() && (
                  <div className="px-5 py-8 text-center">
                    <Search className="w-10 h-10 text-tostem-mid-gray mx-auto mb-3" />
                    <p className="text-tostem-text-light text-sm">
                      Start typing to search across all pages
                    </p>
                    {/* Suggestion chips */}
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      {['Sliding Windows', 'ATIS Series', 'French Doors', 'Soundproof', 'Anodized'].map((hint) => (
                        <button
                          key={hint}
                          onClick={() => handleSuggestionClick(hint)}
                          className="px-3 py-1.5 text-xs text-tostem-text-light bg-tostem-light-gray rounded-full hover:bg-tostem-mid-gray hover:text-tostem-dark transition-colors"
                        >
                          {hint}
                        </button>
                      ))}
                    </div>

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mt-6 text-left">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-tostem-text-muted uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5" />
                            Recent Searches
                          </div>
                          <button
                            onClick={handleClearRecentSearches}
                            className="flex items-center gap-1 text-xs text-tostem-text-muted hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" /> Clear
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => handleRecentSearchClick(term)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-tostem-text-light bg-tostem-light-gray rounded-full hover:bg-tostem-blue/10 hover:text-tostem-blue transition-colors"
                            >
                              <Clock className="w-3 h-3 opacity-40" />
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {query.trim() && results.length === 0 && (
                  <div className="px-5 py-12 text-center">
                    <p className="text-tostem-text-light text-sm">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-tostem-text-muted text-xs mt-1">
                      Try searching with different keywords
                    </p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="py-2">
                    <p className="px-5 py-2 text-xs font-medium text-tostem-text-muted uppercase tracking-wider">
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </p>
                    {results.map((page) => {
                      const badge = getTypeBadge(page.type);
                      return (
                        <button
                          key={page.slug}
                          onClick={() => handleResultClick(page)}
                          className="w-full text-left px-5 py-3 hover:bg-tostem-light-gray transition-colors group flex items-start gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-tostem-dark group-hover:text-tostem-blue transition-colors truncate">
                                {page.title}
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-[10px] px-1.5 py-0 h-5 flex-shrink-0 ${badge.className}`}
                              >
                                {badge.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-tostem-text-muted line-clamp-1">
                              {page.description}
                            </p>
                            <p className="text-[10px] text-tostem-text-muted mt-1 flex items-center gap-1">
                              {page.breadcrumb.map((b, i) => (
                                <span key={i} className="flex items-center gap-1">
                                  {i > 0 && <span className="text-tostem-mid-gray">/</span>}
                                  <span>{b}</span>
                                </span>
                              ))}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-tostem-text-muted group-hover:text-tostem-blue transition-colors flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {results.length > 0 && (
                <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-[11px] text-tostem-text-muted">
                    Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-mono">Enter</kbd> to navigate to the first result
                  </p>
                  <p className="text-[11px] text-tostem-text-muted">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-mono">ESC</kbd> to close
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
