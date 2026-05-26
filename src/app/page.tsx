'use client';

import PageRouter from '@/components/page-router';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CookieConsent from '@/components/cookie-consent';
import WhatsAppButton from '@/components/whatsapp-button';
import ScrollProgress from '@/components/scroll-progress';
import FloatingCTABar from '@/components/floating-cta-bar';
import BackToTop from '@/components/back-to-top';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <PageRouter />
      </main>
      <Footer />
      <CookieConsent />
      <WhatsAppButton />
      <FloatingCTABar />
      <BackToTop />
    </div>
  );
}
