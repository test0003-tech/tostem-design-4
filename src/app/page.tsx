'use client';

import PageRouter from '@/components/page-router';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CookieConsent from '@/components/cookie-consent';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageRouter />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
