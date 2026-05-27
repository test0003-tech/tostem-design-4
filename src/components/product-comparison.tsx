'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Check, ArrowRight, GitCompare, CheckCircle, XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { DesignData } from '@/lib/tostem-data';

// ====== Comparison Specs Map ======
interface ComparisonSpecs {
  maxWidth: string;
  maxHeight: string;
  glassThickness: string;
  soundReduction: string;
  features: string[];
  series: string[];
}

const comparisonSpecsMap: Record<string, ComparisonSpecs> = {
  'Windows': {
    maxWidth: '2400mm',
    maxHeight: '2400mm',
    glassThickness: '5mm - 24mm',
    soundReduction: 'Up to 40dB',
    features: ['Superior Ventilation', 'Weather Sealed', 'Sound Insulation', 'Energy Efficient', 'Smooth Operation'],
    series: ['ATIS', 'GRANTS', 'RIKU'],
  },
  'Doors': {
    maxWidth: '3000mm',
    maxHeight: '2700mm',
    glassThickness: '5mm - 28mm',
    soundReduction: 'Up to 42dB',
    features: ['Elegant Entry', 'Multi-Point Lock', 'Wide Opening', 'Thermal Insulation', 'Heavy-Duty Frame'],
    series: ['ATIS', 'GRANTS', 'RIKU'],
  },
  'Steel Doors': {
    maxWidth: '1800mm',
    maxHeight: '2400mm',
    glassThickness: 'N/A',
    soundReduction: 'Up to 45dB',
    features: ['Japanese GIESTA Tech', 'High Security Lock', 'Premium Steel', 'Anti-Corrosion', 'Designer Finish'],
    series: ['GIESTA'],
  },
  'Airflow': {
    maxWidth: '1800mm',
    maxHeight: '1800mm',
    glassThickness: '5mm - 12mm',
    soundReduction: 'Up to 30dB',
    features: ['Optimized Airflow', 'Adjustable Blades', 'Weather Resistant', 'Low Maintenance', 'Modern Aesthetic'],
    series: ['ATIS', 'GRANTS'],
  },
  'Facades': {
    maxWidth: 'Custom',
    maxHeight: 'Custom',
    glassThickness: '8mm - 32mm',
    soundReduction: 'Up to 48dB',
    features: ['Curtain Wall Engineering', 'Store-Front Glazing', 'Large Span', 'Architectural Flexibility', 'Structural Bonding'],
    series: ['ATIS'],
  },
  'Interior': {
    maxWidth: '2400mm',
    maxHeight: '2700mm',
    glassThickness: '5mm - 16mm',
    soundReduction: 'Up to 35dB',
    features: ['Space Saving', 'Seamless Division', 'Premium Finish', 'Smooth Sliding', 'Noise Reduction'],
    series: ['RIKU', 'GRANTS'],
  },
};

function navigateTo(slug: string) {
  if (slug === 'home') {
    window.location.hash = '';
  } else {
    window.location.hash = `/${slug}`;
  }
}

// ====== Floating Comparison Bar ======
interface ComparisonBarProps {
  selectedItems: DesignData[];
  onRemoveItem: (id: string) => void;
  onCompareNow: () => void;
  onClearAll: () => void;
}

