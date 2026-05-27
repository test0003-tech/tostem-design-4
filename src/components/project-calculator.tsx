'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator, ArrowRight, CheckCircle, AppWindow, DoorOpen,
  MapPin, ChevronRight, Save, Phone, Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

// ====== Data ======
const seriesOptions = [
  { id: 'atis', label: 'ATIS', multiplier: 1.3, description: 'Premium Japanese engineering', color: '#2E5A87' },
  { id: 'grants', label: 'Grants', multiplier: 1.0, description: 'Reliable performance', color: '#3a6fa3' },
  { id: 'we70', label: 'WE-70', multiplier: 0.85, description: 'Value-oriented', color: '#5a8fb3' },
  { id: 'weplus', label: 'WE+', multiplier: 1.15, description: 'Enhanced features', color: '#4a7fa3' },
];

const locationMultipliers = [
  { id: 'metro', label: 'Metro City', multiplier: 1.1, cities: 'Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune' },
  { id: 'tier1', label: 'Tier-1 City', multiplier: 1.0, cities: 'Other major cities' },
  { id: 'tier2', label: 'Tier-2 City', multiplier: 0.9, cities: 'Smaller cities and towns' },
];

const sizeOptions = [
  { id: 'small', label: 'Small', desc: 'Up to 3ft × 4ft', windowBase: 350, doorBase: 550 },
  { id: 'medium', label: 'Medium', desc: '3ft–5ft wide', windowBase: 450, doorBase: 650 },
  { id: 'large', label: 'Large', desc: '5ft and above', windowBase: 550, doorBase: 800 },
];

const projectPhases = [
  { label: 'Design', icon: '📐', baseWeeks: 1, color: 'bg-tostem-blue' },
  { label: 'Manufacturing', icon: '🏭', baseWeeks: 2, color: 'bg-tostem-blue-light' },
  { label: 'Delivery', icon: '🚚', baseWeeks: 1, color: 'bg-[#5a8fb3]' },
  { label: 'Installation', icon: '🔧', baseWeeks: 1, color: 'bg-[#7aaac3]' },
];

// ====== Calculation Logic ======
interface ProjectEstimate {
  totalCost: { min: number; max: number };
  breakdown: {
    windows: number;
    doors: number;
    installation: number;
    gst: number;
  };
  timeline: {
    total: number;
    phases: { label: string; weeks: number; icon: string; color: string }[];
  };
  perWindow: number;
  perDoor: number;
}

function calculateProject(
  numWindows: number,
  numDoors: number,
  sizeId: string,
  seriesId: string,
  locationId: string,
): ProjectEstimate {
  const size = sizeOptions.find((s) => s.id === sizeId) || sizeOptions[1];
  const series = seriesOptions.find((s) => s.id === seriesId) || seriesOptions[1];
  const location = locationMultipliers.find((l) => l.id === locationId) || locationMultipliers[1];

  const windowCost = numWindows * size.windowBase * series.multiplier * location.multiplier;
  const doorCost = numDoors * size.doorBase * series.multiplier * location.multiplier;
  const subtotal = windowCost + doorCost;
  const installation = Math.round(subtotal * 0.12);
  const preGst = subtotal + installation;
  const gst = Math.round(preGst * 0.18);
  const totalMin = Math.round(preGst * 0.9) + gst;
  const totalMax = Math.round(preGst * 1.1) + gst;

  // Timeline calculation
  const totalUnits = numWindows + numDoors;
  const designWeeks = Math.max(1, Math.ceil(totalUnits / 15));
  const manufacturingWeeks = Math.max(2, Math.ceil(totalUnits / 8));
  const deliveryWeeks = locationId === 'metro' ? 1 : locationId === 'tier1' ? 1.5 : 2;
  const installationWeeks = Math.max(1, Math.ceil(totalUnits / 10));
  const totalWeeks = designWeeks + manufacturingWeeks + deliveryWeeks + installationWeeks;

  return {
    totalCost: { min: totalMin, max: totalMax },
    breakdown: {
      windows: Math.round(windowCost),
      doors: Math.round(doorCost),
      installation,
      gst,
    },
    timeline: {
      total: totalWeeks,
      phases: [
        { label: 'Design', weeks: designWeeks, icon: '📐', color: 'bg-tostem-blue' },
        { label: 'Manufacturing', weeks: manufacturingWeeks, icon: '🏭', color: 'bg-tostem-blue-light' },
        { label: 'Delivery', weeks: deliveryWeeks, icon: '🚚', color: 'bg-[#5a8fb3]' },
        { label: 'Installation', weeks: installationWeeks, icon: '🔧', color: 'bg-[#7aaac3]' },
      ],
    },
    perWindow: Math.round(size.windowBase * series.multiplier * location.multiplier),
    perDoor: Math.round(size.doorBase * series.multiplier * location.multiplier),
  };
}

