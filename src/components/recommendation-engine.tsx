'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, Bed, Sofa, ChefHat, Bath, Sun,
  ShieldCheck, Thermometer, Lock, Palette, IndianRupee,
  CheckCircle, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ====== Data ======
const roomTypes = [
  { id: 'bedroom', label: 'Bedroom', icon: Bed },
  { id: 'living', label: 'Living Room', icon: Sofa },
  { id: 'kitchen', label: 'Kitchen', icon: ChefHat },
  { id: 'bathroom', label: 'Bathroom', icon: Bath },
  { id: 'balcony', label: 'Balcony', icon: Sun },
];

const priorities = [
  { id: 'soundproofing', label: 'Soundproofing', icon: ShieldCheck },
  { id: 'thermal', label: 'Thermal Insulation', icon: Thermometer },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'aesthetics', label: 'Aesthetics', icon: Palette },
  { id: 'budget', label: 'Budget-Friendly', icon: IndianRupee },
];

const windowSizes = [
  { id: 'small', label: 'Small', desc: 'Up to 3ft × 3ft' },
  { id: 'medium', label: 'Medium', desc: '3ft – 5ft' },
  { id: 'large', label: 'Large', desc: '5ft and above' },
];

interface Recommendation {
  id: string;
  name: string;
  category: string;
  series: string;
  matchPercentage: number;
  reasons: string[];
  image: string;
  slug: string;
}

