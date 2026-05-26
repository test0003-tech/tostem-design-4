'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Home, CheckCircle, ShieldCheck, VolumeX, Sparkles, Download, ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import type { PageRegistryItem } from '@/lib/tostem-data';

function navigateTo(slug: string) {
  window.location.hash = `/${slug}`;
}

const designDetails: Record<string, {
  title: string; subtitle: string; description: string; image: string; features: string[]; specs: { label: string; value: string }[]; series: { name: string; slug: string }[];
}> = {
  // ==================== EXISTING DESIGNS ====================
  'aluminium-sliding-doors': {
    title: 'Aluminium Sliding Doors',
    subtitle: 'Smooth-Gliding Elegance',
    description: 'Tostem\'s aluminium sliding doors offer effortless operation with multi-track options. Available in 2-panel, 3-panel, 4-panel, and corner sliding configurations, these doors create seamless indoor-outdoor transitions.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    features: ['Smooth gliding operation', 'Multi-track options (2/3/4 panels)', 'Corner sliding available', 'Superior sealing performance', 'Low maintenance', 'Multi-point locking system'],
    specs: [{ label: 'Max Panel Width', value: '1200mm' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 40dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'Grants', slug: 'grants-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'aluminium-casement-doors': {
    title: 'Aluminium Casement Doors',
    subtitle: 'Classic Swing Design',
    description: 'Casement doors from Tostem provide elegant swing-style access with single or double panel configurations. Available in in-swing and out-swing variants with premium hardware.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    features: ['Single and double panel options', 'In-swing and out-swing variants', 'Premium multi-lock hardware', 'Excellent weather sealing', 'Wide opening for easy access', 'Available in multiple series'],
    specs: [{ label: 'Max Panel Width', value: '1000mm' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 40dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'aluminium-sliding-windows-designs': {
    title: 'Aluminium Sliding Windows',
    subtitle: 'Effortless Horizontal Glide',
    description: 'Tostem\'s sliding windows offer smooth horizontal operation with excellent sealing performance. Available in multiple track and panel configurations for any room.',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=80',
    features: ['Smooth sliding operation', '2/3/4 panel options', 'SFS (Slim Frame System) available', 'Excellent air and water tightness', 'Easy to clean and maintain', 'Multiple track configurations'],
    specs: [{ label: 'Max Panel Width', value: '1200mm' }, { label: 'Max Panel Height', value: '2400mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 40dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'Grants', slug: 'grants-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }, { name: 'We 70', slug: 'we-70-windows-doors-series' }],
  },
  'aluminium-casement-windows': {
    title: 'Aluminium Casement Windows',
    subtitle: 'Maximum Ventilation & Views',
    description: 'Side-hinged casement windows that open outward, providing maximum ventilation and unobstructed views. Available with single lock, multi lock, and friction stay options.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    features: ['Single and multi lock options', 'Friction stay and hinge variants', 'Maximum ventilation opening', 'Excellent weather protection', 'Easy operation', 'Premium hardware'],
    specs: [{ label: 'Max Panel Width', value: '800mm' }, { label: 'Max Panel Height', value: '2400mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 40dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'aluminium-french-doors': {
    title: 'Aluminium French Doors',
    subtitle: 'Timeless Double-Door Elegance',
    description: 'Classic double-door design with aluminium precision. French doors from Tostem offer timeless elegance and functionality, creating beautiful transitions between spaces.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80',
    features: ['Classic double-door design', 'Elegant profile lines', 'Wide opening for easy access', 'Premium locking system', 'Excellent thermal insulation', 'Multiple colour options'],
    specs: [{ label: 'Max Panel Width', value: '900mm' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 38dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'Grants', slug: 'grants-windows-doors-series' }],
  },
  'aluminium-bi-folding-doors': {
    title: 'Aluminium Bi-Folding Doors',
    subtitle: 'Wide-Open Living Spaces',
    description: 'Multi-panel folding doors that stack neatly to one side, creating wide-open spaces for seamless indoor-outdoor living. Available in 4, 6, 8, and up to 16 panel configurations.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    features: ['4 to 16 panel options', 'Stack neatly to one side', 'Smooth folding mechanism', 'Wide opening for large spaces', 'Premium track system', 'Corner folding available'],
    specs: [{ label: 'Max Panels', value: '16' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 38dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }],
  },

  // ==================== WINDOWS - NEW ====================
  'aluminium-hung-awning-windows': {
    title: 'Aluminium Awning Windows',
    subtitle: 'Top-Hung Ventilation Excellence',
    description: 'Tostem\'s aluminium awning windows feature a top-hung design that opens outward from the bottom, providing excellent ventilation even during light rain. Their weatherproof construction ensures year-round comfort while maintaining energy efficiency.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80',
    features: ['Top-hung awning operation', 'Excellent ventilation in all weather', 'Rain-safe opening design', 'Superior weather sealing', 'Single and multi-lock options', 'Operator handle variants available'],
    specs: [{ label: 'Max Panel Width', value: '1200mm' }, { label: 'Max Panel Height', value: '1600mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 35dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We 70', slug: 'we-70-windows-doors-series' }],
  },
  'aluminium-fixed-window': {
    title: 'Aluminium Fixed Windows',
    subtitle: 'Panoramic Views, Maximum Light',
    description: 'Fixed windows from Tostem are designed to maximise natural light and provide uninterrupted panoramic views. With no moving parts, they offer superior thermal insulation and weather protection, making them ideal for showcasing beautiful exteriors.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80',
    features: ['Unobstructed panoramic views', 'Maximum natural light intake', 'Superior thermal insulation', 'Corner fixed configurations', 'Low maintenance design', 'Energy efficient glazing options'],
    specs: [{ label: 'Max Width', value: '2400mm' }, { label: 'Max Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'U-Value', value: 'As low as 1.3 W/m²K' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'Grants', slug: 'grants-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }, { name: 'We 70', slug: 'we-70-windows-doors-series' }],
  },
  'aluminium-glass-to-glass-corner-window': {
    title: 'Aluminium Glass-to-Glass Corner Windows',
    subtitle: '270° Seamless Views',
    description: 'Create stunning visual impact with Tostem\'s glass-to-glass corner windows. These innovative designs eliminate corner mullions to provide uninterrupted 270° views, transforming any room into a light-filled architectural statement.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80',
    features: ['Glass-to-glass corner joints', '270° uninterrupted views', 'No corner mullion required', 'Architectural statement design', 'Premium structural silicone bonding', 'Compatible with other window types'],
    specs: [{ label: 'Corner Angle', value: '90° standard' }, { label: 'Max Glass Area', value: '6m² per panel' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Wind Load', value: 'Up to 3600Pa' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'aluminium-french-windows': {
    title: 'Aluminium French Windows',
    subtitle: 'Classic Elegance, Full Ventilation',
    description: 'Aluminium French windows combine the classic charm of traditional French design with modern aluminium precision. These full-length casement windows open fully to deliver maximum ventilation and create an elegant indoor-outdoor flow.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    features: ['Full-length casement opening', 'Classic French design aesthetic', 'Maximum ventilation capacity', 'Double-panel configuration', 'Premium multi-lock system', 'Multiple colour and finish options'],
    specs: [{ label: 'Max Panel Width', value: '900mm' }, { label: 'Max Panel Height', value: '2400mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 38dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'Grants', slug: 'grants-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'aluminium-tilt-slide-windows': {
    title: 'Aluminium Tilt-Slide Windows',
    subtitle: 'Dual-Function Intelligence',
    description: 'Tostem\'s tilt-slide windows offer the best of both worlds — tilt inward for gentle ventilation or slide fully open for maximum airflow. This dual-function design provides flexible ventilation control with European-style engineering.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
    features: ['Dual tilt and slide operation', 'Tilt mode for gentle ventilation', 'Slide mode for full opening', 'Advanced hardware mechanism', 'Secure night ventilation', 'Excellent sealing in both positions'],
    specs: [{ label: 'Max Panel Width', value: '1600mm' }, { label: 'Max Panel Height', value: '2400mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 40dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }],
  },
  'aluminium-slit-windows': {
    title: 'Aluminium Slit Windows',
    subtitle: 'Narrow Profile, Bold Impact',
    description: 'Slit windows from Tostem feature ultra-narrow profiles that create striking vertical or horizontal light slots in modern architectural designs. They offer controlled ventilation while serving as distinctive design elements in contemporary spaces.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    features: ['Ultra-narrow profile design', 'Modern architectural aesthetic', 'Controlled ventilation capability', 'Vertical or horizontal orientation', 'Striking light slot effect', 'Minimalist frame visibility'],
    specs: [{ label: 'Min Width', value: '200mm' }, { label: 'Max Height', value: '2400mm' }, { label: 'Glass Thickness', value: 'Up to 24mm' }, { label: 'Frame Visibility', value: 'As low as 45mm' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }],
  },
  'aluminium-vertical-sliding-windows': {
    title: 'Aluminium Vertical Sliding Windows',
    subtitle: 'Traditional Charm, Modern Performance',
    description: 'Vertical sliding windows combine the timeless appeal of traditional sash windows with modern aluminium engineering. The smooth vertical operation and balanced sash mechanism provide effortless operation while maintaining a classic aesthetic for heritage and contemporary homes alike.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80',
    features: ['Smooth vertical sash operation', 'Traditional sash window aesthetic', 'Counterbalance mechanism', 'Tilt-in for easy cleaning', 'Single or double hung options', 'Modern thermal performance'],
    specs: [{ label: 'Max Panel Width', value: '1000mm' }, { label: 'Max Panel Height', value: '2400mm' }, { label: 'Glass Thickness', value: 'Up to 28mm' }, { label: 'Sound Reduction', value: 'Up to 35dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },

  // ==================== DOORS - NEW ====================
  'aluminium-corner-slider-door': {
    title: 'Aluminium Corner Slider Door',
    subtitle: 'Dramatic Corner Opening',
    description: 'Corner slider doors from Tostem create a dramatic, seamless indoor-outdoor transition by opening at the corner of a room. When both panels slide away, the corner completely opens up, transforming your living space with breathtaking architectural impact.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80',
    features: ['Corner-opening design', 'Seamless indoor-outdoor flow', 'Dramatic architectural impact', 'Both panels slide away completely', 'Premium track and roller system', 'Multi-point locking for security'],
    specs: [{ label: 'Max Panel Width', value: '1200mm' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Opening Type', value: '90° corner' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }],
  },
  'aluminium-slide-fold-doors': {
    title: 'Aluminium Slide and Fold Doors',
    subtitle: 'Flexible Multi-Panel Folding',
    description: 'Slide and fold doors from Tostem offer flexible multi-panel configurations that can span wide openings. Each panel slides and folds individually, allowing partial or full opening to suit your needs, creating versatile indoor-outdoor living spaces.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    features: ['Multi-panel folding system', 'Flexible partial or full opening', 'Individual panel operation', 'Wide opening configurations', 'Smooth slide and fold mechanism', 'Space-efficient stacking design'],
    specs: [{ label: 'Panel Options', value: '3 to 8 panels' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Stack Width', value: 'As low as 15% of opening' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'ventilation-doors': {
    title: 'Ventilation Doors',
    subtitle: 'Airflow Without Compromise',
    description: 'Ventilation doors from Tostem integrate airflow features directly into the door design, allowing fresh air circulation without compromising on security or weather protection. Ideal for spaces that need continuous ventilation throughout the day.',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=80',
    features: ['Integrated ventilation design', 'Airflow without compromising security', 'Weather-resistant louvers', 'Insect mesh screening', 'Adjustable airflow control', 'Suitable for kitchens and utilities'],
    specs: [{ label: 'Ventilation Area', value: 'Up to 40% of door' }, { label: 'Max Door Height', value: '2400mm' }, { label: 'Insect Mesh', value: 'Stainless steel' }, { label: 'Sound Reduction', value: 'Up to 28dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },

  // ==================== STEEL DOORS - NEW ====================
  'giesta-doors': {
    title: 'GIESTA Doors',
    subtitle: 'Premium Steel Entrance, Japanese Design',
    description: 'GIESTA steel entrance doors from Tostem combine Japanese design excellence with superior steel construction. These premium entrance doors offer unmatched security, thermal insulation, and aesthetic appeal, making a powerful first impression for any home.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80',
    features: ['Premium steel construction', 'Japanese design heritage', 'Superior security with multi-lock', 'Excellent thermal insulation', 'Wide range of designs and colours', 'Fire-resistant options available'],
    specs: [{ label: 'Material', value: 'Galvanized steel' }, { label: 'Max Door Height', value: '2400mm' }, { label: 'Security Rating', value: 'RC2/RC3' }, { label: 'Thermal Insulation', value: 'U-value 1.4 W/m²K' }],
    series: [{ name: 'GIESTA', slug: 'steel-entrance-doors' }],
  },
  'giesta-ventilation-doors': {
    title: 'GIESTA Ventilation Doors',
    subtitle: 'Steel Security with Smart Airflow',
    description: 'GIESTA ventilation doors deliver the same premium steel security as standard GIESTA doors, with the added benefit of integrated ventilation. Enjoy fresh airflow and peace of mind with a steel entrance door that doesn\'t compromise on safety or comfort.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
    features: ['Steel entrance with ventilation', 'Security and airflow combined', 'Integrated louver system', 'Insect mesh included', 'Same premium security rating', 'Ideal for entrance areas'],
    specs: [{ label: 'Material', value: 'Galvanized steel' }, { label: 'Ventilation Type', value: 'Adjustable louver' }, { label: 'Security Rating', value: 'RC2' }, { label: 'Insect Mesh', value: 'Stainless steel' }],
    series: [{ name: 'GIESTA', slug: 'steel-entrance-doors' }],
  },

  // ==================== AIRFLOW - NEW ====================
  'ventilation-slots': {
    title: 'Ventilation Slots',
    subtitle: 'Continuous Wall-Mounted Airflow',
    description: 'Ventilation slots from Tostem provide wall-mounted continuous airflow solutions for any room. Designed for weather resistance and durability, they deliver consistent fresh air circulation while keeping rain and debris out.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    features: ['Wall-mounted installation', 'Continuous airflow design', 'Weather-resistant construction', 'Insect mesh integrated', 'Low-profile aesthetic', 'Suitable for all room types'],
    specs: [{ label: 'Length Options', value: '400mm–1200mm' }, { label: 'Airflow Rate', value: 'Up to 75 m³/h per meter' }, { label: 'Weather Rating', value: 'Class 4A' }, { label: 'Material', value: 'Aluminium' }],
    series: [],
  },
  'aluminum-louver': {
    title: 'Aluminium Louvers',
    subtitle: 'Adjustable Blades, Controlled Airflow',
    description: 'Aluminium louvers from Tostem feature adjustable blade angles for precise airflow control. Their architectural aesthetic adds a distinctive design element to any facade while providing effective ventilation and sun shading.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    features: ['Adjustable blade angles', 'Precise airflow control', 'Architectural aesthetic appeal', 'Sun shading capability', 'Weather-resistant aluminium', 'Motorized options available'],
    specs: [{ label: 'Blade Width', value: '50mm–150mm' }, { label: 'Max Module Size', value: '1500mm × 2000mm' }, { label: 'Material', value: 'Extruded aluminium' }, { label: 'Finish', value: 'Anodized / Powder coat' }],
    series: [],
  },
  'glass-louver': {
    title: 'Glass Louvers',
    subtitle: 'Light + Ventilation, Modern Aesthetic',
    description: 'Glass louvers from Tostem combine the transparency of glass with the ventilation benefits of louver design. Adjustable glass blades allow natural light and fresh air simultaneously, creating a modern aesthetic that enhances any contemporary space.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80',
    features: ['Transparent glass blades', 'Natural light and ventilation', 'Adjustable blade angles', 'Modern minimalist aesthetic', 'Easy manual or motorized operation', 'Weather sealing when closed'],
    specs: [{ label: 'Blade Material', value: 'Toughened glass' }, { label: 'Blade Width', value: '100mm–150mm' }, { label: 'Max Module Size', value: '1200mm × 1800mm' }, { label: 'Operation', value: 'Manual / Motorized' }],
    series: [],
  },

  // ==================== FACADES - NEW ====================
  'facade-curtain-wall': {
    title: 'Curtain Wall Facades',
    subtitle: 'Grand Glass Exteriors',
    description: 'Curtain wall facades from Tostem create stunning, grand glass exteriors for commercial buildings and premium residences. These non-structural outer coverings span multiple floors, delivering dramatic visual impact with superior thermal and acoustic performance.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    features: ['Multi-floor spanning capability', 'Grand glass exterior aesthetic', 'Superior thermal performance', 'High acoustic insulation', 'Structural silicone glazing', 'Custom mullion and transom profiles'],
    specs: [{ label: 'Max Span', value: 'Up to 3.6m per module' }, { label: 'Glass Thickness', value: 'Up to 40mm' }, { label: 'Wind Load', value: 'Up to 5000Pa' }, { label: 'U-Value', value: 'As low as 1.1 W/m²K' }],
    series: [],
  },
  'facade-store-front': {
    title: 'Store Front Facades',
    subtitle: 'Commercial Glass Front Excellence',
    description: 'Store front facades from Tostem are designed for commercial retail and office buildings, offering expansive glass frontages that showcase interiors while providing excellent thermal insulation and security for high-traffic environments.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80',
    features: ['Expansive glass frontage', 'Commercial-grade construction', 'Retail and office building ideal', 'High-traffic durability', 'Thermal break technology', 'Multiple entrance configurations'],
    specs: [{ label: 'Max Height', value: 'Up to 3600mm' }, { label: 'Glass Thickness', value: 'Up to 36mm' }, { label: 'Wind Load', value: 'Up to 3600Pa' }, { label: 'Thermal Break', value: 'Polyamide strip' }],
    series: [],
  },

  // ==================== INTERIOR - NEW ====================
  'hanging-door': {
    title: 'Hanging Doors',
    subtitle: 'Suspended Sliding, Space-Saving',
    description: 'Hanging doors from Tostem feature a suspended sliding mechanism that eliminates floor tracks for a clean, modern interior look. These space-saving doors glide effortlessly along overhead tracks, perfect for contemporary homes and office partitions.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    features: ['Suspended sliding mechanism', 'No floor track required', 'Space-saving design', 'Smooth overhead rail system', 'In-wall and on-wall mounting', '2/3/4 panel configurations'],
    specs: [{ label: 'Max Panel Width', value: '1200mm' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Track Type', value: 'Overhead rail' }, { label: 'Weight Capacity', value: 'Up to 120kg per panel' }],
    series: [{ name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'swing-door': {
    title: 'Swing Doors',
    subtitle: 'Classic Swing, Aluminium Precision',
    description: 'Swing doors from Tostem bring classic swing operation with modern aluminium precision to interior spaces. Ideal for room partitions and access points, they offer reliable performance with a refined aesthetic that complements any interior design.',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=80',
    features: ['Classic swing operation', 'Aluminium frame precision', 'Interior partition ideal', 'In-swing and out-swing options', 'Premium hinge hardware', 'Sound-rated options available'],
    specs: [{ label: 'Max Panel Width', value: '1000mm' }, { label: 'Max Panel Height', value: '2700mm' }, { label: 'Glass Thickness', value: 'Up to 32mm' }, { label: 'Sound Reduction', value: 'Up to 38dB' }],
    series: [{ name: 'ATIS', slug: 'atis-windows-doors-series' }, { name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
  'fixed-divider': {
    title: 'Fixed Dividers',
    subtitle: 'Elegant Space Division',
    description: 'Fixed dividers from Tostem provide permanent aluminium partitions for elegant space division without sacrificing light flow. They deliver acoustic separation while maintaining visual connectivity, perfect for modern open-plan offices and homes.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
    features: ['Fixed aluminium partition', 'Acoustic separation capability', 'Light-flowing transparency', 'Space division without walls', 'Premium frame finish options', 'Single and double glazing'],
    specs: [{ label: 'Max Width', value: '2400mm per module' }, { label: 'Max Height', value: '3000mm' }, { label: 'Glass Options', value: 'Single/double glazed' }, { label: 'Acoustic Rating', value: 'Up to Rw 42dB' }],
    series: [{ name: 'We Plus', slug: 'we-plus-windows-doors-series' }],
  },
};

// ==================== CATEGORY MAP FOR RELATED DESIGNS ====================
const designCategoryMap: Record<string, string> = {
  // Windows
  'aluminium-sliding-windows-designs': 'windows',
  'aluminium-casement-windows': 'windows',
  'aluminium-hung-awning-windows': 'windows',
  'aluminium-fixed-window': 'windows',
  'aluminium-glass-to-glass-corner-window': 'windows',
  'aluminium-french-windows': 'windows',
  'aluminium-tilt-slide-windows': 'windows',
  'aluminium-slit-windows': 'windows',
  'aluminium-vertical-sliding-windows': 'windows',
  // Doors
  'aluminium-sliding-doors': 'doors',
  'aluminium-casement-doors': 'doors',
  'aluminium-french-doors': 'doors',
  'aluminium-bi-folding-doors': 'doors',
  'aluminium-corner-slider-door': 'doors',
  'aluminium-slide-fold-doors': 'doors',
  'ventilation-doors': 'doors',
  // Steel Doors
  'giesta-doors': 'steel-doors',
  'giesta-ventilation-doors': 'steel-doors',
  // Airflow
  'ventilation-slots': 'airflow',
  'aluminum-louver': 'airflow',
  'glass-louver': 'airflow',
  // Facades
  'facade-curtain-wall': 'facades',
  'facade-store-front': 'facades',
  // Interior
  'hanging-door': 'interior',
  'swing-door': 'interior',
  'fixed-divider': 'interior',
};

function getRelatedDesigns(currentSlug: string): { slug: string; title: string; subtitle: string; image: string }[] {
  const category = designCategoryMap[currentSlug];
  if (!category) return [];

  const sameCategory = Object.entries(designDetails)
    .filter(([slug]) => slug !== currentSlug && designCategoryMap[slug] === category)
    .map(([slug, details]) => ({
      slug,
      title: details.title,
      subtitle: details.subtitle,
      image: details.image,
    }));

  // Return up to 4 related designs
  return sameCategory.slice(0, 4);
}

// ==================== GALLERY PLACEHOLDER IMAGES ====================
function getGalleryImages(slug: string): string[] {
  // Return 4 contextual gallery images per design
  const base = designDetails[slug];
  if (!base) return [];
  return [
    base.image.replace('w=1920', 'w=600'),
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80',
  ];
}

interface DesignPageProps {
  slug: string;
  pageInfo: PageRegistryItem;
}

export default function DesignPage({ slug, pageInfo }: DesignPageProps) {
  const details = designDetails[slug];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const openLightbox = (img: string) => {
    setLightboxImage(img);
    setLightboxOpen(true);
  };

  if (!details) {
    // Fallback to generic page content
    return (
      <div className="pt-[88px] lg:pt-[132px]">
        <section className="relative h-[350px] overflow-hidden bg-tostem-dark">
          <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">{pageInfo.title}</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white">{pageInfo.title}</h1>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <p className="text-tostem-text-light leading-relaxed">{pageInfo.description || `Explore Tostem's ${pageInfo.title} — designed with Japanese precision for Indian homes and commercial spaces.`}</p>
            <div className="mt-8">
              <Button className="bg-tostem-blue text-white" onClick={() => navigateTo('contact')}>Get Quotation <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const relatedDesigns = getRelatedDesigns(slug);
  const galleryImages = getGalleryImages(slug);

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${details.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a>
                <ChevronRight className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(pageInfo.type === 'design' ? 'aluminium-doors-design-prices' : 'home'); }} className="hover:text-white">Our Products</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">{details.title}</span>
              </nav>
              <Badge className="bg-tostem-blue text-white mb-3">{details.subtitle}</Badge>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{details.title}</h1>
              <p className="text-base text-white/70 max-w-2xl">{details.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl font-bold text-tostem-dark mb-6"
          >
            Design Gallery
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="relative group cursor-pointer rounded-xl overflow-hidden aspect-[4/3] bg-tostem-light-gray"
                onClick={() => openLightbox(img)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${img})` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs font-medium">Configuration {i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Specs */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold text-tostem-dark mb-6">Key Features</h2>
              <ul className="space-y-4">
                {details.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tostem-blue mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-tostem-text-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold text-tostem-dark mb-6">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {details.specs.map((spec) => (
                  <div key={spec.label} className="bg-tostem-light-gray rounded-lg p-4">
                    <div className="text-xs text-tostem-text-muted uppercase tracking-wider">{spec.label}</div>
                    <div className="text-lg font-bold text-tostem-dark mt-1">{spec.value}</div>
                  </div>
                ))}
              </div>
              {/* Quick benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-100">
                  <ShieldCheck className="w-5 h-5 text-tostem-blue" />
                  <span className="text-sm text-tostem-text-light">100+ quality checks per product</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-100">
                  <VolumeX className="w-5 h-5 text-tostem-blue" />
                  <span className="text-sm text-tostem-text-light">Up to 40dB sound reduction</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-100">
                  <Sparkles className="w-5 h-5 text-tostem-blue" />
                  <span className="text-sm text-tostem-text-light">5x harder anodized finish</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Series */}
      {details.series.length > 0 && (
        <section className="py-12 md:py-16 bg-tostem-light-gray">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-tostem-dark mb-8">Available in These Series</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {details.series.map((s) => (
                <a
                  key={s.slug}
                  href={`#/${s.slug}`}
                  onClick={(e) => { e.preventDefault(); navigateTo(s.slug); }}
                  className="relative bg-white rounded-xl p-6 shadow-sm overflow-hidden group"
                >
                  {/* Hover background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-tostem-blue/5 to-tostem-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-tostem-blue scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                  <div className="relative">
                    <div className="text-xl font-black text-tostem-blue mb-2 group-hover:translate-x-1 transition-transform duration-300">{s.name}</div>
                    <div className="flex items-center gap-1 text-tostem-blue text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      View Series <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  {/* Subtle shadow lift */}
                  <div className="absolute inset-0 rounded-xl shadow-0 group-hover:shadow-lg transition-shadow duration-300 pointer-events-none" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Download Brochure CTA Banner */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-tostem-dark to-tostem-dark/95 relative overflow-hidden">
        {/* Decorative diagonal */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-tostem-blue/10 skew-x-[-15deg] translate-x-1/4" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-tostem-blue/20 flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-tostem-blue" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Download Our Product Brochure</h3>
                <p className="text-white/60 text-sm mt-1">Get the complete catalogue with specifications, configurations, and colour options.</p>
              </div>
            </div>
            <Button
              className="bg-tostem-blue hover:bg-tostem-blue/90 text-white px-8 py-3 text-base font-semibold flex-shrink-0"
              onClick={() => navigateTo('contact')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Related Designs */}
      {relatedDesigns.length > 0 && (
        <section className="py-12 md:py-16 bg-tostem-light-gray">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-tostem-dark mb-8"
            >
              Related Designs
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDesigns.map((related, i) => (
                <motion.a
                  key={related.slug}
                  href={`#/${related.slug}`}
                  onClick={(e) => { e.preventDefault(); navigateTo(related.slug); }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${related.image.replace('w=1920', 'w=600')})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-tostem-blue/90 text-white text-[10px]">{related.subtitle}</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-tostem-dark text-sm group-hover:text-tostem-blue transition-colors duration-300">{related.title}</h3>
                    <div className="flex items-center gap-1 text-tostem-blue text-xs font-medium mt-2 group-hover:gap-2 transition-all duration-300">
                      Explore <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 bg-tostem-dark">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Get a Quotation for {details.title}</h2>
          <p className="text-white/60 mb-6">Contact us for a free consultation and quote for your project.</p>
          <Button className="bg-tostem-blue hover:bg-tostem-blue-light text-white px-8" onClick={() => navigateTo('contact')}>Get Free Quotation <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div
            className="max-w-4xl w-full aspect-[16/10] bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${lightboxImage.replace('w=600', 'w=1920')})` }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
