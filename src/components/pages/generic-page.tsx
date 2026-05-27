'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight, ArrowRight, Home, Loader2, AlertCircle, Phone, Mail,
  ArrowUp, Share2, Linkedin, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { pageRegistry } from '@/lib/tostem-data';

function navigateTo(slug: string) {
  window.location.hash = `/${slug}`;
}

interface GenericPageProps {
  slug: string;
}

interface PageContent {
  title: string;
  html: string;
  url: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

  function extractTocItems(html: string): TocItem[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    const items: TocItem[] = [];
    headings.forEach((h, i) => {
      const text = h.textContent?.trim() || '';
      if (text) {
        items.push({ id: `heading-${i}`, text, level: parseInt(h.tagName[1]) });
      }
    });
    return items;
  }

export default function GenericPage({ slug }: GenericPageProps) {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const pageInfo = pageRegistry.find((p) => p.slug === slug);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/tostem?slug=${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.error) throw new Error(data.error);
        setLoading(false);
        setContent({
          title: data.data?.title || pageInfo?.title || slug,
          html: data.data?.html || '',
          url: data.url || '',
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setLoading(false);
        setError(err.message);
      });
    return () => { cancelled = true; };
  }, [slug, pageInfo?.title]);

  // Reading progress + back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setReadProgress(Math.min((window.scrollY / scrollHeight) * 100, 100));
      }
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extract TOC from HTML headings
  const tocItems: TocItem[] = content?.html ? extractTocItems(content.html) : [];

  // Build breadcrumbs
  const breadcrumbs = [
    { label: 'Home', slug: 'home' },
    ...(pageInfo?.breadcrumb
      ? pageInfo.breadcrumb.map((b) => ({ label: b, slug: '' }))
      : []),
    { label: pageInfo?.title || slug, slug: '' },
  ];

  // Share functions
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = content?.title || pageInfo?.title || 'Tostem India';

  const shareWhatsApp = useCallback(() => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
  }, [shareTitle, shareUrl]);

  const shareLinkedIn = useCallback(() => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  }, [shareUrl]);

  const shareTwitter = useCallback(() => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  }, [shareTitle, shareUrl]);

  // Clean and process HTML content
  const cleanHtml = (html: string) => {
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/class="[^"]*"/gi, '')
      .replace(/style="[^"]*"/gi, '')
      .replace(/<img[^>]*>/gi, '')
      .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
      .replace(/onclick="[^"]*"/gi, '')
      .replace(/onload="[^"]*"/gi, '')
      .replace(/onerror="[^"]*"/gi, '');
  };

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return (
      <div className="pt-[132px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-tostem-blue animate-spin mx-auto mb-4" />
          <p className="text-tostem-text-light">Loading page content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-[132px] min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-tostem-dark mb-2">Unable to load content</h2>
          <p className="text-tostem-text-light mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-tostem-blue text-white">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i === 0 && <Home className="w-3 h-3" />}
                    {crumb.slug ? (
                      <a href={`#/${crumb.slug}`} onClick={(e) => { e.preventDefault(); navigateTo(crumb.slug); }} className="hover:text-white transition-colors">{crumb.label}</a>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                    {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3" />}
                  </span>
                ))}
              </nav>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-balance text-white mb-4">{content?.title || pageInfo?.title || slug}</h1>
              {pageInfo?.description && (
                <p className="text-base text-white/60 max-w-2xl">{pageInfo.description}</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="sticky top-[88px] lg:top-[132px] z-30 bg-white dark:bg-[#111]">
        <Progress value={readProgress} className="h-1 rounded-none bg-gray-100 dark:bg-white/10 [&>div]:bg-tostem-blue" />
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3" ref={contentRef}>
              {content?.html ? (
                <div
                  className="prose prose-lg max-w-none tostem-content"
                  dangerouslySetInnerHTML={{ __html: cleanHtml(content.html) }}
                />
              ) : (
                <div className="space-y-8">
                  <p className="text-tostem-text-light leading-relaxed text-base">
                    {pageInfo?.description || `Welcome to the ${pageInfo?.title || slug} page. Tostem is a premium brand from LIXIL, Japan's largest building materials company, bringing decades of Japanese expertise in aluminium window and door systems to India.`}
                  </p>

                  {/* Key Benefits */}
                  <div>
                    <h2 className="text-2xl font-black text-tostem-dark mb-4">Key Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Japanese Precision', desc: 'Every Tostem product embodies the Japanese philosophy of monozukuri — the spirit of craftsmanship and precision engineering.' },
                        { title: 'Pre-Engineered Systems', desc: 'Manufactured in controlled factory environments for consistent quality, perfect fits, and superior performance every time.' },
                        { title: 'Quality Assurance', desc: 'Over 100 quality checks per product, backed by international certifications including JIS, ISO 9001, and ISO 14001.' },
                        { title: 'Sound Insulation', desc: 'Up to 40dB sound reduction for peaceful interiors, even in the noisiest urban environments.' },
                      ].map((item) => (
                        <div key={item.title} className="bg-tostem-light-gray dark:bg-[#1a1a1a] rounded-xl p-6 hover:border-tostem-blue/30 border border-transparent dark:border-white/10 transition-all duration-300">
                          <h3 className="text-lg font-bold text-tostem-dark dark:text-gray-200 mb-2">{item.title}</h3>
                          <p className="text-sm text-tostem-text-light dark:text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Infographic Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: '50+', label: 'Years of Legacy' },
                      { value: '10M+', label: 'Windows Installed' },
                      { value: '100+', label: 'Quality Checks' },
                      { value: '6', label: 'Series Available' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white dark:bg-[#1a1a1a] rounded-xl p-5 text-center border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="text-2xl md:text-3xl font-black text-tostem-blue mb-1">{stat.value}</div>
                        <div className="text-xs text-tostem-text-light dark:text-gray-400 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Why Choose Tostem */}
                  <div>
                    <h2 className="text-2xl font-black text-tostem-dark dark:text-gray-200 mb-4 tracking-tight">Why Choose Tostem</h2>
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-white/10 p-6 space-y-4">
                      {[
                        'End-to-end manufacturing under controlled conditions ensures zero defect products.',
                        'Advanced Japanese technology adapted for Indian climate and building standards.',
                        'Comprehensive warranty and after-sales support across all major cities.',
                        'Certified installer network ensuring professional installation every time.',
                      ].map((reason, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-tostem-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-tostem-blue text-xs font-bold">{i + 1}</span>
                          </div>
                          <p className="text-sm text-tostem-text-light dark:text-gray-400 leading-relaxed">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional info block */}
                  <div className="bg-tostem-dark rounded-xl p-6 md:p-8 text-white">
                    <h3 className="text-lg font-bold mb-3">Ready to Transform Your Space?</h3>
                    <p className="text-white/60 text-sm mb-4">
                      From consultation to installation, Tostem provides a seamless experience backed by decades of Japanese engineering excellence.
                    </p>
                    <Button className="bg-tostem-blue hover:bg-tostem-blue-light text-white" onClick={() => navigateTo('contact')}>
                      Get Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-40 space-y-6">
                {/* Table of Contents (only if items exist) */}
                {tocItems.length > 0 && (
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-white/10">
                    <h3 className="text-sm font-bold text-tostem-dark dark:text-gray-200 uppercase tracking-wider mb-4">On This Page</h3>
                    <ul className="space-y-2 max-h-64 overflow-y-auto">
                      {tocItems.map((item) => (
                        <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                          <a
                            href={`#${item.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(item.id);
                              if (el) {
                                const top = el.getBoundingClientRect().top + window.scrollY - 160;
                                window.scrollTo({ top, behavior: 'smooth' });
                              }
                            }}
                            className="text-sm text-tostem-text-light dark:text-gray-400 hover:text-tostem-blue transition-colors duration-200 line-clamp-2"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Card */}
                <div className="bg-tostem-dark rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-3">Get a Free Quotation</h3>
                  <p className="text-sm text-white/60 mb-4">Contact us for a free consultation and quote for your project.</p>
                  <Button className="w-full bg-tostem-blue hover:bg-tostem-blue-light text-white mb-3" onClick={() => navigateTo('contact')}>
                    Get Quotation <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <a href="tel:18002667500" className="flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" /> 1800-266-7500
                  </a>
                </div>

                {/* Share Buttons */}
                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-white/10">
                  <h3 className="text-sm font-bold text-tostem-dark dark:text-gray-200 uppercase tracking-wider mb-4">Share This Page</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={shareWhatsApp}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-medium transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </button>
                    <button
                      onClick={shareLinkedIn}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#0077B5] hover:bg-[#006097] text-white text-xs font-medium transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </button>
                    <button
                      onClick={shareTwitter}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-900 text-white text-xs font-medium transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Twitter
                    </button>
                  </div>
                </div>

                {/* Related Pages */}
                {pageInfo?.type && (
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-100 dark:border-white/10">
                    <h3 className="text-sm font-bold text-tostem-dark dark:text-gray-200 uppercase tracking-wider mb-4">Related Pages</h3>
                    <ul className="space-y-2">
                      {pageRegistry
                        .filter((p) => p.type === pageInfo.type && p.slug !== slug)
                        .slice(0, 5)
                        .map((p) => (
                          <li key={p.slug}>
                            <a
                              href={`#/${p.slug}`}
                              onClick={(e) => { e.preventDefault(); navigateTo(p.slug); }}
                              className="text-sm text-tostem-text-light dark:text-gray-400 hover:text-tostem-blue transition-colors duration-200 flex items-center gap-2"
                            >
                              <ChevronRight className="w-3 h-3" /> {p.title}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Contact Card */}
                <div className="bg-tostem-light-gray dark:bg-[#1a1a1a] rounded-xl p-6">
                  <h3 className="text-sm font-bold text-tostem-dark dark:text-gray-200 uppercase tracking-wider mb-4">Contact Us</h3>
                  <div className="space-y-3">
                    <a href="tel:18002667500" className="flex items-center gap-2 text-sm text-tostem-text-light dark:text-gray-400 hover:text-tostem-blue transition-colors duration-200"><Phone className="w-4 h-4" /> 1800-266-7500</a>
                    <a href="mailto:info@tostemindia.com" className="flex items-center gap-2 text-sm text-tostem-text-light dark:text-gray-400 hover:text-tostem-blue transition-colors duration-200"><Mail className="w-4 h-4" /> info@tostemindia.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-tostem-blue text-white shadow-lg flex items-center justify-center hover:bg-tostem-blue-light transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
