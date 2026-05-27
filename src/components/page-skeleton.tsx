'use client';

import { motion } from 'framer-motion';

interface PageSkeletonProps {
  variant?: 'home' | 'generic';
}

export default function PageSkeleton({ variant = 'generic' }: PageSkeletonProps) {
  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero skeleton */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <motion.div
          className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 flex items-center px-6 lg:px-12">
          <div className="space-y-4 max-w-lg">
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded-lg h-4 w-32" />
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded-lg h-10 w-3/4" />
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded-lg h-6 w-2/3" />
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded-lg h-4 w-full" />
            <div className="flex gap-3 mt-4">
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded-lg h-10 w-36" />
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded-lg h-10 w-32" />
            </div>
          </div>
        </div>
      </div>

      {variant === 'home' ? (
        <>
          {/* Stats skeleton */}
          <div className="bg-tostem-dark py-8 md:py-10">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center">
                    <div className="animate-pulse bg-gray-600 rounded-lg h-10 w-20 mx-auto mb-2" />
                    <div className="animate-pulse bg-gray-700 rounded-lg h-3 w-16 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content blocks skeleton */}
          <div className="py-16 md:py-24">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 space-y-16">
              {[1, 2, 3].map((block) => (
                <div key={block}>
                  <div className="flex flex-col items-center mb-8">
                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-3 w-24 mb-3" />
                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-8 w-64 mb-3" />
                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-4 w-80" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((card) => (
                      <div key={card} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-64" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Generic page content skeleton */
        <div className="py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-5 w-3/4 mb-3" />
                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-4 w-full mb-2" />
                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-4 w-5/6 mb-2" />
                    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-4 w-2/3" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-48" />
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-32" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