export function ComparisonBar({ selectedItems, onRemoveItem, onCompareNow, onClearAll }: ComparisonBarProps) {
  if (selectedItems.length < 2) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-auto z-[55] bg-tostem-dark/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl"
      >
        <div className="p-4 flex items-center gap-4">
          {/* Selected Items */}
          <div className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0 custom-scrollbar">
            <div className="flex items-center gap-1.5 text-tostem-blue flex-shrink-0">
              <GitCompare className="w-4 h-4" />
              <span className="text-xs font-semibold text-white whitespace-nowrap">{selectedItems.length}/3</span>
            </div>
            {selectedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 flex-shrink-0"
              >
                <span className="text-xs font-medium text-white truncate max-w-[120px]">{item.name}</span>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="w-4 h-4 rounded-full bg-white/20 hover:bg-red-500/80 flex items-center justify-center text-white transition-colors"
                  aria-label={`Remove ${item.name} from comparison`}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onClearAll}
              className="text-xs text-white/60 hover:text-white transition-colors px-2 py-1"
            >
              Clear
            </button>
            <Button
              size="sm"
              className="bg-tostem-blue hover:bg-tostem-blue-light text-white text-xs px-4"
              onClick={onCompareNow}
            >
              Compare Now <ArrowRight className="w-3 h-3 ml-1.5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ====== Compare Checkbox Button ======
interface CompareCheckboxProps {
  isSelected: boolean;
  isDisabled: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function CompareCheckbox({ isSelected, isDisabled, onClick }: CompareCheckboxProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled && !isSelected}
      className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
        isSelected
          ? 'bg-tostem-blue text-white'
          : isDisabled
          ? 'bg-gray-400/80 text-gray-300 cursor-not-allowed opacity-0 group-hover:opacity-100'
          : 'bg-white/90 hover:bg-tostem-blue text-tostem-dark hover:text-white opacity-0 group-hover:opacity-100'
      }`}
      aria-label={isSelected ? 'Remove from comparison' : isDisabled ? 'Comparison full (max 3)' : 'Add to comparison'}
      aria-pressed={isSelected}
    >
      {isSelected ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
    </button>
  );
}

// ====== Comparison Dialog ======
interface ComparisonDialogProps {
  items: DesignData[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComparisonDialog({ items, open, onOpenChange }: ComparisonDialogProps) {
  const specsRows = [
    { label: 'Max Width', key: 'maxWidth' as const },
    { label: 'Max Height', key: 'maxHeight' as const },
    { label: 'Glass Thickness', key: 'glassThickness' as const },
    { label: 'Sound Reduction', key: 'soundReduction' as const },
  ];

  // Gather all unique features across selected items
  const allFeatures = Array.from(
    new Set(items.flatMap((item) => comparisonSpecsMap[item.category]?.features || []))
  );

  // Gather all unique series across selected items
  const allSeries = Array.from(
    new Set(items.flatMap((item) => comparisonSpecsMap[item.category]?.series || []))
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-tostem-dark text-xl flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-tostem-blue" />
            Product Comparison
          </DialogTitle>
          <DialogDescription className="text-tostem-text-light">
            Compare up to 3 products side-by-side to find the perfect fit for your project.
          </DialogDescription>
        </DialogHeader>

        {items.length < 2 ? (
          <div className="py-12 text-center">
            <GitCompare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-tostem-text-light">Select at least 2 products to compare.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Product Headers */}
            <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
              {items.map((item) => {
                const specs = comparisonSpecsMap[item.category] || comparisonSpecsMap['Windows'];
                return (
                  <div key={item.id} className="text-center">
                    {/* Image */}
                    <div className="relative rounded-lg overflow-hidden aspect-[4/3] mb-3">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-2 left-2 bg-tostem-blue text-white text-[10px]">
                        {item.category}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-tostem-dark leading-tight mb-1">{item.name}</h3>
                    <p className="text-xs text-tostem-text-light line-clamp-2">{item.description}</p>
                    <Button
                      size="sm"
                      className="mt-3 bg-tostem-blue hover:bg-tostem-blue-light text-white text-xs w-full"
                      onClick={() => {
                        onOpenChange(false);
                        navigateTo('contact');
                      }}
                    >
                      Get Quotation <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Specs Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <div className="bg-tostem-light-gray px-4 py-3">
                <h4 className="text-sm font-bold text-tostem-dark">Technical Specifications</h4>
              </div>
              {specsRows.map((row, i) => (
                <div
                  key={row.key}
                  className={`grid items-center px-4 py-3 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                  style={{ gridTemplateColumns: `140px repeat(${items.length}, 1fr)` }}
                >
                  <span className="text-xs font-semibold text-tostem-dark">{row.label}</span>
                  {items.map((item) => {
                    const specs = comparisonSpecsMap[item.category] || comparisonSpecsMap['Windows'];
                    return (
                      <span key={item.id} className="text-sm text-tostem-text-light text-center font-medium">
                        {specs[row.key]}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Feature Comparison */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <div className="bg-tostem-light-gray px-4 py-3">
                <h4 className="text-sm font-bold text-tostem-dark">Feature Comparison</h4>
              </div>
              {allFeatures.map((feature, i) => (
                <div
                  key={feature}
                  className={`grid items-center px-4 py-2.5 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                  style={{ gridTemplateColumns: `180px repeat(${items.length}, 1fr)` }}
                >
                  <span className="text-xs font-medium text-tostem-dark">{feature}</span>
                  {items.map((item) => {
                    const specs = comparisonSpecsMap[item.category] || comparisonSpecsMap['Windows'];
                    const hasFeature = specs.features.includes(feature);
                    return (
                      <div key={item.id} className="flex justify-center">
                        {hasFeature ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-300" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Series Comparison */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-tostem-light-gray px-4 py-3">
                <h4 className="text-sm font-bold text-tostem-dark">Available Series</h4>
              </div>
              {allSeries.map((series, i) => (
                <div
                  key={series}
                  className={`grid items-center px-4 py-2.5 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                  style={{ gridTemplateColumns: `140px repeat(${items.length}, 1fr)` }}
                >
                  <span className="text-xs font-semibold text-tostem-dark">{series}</span>
                  {items.map((item) => {
                    const specs = comparisonSpecsMap[item.category] || comparisonSpecsMap['Windows'];
                    const hasSeries = specs.series.includes(series);
                    return (
                      <div key={item.id} className="flex justify-center">
                        {hasSeries ? (
                          <Badge className="bg-tostem-blue/10 text-tostem-blue text-[10px]">
                            Available
                          </Badge>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
