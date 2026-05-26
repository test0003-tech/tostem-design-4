'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronDown, ChevronRight, Download, MessageCircle, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mainNavigation, productMegaMenuTabs, siteMetadata } from '@/lib/tostem-data';
import SearchOverlay from '@/components/search-overlay';
import type { NavSection, NavItem, MegaMenuTab } from '@/lib/tostem-data';
import { useSiteStore } from '@/lib/store';
import { useTheme } from 'next-themes';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeProductTab, setActiveProductTab] = useState('aluminium-doors');
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleMouseEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) { clearTimeout(dropdownTimeoutRef.current); dropdownTimeoutRef.current = null; }
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
    if (href.startsWith('#/')) {
      window.location.hash = href;
    } else if (href.startsWith('http')) {
      window.open(href, '_blank');
    }
  }, []);

  const toggleMobileExpand = useCallback((label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  }, []);

  return (
    <>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <div className={`bg-white dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-white/10 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between">
            <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} className="flex items-center gap-3 group">
              <span className="text-2xl md:text-3xl font-black tracking-[0.15em] text-tostem-dark group-hover:text-tostem-blue transition-colors">TOSTEM</span>
              <span className="hidden md:block h-8 w-px bg-gray-300" />
              <span className="hidden md:block text-xs text-tostem-text-light tracking-wide max-w-[200px] leading-tight">Japanese Innovation<br />in Window Design</span>
            </a>
            <div className="flex items-center gap-3">
              <button onClick={() => setSearchOpen(true)} className="w-10 h-10 rounded-full bg-tostem-light-gray dark:bg-white/10 flex items-center justify-center text-tostem-dark dark:text-gray-300 hover:bg-tostem-mid-gray dark:hover:bg-white/20 transition-colors" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-full bg-tostem-light-gray dark:bg-white/10 flex items-center justify-center text-tostem-dark dark:text-gray-300 hover:bg-tostem-mid-gray dark:hover:bg-white/20 transition-colors"
                aria-label="Toggle theme"
              >
                <Sun className="w-4 h-4 hidden dark:block" />
                <Moon className="w-4 h-4 block dark:hidden" />
              </button>
              <a href={`tel:${siteMetadata.phone}`} className="w-10 h-10 rounded-full bg-tostem-blue flex items-center justify-center text-white hover:bg-tostem-blue-light transition-colors shadow-md" aria-label="Call us"><Phone className="w-4 h-4" /></a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-10 h-10 rounded-md flex items-center justify-center text-tostem-dark hover:bg-gray-100 transition-colors" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Desktop */}
        <nav className={`hidden lg:block bg-tostem-dark transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`} onMouseLeave={() => setActiveDropdown(null)}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-center">
              {mainNavigation.map((section) => (
                <div key={section.label} className="relative" onMouseEnter={() => handleMouseEnter(section.label)} onMouseLeave={handleMouseLeave}>
                  <button className={`nav-item flex items-center gap-1 whitespace-nowrap ${activeDropdown === section.label ? 'bg-white/10' : ''}`} onClick={() => handleNavClick(section.href)}>
                    {section.label === 'ABOUT TOSTEM' ? 'About Tostem' : section.label === 'WHY TOSTEM' ? 'Why Tostem' : section.label === 'OUR PRODUCT' ? 'Our Product' : section.label === 'DRIVING EXPERIENCE' ? 'Driving Experience' : section.label === 'KNOWLEDGE EXPERIENCE' ? 'Knowledge Experience' : section.label === 'REACH US' ? 'Reach Us' : section.label}
                    {(section.children || section.columns) && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === section.label ? 'rotate-180' : ''}`} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Mega Menu Dropdown - Desktop */}
        <AnimatePresence>
          {activeDropdown && (
            <DesktopMegaMenu
              section={mainNavigation.find((s) => s.label === activeDropdown)!}
              activeProductTab={activeProductTab}
              setActiveProductTab={setActiveProductTab}
              onMouseEnter={() => handleMouseEnter(activeDropdown)}
              onMouseLeave={handleMouseLeave}
              onNavClick={handleNavClick}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Side Buttons */}
      <div className="hidden xl:block">
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('#/contact'); }} className="side-button side-button-left"><Download className="w-3 h-3 mb-2" />DOWNLOAD BROCHURE</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('#/contact'); }} className="side-button side-button-right"><MessageCircle className="w-3 h-3 mb-2" />ENQUIRE NOW</a>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onNavClick={handleNavClick} expandedItem={mobileExpanded} onToggleExpand={toggleMobileExpand} onClose={() => setMobileMenuOpen(false)} activeProductTab={activeProductTab} setActiveProductTab={setActiveProductTab} />
        )}
      </AnimatePresence>
    </>
  );
}

