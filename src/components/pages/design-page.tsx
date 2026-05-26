'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Home, CheckCircle, ShieldCheck, VolumeX, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { PageRegistryItem } from '@/lib/tostem-data';

function navigateTo(slug: string) {
  window.location.hash = `/${slug}`;
}

const designDetails: Record<string, {
  title: string; subtitle: string; description: string; image: string; features: string[]; specs: { label: string; value: string }[]; series: { name: string; slug: string }[];
}> = {
  'aluminium-sliding-doors': {
    title: 'Aluminium Sliding Doors',
    subtitle: 'Smooth-Gliding Elegance',
    description: 'Tostem\'s aluminium sliding doors offer effortless operation with multi-track options. Available in 2-panel, 3-panel, 4-panel, and corner sliding configurations, these doors create seamless indoor-outdoor transitions.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    features: ['Smooth gliding operation', 'Multi-track options (2/3/4 panels)', 'Corner sliding available', 'Superior sealing performance', 'Low maintenance', 'Multi-point locking system'],
    specs: [{ label: 'Max Panel Width', value: '1200mm' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 40dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'Grants', slug: 'grants-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'aluminium-casement-doors': {
    title: 'Aluminium Casement Doors',
    subtitle: 'Classic Swing Design',
    description: 'Casement doors from Tostem provide elegant swing-style access with single or double panel configurations. Available in in-swing and out-swing variants with premium hardware.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    features: ['Single and double panel options', 'In-swing and out-swing variants', 'Premium multi-lock hardware', 'Excellent weather sealing', 'Wide opening for easy access', 'Available in multiple series'],
    specs: [{ label: 'Max Panel Width', value: '1000mm' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 40dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'aluminium-sliding-windows-designs': {
    title: 'Aluminium Sliding Windows',
    subtitle: 'Effortless Horizontal Glide',
    description: 'Tostem\'s sliding windows offer smooth horizontal operation with excellent sealing performance. Available in multiple track and panel configurations for any room.',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=80',
    features: ['Smooth sliding operation', '2/3/4 panel options', 'SFS (Slim Frame System) available', 'Excellent air and water tightness', 'Easy to clean and maintain', 'Multiple track configurations'],
    specs: [{ label: 'Max Panel Width', value: '1200mm' }, { label: 'Max Panel Height', value: '2400mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 40dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'Grants', slug: 'grants-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }, { name: 'We 70', slug: 'we-70-windows-doors-series' }],
  },
  'aluminium-casement-windows': {
    title: 'Aluminium Casement Windows',
    subtitle: 'Maximum Ventilation & Views',
    description: 'Side-hinged casement windows that open outward, providing maximum ventilation and unobstructed views. Available with single lock, multi lock, and friction stay options.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    features: ['Single and multi lock options', 'Friction stay and hinge variants', 'Maximum ventilation opening', 'Excellent weather protection', 'Easy operation', 'Premium hardware'],
    specs: [{ label: 'Max Panel Width', value: '800mm' }, { label: 'Max Panel Height', value: '2400mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 40dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'aluminium-french-doors': {
    title: 'Aluminium French Doors',
    subtitle: 'Timeless Double-Door Elegance',
    description: 'Classic double-door design with aluminium precision. French doors from Tostem offer timeless elegance and functionality, creating beautiful transitions between spaces.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80',
    features: ['Classic double-door design', 'Elegant profile lines', 'Wide opening for easy access', 'Premium locking system', 'Excellent thermal insulation', 'Multiple colour options'],
    specs: [{ label: 'Max Panel Width', value: '900mm' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 38dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'Grants', slug: 'grants-windows-doors-series' }],
  },
  'aluminium-bi-folding-doors': {
    title: 'Aluminium Bi-Folding Doors',
    subtitle: 'Wide-Open Living Spaces',
    description: 'Multi-panel folding doors that stack neatly to one side, creating wide-open spaces for seamless indoor-outdoor living. Available in 4, 6, 8, and up to 16 panel configurations.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    features: ['4 to 16 panel options', 'Stack neatly to one side', 'Smooth folding mechanism', 'Wide opening for large spaces', 'Premium track system', 'Corner folding available'],
    specs: [{ label: 'Max Panels', value: '16' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 38dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }],
  },
};

interface DesignPageProps {
  slug: string;
  pageInfo: PageRegistryItem;
}

export default function DesignPage({ slug, pageInfo }: DesignPageProps) {
  const details = designDetails[slug];

  if (!details) {
    // Fallback to generic page content
    return (
      <div className="pt-[88px] lg:pt-[132px]">
        <section className="relative h-[350px] overflow-hidden bg-tostem-dark">
          <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">{pageInfo.title}</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white">{pageInfo.title}</h1>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <p className="text-tostem-text-light leading-relaxed">{pageInfo.description || `Explore Tostem's ${pageInfo.title} — designed with Japanese precision for Indian homes and commercial spaces.`}</p>
            <div className="mt-8">
              <Button className="bg-tostem-blue text-white" onClick={() => navigateTo('contact')}>Get Quotation <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${details.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a>
                <ChevronRight className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(pageInfo.type === 'design' ? 'aluminium-doors-design-prices' : 'home'); }} className="hover:text-white">Our Products</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">{details.title}</span>
              </nav>
              <Badge className="bg-tostem-blue text-white mb-3">{details.subtitle}</Badge>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{details.title}</h1>
              <p className="text-base text-white/70 max-w-2xl">{details.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features & Specs */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold text-tostem-dark mb-6">Key Features</h2>
              <ul className="space-y-4">
                {details.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tostem-blue mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-tostem-text-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold text-tostem-dark mb-6">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {details.specs.map((spec) => (
                  <div key={spec.label} className="bg-tostem-light-gray rounded-lg p-4">
                    <div className="text-xs text-tostem-text-muted uppercase tracking-wider">{spec.label}</div>
                    <div className="text-lg font-bold text-tostem-dark mt-1">{spec.value}</div>
                  </div>
                ))}
              </div>
              {/* Quick benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-100">
                  <ShieldCheck className="w-5 h-5 text-tostem-blue" />
                  <span className="text-sm text-tostem-text-light">100+ quality checks per product</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-100">
                  <VolumeX className="w-5 h-5 text-tostem-blue" />
                  <span className="text-sm text-tostem-text-light">Up to 40dB sound reduction</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-100">
                  <Sparkles className="w-5 h-5 text-tostem-blue" />
                  <span className="text-sm text-tostem-text-light">5x harder anodized finish</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Series */}
      {details.series.length > 0 && (
        <section className="py-12 md:py-16 bg-tostem-light-gray">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-tostem-dark mb-8">Available in These Series</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {details.series.map((s) => (
                <a key={s.slug} href={`#/${s.slug}`} onClick={(e) => { e.preventDefault(); navigateTo(s.slug); }} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group">
                  <div className="text-xl font-black text-tostem-blue mb-2 group-hover:scale-105 transition-transform">{s.name}</div>
                  <div className="flex items-center gap-1 text-tostem-blue text-sm font-medium group-hover:gap-2 transition-all">View Series <ArrowRight className="w-3 h-3" /></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 bg-tostem-dark">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Get a Quotation for {details.title}</h2>
          <p className="text-white/60 mb-6">Contact us for a free consultation and quote for your project.</p>
          <Button className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8" onClick={() => navigateTo('contact')}>Get Free Quotation <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </section>
    </div>
  );
}
