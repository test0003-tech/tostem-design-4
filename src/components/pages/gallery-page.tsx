'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, LayoutGrid, Columns3, X, ChevronLeft, MapPin, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { galleryData, type GalleryItem } from '@/lib/tostem-data';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

type ViewMode = 'grid' | 'masonry';

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['All', 'Residential', 'Commercial', 'Interior', 'Exterior'];
  const filtered = filter === 'All' ? galleryData : galleryData.filter((item) => item.category === filter);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filtered.length);
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const currentItem = filtered[lightboxIndex];

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero Banner */}
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">Gallery</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Project Gallery</h1>
              <p className="text-white/60">Browse our collection of residential, commercial, interior, and exterior projects.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter & Controls */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={filter === cat ? 'default' : 'outline'}
                  size="sm"
                  className={filter === cat ? 'bg-tostem-blue text-white' : ''}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Showing <strong className="text-tostem-dark dark:text-gray-200">{filtered.length}</strong> of <strong className="text-tostem-dark dark:text-gray-200">{galleryData.length}</strong> projects</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors duration-200 ${viewMode === 'grid' ? 'bg-tostem-blue text-white' : 'bg-white dark:bg-[#222] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 transition-colors duration-200 ${viewMode === 'masonry' ? 'bg-tostem-blue text-white' : 'bg-white dark:bg-[#222] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                  aria-label="Masonry view"
                >
                  <Columns3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Grid / Masonry */}
          <AnimatePresence mode="wait">
            {viewMode === 'masonry' ? (
              <motion.div
                key={`masonry-${filter}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
              >
                {filtered.map((item, i) => (
                  <MasonryCard key={item.id} item={item} index={i} onClick={() => openLightbox(i)} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`grid-${filter}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {filtered.map((item, i) => (
                  <GridCard key={item.id} item={item} index={i} onClick={() => openLightbox(i)} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-tostem-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-blue/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-tostem-blue/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">Want similar results for your project?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">Get in touch with our team to discuss your requirements and see how Tostem can transform your space.</p>
            <Button
              size="lg"
              className="bg-tostem-blue hover:bg-tostem-blue/90 text-white rounded-full px-8"
              onClick={() => navigateTo('contact')}
            >
              Enquire Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl w-[calc(100%-2rem)] p-0 overflow-hidden bg-black border-none" showCloseButton={false}>
          <DialogTitle className="sr-only">Gallery Image Viewer</DialogTitle>
          {currentItem && (
            <div className="relative">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation arrows */}
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="relative aspect-[16/10] bg-gray-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentItem.image})` }}
                  />
                </AnimatePresence>
              </div>

              {/* Info overlay */}
              <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-tostem-blue/80 text-white text-[11px] mb-2">{currentItem.category}</Badge>
                <h3 className="text-xl font-bold text-white mb-1">{currentItem.title}</h3>
                <div className="flex items-center gap-1 text-white/60 text-sm mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {currentItem.location}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentItem.products.map((p) => (
                    <span key={p} className="text-xs bg-white/15 text-white/80 px-2.5 py-1 rounded-full">{p}</span>
                  ))}
                </div>
                <div className="text-xs text-white/40 mt-3">{lightboxIndex + 1} / {filtered.length}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* Masonry-style card with varying heights */
function MasonryCard({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  // Vary aspect ratios for masonry effect
  const aspectRatios = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[1/1]'];
  const aspectClass = aspectRatios[index % aspectRatios.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 mb-5 break-inside-avoid"
      onClick={onClick}
    >
      <div className={`${aspectClass} relative`}>
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Always-visible title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Badge className="bg-tostem-blue/80 text-white text-[10px] mb-2">{item.category}</Badge>
            <h3 className="text-sm font-bold text-white">{item.title}</h3>
            <p className="text-xs text-white/60 mt-1">{item.location}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {item.products.map((p) => (
                <span key={p} className="text-[10px] bg-white/20 text-white/80 px-2 py-0.5 rounded-full">{p}</span>
              ))}
            </div>
          </div>
        </div>
        {/* View icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* Uniform grid card */
function GridCard({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Badge className="bg-tostem-blue/80 text-white text-[10px] mb-2">{item.category}</Badge>
          <h3 className="text-sm font-bold text-white">{item.title}</h3>
          <p className="text-xs text-white/60 mt-1">{item.location}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {item.products.map((p) => (
              <span key={p} className="text-[10px] bg-white/20 text-white/80 px-2 py-0.5 rounded-full">{p}</span>
            ))}
          </div>
        </div>
        {/* View icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
