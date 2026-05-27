'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, X, Navigation, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';

// ====== Studio Data ======
const studios = [
  {
    id: 'mumbai',
    city: 'Mumbai',
    address: '101, 1st Floor, Marathon Futurex, N.M. Joshi Marg, Lower Parel, Mumbai 400013',
    phone: '+91 22 3001 6900',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    mapX: 22.5,
    mapY: 68,
  },
  {
    id: 'delhi',
    city: 'Delhi NCR',
    address: '7th Floor, Tower-B, Emaar Palm Spring, Golf Course Road, Sector-54, Gurugram, Haryana 122003',
    phone: '+91 124 656 9900',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    mapX: 38,
    mapY: 18,
  },
  {
    id: 'bangalore',
    city: 'Bangalore',
    address: '2nd Floor, WTC Bangalore, Brigade Gateway Campus, No.26/1, Dr. Rajkumar Road, Malleshwaram, Bangalore 560055',
    phone: '+91 80 4055 6900',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    mapX: 35,
    mapY: 72,
  },
  {
    id: 'chennai',
    city: 'Chennai',
    address: '3rd Floor, Rane Mahal, No.1, K.B. Dasan Road, Alwarpet, Chennai 600018',
    phone: '+91 44 4055 6900',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    mapX: 50,
    mapY: 73,
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    address: '4th Floor, Cyber Pearl, HITEC City, Madhapur, Hyderabad 500081',
    phone: '+91 40 4055 6900',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    mapX: 33,
    mapY: 58,
  },
  {
    id: 'pune',
    city: 'Pune',
    address: '2nd Floor, West Wing, Nyati Unitree, Nagar Road, Yerwada, Pune 411006',
    phone: '+91 20 4055 6900',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    mapX: 26,
    mapY: 63,
  },
];

// Simplified India outline SVG path
const indiaOutlinePath = 'M40,5 L48,3 L55,5 L62,8 L67,12 L72,18 L75,24 L76,30 L74,36 L70,40 L66,44 L62,48 L58,52 L55,56 L52,60 L50,64 L48,68 L50,72 L54,76 L58,78 L55,82 L50,85 L44,86 L38,84 L34,80 L30,76 L28,72 L26,68 L24,64 L22,58 L20,52 L22,46 L24,40 L26,34 L28,28 L30,22 L34,16 L37,10 Z';

