'use client';

import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  dark?: boolean;
  currentSlug?: string;
}

function navigateTo(slug: string) {
  if (slug === 'home') {
    window.location.hash = '';
  } else {
    window.location.hash = `/${slug}`;
  }
}

// Maps design/page slugs to their parent category for full breadcrumb paths
const categoryMap: Record<string, { label: string; href: string }> = {
  // Window designs
  'aluminium-sliding-windows-designs': { label: 'Aluminium Windows', href: 'aluminium-windows-design-prices' },
  'aluminium-casement-windows': { label: 'Aluminium Windows', href: 'aluminium-windows-design-prices' },
  'aluminium-hung-awning-windows': { label: 'Aluminium Windows', href: 'aluminium-windows-design-prices' },
  'aluminium-fixed-window': { label: 'Aluminium Windows', href: 'aluminium-windows-design-prices' },
  'aluminium-glass-to-glass-corner-window': { label: 'Aluminium Windows', href: 'aluminium-windows-design-prices' },
  'aluminium-french-windows': { label: 'Aluminium Windows', href: 'aluminium-windows-design-prices' },
  'aluminium-tilt-slide-windows': { label: 'Aluminium Windows', href: 'aluminium-windows-design-prices' },
  'aluminium-slit-windows': { label: 'Aluminium Windows', href: 'aluminium-windows-design-prices' },
  'aluminium-vertical-sliding-windows': { label: 'Aluminium Windows', href: 'aluminium-windows-design-prices' },
  // Door designs
  'aluminium-sliding-doors': { label: 'Aluminium Doors', href: 'aluminium-doors-design-prices' },
  'aluminium-casement-doors': { label: 'Aluminium Doors', href: 'aluminium-doors-design-prices' },
  'aluminium-french-doors': { label: 'Aluminium Doors', href: 'aluminium-doors-design-prices' },
  'aluminium-bi-folding-doors': { label: 'Aluminium Doors', href: 'aluminium-doors-design-prices' },
  'aluminium-corner-slider-door': { label: 'Aluminium Doors', href: 'aluminium-doors-design-prices' },
  'aluminium-slide-fold-doors': { label: 'Aluminium Doors', href: 'aluminium-doors-design-prices' },
  'ventilation-doors': { label: 'Aluminium Doors', href: 'aluminium-doors-design-prices' },
  // Steel door designs
  'giesta-doors': { label: 'Steel Entrance Doors', href: 'steel-entrance-doors' },
  'giesta-ventilation-doors': { label: 'Steel Entrance Doors', href: 'steel-entrance-doors' },
  // Airflow designs
  'ventilation-slots': { label: 'Airflow System', href: 'airflow-system' },
  'aluminum-louver': { label: 'Airflow System', href: 'airflow-system' },
  'glass-louver': { label: 'Airflow System', href: 'airflow-system' },
  // Facade designs
  'facade-curtain-wall': { label: 'Facades', href: 'facades' },
  'facade-store-front': { label: 'Facades', href: 'facades' },
  // Interior designs
  'hanging-door': { label: 'Interior', href: 'interior' },
  'swing-door': { label: 'Interior', href: 'interior' },
  'fixed-divider': { label: 'Interior', href: 'interior' },
  // Series pages
  'atis-windows-doors-series': { label: 'Our Products', href: 'aluminium-doors-design-prices' },
  'grants-windows-doors-series': { label: 'Our Products', href: 'aluminium-doors-design-prices' },
  'we-plus-windows-doors-series': { label: 'Our Products', href: 'aluminium-doors-design-prices' },
  'we-70-windows-doors-series': { label: 'Our Products', href: 'aluminium-doors-design-prices' },
};

// Category pages that should have "Our Products" as grandparent
const categoryPagesWithGrandparent = [
  'aluminium-windows-design-prices',
  'aluminium-doors-design-prices',
  'steel-entrance-doors',
  'airflow-system',
  'facades',
  'interior',
];

export default function BreadcrumbNav({ items, dark = true, currentSlug }: BreadcrumbNavProps) {
  const textColor = dark ? 'text-white/50' : 'text-tostem-text-muted';
  const separatorColor = dark ? 'text-white/30' : 'text-tostem-text-muted';
  const activeColor = dark ? 'text-white' : 'text-tostem-dark';
  const hoverColor = dark ? 'hover:text-white' : 'hover:text-tostem-blue';

  // Build full breadcrumb path with category parents
  const buildFullBreadcrumbs = (): BreadcrumbItem[] => {
    const fullItems: BreadcrumbItem[] = [];

    // If we have a currentSlug, look up parent categories
    if (currentSlug) {
      const parent = categoryMap[currentSlug];
      if (parent) {
        // Check if the parent itself needs a grandparent (category pages)
        if (categoryPagesWithGrandparent.includes(parent.href)) {
          fullItems.push({ label: 'Our Products', href: 'aluminium-doors-design-prices' });
        }
        fullItems.push({ label: parent.label, href: parent.href });
      } else if (categoryPagesWithGrandparent.includes(currentSlug)) {
        // This is a category page itself
        fullItems.push({ label: 'Our Products', href: 'aluminium-doors-design-prices' });
      }
    }

    // Add the items passed in (but avoid duplicates)
    for (const item of items) {
      const alreadyExists = fullItems.some(
        (fi) => fi.label === item.label
      );
      if (!alreadyExists) {
        fullItems.push(item);
      }
    }

    return fullItems;
  };

  const fullItems = buildFullBreadcrumbs();

  return (
    <nav className="flex items-center flex-wrap gap-1 text-sm mb-4" aria-label="Breadcrumb">
      <button
        onClick={() => navigateTo('home')}
        className={`flex items-center gap-1 ${textColor} ${hoverColor} transition-colors duration-200`}
        aria-label="Go to homepage"
      >
        <Home className="w-3 h-3" />
      </button>
      {fullItems.map((item, index) => {
        const isLast = index === fullItems.length - 1;
        return (
          <span key={index} className="flex items-center gap-1">
            <ChevronRight className={`w-3 h-3 ${separatorColor}`} />
            {isLast ? (
              <span className={`font-bold ${activeColor}`}>{item.label}</span>
            ) : item.href ? (
              <button
                onClick={() => navigateTo(item.href!)}
                className={`${textColor} ${hoverColor} transition-colors duration-200`}
              >
                {item.label}
              </button>
            ) : (
              <span className={textColor}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
