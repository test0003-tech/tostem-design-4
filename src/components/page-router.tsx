'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteStore } from '@/lib/store';
import { pageRegistry } from '@/lib/tostem-data';
import GenericPage from '@/components/pages/generic-page';
import CategoryPage from '@/components/pages/category-page';
import DesignPage from '@/components/pages/design-page';
import SeriesPage from '@/components/pages/series-page';
import ContactPage from '@/components/pages/contact-page';
import BlogPage from '@/components/pages/blog-page';
import GalleryPage from '@/components/pages/gallery-page';
import TestimonialsPage from '@/components/pages/testimonials-page';
import GlossaryPage from '@/components/pages/glossary-page';
import TadaPage from '@/components/pages/tada-page';
import HomePage from '@/components/pages/home-page';
import EcataloguePage from '@/components/pages/ecatalogue-page';

export default function PageRouter() {
  const { currentPage, setCurrentPage } = useSiteStore();

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const page = hash || 'home';
      setCurrentPage(page);
    };

    // Initial hash check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  // Navigate to a page
  const navigateTo = useCallback((slug: string) => {
    if (slug === 'home') {
      window.location.hash = '';
      setCurrentPage('home');
    } else {
      window.location.hash = `/${slug}`;
      setCurrentPage(slug);
    }
  }, [setCurrentPage]);

  // Make navigateTo available globally
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__navigateTo = navigateTo;
  }, [navigateTo]);

  // Find page info in registry
  const pageInfo = pageRegistry.find((p) => p.slug === currentPage);

  // Render the appropriate page component
  const renderPage = () => {
    if (currentPage === 'home' || !currentPage) {
      return <HomePage />;
    }

    if (!pageInfo) {
      return <GenericPage slug={currentPage} />;
    }

    switch (pageInfo.type) {
      case 'category':
        return <CategoryPage slug={currentPage} pageInfo={pageInfo} />;
      case 'design':
        return <DesignPage slug={currentPage} pageInfo={pageInfo} />;
      case 'series':
        return <SeriesPage slug={currentPage} pageInfo={pageInfo} />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;
      case 'experience-gallery':
      case 'gallery':
        return <GalleryPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'glossary':
        return <GlossaryPage />;
      case 'tada':
        return <TadaPage slug={currentPage} pageInfo={pageInfo} />;
      case 'ecatalogue':
        return <EcataloguePage />;
      default:
        return <GenericPage slug={currentPage} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {renderPage()}
      </motion.div>
    </AnimatePresence>
  );
}
