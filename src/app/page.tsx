'use client';

import PageRouter from '@/components/page-router';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CookieConsent from '@/components/cookie-consent';
import WhatsAppButton from '@/components/whatsapp-button';
import ScrollProgress from '@/components/scroll-progress';
import FloatingCTABar from '@/components/floating-cta-bar';
import BackToTop from '@/components/back-to-top';
import SocialProof from '@/components/social-proof';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-tostem-blue focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold">
        Skip to main content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1">
        <PageRouter />
      </main>
      <Footer />
      <CookieConsent />
      <WhatsAppButton />
      <SocialProof />
      <FloatingCTABar />
      <BackToTop />
    </div>
  );
}
