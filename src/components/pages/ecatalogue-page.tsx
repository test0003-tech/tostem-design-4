'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, BookOpen, UserPlus, Zap, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface CatalogueItem {
  id: string;
  title: string;
  pages: string;
  gradient: string;
  description: string;
}

const catalogues: CatalogueItem[] = [
  {
    id: 'windows-collection-2025',
    title: 'Windows Collection 2025',
    pages: '32 Pages',
    gradient: 'from-tostem-blue/80 via-tostem-blue/40 to-tostem-blue/10',
    description: 'Complete range of aluminium windows featuring ATIS, GRANTS, WE-70, and WE+ series.',
  },
  {
    id: 'doors-collection-2025',
    title: 'Doors Collection 2025',
    pages: '28 Pages',
    gradient: 'from-amber-700/70 via-amber-600/30 to-amber-500/10',
    description: 'Premium aluminium doors including sliding, casement, French, and bi-folding designs.',
  },
  {
    id: 'giesta-entrance-doors',
    title: 'GIESTA Entrance Doors',
    pages: '16 Pages',
    gradient: 'from-stone-700/70 via-stone-500/30 to-stone-400/10',
    description: 'Japanese-designed steel entrance doors with superior security and elegant aesthetics.',
  },
  {
    id: 'atis-technical-specs',
    title: 'ATIS Series Technical Specs',
    pages: '24 Pages',
    gradient: 'from-teal-700/70 via-teal-500/30 to-teal-400/10',
    description: 'Detailed technical specifications, performance data, and installation guides for ATIS series.',
  },
  {
    id: 'grants-series-brochure',
    title: 'GRANTS Series Brochure',
    pages: '20 Pages',
    gradient: 'from-emerald-700/70 via-emerald-500/30 to-emerald-400/10',
    description: 'Versatile and elegant window and door configurations from the GRANTS series.',
  },
  {
    id: 'complete-product-range',
    title: 'Complete Product Range',
    pages: '48 Pages',
    gradient: 'from-tostem-dark/70 via-tostem-dark/30 to-tostem-dark/10',
    description: 'The complete Tostem product catalogue covering all series, designs, and accessories.',
  },
];

export default function EcataloguePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCatalogue, setSelectedCatalogue] = useState<CatalogueItem | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '' });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleDownload = (catalogue: CatalogueItem) => {
    setSelectedCatalogue(catalogue);
    setFormData({ name: '', email: '', phone: '', city: '' });
    setAgreed(false);
    setSubmitted(false);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.city || !agreed) return;

    // Store submission in localStorage
    const submissions = JSON.parse(localStorage.getItem('tostem-catalogue-submissions') || '[]');
    submissions.push({
      ...formData,
      catalogueId: selectedCatalogue?.id,
      catalogueTitle: selectedCatalogue?.title,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('tostem-catalogue-submissions', JSON.stringify(submissions));

    setSubmitted(true);
  };

  const handleNewsletterSubscribe = () => {
    setSubscribed(true);
  };

  const navigateTo = (slug: string) => {
    if (slug === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = `/${slug}`;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-tostem-dark via-tostem-dark/95 to-tostem-blue/80 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-tostem-blue rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-tostem-blue/50 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-tostem-blue/20 text-tostem-blue border-tostem-blue/30 hover:bg-tostem-blue/30">
              <BookOpen className="w-3 h-3 mr-1" />
              Digital Catalogues
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              E-Catalogue
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Browse and download our premium product catalogues
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalogue Grid */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-tostem-dark dark:text-gray-200 mb-3 tracking-tight">
            Our Product Catalogues
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Download detailed brochures and technical specifications for all Tostem product lines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {catalogues.map((catalogue, index) => (
            <motion.div
              key={catalogue.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Cover Placeholder */}
              <div className={`relative h-48 bg-gradient-to-br ${catalogue.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
                <div className="relative text-center z-10">
                  <FileText className="w-12 h-12 text-white/80 mx-auto mb-2" />
                  <span className="text-white/90 font-bold text-lg tracking-wide">TOSTEM</span>
                </div>
                {/* PDF badge */}
                <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  PDF
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="font-bold text-tostem-dark dark:text-gray-200 text-lg mb-1 group-hover:text-tostem-blue transition-colors duration-200">
                  {catalogue.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{catalogue.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {catalogue.pages}
                  </span>
                  <Button
                    size="sm"
                    className="bg-tostem-blue hover:bg-tostem-blue/90 text-white text-xs gap-1"
                    onClick={() => handleDownload(catalogue)}
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-tostem-light-gray dark:bg-[#1a1a1a] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-tostem-dark dark:text-gray-200 mb-3 tracking-tight">
              How It Works
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Get your catalogue in 3 simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: 'Browse Catalogues',
                description: 'Explore our collection of product catalogues and find the one that matches your needs.',
                step: '01',
              },
              {
                icon: UserPlus,
                title: 'Fill Your Details',
                description: 'Provide your name, email, and contact information so we can send you the catalogue.',
                step: '02',
              },
              {
                icon: Zap,
                title: 'Download Instantly',
                description: 'Get instant access to the PDF brochure after submitting your details.',
                step: '03',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="relative mx-auto w-20 h-20 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-md mb-5">
                  <step.icon className="w-8 h-8 text-tostem-blue" />
                  <span className="absolute -top-1 -right-1 w-7 h-7 bg-tostem-blue text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-bold text-tostem-dark dark:text-gray-200 text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-tostem-dark to-tostem-dark/90 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-tostem-blue rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a physical copy?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              We would be happy to send you a printed catalogue. Contact our team to request your complimentary copy delivered to your doorstep.
            </p>
            <Button
              size="lg"
              className="bg-tostem-blue hover:bg-tostem-blue/90 text-white gap-2"
              onClick={() => navigateTo('contact')}
            >
              <Phone className="w-4 h-4" />
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Download Form Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {submitted ? (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-tostem-dark mb-2">Download Ready!</h3>
              <p className="text-gray-500 text-sm mb-4">
                Thank you, {formData.name}! Your download for <strong>{selectedCatalogue?.title}</strong> has been prepared.
              </p>
              <Button
                className="bg-tostem-blue hover:bg-tostem-blue/90 text-white gap-2"
                onClick={() => setDialogOpen(false)}
              >
                <Download className="w-4 h-4" />
                Close
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-tostem-dark flex items-center gap-2">
                  <FileText className="w-5 h-5 text-tostem-blue" />
                  Download {selectedCatalogue?.title}
                </DialogTitle>
                <DialogDescription>
                  Fill in your details to download the catalogue. We will also email you a copy.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number *</label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">City *</label>
                  <Input
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="flex items-start gap-2 pt-1">
                  <Checkbox
                    id="marketing-consent"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="marketing-consent" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                    I agree to receive marketing communications from Tostem India. You can unsubscribe at any time.
                  </label>
                </div>
                <Button
                  className="w-full bg-tostem-blue hover:bg-tostem-blue/90 text-white gap-2"
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.city || !agreed}
                >
                  <Download className="w-4 h-4" />
                  Download Catalogue
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
