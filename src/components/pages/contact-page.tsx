'use client';

import { motion } from 'framer-motion';
import { Home, ChevronRight, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="pt-[88px] lg:pt-[132px]">
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4"><Home className="w-3 h-3" /><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a><ChevronRight className="w-3 h-3" /><span className="text-white">Contact</span></nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">TOSTEM Offices</h1>
              <p className="text-white/60">Find a TOSTEM office near you or get in touch with our team.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-tostem-dark mb-6">Get in Touch</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-2xl mb-4">✓</div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">Thank you!</h3>
                  <p className="text-green-700">We&apos;ve received your enquiry and will get back to you shortly.</p>
                  <Button className="mt-4 bg-tostem-blue text-white" onClick={() => setSubmitted(false)}>Submit Another Enquiry</Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium text-tostem-dark mb-1 block">Name *</label><Input placeholder="Your Name" required /></div>
                    <div><label className="text-sm font-medium text-tostem-dark mb-1 block">Phone *</label><Input placeholder="+91 XXXXX XXXXX" type="tel" required /></div>
                    <div><label className="text-sm font-medium text-tostem-dark mb-1 block">Email *</label><Input placeholder="you@example.com" type="email" required /></div>
                    <div><label className="text-sm font-medium text-tostem-dark mb-1 block">City</label><Input placeholder="Your City" /></div>
                  </div>
                  <div><label className="text-sm font-medium text-tostem-dark mb-1 block">Product Interest</label>
                    <select className="w-full h-10 px-3 border rounded-md text-sm"><option>Aluminium Windows</option><option>Aluminium Doors</option><option>Steel Entrance Doors</option><option>Facades</option><option>Interior Solutions</option><option>Other</option></select>
                  </div>
                  <div><label className="text-sm font-medium text-tostem-dark mb-1 block">Message</label><Textarea placeholder="Tell us about your project..." rows={4} /></div>
                  <Button type="submit" className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8"><Send className="w-4 h-4 mr-2" />Submit Enquiry</Button>
                </form>
              )}
            </div>
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-tostem-dark rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3"><Phone className="w-4 h-4 mt-1 text-tostem-blue flex-shrink-0" /><div><div className="text-sm font-medium">Toll Free</div><a href="tel:18002667500" className="text-sm text-white/70 hover:text-white">1800-266-7500</a></div></div>
                  <div className="flex items-start gap-3"><Mail className="w-4 h-4 mt-1 text-tostem-blue flex-shrink-0" /><div><div className="text-sm font-medium">Email</div><a href="mailto:info@tostemindia.com" className="text-sm text-white/70 hover:text-white">info@tostemindia.com</a></div></div>
                  <div className="flex items-start gap-3"><Clock className="w-4 h-4 mt-1 text-tostem-blue flex-shrink-0" /><div><div className="text-sm font-medium">Business Hours</div><div className="text-sm text-white/70">Mon - Sat: 9:00 AM - 6:00 PM</div></div></div>
                </div>
              </div>
              <a href="https://studio.tostemindia.com/" target="_blank" rel="noopener noreferrer" className="block bg-tostem-blue rounded-xl p-6 text-white text-center hover:bg-tostem-blue-light transition-colors">
                <MapPin className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-bold">Find a TOSTEM Studio</div>
                <div className="text-xs text-white/60 mt-1">Visit our experience centres across India</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="py-12 md:py-16 bg-tostem-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-tostem-dark mb-8">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div key={office.city} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-tostem-dark mb-2">{office.city}</h3>
                <div className="flex items-start gap-2 mb-3"><MapPin className="w-4 h-4 text-tostem-blue mt-0.5 flex-shrink-0" /><p className="text-sm text-tostem-text-light">{office.address}</p></div>
                <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-sm text-tostem-blue hover:underline"><Phone className="w-3 h-3" />{office.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
