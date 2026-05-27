'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Search, Filter, BookOpen, Wrench, ShieldCheck, HardHat, ChevronRight, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import SectionHeading from '@/components/section-heading';
import { useSiteStore } from '@/lib/store';

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  pages: number;
  icon: React.ElementType;
  color: string;
}

const downloadItems: DownloadItem[] = [
  // Brochures
  { id: 'windows-brochure-2025', title: 'Windows Collection 2025', description: 'Complete catalogue of aluminium window designs, specifications, and pricing guide.', category: 'Brochures', fileSize: '12.4 MB', pages: 32, icon: BookOpen, color: 'from-tostem-blue to-tostem-blue-light' },
  { id: 'doors-brochure-2025', title: 'Doors Collection 2025', description: 'Premium aluminium door designs including sliding, casement, and bi-fold options.', category: 'Brochures', fileSize: '10.8 MB', pages: 28, icon: BookOpen, color: 'from-amber-600 to-amber-500' },
  { id: 'giesta-brochure', title: 'GIESTA Entrance Doors', description: 'Steel entrance door collection with premium finishes and security features.', category: 'Brochures', fileSize: '6.2 MB', pages: 16, icon: BookOpen, color: 'from-stone-600 to-stone-500' },
  { id: 'complete-range', title: 'Complete Product Range', description: 'Full product catalogue covering all windows, doors, facades, and interior solutions.', category: 'Brochures', fileSize: '24.6 MB', pages: 48, icon: BookOpen, color: 'from-tostem-dark to-gray-700' },

  // Technical Specs
  { id: 'atis-tech-specs', title: 'ATIS Series Technical Specs', description: 'Detailed technical specifications, performance data, and installation guidelines for ATIS series.', category: 'Technical Specs', fileSize: '8.3 MB', pages: 24, icon: Wrench, color: 'from-teal-600 to-teal-500' },
  { id: 'grants-tech-specs', title: 'Grants Series Technical Specs', description: 'Complete technical documentation for Grants series windows and doors.', category: 'Technical Specs', fileSize: '7.1 MB', pages: 20, icon: Wrench, color: 'from-emerald-600 to-emerald-500' },
  { id: 'we-plus-tech-specs', title: 'We Plus Series Technical Specs', description: 'Performance ratings, cross-sections, and hardware specifications for We Plus series.', category: 'Technical Specs', fileSize: '6.8 MB', pages: 18, icon: Wrench, color: 'from-cyan-600 to-cyan-500' },
  { id: 'we-70-tech-specs', title: 'We 70 Series Technical Specs', description: 'Technical specifications and thermal performance data for We 70 series.', category: 'Technical Specs', fileSize: '5.9 MB', pages: 16, icon: Wrench, color: 'from-sky-600 to-sky-500' },

  // Installation Guides
  { id: 'window-install-guide', title: 'Window Installation Guide', description: 'Step-by-step installation guide for aluminium windows with diagrams and best practices.', category: 'Installation Guides', fileSize: '4.5 MB', pages: 14, icon: HardHat, color: 'from-orange-600 to-orange-500' },
  { id: 'door-install-guide', title: 'Door Installation Guide', description: 'Professional installation instructions for all door types including hardware setup.', category: 'Installation Guides', fileSize: '5.1 MB', pages: 16, icon: HardHat, color: 'from-red-600 to-red-500' },
  { id: 'maintenance-guide', title: 'Maintenance & Care Guide', description: 'Expert tips for maintaining your TOSTEM products for maximum longevity.', category: 'Installation Guides', fileSize: '3.2 MB', pages: 10, icon: HardHat, color: 'from-rose-600 to-rose-500' },

  // Warranty Documents
  { id: 'warranty-policy', title: 'Warranty Policy Document', description: 'Complete warranty terms, conditions, and claim procedures for all TOSTEM products.', category: 'Warranty', fileSize: '1.8 MB', pages: 8, icon: ShieldCheck, color: 'from-green-600 to-green-500' },
  { id: 'warranty-registration', title: 'Warranty Registration Form', description: 'Product registration form to activate your 10-year warranty coverage.', category: 'Warranty', fileSize: '0.5 MB', pages: 2, icon: ShieldCheck, color: 'from-lime-600 to-lime-500' },
  { id: 'quality-certificates', title: 'Quality Certificates', description: 'ISO 9001, ISO 14001, and JIS certification documents for TOSTEM products.', category: 'Warranty', fileSize: '2.4 MB', pages: 6, icon: ShieldCheck, color: 'from-emerald-600 to-emerald-500' },
];

const categories = ['All', 'Brochures', 'Technical Specs', 'Installation Guides', 'Warranty'];