function formatPrice(val: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
}

// ====== Main Component ======
export default function ProjectCalculator() {
  const [numWindows, setNumWindows] = useState(5);
  const [numDoors, setNumDoors] = useState(2);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedSeries, setSelectedSeries] = useState('grants');
  const [selectedLocation, setSelectedLocation] = useState('tier1');
  const [showResults, setShowResults] = useState(false);
  const [saved, setSaved] = useState(false);

  const estimate = useMemo(
    () => calculateProject(numWindows, numDoors, selectedSize, selectedSeries, selectedLocation),
    [numWindows, numDoors, selectedSize, selectedSeries, selectedLocation]
  );

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleSave = () => {
    try {
      const data = {
        numWindows,
        numDoors,
        selectedSize,
        selectedSeries,
        selectedLocation,
        estimate,
        timestamp: Date.now(),
      };
      const existing = JSON.parse(localStorage.getItem('tostem-project-calculations') || '[]');
      existing.unshift(data);
      localStorage.setItem('tostem-project-calculations', JSON.stringify(existing.slice(0, 20)));
      setSaved(true);
    } catch {
      // Ignore storage errors
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setSaved(false);
  };

  function navigateTo(slug: string) {
    window.location.hash = `/${slug}`;
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <Badge className="bg-tostem-blue/10 text-tostem-blue text-xs px-4 py-1.5 rounded-full mb-4">
          <Calculator className="w-3 h-3 mr-1.5" /> Project Calculator
        </Badge>
        <h2 className="text-2xl md:text-3xl font-black text-tostem-dark dark:text-white mb-2">
          Estimate Your Project Cost
        </h2>
        <p className="text-sm md:text-base text-tostem-text-light dark:text-gray-400 max-w-lg mx-auto">
          A more detailed calculator to estimate your full project cost, timeline, and cost breakdown.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {!showResults ? (
          /* Input Form */
          <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 shadow-sm space-y-6">
            {/* Number of Windows & Doors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-tostem-dark dark:text-gray-200 mb-2">
                  <AppWindow className="w-4 h-4 text-tostem-blue" />
                  Number of Windows
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={numWindows}
                  onChange={(e) => setNumWindows(Math.max(0, parseInt(e.target.value) || 0))}
                  className="bg-tostem-light-gray dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-tostem-dark dark:text-gray-200 mb-2">
                  <DoorOpen className="w-4 h-4 text-tostem-blue" />
                  Number of Doors
                </label>
                <Input
                  type="number"
                  min={0}
                  max={50}
                  value={numDoors}
                  onChange={(e) => setNumDoors(Math.max(0, parseInt(e.target.value) || 0))}
                  className="bg-tostem-light-gray dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>

            {/* Average Size */}
            <div>
              <label className="text-sm font-semibold text-tostem-dark dark:text-gray-200 mb-2 block">
                Average Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((size) => {
                  const isSelected = selectedSize === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-3 rounded-lg text-center transition-all duration-200 border-2 ${
                        isSelected
                          ? 'border-tostem-blue bg-tostem-blue/5'
                          : 'border-gray-200 dark:border-gray-700 bg-tostem-light-gray dark:bg-[#1a1a1a] hover:border-tostem-blue/30'
                      }`}
                    >
                      <span className={`text-sm font-bold ${isSelected ? 'text-tostem-blue' : 'text-tostem-dark dark:text-gray-200'}`}>{size.label}</span>
                      <span className="text-[10px] text-tostem-text-muted block mt-0.5">{size.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Series Preference */}
            <div>
              <label className="text-sm font-semibold text-tostem-dark dark:text-gray-200 mb-2 block">
                Series Preference
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {seriesOptions.map((series) => {
                  const isSelected = selectedSeries === series.id;
                  return (
                    <button
                      key={series.id}
                      onClick={() => setSelectedSeries(series.id)}
                      className={`p-3 rounded-lg text-center transition-all duration-200 border-2 ${
                        isSelected
                          ? 'border-tostem-blue bg-tostem-blue/5'
                          : 'border-gray-200 dark:border-gray-700 bg-tostem-light-gray dark:bg-[#1a1a1a] hover:border-tostem-blue/30'
                      }`}
                    >
                      <div className={`text-sm font-bold ${isSelected ? 'text-tostem-blue' : 'text-tostem-dark dark:text-gray-200'}`}>{series.label}</div>
                      <div className="text-[10px] text-tostem-text-muted">{series.description}</div>
                      <div className={`text-[10px] font-semibold mt-1 ${series.multiplier > 1 ? 'text-amber-600' : series.multiplier < 1 ? 'text-emerald-600' : 'text-tostem-blue'}`}>
                        {series.multiplier}x
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-tostem-dark dark:text-gray-200 mb-2">
                <MapPin className="w-4 h-4 text-tostem-blue" />
                Project Location
              </label>
              <div className="grid grid-cols-3 gap-2">
                {locationMultipliers.map((loc) => {
                  const isSelected = selectedLocation === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`p-3 rounded-lg text-center transition-all duration-200 border-2 ${
                        isSelected
                          ? 'border-tostem-blue bg-tostem-blue/5'
                          : 'border-gray-200 dark:border-gray-700 bg-tostem-light-gray dark:bg-[#1a1a1a] hover:border-tostem-blue/30'
                      }`}
                    >
                      <span className={`text-xs font-bold ${isSelected ? 'text-tostem-blue' : 'text-tostem-dark dark:text-gray-200'}`}>{loc.label}</span>
                      <span className="text-[10px] text-tostem-text-muted block mt-0.5">{loc.cities}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center pt-2">
              <Button
                size="lg"
                className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8 shadow-lg shadow-tostem-blue/20"
                disabled={numWindows + numDoors === 0}
                onClick={handleCalculate}
              >
                <Calculator className="w-4 h-4 mr-2" /> Calculate Project Cost <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Total Cost Card */}
            <div className="bg-gradient-to-br from-tostem-blue to-tostem-blue-light rounded-xl p-6 md:p-8 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
              <div className="relative z-10">
                <div className="text-sm text-white/70 mb-1">Estimated Project Cost</div>
                <div className="text-3xl md:text-4xl font-black mb-2">
                  {formatPrice(estimate.totalCost.min)} — {formatPrice(estimate.totalCost.max)}
                </div>
                <div className="text-xs text-white/50 mt-2">
                  {numWindows} windows + {numDoors} doors • {seriesOptions.find((s) => s.id === selectedSeries)?.label} series • {locationMultipliers.find((l) => l.id === selectedLocation)?.label}
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-tostem-dark dark:text-gray-200 mb-4">Cost Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: 'Windows', value: estimate.breakdown.windows, count: numWindows, color: 'bg-tostem-blue', unit: 'window' },
                  { label: 'Doors', value: estimate.breakdown.doors, count: numDoors, color: 'bg-tostem-blue-light', unit: 'door' },
                  { label: 'Installation (12%)', value: estimate.breakdown.installation, color: 'bg-[#5a8fb3]' },
                  { label: 'GST (18%)', value: estimate.breakdown.gst, color: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span className="text-sm text-tostem-text-light dark:text-gray-400">{item.label}</span>
                      {'count' in item && item.count ? (
                        <span className="text-[10px] text-tostem-text-muted">({item.count} × {formatPrice(item.unit === 'window' ? estimate.perWindow : estimate.perDoor)}/{item.unit})</span>
                      ) : null}
                    </div>
                    <span className="text-sm font-bold text-tostem-dark dark:text-gray-200">{formatPrice(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Timeline */}
            <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-tostem-blue" />
                <h3 className="text-sm font-bold text-tostem-dark dark:text-gray-200">Project Timeline</h3>
                <Badge className="bg-tostem-blue/10 text-tostem-blue text-[10px] ml-auto">
                  ~{estimate.timeline.total} weeks
                </Badge>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex mb-4">
                {estimate.timeline.phases.map((phase, i) => {
                  const widthPercent = (phase.weeks / estimate.timeline.total) * 100;
                  return (
                    <motion.div
                      key={phase.label}
                      className={`${phase.color} h-full ${i === 0 ? 'rounded-l-full' : ''} ${i === estimate.timeline.phases.length - 1 ? 'rounded-r-full' : ''}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPercent}%` }}
                      transition={{ duration: 0.8, delay: i * 0.2 }}
                    />
                  );
                })}
              </div>

              {/* Phase details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {estimate.timeline.phases.map((phase, i) => (
                  <motion.div
                    key={phase.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.15 }}
                    className="bg-tostem-light-gray dark:bg-[#1a1a1a] rounded-lg p-3 text-center"
                  >
                    <span className="text-lg">{phase.icon}</span>
                    <div className="text-xs font-bold text-tostem-dark dark:text-gray-200 mt-1">{phase.label}</div>
                    <div className="text-[10px] text-tostem-text-muted">{phase.weeks} week{phase.weeks !== 1 ? 's' : ''}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-tostem-text-muted text-center leading-relaxed px-4">
              * Estimates are approximate and based on standard configurations. Final pricing depends on site conditions, customization, glazing options, and other factors. Contact us for an exact quotation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-tostem-blue hover:bg-tostem-blue-light text-white"
                onClick={() => {
                  navigateTo('contact');
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
              <Button
                variant="ghost"
                className="text-tostem-text-muted"
                onClick={handleReset}
              >
                Recalculate
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ====== CTA Component for Homepage ======
export function ProjectCalculatorCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-white to-tostem-light-gray dark:from-[#1a1a1a] dark:to-[#111] rounded-2xl p-6 md:p-8 text-center relative overflow-hidden cursor-pointer group border border-tostem-blue/10 hover:border-tostem-blue/20 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-tostem-blue/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-tostem-blue/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Calculator className="w-6 h-6 text-tostem-blue" />
          </div>
          <h3 className="text-lg md:text-xl font-black text-tostem-dark dark:text-white mb-2">
            Project Cost Calculator
          </h3>
          <p className="text-xs md:text-sm text-tostem-text-light dark:text-gray-400 max-w-sm mx-auto mb-4 leading-relaxed">
            Plan your full project budget with our advanced calculator. Get cost breakdowns, timelines, and per-unit pricing.
          </p>
          <Button
            size="sm"
            className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-6"
          >
            <Calculator className="w-3 h-3 mr-1.5" /> Calculate Project <ArrowRight className="w-3 h-3 ml-1.5" />
          </Button>
        </div>
      </motion.div>

      {/* Full Calculator Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#111] rounded-2xl max-w-3xl w-full p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              ×
            </button>
            <ProjectCalculator />
          </div>
        </div>
      )}
    </>
  );
}
