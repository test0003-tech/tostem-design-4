'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, ArrowLeft, CheckCircle, X,
  AppWindow, DoorOpen, Home, Building, VolumeX, Shield, Palette,
  IndianRupee, Zap, LayoutGrid, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { designsData } from '@/lib/tostem-data';
import type { DesignData } from '@/lib/tostem-data';

// ====== Wizard Step Definitions ======
const productTypes = [
  { id: 'windows', label: 'Windows', icon: AppWindow, description: 'Aluminium windows for ventilation & views' },
  { id: 'doors', label: 'Doors', icon: DoorOpen, description: 'Premium entrance & interior doors' },
  { id: 'interior', label: 'Interior', icon: Home, description: 'Space dividers & interior solutions' },
  { id: 'exterior', label: 'Exterior', icon: Building, description: 'Facades & exterior cladding' },
];

const priorities = [
  { id: 'sound', label: 'Sound Insulation', icon: VolumeX, description: 'Block unwanted noise' },
  { id: 'energy', label: 'Energy Efficiency', icon: Zap, description: 'Save on energy bills' },
  { id: 'security', label: 'Security', icon: Shield, description: 'Keep your home safe' },
  { id: 'aesthetics', label: 'Aesthetics', icon: Palette, description: 'Stunning visual appeal' },
  { id: 'budget', label: 'Budget-Friendly', icon: IndianRupee, description: 'Best value for money' },
];

const spaceTypes = [
  { id: 'apartment', label: 'Apartment', icon: Building, description: 'Multi-storey residential' },
  { id: 'villa', label: 'Villa', icon: Home, description: 'Independent house' },
  { id: 'office', label: 'Office', icon: LayoutGrid, description: 'Commercial workspace' },
  { id: 'commercial', label: 'Commercial', icon: Building, description: 'Retail & hospitality' },
  { id: 'renovation', label: 'Renovation', icon: Palette, description: 'Upgrading existing space' },
];

// ====== Recommendation Engine ======
interface RecommendationResult {
  design: DesignData;
  matchScore: number;
  benefits: string[];
}

const categoryToProductType: Record<string, string> = {
  'Windows': 'windows',
  'Doors': 'doors',
  'Steel Doors': 'doors',
  'Airflow': 'windows',
  'Facades': 'exterior',
  'Interior': 'interior',
};

// Scoring weights
const priorityScores: Record<string, Record<string, number>> = {
  sound: { 'Windows': 30, 'Doors': 25, 'Steel Doors': 35, 'Airflow': 10, 'Facades': 20, 'Interior': 15 },
  energy: { 'Windows': 30, 'Doors': 20, 'Steel Doors': 15, 'Airflow': 15, 'Facades': 35, 'Interior': 10 },
  security: { 'Windows': 20, 'Doors': 30, 'Steel Doors': 40, 'Airflow': 5, 'Facades': 15, 'Interior': 10 },
  aesthetics: { 'Windows': 25, 'Doors': 25, 'Steel Doors': 20, 'Airflow': 15, 'Facades': 30, 'Interior': 25 },
  budget: { 'Windows': 30, 'Doors': 20, 'Steel Doors': 10, 'Airflow': 20, 'Facades': 5, 'Interior': 25 },
};

const spaceScores: Record<string, Record<string, number>> = {
  apartment: { 'Windows': 35, 'Doors': 20, 'Steel Doors': 10, 'Airflow': 20, 'Facades': 5, 'Interior': 25 },
  villa: { 'Windows': 25, 'Doors': 25, 'Steel Doors': 20, 'Airflow': 15, 'Facades': 25, 'Interior': 20 },
  office: { 'Windows': 30, 'Doors': 15, 'Steel Doors': 10, 'Airflow': 15, 'Facades': 30, 'Interior': 20 },
  commercial: { 'Windows': 20, 'Doors': 20, 'Steel Doors': 15, 'Airflow': 15, 'Facades': 35, 'Interior': 15 },
  renovation: { 'Windows': 30, 'Doors': 25, 'Steel Doors': 15, 'Airflow': 20, 'Facades': 10, 'Interior': 25 },
};

