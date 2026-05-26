'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { galleryData } from '@/lib/tostem-data';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Residential', 'Commercial', 'Interior', 'Exterior'];
  const filtered = filter === 'All' ? galleryData : galleryData.filter((item) => item.category === filter);

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4"><Home className="w-3 h-3" /><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a><ChevronRight className="w-3 h-3" /><span className="text-white">Gallery</span></nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Project Gallery</h1>
              <p className="text-white/60">Browse our collection of residential, commercial, interior, and exterior projects.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <Button key={cat} variant={filter === cat ? 'default' : 'outline'} size="sm" className={filter === cat ? 'bg-tostem-blue text-white' : ''} onClick={() => setFilter(cat)}>{cat}</Button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] relative">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Badge className="bg-tostem-blue/80 text-white text-[10px] mb-2">{item.category}</Badge>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-white/60 mt-1">{item.location}</p>
                      <div className="flex flex-wrap gap-1 mt-2">{item.products.map((p) => (<span key={p} className="text-[10px] bg-white/20 text-white/80 px-2 py-0.5 rounded-full">{p}</span>))}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
