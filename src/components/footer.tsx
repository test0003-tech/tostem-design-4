'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Linkedin, Twitter, ArrowUp, Shield, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  footerQuickLinks,
  footerProductLinks,
  footerContact,
  footerSocial,
  siteMetadata,
} from '@/lib/tostem-data';

const trustBadges = [
  { label: 'ISO 9001 Certified', icon: Shield },
  { label: 'JIS Certified', icon: Shield },
  { label: 'ISO 14001 Certified', icon: Shield },
  { label: '100+ Quality Checks', icon: CheckCircle },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (slug: string) => {
    const navFn = (window as unknown as Record<string, unknown>).__navigateTo as ((s: string) => void) | undefined;
    if (navFn) {
      navFn(slug);
    }
  };

  const handleNewsletterSubmit = () => {
    if (!newsletterEmail) return;

    // Store in localStorage
    const subscriptions = JSON.parse(localStorage.getItem('tostem-newsletter') || '[]');
    subscriptions.push({ email: newsletterEmail, timestamp: new Date().toISOString() });
    localStorage.setItem('tostem-newsletter', JSON.stringify(subscriptions));

    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  const socialIconMap: Record<string, React.ReactNode> = {
    facebook: <Facebook className="w-4 h-4" />,
    instagram: <Instagram className="w-4 h-4" />,
    youtube: <Youtube className="w-4 h-4" />,
    linkedin: <Linkedin className="w-4 h-4" />,
    twitter: <Twitter className="w-4 h-4" />,
  };

  // Map footer href to navigateTo slug
  const handleLinkClick = (href: string) => {
    const slug = href.replace('#/', '').replace('#', '') || 'home';
    navigateTo(slug);
  };

  return (
    <footer className="bg-tostem-footer text-gray-300">
      {/* Trust Badges Row */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                <badge.icon className="w-4 h-4 text-tostem-blue" />
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-black tracking-[0.15em] text-white mb-4">
              TOSTEM
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {siteMetadata.tagline}. Tostem India brings world-class Japanese
              aluminium window and door technology to India, offering premium
              quality, durability, and energy efficiency.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {footerSocial.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-tostem-blue hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  {socialIconMap[social.icon] || null}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-white/10">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-white/10">
              Products
            </h3>
            <ul className="space-y-2.5">
              {footerProductLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-white/10">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-tostem-blue flex-shrink-0" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  {footerContact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-tostem-blue flex-shrink-0" />
                <a
                  href={`tel:${footerContact.phone}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {footerContact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-tostem-blue flex-shrink-0" />
                <a
                  href={`mailto:${footerContact.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {footerContact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-tostem-blue flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  {footerContact.hours}
                </span>
              </li>
            </ul>

            {/* CTA Button */}
            <Button
              className="mt-6 bg-tostem-blue hover:bg-tostem-blue-light text-white text-xs tracking-wider"
              onClick={() => navigateTo('contact')}
            >
              GET A QUOTATION
            </Button>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-white/10">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Stay updated with the latest products, offers, and design inspiration from Tostem India.
            </p>
            {newsletterSubmitted ? (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-sm h-9"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleNewsletterSubmit();
                    }}
                  />
                  <Button
                    size="sm"
                    className="bg-tostem-blue hover:bg-tostem-blue-light text-white h-9 px-3 flex-shrink-0"
                    onClick={handleNewsletterSubmit}
                    disabled={!newsletterEmail}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-gray-500">
                  Join 10,000+ architects and homeowners
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Tostem India — LIXIL Window Systems
            India Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('about-tostem')}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={() => navigateTo('about-tostem')}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={scrollToTop}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <ArrowUp className="w-3 h-3" />
              Back to Top
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-tostem-blue text-white flex items-center justify-center shadow-lg hover:bg-tostem-blue-light transition-colors z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
}