export default function StudioFinder() {
  const [selectedStudio, setSelectedStudio] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile on mount
  useState(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  });

  const handleStudioClick = (studioId: string) => {
    setSelectedStudio(studioId);
    setDialogOpen(true);
  };

  const activeStudio = studios.find((s) => s.id === selectedStudio);

  return (
    <div className="w-full">
      {/* Desktop: Map View */}
      <div className="hidden md:block">
        <div className="relative w-full max-w-[600px] mx-auto">
          {/* India SVG Map */}
          <svg
            viewBox="0 0 80 90"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect x="0" y="0" width="80" height="90" fill="transparent" />

            {/* India outline */}
            <path
              d={indiaOutlinePath}
              fill="#e8f0f8"
              stroke="#2E5A87"
              strokeWidth="0.5"
              className="dark:fill-[#1a2a3a] dark:stroke-[#3a6fa3]"
            />

            {/* Studio pins */}
            {studios.map((studio) => (
              <g key={studio.id}>
                {/* Pin pulse ring */}
                <motion.circle
                  cx={studio.mapX}
                  cy={studio.mapY}
                  r={selectedStudio === studio.id ? 3 : 2}
                  fill="none"
                  stroke="#2E5A87"
                  strokeWidth="0.3"
                  animate={{
                    r: selectedStudio === studio.id ? [2, 4, 2] : 2,
                    opacity: selectedStudio === studio.id ? [0.6, 0, 0.6] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Pin dot */}
                <motion.circle
                  cx={studio.mapX}
                  cy={studio.mapY}
                  r={selectedStudio === studio.id ? 1.8 : 1.2}
                  fill={selectedStudio === studio.id ? '#2E5A87' : '#3a6fa3'}
                  stroke="white"
                  strokeWidth="0.4"
                  className="cursor-pointer"
                  whileHover={{ r: 2, fill: '#2E5A87' }}
                  onClick={() => handleStudioClick(studio.id)}
                  animate={selectedStudio === studio.id ? {
                    y: [-0.5, 0.5, -0.5],
                  } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: selectedStudio === studio.id ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                />

                {/* City label */}
                <text
                  x={studio.mapX}
                  y={studio.mapY - 2.5}
                  textAnchor="middle"
                  className="fill-tostem-dark dark:fill-gray-300 text-[2.5px] font-semibold cursor-pointer"
                  onClick={() => handleStudioClick(studio.id)}
                >
                  {studio.city}
                </text>
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-tostem-blue" />
              <span className="text-xs text-tostem-text-light">Tostem Studio</span>
            </div>
            <span className="text-xs text-tostem-text-muted">Click a city for details</span>
          </div>
        </div>
      </div>

      {/* Mobile: List View */}
      <div className="md:hidden space-y-3">
        {studios.map((studio) => (
          <motion.button
            key={studio.id}
            onClick={() => handleStudioClick(studio.id)}
            className="w-full text-left bg-white dark:bg-[#1a1a1a] rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:border-tostem-blue/30 hover:shadow-md transition-all duration-200 flex items-center gap-3"
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 rounded-full bg-tostem-blue/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-tostem-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-tostem-dark dark:text-gray-200 text-sm">{studio.city}</h3>
              <p className="text-xs text-tostem-text-light truncate">{studio.address.split(',')[0]}</p>
            </div>
            <Navigation className="w-4 h-4 text-tostem-blue flex-shrink-0" />
          </motion.button>
        ))}
      </div>

      {/* Studio Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {activeStudio && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-tostem-dark">
                  <div className="w-10 h-10 rounded-xl bg-tostem-blue/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-tostem-blue" />
                  </div>
                  Tostem Studio — {activeStudio.city}
                </DialogTitle>
                <DialogDescription className="text-tostem-text-light text-sm">
                  Visit our {activeStudio.city} studio for personalized consultation and product demonstrations.
                </DialogDescription>
              </DialogHeader>

              {/* Pin drop animation */}
              <div className="flex justify-center py-4">
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div className="relative">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="w-12 h-12 rounded-full bg-tostem-blue flex items-center justify-center mx-auto shadow-lg shadow-tostem-blue/30">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                    {/* Shadow */}
                    <motion.div
                      className="w-8 h-2 bg-black/10 rounded-full mx-auto mt-1"
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-tostem-blue mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-tostem-text-muted uppercase tracking-wider mb-1">Address</div>
                    <p className="text-sm text-tostem-dark dark:text-gray-200 leading-relaxed">{activeStudio.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-tostem-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-tostem-text-muted uppercase tracking-wider mb-1">Phone</div>
                    <a href={`tel:${activeStudio.phone}`} className="text-sm text-tostem-blue hover:underline">{activeStudio.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-tostem-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-tostem-text-muted uppercase tracking-wider mb-1">Business Hours</div>
                    <p className="text-sm text-tostem-dark dark:text-gray-200">{activeStudio.hours}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <a
                  href={`tel:${activeStudio.phone}`}
                  className="flex-1"
                >
                  <Button className="w-full bg-tostem-blue hover:bg-tostem-blue-light text-white">
                    <Phone className="w-4 h-4 mr-2" /> Call Studio
                  </Button>
                </a>
                <a
                  href={`https://www.google.com/maps/search/Tostem+${activeStudio.city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full border-tostem-blue text-tostem-blue hover:bg-tostem-blue/5">
                    <Navigation className="w-4 h-4 mr-2" /> Get Directions
                  </Button>
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
