'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator, X, ArrowRight, ArrowLeft, CheckCircle,
  AppWindow, DoorOpen, Home, Building2, ChevronRight,
  Save, Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';

// ====== Data ======
const productTypes = [
  { id: 'windows', label: 'Windows', icon: AppWindow, basePrice: 450, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80' },
  { id: 'doors', label: 'Doors', icon: DoorOpen, basePrice: 550, image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80' },
  { id: 'interior', label: 'Interior', icon: Home, basePrice: 380, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80' },
  { id: 'exterior', label: 'Exterior', icon: Building2, basePrice: 650, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80' },
];

const subTypes: Record<string, { id: string; label: string; image: string }[]> = {
  windows: [
    { id: 'sliding', label: 'Sliding Window', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80' },
    { id: 'casement', label: 'Casement Window', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80' },
    { id: 'awning', label: 'Awning Window', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80' },
    { id: 'fixed', label: 'Fixed Window', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80' },
    { id: 'tilt-slide', label: 'Tilt-Slide Window', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80' },
    { id: 'french', label: 'French Window', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80' },
  ],
  doors: [
    { id: 'sliding', label: 'Sliding Door', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80' },
    { id: 'casement', label: 'Casement Door', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80' },
    { id: 'french', label: 'French Door', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80' },
    { id: 'bi-fold', label: 'Bi-Folding Door', image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80' },
    { id: 'slide-fold', label: 'Slide & Fold Door', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80' },
  ],
  interior: [
    { id: 'hanging', label: 'Hanging Door', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80' },
    { id: 'swing', label: 'Swing Door', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80' },
    { id: 'fixed-divider', label: 'Fixed Divider', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80' },
  ],
  exterior: [
    { id: 'curtain-wall', label: 'Curtain Wall', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80' },
    { id: 'store-front', label: 'Store Front', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80' },
    { id: 'louver', label: 'Louver System', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80' },
  ],
};

const seriesOptions = [
  { id: 'atis', label: 'ATIS', multiplier: 1.3, description: 'Premium Japanese engineering' },
  { id: 'grants', label: 'Grants', multiplier: 1.0, description: 'Reliable performance' },
  { id: 'we70', label: 'WE-70', multiplier: 0.85, description: 'Value-oriented' },
  { id: 'weplus', label: 'WE+', multiplier: 1.15, description: 'Enhanced features' },
];

interface PriceEstimatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PriceEstimator({ open, onOpenChange }: PriceEstimatorProps) {
  const [step, setStep] = useState(0);
  const [productType, setProductType] = useState('');
  const [subType, setSubType] = useState('');
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(1500);
  const [series, setSeries] = useState('');
  const [saved, setSaved] = useState(false);

  const totalSteps = 4;

  const reset = useCallback(() => {
    setStep(0);
    setProductType('');
    setSubType('');
    setWidth(1200);
    setHeight(1500);
    setSeries('');
    setSaved(false);
  }, []);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setTimeout(reset, 300);
  }, [onOpenChange, reset]);

  const canProceed = () => {
    switch (step) {
      case 0: return !!productType;
      case 1: return !!subType;
      case 2: return width > 0 && height > 0;
      case 3: return !!series;
      default: return false;
    }
  };

  // Price calculation
  const calculatePrice = () => {
    const pt = productTypes.find((p) => p.id === productType);
    const sr = seriesOptions.find((s) => s.id === series);
    if (!pt || !sr) return { min: 0, max: 0, breakdown: { material: 0, hardware: 0, installation: 0, gst: 0 } };

    const areaSqft = (width / 1000) * (height / 1000) * 10.764; // mm² to sqft
    const baseCost = pt.basePrice * areaSqft * sr.multiplier;
    const material = Math.round(baseCost * 0.55);
    const hardware = Math.round(baseCost * 0.20);
    const installation = Math.round(baseCost * 0.10);
    const subtotal = material + hardware + installation;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    return {
      min: Math.round(total * 0.85),
      max: Math.round(total * 1.15),
      breakdown: { material, hardware, installation, gst },
    };
  };

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const handleSave = () => {
    const estimate = {
      productType,
      subType,
      width,
      height,
      series,
      price: calculatePrice(),
      timestamp: Date.now(),
    };
    const existing = JSON.parse(localStorage.getItem('tostem-estimates') || '[]');
    existing.unshift(estimate);
    localStorage.setItem('tostem-estimates', JSON.stringify(existing.slice(0, 20)));
    setSaved(true);
  };

  const price = step === 4 ? calculatePrice() : null;

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-tostem-dark">
            <Calculator className="w-5 h-5 text-tostem-blue" />
            Price Estimator
          </DialogTitle>
          <DialogDescription className="text-tostem-text-light text-sm">
            Get an approximate price estimate for your project in 4 simple steps.
          </DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < step
                    ? 'bg-tostem-blue text-white'
                    : i === step
                    ? 'bg-tostem-blue text-white ring-4 ring-tostem-blue/20'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`flex-1 h-1 rounded-full transition-colors duration-300 ${i < step ? 'bg-tostem-blue' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 0: Product Type */}
          {step === 0 && (
            <motion.div
              key="step-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className="text-lg font-bold text-tostem-dark mb-1">Select Product Type</h3>
              <p className="text-sm text-tostem-text-light mb-4">What type of product are you looking for?</p>
              <div className="grid grid-cols-2 gap-3">
                {productTypes.map((pt) => {
                  const Icon = pt.icon;
                  const isSelected = productType === pt.id;
                  return (
                    <button
                      key={pt.id}
                      onClick={() => setProductType(pt.id)}
                      className={`relative rounded-xl p-4 text-left transition-all duration-200 border-2 ${
                        isSelected
                          ? 'border-tostem-blue bg-tostem-blue/5 shadow-md'
                          : 'border-gray-200 bg-white hover:border-tostem-blue/30 hover:shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="w-5 h-5 text-tostem-blue" />
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${isSelected ? 'bg-tostem-blue/10' : 'bg-gray-100'}`}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-tostem-blue' : 'text-gray-500'}`} />
                      </div>
                      <div className="font-bold text-tostem-dark text-sm">{pt.label}</div>
                      <div className="text-xs text-tostem-text-muted mt-0.5">Starting ₹{pt.basePrice}/sqft</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 1: Sub-Type */}
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className="text-lg font-bold text-tostem-dark mb-1">Select Sub-Type</h3>
              <p className="text-sm text-tostem-text-light mb-4">Choose the specific design variant.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(subTypes[productType] || []).map((st) => {
                  const isSelected = subType === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSubType(st.id)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-200 border-2 ${
                        isSelected
                          ? 'border-tostem-blue shadow-md'
                          : 'border-gray-200 hover:border-tostem-blue/30 hover:shadow-sm'
                      }`}
                    >
                      <div className="aspect-[4/3] relative">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${st.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="w-5 h-5 text-white drop-shadow" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <span className="text-xs font-bold text-white">{st.label}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Dimensions */}
          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className="text-lg font-bold text-tostem-dark mb-1">Enter Dimensions</h3>
              <p className="text-sm text-tostem-text-light mb-6">Specify the width and height of your product.</p>

              <div className="space-y-8">
                {/* Width */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-tostem-dark">Width</label>
                    <Badge className="bg-tostem-blue/10 text-tostem-blue text-sm px-3 py-1">
                      {width} mm
                    </Badge>
                  </div>
                  <Slider
                    value={[width]}
                    min={300}
                    max={3600}
                    step={50}
                    onValueChange={(val) => setWidth(val[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-tostem-text-muted mt-1">
                    <span>300mm</span>
                    <span>3600mm</span>
                  </div>
                </div>

                {/* Height */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-tostem-dark">Height</label>
                    <Badge className="bg-tostem-blue/10 text-tostem-blue text-sm px-3 py-1">
                      {height} mm
                    </Badge>
                  </div>
                  <Slider
                    value={[height]}
                    min={300}
                    max={3000}
                    step={50}
                    onValueChange={(val) => setHeight(val[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-tostem-text-muted mt-1">
                    <span>300mm</span>
                    <span>3000mm</span>
                  </div>
                </div>

                {/* Visual dimension preview */}
                <div className="flex items-center justify-center">
                  <div className="relative border-2 border-dashed border-tostem-blue/30 rounded-lg bg-tostem-light-gray/50 flex items-center justify-center"
                    style={{
                      width: `${Math.min(Math.max(width / 36, 80), 280)}px`,
                      height: `${Math.min(Math.max(height / 36, 80), 200)}px`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xs font-bold text-tostem-blue">{width} × {height}</div>
                      <div className="text-[10px] text-tostem-text-muted">
                        {((width / 1000) * (height / 1000) * 10.764).toFixed(1)} sqft
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Series */}
          {step === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className="text-lg font-bold text-tostem-dark mb-1">Select Series</h3>
              <p className="text-sm text-tostem-text-light mb-4">Series affects price tier and performance level.</p>
              <div className="space-y-3">
                {seriesOptions.map((sr) => {
                  const isSelected = series === sr.id;
                  return (
                    <button
                      key={sr.id}
                      onClick={() => setSeries(sr.id)}
                      className={`w-full rounded-xl p-4 text-left transition-all duration-200 border-2 flex items-center gap-4 ${
                        isSelected
                          ? 'border-tostem-blue bg-tostem-blue/5 shadow-md'
                          : 'border-gray-200 bg-white hover:border-tostem-blue/30 hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-black text-lg ${isSelected ? 'bg-tostem-blue text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {sr.label.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-tostem-dark text-sm">{sr.label}</div>
                        <div className="text-xs text-tostem-text-muted">{sr.description}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${sr.multiplier > 1 ? 'text-amber-600' : sr.multiplier < 1 ? 'text-emerald-600' : 'text-tostem-blue'}`}>
                          {sr.multiplier}x
                        </div>
                        <div className="text-[10px] text-tostem-text-muted">multiplier</div>
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 text-tostem-blue flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === 4 && price && (
            <motion.div
              key="step-4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className="text-lg font-bold text-tostem-dark mb-1">Your Estimate</h3>
              <p className="text-sm text-tostem-text-light mb-4">Based on your selections, here is the approximate cost.</p>

              {/* Price Range */}
              <div className="bg-gradient-to-br from-tostem-blue to-tostem-blue-light rounded-xl p-6 text-white text-center mb-6">
                <div className="text-sm text-white/70 mb-1">Estimated Price Range</div>
                <div className="text-3xl md:text-4xl font-black">
                  {formatPrice(price.min)} - {formatPrice(price.max)}
                </div>
                <div className="text-xs text-white/50 mt-2">
                  For {productTypes.find((p) => p.id === productType)?.label} •{' '}
                  {subTypes[productType]?.find((s) => s.id === subType)?.label} •{' '}
                  {seriesOptions.find((s) => s.id === series)?.label}
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-tostem-light-gray rounded-xl p-4 mb-6">
                <h4 className="text-sm font-bold text-tostem-dark mb-3">Price Breakdown</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Material Cost', value: price.breakdown.material, color: 'bg-tostem-blue' },
                    { label: 'Hardware', value: price.breakdown.hardware, color: 'bg-tostem-blue/70' },
                    { label: 'Installation', value: price.breakdown.installation, color: 'bg-tostem-blue/50' },
                    { label: 'GST (18%)', value: price.breakdown.gst, color: 'bg-amber-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                        <span className="text-sm text-tostem-text-light">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold text-tostem-dark">{formatPrice(item.value)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-300 pt-2 mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-tostem-dark">Total (approx)</span>
                    <span className="text-sm font-black text-tostem-blue">{formatPrice(price.min)} - {formatPrice(price.max)}</span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-tostem-text-muted mb-4 leading-relaxed">
                * Estimates are approximate. Final pricing depends on site conditions, customization, glazing options, and other factors. Contact us for an exact quotation.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 bg-tostem-blue hover:bg-tostem-blue-light text-white"
                  onClick={() => {
                    handleClose();
                    window.location.hash = '/contact';
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" /> Get Exact Quote
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-tostem-blue text-tostem-blue hover:bg-tostem-blue/5"
                  onClick={handleSave}
                  disabled={saved}
                >
                  {saved ? (
                    <><CheckCircle className="w-4 h-4 mr-2" /> Saved!</>
                  ) : (
                    <><Save className="w-4 h-4 mr-2" /> Save Estimate</>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={step === 0}
              className="text-tostem-text-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <span className="text-xs text-tostem-text-muted">
              Step {step + 1} of {totalSteps}
            </span>
            <Button
              onClick={goNext}
              disabled={!canProceed()}
              className="bg-tostem-blue hover:bg-tostem-blue-light text-white"
            >
              {step === 3 ? 'See Estimate' : 'Next'} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Start Over on results page */}
        {step === 4 && (
          <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-100">
            <Button variant="ghost" onClick={reset} className="text-tostem-text-muted text-sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> Start Over
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ====== CTA Card Component (for homepage integration) ======
export function PriceEstimatorCTA({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-tostem-dark to-tostem-dark/90 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-tostem-blue/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-tostem-blue/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-tostem-blue/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Calculator className="w-8 h-8 text-tostem-blue" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
          Estimate Your Project Cost
        </h3>
        <p className="text-sm text-white/60 max-w-md mx-auto mb-6 leading-relaxed">
          Get an instant price estimate for windows, doors, and more. Just select your product, enter dimensions, and choose a series.
        </p>
        <Button
          size="lg"
          className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8 shadow-lg shadow-tostem-blue/20 group-hover:shadow-xl group-hover:shadow-tostem-blue/30 transition-all"
        >
          Get Price Estimate <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
