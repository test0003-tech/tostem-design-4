'use client';

import { motion } from 'framer-motion';
import { Home, ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/tostem-data';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

export default function BlogPage() {
  return (
    <div className="pt-[88px] lg:pt-[132px]">
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4"><Home className="w-3 h-3" /><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a><ChevronRight className="w-3 h-3" /><span className="text-white">Blog</span></nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Knowledge Experience</h1>
              <p className="text-white/60">Expert insights, guides, and the latest trends in aluminium windows and doors.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(${post.image})` }} />
                  <div className="absolute top-3 left-3"><Badge className="bg-tostem-blue text-white text-[10px]">{post.category}</Badge></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-tostem-text-muted mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-tostem-dark mb-2 group-hover:text-tostem-blue transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-tostem-text-light leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
