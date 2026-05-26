'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Home, Loader2, AlertCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export default function GenericPage({ slug }: GenericPageProps) {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Build breadcrumbs
  const breadcrumbs = [
    { label: 'Home', slug: 'home' },
    ...(pageInfo?.breadcrumb
      ? pageInfo.breadcrumb.map((b) => ({ label: b, slug: '' }))
      : []),
    { label: pageInfo?.title || slug, slug: '' },
  ];

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

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Breadcrumbs */}
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
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{content?.title || pageInfo?.title || slug}</h1>
              {pageInfo?.description && (
                <p className="text-base text-white/60 max-w-2xl">{pageInfo.description}</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {content?.html ? (
                <div
                  className="prose prose-lg max-w-none tostem-content"
                  dangerouslySetInnerHTML={{ __html: cleanHtml(content.html) }}
                />
              ) : (
                <div className="space-y-6">
                  <p className="text-tostem-text-light leading-relaxed">
                    {pageInfo?.description || `Welcome to the ${pageInfo?.title || slug} page. Tostem is a premium brand from LIXIL, Japan's largest building materials company, bringing decades of Japanese expertise in aluminium window and door systems to India.`}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-tostem-light-gray rounded-xl p-6">
                      <h3 className="text-lg font-bold text-tostem-dark mb-3">Japanese Precision</h3>
                      <p className="text-sm text-tostem-text-light leading-relaxed">Every Tostem product embodies the Japanese philosophy of monozukuri — the spirit of craftsmanship and precision engineering.</p>
                    </div>
                    <div className="bg-tostem-light-gray rounded-xl p-6">
                      <h3 className="text-lg font-bold text-tostem-dark mb-3">Pre-Engineered Systems</h3>
                      <p className="text-sm text-tostem-text-light leading-relaxed">Manufactured in controlled factory environments for consistent quality, perfect fits, and superior performance every time.</p>
                    </div>
                    <div className="bg-tostem-light-gray rounded-xl p-6">
                      <h3 className="text-lg font-bold text-tostem-dark mb-3">Quality Assurance</h3>
                      <p className="text-sm text-tostem-text-light leading-relaxed">Over 100 quality checks per product, backed by international certifications including JIS, ISO 9001, and ISO 14001.</p>
                    </div>
                    <div className="bg-tostem-light-gray rounded-xl p-6">
                      <h3 className="text-lg font-bold text-tostem-dark mb-3">Sound Insulation</h3>
                      <p className="text-sm text-tostem-text-light leading-relaxed">Up to 40dB sound reduction for peaceful interiors, even in the noisiest urban environments.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-40 space-y-6">
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

                {/* Related Pages */}
                {pageInfo?.type && (
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <h3 className="text-sm font-bold text-tostem-dark uppercase tracking-wider mb-4">Related Pages</h3>
                    <ul className="space-y-2">
                      {pageRegistry
                        .filter((p) => p.type === pageInfo.type && p.slug !== slug)
                        .slice(0, 5)
                        .map((p) => (
                          <li key={p.slug}>
                            <a
                              href={`#/${p.slug}`}
                              onClick={(e) => { e.preventDefault(); navigateTo(p.slug); }}
                              className="text-sm text-tostem-text-light hover:text-tostem-blue transition-colors flex items-center gap-2"
                            >
                              <ChevronRight className="w-3 h-3" /> {p.title}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Contact Card */}
                <div className="bg-tostem-light-gray rounded-xl p-6">
                  <h3 className="text-sm font-bold text-tostem-dark uppercase tracking-wider mb-4">Contact Us</h3>
                  <div className="space-y-3">
                    <a href="tel:18002667500" className="flex items-center gap-2 text-sm text-tostem-text-light hover:text-tostem-blue transition-colors"><Phone className="w-4 h-4" /> 1800-266-7500</a>
                    <a href="mailto:info@tostemindia.com" className="flex items-center gap-2 text-sm text-tostem-text-light hover:text-tostem-blue transition-colors"><Mail className="w-4 h-4" /> info@tostemindia.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
