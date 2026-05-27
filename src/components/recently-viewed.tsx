'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// ====== Types ======
interface RecentlyViewItem {
  slug: string;
  name: string;
  category: string;
  timestamp: number;
}

const STORAGE_KEY = 'tostem-recently-viewed';
const MAX_ITEMS = 8;

const categoryColors: Record<string, string> = {
  windows: 'bg-tostem-blue/10 text-tostem-blue',
  doors: 'bg-amber-50 text-amber-700',
  interior: 'bg-emerald-50 text-emerald-700',
  exterior: 'bg-teal-50 text-teal-700',
  series: 'bg-rose-50 text-rose-700',
  about: 'bg-gray-100 text-gray-700',
  'why-tostem': 'bg-emerald-50 text-emerald-700',
  experience: 'bg-cyan-50 text-cyan-700',
  knowledge: 'bg-violet-50 text-violet-700',
  contact: 'bg-gray-100 text-gray-700',
};

function getCategoryStyle(cat: string) {
  return categoryColors[cat] || 'bg-gray-100 text-gray-700';
}

function loadItems(): RecentlyViewItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

// ====== Utility: Save to recently viewed ======
export function saveToRecentlyViewed(slug: string, name: string, category: string) {
  if (!slug || slug === 'home') return;
  try {
    const existing: RecentlyViewItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    // Remove if already exists
    const filtered = existing.filter((item) => item.slug !== slug);
    // Add to front
    filtered.unshift({ slug, name, category, timestamp: Date.now() });
    // Cap at MAX_ITEMS
    const capped = filtered.slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(capped));
  } catch {
    // Silently fail
  }
}

// ====== Component ======
export default function RecentlyViewed() {
  const [items, setItems] = useState<RecentlyViewItem[]>([]);

  const refreshItems = useCallback(() => {
    setItems(loadItems());
  }, []);

  useEffect(() => {
    // Use microtask to avoid lint warning about setState in effect
    queueMicrotask(() => refreshItems());
  }, [refreshItems]);

  // Listen for storage changes (from page-router)
  useEffect(() => {
    const handleStorage = () => {
      queueMicrotask(() => refreshItems());
    };
    window.addEventListener('storage', handleStorage);
    // Also listen for custom event
    window.addEventListener('tostem-recently-viewed-updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('tostem-recently-viewed-updated', handleStorage);
    };
  }, [refreshItems]);

  const handleClick = useCallback((slug: string) => {
    window.location.hash = `/${slug}`;
  }, []);

  // Only show if 2+ items
  if (items.length < 2) return null;

  return (
    <section className="py-10 md:py-14 bg-white dark:bg-[#111]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-tostem-blue" />
          <h3 className="text-xl md:text-2xl font-bold text-tostem-dark dark:text-white">
            Recently Viewed
          </h3>
        </div>

        {/* Mobile: horizontal scroll, Desktop: grid */}
        <div className="flex lg:grid lg:grid-cols-4 xl:grid-cols-4 gap-3 overflow-x-auto pb-2 lg:overflow-visible custom-scrollbar">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.button
                key={item.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => handleClick(item.slug)}
                className="flex-shrink-0 w-64 lg:w-auto bg-tostem-light-gray dark:bg-[#1a1a1a] rounded-xl p-4 text-left hover:shadow-md hover:border-tostem-blue/30 border border-transparent transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <Badge className={`text-[10px] px-2 py-0 h-5 mb-2 ${getCategoryStyle(item.category)}`}>
                      {item.category}
                    </Badge>
                    <div className="text-sm font-bold text-tostem-dark dark:text-gray-200 truncate group-hover:text-tostem-blue transition-colors">
                      {item.name}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-tostem-blue text-xs font-medium group-hover:gap-2 transition-all">
                  View Again <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
