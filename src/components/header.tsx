'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronDown, ChevronRight, Download, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mainNavigation, siteMetadata } from '@/lib/tostem-data';
import type { NavSection, MegaMenuColumn, NavItem } from '@/lib/tostem-data';
import { useSiteStore } from '@/lib/store';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setActiveNav } = useSiteStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setActiveNav(href);
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [setActiveNav]);

  const toggleMobileExpand = useCallback((label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <div
          className={`bg-white border-b border-gray-100 transition-all duration-300 ${
            scrolled ? 'py-2' : 'py-3'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group"
            >
              <span className="text-2xl md:text-3xl font-black tracking-[0.15em] text-tostem-dark group-hover:text-tostem-blue transition-colors">
                TOSTEM
              </span>
              <span className="hidden md:block h-8 w-px bg-gray-300" />
              <span className="hidden md:block text-xs text-tostem-text-light tracking-wide max-w-[200px] leading-tight">
                Japanese Innovation
                <br />
                in Window Design
              </span>
            </a>

            {/* Right side: phone + mobile menu button */}
            <div className="flex items-center gap-3">
              {/* Phone button */}
              <a
                href={`tel:${siteMetadata.phone}`}
                className="w-10 h-10 rounded-full bg-tostem-blue flex items-center justify-center text-white hover:bg-tostem-blue-light transition-colors shadow-md"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-md flex items-center justify-center text-tostem-dark hover:bg-gray-100 transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Desktop */}
        <nav
          className={`hidden lg:block bg-tostem-dark transition-all duration-300 ${
            scrolled ? 'shadow-lg' : ''
          }`}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-center">
              {mainNavigation.map((section) => (
                <DesktopNavItem
                  key={section.label}
                  section={section}
                  isActive={activeDropdown === section.label}
                  onMouseEnter={() => handleMouseEnter(section.label)}
                  onMouseLeave={handleMouseLeave}
                  onNavClick={handleNavClick}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Mega Menu Dropdown - Desktop */}
        <AnimatePresence>
          {activeDropdown && (
            <DesktopMegaMenu
              section={mainNavigation.find((s) => s.label === activeDropdown)!}
              onMouseEnter={() => handleMouseEnter(activeDropdown)}
              onMouseLeave={handleMouseLeave}
              onNavClick={handleNavClick}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Side Buttons - Desktop only */}
      <div className="hidden xl:block">
        <a
          href={siteMetadata.brochureUrl}
          className="side-button side-button-left"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#brochure');
          }}
        >
          <Download className="w-3 h-3 mb-2" />
          DOWNLOAD BROCHURE
        </a>
        <a
          href={siteMetadata.enquiryUrl}
          className="side-button side-button-right"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#quotation');
          }}
        >
          <MessageCircle className="w-3 h-3 mb-2" />
          ENQUIRE NOW
        </a>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            onNavClick={handleNavClick}
            expandedItem={mobileExpanded}
            onToggleExpand={toggleMobileExpand}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ============ Desktop Nav Item ============

function DesktopNavItem({
  section,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onNavClick,
}: {
  section: NavSection;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavClick: (href: string) => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className={`nav-item flex items-center gap-1 whitespace-nowrap ${
          isActive ? 'bg-white/10' : ''
        }`}
        onClick={() => onNavClick(section.href)}
      >
        {section.label}
        {(section.children || section.columns) && (
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${
              isActive ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>
    </div>
  );
}

// ============ Desktop Mega Menu ============

function DesktopMegaMenu({
  section,
  onMouseEnter,
  onMouseLeave,
  onNavClick,
}: {
  section: NavSection;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavClick: (href: string) => void;
}) {
  const hasColumns = section.columns && section.columns.length > 0;
  const hasChildren = section.children && section.children.length > 0;

  if (!hasColumns && !hasChildren) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {hasColumns ? (
          <div className="grid grid-cols-4 gap-8">
            {section.columns!.map((col) => (
              <MegaMenuColumnComponent
                key={col.title}
                column={col}
                onNavClick={onNavClick}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {section.children!.map((child) => (
              <MegaMenuItem
                key={child.label}
                item={child}
                onNavClick={onNavClick}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MegaMenuColumnComponent({
  column,
  onNavClick,
}: {
  column: MegaMenuColumn;
  onNavClick: (href: string) => void;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-tostem-dark uppercase tracking-wider mb-4 pb-2 border-b-2 border-tostem-blue">
        {column.title}
      </h3>
      <ul className="space-y-1">
        {column.items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavClick(item.href);
              }}
              className="flex items-center gap-2 px-2 py-2 text-sm text-tostem-text-light hover:text-tostem-blue hover:bg-tostem-light-gray rounded-md transition-colors group"
            >
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-tostem-blue" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaMenuItem({
  item,
  onNavClick,
}: {
  item: NavItem;
  onNavClick: (href: string) => void;
}) {
  return (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onNavClick(item.href);
      }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-tostem-light-gray transition-colors group"
    >
      <div className="w-1 h-8 bg-tostem-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-sm font-medium text-tostem-text group-hover:text-tostem-blue transition-colors">
        {item.label}
      </span>
    </a>
  );
}

// ============ Mobile Menu ============

function MobileMenu({
  onNavClick,
  expandedItem,
  onToggleExpand,
  onClose,
}: {
  onNavClick: (href: string) => void;
  expandedItem: string | null;
  onToggleExpand: (label: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] lg:hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[400px] bg-white shadow-2xl overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-xl font-black tracking-[0.15em] text-tostem-dark">
            TOSTEM
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4">
          {mainNavigation.map((section) => (
            <MobileNavItem
              key={section.label}
              section={section}
              isExpanded={expandedItem === section.label}
              onToggle={() => onToggleExpand(section.label)}
              onNavClick={onNavClick}
            />
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <Button
            className="w-full bg-tostem-blue hover:bg-tostem-blue-light text-white"
            onClick={() => onNavClick('#quotation')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            ENQUIRE NOW
          </Button>
          <Button
            variant="outline"
            className="w-full border-tostem-dark text-tostem-dark hover:bg-tostem-dark hover:text-white"
            onClick={() => onNavClick('#brochure')}
          >
            <Download className="w-4 h-4 mr-2" />
            DOWNLOAD BROCHURE
          </Button>
          <a
            href={`tel:${siteMetadata.phone}`}
            className="flex items-center justify-center gap-2 w-full py-2 text-tostem-blue font-medium text-sm"
          >
            <Phone className="w-4 h-4" />
            {siteMetadata.phone}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileNavItem({
  section,
  isExpanded,
  onToggle,
  onNavClick,
}: {
  section: NavSection;
  isExpanded: boolean;
  onToggle: () => void;
  onNavClick: (href: string) => void;
}) {
  const hasSubItems =
    (section.children && section.children.length > 0) ||
    (section.columns && section.columns.length > 0);

  return (
    <div className="border-b border-gray-100">
      <button
        className="flex items-center justify-between w-full py-3 px-2 text-sm font-semibold text-tostem-dark uppercase tracking-wide hover:text-tostem-blue transition-colors"
        onClick={() => {
          if (hasSubItems) {
            onToggle();
          } else {
            onNavClick(section.href);
          }
        }}
      >
        {section.label}
        {hasSubItems && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && hasSubItems && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-3">
              {section.columns
                ? section.columns.map((col) => (
                    <div key={col.title} className="mb-3">
                      <h4 className="text-xs font-bold text-tostem-blue uppercase tracking-wider mb-2">
                        {col.title}
                      </h4>
                      {col.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavClick(item.href);
                          }}
                          className="block py-1.5 px-2 text-sm text-tostem-text-light hover:text-tostem-blue transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  ))
                : section.children?.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick(child.href);
                      }}
                      className="block py-1.5 px-2 text-sm text-tostem-text-light hover:text-tostem-blue transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
