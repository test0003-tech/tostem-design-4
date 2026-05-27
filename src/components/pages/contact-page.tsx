'use client';

import { motion } from 'framer-motion';
import {
  Home, ChevronRight, Phone, Mail, MapPin, Clock, Send,
  Facebook, Instagram, Linkedin, Youtube, MapPinned, CheckCircle,
  Building2, TrendingUp, Users, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useState, useEffect } from 'react';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

// Animated counter hook
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useState<HTMLDivElement | null>(null)[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('trust-stats');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return count;
}

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

const productInterests = [
  'Windows',
  'Doors',
  'Steel Doors',
  'Airflow Systems',
  'Facades',
  'Interior Solutions',
];

const contactTimes = [
  { value: 'morning', label: 'Morning (9AM-12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM-4PM)' },
  { value: 'evening', label: 'Evening (4PM-7PM)' },
];

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

// Floating label input component
function FloatingLabelInput({
  id,
  label,
  type = 'text',
  required = false,
  error,
  valid,
  value,
  onChange,
  onBlur,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  valid?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 pointer-events-none z-10 ${
          isFloating
            ? 'top-1 text-xs font-medium text-tostem-blue'
            : 'top-1/2 -translate-y-1/2 text-base text-tostem-text-muted'
        }`}
      >
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={(e) => { setFocused(false); onBlur(e); }}
        onFocus={() => setFocused(true)}
        placeholder={isFloating ? placeholder : ''}
        className={`pt-5 pb-2 h-auto bg-white ${
          error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' :
          valid ? 'border-green-400 focus:border-green-500 focus:ring-green-200' :
          'border-gray-200 focus:border-tostem-blue focus:ring-tostem-blue/20'
        }`}
      />
      {/* Animated checkmark */}
      {valid && !error && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <CheckCircle className="w-4 h-4 text-green-500" />
        </motion.div>
      )}
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

// Floating label select component
function FloatingLabelSelect({
  id,
  label,
  options,
  value,
  onChange,
  required = false,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 pointer-events-none z-10 ${
          isFloating
            ? 'top-1 text-xs font-medium text-tostem-blue'
            : 'top-1/2 -translate-y-1/2 text-base text-tostem-text-muted'
        }`}
      >
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pt-5 pb-2 h-12 px-3 border rounded-md text-sm bg-white border-gray-200 focus:border-tostem-blue focus:ring-tostem-blue/20 focus:outline-none focus:ring-2 appearance-none"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {/* Dropdown arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronRight className="w-4 h-4 text-tostem-text-muted rotate-90" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    productInterest: '',
    contactTime: '',
    message: '',
  });
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
    if (field === 'message' && value.length > 500) error = 'Message must be 500 characters or less';
    return error;
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const isFieldValid = (field: string) => {
    if (!touched[field]) return false;
    const value = formValues[field as keyof typeof formValues];
    if (!value || !value.toString().trim()) return false;
    return !validateField(field, value.toString());
  };

  const handleReset = () => {
    setSubmitted(false);
    setTouched({});
    setFormErrors({});
    setFormValues({ name: '', phone: '', email: '', city: '', productInterest: '', contactTime: '', message: '' });
  };

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Decorative Hero Section */}
      <section className="relative h-[350px] md:h-[420px] overflow-hidden bg-tostem-dark">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-tostem-dark via-tostem-blue/40 to-tostem-dark" />
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        {/* Floating decorative shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[10%] right-[8%] w-40 h-40 md:w-64 md:h-64 rounded-full border border-white/5"
            animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[15%] right-[25%] w-24 h-24 md:w-36 md:h-36 rounded-full border border-tostem-blue/10 bg-tostem-blue/5"
            animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[40%] left-[5%] w-1.5 h-20 md:h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[20%] left-[30%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-tostem-blue/5 blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">Contact</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-3">Get in Touch</h1>
              <p className="text-white/60 text-lg max-w-xl">Find a TOSTEM office near you or reach out to our team for expert guidance on your next project.</p>
              <div className="flex items-center gap-4 mt-6">
                <a href="tel:18002667500" className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm border border-white/10 transition-colors">
                  <Phone className="w-4 h-4" /> 1800-266-7500
                </a>
                <a href="mailto:info@tostemindia.com" className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm border border-white/10 transition-colors">
                  <Mail className="w-4 h-4" /> info@tostemindia.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section id="trust-stats" className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Building2, value: 6, suffix: '', label: 'Offices', count: useCountUp(6) },
              { icon: TrendingUp, value: 500, suffix: '+', label: 'Projects', count: useCountUp(500) },
              { icon: Users, value: 98, suffix: '%', label: 'Satisfaction', count: useCountUp(98) },
              { icon: Award, value: 24, suffix: 'hr', label: 'Response', count: useCountUp(24) },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-5 h-5 text-tostem-blue mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-black text-tostem-dark">
                  {stat.count}<span className="text-tostem-blue">{stat.suffix}</span>
                </div>
                <div className="text-xs text-tostem-text-muted font-medium mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
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
                  <Button className="mt-4 bg-tostem-blue text-white" onClick={handleReset}>
                    Submit Another Enquiry
                  </Button>
                </motion.div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const errors: FormErrors = {};
                    const nameErr = validateField('name', formValues.name);
                    if (nameErr) errors.name = nameErr;
                    const phoneErr = validateField('phone', formValues.phone);
                    if (phoneErr) errors.phone = phoneErr;
                    const emailErr = validateField('email', formValues.email);
                    if (emailErr) errors.email = emailErr;
                    const msgErr = validateField('message', formValues.message);
                    if (msgErr) errors.message = msgErr;
                    setFormErrors(errors);
                    setTouched({ name: true, phone: true, email: true, message: true });
                    if (Object.keys(errors).length === 0) {
                      setSubmitted(true);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatingLabelInput
                      id="name"
                      label="Name"
                      required
                      value={formValues.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={(e) => handleBlur('name', e.target.value)}
                      error={touched.name ? formErrors.name : undefined}
                      valid={isFieldValid('name')}
                      placeholder="Your full name"
                    />
                    <FloatingLabelInput
                      id="phone"
                      label="Phone"
                      type="tel"
                      required
                      value={formValues.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={(e) => handleBlur('phone', e.target.value)}
                      error={touched.phone ? formErrors.phone : undefined}
                      valid={isFieldValid('phone')}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    <FloatingLabelInput
                      id="email"
                      label="Email"
                      type="email"
                      required
                      value={formValues.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={(e) => handleBlur('email', e.target.value)}
                      error={touched.email ? formErrors.email : undefined}
                      valid={isFieldValid('email')}
                      placeholder="you@example.com"
                    />
                    <FloatingLabelInput
                      id="city"
                      label="City"
                      value={formValues.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      onBlur={(e) => handleBlur('city', e.target.value)}
                      placeholder="Your city"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatingLabelSelect
                      id="productInterest"
                      label="Product Interest"
                      options={productInterests.map((p) => ({ value: p.toLowerCase().replace(/\s+/g, '-'), label: p }))}
                      value={formValues.productInterest}
                      onChange={(e) => handleChange('productInterest', e.target.value)}
                    />
                    <FloatingLabelSelect
                      id="contactTime"
                      label="Preferred Contact Time"
                      options={contactTimes}
                      value={formValues.contactTime}
                      onChange={(e) => handleChange('contactTime', e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <div className="relative">
                      <label
                        htmlFor="message"
                        className={`absolute left-3 transition-all duration-200 pointer-events-none z-10 ${
                          formValues.message.length > 0 || touched.message
                            ? 'top-1 text-xs font-medium text-tostem-blue'
                            : 'top-3 text-base text-tostem-text-muted'
                        }`}
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formValues.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message', formValues.message)}
                        placeholder={formValues.message.length > 0 ? 'Tell us about your project...' : ''}
                        rows={4}
                        maxLength={500}
                        className={`pt-7 pb-2 bg-white resize-none ${
                          formErrors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-200' :
                          isFieldValid('message') ? 'border-green-400 focus:border-green-500 focus:ring-green-200' :
                          'border-gray-200 focus:border-tostem-blue focus:ring-tostem-blue/20'
                        }`}
                      />
                      {/* Animated checkmark */}
                      {isFieldValid('message') && !formErrors.message && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-3 top-3"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                    {/* Character counter */}
                    <div className="flex justify-between items-center mt-1">
                      {touched.message && formErrors.message ? (
                        <p className="text-xs text-red-500">{formErrors.message}</p>
                      ) : <span />}
                      <span className={`text-xs ${formValues.message.length > 450 ? 'text-orange-500' : 'text-tostem-text-muted'}`}>
                        {formValues.message.length}/500
                      </span>
                    </div>
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
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-tostem-blue/30 overflow-hidden card-lift"
              >
                {/* Gradient top border */}
                <div className="h-1 bg-gradient-to-r from-tostem-blue to-tostem-blue-light" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-tostem-blue" />
                    <h3 className="text-lg font-bold text-tostem-dark">{office.city}</h3>
                  </div>
                  <p className="text-sm text-tostem-text-light mb-3 pl-6">{office.address}</p>
                  <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-sm text-tostem-blue hover:underline pl-6">
                    <Phone className="w-3 h-3" />{office.phone}
                  </a>
                </div>
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