const categoryBenefits: Record<string, Record<string, string[]>> = {
  sound: {
    'Windows': ['Up to 40dB sound reduction', 'Double/triple glazing options', 'Acoustic sealing technology'],
    'Doors': ['Multi-point sealing system', 'Sound-rated door panels', 'Insulated core construction'],
    'Steel Doors': ['Up to 45dB sound reduction', 'Solid steel construction', 'Premium acoustic insulation'],
    'Airflow': ['Adjustable ventilation control', 'Sound-diffusing louver design'],
    'Facades': ['High-performance acoustic glazing', 'Structural sound barriers'],
    'Interior': ['Noise-reducing partitions', 'Acoustic glass options'],
  },
  energy: {
    'Windows': ['Low-E glass coating', 'Thermal break technology', 'U-value as low as 1.1'],
    'Doors': ['Thermal insulation frame', 'Energy-rated glazing', 'Weather sealing'],
    'Steel Doors': ['Insulated door panels', 'Thermal break design'],
    'Airflow': ['Natural ventilation savings', 'Adjustable airflow control'],
    'Facades': ['Maximum natural light', 'Solar control glazing', 'Thermal efficiency'],
    'Interior': ['Natural light optimization'],
  },
  security: {
    'Windows': ['Multi-point locking', 'Laminated security glass', 'Anti-pry design'],
    'Doors': ['Multi-point locking system', 'Anti-drill cylinders', 'Reinforced frames'],
    'Steel Doors': ['Japanese security technology', 'Multi-lock mechanism', 'Anti-break-in design'],
    'Airflow': ['Secure louver design'],
    'Facades': ['Structural glass strength', 'Impact-resistant options'],
    'Interior': ['Lockable partition options'],
  },
  aesthetics: {
    'Windows': ['Slim profile design', 'Multiple colour options', 'Seamless integration'],
    'Doors': ['Designer door styles', 'Premium finish options', 'Custom configurations'],
    'Steel Doors': ['Luxury entrance designs', 'Japanese craftsmanship', 'Exclusive finishes'],
    'Airflow': ['Modern louver aesthetics', 'Architectural integration'],
    'Facades': ['Statement architecture', 'Full-glass facades', 'Custom design freedom'],
    'Interior': ['Elegant space division', 'Minimalist profiles', 'Seamless transitions'],
  },
  budget: {
    'Windows': ['Starting ₹4,500', 'Low maintenance aluminium', 'Long lifespan value'],
    'Doors': ['Starting ₹5,200', 'Durable construction', 'Minimal upkeep'],
    'Steel Doors': ['Premium investment value'],
    'Airflow': ['Starting ₹3,500', 'Energy savings', 'Low cost ventilation'],
    'Facades': ['Premium commercial value'],
    'Interior': ['Starting ₹3,800', 'Cost-effective division', 'Multi-purpose use'],
  },
};

