'use client';

import { motion } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';
import { glossaryTerms } from '@/lib/tostem-data';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

export default function GlossaryPage() {
  const letters = [...new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()))].sort();

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4"><Home className="w-3 h-3" /><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a><ChevronRight className="w-3 h-3" /><span className="text-white">Glossary</span></nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Glossary</h1>
              <p className="text-white/60">A comprehensive guide to window and door terminology.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* Letter navigation */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {letters.map((letter) => (
              <a key={letter} href={`#letter-${letter}`} className="w-10 h-10 rounded-lg bg-tostem-light-gray flex items-center justify-center text-sm font-bold text-tostem-dark hover:bg-tostem-blue hover:text-white transition-colors">{letter}</a>
            ))}
          </div>

          {/* Terms */}
          <div className="space-y-4">
            {letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`}>
                <h2 className="text-2xl font-black text-tostem-blue mb-4">{letter}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {glossaryTerms.filter((t) => t.term[0].toUpperCase() === letter).map((term) => (
                    <div key={term.term} className="bg-white rounded-lg p-4 border border-gray-100">
                      <h3 className="text-sm font-bold text-tostem-dark mb-1">{term.term}</h3>
                      <p className="text-sm text-tostem-text-light leading-relaxed">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
