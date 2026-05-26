'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  description,
  light = false,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        'max-w-3xl mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      )}
    >
      <span
        className={cn(
          'text-xs font-bold uppercase tracking-[0.2em]',
          light ? 'text-tostem-blue' : 'text-tostem-blue'
        )}
      >
        {label}
      </span>
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-black mt-3 mb-4',
          light ? 'text-white' : 'text-tostem-dark'
        )}
      >
        {title}
      </h2>
      {/* Decorative gradient underline */}
      <div className={cn('flex mb-6', align === 'center' ? 'justify-center' : 'justify-start')}>
        <div
          className={cn(
            'h-1 rounded-full',
            light
              ? 'bg-gradient-to-r from-tostem-blue/40 via-tostem-blue to-tostem-blue/40'
              : 'bg-gradient-to-r from-tostem-blue/30 via-tostem-blue to-tostem-blue/30'
          )}
          style={{ width: '80px' }}
        />
      </div>
      {description && (
        <p
          className={cn(
            'leading-relaxed',
            light ? 'text-white/60' : 'text-tostem-text-light'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
