'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Ear, Zap, Wrench, Shield, DoorOpen, Lock, Sun, Wind, Bug, CloudRain, Building, GlassWater, Maximize2, FolderSync } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { pageRegistry, type PageRegistryItem } from '@/lib/tostem-data';
import BreadcrumbNav from '@/components/breadcrumb-nav';

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

// Why Choose data per category
const whyChooseData: Record<string, { icon: React.ElementType; title: string; description: string }[]> = {
  'aluminium-windows-design-prices': [
    { icon: Ear, title: 'Superior Sound Insulation', description: 'Our multi-chamber profiles and double/triple glazing reduce noise by up to 40dB, creating a peaceful indoor environment even in busy urban areas.' },
    { icon: Zap, title: 'Energy Efficient', description: 'Thermal break technology with U-values as low as 1.3 keeps your home cool in summer and warm in winter, reducing energy bills significantly.' },
    { icon: Wrench, title: 'Low Maintenance', description: 'Anodized aluminium surfaces resist corrosion, fading, and wear. No painting or repainting needed — just wipe clean for years of flawless operation.' },
  ],
  'aluminium-doors-design-prices': [
    { icon: Shield, title: 'Enhanced Security', description: 'Multi-point locking systems and reinforced profiles provide superior protection against break-ins, giving your family complete peace of mind.' },
    { icon: DoorOpen, title: 'Seamless Indoor-Outdoor', description: 'Large opening configurations like slide-and-fold create uninterrupted transitions between indoor and outdoor living spaces.' },
    { icon: Lock, title: 'Premium Hardware', description: 'Japanese-engineered hardware ensures smooth, silent operation for decades. Every handle, hinge, and roller is built to last.' },
  ],
  'steel-entrance-doors': [
    { icon: Shield, title: 'Maximum Security', description: 'Steel-reinforced construction with anti-prong locks and heavy-duty frames provides the highest level of home security available.' },
    { icon: Sun, title: 'Japanese Design', description: 'Inspired by Japanese aesthetic principles, GIESTA doors combine minimalist elegance with bold presence for stunning curb appeal.' },
    { icon: CloudRain, title: 'Weather Resistance', description: 'Tested to withstand extreme Indian weather conditions — from monsoon rains to scorching summers — without warping or degrading.' },
  ],
  'airflow-system': [
    { icon: Wind, title: 'Optimal Ventilation', description: 'Engineered airflow paths allow fresh air circulation while maintaining temperature control, reducing the need for artificial cooling.' },
    { icon: Bug, title: 'Insect Protection', description: 'Integrated mesh and louver designs keep insects out while letting fresh air flow freely, ensuring comfortable and bug-free interiors.' },
    { icon: CloudRain, title: 'Weather Sealed', description: 'Advanced sealing technology prevents rain, dust, and pollutants from entering while allowing controlled ventilation year-round.' },
  ],
  'facades': [
    { icon: Building, title: 'Grand Glass Exteriors', description: 'Create striking building facades with floor-to-ceiling glass systems that maximize natural light and deliver impressive visual impact.' },
    { icon: Zap, title: 'Thermal Performance', description: 'Thermal break profiles combined with high-performance glazing ensure energy efficiency even in large glass installations.' },
    { icon: GlassWater, title: 'Architectural Impact', description: 'Transform ordinary buildings into architectural landmarks with sleek aluminium profiles that define modern commercial and residential design.' },
  ],
  'interior': [
    { icon: Maximize2, title: 'Space Saving', description: 'Hanging and sliding door mechanisms eliminate swing clearance needs, maximizing usable floor space in rooms and corridors.' },
    { icon: Sun, title: 'Modern Aesthetic', description: 'Slim aluminium profiles and clean lines create a contemporary look that complements modern interior design trends.' },
    { icon: FolderSync, title: 'Easy Operation', description: 'Precision-engineered track systems ensure smooth, quiet operation with minimal effort, even for large door panels.' },
  ],
};

