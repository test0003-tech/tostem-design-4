'use client';

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  footerQuickLinks,
  footerProductLinks,
  footerContact,
  footerSocial,
  siteMetadata,
} from '@/lib/tostem-data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIconMap: Record<string, React.ReactNode> = {
    facebook: <Facebook className="w-4 h-4" />,
    instagram: <Instagram className="w-4 h-4" />,
    youtube: <Youtube className="w-4 h-4" />,
    linkedin: <Linkedin className="w-4 h-4" />,
    twitter: <Twitter className="w-4 h-4" />,
  };

  return (
    <footer className="bg-tostem-footer text-gray-300">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
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
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </a>
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
              onClick={() => {
                const el = document.querySelector('#quotation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              GET A QUOTATION
            </Button>
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
            <a
              href="#privacy"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="#terms"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Terms & Conditions
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="#sitemap"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Sitemap
            </a>
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
