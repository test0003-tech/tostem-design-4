'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/section-heading';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPositionFromEvent = useCallback((e: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    return Math.min(Math.max((x / rect.width) * 100, 5), 95);
  }, []);

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setSliderPosition(getPositionFromEvent(e));
  }, [isDragging, getPositionFromEvent]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const event = 'nativeEvent' in e ? e.nativeEvent : e;
    setSliderPosition(getPositionFromEvent(event as MouseEvent | TouchEvent));
  }, [getPositionFromEvent]);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#111]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Compare"
          title="See the Tostem Difference"
          description="Drag the slider to compare conventional windows with Tostem pre-engineered windows."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Slider Container */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden cursor-col-resize select-none shadow-xl border border-gray-200 dark:border-gray-800"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            role="slider"
            aria-label="Before and after comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
          >
            {/* After Image (Tostem) - Full width behind */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* After label */}
              <div className="absolute bottom-4 right-4 bg-tostem-blue/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                After: Tostem Pre-Engineered Window
              </div>
            </div>

            {/* Before Image (Conventional) - Clipped */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Before label */}
              <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                Before: Conventional Window
              </div>
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-tostem-blue hover:scale-110 transition-transform">
                <div className="flex items-center gap-0.5">
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-tostem-blue" />
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-tostem-blue" />
                </div>
              </div>
            </div>

            {/* Side labels */}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-gray-800/80 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-md text-xs font-semibold">
                Conventional
              </span>
            </div>
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-tostem-blue/80 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-md text-xs font-semibold">
                Tostem
              </span>
            </div>
          </div>

          {/* Comparison points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Precision Fit', before: 'Gaps & uneven sealing', after: 'Factory-perfect alignment' },
              { label: 'Weather Sealing', before: 'Prone to water ingress', after: 'Multi-point sealing system' },
              { label: 'Durability', before: 'Corrosion & wear over time', after: 'Anodized surface protection' },
            ].map((point) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-tostem-light-gray dark:bg-[#1a1a1a] rounded-lg p-4 text-center"
              >
                <div className="text-sm font-bold text-tostem-dark dark:text-white mb-2">{point.label}</div>
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-red-500/80 line-through">{point.before}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-tostem-blue font-semibold">{point.after}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