// ============ Desktop Mega Menu ============
function DesktopMegaMenu({ section, activeProductTab, setActiveProductTab, onMouseEnter, onMouseLeave, onNavClick }: {
  section: NavSection; activeProductTab: string; setActiveProductTab: (tab: string) => void; onMouseEnter: () => void; onMouseLeave: () => void; onNavClick: (href: string) => void;
}) {
  const isProduct = section.label === 'OUR PRODUCT';

  return (
    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="absolute left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {isProduct ? (
        // Tabbed mega menu for Our Product
        <div className="max-w-[1400px] mx-auto px-8 py-0">
          <div className="flex">
            {/* Left: Vertical tabs */}
            <div className="w-56 border-r border-gray-100 py-2 flex-shrink-0">
              {productMegaMenuTabs.map((tab) => (
                <button key={tab.id} className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center justify-between ${activeProductTab === tab.id ? 'bg-tostem-light-gray text-tostem-blue border-l-3 border-tostem-blue' : 'text-tostem-text-light hover:bg-gray-50 hover:text-tostem-dark'}`} onClick={() => setActiveProductTab(tab.id)} onMouseEnter={() => setActiveProductTab(tab.id)}>
                  {tab.label}
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
            {/* Right: Content area */}
            <div className="flex-1 py-6 px-6 min-h-[350px]">
              {productMegaMenuTabs.filter(t => t.id === activeProductTab).map((tab) => (
                <div key={tab.id} className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xs font-bold text-tostem-dark uppercase tracking-wider mb-3 pb-2 border-b-2 border-tostem-blue">Our Designs</h3>
                    <ul className="space-y-0.5">
                      {tab.designs.map((item) => (
                        <li key={item.label}>
                          <a href={item.href} onClick={(e) => { e.preventDefault(); onNavClick(item.href); }} className="block px-2 py-2 text-sm text-tostem-text-light hover:text-tostem-blue hover:bg-tostem-light-gray rounded-md transition-colors">{item.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {tab.series.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-tostem-dark uppercase tracking-wider mb-3 pb-2 border-b-2 border-tostem-blue">Our Series</h3>
                      <ul className="space-y-0.5">
                        {tab.series.map((item) => (
                          <li key={item.label}>
                            <a href={item.href} onClick={(e) => { e.preventDefault(); onNavClick(item.href); }} className="block px-2 py-2 text-sm text-tostem-text-light hover:text-tostem-blue hover:bg-tostem-light-gray rounded-md transition-colors">{item.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : section.children ? (
        // Simple dropdown menu
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="grid grid-cols-1 gap-0 max-w-xs">
            {section.children.map((child) => (
              <div key={child.label}>
                <a href={child.href} onClick={(e) => { e.preventDefault(); onNavClick(child.href); }} className="flex items-center gap-2 px-3 py-2.5 text-sm text-tostem-text-light hover:text-tostem-blue hover:bg-tostem-light-gray rounded-md transition-colors">
                  {child.label}
                  {child.children && <ChevronRight className="w-3 h-3 ml-auto" />}
                </a>
                {/* Nested sub-menu */}
                {child.children && (
                  <div className="pl-6">
                    {child.children.map((sub) => (
                      <a key={sub.label} href={sub.href} onClick={(e) => { e.preventDefault(); onNavClick(sub.href); }} className="block px-3 py-2 text-sm text-tostem-text-muted hover:text-tostem-blue hover:bg-tostem-light-gray rounded-md transition-colors">{sub.label}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

// ============ Mobile Menu ============
function MobileMenu({ onNavClick, expandedItem, onToggleExpand, onClose, activeProductTab, setActiveProductTab }: {
  onNavClick: (href: string) => void; expandedItem: string | null; onToggleExpand: (label: string) => void; onClose: () => void; activeProductTab: string; setActiveProductTab: (tab: string) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[400px] bg-white shadow-2xl overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-xl font-black tracking-[0.15em] text-tostem-dark">TOSTEM</span>
          <button onClick={onClose} className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100" aria-label="Close menu"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-4">
          {mainNavigation.map((section) => (
            <MobileNavItem key={section.label} section={section} isExpanded={expandedItem === section.label} onToggle={() => onToggleExpand(section.label)} onNavClick={onNavClick} activeProductTab={activeProductTab} setActiveProductTab={setActiveProductTab} />
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-3">
          <Button className="w-full bg-tostem-blue hover:bg-tostem-blue-light text-white" onClick={() => onNavClick('#/contact')}><MessageCircle className="w-4 h-4 mr-2" />ENQUIRE NOW</Button>
          <Button variant="outline" className="w-full border-tostem-dark text-tostem-dark hover:bg-tostem-dark hover:text-white" onClick={() => onNavClick('#/contact')}><Download className="w-4 h-4 mr-2" />DOWNLOAD BROCHURE</Button>
          <a href={`tel:${siteMetadata.phone}`} className="flex items-center justify-center gap-2 w-full py-2 text-tostem-blue font-medium text-sm"><Phone className="w-4 h-4" />{siteMetadata.phone}</a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileNavItem({ section, isExpanded, onToggle, onNavClick, activeProductTab, setActiveProductTab }: {
  section: NavSection; isExpanded: boolean; onToggle: () => void; onNavClick: (href: string) => void; activeProductTab: string; setActiveProductTab: (tab: string) => void;
}) {
  const hasSubItems = !!(section.children?.length || section.columns?.length);
  const isProduct = section.label === 'OUR PRODUCT';

  return (
    <div className="border-b border-gray-100">
      <button className="flex items-center justify-between w-full py-3 px-2 text-sm font-semibold text-tostem-dark uppercase tracking-wide hover:text-tostem-blue transition-colors" onClick={() => { if (hasSubItems) onToggle(); else onNavClick(section.href); }}>
        {section.label === 'ABOUT TOSTEM' ? 'About Tostem' : section.label === 'WHY TOSTEM' ? 'Why Tostem' : section.label === 'OUR PRODUCT' ? 'Our Product' : section.label === 'DRIVING EXPERIENCE' ? 'Driving Experience' : section.label === 'KNOWLEDGE EXPERIENCE' ? 'Knowledge Experience' : section.label === 'REACH US' ? 'Reach Us' : section.label}
        {hasSubItems && <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />}
      </button>
      <AnimatePresence>
        {isExpanded && hasSubItems && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pl-4 pb-3">
              {isProduct ? (
                // Tabbed product menu for mobile
                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {productMegaMenuTabs.map((tab) => (
                      <button key={tab.id} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeProductTab === tab.id ? 'bg-tostem-blue text-white' : 'bg-gray-100 text-tostem-text-light'}`} onClick={() => setActiveProductTab(tab.id)}>{tab.label}</button>
                    ))}
                  </div>
                  {productMegaMenuTabs.filter(t => t.id === activeProductTab).map((tab) => (
                    <div key={tab.id}>
                      <p className="text-xs font-bold text-tostem-dark uppercase tracking-wider mb-2">Our Designs</p>
                      {tab.designs.map((item) => (
                        <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); onNavClick(item.href); }} className="block py-1.5 px-2 text-sm text-tostem-text-light hover:text-tostem-blue transition-colors">{item.label}</a>
                      ))}
                      {tab.series.length > 0 && (
                        <>
                          <p className="text-xs font-bold text-tostem-dark uppercase tracking-wider mb-2 mt-3">Our Series</p>
                          {tab.series.map((item) => (
                            <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); onNavClick(item.href); }} className="block py-1.5 px-2 text-sm text-tostem-text-light hover:text-tostem-blue transition-colors">{item.label}</a>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : section.children ? (
                section.children.map((child) => (
                  <div key={child.label}>
                    <a href={child.href} onClick={(e) => { e.preventDefault(); onNavClick(child.href); }} className="block py-1.5 px-2 text-sm text-tostem-text-light hover:text-tostem-blue transition-colors">{child.label}</a>
                    {child.children?.map((sub) => (
                      <a key={sub.label} href={sub.href} onClick={(e) => { e.preventDefault(); onNavClick(sub.href); }} className="block py-1.5 px-4 text-sm text-tostem-text-muted hover:text-tostem-blue transition-colors">{sub.label}</a>
                    ))}
                  </div>
                ))
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
