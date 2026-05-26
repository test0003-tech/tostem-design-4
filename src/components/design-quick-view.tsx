'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import type { DesignData } from '@/lib/tostem-data';

// Map category to key features and series
const categoryFeatures: Record<string, string[]> = {
  'Windows': ['Superior ventilation control', 'Weather-sealed construction', 'Sound insulation up to 40dB', 'Energy efficient glazing', 'Smooth operation mechanism'],
  'Doors': ['Elegant entry design', 'Multi-point locking system', 'Wide opening access', 'Thermal insulation', 'Heavy-duty aluminium frame'],
  'Steel Doors': ['Japanese GIESTA technology', 'High-security multi-lock', 'Premium steel construction', 'Anti-corrosion coating', 'Designer finish options'],
  'Airflow': ['Optimized air circulation', 'Adjustable louver blades', 'Weather-resistant design', 'Low maintenance', 'Modern aesthetic appeal'],
  'Facades': ['Curtain wall engineering', 'Store-front glazing system', 'Structural silicone bonding', 'Large span capability', 'Architectural flexibility'],
  'Interior': ['Space-saving design', 'Seamless room division', 'Premium finish options', 'Smooth sliding mechanism', 'Noise reduction properties'],
};

const categorySeries: Record<string, string[]> = {
  'Windows': ['ATIS', 'GRANTS', 'RIKU'],
  'Doors': ['ATIS', 'GRANTS', 'RIKU'],
  'Steel Doors': ['GIESTA'],
  'Airflow': ['ATIS', 'GRANTS'],
  'Facades': ['ATIS'],
  'Interior': ['RIKU', 'GRANTS'],
};

function navigateTo(slug: string) {
  if (slug === 'home') {
    window.location.hash = '';
  } else {
    window.location.hash = `/${slug}`;
  }
}

interface DesignQuickViewProps {
  design: DesignData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DesignQuickViewModal({ design, open, onOpenChange }: DesignQuickViewProps) {
  const features = categoryFeatures[design.category] || categoryFeatures['Windows'];
  const series = categorySeries[design.category] || ['ATIS', 'GRANTS'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Design Image */}
              <div className="relative rounded-lg overflow-hidden aspect-[16/9] mb-4 -mx-1 -mt-1">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${design.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-tostem-blue text-white text-xs">{design.category}</Badge>
                </div>
              </div>

              <DialogHeader>
                <DialogTitle className="text-tostem-dark text-lg">{design.name}</DialogTitle>
                <DialogDescription className="text-tostem-text-light text-sm leading-relaxed">
                  {design.description}
                </DialogDescription>
              </DialogHeader>

              {/* Key Features */}
              <div className="mt-4">
                <h4 className="text-sm font-bold text-tostem-dark mb-2">Key Features</h4>
                <ul className="space-y-1.5">
                  {features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-tostem-text-light">
                      <CheckCircle className="w-3.5 h-3.5 text-tostem-blue mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Available Series */}
              <div className="mt-4">
                <h4 className="text-sm font-bold text-tostem-dark mb-2">Available Series</h4>
                <div className="flex flex-wrap gap-2">
                  {series.map((s) => (
                    <Badge key={s} variant="outline" className="border-tostem-blue/30 text-tostem-blue text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <DialogFooter className="mt-6 gap-2">
                <Button
                  className="bg-tostem-blue hover:bg-tostem-blue-light text-white text-sm"
                  onClick={() => {
                    onOpenChange(false);
                    navigateTo(design.slug);
                  }}
                >
                  View Full Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
                <Button
                  className="bg-tostem-blue hover:bg-tostem-blue-light text-white text-sm"
                  onClick={() => {
                    onOpenChange(false);
                    navigateTo('contact');
                  }}
                >
                  Get Quotation <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export function DesignQuickViewButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-tostem-blue text-tostem-dark hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:shadow-lg"
      aria-label="Quick view"
    >
      <Eye className="w-4 h-4" />
    </button>
  );
}
