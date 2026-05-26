'use client';

import { motion } from 'framer-motion';
import { Home, ChevronRight, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { tadaAwards } from '@/lib/tostem-data';
import type { PageRegistryItem } from '@/lib/tostem-data';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

interface TadaPageProps {
  slug: string;
  pageInfo: PageRegistryItem;
}

const tadaInfo: Record<string, { year: string; description: string }> = {
  'tada-2025': { year: '2025', description: 'The 2025 TADA Awards recognize the finest architecture and design projects featuring Tostem products across India.' },
  'tada-2024': { year: '2024', description: 'The 2024 TADA Awards celebrated outstanding residential and commercial projects that showcased the best of Tostem aluminium solutions.' },
  'tada-2023': { year: '2023', description: 'The 2023 TADA Awards honored the most innovative architectural designs using Tostem premium aluminium windows and doors.' },
};

export default function TadaPage({ slug, pageInfo }: TadaPageProps) {
  const info = tadaInfo[slug];

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4"><Home className="w-3 h-3" /><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a><ChevronRight className="w-3 h-3" /><span className="text-white">TADA</span><ChevronRight className="w-3 h-3" /><span className="text-white">TADA-{info?.year || 'Awards'}</span></nav>
              <div className="flex items-center gap-3 mb-2"><Trophy className="w-8 h-8 text-yellow-400" /><h1 className="text-3xl md:text-5xl font-black text-white">TADA {info?.year || 'Awards'}</h1></div>
              <p className="text-white/60 max-w-2xl">{info?.description || 'Tostem Architecture & Design Awards recognize excellence in architecture and design.'}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-tostem-dark mb-8">Award Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tadaAwards.map((award, i) => (
              <motion.div key={award.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(${award.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3"><div className="w-10 h-10 rounded-full bg-yellow-500/90 flex items-center justify-center"><Trophy className="w-5 h-5 text-white" /></div></div>
                  <div className="absolute bottom-3 left-3"><Badge className="bg-white/90 text-tostem-dark text-[10px]">{award.category}</Badge></div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-tostem-text-muted mb-1">{award.year}</div>
                  <h3 className="text-base font-bold text-tostem-dark mb-2">{award.title}</h3>
                  <p className="text-xs text-tostem-text-light leading-relaxed">{award.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other TADA Years */}
      <section className="py-12 md:py-16 bg-tostem-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-tostem-dark mb-6">Other TADA Years</h2>
          <div className="flex justify-center gap-4">
            {['tada-2025', 'tada-2024', 'tada-2023'].filter((s) => s !== slug).map((s) => (
              <Button key={s} variant="outline" onClick={() => navigateTo(s)} className="gap-2"><Trophy className="w-4 h-4" />TADA-{s.split('-')[1]} <ArrowRight className="w-3 h-3" /></Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
