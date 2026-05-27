'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Play, ChevronLeft, ChevronRight, Quote,
  Star, Trophy, Calendar, Clock, ShieldCheck, Settings,
  Award, Sparkles, VolumeX, CheckCircle, ChevronDown,
  MessageSquare, Palette, Factory, Wrench, Mail, Users,
  Building2, ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  heroSlides, seriesData, categoryData, whyTostemItems,
  aboutData, designsData, blogPosts, testimonials,
  galleryData, tadaAwards, glossaryTerms, channelPartners,
} from '@/lib/tostem-data';
import type { WhyTostemItem, DesignData } from '@/lib/tostem-data';
import SectionHeading from '@/components/section-heading';
import { DesignQuickViewModal, DesignQuickViewButton } from '@/components/design-quick-view';
import { ComparisonBar, CompareCheckbox, ComparisonDialog } from '@/components/product-comparison';
import ProductWizard from '@/components/product-wizard';
import PriceEstimator, { PriceEstimatorCTA } from '@/components/price-estimator';
import RecentlyViewed from '@/components/recently-viewed';
import { RecommendationCTA } from '@/components/recommendation-engine';
import WarrantyShowcase from '@/components/warranty-showcase';
import { ProjectCalculatorCTA } from '@/components/project-calculator';
import BeforeAfterSlider from '@/components/before-after-slider';
import InstallationTracker from '@/components/installation-tracker';
import CustomerStories from '@/components/customer-stories';
import FAQSection from '@/components/faq-section';
import { useSiteStore } from '@/lib/store';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// ====== Section Divider Component ======
function SectionDivider({ color = '#2E5A87', flip = false }: { color?: string; flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[30px] md:h-[40px]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 48C960 48 1056 36 1152 28C1248 20 1344 16 1392 14L1440 12V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z"
          fill="currentColor"
          style={{ color }}
        />
      </svg>
    </div>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  'shield-check': <ShieldCheck className="w-8 h-8" />,
  settings: <Settings className="w-8 h-8" />,
  award: <Award className="w-8 h-8" />,
  sparkles: <Sparkles className="w-8 h-8" />,
  'volume-x': <VolumeX className="w-8 h-8" />,
  'check-circle': <CheckCircle className="w-8 h-8" />,
};

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function navigateTo(slug: string) {
  if (slug === 'home') {
    window.location.hash = '';
  } else {
    window.location.hash = `/${slug}`;
  }
}

// ====== Animated Counter Hook ======
function useCountUp(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(target);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always start animation - show target value immediately, then count up from 0
    const startAnimation = () => {
      setCount(0);
      setHasStarted(true);
    };

    if (!startOnView) {
      startAnimation();
      return;
    }

    const checkVisible = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          startAnimation();
          return true;
        }
      }
      return false;
    };

    // Check immediately (element might already be visible)
    if (checkVisible()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

// ====== Hero Counter Stat ======
function HeroStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 2200);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-black text-white">
        {count}<span className="text-tostem-blue">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm text-white/60 mt-1 font-medium">{label}</div>
    </motion.div>
  );
}

// ====== Process Timeline Step ======
const processSteps = [
  { icon: MessageSquare, title: 'Consultation', description: 'Free expert consultation to understand your requirements, style preferences, and budget.', step: 1 },
  { icon: Palette, title: 'Design Selection', description: 'Choose from 100+ designs across 4 series, customized to your architectural vision.', step: 2 },
  { icon: Factory, title: 'Manufacturing', description: 'Pre-engineered in controlled factory environments with 100+ quality checks.', step: 3 },
  { icon: Wrench, title: 'Installation', description: 'Professional installation by certified technicians with comprehensive warranty.', step: 4 },
];

