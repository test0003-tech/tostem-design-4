'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion';
import SectionHeading from '@/components/section-heading';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqCategories = ['General', 'Products', 'Installation', 'Pricing', 'Warranty'];

const allFaqs: FAQItem[] = [
  // General
  { question: 'What is Tostem?', answer: 'Tostem is a premium brand of aluminium windows and doors from LIXIL, Japan. With over 50 years of Japanese craftsmanship, Tostem offers pre-engineered window and door systems that combine precision manufacturing with elegant design, serving homeowners and architects across India.', category: 'General' },
  { question: 'Where is Tostem manufactured?', answer: 'Tostem products are manufactured in state-of-the-art facilities with Japanese technology and quality standards. The pre-engineered systems are produced in controlled factory environments ensuring consistent quality with over 100 quality checks at every stage of production.', category: 'General' },
  { question: 'How is Tostem different from local window manufacturers?', answer: 'Unlike local manufacturers who fabricate windows on-site, Tostem uses a pre-engineered system where every component is manufactured in a controlled factory environment. This ensures precision fit, superior weather performance, consistent quality, and faster installation with zero on-site fabrication waste.', category: 'General' },
  { question: 'Does Tostem operate across India?', answer: 'Yes, Tostem has a pan-India presence with studios and offices in major cities including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and Pune. Our network of certified installers ensures professional service delivery across the country.', category: 'General' },
  { question: 'What certifications does Tostem have?', answer: 'Tostem products carry ISO 9001, ISO 14001, and JIS (Japanese Industrial Standards) certifications. Our products undergo rigorous testing for wind load resistance, water tightness, air permeability, and sound insulation as per international standards.', category: 'General' },

  // Products
  { question: 'What types of windows does Tostem offer?', answer: 'Tostem offers a comprehensive range of aluminium windows including sliding windows, casement windows, tilt-and-turn windows, French windows, fixed windows, awning windows, vertical sliding windows, and glass-to-glass corner windows. Each type is available across multiple design series.', category: 'Products' },
  { question: 'What types of doors does Tostem offer?', answer: 'Our door range includes sliding doors, slide-fold doors, French doors, entrance doors (GIESTA series), corner slider doors, and ventilation doors. Tostem doors feature premium hardware, multi-point locking, and superior sealing systems.', category: 'Products' },
  { question: 'What is the GIESTA series?', answer: 'GIESTA is Tostem\'s premium entrance door series from Japan. These steel doors feature a unique anodized surface coating that resists scratches, fading, and corrosion for over 40 years. GIESTA doors offer superior security with multi-point locking and elegant Japanese design.', category: 'Products' },
  { question: 'What series are available in Tostem products?', answer: 'Tostem offers 6 series: ATIS (standard residential), GRANTS (premium residential), VIENTO (enhanced ventilation), NOSTALGIE (heritage styling), TOSTEM CLASSIC (essential range), and GIESTA (entrance doors). Each series has unique features tailored to different needs and budgets.', category: 'Products' },
  { question: 'Can I customize the colour of my windows and doors?', answer: 'Yes, Tostem offers an extensive range of colour options through our anodized and powder-coated finishes. Choose from wood-grain textures, solid colours, and metallic finishes. Our surface colour protection ensures the finish lasts for decades without fading.', category: 'Products' },

  // Installation
  { question: 'How long does installation take?', answer: 'A typical residential installation takes 15-24 working days from site survey to completion. The actual on-site installation usually takes 1-2 days. Our pre-engineered system means most of the work happens in our factory, minimizing disruption to your home.', category: 'Installation' },
  { question: 'Do I need to prepare anything before installation?', answer: 'Our team will guide you through the preparation steps during the site survey. Generally, we need clear access to the installation areas and wall openings to be ready. Our technicians handle the rest, including precise measurements and professional fitting.', category: 'Installation' },
  { question: 'Who performs the installation?', answer: 'All Tostem installations are carried out by our certified technicians who are trained in Japanese installation standards. They use specialized tools and follow strict protocols to ensure perfect fit, proper sealing, and optimal performance of your windows and doors.', category: 'Installation' },
  { question: 'Can Tostem windows be installed in existing buildings?', answer: 'Yes, Tostem windows and doors can be installed in both new construction and renovation projects. Our site survey team will assess the existing openings and recommend the best approach. Our pre-engineered system allows for retrofit installations with minimal modification.', category: 'Installation' },
  { question: 'Is there any warranty on installation?', answer: 'Yes, Tostem provides a comprehensive warranty that covers both the product and installation. Our installation warranty ensures that any issues related to fitting, sealing, or operation are addressed promptly by our service team at no additional cost.', category: 'Installation' },

  // Pricing
  { question: 'How much do Tostem windows cost?', answer: 'Tostem window prices vary based on the series, design, size, glazing, and hardware options. Windows start from approximately ₹4,500 per sq ft. We recommend getting a free quotation through our website or visiting a studio for accurate pricing tailored to your project.', category: 'Pricing' },
  { question: 'How much do Tostem doors cost?', answer: 'Door prices depend on the type, series, size, and customization options. Standard doors start from approximately ₹5,200 per sq ft. GIESTA entrance doors are priced separately based on design and finish. Contact us for a detailed quotation.', category: 'Pricing' },
  { question: 'Are there any hidden costs?', answer: 'No. Our quotations include the complete cost of the product, hardware, glazing, delivery, and installation. There are no hidden charges. Any optional upgrades or changes will be clearly communicated and quoted separately before you place the order.', category: 'Pricing' },
  { question: 'Does Tostem offer financing options?', answer: 'Yes, we offer flexible payment plans through our financing partners. You can choose from EMI options, stage-wise payments, or standard payment terms. Our sales team can help you find a payment plan that suits your budget and project timeline.', category: 'Pricing' },
  { question: 'How do I get a free quotation?', answer: 'Getting a quotation is easy! You can fill out the form on our website, call us at 1800-123-4567, or visit any of our studios across India. Our team will schedule a free site survey and provide a detailed quotation within 48 hours.', category: 'Pricing' },

  // Warranty
  { question: 'What warranty does Tostem provide?', answer: 'Tostem offers a comprehensive warranty covering manufacturing defects, hardware malfunction, and sealing failures. The warranty period varies by component: up to 10 years on frames, 5 years on hardware, and 5 years on installation. Our GIESTA doors carry an extended surface warranty.', category: 'Warranty' },
  { question: 'What is not covered under warranty?', answer: 'The warranty does not cover damage caused by misuse, unauthorized modifications, natural disasters, or normal wear and tear of consumable parts like rubber seals. Damage from improper maintenance or use of abrasive cleaners is also excluded. Full terms are provided with your purchase.', category: 'Warranty' },
  { question: 'How do I claim warranty service?', answer: 'To claim warranty service, contact our customer support team via phone (1800-123-4567), email, or through our website. Provide your order number and a description of the issue. Our service team will schedule a visit within 48 hours to assess and resolve the issue.', category: 'Warranty' },
  { question: 'Does the warranty transfer if I sell my home?', answer: 'Yes, the Tostem product warranty is transferable to the new homeowner. The remaining warranty period will continue to apply. The new owner needs to register the transfer with Tostem by providing the original order details and proof of property transfer.', category: 'Warranty' },
  { question: 'How does Tostem\'s anodized surface warranty work?', answer: 'Tostem\'s anodized aluminium surfaces carry a special warranty against fading, chalking, and peeling. Our proprietary anodization process creates a protective layer that is 10x harder than natural aluminium, ensuring the colour and finish remain vibrant for decades even in harsh Indian weather conditions.', category: 'Warranty' },
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    let faqs = allFaqs;
    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      faqs = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lower) ||
          faq.answer.toLowerCase().includes(lower) ||
          faq.category.toLowerCase().includes(lower)
      );
    } else {
      faqs = faqs.filter((faq) => faq.category === activeCategory);
    }
    return faqs;
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    faqCategories.forEach((cat) => {
      counts[cat] = allFaqs.filter((faq) => faq.category === cat).length;
    });
    return counts;
  }, []);

  return (
    <section className="py-16 md:py-24 bg-tostem-light-gray dark:bg-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Frequently Asked Questions"
          title="Got Questions?"
          description="Find answers to the most common questions about Tostem products, installation, and warranty."
        />
        <div className="max-w-3xl mx-auto">
          {/* Search input */}
          <div className="max-w-md mx-auto mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tostem-text-muted" />
            <Input
              type="text"
              placeholder="Search across all categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white dark:bg-[#222] border-gray-200 dark:border-gray-700 focus-visible:border-tostem-blue focus-visible:ring-tostem-blue/20 rounded-lg"
            />
          </div>

          {/* Category tabs */}
          {!searchQuery && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {faqCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-tostem-blue text-white shadow-md shadow-tostem-blue/20'
                      : 'bg-white dark:bg-[#222] text-tostem-text-light dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#333] border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {category}
                  <span className={`ml-1.5 text-xs ${
                    activeCategory === category ? 'text-white/70' : 'text-tostem-text-muted'
                  }`}>
                    ({categoryCounts[category]})
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Search results info */}
          {searchQuery && (
            <p className="text-center text-sm text-tostem-text-muted dark:text-gray-500 mb-4">
              Showing {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} across all categories
            </p>
          )}

          {/* Accordion */}
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              <motion.div
                key={searchQuery || activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {filteredFaqs.map((faq, i) => (
                    <AccordionItem
                      key={`${faq.category}-${i}`}
                      value={`item-${faq.category}-${i}`}
                      className="bg-white dark:bg-[#222] rounded-xl px-6 border-0 shadow-sm"
                    >
                      <AccordionTrigger className="text-left text-sm font-semibold text-tostem-dark dark:text-gray-200 hover:text-tostem-blue hover:no-underline py-5">
                        <span className="flex-1 pr-4">{faq.question}</span>
                        {searchQuery && (
                          <span className="flex-shrink-0 text-[10px] font-medium text-tostem-blue bg-tostem-blue/10 px-2 py-0.5 rounded-full">
                            {faq.category}
                          </span>
                        )}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-tostem-text-light dark:text-gray-400 leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Search className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-tostem-text-muted dark:text-gray-500 text-sm mb-3">No questions found matching your search.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="text-tostem-blue border-tostem-blue/30 hover:bg-tostem-blue/10"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-tostem-blue/5 dark:bg-tostem-blue/10 rounded-xl p-6 md:p-8 border border-tostem-blue/10"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-14 h-14 rounded-full bg-tostem-blue/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-tostem-blue" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-tostem-dark dark:text-white mb-1">
                  Still have questions?
                </h3>
                <p className="text-sm text-tostem-text-light dark:text-gray-400">
                  Our experts are ready to help. Get in touch for personalized answers to your specific requirements.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="tel:18001234567"
                  className="flex items-center gap-2 text-sm font-bold text-tostem-blue hover:text-tostem-blue-light transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  1800-123-4567
                </a>
                <Button
                  className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-6"
                  onClick={() => { window.location.hash = '/contact'; }}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
