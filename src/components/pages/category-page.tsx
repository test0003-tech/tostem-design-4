'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Home, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { pageRegistry, type PageRegistryItem } from '@/lib/tostem-data';

function navigateTo(slug: string) {
  window.location.hash = `/${slug}`;
}

// Category-specific data
const categoryInfo: Record<string, {
  title: string; description: string; image: string; designs: { name: string; slug: string; }[]; series: { name: string; slug: string; tagline: string }[];
}> = {
  'aluminium-doors-design-prices': {
    title: 'Aluminium Doors',
    description: 'Discover Tostem\'s premium range of aluminium doors — from elegant sliding doors to grand folding systems, each designed with Japanese precision for Indian homes.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    designs: [
      { name: 'Sliding Doors', slug: 'aluminium-sliding-doors' },
      { name: 'Casement Doors', slug: 'aluminium-casement-doors' },
      { name: 'French Doors', slug: 'aluminium-french-doors' },
      { name: 'Folding (Bi Fold) Doors', slug: 'aluminium-bi-folding-doors' },
      { name: 'Corner Slider Door', slug: 'aluminium-corner-slider-door' },
      { name: 'Slide and Fold Doors', slug: 'aluminium-slide-fold-doors' },
      { name: 'Ventilation Doors', slug: 'ventilation-doors' },
    ],
    series: [
      { name: 'Grants', slug: 'grants-windows-doors-series', tagline: 'Break The Norm With Fine Line Of Design & Function' },
      { name: 'ATIS', slug: 'atis-windows-doors-series', tagline: 'Framing The Beauty Of Living' },
      { name: 'We Plus', slug: 'we-plus-windows-doors-series', tagline: 'Performance Oriented Design' },
      { name: 'We 70', slug: 'we-70-windows-doors-series', tagline: 'Design Meets Performance & Reliability' },
    ],
  },
  'aluminium-windows-design-prices': {
    title: 'Aluminium Windows',
    description: 'Explore Tostem\'s premium range of aluminium windows — from classic sliding to contemporary tilt-and-slide, every window is engineered for performance and beauty.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    designs: [
      { name: 'Sliding Windows', slug: 'aluminium-sliding-windows-designs' },
      { name: 'Casement Windows', slug: 'aluminium-casement-windows' },
      { name: 'Awning Windows', slug: 'aluminium-hung-awning-windows' },
      { name: 'Fixed Windows', slug: 'aluminium-fixed-window' },
      { name: 'Glass To Glass Corner Windows', slug: 'aluminium-glass-to-glass-corner-window' },
      { name: 'French Windows', slug: 'aluminium-french-windows' },
      { name: 'Tilt and Slide Windows', slug: 'aluminium-tilt-slide-windows' },
      { name: 'Slit Windows', slug: 'aluminium-slit-windows' },
      { name: 'Vertical Sliding Windows', slug: 'aluminium-vertical-sliding-windows' },
    ],
    series: [
      { name: 'Grants', slug: 'grants-windows-doors-series', tagline: 'Break The Norm With Fine Line Of Design & Function' },
      { name: 'ATIS', slug: 'atis-windows-doors-series', tagline: 'Framing The Beauty Of Living' },
      { name: 'We Plus', slug: 'we-plus-windows-doors-series', tagline: 'Performance Oriented Design' },
      { name: 'We 70', slug: 'we-70-windows-doors-series', tagline: 'Design Meets Performance & Reliability' },
    ],
  },
  'steel-entrance-doors': {
    title: 'Steel Entrance Doors',
    description: 'Tostem\'s GIESTA steel entrance doors combine Japanese design excellence with superior security, creating stunning first impressions for your home.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    designs: [
      { name: 'GIESTA Design Simulation', slug: 'e-catalogue' },
    ],
    series: [
      { name: 'Giesta Doors', slug: 'giesta-doors', tagline: 'Japanese Entrance Door Design' },
      { name: 'Giesta with Ventilation', slug: 'giesta-ventilation-doors', tagline: 'Ventilation Meets Security' },
    ],
  },
  'airflow-system': {
    title: 'Airflow System',
    description: 'Tostem\'s airflow solutions ensure optimal ventilation without compromising on security or aesthetics, keeping your home fresh and comfortable.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80',
    designs: [
      { name: 'GIESTA Airflow', slug: 'giesta-ventilation-doors' },
      { name: 'Ventilation Doors', slug: 'ventilation-doors' },
      { name: 'Ventilation Slot', slug: 'ventilation-slots' },
      { name: 'Aluminium Louvers', slug: 'aluminum-louver' },
      { name: 'Glass Louvers', slug: 'glass-louver' },
    ],
    series: [
      { name: 'We 70', slug: 'we-70-windows-doors-series', tagline: 'Design Meets Performance & Reliability' },
    ],
  },
  'facades': {
    title: 'Façades',
    description: 'Tostem\'s aluminium façade systems create stunning glass exteriors for commercial and residential buildings, combining aesthetics with structural performance.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    designs: [
      { name: 'Curtain Wall Facades', slug: 'facade-curtain-wall' },
      { name: 'Store Front Facades', slug: 'facade-store-front' },
    ],
    series: [],
  },
  'interior': {
    title: 'Interior',
    description: 'Enhance your interiors with Tostem\'s aluminium hanging and swing door solutions, designed for modern living spaces that demand both style and functionality.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
    designs: [
      { name: 'Hanging Doors', slug: 'hanging-door' },
      { name: 'Swing Doors', slug: 'swing-door' },
      { name: 'Fixed Divider', slug: 'fixed-divider' },
    ],
    series: [],
  },
};

