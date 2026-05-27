'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Thermometer, VolumeX, Droplets, Wind, Building2, Home, Sparkles } from 'lucide-react';
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

// Series comparison data
const seriesComparison: Record<string, { label: string; values: Record<string, string> }[]> = {
  atis: [
    { label: 'Thermal Insulation', values: { atis: 'U-value 1.3 ★★★★★', weplus: 'U-value 1.4 ★★★★☆', grants: 'U-value 1.8 ★★★☆☆', we70: 'U-value 1.5 ★★★★☆' } },
    { label: 'Sound Proofing', values: { atis: 'Up to 40dB ★★★★★', weplus: 'Up to 38dB ★★★★☆', grants: 'Up to 32dB ★★★☆☆', we70: 'Up to 35dB ★★★★☆' } },
    { label: 'Water Resistance', values: { atis: '600Pa ★★★★★', weplus: '500Pa ★★★★☆', grants: '400Pa ★★★☆☆', we70: '400Pa ★★★☆☆' } },
    { label: 'Price Range', values: { atis: 'Premium', weplus: 'Mid-Premium', grants: 'Mid-Range', we70: 'Budget-Friendly' } },
  ],
  grants: [
    { label: 'Thermal Insulation', values: { grants: 'U-value 1.8 ★★★☆☆', atis: 'U-value 1.3 ★★★★★', weplus: 'U-value 1.4 ★★★★☆', we70: 'U-value 1.5 ★★★★☆' } },
    { label: 'Sound Proofing', values: { grants: 'Up to 32dB ★★★☆☆', atis: 'Up to 40dB ★★★★★', weplus: 'Up to 38dB ★★★★☆', we70: 'Up to 35dB ★★★★☆' } },
    { label: 'Water Resistance', values: { grants: '400Pa ★★★☆☆', atis: '600Pa ★★★★★', weplus: '500Pa ★★★★☆', we70: '400Pa ★★★☆☆' } },
    { label: 'Price Range', values: { grants: 'Mid-Range', atis: 'Premium', weplus: 'Mid-Premium', we70: 'Budget-Friendly' } },
  ],
  we70: [
    { label: 'Thermal Insulation', values: { we70: 'U-value 1.5 ★★★★☆', atis: 'U-value 1.3 ★★★★★', weplus: 'U-value 1.4 ★★★★☆', grants: 'U-value 1.8 ★★★☆☆' } },
    { label: 'Sound Proofing', values: { we70: 'Up to 35dB ★★★★☆', atis: 'Up to 40dB ★★★★★', weplus: 'Up to 38dB ★★★★☆', grants: 'Up to 32dB ★★★☆☆' } },
    { label: 'Water Resistance', values: { we70: '400Pa ★★★☆☆', atis: '600Pa ★★★★★', weplus: '500Pa ★★★★☆', grants: '400Pa ★★★☆☆' } },
    { label: 'Price Range', values: { we70: 'Budget-Friendly', atis: 'Premium', weplus: 'Mid-Premium', grants: 'Mid-Range' } },
  ],
  weplus: [
    { label: 'Thermal Insulation', values: { weplus: 'U-value 1.4 ★★★★☆', atis: 'U-value 1.3 ★★★★★', grants: 'U-value 1.8 ★★★☆☆', we70: 'U-value 1.5 ★★★★☆' } },
    { label: 'Sound Proofing', values: { weplus: 'Up to 38dB ★★★★☆', atis: 'Up to 40dB ★★★★★', grants: 'Up to 32dB ★★★☆☆', we70: 'Up to 35dB ★★★★☆' } },
    { label: 'Water Resistance', values: { weplus: '500Pa ★★★★☆', atis: '600Pa ★★★★★', grants: '400Pa ★★★☆☆', we70: '400Pa ★★★☆☆' } },
    { label: 'Price Range', values: { weplus: 'Mid-Premium', atis: 'Premium', grants: 'Mid-Range', we70: 'Budget-Friendly' } },
  ],
};

const seriesNames: Record<string, string> = {
  atis: 'ATIS',
  grants: 'Grants',
  we70: 'We 70',
  weplus: 'We Plus',
};

