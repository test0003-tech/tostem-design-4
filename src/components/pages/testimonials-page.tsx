'use client';

import { motion } from 'framer-motion';
import { Home, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/tostem-data';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

export default function TestimonialsPage() {
  return (
    <div className="pt-[88px] lg:pt-[132px]">
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4"><Home className="w-3 h-3" /><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a><ChevronRight className="w-3 h-3" /><span className="text-white">Testimonials</span></nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Testimonials</h1>
              <p className="text-white/60">Hear from architects, builders, and homeowners who experienced the Tostem difference.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative border border-gray-100">
                <Quote className="w-8 h-8 text-tostem-blue/10 absolute top-4 right-4" />
                <div className="flex gap-0.5 mb-4">{Array.from({ length: t.rating }).map((_, j) => (<Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}</div>
                <p className="text-sm text-tostem-text-light leading-relaxed mb-6">{t.text}</p>
                <div className="text-sm text-tostem-blue font-medium mb-4">{t.project}</div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-tostem-blue/10 flex items-center justify-center text-tostem-blue font-bold">{t.name[0]}</div>
                  <div><div className="text-sm font-bold text-tostem-dark">{t.name}</div><div className="text-xs text-tostem-text-muted">{t.role}, {t.location}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