interface CategoryPageProps {
  slug: string;
  pageInfo: PageRegistryItem;
}

export default function CategoryPage({ slug, pageInfo }: CategoryPageProps) {
  const info = categoryInfo[slug];

  if (!info) {
    return (
      <div className="pt-[132px] min-h-screen flex items-center justify-center">
        <p className="text-tostem-text-light">Category not found</p>
      </div>
    );
  }

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${info.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white transition-colors">Home</a>
                <ChevronRight className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white transition-colors">Our Products</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">{info.title}</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{info.title}</h1>
              <p className="text-base text-white/70 max-w-2xl">{info.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Designs Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-tostem-dark mb-8">Our Designs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {info.designs.map((design, i) => (
              <motion.a
                key={design.slug}
                href={`#/${design.slug}`}
                onClick={(e) => { e.preventDefault(); navigateTo(design.slug); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-tostem-light-gray">
                  <div className="absolute inset-0 bg-gradient-to-br from-tostem-blue/20 to-tostem-dark/20 flex items-center justify-center">
                    <span className="text-4xl font-black text-tostem-blue/20">{design.name[0]}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <Badge className="absolute top-3 left-3 bg-tostem-blue/90 text-white text-[10px]">{info.title}</Badge>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-tostem-dark group-hover:text-tostem-blue transition-colors">{design.name}</h3>
                  <div className="mt-3 flex items-center gap-1 text-tostem-blue text-sm font-medium group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Series Section */}
      {info.series.length > 0 && (
        <section className="py-12 md:py-16 bg-tostem-light-gray">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-tostem-dark mb-8">Available Series</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {info.series.map((series, i) => (
                <motion.a
                  key={series.slug}
                  href={`#/${series.slug}`}
                  onClick={(e) => { e.preventDefault(); navigateTo(series.slug); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl font-black text-tostem-blue mb-2">{series.name}</div>
                  <p className="text-sm text-tostem-text-light mb-4">{series.tagline}</p>
                  <div className="flex items-center gap-1 text-tostem-blue text-sm font-medium group-hover:gap-2 transition-all">
                    Explore Series <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 bg-tostem-dark">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Interested in {info.title}?</h2>
          <p className="text-white/60 mb-6">Get a free consultation and quotation for your project.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8" onClick={() => navigateTo('contact')}>
              Get Free Quotation <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8" onClick={() => navigateTo('contact')}>
              Contact Us <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