// Recommendation matrix (room + priority + size → top 3 designs)
function getRecommendations(room: string, priority: string, size: string): Recommendation[] {
  const baseRecommendations: Record<string, Recommendation[]> = {
    // Bedroom recommendations
    'bedroom-soundproofing': [
      { id: '1', name: 'Tilt & Slide Window', category: 'Windows', series: 'ATIS', matchPercentage: 96, reasons: ['Superior sound insulation (STC 40+)', 'Multi-point locking for security', 'Tilt mode for ventilation without noise'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', slug: 'aluminium-tilt-slide-windows' },
      { id: '2', name: 'Casement Window', category: 'Windows', series: 'Grants', matchPercentage: 89, reasons: ['Excellent sealing reduces noise', 'Full opening for maximum ventilation', 'Affordable soundproofing option'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
      { id: '3', name: 'French Window', category: 'Windows', series: 'ATIS', matchPercentage: 82, reasons: ['Double-seal design blocks noise', 'Elegant bedroom aesthetics', 'Large opening for natural light'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-french-windows' },
    ],
    'bedroom-thermal': [
      { id: '1', name: 'Tilt & Slide Window', category: 'Windows', series: 'ATIS', matchPercentage: 94, reasons: ['Double/triple glazing compatible', 'Thermal break technology', 'Energy-efficient design'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', slug: 'aluminium-tilt-slide-windows' },
      { id: '2', name: 'Fixed Window', category: 'Windows', series: 'Grants', matchPercentage: 87, reasons: ['Best thermal insulation (no moving parts)', 'Maximum glass area for light', 'Lowest heat transfer rate'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
      { id: '3', name: 'Casement Window', category: 'Windows', series: 'WE+', matchPercentage: 79, reasons: ['Good thermal sealing', 'Cost-effective insulation', 'Multiple glazing options'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
    ],
    'bedroom-security': [
      { id: '1', name: 'Casement Window', category: 'Windows', series: 'ATIS', matchPercentage: 92, reasons: ['Multi-point locking system', 'Hardened aluminium frame', 'Internal glazing bead'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
      { id: '2', name: 'Tilt & Slide Window', category: 'Windows', series: 'ATIS', matchPercentage: 85, reasons: ['Tilt mode for safe ventilation', 'Automatic locking mechanism', 'Restrictor hinge option'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', slug: 'aluminium-tilt-slide-windows' },
      { id: '3', name: 'Sliding Window', category: 'Windows', series: 'Grants', matchPercentage: 76, reasons: ['Anti-lift device standard', 'Key lock handle', 'Interlocking meeting stiles'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
    ],
    'bedroom-aesthetics': [
      { id: '1', name: 'French Window', category: 'Windows', series: 'ATIS', matchPercentage: 95, reasons: ['Classic elegant design', 'Maximum natural light', 'Premium aesthetic appeal'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-french-windows' },
      { id: '2', name: 'Glass-to-Glass Corner Window', category: 'Windows', series: 'ATIS', matchPercentage: 88, reasons: ['Seamless corner design', 'Panoramic views', 'Modern architectural look'], image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80', slug: 'aluminium-glass-to-glass-corner-window' },
      { id: '3', name: 'Fixed Window', category: 'Windows', series: 'WE+', matchPercentage: 81, reasons: ['Minimal frame visibility', 'Picture-window aesthetic', 'Clean contemporary look'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
    ],
    'bedroom-budget': [
      { id: '1', name: 'Sliding Window', category: 'Windows', series: 'WE-70', matchPercentage: 93, reasons: ['Most affordable option', 'Low maintenance cost', 'Space-saving design'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
      { id: '2', name: 'Casement Window', category: 'Windows', series: 'WE-70', matchPercentage: 86, reasons: ['Great value for money', 'Energy savings long-term', 'Durable construction'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
      { id: '3', name: 'Fixed Window', category: 'Windows', series: 'WE-70', matchPercentage: 78, reasons: ['Lowest cost per sqft', 'No hardware to maintain', 'Best for bedrooms with AC'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
    ],
    // Living Room recommendations
    'living-soundproofing': [
      { id: '1', name: 'Tilt & Slide Window', category: 'Windows', series: 'ATIS', matchPercentage: 94, reasons: ['Premium sound insulation', 'Large opening for living spaces', 'Smooth sliding operation'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', slug: 'aluminium-tilt-slide-windows' },
      { id: '2', name: 'Slide & Fold Door', category: 'Doors', series: 'ATIS', matchPercentage: 87, reasons: ['Full-width sound barrier when closed', 'Wide opening for entertaining', 'Premium acoustic sealing'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-slide-fold-doors' },
      { id: '3', name: 'Casement Window', category: 'Windows', series: 'Grants', matchPercentage: 80, reasons: ['Cost-effective noise reduction', 'Full opening for airflow', 'Reliable sound sealing'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
    ],
    'living-thermal': [
      { id: '1', name: 'Slide & Fold Door', category: 'Doors', series: 'ATIS', matchPercentage: 93, reasons: ['Thermal break technology', 'Insulated glass compatible', 'Indoor-outdoor temperature control'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-slide-fold-doors' },
      { id: '2', name: 'Fixed Window', category: 'Windows', series: 'ATIS', matchPercentage: 86, reasons: ['Best thermal performance', 'No air leakage points', 'Maximum natural light'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
      { id: '3', name: 'Tilt & Slide Window', category: 'Windows', series: 'Grants', matchPercentage: 79, reasons: ['Good thermal efficiency', 'Tilt mode for winter ventilation', 'Double seal system'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', slug: 'aluminium-tilt-slide-windows' },
    ],
    'living-security': [
      { id: '1', name: 'Corner Slider Door', category: 'Doors', series: 'ATIS', matchPercentage: 91, reasons: ['Multi-point locking', 'Toughened glass standard', 'Anti-lift mechanism'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-corner-slider-door' },
      { id: '2', name: 'Casement Window', category: 'Windows', series: 'ATIS', matchPercentage: 84, reasons: ['Hook-lock mechanism', 'Internal beading', 'Security hinge option'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
      { id: '3', name: 'French Window', category: 'Windows', series: 'Grants', matchPercentage: 77, reasons: ['Shoot-bolt locking', 'Multipoint espagnolette', 'Robust frame design'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-french-windows' },
    ],
    'living-aesthetics': [
      { id: '1', name: 'Glass-to-Glass Corner Window', category: 'Windows', series: 'ATIS', matchPercentage: 97, reasons: ['Stunning corner views', 'Minimalist design', 'Architectural showpiece'], image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80', slug: 'aluminium-glass-to-glass-corner-window' },
      { id: '2', name: 'Slide & Fold Door', category: 'Doors', series: 'ATIS', matchPercentage: 90, reasons: ['Grand opening design', 'Seamless indoor-outdoor', 'Premium glass-to-floor look'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-slide-fold-doors' },
      { id: '3', name: 'French Window', category: 'Windows', series: 'ATIS', matchPercentage: 83, reasons: ['Timeless elegance', 'Classic proportions', 'Beautiful natural light'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-french-windows' },
    ],
    'living-budget': [
      { id: '1', name: 'Sliding Window', category: 'Windows', series: 'WE-70', matchPercentage: 92, reasons: ['Best value sliding option', 'Low maintenance', 'Space efficient'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
      { id: '2', name: 'Sliding Door', category: 'Doors', series: 'WE-70', matchPercentage: 85, reasons: ['Affordable patio door', 'Smooth operation', 'Standard sizes available'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-sliding-doors' },
      { id: '3', name: 'Fixed Window', category: 'Windows', series: 'WE-70', matchPercentage: 78, reasons: ['Lowest cost option', 'Zero maintenance', 'Great for picture walls'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
    ],
    // Kitchen recommendations
    'kitchen-soundproofing': [
      { id: '1', name: 'Sliding Window', category: 'Windows', series: 'ATIS', matchPercentage: 90, reasons: ['Good noise reduction', 'Easy one-hand operation', 'Doesn\'t interfere with counters'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
      { id: '2', name: 'Casement Window', category: 'Windows', series: 'Grants', matchPercentage: 83, reasons: ['Excellent sealing', 'Push-out operation', 'Suitable over sinks'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
      { id: '3', name: 'Awning Window', category: 'Windows', series: 'WE+', matchPercentage: 76, reasons: ['Top-hinged keeps rain out', 'Good ventilation while cooking', 'Compact design'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-hung-awning-windows' },
    ],
    'kitchen-thermal': [
      { id: '1', name: 'Fixed Window', category: 'Windows', series: 'Grants', matchPercentage: 91, reasons: ['Best insulation for kitchens', 'No air leakage', 'Easy to clean'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
      { id: '2', name: 'Sliding Window', category: 'Windows', series: 'WE+', matchPercentage: 84, reasons: ['Good thermal performance', 'Ventilation when needed', 'Space-saving design'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
      { id: '3', name: 'Awning Window', category: 'Windows', series: 'WE-70', matchPercentage: 77, reasons: ['Prevents heat ingress', 'Sheltered ventilation', 'Budget friendly'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-hung-awning-windows' },
    ],
    'kitchen-security': [
      { id: '1', name: 'Casement Window', category: 'Windows', series: 'ATIS', matchPercentage: 89, reasons: ['Multi-point lock standard', 'No external access to hinges', 'Robust frame construction'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
      { id: '2', name: 'Sliding Window', category: 'Windows', series: 'Grants', matchPercentage: 82, reasons: ['Key lock handles', 'Anti-lift blocks', 'Interlocking frames'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
      { id: '3', name: 'Fixed Window', category: 'Windows', series: 'WE+', matchPercentage: 75, reasons: ['No opening = no entry point', 'Toughened glass', 'Secure by design'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
    ],
    'kitchen-aesthetics': [
      { id: '1', name: 'Awning Window', category: 'Windows', series: 'ATIS', matchPercentage: 88, reasons: ['Clean kitchen look', 'Modern top-hinge style', 'Excellent over sinks'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-hung-awning-windows' },
      { id: '2', name: 'Sliding Window', category: 'Windows', series: 'Grants', matchPercentage: 81, reasons: ['Streamlined profile', 'Unobtrusive design', 'Modern finish options'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
      { id: '3', name: 'Fixed Window', category: 'Windows', series: 'ATIS', matchPercentage: 74, reasons: ['Picture window for views', 'Minimal frame design', 'Maximum light'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
    ],
    'kitchen-budget': [
      { id: '1', name: 'Sliding Window', category: 'Windows', series: 'WE-70', matchPercentage: 93, reasons: ['Best kitchen value', 'Easy to operate', 'Standard sizes in stock'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
      { id: '2', name: 'Awning Window', category: 'Windows', series: 'WE-70', matchPercentage: 86, reasons: ['Affordable over-sink option', 'Low maintenance', 'Good value performance'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-hung-awning-windows' },
      { id: '3', name: 'Fixed Window', category: 'Windows', series: 'WE-70', matchPercentage: 79, reasons: ['Cheapest option', 'No moving parts', 'Zero maintenance'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
    ],
    // Bathroom recommendations
    'bathroom-soundproofing': [
      { id: '1', name: 'Awning Window', category: 'Windows', series: 'ATIS', matchPercentage: 91, reasons: ['Privacy + sound insulation', 'Top-hinged for ventilation', 'Compact bathroom fit'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-hung-awning-windows' },
      { id: '2', name: 'Casement Window', category: 'Windows', series: 'Grants', matchPercentage: 84, reasons: ['Good acoustic seal', 'Frosted glass option', 'Adjustable opening'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
      { id: '3', name: 'Sliding Window', category: 'Windows', series: 'WE+', matchPercentage: 77, reasons: ['Space-saving operation', 'Good sealing when closed', 'Privacy glass compatible'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
    ],
    'bathroom-thermal': [
      { id: '1', name: 'Fixed Window', category: 'Windows', series: 'Grants', matchPercentage: 90, reasons: ['Best thermal seal', 'Frosted glass available', 'No moving parts'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
      { id: '2', name: 'Awning Window', category: 'Windows', series: 'WE+', matchPercentage: 83, reasons: ['Ventilation + insulation', 'Rain-safe opening', 'Compact design'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-hung-awning-windows' },
      { id: '3', name: 'Sliding Window', category: 'Windows', series: 'WE-70', matchPercentage: 76, reasons: ['Budget thermal option', 'Tinted glass for heat', 'Simple operation'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
    ],
    'bathroom-security': [
      { id: '1', name: 'Casement Window', category: 'Windows', series: 'ATIS', matchPercentage: 90, reasons: ['Secure locking system', 'Restrictor stay option', 'Obscure glass for privacy'], image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', slug: 'aluminium-casement-windows' },
      { id: '2', name: 'Awning Window', category: 'Windows', series: 'Grants', matchPercentage: 83, reasons: ['Hard to reach from outside', 'Friction stay hinge', 'Privacy by design'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-hung-awning-windows' },
      { id: '3', name: 'Fixed Window', category: 'Windows', series: 'WE+', matchPercentage: 76, reasons: ['No access point', 'Toughened safety glass', 'Secure frame fixings'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
    ],
    'bathroom-aesthetics': [
      { id: '1', name: 'Awning Window', category: 'Windows', series: 'ATIS', matchPercentage: 89, reasons: ['Sleek top-hinge design', 'Modern bathroom look', 'Multiple colour options'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-hung-awning-windows' },
      { id: '2', name: 'Fixed Window', category: 'Windows', series: 'ATIS', matchPercentage: 82, reasons: ['Clean minimalist frame', 'Frosted pattern options', 'Custom shapes available'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
      { id: '3', name: 'Sliding Window', category: 'Windows', series: 'Grants', matchPercentage: 75, reasons: ['Slim profile design', 'Modern track system', 'Sleek hardware'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
    ],
    'bathroom-budget': [
      { id: '1', name: 'Awning Window', category: 'Windows', series: 'WE-70', matchPercentage: 92, reasons: ['Most affordable bathroom window', 'Ideal small size', 'Low maintenance'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-hung-awning-windows' },
      { id: '2', name: 'Sliding Window', category: 'Windows', series: 'WE-70', matchPercentage: 85, reasons: ['Budget-friendly option', 'Standard sizes available', 'Easy installation'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
      { id: '3', name: 'Fixed Window', category: 'Windows', series: 'WE-70', matchPercentage: 78, reasons: ['Lowest cost option', 'Simple installation', 'No hardware costs'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', slug: 'aluminium-fixed-window' },
    ],
    // Balcony recommendations
    'balcony-soundproofing': [
      { id: '1', name: 'Slide & Fold Door', category: 'Doors', series: 'ATIS', matchPercentage: 95, reasons: ['Full-width sound barrier', 'Acoustic sealing system', 'Premium balcony solution'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-slide-fold-doors' },
      { id: '2', name: 'Corner Slider Door', category: 'Doors', series: 'ATIS', matchPercentage: 88, reasons: ['Large acoustic barrier', 'Smooth operation', 'Tight sealing'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-corner-slider-door' },
      { id: '3', name: 'Sliding Door', category: 'Doors', series: 'Grants', matchPercentage: 81, reasons: ['Effective noise reduction', 'Affordable option', 'Reliable performance'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-sliding-doors' },
    ],
    'balcony-thermal': [
      { id: '1', name: 'Slide & Fold Door', category: 'Doors', series: 'ATIS', matchPercentage: 94, reasons: ['Thermal break frame', 'Double/triple glazing', 'Energy saving design'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-slide-fold-doors' },
      { id: '2', name: 'Sliding Door', category: 'Doors', series: 'ATIS', matchPercentage: 87, reasons: ['Good thermal insulation', 'Interlock design', 'Weather stripping'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-sliding-doors' },
      { id: '3', name: 'Corner Slider Door', category: 'Doors', series: 'Grants', matchPercentage: 80, reasons: ['Thermal efficiency', 'Sun protection glass option', 'Insulated frame'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-corner-slider-door' },
    ],
    'balcony-security': [
      { id: '1', name: 'Sliding Door', category: 'Doors', series: 'ATIS', matchPercentage: 93, reasons: ['Multi-point locking', 'Anti-lift device', 'Toughened glass'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-sliding-doors' },
      { id: '2', name: 'Slide & Fold Door', category: 'Doors', series: 'ATIS', matchPercentage: 86, reasons: ['Full perimeter locking', 'Security glazing', 'Robust profile'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-slide-fold-doors' },
      { id: '3', name: 'Casement Door', category: 'Doors', series: 'Grants', matchPercentage: 79, reasons: ['Hook-bolt locking', 'Internal glazing', 'Solid aluminium frame'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-casement-doors' },
    ],
    'balcony-aesthetics': [
      { id: '1', name: 'Slide & Fold Door', category: 'Doors', series: 'ATIS', matchPercentage: 97, reasons: ['Stunning full opening', 'Seamless indoor-outdoor', 'Premium living experience'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-slide-fold-doors' },
      { id: '2', name: 'Corner Slider Door', category: 'Doors', series: 'ATIS', matchPercentage: 90, reasons: ['Unique corner opening', 'Architectural feature', 'Expansive views'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-corner-slider-door' },
      { id: '3', name: 'French Door', category: 'Doors', series: 'ATIS', matchPercentage: 83, reasons: ['Classic balcony door', 'Elegant proportions', 'Traditional charm'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-french-windows' },
    ],
    'balcony-budget': [
      { id: '1', name: 'Sliding Door', category: 'Doors', series: 'WE-70', matchPercentage: 93, reasons: ['Most affordable balcony door', 'Standard sizes available', 'Easy installation'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-sliding-doors' },
      { id: '2', name: 'Sliding Window', category: 'Windows', series: 'WE-70', matchPercentage: 86, reasons: ['Budget enclosure option', 'Good ventilation', 'Simple operation'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', slug: 'aluminium-sliding-windows' },
      { id: '3', name: 'Casement Door', category: 'Doors', series: 'WE-70', matchPercentage: 79, reasons: ['Value for money', 'Good insulation', 'Secure locking'], image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', slug: 'aluminium-casement-doors' },
    ],
  };

  // Generate key from selections
  const key = `${room}-${priority}`;
  let results = baseRecommendations[key] || [];

  // Adjust match percentage based on size
  if (size === 'large' && results.length > 0) {
    // Large windows favor sliding/folding more
    results = results.map((r, i) => ({
      ...r,
      matchPercentage: i === 0 ? Math.min(r.matchPercentage + 2, 99) : r.matchPercentage,
    }));
  } else if (size === 'small' && results.length > 0) {
    // Small windows favor fixed/awning more
    results = results.map((r, i) => ({
      ...r,
      matchPercentage: r.category === 'Windows' && i > 0 ? Math.min(r.matchPercentage + 3, 99) : r.matchPercentage,
    }));
  }

  return results.slice(0, 3);
}

// ====== Main Component ======
export default function RecommendationEngine() {
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const recommendations = useMemo(
    () => getRecommendations(selectedRoom, selectedPriority, selectedSize),
    [selectedRoom, selectedPriority, selectedSize]
  );

  const allSelected = selectedRoom && selectedPriority && selectedSize;

  const handleGetRecommendations = () => {
    if (allSelected) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedRoom('');
    setSelectedPriority('');
    setSelectedSize('');
    setShowResults(false);
  };

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
          <Sparkles className="w-3 h-3 mr-1.5" /> Smart Match
        </Badge>
        <h2 className="text-2xl md:text-3xl font-black text-tostem-dark dark:text-white mb-2">
          Looking for Something Specific?
        </h2>
        <p className="text-sm md:text-base text-tostem-text-light dark:text-gray-400 max-w-lg mx-auto">
          Tell us about your space and priorities, and we&apos;ll recommend the perfect Tostem products for you.
        </p>
      </motion.div>

      {/* Selection Steps */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Step 1: Room Type */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-tostem-blue text-white flex items-center justify-center text-xs font-bold">1</div>
            <h3 className="font-bold text-tostem-dark dark:text-gray-200">Select Your Room</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {roomTypes.map((room) => {
              const Icon = room.icon;
              const isSelected = selectedRoom === room.id;
              return (
                <motion.button
                  key={room.id}
                  onClick={() => { setSelectedRoom(room.id); setShowResults(false); }}
                  className={`p-3 rounded-xl text-center transition-all duration-200 border-2 ${
                    isSelected
                      ? 'border-tostem-blue bg-tostem-blue/5 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:border-tostem-blue/30 hover:shadow-sm'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-tostem-blue' : 'text-gray-400'}`} />
                  <span className={`text-xs font-semibold ${isSelected ? 'text-tostem-blue' : 'text-tostem-text-light'}`}>{room.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Priority */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-tostem-blue text-white flex items-center justify-center text-xs font-bold">2</div>
            <h3 className="font-bold text-tostem-dark dark:text-gray-200">What Matters Most?</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {priorities.map((priority) => {
              const Icon = priority.icon;
              const isSelected = selectedPriority === priority.id;
              return (
                <motion.button
                  key={priority.id}
                  onClick={() => { setSelectedPriority(priority.id); setShowResults(false); }}
                  className={`p-3 rounded-xl text-center transition-all duration-200 border-2 ${
                    isSelected
                      ? 'border-tostem-blue bg-tostem-blue/5 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:border-tostem-blue/30 hover:shadow-sm'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-tostem-blue' : 'text-gray-400'}`} />
                  <span className={`text-xs font-semibold ${isSelected ? 'text-tostem-blue' : 'text-tostem-text-light'}`}>{priority.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Window Size */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-tostem-blue text-white flex items-center justify-center text-xs font-bold">3</div>
            <h3 className="font-bold text-tostem-dark dark:text-gray-200">Window Size</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {windowSizes.map((size) => {
              const isSelected = selectedSize === size.id;
              return (
                <motion.button
                  key={size.id}
                  onClick={() => { setSelectedSize(size.id); setShowResults(false); }}
                  className={`p-3 rounded-xl text-center transition-all duration-200 border-2 ${
                    isSelected
                      ? 'border-tostem-blue bg-tostem-blue/5 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:border-tostem-blue/30 hover:shadow-sm'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className={`text-sm font-bold ${isSelected ? 'text-tostem-blue' : 'text-tostem-dark dark:text-gray-200'}`}>{size.label}</span>
                  <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-tostem-blue/70' : 'text-tostem-text-muted'}`}>{size.desc}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Get Recommendations Button */}
        <div className="text-center pt-2">
          <Button
            size="lg"
            className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8 shadow-lg shadow-tostem-blue/20 disabled:opacity-40"
            disabled={!allSelected}
            onClick={handleGetRecommendations}
          >
            <Sparkles className="w-4 h-4 mr-2" /> Get Personalized Recommendation
          </Button>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-tostem-dark dark:text-gray-200">
                Top {recommendations.length} Matches for You
              </h3>
              <button
                onClick={handleReset}
                className="text-xs text-tostem-blue hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-tostem-blue/20 hover:border-tostem-blue/40 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${rec.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Match percentage badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-tostem-blue text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                        {rec.matchPercentage}% Match
                      </div>
                    </div>

                    {/* Rank badge */}
                    {index === 0 && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-amber-500 text-white text-[10px]">Best Match</Badge>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-white/90 text-tostem-dark text-[10px]">{rec.category}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-tostem-dark dark:text-gray-200 text-sm">{rec.name}</h4>
                      <Badge variant="outline" className="text-[10px] text-tostem-blue border-tostem-blue/30">{rec.series}</Badge>
                    </div>

                    {/* Match bar */}
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-tostem-blue to-tostem-blue-light rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${rec.matchPercentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      />
                    </div>

                    {/* Reasons */}
                    <ul className="space-y-1.5 mb-4">
                      {rec.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-tostem-text-light">
                          <CheckCircle className="w-3 h-3 text-tostem-blue mt-0.5 flex-shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>

                    <Button
                      size="sm"
                      className="w-full bg-tostem-blue hover:bg-tostem-blue-light text-white text-xs"
                      onClick={() => { window.location.hash = `/${rec.slug}`; }}
                    >
                      View Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ====== CTA Component for homepage ======
export function RecommendationCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-tostem-light-gray to-white dark:from-[#1a1a1a] dark:to-[#111] rounded-2xl p-6 md:p-8 text-center relative overflow-hidden cursor-pointer group border border-tostem-blue/10 hover:border-tostem-blue/20 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-tostem-blue/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-tostem-blue/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-tostem-blue" />
          </div>
          <h3 className="text-lg md:text-xl font-black text-tostem-dark dark:text-white mb-2">
            Get Personalized Recommendation
          </h3>
          <p className="text-xs md:text-sm text-tostem-text-light dark:text-gray-400 max-w-sm mx-auto mb-4 leading-relaxed">
            Not sure what you need? Answer 3 quick questions about your space and we&apos;ll find the perfect match.
          </p>
          <Button
            size="sm"
            className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-6"
          >
            <Sparkles className="w-3 h-3 mr-1.5" /> Find My Match <ArrowRight className="w-3 h-3 ml-1.5" />
          </Button>
        </div>
      </motion.div>

      {/* Full Recommendation Engine */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#111] rounded-2xl max-w-3xl w-full p-6 md:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <RecommendationEngine />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