// FAQ data per category
const faqData: Record<string, { question: string; answer: string }[]> = {
  'aluminium-windows-design-prices': [
    { question: 'What types of glass are available for Tostem windows?', answer: 'Tostem offers a wide range of glass options including single, double, and triple glazing with options for toughened, laminated, and low-E glass. You can also choose tinted, reflective, or frosted glass for privacy and solar control.' },
    { question: 'How effective are Tostem windows at sound proofing?', answer: 'Tostem windows with double glazing can reduce noise by up to 32dB, and with triple glazing up to 40dB. Our multi-chamber profiles and quality sealing ensure superior acoustic insulation, making them ideal for homes near busy roads or airports.' },
    { question: 'How do I clean and maintain aluminium windows?', answer: 'Simply wipe the frames with a soft cloth and mild soapy water. The anodized finish resists corrosion and fading, so no repainting is needed. Lubricate moving parts annually for optimal performance.' },
    { question: 'What is the installation process for Tostem windows?', answer: 'Tostem windows are pre-engineered in our factory and installed by certified technicians. The process includes precise measurement, custom manufacturing, and professional installation — typically completed within a day for most residential projects.' },
    { question: 'What warranty do Tostem windows come with?', answer: 'Tostem offers a comprehensive warranty covering manufacturing defects, hardware malfunction, and profile integrity. The standard warranty period is 10 years on profiles and 5 years on hardware, ensuring long-term peace of mind.' },
  ],
  'aluminium-doors-design-prices': [
    { question: 'What security features do Tostem aluminium doors include?', answer: 'Tostem doors come with multi-point locking systems, reinforced profiles, anti-lift blocks, and hook bolt locks. Optional upgrades include digital locks and access control systems for enhanced security.' },
    { question: 'What sizes are available for aluminium doors?', answer: 'Tostem doors are available in a wide range of standard and custom sizes. Sliding doors can span up to 6 meters wide, while bi-fold doors can cover openings up to 10 meters. Custom sizes are manufactured to your exact specifications.' },
    { question: 'What configurations are available?', answer: 'We offer sliding, casement, French, bi-fold, and corner-slider configurations. Each is available in various panel combinations to suit your architectural requirements and space constraints.' },
    { question: 'Can Tostem doors be used for balcony access?', answer: 'Yes, Tostem sliding and bi-fold doors are ideal for balcony access. They feature low thresholds for easy access, weather stripping for protection against rain, and smooth operation even with large panel sizes.' },
    { question: 'What is the cost of Tostem aluminium doors?', answer: 'Pricing depends on the series, configuration, size, and glass type selected. Contact us for a free consultation and detailed quotation tailored to your specific project requirements.' },
  ],
  'steel-entrance-doors': [
    { question: 'Are GIESTA steel doors suitable for Indian climate?', answer: 'Yes, GIESTA doors are specifically tested for Indian weather conditions. The steel construction withstands extreme heat, monsoon rains, and humidity without warping, swelling, or corroding.' },
    { question: 'What design options are available for GIESTA doors?', answer: 'GIESTA doors come in multiple design patterns ranging from modern minimalist to classic ornamental styles. You can choose from various panel designs, glass inserts, and color finishes.' },
    { question: 'How secure are steel entrance doors compared to wooden doors?', answer: 'Steel entrance doors provide significantly higher security than wooden doors. They are resistant to forced entry, fire, and impact. The multi-point locking system and reinforced steel frame make them virtually impenetrable.' },
    { question: 'Can I see a GIESTA door before purchasing?', answer: 'Yes, you can visit any Tostem studio across India to see GIESTA doors on display. You can also use our online design simulation tool to visualize the door on your home.' },
  ],
  'airflow-system': [
    { question: 'How does the airflow system work?', answer: 'Tostem airflow systems use precision-engineered louver and slot designs that create directed airflow paths. They allow fresh air in while keeping rain and insects out, maintaining comfortable indoor air quality naturally.' },
    { question: 'Can airflow products be combined with existing windows?', answer: 'Yes, Tostem airflow solutions like ventilation slots and louvers can be integrated with existing window and door systems, or installed as standalone units in walls and partitions.' },
    { question: 'Do airflow systems compromise security?', answer: 'Not at all. All Tostem airflow products include integrated security mesh and robust aluminium construction. They provide ventilation while maintaining the same level of security as our standard window and door systems.' },
    { question: 'Are louvers suitable for rainy climates?', answer: 'Yes, our louvers feature weather-sealed designs with water deflection channels that prevent rain ingress even during heavy monsoon downpours while still allowing controlled airflow.' },
  ],
  'facades': [
    { question: 'What is a curtain wall facade?', answer: 'A curtain wall is an outer covering of a building in which the outer walls are non-structural, utilizing an aluminium frame with glass or metal panels. It keeps weather out and occupants in, while providing stunning visual appeal.' },
    { question: 'Are Tostem facades suitable for residential buildings?', answer: 'Yes, while facades are traditionally associated with commercial buildings, Tostem offers residential-grade facade solutions that provide luxury aesthetics, natural light, and thermal efficiency for premium homes.' },
    { question: 'What thermal performance can I expect from Tostem facades?', answer: 'Tostem facade systems with thermal break technology achieve U-values as low as 1.1 W/m²K. Combined with high-performance glazing, they significantly reduce heating and cooling costs.' },
    { question: 'How are facades installed?', answer: 'Facade installation is handled by Tostem-certified installers. The process involves structural assessment, custom fabrication, and professional installation with strict quality checks at every stage.' },
  ],
  'interior': [
    { question: 'What is the difference between hanging and swing doors?', answer: 'Hanging doors slide along a track mounted above the door, eliminating the need for floor tracks and swing space. Swing doors pivot on hinges like traditional doors but with modern aluminium profiles and premium hardware.' },
    { question: 'Can interior doors be used as room dividers?', answer: 'Yes, Tostem interior doors including fixed dividers and sliding partitions are perfect for creating flexible room layouts. They allow you to open up or close off spaces as needed.' },
    { question: 'Are Tostem interior doors soundproof?', answer: 'While not as acoustically rated as our exterior products, Tostem interior doors with glass infill provide good sound attenuation for room-to-room privacy. Adding double glazing further improves acoustic performance.' },
    { question: 'What finishes are available for interior doors?', answer: 'Tostem interior doors are available in anodized finishes (natural silver, bronze, black), powder-coated RAL colors, and wood-grain finishes. Custom colors are also available to match your interior design scheme.' },
  ],
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

  const benefits = whyChooseData[slug] || whyChooseData['aluminium-windows-design-prices'];
  const faqs = faqData[slug] || faqData['aluminium-windows-design-prices'];

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${info.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <BreadcrumbNav
                currentSlug={slug}
                items={[
                  { label: info.title },
                ]}
              />
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{info.title}</h1>
              <p className="text-base text-white/70 max-w-2xl">{info.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Series Highlight Strip */}
      {info.series.length > 0 && (
        <section className="py-6 md:py-8 bg-tostem-blue/5 dark:bg-tostem-blue/10 border-y border-tostem-blue/10">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-tostem-blue uppercase tracking-wider">Popular Series</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {info.series.slice(0, 4).map((s) => (
                <motion.a
                  key={s.slug}
                  href={`#/${s.slug}`}
                  onClick={(e) => { e.preventDefault(); navigateTo(s.slug); }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group flex items-center justify-between bg-white dark:bg-[#1a1a1a] rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all border border-tostem-blue/10 hover:border-tostem-blue/30"
                >
                  <div>
                    <div className="text-sm font-bold text-tostem-dark dark:text-gray-200">{s.name}</div>
                    <div className="text-xs text-tostem-text-muted line-clamp-1">{s.tagline}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-tostem-blue opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Designs Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-tostem-dark dark:text-gray-200 mb-8">Our Designs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {info.designs.map((design, i) => (
              <motion.a
                key={design.slug}
                href={`#/${design.slug}`}
                onClick={(e) => { e.preventDefault(); navigateTo(design.slug); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-white/10"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-tostem-light-gray dark:bg-[#222]">
                  <div className="absolute inset-0 bg-gradient-to-br from-tostem-blue/20 to-tostem-dark/20 flex items-center justify-center">
                    <span className="text-4xl font-black text-tostem-blue/20">{design.name[0]}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <Badge className="absolute top-3 left-3 bg-tostem-blue/90 text-white text-[10px]">{info.title}</Badge>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-tostem-dark dark:text-gray-200 group-hover:text-tostem-blue transition-colors">{design.name}</h3>
                  <div className="mt-3 flex items-center gap-1 text-tostem-blue text-sm font-medium group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Tostem [Category] Section */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-tostem-blue uppercase tracking-wider">Why Choose Tostem</span>
              <h2 className="text-2xl md:text-3xl font-bold text-tostem-dark dark:text-gray-200 mt-2">
                Why Choose Tostem {info.title}?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group p-6 rounded-xl bg-tostem-light-gray dark:bg-[#1a1a1a] border-l-4 border-transparent hover:border-l-tostem-blue hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-tostem-blue/10 flex items-center justify-center mb-4 group-hover:bg-tostem-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6 text-tostem-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-tostem-dark dark:text-gray-200 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-tostem-text-light dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Series Section */}
      {info.series.length > 0 && (
        <section className="py-12 md:py-16 bg-tostem-light-gray dark:bg-[#1a1a1a]">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-tostem-dark dark:text-gray-200 mb-8">Available Series</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {info.series.map((series, i) => (
                <motion.a
                  key={series.slug}
                  href={`#/${series.slug}`}
                  onClick={(e) => { e.preventDefault(); navigateTo(series.slug); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group bg-white dark:bg-[#222] rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl font-black text-tostem-blue mb-2">{series.name}</div>
                  <p className="text-sm text-tostem-text-light dark:text-gray-400 mb-4">{series.tagline}</p>
                  <div className="flex items-center gap-1 text-tostem-blue text-sm font-medium group-hover:gap-2 transition-all">
                    Explore Series <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-tostem-light-gray dark:bg-[#1a1a1a]">
        <div className="max-w-[900px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-tostem-blue uppercase tracking-wider">FAQ</span>
              <h2 className="text-2xl md:text-3xl font-bold text-tostem-dark dark:text-gray-200 mt-2">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-tostem-text-light dark:text-gray-400 mt-2">Everything you need to know about Tostem {info.title.toLowerCase()}</p>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-white dark:bg-[#222] rounded-xl border border-gray-100 dark:border-white/10 px-6 overflow-hidden data-[state=open]:border-l-tostem-blue data-[state=open]:border-l-4 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-tostem-dark dark:text-gray-200 hover:text-tostem-blue hover:no-underline py-5 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-tostem-text-light dark:text-gray-400 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-tostem-dark relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center relative z-10">
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
