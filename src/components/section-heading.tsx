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
          'text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2',
          light ? 'text-tostem-blue' : 'text-tostem-blue'
        )}
      >
        <span className={cn(
          'w-[3px] h-4 rounded-full inline-block',
          light ? 'bg-tostem-blue' : 'bg-tostem-blue'
        )} />
        {label}
        <span className={cn(
          'w-[3px] h-4 rounded-full inline-block',
          light ? 'bg-tostem-blue' : 'bg-tostem-blue'
        )} />
      </span>
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-black mt-3 mb-4',
          light ? 'text-white' : 'text-tostem-dark'
        )}
      >
        {/* Decorative dots before title */}
        <span className={cn('inline-flex items-center gap-1 mr-3 align-middle', light ? 'opacity-30' : 'opacity-20')}>
          <span className="w-1 h-1 rounded-full bg-tostem-blue inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-tostem-blue inline-block" />
          <span className="w-1 h-1 rounded-full bg-tostem-blue inline-block" />
        </span>
        <span className={light ? '' : 'text-gradient-animate'}>
          {title}
        </span>
        {/* Decorative dots after title */}
        <span className={cn('inline-flex items-center gap-1 ml-3 align-middle', light ? 'opacity-30' : 'opacity-20')}>
          <span className="w-1 h-1 rounded-full bg-tostem-blue inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-tostem-blue inline-block" />
          <span className="w-1 h-1 rounded-full bg-tostem-blue inline-block" />
        </span>
      </h2>
      {/* Decorative gradient underline */}
      <div className={cn('flex items-center gap-2 mb-6', align === 'center' ? 'justify-center' : 'justify-start')}>
        <div className={cn('w-3 h-0.5 rounded-full', light ? 'bg-tostem-blue/40' : 'bg-tostem-blue/30')} />
        <div
          className={cn(
            'h-1 rounded-full',
            light
              ? 'bg-gradient-to-r from-tostem-blue/40 via-tostem-blue to-tostem-blue/40'
              : 'bg-gradient-to-r from-tostem-blue/30 via-tostem-blue to-tostem-blue/30'
          )}
          style={{ width: '100px' }}
        />
        <div className={cn('w-3 h-0.5 rounded-full', light ? 'bg-tostem-blue/40' : 'bg-tostem-blue/30')} />
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
