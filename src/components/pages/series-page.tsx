'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Thermometer, VolumeX, Droplets, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { seriesData } from '@/lib/tostem-data';
import type { PageRegistryItem } from '@/lib/tostem-data';
import BreadcrumbNav from '@/components/breadcrumb-nav';

function navigateTo(slug: string) {
  window.location.hash = `/${slug}`;
}

// Key highlights data per series
const seriesHighlights: Record<string, { icon: React.ElementType; label: string; value: string }[]> = {
  atis: [
    { icon: Thermometer, label: 'Thermal Insulation', value: 'U-value 1.3' },
    { icon: VolumeX, label: 'Sound Proofing', value: 'Up to 40dB' },
    { icon: Droplets, label: 'Water Resistance', value: '600Pa' },
    { icon: Wind, label: 'Air Permeability', value: 'Class 4' },
  ],
  grants: [
    { icon: Thermometer, label: 'Thermal Insulation', value: 'U-value 1.8' },
    { icon: VolumeX, label: 'Sound Proofing', value: 'Up to 32dB' },
    { icon: Droplets, label: 'Water Resistance', value: '400Pa' },
    { icon: Wind, label: 'Air Permeability', value: 'Class 3' },
  ],
  we70: [
    { icon: Thermometer, label: 'Thermal Insulation', value: 'U-value 1.5' },
    { icon: VolumeX, label: 'Sound Proofing', value: 'Up to 35dB' },
    { icon: Droplets, label: 'Water Resistance', value: '400Pa' },
    { icon: Wind, label: 'Air Permeability', value: 'Class 3' },
  ],
  weplus: [
    { icon: Thermometer, label: 'Thermal Insulation', value: 'U-value 1.4' },
    { icon: VolumeX, label: 'Sound Proofing', value: 'Up to 38dB' },
    { icon: Droplets, label: 'Water Resistance', value: '500Pa' },
    { icon: Wind, label: 'Air Permeability', value: 'Class 4' },
  ],
};

interface SeriesPageProps {
  slug: string;
  pageInfo: PageRegistryItem;
}

export default function SeriesPage({ slug, pageInfo }: SeriesPageProps) {
  const series = seriesData.find((s) => {
    const slugMap: Record<string, string> = {
      'grants-windows-doors-series': 'grants',
      'atis-windows-doors-series': 'atis',
      'we-plus-windows-doors-series': 'weplus',
      'we-70-windows-doors-series': 'we70',
    };
    return s.id === slugMap[slug];
  });

  if (!series) {
    return (
      <div className="pt-[132px] min-h-screen flex items-center justify-center">
        <p className="text-tostem-text-light">Series not found</p>
      </div>
    );
  }

  const highlights = seriesHighlights[series.id] || seriesHighlights.atis;

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${series.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <BreadcrumbNav
                items={[
                  { label: 'Our Products', href: 'aluminium-doors-design-prices' },
                  { label: series.name },
                ]}
              />
              <Badge className="bg-tostem-blue text-white mb-4">{series.tagline}</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4">{series.name}</h1>
              <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">{series.detailedDescription}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-8 md:py-10 bg-white dark:bg-[#111] border-b border-gray-100 dark:border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-tostem-light-gray dark:bg-[#1a1a1a]"
                >
                  <div className="w-10 h-10 rounded-lg bg-tostem-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-tostem-blue" />
                  </div>
                  <div>
                    <div className="text-xs text-tostem-text-muted">{item.label}</div>
                    <div className="text-sm font-bold text-tostem-dark dark:text-gray-200">{item.value}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features & Specs */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-tostem-dark dark:text-gray-200 mb-6">Key Features</h2>
              <ul className="space-y-4">
                {series.features.map((feature) => (
                  <motion.li key={feature} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tostem-blue mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-tostem-text-light dark:text-gray-400">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-tostem-dark dark:text-gray-200 mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {series.specifications.map((spec) => (
                  <motion.div key={spec.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-tostem-light-gray dark:bg-[#1a1a1a] rounded-lg p-4">
                    <div className="text-xs text-tostem-text-muted uppercase tracking-wider">{spec.label}</div>
                    <div className="text-xl font-bold text-tostem-dark dark:text-gray-200 mt-1">{spec.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Product Banner Image */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${series.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="px-4"
          >
            <Badge className="bg-tostem-blue text-white mb-4">{series.tagline}</Badge>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3">{series.name}</h2>
            <p className="text-white/60 max-w-lg mx-auto text-sm md:text-base">{series.detailedDescription}</p>
            <Button
              className="mt-6 bg-tostem-blue hover:bg-tostem-blue-light text-white px-8"
              onClick={() => navigateTo('contact')}
            >
              Get Free Quotation <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Available Products */}
      <section className="py-12 md:py-16 bg-tostem-light-gray dark:bg-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-tostem-dark dark:text-gray-200 mb-8">Available Designs in {series.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Sliding Windows', slug: 'aluminium-sliding-windows-designs' },
              { name: 'Casement Windows', slug: 'aluminium-casement-windows' },
              { name: 'Sliding Doors', slug: 'aluminium-sliding-doors' },
              { name: 'Casement Doors', slug: 'aluminium-casement-doors' },
              { name: 'Fixed Windows', slug: 'aluminium-fixed-window' },
              { name: 'French Doors', slug: 'aluminium-french-doors' },
              { name: 'Awning Windows', slug: 'aluminium-hung-awning-windows' },
              { name: 'French Windows', slug: 'aluminium-french-windows' },
            ].map((item) => (
              <a key={item.slug} href={`#/${item.slug}`} onClick={(e) => { e.preventDefault(); navigateTo(item.slug); }} className="bg-white dark:bg-[#222] rounded-lg p-4 text-center hover:shadow-md transition-shadow group">
                <div className="text-sm font-medium text-tostem-dark dark:text-gray-200 group-hover:text-tostem-blue transition-colors">{item.name}</div>
                <ArrowRight className="w-3 h-3 text-tostem-blue mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-tostem-dark">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Choose {series.name} for Your Project</h2>
          <p className="text-white/60 mb-6">Get a free consultation and quotation for {series.name} series products.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8" onClick={() => navigateTo('contact')}>Get Free Quotation <ArrowRight className="w-4 h-4 ml-2" /></Button>
            <Button className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8" onClick={() => navigateTo('contact')}>Contact Us <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