export default function DownloadCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [downloadFormOpen, setDownloadFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DownloadItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const navigateTo = useSiteStore((s) => s.navigateTo);

  const filteredItems = useMemo(() => {
    return downloadItems.filter((item) => {
      const matchesSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleDownloadClick = (item: DownloadItem) => {
    setSelectedItem(item);
    setFormSubmitted(false);
    setFormData({ name: '', email: '', phone: '' });
    setDownloadFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Store submission in localStorage
    const submissions = JSON.parse(localStorage.getItem('tostem-downloads') || '[]');
    submissions.push({ ...formData, item: selectedItem?.id, date: new Date().toISOString() });
    localStorage.setItem('tostem-downloads', JSON.stringify(submissions));
  };

  const categoryIcons: Record<string, React.ElementType> = {
    'All': Filter,
    'Brochures': BookOpen,
    'Technical Specs': Wrench,
    'Installation Guides': HardHat,
    'Warranty': ShieldCheck,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-tostem-dark text-white py-20 overflow-hidden pattern-dots">
        <div className="absolute inset-0 bg-gradient-to-br from-tostem-blue/20 via-transparent to-tostem-blue/10" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-tostem-blue-light inline-flex items-center gap-2 mb-4">
              <span className="w-[3px] h-4 rounded-full bg-tostem-blue-light inline-block" />
              Resources
              <span className="w-[3px] h-4 rounded-full bg-tostem-blue-light inline-block" />
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Download Center</h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">Access our complete library of brochures, technical specifications, installation guides, and warranty documents.</p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white dark:bg-[#111] border-b border-gray-100 dark:border-white/10 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tostem-text-muted" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="pl-10 h-11 rounded-xl border-gray-200 dark:border-white/10 bg-tostem-light-gray dark:bg-white/5"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat] || Filter;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-tostem-blue text-white shadow-md'
                        : 'bg-tostem-light-gray dark:bg-white/10 text-tostem-text-light dark:text-gray-400 hover:bg-tostem-mid-gray dark:hover:bg-white/15'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-sm text-tostem-text-muted dark:text-gray-500 mt-2">
            Showing {filteredItems.length} of {downloadItems.length} documents
          </p>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="py-16 bg-tostem-light-gray dark:bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-tostem-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-tostem-dark dark:text-gray-200 mb-2">No documents found</h3>
              <p className="text-tostem-text-light dark:text-gray-400">Try adjusting your search or filter criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Color Bar Top */}
                  <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-tostem-dark dark:text-gray-100 text-sm leading-tight mb-1">{item.title}</h3>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-tostem-blue bg-tostem-blue/10 px-2 py-0.5 rounded-full">{item.category}</span>
                      </div>
                    </div>
                    <p className="text-sm text-tostem-text-light dark:text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-tostem-text-muted dark:text-gray-500">
                        <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{item.pages} pages</span>
                        <span>{item.fileSize}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleDownloadClick(item)}
                        className="bg-tostem-blue hover:bg-tostem-blue-light text-white text-xs btn-ripple"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-tostem-dark text-white py-16 relative overflow-hidden pattern-dots">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-blue/10 via-transparent to-tostem-blue/10" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-4">Need a Physical Copy?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Request printed brochures and technical documentation delivered to your doorstep.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigateTo('#/contact')}
              className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8 btn-ripple"
            >
              Contact Us
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              onClick={() => navigateTo('#/e-catalogue')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8"
            >
              View E-Catalogue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Download Form Modal */}
      <Dialog open={downloadFormOpen} onOpenChange={setDownloadFormOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-[#1a1a1a]">
          {formSubmitted ? (
            <div className="py-8 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <DialogTitle className="text-xl font-bold text-tostem-dark dark:text-white mb-2">Download Ready!</DialogTitle>
              <p className="text-sm text-tostem-text-light dark:text-gray-400 mb-4">Your download for &quot;{selectedItem?.title}&quot; will begin shortly.</p>
              <Button onClick={() => setDownloadFormOpen(false)} className="bg-tostem-blue hover:bg-tostem-blue-light text-white">
                Close
              </Button>
            </div>
          ) : (
            <>
              <DialogTitle className="text-lg font-bold text-tostem-dark dark:text-white">
                Download &quot;{selectedItem?.title}&quot;
              </DialogTitle>
              <p className="text-sm text-tostem-text-light dark:text-gray-400 mb-4">Please provide your details to download this document.</p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-tostem-dark dark:text-gray-300 mb-1 block">Full Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter your full name"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-tostem-dark dark:text-gray-300 mb-1 block">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="Enter your email"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-tostem-dark dark:text-gray-300 mb-1 block">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="rounded-lg"
                  />
                </div>
                <Button type="submit" className="w-full bg-tostem-blue hover:bg-tostem-blue-light text-white btn-ripple">
                  <Download className="w-4 h-4 mr-2" />
                  Download Now
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
