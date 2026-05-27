'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, Quote, Star, ArrowRight, Building2, Users, HomeIcon, MapPin, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { testimonials } from '@/lib/tostem-data';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

// Map testimonial roles to filter categories
function getRoleCategory(role: string): string {
  const lower = role.toLowerCase();
  if (lower.includes('architect') || lower.includes('designer') || lower.includes('planner')) return 'Architects';
  if (lower.includes('builder') || lower.includes('director') || lower.includes('manager') || lower.includes('construction')) return 'Builders';
  if (lower.includes('homeowner')) return 'Homeowners';
  return 'Homeowners';
}

const roleFilters = ['All', 'Architects', 'Builders', 'Homeowners'];

const stats = [
  { label: 'Projects', value: '500+', icon: Building2 },
  { label: 'Satisfaction', value: '98%', icon: TrendingUp },
  { label: 'Cities', value: '50+', icon: MapPin },
  { label: 'Rating', value: '4.8/5', icon: Award },
];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTestimonials = useMemo(() => {
    if (activeFilter === 'All') return testimonials;
    return testimonials.filter((t) => getRoleCategory(t.role) === activeFilter);
  }, [activeFilter]);

  const featuredTestimonial = filteredTestimonials[0];
  const remainingTestimonials = filteredTestimonials.slice(1);

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
                <span className="text-white">Testimonials</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Testimonials</h1>
              <p className="text-white/60">Hear from architects, builders, and homeowners who experienced the Tostem difference.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-[#111] border-b dark:border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat, i) => {
              const IconComp = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 py-6 md:py-8 justify-center"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-tostem-blue/10 flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5 md:w-6 md:h-6 text-tostem-blue" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-black text-tostem-dark dark:text-gray-100">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-tostem-light-gray dark:bg-[#1a1a1a] border-b dark:border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none">
            {roleFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-tostem-blue text-white shadow-sm'
                    : 'bg-white dark:bg-[#222] text-tostem-dark dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                {filter === 'Architects' && <Building2 className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                {filter === 'Builders' && <Users className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                {filter === 'Homeowners' && <HomeIcon className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Content */}
      <section className="py-12 md:py-16 bg-tostem-light-gray dark:bg-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured Testimonial */}
              {featuredTestimonial && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 md:p-10 shadow-lg relative border border-gray-100 dark:border-white/10 mb-8 overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-tostem-blue/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-tostem-blue/3 rounded-full translate-y-1/2 -translate-x-1/4" />

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                      {/* Left: Quote and text */}
                      <div className="flex-1">
                        <Quote className="w-12 h-12 text-tostem-blue/20 mb-4" />
                        <p className="text-lg md:text-xl text-tostem-dark dark:text-gray-200 leading-relaxed mb-6 italic">
                          &ldquo;{featuredTestimonial.text}&rdquo;
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-full bg-tostem-blue/10 flex items-center justify-center text-tostem-blue text-xl font-bold">
                            {featuredTestimonial.name[0]}
                          </div>
                          <div>
                            <div className="text-lg font-bold text-tostem-dark dark:text-gray-200">{featuredTestimonial.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{featuredTestimonial.role}</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {featuredTestimonial.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Rating and project */}
                      <div className="md:w-64 shrink-0 flex flex-col items-start md:items-end justify-center gap-4">
                        <Badge className="bg-tostem-blue text-white px-3 py-1 text-[11px]">Featured Review</Badge>
                        <div className="text-right">
                          <div className="flex items-center gap-0.5 mb-1 md:justify-end">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star
                                key={j}
                                className={`w-5 h-5 ${j < featuredTestimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                              />
                            ))}
                          </div>
                          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {featuredTestimonial.rating}.0 out of 5.0
                          </div>
                        </div>
                        <div className="bg-tostem-light-gray dark:bg-white/5 rounded-lg px-4 py-3 text-right w-full md:w-auto">
                          <div className="text-xs text-gray-500 mb-1">Project</div>
                          <div className="text-sm font-semibold text-tostem-dark">{featuredTestimonial.project}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Remaining Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingTestimonials.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative border border-gray-100 dark:border-white/10"
                  >
                    <Quote className="w-8 h-8 text-tostem-blue/10 absolute top-4 right-4" />

                    {/* Star Rating */}
                    <div className="mb-4">
                      <div className="flex items-center gap-0.5 mb-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${j < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{t.rating}.0 out of 5.0</span>
                    </div>

                    {/* Quote text */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-4">{t.text}</p>

                    {/* Project */}
                    <div className="text-sm text-tostem-blue font-medium mb-4 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      {t.project}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                      <div className="w-10 h-10 rounded-full bg-tostem-blue/10 flex items-center justify-center text-tostem-blue font-bold">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-tostem-dark dark:text-gray-200">{t.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}, {t.location}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-tostem-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-blue/20 to-transparent" />
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-tostem-blue/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">Join thousands of satisfied customers</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">Experience the Tostem difference for yourself. Get in touch with our team today.</p>
            <Button
              size="lg"
              className="bg-tostem-blue hover:bg-tostem-blue/90 text-white rounded-full px-8"
              onClick={() => navigateTo('contact')}
            >
              Contact Us <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
