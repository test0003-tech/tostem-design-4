'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Home, ChevronRight, Search, MessageCircle, ArrowUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { glossaryTerms } from '@/lib/tostem-data';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const allLetters = useMemo(
    () => [...new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()))].sort(),
    []
  );

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return glossaryTerms;
    const q = searchQuery.toLowerCase();
    return glossaryTerms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        (t.category && t.category.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredLetters = useMemo(
    () => [...new Set(filteredTerms.map((t) => t.term[0].toUpperCase()))].sort(),
    [filteredTerms]
  );

  const handleLetterClick = useCallback((letter: string) => {
    const el = document.getElementById(`letter-${letter}`);
    if (el) {
      const offset = 160; // account for sticky header + sticky nav
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero */}
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">Glossary</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Glossary</h1>
              <p className="text-white/60">A comprehensive guide to window and door terminology.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Count */}
      <section className="py-8 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tostem-text-light" />
              <Input
                placeholder="Search terms, definitions, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-tostem-blue focus:ring-tostem-blue/20"
              />
            </div>
              <p className="text-sm text-tostem-text-light dark:text-gray-400">
              <span className="font-bold text-tostem-dark dark:text-gray-200">{filteredTerms.length}</span> term{filteredTerms.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Letter Navigation */}
      <div className="sticky top-20 z-30 bg-white dark:bg-[#111] border-b border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {allLetters.map((letter) => {
              const isActive = filteredLetters.includes(letter);
              return (
                <button
                  key={letter}
                  onClick={() => isActive && handleLetterClick(letter)}
                  disabled={!isActive}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-tostem-light-gray dark:bg-white/10 text-tostem-dark dark:text-gray-200 hover:bg-tostem-blue hover:text-white cursor-pointer'
                      : 'bg-gray-50 dark:bg-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Terms */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {filteredTerms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-tostem-dark dark:text-gray-200 mb-2">No terms found</h3>
              <p className="text-tostem-text-light dark:text-gray-400 text-sm">Try adjusting your search query.</p>
              <Button
                variant="outline"
                className="mt-4 border-tostem-blue text-tostem-blue hover:bg-tostem-blue hover:text-white"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-10">
              {filteredLetters.map((letter) => (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-40">
                  <motion.h2
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl font-black text-tostem-blue mb-4 flex items-center gap-3"
                  >
                    <span className="w-10 h-10 rounded-lg bg-tostem-blue/10 flex items-center justify-center text-tostem-blue text-xl">
                      {letter}
                    </span>
                    <span>{letter}</span>
                  </motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTerms
                      .filter((t) => t.term[0].toUpperCase() === letter)
                      .map((term, idx) => (
                        <motion.div
                          key={term.term + idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.04 }}
                          className="bg-white dark:bg-[#1a1a1a] rounded-xl p-5 border border-gray-100 dark:border-white/10 hover:border-tostem-blue/40 transition-all duration-300 hover:shadow-md group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-sm font-bold text-tostem-dark dark:text-gray-200 group-hover:text-tostem-blue transition-colors duration-200">
                              {term.term}
                            </h3>
                            {term.category && (
                              <span className="text-[10px] font-medium bg-tostem-light-gray dark:bg-white/10 text-tostem-text-light dark:text-gray-400 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {term.category}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-tostem-text-light dark:text-gray-400 leading-relaxed">{term.definition}</p>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-tostem-dark">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <MessageCircle className="w-10 h-10 text-tostem-blue mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">Still have questions?</h2>
            <p className="text-white/60 mb-6">
              Our experts are ready to help you understand window and door terminology and find the perfect solution for your project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8"
                onClick={() => navigateTo('contact')}
              >
                Contact Us
              </Button>
              <a
                href="tel:18002667500"
                className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> 1800-266-7500
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-tostem-blue text-white shadow-lg flex items-center justify-center hover:bg-tostem-blue-light transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
