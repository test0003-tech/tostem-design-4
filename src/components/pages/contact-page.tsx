'use client';

import { motion } from 'framer-motion';
import {
  Home, ChevronRight, Phone, Mail, MapPin, Clock, Send,
  Facebook, Instagram, Linkedin, Youtube, MapPinned
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useState } from 'react';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

const offices = [
  { city: 'Gurugram', address: '7th Floor, Tower-B, Emaar Palm Spring, Golf Course Road, Sector-54, Gurugram, Haryana 122003', phone: '+91 124 656 9900' },
  { city: 'Mumbai', address: '101, 1st Floor, Marathon Futurex, N.M. Joshi Marg, Lower Parel, Mumbai 400013', phone: '+91 22 3001 6900' },
  { city: 'Bangalore', address: '2nd Floor, WTC Bangalore, Brigade Gateway Campus, No.26/1, Dr. Rajkumar Road, Malleshwaram, Bangalore 560055', phone: '+91 80 4055 6900' },
  { city: 'Chennai', address: '3rd Floor, Rane Mahal, No.1, K.B. Dasan Road, Alwarpet, Chennai 600018', phone: '+91 44 4055 6900' },
  { city: 'Hyderabad', address: '4th Floor, Cyber Pearl, HITEC City, Madhapur, Hyderabad 500081', phone: '+91 40 4055 6900' },
  { city: 'Pune', address: '2nd Floor, West Wing, Nyati Unitree, Nagar Road, Yerwada, Pune 411006', phone: '+91 20 4055 6900' },
];