// Ideal For data per series
const idealForData: Record<string, { icon: React.ElementType; title: string; description: string }[]> = {
  atis: [
    { icon: Home, title: 'Premium Homes', description: 'Luxury residences that demand the finest acoustic and thermal performance with sophisticated aesthetics.' },
    { icon: Building2, title: 'High-Rise Apartments', description: 'Tall buildings requiring superior wind load resistance and water tightness at elevated floors.' },
    { icon: Building2, title: 'Commercial Spaces', description: 'Office buildings and retail spaces needing premium sound insulation and energy efficiency.' },
    { icon: Sparkles, title: 'Noise-Sensitive Areas', description: 'Properties near airports, highways, or railways that need maximum sound reduction.' },
  ],
  grants: [
    { icon: Home, title: 'Mid-Range Homes', description: 'Quality-conscious homeowners seeking a balance between performance and budget.' },
    { icon: Building2, title: 'Renovation Projects', description: 'Ideal for upgrading existing homes with modern aluminium windows and doors.' },
    { icon: Home, title: 'First-Time Buyers', description: 'New homeowners looking for reliable, good-quality aluminium products at competitive prices.' },
  ],
  we70: [
    { icon: Home, title: 'Budget-Conscious Projects', description: 'Mass housing and builder projects requiring reliable performance at affordable prices.' },
    { icon: Building2, title: 'Mass Housing', description: 'Large-scale residential developments needing consistent quality across hundreds of units.' },
    { icon: Building2, title: 'Builder Projects', description: 'Real estate developers seeking trusted brand quality with attractive pricing for project margins.' },
  ],
  weplus: [
    { icon: Home, title: 'Performance-Seeking Homes', description: 'Homeowners who want near-premium performance without the premium price tag.' },
    { icon: Building2, title: 'Modern Apartments', description: 'Contemporary apartment complexes demanding energy efficiency and sound insulation.' },
    { icon: Sparkles, title: 'Eco-Friendly Buildings', description: 'Green buildings and IGBC-certified projects requiring excellent thermal performance.' },
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
  const comparison = seriesComparison[series.id] || seriesComparison.atis;
  const idealFor = idealForData[series.id] || idealForData.atis;

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
                currentSlug={slug}
                items={[
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

      {/* Series Comparison Mini-Table */}
      <section className="py-10 md:py-14 bg-tostem-light-gray dark:bg-[#1a1a1a]">
        <div className="max-w-[1000px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-tostem-blue uppercase tracking-wider">Compare Series</span>
              <h2 className="text-xl md:text-2xl font-bold text-tostem-dark dark:text-gray-200 mt-2">
                How {series.name} Compares
              </h2>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-tostem-dark text-white">
                    <th className="py-3 px-4 text-left font-semibold">Feature</th>
                    {Object.keys(comparison[0]?.values || {}).map((key) => (
                      <th
                        key={key}
                        className={`py-3 px-4 text-center font-semibold ${key === series.id ? 'bg-tostem-blue' : ''}`}
                      >
                        {seriesNames[key] || key}
                        {key === series.id && (
                          <span className="block text-[10px] font-normal opacity-80">Current</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`${i % 2 === 0 ? 'bg-white dark:bg-[#222]' : 'bg-tostem-light-gray dark:bg-[#1a1a1a]'} border-t border-gray-100 dark:border-white/5`}
                    >
                      <td className="py-3 px-4 font-medium text-tostem-dark dark:text-gray-200">{row.label}</td>
                      {Object.entries(row.values).map(([key, value]) => (
                        <td
                          key={key}
                          className={`py-3 px-4 text-center ${key === series.id ? 'bg-tostem-blue/5 dark:bg-tostem-blue/10 font-semibold text-tostem-blue' : 'text-tostem-text-light dark:text-gray-400'}`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
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

      {/* Ideal For Section */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-tostem-blue uppercase tracking-wider">Ideal For</span>
              <h2 className="text-2xl md:text-3xl font-bold text-tostem-dark dark:text-gray-200 mt-2">
                Where {series.name} Shines
              </h2>
              <p className="text-sm text-tostem-text-light dark:text-gray-400 mt-2">Discover the perfect applications for this series</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {idealFor.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group p-6 rounded-xl bg-tostem-light-gray dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 hover:border-tostem-blue/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-tostem-blue/10 flex items-center justify-center mb-4 group-hover:bg-tostem-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6 text-tostem-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-bold text-tostem-dark dark:text-gray-200 mb-2">{item.title}</h3>
                    <p className="text-sm text-tostem-text-light dark:text-gray-400 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
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
