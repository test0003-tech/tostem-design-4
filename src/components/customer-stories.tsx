'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';

interface CustomerStory {
  id: number;
  projectName: string;
  location: string;
  productType: string;
  image: string;
  description: string;
  completionDate: string;
  rating: number;
  clientName: string;
  projectSize: string;
}

const customerStories: CustomerStory[] = [
  {
    id: 1,
    projectName: 'Sharma Residence',
    location: 'Mumbai',
    productType: 'Sliding Windows',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    description: 'Complete home renovation with Tostem ATIS series sliding windows. Achieved 40dB sound reduction facing a busy street, transforming the living experience.',
    completionDate: 'Oct 2024',
    rating: 5,
    clientName: 'Rajesh Sharma',
    projectSize: '3,200 sq ft',
  },
  {
    id: 2,
    projectName: 'ITC Hotel Renovation',
    location: 'Bangalore',
    productType: 'Curtain Walls',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    description: 'Premium curtain wall facade installation for the hotel lobby. The Tostem GRANTS series delivered unmatched thermal insulation and aesthetics.',
    completionDate: 'Aug 2024',
    rating: 5,
    clientName: 'ITC Hotels Group',
    projectSize: '15,000 sq ft',
  },
  {
    id: 3,
    projectName: 'Patel Villa',
    location: 'Ahmedabad',
    productType: 'French Windows',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    description: 'Elegant French windows throughout this luxury villa, providing panoramic garden views with excellent ventilation and security features.',
    completionDate: 'Sep 2024',
    rating: 4,
    clientName: 'Amit Patel',
    projectSize: '5,500 sq ft',
  },
  {
    id: 4,
    projectName: 'Prestige Tech Park',
    location: 'Hyderabad',
    productType: 'Store Front Systems',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    description: 'Large-scale commercial installation with Tostem store front systems across 3 towers. Superior weather performance and sleek modern design.',
    completionDate: 'Jul 2024',
    rating: 5,
    clientName: 'Prestige Group',
    projectSize: '45,000 sq ft',
  },
  {
    id: 5,
    projectName: 'Gupta Residence',
    location: 'Delhi',
    productType: 'Slide-Fold Doors',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    description: 'Premium slide-fold doors connecting the living room to the patio. Seamless indoor-outdoor living with Tostem GIESTA series entrance doors.',
    completionDate: 'Nov 2024',
    rating: 5,
    clientName: 'Vikram Gupta',
    projectSize: '4,000 sq ft',
  },
  {
    id: 6,
    projectName: 'Lodha Bellissimo',
    location: 'Pune',
    productType: 'Casement Windows',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    description: 'Full residential tower fit-out with 200+ Tostem casement windows. Residents report significant noise reduction and energy savings.',
    completionDate: 'Dec 2024',
    rating: 4,
    clientName: 'Lodha Group',
    projectSize: '60,000 sq ft',
  },
];

export default function CustomerStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [cardsPerView, setCardsPerView] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const updatePerView = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };
    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, []);

  const maxIndex = Math.max(0, customerStories.length - cardsPerView);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, maxIndex]);

  const goTo = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const visibleStories = customerStories.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section
      className="py-16 md:py-24 bg-white dark:bg-[#111]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Customer Stories"
          title="Projects That Inspire"
          description="Real projects, real results. See how Tostem windows and doors transform spaces across India."
        />
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-[#222] shadow-md flex items-center justify-center text-tostem-dark dark:text-gray-200 hover:bg-tostem-blue hover:text-white transition-colors hidden md:flex"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-[#222] shadow-md flex items-center justify-center text-tostem-dark dark:text-gray-200 hover:bg-tostem-blue hover:text-white transition-colors hidden md:flex"
            aria-label="Next story"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleStories.map((story) => (
                  <motion.div
                    key={story.id}
                    className="group bg-tostem-light-gray dark:bg-[#1a1a1a] rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-tostem-blue/20"
                    whileHover={{ y: -4 }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${story.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-tostem-blue/90 text-white text-[10px]">{story.productType}</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white">{story.projectName}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < story.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-tostem-text-muted dark:text-gray-500 ml-1">
                          {story.rating}.0
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-tostem-text-light dark:text-gray-400 leading-relaxed line-clamp-3 mb-4">
                        {story.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-tostem-text-muted dark:text-gray-500 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {story.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {story.completionDate}
                        </div>
                      </div>

                      {/* Client & Size */}
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="font-medium text-tostem-dark dark:text-gray-300">{story.clientName}</span>
                        <span className="text-tostem-text-muted dark:text-gray-500">{story.projectSize}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-6 bg-tostem-blue'
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
