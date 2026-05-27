'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Leaf, Clock, BadgeCheck } from 'lucide-react';

// ====== Certification Data ======
const certifications = [
  {
    id: 'iso9001',
    title: 'ISO 9001',
    subtitle: 'Quality Management',
    description: 'Internationally recognized standard for quality management systems, ensuring consistent product quality.',
    icon: ShieldCheck,
    percentage: 100,
    color: '#2E5A87',
  },
  {
    id: 'iso14001',
    title: 'ISO 14001',
    subtitle: 'Environmental Management',
    description: 'Certified environmental management system demonstrating our commitment to sustainability.',
    icon: Leaf,
    percentage: 100,
    color: '#3a6fa3',
  },
  {
    id: 'jis',
    title: 'JIS Certified',
    subtitle: 'Japanese Industrial Standards',
    description: 'Products meet the rigorous Japanese Industrial Standards for aluminium windows and doors.',
    icon: BadgeCheck,
    percentage: 100,
    color: '#2E5A87',
  },
  {
    id: 'warranty',
    title: '10-Year Warranty',
    subtitle: 'Frame Warranty',
    description: 'Comprehensive 10-year warranty on frames and 5-year warranty on hardware and moving parts.',
    icon: Clock,
    percentage: 100,
    color: '#3a6fa3',
  },
];

// ====== Animated Ring Component ======
function ProgressRing({
  percentage,
  color,
  size = 100,
  strokeWidth = 6,
  delay = 0,
}: {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  delay?: number;
}) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      let start = 0;
      const animate = () => {
        start += 2;
        if (start >= percentage) {
          setAnimatedPercentage(percentage);
          return;
        }
        setAnimatedPercentage(start);
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, percentage, delay]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-black" style={{ color }}>{animatedPercentage}%</span>
      </div>
    </div>
  );
}

// ====== Main Component (Homepage Section) ======
export default function WarrantyShowcase() {
  return (
    <section className="py-16 md:py-20 bg-tostem-light-gray dark:bg-[#1a1a1a] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="w-6 h-6 text-tostem-blue" />
            <span className="text-xs font-bold text-tostem-blue uppercase tracking-[0.2em]">Certifications & Warranty</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-tostem-dark dark:text-white mb-2">
            Quality You Can Trust
          </h2>
          <p className="text-sm md:text-base text-tostem-text-light dark:text-gray-400 max-w-lg mx-auto">
            Every Tostem product is backed by international certifications and a comprehensive warranty, giving you complete peace of mind.
          </p>
        </motion.div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#111] rounded-xl p-6 text-center shadow-sm hover:shadow-lg border border-transparent hover:border-tostem-blue/20 transition-all duration-300 group"
              >
                {/* Progress Ring */}
                <div className="mb-4 flex justify-center">
                  <ProgressRing
                    percentage={cert.percentage}
                    color={cert.color}
                    size={90}
                    strokeWidth={5}
                    delay={index * 200}
                  />
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-tostem-blue/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-tostem-blue group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5 text-tostem-blue group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-tostem-dark dark:text-white mb-1">{cert.title}</h3>
                <p className="text-xs font-semibold text-tostem-blue uppercase tracking-wider mb-2">{cert.subtitle}</p>
                <p className="text-xs text-tostem-text-light dark:text-gray-400 leading-relaxed">{cert.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 bg-white dark:bg-[#111] rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-tostem-blue/10"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-tostem-blue" />
            <div>
              <h4 className="text-sm font-bold text-tostem-dark dark:text-white">100+ Quality Checks at Every Stage</h4>
              <p className="text-xs text-tostem-text-light dark:text-gray-400">From raw material inspection to final product testing</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 bg-tostem-blue/10 px-3 py-1.5 rounded-full text-tostem-blue font-semibold">
              <Award className="w-3 h-3" /> 6 TADA Awards
            </div>
            <div className="flex items-center gap-1 bg-tostem-blue/10 px-3 py-1.5 rounded-full text-tostem-blue font-semibold">
              <Leaf className="w-3 h-3" /> Eco-Friendly
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ====== Compact Component for Design Pages ======
export function WarrantyShowcaseCompact() {
  return (
    <div className="bg-tostem-light-gray dark:bg-[#1a1a1a] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-tostem-blue" />
        <h3 className="text-sm font-bold text-tostem-dark dark:text-white uppercase tracking-wider">
          Certifications & Warranty
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {certifications.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white dark:bg-[#111] rounded-lg p-3 text-center"
            >
              <div className="flex justify-center mb-2">
                <ProgressRing
                  percentage={cert.percentage}
                  color={cert.color}
                  size={56}
                  strokeWidth={3}
                  delay={index * 150}
                />
              </div>
              <Icon className="w-4 h-4 text-tostem-blue mx-auto mb-1" />
              <div className="text-xs font-bold text-tostem-dark dark:text-gray-200">{cert.title}</div>
              <div className="text-[10px] text-tostem-text-muted">{cert.subtitle}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-tostem-text-light dark:text-gray-400 bg-white dark:bg-[#111] rounded-lg p-3">
        <ShieldCheck className="w-4 h-4 text-tostem-blue flex-shrink-0" />
        <span>100+ quality checks • 10-year frame warranty • 5-year hardware warranty</span>
      </div>
    </div>
  );
}
