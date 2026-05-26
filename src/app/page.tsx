'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Star,
  Trophy,
  Quote,
  Calendar,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  heroSlides,
  seriesData,
  categoryData,
  whyTostemItems,
  aboutData,
  designsData,
  faqData,
  blogPosts,
  testimonials,
  galleryData,
  tadaAwards,
  glossaryTerms,
  channelPartners,
  careerPositions,
} from '@/lib/tostem-data';
import type { WhyTostemItem } from '@/lib/tostem-data';
import SectionHeading from '@/components/section-heading';
import { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Settings,
  Award,
  Sparkles,
  VolumeX,
  CheckCircle,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'shield-check': <ShieldCheck className="w-8 h-8" />,
  settings: <Settings className="w-8 h-8" />,
  award: <Award className="w-8 h-8" />,
  sparkles: <Sparkles className="w-8 h-8" />,
  'volume-x': <VolumeX className="w-8 h-8" />,
  'check-circle': <CheckCircle className="w-8 h-8" />,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, []);

  const galleryCategories = ['All', 'Residential', 'Commercial', 'Interior', 'Exterior'];
  const filteredGallery = galleryFilter === 'All'
    ? galleryData
    : galleryData.filter((item) => item.category === galleryFilter);

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* ============ HERO SECTION ============ */}
      <section id="home" className="relative h-[85vh] min-h-[500px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </motion.div>
        ))}

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-2">
                {heroSlides[currentSlide].title}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 mb-6">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                {heroSlides[currentSlide].description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8"
                  onClick={() => {
                    const el = document.querySelector(heroSlides[currentSlide].cta.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {heroSlides[currentSlide].cta.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-8"
                  onClick={() => {
                    const el = document.querySelector('#video');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Video
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-white'
                    : 'w-4 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ============ ABOUT SECTION ============ */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label={aboutData.subtitle}
            title={aboutData.title}
            description={aboutData.description}
          />

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
          >
            {aboutData.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-tostem-light-gray"
              >
                <div className="text-3xl md:text-4xl font-black text-tostem-blue mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-bold text-tostem-dark mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-tostem-text-light">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Director's Message + Brand Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-tostem-dark rounded-xl p-6 md:p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-tostem-blue/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <span className="text-xs font-bold text-tostem-blue uppercase tracking-[0.2em]">
                Director&apos;s Message
              </span>
              <Quote className="w-8 h-8 text-tostem-blue/30 mt-4 mb-4" />
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {aboutData.directorMessage.message}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tostem-blue/20 flex items-center justify-center text-tostem-blue font-bold">
                  {aboutData.directorMessage.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {aboutData.directorMessage.name}
                  </div>
                  <div className="text-xs text-white/50">
                    {aboutData.directorMessage.title}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-tostem-light-gray rounded-xl p-6">
                <span className="text-xs font-bold text-tostem-blue uppercase tracking-[0.2em]">
                  Our Purpose
                </span>
                <p className="text-sm text-tostem-text-light leading-relaxed mt-3">
                  {aboutData.purposeValues.purpose}
                </p>
              </div>
              <div className="bg-tostem-light-gray rounded-xl p-6">
                <span className="text-xs font-bold text-tostem-blue uppercase tracking-[0.2em]">
                  Our Values
                </span>
                <ul className="mt-3 space-y-2">
                  {aboutData.purposeValues.behaviours.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-tostem-text-light">
                      <CheckCircle className="w-4 h-4 text-tostem-blue mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* LIXIL Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-tostem-dark to-tostem-blue/80 rounded-xl p-6 md:p-8 text-white"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <span className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">
                  Powered By
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-4">
                  {aboutData.lixilInfo.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {aboutData.lixilInfo.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                {aboutData.lixilInfo.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-white/10 rounded-lg">
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/50 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ WHY TOSTEM SECTION ============ */}
      <section id="why-tostem" className="py-16 md:py-24 bg-tostem-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Why Tostem"
            title="The Tostem Advantage"
            description="Discover why architects, builders, and homeowners across India trust Tostem for their aluminium window and door needs."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyTostemItems.map((item: WhyTostemItem) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-tostem-blue mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[item.icon]}
                </div>
                <h3 className="text-lg font-bold text-tostem-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-tostem-text-light leading-relaxed">
                  {item.detailed}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ PRODUCTS / CATEGORIES SECTION ============ */}
      <section id="products" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Our Products"
            title="Premium Aluminium Solutions"
            description="From elegant windows to grand entrances, explore our comprehensive range of aluminium products designed for modern Indian homes and commercial spaces."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData.map((cat, i) => (
              <motion.a
                key={cat.id}
                href={cat.href}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector(cat.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs text-tostem-blue font-bold tracking-wider uppercase">
                      {cat.count} Products
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-white/70 mt-2 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-tostem-blue text-sm font-medium group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERIES SHOWCASE SECTION ============ */}
      <section id="series" className="py-16 md:py-24 bg-tostem-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Our Series"
            title="Choose Your Series"
            description="Tostem offers multiple series, each tailored to different needs and budgets. Every series delivers the same Japanese quality and reliability."
          />

          <Tabs defaultValue="atis" className="w-full">
            <TabsList className="mx-auto mb-8 bg-white rounded-xl p-1 h-auto flex-wrap gap-1">
              {seriesData.map((series) => (
                <TabsTrigger
                  key={series.id}
                  value={series.id}
                  className="px-6 py-3 text-sm font-semibold data-[state=active]:bg-tostem-blue data-[state=active]:text-white rounded-lg"
                >
                  {series.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {seriesData.map((series) => (
              <TabsContent key={series.id} value={series.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {/* Series Image & Info */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${series.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <Badge className="bg-tostem-blue text-white mb-3">
                        {series.tagline}
                      </Badge>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {series.name}
                      </h3>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">
                        {series.detailedDescription}
                      </p>
                    </div>
                  </div>

                  {/* Specifications & Features */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-tostem-dark mb-4">
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {series.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-sm text-tostem-text-light"
                          >
                            <CheckCircle className="w-4 h-4 text-tostem-blue mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-tostem-dark mb-4">
                        Technical Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {series.specifications.map((spec) => (
                          <div
                            key={spec.label}
                            className="bg-white rounded-lg p-3 border border-gray-100"
                          >
                            <div className="text-xs text-tostem-text-muted">
                              {spec.label}
                            </div>
                            <div className="text-sm font-bold text-tostem-dark mt-1">
                              {spec.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="bg-tostem-blue hover:bg-tostem-blue-light text-white"
                      onClick={() => {
                        const el = document.querySelector('#quotation');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Get Quotation for {series.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ============ DESIGNS GRID SECTION ============ */}
      <section id="designs" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Designs"
            title="Explore Our Designs"
            description="From classic to contemporary, our design catalogue covers every architectural vision. Each design is precision-engineered for performance and aesthetics."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {designsData.map((design) => (
              <motion.div
                key={design.id}
                variants={itemVariants}
                className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${design.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-tostem-blue/90 text-white text-[10px]">
                      {design.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {design.name}
                    </h3>
                    <p className="text-xs text-white/60 mt-1 line-clamp-2">
                      {design.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ VIDEO SECTION ============ */}
      <section id="video" className="py-16 md:py-24 bg-tostem-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-tostem-blue rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tostem-blue rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
          <SectionHeading
            label="Watch & Learn"
            title="Japanese Innovation in Action"
            description="Discover how Tostem brings the Japanese philosophy of monozukuri to every window and door we create, combining precision engineering with beautiful design."
            light
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-tostem-blue/20 to-tostem-dark flex items-center justify-center group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-full bg-tostem-blue flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-tostem-blue/30">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  The Tostem Story
                </h3>
                <p className="text-sm text-white/60 max-w-md mx-auto">
                  Watch how our Japanese engineering and pre-engineered system creates windows that transform Indian homes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { title: 'Manufacturing Excellence', desc: 'Factory-controlled precision' },
                { title: 'Quality Testing', desc: '100+ quality checks per product' },
                { title: 'Installation Process', desc: 'Professional certified teams' },
              ].map((vid) => (
                <div
                  key={vid.title}
                  className="bg-white/5 rounded-lg p-4 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-tostem-blue/20 flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-tostem-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {vid.title}
                    </div>
                    <div className="text-xs text-white/40">{vid.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ TADA AWARDS SECTION ============ */}
      <section id="tada-awards" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Awards & Recognition"
            title="TADA Award Winners"
            description="Tostem's commitment to excellence has been recognized with multiple industry awards and accolades."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tadaAwards.map((award) => (
              <motion.div
                key={award.id}
                variants={itemVariants}
                className="bg-tostem-light-gray rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${award.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/90 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 text-tostem-dark text-[10px]">
                      {award.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-tostem-text-muted mb-1">
                    {award.year}
                  </div>
                  <h3 className="text-base font-bold text-tostem-dark mb-2">
                    {award.title}
                  </h3>
                  <p className="text-xs text-tostem-text-light leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ GALLERY SECTION ============ */}
      <section id="gallery" className="py-16 md:py-24 bg-tostem-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Project Gallery"
            title="Our Work Speaks"
            description="Browse through our collection of residential, commercial, interior, and exterior projects showcasing Tostem's premium aluminium solutions."
          />

          {/* Gallery Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {galleryCategories.map((cat) => (
              <Button
                key={cat}
                variant={galleryFilter === cat ? 'default' : 'outline'}
                size="sm"
                className={
                  galleryFilter === cat
                    ? 'bg-tostem-blue text-white hover:bg-tostem-blue-light'
                    : 'border-gray-300 text-tostem-text-light hover:text-tostem-dark'
                }
                onClick={() => setGalleryFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={galleryFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredGallery.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Badge className="bg-tostem-blue/80 text-white text-[10px] mb-2">
                        {item.category}
                      </Badge>
                      <h3 className="text-sm font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/60 mt-1">
                        {item.location}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.products.map((p) => (
                          <span
                            key={p}
                            className="text-[10px] bg-white/20 text-white/80 px-2 py-0.5 rounded-full"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============ BLOG / NEWS SECTION ============ */}
      <section id="blog" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Knowledge Centre"
            title="Latest from Our Blog"
            description="Stay informed with expert insights, guides, and the latest trends in aluminium windows, doors, and modern architecture."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-tostem-blue text-white text-[10px]">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-tostem-text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-tostem-dark mb-2 group-hover:text-tostem-blue transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-tostem-text-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-tostem-blue text-sm font-medium group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ FAQ SECTION ============ */}
      <section id="faqs" className="py-16 md:py-24 bg-tostem-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Frequently Asked Questions"
            title="Got Questions?"
            description="Find answers to the most common questions about Tostem's aluminium windows, doors, installation process, and more."
          />

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white rounded-xl px-6 border-0 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-tostem-dark hover:text-tostem-blue hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-tostem-text-light leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS SECTION ============ */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="What Our Clients Say"
            description="Hear from architects, builders, and homeowners who have experienced the Tostem difference."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="bg-tostem-light-gray rounded-xl p-5 relative hover:shadow-md transition-shadow"
              >
                <Quote className="w-6 h-6 text-tostem-blue/20 absolute top-4 right-4" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-tostem-text-light leading-relaxed mb-4 line-clamp-4">
                  {testimonial.text}
                </p>
                <div className="text-xs text-tostem-blue font-medium mb-3">
                  {testimonial.project}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-tostem-blue/10 flex items-center justify-center text-tostem-blue font-bold text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-tostem-dark">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-tostem-text-muted">
                      {testimonial.role}, {testimonial.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CTA / QUOTATION SECTION ============ */}
      <section id="quotation" className="py-16 md:py-24 bg-tostem-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-tostem-blue rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-tostem-blue rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionHeading
              label="Get Started"
              title="Ready to Transform Your Space?"
              description="Get a free consultation and quotation for your project. Our experts will help you choose the perfect windows and doors for your home or commercial space."
              light
              align="left"
            />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Request a Quotation
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none transition-colors"
                />
                <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white/60 text-sm focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none transition-colors">
                  <option value="">Select Product Interest</option>
                  <option value="windows">Windows</option>
                  <option value="doors">Doors</option>
                  <option value="interior">Interior Solutions</option>
                  <option value="exterior">Exterior Solutions</option>
                </select>
                <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white/60 text-sm focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none transition-colors">
                  <option value="">Select Series</option>
                  <option value="atis">ATIS Series</option>
                  <option value="grants">GRANTS Series</option>
                  <option value="we70">WE-70 Series</option>
                  <option value="weplus">WE+ Series</option>
                </select>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-tostem-blue hover:bg-tostem-blue-light text-white"
                >
                  Get Free Quotation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
              <p className="text-xs text-white/30 mt-4 text-center">
                Or call us directly at{' '}
                <a
                  href="tel:+911800123456"
                  className="text-tostem-blue hover:underline"
                >
                  +91 1800-123-4567
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CHANNEL PARTNERS SECTION ============ */}
      <section id="channel-partners" className="py-16 md:py-24 bg-tostem-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Our Network"
            title="Channel Partners"
            description="Tostem operates through a nationwide network of certified channel partners, ensuring premium service and support across India."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {channelPartners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={itemVariants}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-tostem-blue/10 flex items-center justify-center text-tostem-blue font-bold text-sm">
                    {partner.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-tostem-dark">
                      {partner.name}
                    </h3>
                    <div className="text-xs text-tostem-text-muted">
                      {partner.city}, {partner.state}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    partner.type === 'Premium Partner'
                      ? 'border-tostem-blue text-tostem-blue'
                      : partner.type === 'Gold Partner'
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-gray-400 text-gray-500'
                  }
                >
                  {partner.type}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ GLOSSARY SECTION ============ */}
      <section id="glossary" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Window & Door Glossary"
            title="Know Your Terms"
            description="A comprehensive glossary of window and door terminology to help you make informed decisions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossaryTerms.map((term, i) => (
              <motion.div
                key={term.term}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="bg-tostem-light-gray rounded-lg p-4 hover:bg-tostem-hover transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-tostem-dark">
                    {term.term}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1.5 py-0"
                  >
                    {term.category}
                  </Badge>
                </div>
                <p className="text-xs text-tostem-text-light leading-relaxed">
                  {term.definition}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAREERS SECTION ============ */}
      <section id="career" className="py-16 md:py-24 bg-tostem-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Join Our Team"
            title="Career Opportunities"
            description="Be part of a global brand that's transforming the Indian window and door industry. Explore open positions at Tostem India."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {careerPositions.map((position) => (
              <motion.div
                key={position.id}
                variants={itemVariants}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-base font-bold text-tostem-dark">
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px]">
                      {position.department}
                    </Badge>
                    <span className="text-xs text-tostem-text-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {position.location}
                    </span>
                    <span className="text-xs text-tostem-text-muted">
                      {position.type}
                    </span>
                  </div>
                  <p className="text-xs text-tostem-text-light mt-2">
                    {position.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-tostem-blue text-tostem-blue hover:bg-tostem-blue hover:text-white flex-shrink-0"
                >
                  Apply
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Reach Us"
            title="Get In Touch"
            description="Have questions or need a quotation? Our team is ready to help you find the perfect aluminium window and door solutions."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-tostem-light-gray rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-tostem-dark mb-6">
                Send Us a Message
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none text-sm transition-colors bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none text-sm transition-colors bg-white"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none text-sm transition-colors bg-white"
                />
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none text-sm text-tostem-text-light transition-colors bg-white">
                  <option value="">Select Product Interest</option>
                  <option value="windows">Windows</option>
                  <option value="doors">Doors</option>
                  <option value="interior">Interior Solutions</option>
                  <option value="exterior">Exterior Solutions</option>
                </select>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-tostem-blue focus:ring-1 focus:ring-tostem-blue outline-none text-sm resize-none transition-colors bg-white"
                />
                <Button
                  type="submit"
                  className="w-full bg-tostem-blue hover:bg-tostem-blue-light text-white"
                >
                  Submit Enquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-tostem-dark rounded-xl p-6 md:p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-tostem-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium mb-1">Address</div>
                      <div className="text-sm text-white/60 leading-relaxed">
                        Tostem India, LIXIL Window Systems India Pvt. Ltd., 4th
                        Floor, Tower B, Building No. 5, Cyber Hub, Gurugram,
                        Haryana 122002
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-tostem-blue flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium mb-1">Phone</div>
                      <a
                        href="tel:+911800123456"
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        +91 1800-123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-tostem-blue flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium mb-1">Email</div>
                      <a
                        href="mailto:info@tostemindia.com"
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        info@tostemindia.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-200 rounded-xl aspect-[16/9] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-tostem-blue/5 to-tostem-dark/5" />
                <div className="text-center text-tostem-text-muted relative z-10">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-tostem-blue" />
                  <p className="text-sm font-medium text-tostem-dark">Tostem India Office</p>
                  <p className="text-xs">Cyber Hub, Gurugram, Haryana</p>
                  <a
                    href="https://maps.google.com/?q=Cyber+Hub+Gurugram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-tostem-blue mt-2 hover:underline"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
