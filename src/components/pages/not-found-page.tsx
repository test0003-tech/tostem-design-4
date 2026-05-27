'use client';

import { motion } from 'framer-motion';
import { Home, DoorOpen, ArrowRight, Search, DoorClosed, RectangleHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

function navigateTo(slug: string) {
  if (slug === 'home') {
    window.location.hash = '';
  } else {
    window.location.hash = `/${slug}`;
  }
}

const popularLinks = [
  { label: 'Windows', href: 'aluminium-windows-design-prices', icon: RectangleHorizontal },
  { label: 'Doors', href: 'aluminium-doors-design-prices', icon: DoorClosed },
  { label: 'ATIS Series', href: 'atis-windows-doors-series', icon: DoorOpen },
  { label: 'Contact Us', href: 'contact', icon: Home },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function NotFoundPage() {
  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('tostem:open-search'));
  };

  return (
    <div className="pt-[88px] lg:pt-[132px] min-h-screen flex items-center justify-center bg-white dark:bg-[#111]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto px-4 py-16 text-center"
      >
        {/* Animated 404 Text */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-tostem-blue to-tostem-blue-light bg-clip-text text-transparent leading-none">
            404
          </span>
        </motion.div>

        {/* Animated Illustration */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-20 rounded-t-lg border-2 border-tostem-blue/30 bg-tostem-blue/5 flex items-center justify-center"
          >
            <RectangleHorizontal className="w-8 h-8 text-tostem-blue/60" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="w-12 h-24 rounded-t-lg border-2 border-tostem-blue/30 bg-tostem-blue/5 flex items-center justify-center"
          >
            <DoorOpen className="w-6 h-6 text-tostem-blue/60" />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-tostem-dark dark:text-gray-200 mb-4"
        >
          Page Not Found
        </motion.h1>

        {/* Message */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-tostem-text-light dark:text-gray-400 mb-8 max-w-md mx-auto"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <Button
            className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8"
            onClick={() => navigateTo('home')}
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Button>
          <Button
            className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8"
            onClick={() => navigateTo('aluminium-doors-design-prices')}
          >
            Browse Products <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <p className="text-sm text-tostem-text-muted dark:text-gray-500 mb-3">
            Try searching for what you need
          </p>
          <Button
            variant="outline"
            className="border-tostem-blue/30 text-tostem-blue hover:bg-tostem-blue/5 hover:border-tostem-blue"
            onClick={handleOpenSearch}
          >
            <Search className="w-4 h-4 mr-2" />
            Search Tostem
          </Button>
        </motion.div>

        {/* Popular Links */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-bold text-tostem-text-muted dark:text-gray-500 uppercase tracking-wider mb-4">
            Popular Pages
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {popularLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.button
                  key={link.href}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigateTo(link.href)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-tostem-light-gray dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 hover:border-tostem-blue/30 hover:shadow-md transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-tostem-blue" />
                  <span className="text-sm font-medium text-tostem-dark dark:text-gray-300">{link.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