const faqs = [
  {
    question: 'What are the typical delivery timelines for Tostem products?',
    answer: 'Standard products are typically delivered within 3-4 weeks from order confirmation. Custom or made-to-order products may take 4-6 weeks. Our team will provide an estimated delivery date at the time of order placement.',
  },
  {
    question: 'Which cities and regions does Tostem serve in India?',
    answer: 'Tostem operates across all major cities in India including Delhi NCR, Mumbai, Bangalore, Chennai, Hyderabad, and Pune. We also serve tier-2 cities through our network of certified channel partners and installers.',
  },
  {
    question: 'Do you provide installation services?',
    answer: 'Yes, Tostem provides end-to-end installation services through our certified installer network. Our trained professionals ensure that every product is installed to meet our stringent quality standards and performance specifications.',
  },
  {
    question: 'How can I get a quotation for my project?',
    answer: 'You can request a free quotation by filling out the contact form on this page, calling our toll-free number 1800-266-7500, or visiting your nearest Tostem Studio. Our team will get back to you within 24 business hours with a detailed quote.',
  },
  {
    question: 'What warranty do Tostem products carry?',
    answer: 'Tostem products come with a comprehensive warranty — typically 10 years on the frame and 5 years on hardware and moving parts. Specific warranty terms vary by product series and are detailed in the product documentation provided at the time of purchase.',
  },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/tostemindia' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/tostemindia' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/tostemindia' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@tostemindia' },
];

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateField = (field: string, value: string) => {
    let error = '';
    if (field === 'name' && !value.trim()) error = 'Name is required';
    if (field === 'phone') {
      if (!value.trim()) error = 'Phone number is required';
      else if (!/^[\d\s+\-()]{7,15}$/.test(value.trim())) error = 'Enter a valid phone number';
    }
    if (field === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) error = 'Enter a valid email address';
    }
    return error;
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    if (touched[field]) {
      const error = validateField(field, value);
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero */}
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">Contact</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">TOSTEM Offices</h1>
              <p className="text-white/60">Find a TOSTEM office near you or get in touch with our team.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-tostem-dark mb-6">Get in Touch</h2>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-xl font-bold">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">Thank you!</h3>
                  <p className="text-green-700">We&apos;ve received your enquiry and will get back to you shortly.</p>
                  <Button className="mt-4 bg-tostem-blue text-white" onClick={() => { setSubmitted(false); setTouched({}); setFormErrors({}); }}>
                    Submit Another Enquiry
                  </Button>
                </motion.div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name') as string;
                    const phone = formData.get('phone') as string;
                    const email = formData.get('email') as string;
                    const errors: FormErrors = {};
                    const nameErr = validateField('name', name);
                    if (nameErr) errors.name = nameErr;
                    const phoneErr = validateField('phone', phone);
                    if (phoneErr) errors.phone = phoneErr;
                    const emailErr = validateField('email', email);
                    if (emailErr) errors.email = emailErr;
                    setFormErrors(errors);
                    setTouched({ name: true, phone: true, email: true });
                    if (Object.keys(errors).length === 0) {
                      setSubmitted(true);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-tostem-dark mb-1 block">Name *</label>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        required
                        className={`${touched.name && formErrors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : touched.name && !formErrors.name ? 'border-green-400 focus:border-green-500 focus:ring-green-200' : ''}`}
                        onBlur={(e) => handleBlur('name', e.target.value)}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                      {touched.name && formErrors.name && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-tostem-dark mb-1 block">Phone *</label>
                      <Input
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        type="tel"
                        required
                        className={`${touched.phone && formErrors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : touched.phone && !formErrors.phone ? 'border-green-400 focus:border-green-500 focus:ring-green-200' : ''}`}
                        onBlur={(e) => handleBlur('phone', e.target.value)}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                      {touched.phone && formErrors.phone && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-tostem-dark mb-1 block">Email *</label>
                      <Input
                        name="email"
                        placeholder="you@example.com"
                        type="email"
                        required
                        className={`${touched.email && formErrors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : touched.email && !formErrors.email ? 'border-green-400 focus:border-green-500 focus:ring-green-200' : ''}`}
                        onBlur={(e) => handleBlur('email', e.target.value)}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                      {touched.email && formErrors.email && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-tostem-dark mb-1 block">City</label>
                      <Input placeholder="Your City" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-tostem-dark mb-1 block">Product Interest</label>
                    <select className="w-full h-10 px-3 border rounded-md text-sm border-gray-200 focus:border-tostem-blue focus:ring-tostem-blue/20 focus:outline-none focus:ring-2">
                      <option>Aluminium Windows</option>
                      <option>Aluminium Doors</option>
                      <option>Steel Entrance Doors</option>
                      <option>Facades</option>
                      <option>Interior Solutions</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-tostem-dark mb-1 block">Message</label>
                    <Textarea placeholder="Tell us about your project..." rows={4} />
                  </div>
                  <Button type="submit" className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8">
                    <Send className="w-4 h-4 mr-2" /> Submit Enquiry
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Sidebar */}
            <div className="space-y-6">
              <div className="bg-tostem-dark rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-1 text-tostem-blue flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Toll Free</div>
                      <a href="tel:18002667500" className="text-sm text-white/70 hover:text-white">1800-266-7500</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-1 text-tostem-blue flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <a href="mailto:info@tostemindia.com" className="text-sm text-white/70 hover:text-white">info@tostemindia.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-1 text-tostem-blue flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Business Hours</div>
                      <div className="text-sm text-white/70">Mon - Sat: 9:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-sm font-bold text-tostem-dark uppercase tracking-wider mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg bg-tostem-light-gray hover:bg-tostem-blue hover:text-white text-tostem-text-light transition-all duration-200 group"
                    >
                      <social.icon className="w-4 h-4 group-hover:text-white" />
                      <span className="text-xs font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="https://studio.tostemindia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-tostem-blue rounded-xl p-6 text-white text-center hover:bg-tostem-blue-light transition-colors"
              >
                <MapPin className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-bold">Find a TOSTEM Studio</div>
                <div className="text-xs text-white/60 mt-1">Visit our experience centres across India</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder + Offices Grid */}
      <section className="py-12 md:py-16 bg-tostem-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-tostem-dark mb-2">
              {offices.length} Offices Across India
            </h2>
            <p className="text-tostem-text-light text-sm max-w-lg mx-auto">
              Our regional offices ensure personalized support and quick turnaround times for your projects.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="relative w-full h-[280px] md:h-[360px] rounded-2xl bg-gray-200 overflow-hidden mb-10 border border-gray-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-tostem-blue/10 flex items-center justify-center mb-4">
                <MapPinned className="w-8 h-8 text-tostem-blue" />
              </div>
              <h3 className="text-lg font-bold text-tostem-dark mb-1">Interactive Map Coming Soon</h3>
              <p className="text-sm text-tostem-text-light">We&apos;re building an interactive map to help you find the nearest Tostem office.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {offices.map((office) => (
                  <span key={office.city} className="px-3 py-1 rounded-full bg-white text-xs font-medium text-tostem-dark shadow-sm border border-gray-100">
                    {office.city}
                  </span>
                ))}
              </div>
            </div>
            {/* Decorative map grid lines */}
            <div className="absolute inset-0 opacity-[0.08]" style={{
              backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Offices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, idx) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-tostem-blue/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-tostem-blue" />
                  <h3 className="text-lg font-bold text-tostem-dark">{office.city}</h3>
                </div>
                <p className="text-sm text-tostem-text-light mb-3 pl-6">{office.address}</p>
                <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-sm text-tostem-blue hover:underline pl-6">
                  <Phone className="w-3 h-3" />{office.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-[900px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-tostem-dark mb-2">Frequently Asked Questions</h2>
            <p className="text-tostem-text-light text-sm">Common questions about contacting and working with Tostem.</p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-white rounded-xl border border-gray-100 px-6 data-[state=open]:border-tostem-blue/20 data-[state=open]:shadow-sm transition-all"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-tostem-dark hover:text-tostem-blue py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-tostem-text-light leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