function getRecommendations(productType: string, priority: string, spaceType: string): RecommendationResult[] {
  const filtered = designsData.filter((d) => categoryToProductType[d.category] === productType);

  const scored = filtered.map((design) => {
    const cat = design.category;
    const pScore = priorityScores[priority]?.[cat] || 0;
    const sScore = spaceScores[spaceType]?.[cat] || 0;
    const total = pScore + sScore;
    const matchScore = Math.min(99, Math.round(50 + total * 0.7));
    const benefits = categoryBenefits[priority]?.[cat] || ['Premium quality', 'Japanese engineering', 'Warranty included'];
    return { design, matchScore, benefits };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, 3);
}

function navigateTo(slug: string) {
  if (slug === 'home') {
    window.location.hash = '';
  } else {
    window.location.hash = `/${slug}`;
  }
}

// ====== Step Option Card ======
function StepOption<T extends { id: string; label: string; icon: React.ElementType; description: string }>({
  option,
  isSelected,
  onClick,
}: {
  option: T;
  isSelected: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
        isSelected
          ? 'border-tostem-blue bg-tostem-blue/5 shadow-md'
          : 'border-gray-200 hover:border-tostem-blue/40 hover:shadow-sm'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isSelected ? 'bg-tostem-blue text-white' : 'bg-tostem-light-gray text-tostem-blue'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-tostem-dark">{option.label}</div>
        <div className="text-xs text-tostem-text-light mt-0.5">{option.description}</div>
      </div>
      {isSelected && <CheckCircle className="w-5 h-5 text-tostem-blue flex-shrink-0" />}
    </motion.button>
  );
}

// ====== Product Wizard ======
interface ProductWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductWizard({ open, onOpenChange }: ProductWizardProps) {
  const [step, setStep] = useState(0);
  const [productType, setProductType] = useState('');
  const [priority, setPriority] = useState('');
  const [spaceType, setSpaceType] = useState('');
  const [direction, setDirection] = useState<1 | -1>(1);

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const recommendations = useMemo(() => {
    if (!productType || !priority || !spaceType) return [];
    return getRecommendations(productType, priority, spaceType);
  }, [productType, priority, spaceType]);

  const canGoNext = step === 0 ? !!productType : step === 1 ? !!priority : !!spaceType;

  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const resetWizard = () => {
    setStep(0);
    setProductType('');
    setPriority('');
    setSpaceType('');
    setDirection(1);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Delay reset so animation completes
    setTimeout(resetWizard, 300);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar" onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-tostem-dark text-xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-tostem-blue" />
            Product Finder
          </DialogTitle>
          <DialogDescription className="text-tostem-text-light">
            Answer 3 quick questions and we&apos;ll recommend the perfect products for you.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-tostem-dark">
              Step {step + 1} of {totalSteps}
            </span>
            <span className="text-xs text-tostem-text-light">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200 [&>div]:bg-tostem-blue" />
        </div>

        {/* Step Content */}
        <div className="min-h-[300px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h3 className="text-lg font-bold text-tostem-dark mb-1">What are you looking for?</h3>
                <p className="text-sm text-tostem-text-light mb-4">Choose the type of product you need.</p>
                <div className="space-y-3">
                  {productTypes.map((pt) => (
                    <StepOption
                      key={pt.id}
                      option={pt}
                      isSelected={productType === pt.id}
                      onClick={() => setProductType(pt.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h3 className="text-lg font-bold text-tostem-dark mb-1">What&apos;s your priority?</h3>
                <p className="text-sm text-tostem-text-light mb-4">What matters most to you in your selection?</p>
                <div className="space-y-3">
                  {priorities.map((p) => (
                    <StepOption
                      key={p.id}
                      option={p}
                      isSelected={priority === p.id}
                      onClick={() => setPriority(p.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h3 className="text-lg font-bold text-tostem-dark mb-1">What&apos;s your space type?</h3>
                <p className="text-sm text-tostem-text-light mb-4">Tell us about your project space.</p>
                <div className="space-y-3">
                  {spaceTypes.map((st) => (
                    <StepOption
                      key={st.id}
                      option={st}
                      isSelected={spaceType === st.id}
                      onClick={() => {
                        setSpaceType(st.id);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={step === 0}
            className="border-gray-300 text-tostem-text-light"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
          </Button>
          {step < totalSteps - 1 ? (
            <Button
              onClick={goNext}
              disabled={!canGoNext}
              className="bg-tostem-blue hover:bg-tostem-blue-light text-white"
            >
              Next <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Show results by moving past step 2 - we'll show results inline
                if (canGoNext) {
                  setDirection(1);
                  setStep(3);
                }
              }}
              disabled={!canGoNext}
              className="bg-tostem-blue hover:bg-tostem-blue-light text-white"
            >
              See Results <Sparkles className="w-4 h-4 ml-1.5" />
            </Button>
          )}
        </div>

        {/* Results View */}
        <AnimatePresence>
          {step === 3 && recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <h3 className="text-lg font-bold text-tostem-dark mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-tostem-blue" />
                Your Perfect Matches
              </h3>
              <p className="text-sm text-tostem-text-light mb-4">
                Based on your preferences, here are our top recommendations:
              </p>

              <div className="space-y-4">
                {recommendations.map((rec, i) => (
                  <motion.div
                    key={rec.design.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.3 }}
                    className="rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4 p-4">
                      {/* Image */}
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${rec.design.image})` }}
                        />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Badge className="bg-tostem-blue/10 text-tostem-blue text-[10px] mb-1">
                              {rec.design.category}
                            </Badge>
                            <h4 className="text-sm font-bold text-tostem-dark leading-tight">
                              {rec.design.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full flex-shrink-0">
                            <CheckCircle className="w-3 h-3" />
                            <span className="text-xs font-bold">{rec.matchScore}%</span>
                          </div>
                        </div>
                        <p className="text-xs text-tostem-text-light mt-1 line-clamp-2">
                          {rec.design.description}
                        </p>
                        {/* Benefits */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {rec.benefits.slice(0, 3).map((b) => (
                            <span
                              key={b}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-tostem-light-gray text-tostem-text-light"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                        {/* CTAs */}
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-tostem-blue text-tostem-blue hover:bg-tostem-blue hover:text-white"
                            onClick={() => {
                              handleClose();
                              navigateTo(rec.design.slug);
                            }}
                          >
                            View Details <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                          <Button
                            size="sm"
                            className="text-xs bg-tostem-blue hover:bg-tostem-blue-light text-white"
                            onClick={() => {
                              handleClose();
                              navigateTo('contact');
                            }}
                          >
                            Get Quotation <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" onClick={resetWizard} className="text-xs border-gray-300">
                  <ArrowLeft className="w-3 h-3 mr-1" /> Start Over
                </Button>
                <Button
                  className="bg-tostem-blue hover:bg-tostem-blue-light text-white text-xs"
                  onClick={() => {
                    handleClose();
                    navigateTo('contact');
                  }}
                >
                  Get Expert Consultation <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
