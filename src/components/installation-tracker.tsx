'use client';

import { motion } from 'framer-motion';
import { ClipboardCheck, PencilRuler, Factory, ShieldCheck, Truck, Wrench } from 'lucide-react';
import SectionHeading from '@/components/section-heading';

const installationSteps = [
  {
    icon: ClipboardCheck,
    title: 'Site Survey',
    duration: '1-2 Days',
    description: 'Expert technicians visit your site to take precise measurements and assess installation requirements.',
    status: 'completed' as const,
  },
  {
    icon: PencilRuler,
    title: 'Design Finalization',
    duration: '3-5 Days',
    description: 'Choose from 100+ designs, finalize colours, hardware, and glazing options with our design consultant.',
    status: 'completed' as const,
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    duration: '7-10 Days',
    description: 'Pre-engineered in our state-of-the-art factory with Japanese precision and 100+ quality checks.',
    status: 'current' as const,
  },
  {
    icon: ShieldCheck,
    title: 'Quality Check',
    duration: '1-2 Days',
    description: 'Every product undergoes rigorous quality inspection before leaving the factory floor.',
    status: 'upcoming' as const,
  },
  {
    icon: Truck,
    title: 'Delivery',
    duration: '2-3 Days',
    description: 'Safe and secure delivery to your site with specialized packaging and handling.',
    status: 'upcoming' as const,
  },
  {
    icon: Wrench,
    title: 'Installation',
    duration: '1-2 Days',
    description: 'Professional installation by certified technicians ensuring perfect fit and finish.',
    status: 'upcoming' as const,
  },
];

export default function InstallationTracker() {
  const currentStepIndex = installationSteps.findIndex((s) => s.status === 'current');
  const progressPercent = ((currentStepIndex + 0.5) / installationSteps.length) * 100;

  return (
    <section className="py-16 md:py-24 bg-tostem-light-gray dark:bg-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Installation Process"
          title="Your Project Journey"
          description="Track every step of your Tostem installation from survey to completion."
        />
        <div className="max-w-5xl mx-auto">
          {/* Progress bar */}
          <div className="relative mb-12 md:mb-16">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-tostem-blue to-tostem-blue-light rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>
            {/* Step markers on progress bar */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
              {installationSteps.map((step, i) => {
                const position = (i / (installationSteps.length - 1)) * 100;
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';
                return (
                  <motion.div
                    key={step.title}
                    className="relative"
                    style={{ position: 'absolute', left: `${position}%`, transform: 'translateX(-50%)' }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <div
                      className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 ${
                        isCompleted
                          ? 'bg-tostem-blue border-tostem-blue'
                          : isCurrent
                          ? 'bg-tostem-blue-light border-tostem-blue animate-pulse'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installationSteps.map((step, i) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative rounded-xl p-6 border-2 transition-all duration-300 ${
                    isCurrent
                      ? 'bg-white dark:bg-[#222] border-tostem-blue shadow-lg shadow-tostem-blue/10 scale-[1.02]'
                      : isCompleted
                      ? 'bg-white dark:bg-[#1a1a1a] border-tostem-blue/30'
                      : 'bg-white/60 dark:bg-[#1a1a1a]/60 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {/* Status badge */}
                  {isCurrent && (
                    <div className="absolute -top-3 right-4">
                      <span className="bg-tostem-blue text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                        IN PROGRESS
                      </span>
                    </div>
                  )}
                  {isCompleted && (
                    <div className="absolute -top-3 right-4">
                      <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                        COMPLETED
                      </span>
                    </div>
                  )}

                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black ${
                        isCompleted
                          ? 'bg-tostem-blue text-white'
                          : isCurrent
                          ? 'bg-tostem-blue-light text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-xs text-tostem-text-muted dark:text-gray-500 font-medium">
                      {step.duration}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                      isCurrent
                        ? 'bg-tostem-blue/10 text-tostem-blue'
                        : isCompleted
                        ? 'bg-tostem-blue/10 text-tostem-blue/70'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3
                    className={`text-base font-bold mb-1 ${
                      isCurrent
                        ? 'text-tostem-blue'
                        : isCompleted
                        ? 'text-tostem-dark dark:text-gray-200'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isCurrent
                        ? 'text-tostem-text-light dark:text-gray-400'
                        : isCompleted
                        ? 'text-tostem-text-light dark:text-gray-400'
                        : 'text-gray-400 dark:text-gray-600'
                    }`}
                  >
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Estimated total time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white dark:bg-[#222] rounded-xl px-6 py-4 shadow-md border border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-full bg-tostem-blue/10 flex items-center justify-center">
                <span className="text-lg">⏱️</span>
              </div>
              <div className="text-left">
                <div className="text-xs text-tostem-text-muted dark:text-gray-500 font-medium">Estimated Total Time</div>
                <div className="text-lg font-black text-tostem-dark dark:text-white">15-24 Working Days</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
