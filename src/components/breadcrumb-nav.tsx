'use client';

import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  dark?: boolean;
}

function navigateTo(slug: string) {
  if (slug === 'home') {
    window.location.hash = '';
  } else {
    window.location.hash = `/${slug}`;
  }
}

export default function BreadcrumbNav({ items, dark = true }: BreadcrumbNavProps) {
  const textColor = dark ? 'text-white/50' : 'text-tostem-text-muted';
  const separatorColor = dark ? 'text-white/30' : 'text-tostem-text-muted';
  const activeColor = dark ? 'text-white' : 'text-tostem-dark';
  const hoverColor = dark ? 'hover:text-white' : 'hover:text-tostem-blue';

  return (
    <nav className="flex items-center gap-2 text-sm mb-4" aria-label="Breadcrumb">
      <button
        onClick={() => navigateTo('home')}
        className={`flex items-center gap-1 ${textColor} ${hoverColor} transition-colors`}
        aria-label="Go to homepage"
      >
        <Home className="w-3 h-3" />
      </button>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-2">
            <ChevronRight className={`w-3 h-3 ${separatorColor}`} />
            {isLast ? (
              <span className={`font-bold ${activeColor}`}>{item.label}</span>
            ) : item.href ? (
              <button
                onClick={() => navigateTo(item.href!)}
                className={`${textColor} ${hoverColor} transition-colors`}
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