// ====== Channel Partner Logos (placeholder) ======
const partnerLogos = [
  'LIXIL', 'Tata Housing', 'Godrej Properties', 'Sobha Ltd', 'Prestige Group', 'DLF',
  'Lodha Group', 'Brigade Group', 'Piramal Realty', 'Mahindra Lifespaces',
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [quickViewDesign, setQuickViewDesign] = useState<DesignData | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  // Comparison state
  const [comparisonItems, setComparisonItems] = useState<DesignData[]>([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  // Product Wizard state (synced with global store)
  const { wizardOpen, setWizardOpen } = useSiteStore();

  // Price Estimator state
  const [estimatorOpen, setEstimatorOpen] = useState(false);

  // Show all designs state
  const [showAllDesigns, setShowAllDesigns] = useState(false);

  // Typing animation state
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingPhrases = useMemo(() => [
    'Japanese Precision',
    'Indian Craftsmanship',
    'Premium Aluminium',
    'Innovative Design',
  ], []);

  // Testimonials carousel state
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const [testimonialDirection, setTestimonialDirection] = useState<1 | -1>(1);

  // Testimonials per view - responsive
  const [testimonialsPerView, setTestimonialsPerView] = useState(1);

  useEffect(() => {
    const updatePerView = () => {
      if (window.innerWidth >= 1024) setTestimonialsPerView(3);
      else if (window.innerWidth >= 640) setTestimonialsPerView(2);
      else setTestimonialsPerView(1);
    };
    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, []);

  const maxTestimonialIndex = Math.max(0, testimonials.length - testimonialsPerView);

  // Testimonials auto-rotation
  useEffect(() => {
    if (testimonialPaused) return;
    const timer = setInterval(() => {
      setTestimonialDirection(1);
      setTestimonialIndex((prev) => prev >= maxTestimonialIndex ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonialPaused, maxTestimonialIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, typingPhrases]);

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), []);
  const prevSlide = useCallback(() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length), []);

  const galleryCategories = ['All', 'Residential', 'Commercial', 'Interior', 'Exterior'];
  const filteredGallery = galleryFilter === 'All' ? galleryData : galleryData.filter((item) => item.category === galleryFilter);

  // Comparison helpers
  const toggleComparisonItem = useCallback((design: DesignData) => {
    setComparisonItems((prev) => {
      if (prev.find((d) => d.id === design.id)) {
        return prev.filter((d) => d.id !== design.id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, design];
    });
  }, []);

  const removeComparisonItem = useCallback((id: string) => {
    setComparisonItems((prev) => prev.filter((d) => d.id !== id));
  }, []);

  // Parallax scroll effect for hero
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* ===== HERO ===== */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden noise-overlay">
        {heroSlides.map((slide, index) => (
          <motion.div key={index} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: index === currentSlide ? 1 : 0 }} transition={{ duration: 1.2, ease: 'easeInOut' }}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})`, transform: `translateY(${scrollY * 0.3}px)` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </motion.div>
        ))}

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
          <motion.div
            className="absolute top-[15%] right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full border border-white/10"
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[60%] right-[20%] w-16 h-16 md:w-24 md:h-24 rounded-full border border-tostem-blue/20 bg-tostem-blue/5"
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[30%] left-[5%] w-2 h-20 md:h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[30%] right-[8%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-tostem-blue/30"
            animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[20%] right-[35%] w-1.5 h-1.5 rounded-full bg-white/20"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[40%] left-[15%] w-2 h-2 rounded-full bg-tostem-blue/20"
            animate={{ y: [0, 8, 0], x: [0, 5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="max-w-2xl">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-4">
                <Badge className="bg-white/10 text-white/80 backdrop-blur-sm border border-white/20 text-xs px-4 py-1.5 rounded-full">
                  <span className="mr-1.5">★</span> 50+ Years of Japanese Craftsmanship
                </Badge>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mt-4 mb-2 drop-shadow-lg">{heroSlides[currentSlide].title}</h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white/90 mb-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                <span className="text-gradient-animated">{typedText}</span>
                <span className="typing-cursor" />
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-xl">{heroSlides[currentSlide].description}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8" onClick={() => navigateTo('aluminium-doors-design-prices')}>
                  Explore Products <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8">
                  <Play className="w-4 h-4 mr-2" /> Watch Video
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
          <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm" aria-label="Previous"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'}`} aria-label={`Slide ${index + 1}`} />
            ))}
          </div>
          <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm" aria-label="Next"><ChevronRight className="w-5 h-5" /></button>
        </div>

        {/* Scroll-down indicator */}
        <motion.div
          className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </section>

      {/* ===== ANIMATED COUNTER STATS (below hero) ===== */}
      <section className="bg-tostem-dark py-8 md:py-10 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <HeroStat value={50} suffix="+" label="Years Legacy" />
            <HeroStat value={10} suffix="M+" label="Windows Installed" />
            <HeroStat value={100} suffix="+" label="Quality Checks" />
            <HeroStat value={6} suffix="" label="Series Available" />
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#111]">
        <SectionDivider color="#f5f5f5" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label={aboutData.subtitle} title={aboutData.title} description={aboutData.description} />
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {aboutData.stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center p-6 rounded-xl bg-tostem-light-gray">
                <div className="text-3xl md:text-4xl font-black text-tostem-blue mb-1">{stat.number}</div>
                <div className="text-sm font-bold text-tostem-dark dark:text-gray-200 mb-1">{stat.label}</div>
                <div className="text-xs text-tostem-text-light">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-tostem-dark rounded-xl p-6 md:p-8 text-white relative overflow-hidden cursor-pointer" onClick={() => navigateTo('directors-message')}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-tostem-blue/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <span className="text-xs font-bold text-tostem-blue uppercase tracking-[0.2em]">Director&apos;s Message</span>
              <Quote className="w-8 h-8 text-tostem-blue/30 mt-4 mb-4" />
              <p className="text-sm text-white/70 leading-relaxed mb-6">{aboutData.directorMessage.message.slice(0, 300)}...</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tostem-blue/20 flex items-center justify-center text-tostem-blue font-bold">{aboutData.directorMessage.name[0]}</div>
                <div>
                  <div className="text-sm font-bold text-white">{aboutData.directorMessage.name}</div>
                  <div className="text-xs text-white/50">{aboutData.directorMessage.title}</div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="bg-tostem-light-gray rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigateTo('our-purpose-and-behaviour')}>
                <span className="text-xs font-bold text-tostem-blue uppercase tracking-[0.2em]">Our Purpose</span>
                <p className="text-sm text-tostem-text-light leading-relaxed mt-3">{aboutData.purposeValues.purpose}</p>
              </div>
              <div className="bg-tostem-light-gray rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigateTo('lixil-window-system')}>
                <span className="text-xs font-bold text-tostem-blue uppercase tracking-[0.2em]">LIXIL Window System</span>
                <p className="text-sm text-tostem-text-light leading-relaxed mt-3">{aboutData.lixilInfo.description.slice(0, 200)}...</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== WHY TOSTEM ===== */}
      <section className="py-16 md:py-24 bg-tostem-light-gray dark:bg-[#1a1a1a]">
        <SectionDivider color="#ffffff" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Why Tostem" title="The Tostem Advantage" description="Discover why architects, builders, and homeowners across India trust Tostem." />
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyTostemItems.map((item: WhyTostemItem) => (
              <motion.div key={item.title} variants={itemVariants} className="group rounded-xl p-[1px] cursor-pointer relative overflow-hidden bg-transparent hover:bg-gradient-to-br hover:from-tostem-blue hover:via-tostem-blue-light hover:to-tostem-blue transition-all duration-500" onClick={() => {
                const slugMap: Record<string, string> = { 'Japanese Innovation': 'japanese-innovation', 'Pre-Engineered System': 'pre-engineered-system-windows', 'Quality Assurance': 'quality-assurance-and-services', 'Anodized Aluminum': 'anodized-aluminum-windows-surface-colour-protection', 'Soundproof Insulated': 'soundproof-insulated-doors-and-windows', 'System Aluminum Windows': 'system-aluminum-windows' };
                navigateTo(slugMap[item.title] || 'japanese-innovation');
              }}>
                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 h-full shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 relative">
                  <div className="text-tostem-blue mb-4 group-hover:scale-110 transition-transform">{iconMap[item.icon]}</div>
                <h3 className="text-lg font-bold text-tostem-dark dark:text-gray-200 mb-2">{item.title}</h3>
                <p className="text-sm text-tostem-text-light dark:text-gray-400 leading-relaxed">{item.detailed}</p>
                <div className="mt-4 flex items-center gap-1 text-tostem-blue text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Learn More <ArrowRight className="w-3 h-3" /></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BEFORE/AFTER SLIDER ===== */}
      <BeforeAfterSlider />

      {/* ===== WARRANTY SHOWCASE ===== */}
      <WarrantyShowcase />

      {/* ===== PROCESS TIMELINE ===== */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#111] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Our Process" title="From Vision to Reality" description="A streamlined 4-step journey that ensures precision at every stage." />
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-tostem-blue/10 via-tostem-blue/40 to-tostem-blue/10 -translate-y-1/2" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                const isEven = i % 2 === 1;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="relative"
                  >
                    {/* Desktop: alternating top/bottom layout */}
                    <div className={`hidden lg:flex flex-col items-center ${isEven ? 'pt-16' : 'pb-16'}`}>
                      <div className={`flex flex-col items-center ${isEven ? 'order-2 mt-6' : 'order-1'}`}>
                        <div className="w-16 h-16 rounded-2xl bg-tostem-blue/10 flex items-center justify-center text-tostem-blue mb-3 group-hover:bg-tostem-blue group-hover:text-white transition-colors">
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-tostem-dark mb-1">{step.title}</h3>
                        <p className="text-sm text-tostem-text-light text-center max-w-[200px] leading-relaxed">{step.description}</p>
                      </div>
                      <div className={`flex items-center justify-center ${isEven ? 'order-1' : 'order-2'}`}>
                        <div className="w-12 h-12 rounded-full bg-tostem-blue text-white flex items-center justify-center font-black text-lg shadow-lg shadow-tostem-blue/20 relative z-10">
                          {step.step}
                        </div>
                      </div>
                    </div>

                    {/* Mobile: horizontal card layout */}
                    <div className="lg:hidden flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-tostem-blue text-white flex items-center justify-center font-black text-lg shadow-lg shadow-tostem-blue/20">
                          {step.step}
                        </div>
                        {i < processSteps.length - 1 && (
                          <div className="w-0.5 h-8 bg-tostem-blue/20 mx-auto mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="w-12 h-12 rounded-xl bg-tostem-blue/10 flex items-center justify-center text-tostem-blue mb-3">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-tostem-dark mb-1">{step.title}</h3>
                        <p className="text-sm text-tostem-text-light leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INSTALLATION TRACKER ===== */}
      <InstallationTracker />

      {/* ===== PRODUCTS ===== */}
      <section className="py-16 md:py-24 bg-tostem-light-gray dark:bg-[#1a1a1a]">
        <SectionDivider color="#ffffff" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Our Products" title="Premium Aluminium Solutions" description="From elegant windows to grand entrances, explore our comprehensive range." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.map((cat, i) => {
              const priceHints: Record<string, string> = { windows: '₹4,500', doors: '₹5,200', interior: '₹3,800', exterior: '₹6,100' };
              return (
              <motion.a key={cat.id} href={`#/${cat.id}`} onClick={(e) => { e.preventDefault(); navigateTo(cat.href); }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.03] border-2 border-transparent hover:border-tostem-blue/30 transition-all duration-300">
                <div className="aspect-[4/5] relative">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(${cat.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs text-tostem-blue font-bold tracking-wider uppercase">{cat.count} Products</span>
                    <h3 className="text-xl font-bold text-white mt-1">{cat.name}</h3>
                    <p className="text-sm text-white/70 mt-2 line-clamp-2">{cat.description}</p>
                    <span className="text-xs text-tostem-blue/80 font-semibold mt-1 block">Starting {priceHints[cat.id] || '₹4,500'}</span>
                    <div className="mt-3 flex items-center gap-1 text-tostem-blue text-sm font-medium group-hover:gap-2 transition-all explore-pulse">Explore <ArrowRight className="w-3 h-3" /></div>
                  </div>
                </div>
              </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT FINDER ===== */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#111] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tostem-blue rounded-full blur-3xl" />
        </div>
        <div className="max-w-[800px] mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-tostem-blue/10 text-tostem-blue text-xs px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3 h-3 mr-1.5" /> AI-Powered
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-tostem-dark dark:text-white mb-3">
              Find Your Perfect Product
            </h2>
            <p className="text-base md:text-lg text-tostem-text-light dark:text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto">
              Not sure which product is right for you? Answer 3 simple questions and get personalized recommendations.
            </p>
            <Button
              size="lg"
              className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8 shadow-lg shadow-tostem-blue/20"
              onClick={() => setWizardOpen(true)}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Start Product Finder <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== RECOMMENDATION ENGINE CTA ===== */}
      <section className="py-8 md:py-12 bg-white dark:bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <RecommendationCTA />
        </div>
      </section>

      {/* ===== PRICE ESTIMATOR CTA ===== */}
      <section className="py-10 md:py-16 bg-white dark:bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <PriceEstimatorCTA onClick={() => setEstimatorOpen(true)} />
        </div>
      </section>

      {/* ===== SERIES ===== */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#111]">
        <SectionDivider color="#2E5A87" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Our Series" title="Choose Your Series" description="Tostem offers multiple series, each tailored to different needs and budgets." />
          <Tabs defaultValue="atis" className="w-full">
            <TabsList className="mx-auto mb-8 bg-tostem-light-gray rounded-xl p-1 h-auto flex-wrap gap-1">
              {seriesData.map((series) => (
                <TabsTrigger key={series.id} value={series.id} className="px-6 py-3 text-sm font-semibold data-[state=active]:bg-tostem-blue data-[state=active]:text-white rounded-lg data-[state=active]:border-b-2 data-[state=active]:border-tostem-blue transition-all duration-300">{series.name}</TabsTrigger>
              ))}
            </TabsList>
            {seriesData.map((series) => (
              <TabsContent key={series.id} value={series.id} className="transition-all duration-300">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] cursor-pointer" onClick={() => navigateTo(`${series.id}-windows-doors-series`)}>
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${series.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <Badge className="bg-tostem-blue text-white mb-3">{series.tagline}</Badge>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{series.name}</h3>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">{series.detailedDescription}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-tostem-dark mb-4">Key Features</h4>
                      <ul className="space-y-3">
                        {series.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm text-tostem-text-light"><CheckCircle className="w-4 h-4 text-tostem-blue mt-0.5 flex-shrink-0" />{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-tostem-dark mb-4">Technical Specifications</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {series.specifications.map((spec) => (
                          <div key={spec.label} className="bg-tostem-light-gray rounded-lg p-3 border border-gray-100"><div className="text-xs text-tostem-text-muted">{spec.label}</div><div className="text-sm font-bold text-tostem-dark mt-1">{spec.value}</div></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ===== PROJECT CALCULATOR CTA ===== */}
      <section className="py-8 md:py-12 bg-white dark:bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <ProjectCalculatorCTA />
        </div>
      </section>

      {/* ===== DESIGNS GRID ===== */}
      <section className="py-16 md:py-24 bg-tostem-light-gray dark:bg-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Designs" title="Explore Our Designs" description="From classic to contemporary, our design catalogue covers every architectural vision." />
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {(showAllDesigns ? designsData : designsData.slice(0, 8)).map((design) => (
              <motion.div key={design.id} variants={itemVariants} className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.03] border-2 border-transparent hover:border-tostem-blue/30 transition-all duration-300" onClick={() => navigateTo(design.slug)}>
                <div className="aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(${design.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 left-3"><Badge className="bg-tostem-blue/90 text-white text-[10px]">{design.category}</Badge></div>
                  <DesignQuickViewButton onClick={(e) => { e.stopPropagation(); setQuickViewDesign(design); setQuickViewOpen(true); }} />
                  <CompareCheckbox isSelected={comparisonItems.some((c) => c.id === design.id)} isDisabled={comparisonItems.length >= 3 && !comparisonItems.some((c) => c.id === design.id)} onClick={(e) => { e.stopPropagation(); toggleComparisonItem(design); }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm font-bold text-white leading-tight">{design.name}</h3>
                    <p className="text-xs text-white/60 mt-1 line-clamp-2">{design.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {!showAllDesigns && designsData.length > 8 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <Button
                className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8"
                onClick={() => setShowAllDesigns(true)}
              >
                Show All Designs ({designsData.length}) <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== VIDEO ===== */}
      <section className="py-16 md:py-24 bg-tostem-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"><div className="absolute top-0 left-1/4 w-96 h-96 bg-tostem-blue rounded-full blur-3xl" /><div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tostem-blue rounded-full blur-3xl" /></div>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
          <SectionHeading label="Watch & Learn" title="Japanese Innovation in Action" description="Discover how Tostem brings Japanese philosophy of monozukuri to every window and door." light />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-tostem-blue/20 to-tostem-dark flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-full bg-tostem-blue flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-tostem-blue/30"><Play className="w-8 h-8 text-white ml-1" /></div>
                <h3 className="text-xl font-bold text-white mb-2">The Tostem Story</h3>
                <p className="text-sm text-white/60 max-w-md mx-auto">Watch how our Japanese engineering and pre-engineered system creates windows that transform Indian homes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TADA AWARDS ===== */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Awards & Recognition" title="TADA Award Winners" description="Tostem's commitment to excellence has been recognized with multiple industry awards." />
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tadaAwards.map((award) => (
              <motion.div key={award.id} variants={itemVariants} className="bg-tostem-light-gray rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigateTo('tada-2025')}>
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
          </motion.div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-16 md:py-24 bg-tostem-light-gray dark:bg-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Project Gallery" title="Our Work Speaks" description="Browse through our collection of residential, commercial, interior, and exterior projects." />
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {galleryCategories.map((cat) => (
              <Button key={cat} variant={galleryFilter === cat ? 'default' : 'outline'} size="sm" className={galleryFilter === cat ? 'bg-tostem-blue text-white hover:bg-tostem-blue-light' : 'border-gray-300 text-tostem-text-light'} onClick={() => setGalleryFilter(cat)}>{cat}</Button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={galleryFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredGallery.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover-lift card-shine" onClick={() => navigateTo('gallery')}>
                  <div className="aspect-[4/3] relative">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        y: scrollY * (0.05 + (i % 3) * 0.02),
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Badge className="bg-tostem-blue/80 text-white text-[10px] mb-2">{item.category}</Badge>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-white/60 mt-1">{item.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Knowledge Centre" title="Latest from Our Blog" description="Stay informed with expert insights and the latest trends." />
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <motion.article key={post.id} variants={itemVariants} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-tostem-blue/30 cursor-pointer" onClick={() => navigateTo('blog')}>
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
          </motion.div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-16 md:py-20 bg-tostem-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-tostem-blue rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-tostem-blue rounded-full blur-3xl" />
        </div>
        <div className="max-w-[800px] mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-tostem-blue" />
              <span className="text-xs font-bold text-tostem-blue uppercase tracking-[0.2em]">Newsletter</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3">Stay Updated with Tostem</h2>
            <p className="text-sm md:text-base text-white/60 mb-2">Get the latest insights on aluminium windows, design trends, and exclusive offers.</p>
            <p className="text-xs text-white/40 mb-8">Join 10,000+ architects and homeowners</p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-tostem-blue/20 border border-tostem-blue/30 rounded-xl p-6"
              >
                <CheckCircle className="w-10 h-10 text-tostem-blue mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Thank you for subscribing!</h3>
                <p className="text-sm text-white/60">You&apos;ll receive our next newsletter soon.</p>
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:border-tostem-blue focus-visible:ring-tostem-blue/30 rounded-lg px-4"
                />
                <Button
                  size="lg"
                  className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8 h-12 rounded-lg whitespace-nowrap"
                  onClick={() => { if (email.includes('@')) setSubscribed(true); }}
                >
                  Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            <div className="flex items-center justify-center gap-6 mt-8 text-white/30 text-xs">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> No spam</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Unsubscribe anytime</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 10K+ subscribers</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ENHANCED FAQ ===== */}
      <FAQSection />

      {/* ===== CHANNEL PARTNERS ===== */}
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Our Partners" title="Trusted by Industry Leaders" description="Partnering with India's top developers and builders to deliver excellence." />
        </div>
        {/* Marquee container */}
        <div className="relative mt-8">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Row 1 - scrolling left */}
          <div className="flex mb-4">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -1200] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((name, i) => (
                <div
                  key={`row1-${i}`}
                  className="flex-shrink-0 flex items-center justify-center w-44 md:w-56 h-20 md:h-24 rounded-xl border border-gray-100 bg-tostem-light-gray/50 hover:border-tostem-blue/20 hover:shadow-md transition-all duration-300 px-4"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-5 h-5 text-tostem-blue/40 flex-shrink-0" />
                    <span className="text-sm md:text-base font-bold text-tostem-dark/60 whitespace-nowrap">{name}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - scrolling right */}
          <div className="flex">
            <motion.div
              className="flex gap-6"
              animate={{ x: [-1200, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...partnerLogos.slice().reverse(), ...partnerLogos.slice().reverse(), ...partnerLogos.slice().reverse()].map((name, i) => (
                <div
                  key={`row2-${i}`}
                  className="flex-shrink-0 flex items-center justify-center w-44 md:w-56 h-20 md:h-24 rounded-xl border border-gray-100 bg-tostem-light-gray/50 hover:border-tostem-blue/20 hover:shadow-md transition-all duration-300 px-4"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-5 h-5 text-tostem-blue/40 flex-shrink-0" />
                    <span className="text-sm md:text-base font-bold text-tostem-dark/60 whitespace-nowrap">{name}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS CAROUSEL ===== */}
      <section className="py-16 md:py-24 bg-tostem-light-gray"
        onMouseEnter={() => setTestimonialPaused(true)}
        onMouseLeave={() => setTestimonialPaused(false)}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionHeading label="Testimonials" title="What Our Clients Say" description="Hear from architects, builders, and homeowners who have experienced the Tostem difference." />
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={() => { setTestimonialDirection(-1); setTestimonialIndex((prev) => Math.max(0, prev - 1)); }}
              disabled={testimonialIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-tostem-dark hover:bg-tostem-blue hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none hidden md:flex"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setTestimonialDirection(1); setTestimonialIndex((prev) => Math.min(maxTestimonialIndex, prev + 1)); }}
              disabled={testimonialIndex >= maxTestimonialIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-tostem-dark hover:bg-tostem-blue hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none hidden md:flex"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Carousel viewport */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: testimonialDirection * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: testimonialDirection * -80 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {testimonials.slice(testimonialIndex, testimonialIndex + testimonialsPerView).map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      className="bg-white rounded-xl p-6 relative hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-tostem-blue/20"
                      onClick={() => navigateTo('testimonials')}
                      whileHover={{ y: -4 }}
                    >
                      <Quote className="w-8 h-8 text-tostem-blue/15 absolute top-4 right-4" />
                      <div className="flex gap-0.5 mb-3">{Array.from({ length: testimonial.rating }).map((_, j) => (<Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}</div>
                      <p className="text-sm text-tostem-text-light leading-relaxed mb-4 line-clamp-5">{testimonial.text}</p>
                      <div className="text-xs text-tostem-blue font-medium mb-3">{testimonial.project}</div>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-tostem-blue/10 flex items-center justify-center text-tostem-blue font-bold text-sm">{testimonial.name[0]}</div>
                        <div><div className="text-sm font-bold text-tostem-dark">{testimonial.name}</div><div className="text-xs text-tostem-text-muted">{testimonial.role}, {testimonial.location}</div></div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxTestimonialIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setTestimonialDirection(idx > testimonialIndex ? 1 : -1); setTestimonialIndex(idx); }}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === testimonialIndex ? 'w-6 bg-tostem-blue' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CUSTOMER STORIES ===== */}
      <CustomerStories />

      {/* ===== RECENTLY VIEWED ===== */}
      <RecentlyViewed />

      {/* ===== SOCIAL PROOF STRIP ===== */}
      <section className="py-8 md:py-10 bg-tostem-blue/5 dark:bg-tostem-blue/10 border-y border-tostem-blue/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['bg-tostem-blue/80', 'bg-tostem-blue-light/80', 'bg-tostem-dark/60', 'bg-amber-600/70', 'bg-emerald-600/70'].map((bg, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white dark:border-[#111] flex items-center justify-center text-white text-[10px] font-bold`}>
                    {['A', 'R', 'S', 'P', 'M'][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm font-bold text-tostem-dark dark:text-gray-200">10,000+</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-tostem-blue/20" />
            <p className="text-sm text-tostem-text-light dark:text-gray-400 text-center">
              Trusted by <span className="font-bold text-tostem-dark dark:text-gray-200">10,000+ homeowners</span>, <span className="font-bold text-tostem-dark dark:text-gray-200">500+ architects</span>, and <span className="font-bold text-tostem-dark dark:text-gray-200">200+ builders</span> across India
            </p>
            <div className="hidden md:block w-px h-6 bg-tostem-blue/20" />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm font-bold text-tostem-dark dark:text-gray-200 ml-1">4.8/5</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-24 bg-tostem-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute -top-20 -right-20 w-96 h-96 bg-tostem-blue rounded-full blur-3xl" /><div className="absolute -bottom-20 -left-20 w-96 h-96 bg-tostem-blue rounded-full blur-3xl" /></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          {/* Decorative vertical lines */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Transform Your Home?</h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">Get a free consultation and quotation for premium Tostem aluminium windows and doors.</p>
            </div>
            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>
          {/* Buttons with glow */}
          <div className="flex flex-wrap justify-center gap-4 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-16 bg-tostem-blue/20 rounded-full blur-2xl" />
            </div>
            <Button size="lg" className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8 relative z-10" onClick={() => navigateTo('contact')}>Get Free Quotation <ArrowRight className="w-4 h-4 ml-2" /></Button>
            <Button size="lg" className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8 relative z-10" onClick={() => navigateTo('contact')}>Contact Us <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewDesign && (
        <DesignQuickViewModal
          design={quickViewDesign}
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
        />
      )}

      {/* Comparison Bar & Dialog */}
      <ComparisonBar
        selectedItems={comparisonItems}
        onRemoveItem={removeComparisonItem}
        onCompareNow={() => setComparisonOpen(true)}
        onClearAll={() => setComparisonItems([])}
      />
      <ComparisonDialog
        items={comparisonItems}
        open={comparisonOpen}
        onOpenChange={setComparisonOpen}
      />

      {/* Product Wizard */}
      <ProductWizard open={wizardOpen} onOpenChange={setWizardOpen} />

      {/* Price Estimator */}
      <PriceEstimator open={estimatorOpen} onOpenChange={setEstimatorOpen} />
    </div>
  );
}
