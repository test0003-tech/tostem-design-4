// Tostem India - Single Source of Truth for all site content
// Task ID: 5 - Massively expanded content data

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface MegaMenuColumn {
  title: string;
  items: NavItem[];
}

export interface NavSection {
  label: string;
  href: string;
  columns?: MegaMenuColumn[];
  children?: NavItem[];
}

// ============ NAVIGATION (Exact Tostem India structure) ============

// Product mega menu tab interface
export interface MegaMenuTab {
  id: string;
  label: string;
  href: string;
  designs: NavItem[];
  series: NavItem[];
}

// Extended NavSection with mega menu tabs
export interface NavSectionV2 {
  label: string;
  href: string;
  type: 'dropdown' | 'mega-menu' | 'nested-dropdown';
  children?: NavItem[];
  megaMenuTabs?: MegaMenuTab[];
}

export const mainNavigation: NavSection[] = [
  {
    label: "ABOUT TOSTEM",
    href: "#/about-tostem",
    children: [
      { label: "About Tostem", href: "#/about-tostem" },
      { label: "Leader's Message", href: "#/directors-message" },
      { label: "Our Purpose And Behaviour", href: "#/our-purpose-and-behaviour" },
      { label: "LIXIL Window System", href: "#/lixil-window-system" },
      { label: "Awards", href: "#/awards" },
    ],
  },
  {
    label: "WHY TOSTEM",
    href: "#/total-housing-solutions",
    children: [
      { label: "Total Housing Solutions", href: "#/total-housing-solutions" },
      { label: "Japanese Innovation", href: "#/japanese-innovation" },
      { label: "Pre Engineered System Windows", href: "#/pre-engineered-system-windows" },
      { label: "Quality Assurance and Testing", href: "#/quality-assurance-and-services" },
      { label: "TOSTEM Product Performance", href: "#/soundproof-window-door-performance" },
      { label: "Surface & Colour Protection", href: "#/anodized-aluminum-windows-surface-colour-protection" },
      { label: "Anodised Aluminium Window", href: "#/anodised-aluminium-windows-doors-colour" },
      { label: "Sound Insulated Doors and Windows", href: "#/soundproof-insulated-doors-and-windows" },
    ],
  },
  {
    label: "OUR PRODUCT",
    href: "#/aluminium-doors-design-prices",
    columns: [
      {
        title: "Aluminium Doors",
        items: [
          { label: "Sliding Doors", href: "#/aluminium-sliding-doors" },
          { label: "Casement Doors", href: "#/aluminium-casement-doors" },
          { label: "French Doors", href: "#/aluminium-french-doors" },
          { label: "Folding (Bi Fold) Doors", href: "#/aluminium-bi-folding-doors" },
          { label: "Corner Slider Door", href: "#/aluminium-corner-slider-door" },
          { label: "Slide and Fold Doors", href: "#/aluminium-slide-fold-doors" },
          { label: "Ventilation Doors", href: "#/ventilation-doors" },
        ],
      },
      {
        title: "Aluminium Windows",
        items: [
          { label: "Sliding Windows", href: "#/aluminium-sliding-windows-designs" },
          { label: "Casement Windows", href: "#/aluminium-casement-windows" },
          { label: "Awning Windows", href: "#/aluminium-hung-awning-windows" },
          { label: "Fixed Windows", href: "#/aluminium-fixed-window" },
          { label: "Glass To Glass Corner Windows", href: "#/aluminium-glass-to-glass-corner-window" },
          { label: "French Windows", href: "#/aluminium-french-windows" },
          { label: "Tilt and Slide Windows", href: "#/aluminium-tilt-slide-windows" },
          { label: "Slit Windows", href: "#/aluminium-slit-windows" },
          { label: "Vertical Sliding Windows", href: "#/aluminium-vertical-sliding-windows" },
        ],
      },
      {
        title: "Steel Entrance Doors",
        items: [
          { label: "GIESTA Design Simulation", href: "#/steel-entrance-doors" },
          { label: "Giesta Doors", href: "#/giesta-doors" },
          { label: "Giesta with Ventilation", href: "#/giesta-ventilation-doors" },
        ],
      },
      {
        title: "Airflow System",
        items: [
          { label: "GIESTA Airflow", href: "#/airflow-system" },
          { label: "Ventilation Doors", href: "#/ventilation-doors" },
          { label: "Ventilation Slot", href: "#/ventilation-slots" },
          { label: "Aluminium Louvers", href: "#/aluminum-louver" },
          { label: "Glass Louvers", href: "#/glass-louver" },
        ],
      },
      {
        title: "Facades",
        items: [
          { label: "Curtain Wall Facades", href: "#/facade-curtain-wall" },
          { label: "Store Front Facades", href: "#/facade-store-front" },
        ],
      },
      {
        title: "Interior",
        items: [
          { label: "Hanging Doors", href: "#/hanging-door" },
          { label: "Swing Doors", href: "#/swing-door" },
          { label: "Fixed Divider", href: "#/fixed-divider" },
        ],
      },
    ],
  },
  {
    label: "DRIVING EXPERIENCE",
    href: "#/e-catalogue",
    children: [
      { label: "E-catalogue", href: "#/e-catalogue" },
      { label: "Modern Window & Door Design", href: "#/modern-window-door-design" },
      { label: "GIESTA Design Simulation", href: "#/steel-entrance-doors" },
      { label: "Gallery", href: "#/gallery" },
    ],
  },
  {
    label: "TADA",
    href: "#/tada-2025",
    children: [
      { label: "TADA-2025", href: "#/tada-2025" },
      { label: "TADA-2024", href: "#/tada-2024" },
      { label: "TADA-2023", href: "#/tada-2023" },
    ],
  },
  {
    label: "KNOWLEDGE EXPERIENCE",
    href: "#/blog",
    children: [
      { label: "Pre Engineered System Windows", href: "#/what-is-pre-engineered-system-window", children: [
        { label: "Planning a System Window", href: "#/planning-a-system-window" },
        { label: "System Aluminum Windows", href: "#/system-aluminum-windows" },
      ]},
      { label: "Blog", href: "#/blog" },
      { label: "Glossary", href: "#/glossary" },
      { label: "Testimonials", href: "#/testimonials" },
    ],
  },
  {
    label: "REACH US",
    href: "#/contact",
    children: [
      { label: "TOSTEM Offices", href: "#/contact" },
      { label: "Find a TOSTEM Studio", href: "https://studio.tostemindia.com/" },
    ],
  },
];

// Mega menu tabs for "Our Product" section
export const productMegaMenuTabs: MegaMenuTab[] = [
  {
    id: "aluminium-doors",
    label: "Aluminium Doors",
    href: "#/aluminium-doors-design-prices",
    designs: [
      { label: "Sliding Doors", href: "#/aluminium-sliding-doors" },
      { label: "Casement Doors", href: "#/aluminium-casement-doors" },
      { label: "French Doors", href: "#/aluminium-french-doors" },
      { label: "Folding (Bi Fold) Doors", href: "#/aluminium-bi-folding-doors" },
      { label: "Corner Slider Door", href: "#/aluminium-corner-slider-door" },
      { label: "Slide and Fold Doors", href: "#/aluminium-slide-fold-doors" },
      { label: "Ventilation Doors", href: "#/ventilation-doors" },
    ],
    series: [
      { label: "Grants", href: "#/grants-windows-doors-series" },
      { label: "ATIS", href: "#/atis-windows-doors-series" },
      { label: "We Plus", href: "#/we-plus-windows-doors-series" },
      { label: "We 70", href: "#/we-70-windows-doors-series" },
    ],
  },
  {
    id: "aluminium-windows",
    label: "Aluminium Windows",
    href: "#/aluminium-windows-design-prices",
    designs: [
      { label: "Sliding Windows", href: "#/aluminium-sliding-windows-designs" },
      { label: "Casement Windows", href: "#/aluminium-casement-windows" },
      { label: "Awning Windows", href: "#/aluminium-hung-awning-windows" },
      { label: "Fixed Windows", href: "#/aluminium-fixed-window" },
      { label: "Glass To Glass Corner Windows", href: "#/aluminium-glass-to-glass-corner-window" },
      { label: "French Windows", href: "#/aluminium-french-windows" },
      { label: "Tilt and Slide Windows", href: "#/aluminium-tilt-slide-windows" },
      { label: "Slit Windows", href: "#/aluminium-slit-windows" },
      { label: "Vertical Sliding Windows", href: "#/aluminium-vertical-sliding-windows" },
    ],
    series: [
      { label: "Grants", href: "#/grants-windows-doors-series" },
      { label: "ATIS", href: "#/atis-windows-doors-series" },
      { label: "We Plus", href: "#/we-plus-windows-doors-series" },
      { label: "We 70", href: "#/we-70-windows-doors-series" },
    ],
  },
  {
    id: "steel-entrance-doors",
    label: "Steel Entrance Doors",
    href: "#/steel-entrance-doors",
    designs: [
      { label: "GIESTA Design Simulation", href: "#/steel-entrance-doors" },
    ],
    series: [
      { label: "Giesta Doors", href: "#/giesta-doors" },
      { label: "Giesta with Ventilation", href: "#/giesta-ventilation-doors" },
    ],
  },
  {
    id: "airflow-system",
    label: "Airflow System",
    href: "#/airflow-system",
    designs: [
      { label: "GIESTA Airflow", href: "#/airflow-system" },
      { label: "Ventilation Doors", href: "#/ventilation-doors" },
      { label: "Ventilation Slot", href: "#/ventilation-slots" },
      { label: "Aluminium Louvers", href: "#/aluminum-louver" },
      { label: "Glass Louvers", href: "#/glass-louver" },
    ],
    series: [],
  },
  {
    id: "facades",
    label: "Facades",
    href: "#/facades",
    designs: [
      { label: "Curtain Wall Facades", href: "#/facade-curtain-wall" },
      { label: "Store Front Facades", href: "#/facade-store-front" },
    ],
    series: [],
  },
  {
    id: "interior",
    label: "Interior",
    href: "#/interior",
    designs: [
      { label: "Hanging Doors", href: "#/hanging-door" },
      { label: "Swing Doors", href: "#/swing-door" },
      { label: "Fixed Divider", href: "#/fixed-divider" },
    ],
    series: [],
  },
];

// ============ HERO SECTION ============

export interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: { label: string; href: string };
}

export const heroSlides: HeroSlide[] = [
  {
    title: "Japanese Innovation",
    subtitle: "in Window Design",
    description:
      "Experience the perfect blend of Japanese precision engineering and elegant design with Tostem's premium aluminium windows and doors.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    cta: { label: "Explore Products", href: "#products" },
  },
  {
    title: "Premium Aluminium",
    subtitle: "Windows & Doors",
    description:
      "Crafted with cutting-edge technology, our system windows offer unmatched durability, thermal insulation, and soundproofing.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    cta: { label: "Why Tostem", href: "#why-tostem" },
  },
  {
    title: "Pre-Engineered",
    subtitle: "System Windows",
    description:
      "Manufactured in controlled factory environments for consistent quality, perfect fits, and superior performance every time.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
    cta: { label: "Get Quotation", href: "#quotation" },
  },
  {
    title: "Soundproof Living",
    subtitle: "Up to 40dB Reduction",
    description:
      "Tostem windows deliver up to 40dB sound reduction, creating peaceful interiors even in the noisiest urban environments.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80",
    cta: { label: "Learn More", href: "#why-tostem" },
  },
];

// ============ ABOUT TOSTEM ============

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  directorMessage: {
    name: string;
    title: string;
    message: string;
    image: string;
  };
  purposeValues: {
    purpose: string;
    behaviours: string[];
  };
  lixilInfo: {
    title: string;
    description: string;
    stats: { label: string; value: string }[];
  };
  brandStory: string;
  stats: { number: string; label: string; desc: string }[];
}

export const aboutData: AboutData = {
  title: "Japanese Precision, Indian Homes",
  subtitle: "About Tostem",
  description:
    "Tostem is a premium brand from LIXIL, Japan's largest building materials company. Part of the LIXIL Group Corporation (listed on Tokyo Stock Exchange), Tostem brings decades of Japanese expertise in aluminium window and door systems to India. Our commitment to quality, innovation, and craftsmanship has made us the preferred choice for architects, builders, and homeowners across the country.",
  directorMessage: {
    name: "Kenichi Morimoto",
    title: "Managing Director, LIXIL Window Systems India",
    message:
      "At Tostem, we believe that every window and door we create is a testament to the Japanese philosophy of monozukuri — the spirit of craftsmanship. When we entered the Indian market, we saw an opportunity to transform the way India experiences windows and doors. Our pre-engineered system windows bring a level of precision, quality, and performance that was previously unavailable in this market. We are committed to making Indian homes more comfortable, secure, and beautiful through our innovative aluminium solutions. Every product that carries the Tostem name represents our unwavering dedication to excellence.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  purposeValues: {
    purpose:
      "To create a better living environment for people everywhere through innovative, high-quality aluminium window and door systems that combine Japanese precision with local sensibility.",
    behaviours: [
      "Unwavering commitment to quality in every product and process",
      "Continuous innovation driven by customer needs and technological advancement",
      "Respect for people — our employees, partners, and customers",
      "Sustainable practices that protect the environment for future generations",
      "Integrity and transparency in all our business relationships",
    ],
  },
  lixilInfo: {
    title: "LIXIL Window System",
    description:
      "LIXIL is Japan's largest building materials and housing company, listed on the Tokyo Stock Exchange. With over 50,000 employees worldwide and operations in more than 150 countries, LIXIL brings unparalleled expertise in building technology. Tostem is one of LIXIL's flagship brands, representing the pinnacle of window and door engineering.",
    stats: [
      { label: "Employees Worldwide", value: "50,000+" },
      { label: "Countries of Operation", value: "150+" },
      { label: "Years of Heritage", value: "100+" },
      { label: "Revenue (USD)", value: "$9B+" },
    ],
  },
  brandStory:
    "Born in Japan in 1949, Tostem has been at the forefront of aluminium window and door innovation for over seven decades. What began as a small manufacturing unit in Tokyo has grown into a globally recognised brand synonymous with quality and precision. When Tostem entered India, it brought with it not just products, but a philosophy — that every home deserves windows and doors crafted with the same care and precision that Japanese artisans bring to their work. Today, Tostem India operates through a network of channel partners across 100+ cities, bringing Japanese innovation to Indian doorsteps.",
  stats: [
    {
      number: "50+",
      label: "Years of Innovation",
      desc: "Decades of Japanese R&D in window systems",
    },
    {
      number: "1000+",
      label: "Projects Completed",
      desc: "Across residential and commercial segments",
    },
    {
      number: "100+",
      label: "Cities Served",
      desc: "Pan-India network of channel partners",
    },
    {
      number: "100+",
      label: "Quality Checks",
      desc: "Every product goes through rigorous testing",
    },
    {
      number: "40dB",
      label: "Sound Reduction",
      desc: "Industry-leading acoustic performance",
    },
    {
      number: "5x",
      label: "Harder Finish",
      desc: "Anodized finish durability vs untreated aluminium",
    },
  ],
};

// ============ WHY TOSTEM ============

export interface WhyTostemItem {
  icon: string;
  title: string;
  description: string;
  detailed: string;
}

export const whyTostemItems: WhyTostemItem[] = [
  {
    icon: "shield-check",
    title: "Japanese Innovation",
    description:
      "Born from LIXIL's Japanese heritage, Tostem windows embody precision engineering and cutting-edge technology for superior performance.",
    detailed:
      "Tostem windows embody the Japanese philosophy of monozukuri (craftsmanship). Every product undergoes rigorous testing and quality checks to ensure it meets the highest standards of precision and durability. Our research and development centre in Japan continuously innovates to create window systems that are not just functional but works of engineering art.",
  },
  {
    icon: "settings",
    title: "Pre-Engineered System",
    description:
      "Every window is pre-engineered in a controlled factory environment, ensuring consistent quality that on-site fabrication simply cannot match.",
    detailed:
      "Unlike conventional windows that are fabricated on-site with inconsistent quality, Tostem's pre-engineered system windows are manufactured in a controlled factory environment. This ensures every window that leaves our facility meets exact specifications, providing consistent quality, perfect fits, and superior performance every time.",
  },
  {
    icon: "award",
    title: "Quality Assurance",
    description:
      "Rigorous testing protocols and international certifications guarantee that every Tostem product meets the highest standards of excellence.",
    detailed:
      "Every Tostem product goes through over 100 quality checks before it reaches your home. Our commitment to quality is backed by international certifications including JIS (Japanese Industrial Standards), ISO 9001, and ISO 14001. We also provide comprehensive after-sales service and maintenance support.",
  },
  {
    icon: "sparkles",
    title: "Anodized Aluminum",
    description:
      "Our anodized aluminum finish provides superior corrosion resistance and a beautiful, long-lasting appearance that stands the test of time.",
    detailed:
      "Tostem's anodized aluminum finish is not just a surface treatment—it's an integral part of the metal itself. This creates a finish that's 5x harder than untreated aluminum, providing superior resistance to corrosion, scratching, and UV fading. Available in a range of elegant colours that maintain their beauty for decades.",
  },
  {
    icon: "volume-x",
    title: "Soundproof Insulated",
    description:
      "Advanced multi-point locking and double sealing systems deliver exceptional sound insulation for peaceful, quiet interiors.",
    detailed:
      "Tostem windows deliver up to 40dB sound reduction, creating peaceful interiors even in noisy urban environments. Our multi-point locking system and double sealing technology create an airtight barrier that keeps noise out and comfort in. Tested to international standards for acoustic performance.",
  },
  {
    icon: "check-circle",
    title: "System Aluminum Windows",
    description:
      "Our complete system approach integrates profiles, hardware, and accessories into a unified, high-performance window solution.",
    detailed:
      "A system window is a complete, engineered solution where every component—from profiles to hardware to gaskets—is designed to work together as an integrated system. This systems approach ensures optimal performance in thermal insulation, water resistance, air permeability, and wind load resistance.",
  },
];

// ============ PRODUCTS ============

export interface ProductDesign {
  name: string;
  href: string;
  series?: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
  href: string;
  designs: ProductDesign[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "windows",
    name: "Windows",
    description:
      "Explore our range of premium aluminium windows — sliding, casement, awning, fixed, and more.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    count: 24,
    href: "#windows",
    designs: [
      { name: "Sliding Windows — 2 Panels on 2 Tracks", href: "#sliding-windows", series: ["ATIS", "GRANTS", "WE-70", "WE+"] },
      { name: "Sliding Windows — 3 Panels on 2 Tracks SFS", href: "#sliding-windows", series: ["ATIS", "WE+"] },
      { name: "Sliding Windows — 4 Panels on 2 Tracks", href: "#sliding-windows", series: ["ATIS", "GRANTS"] },
      { name: "Sliding Windows — 2 Panels on 2 Tracks WE70", href: "#sliding-windows", series: ["WE-70"] },
      { name: "Sliding Windows — 2 Panels on 2 Tracks WE+", href: "#sliding-windows", series: ["WE+"] },
      { name: "Sliding Windows — 2 Panels on 2 Tracks Grants", href: "#sliding-windows", series: ["GRANTS"] },
      { name: "Sliding Windows — 3 Panels on 3 Tracks WE+", href: "#sliding-windows", series: ["WE+"] },
      { name: "Sliding Windows — 4 Panels on 2 Tracks Grants", href: "#sliding-windows", series: ["GRANTS"] },
      { name: "Casement Windows — Single Lock", href: "#casement-windows", series: ["ATIS", "WE+"] },
      { name: "Casement Windows — Multi Lock", href: "#casement-windows", series: ["ATIS", "WE+"] },
      { name: "Casement Windows — With Friction Stay", href: "#casement-windows", series: ["ATIS", "WE+"] },
      { name: "Casement Windows — With Hinge or Pivot", href: "#casement-windows", series: ["ATIS"] },
      { name: "Casement Windows — Operator Handle", href: "#casement-windows", series: ["ATIS"] },
      { name: "Awning Windows — Single Lock", href: "#awning-windows", series: ["ATIS"] },
      { name: "Awning Windows — Multi Lock", href: "#awning-windows", series: ["ATIS"] },
      { name: "Awning Windows — Operator Handle", href: "#awning-windows", series: ["ATIS"] },
      { name: "Awning Windows — WE70", href: "#awning-windows", series: ["WE-70"] },
      { name: "Awning Windows — Slit Window", href: "#awning-windows", series: ["ATIS"] },
      { name: "Fixed Windows — Standard", href: "#fixed-windows", series: ["ATIS", "GRANTS", "WE-70", "WE+"] },
      { name: "Fixed Windows — Corner Fixed", href: "#fixed-windows", series: ["ATIS", "WE+"] },
      { name: "Fixed Windows — Grants", href: "#fixed-windows", series: ["GRANTS"] },
      { name: "Tilt-Slide Windows", href: "#tilt-slide-windows", series: ["ATIS"] },
      { name: "Mix Windows", href: "#mix-windows", series: ["ATIS", "WE+"] },
    ],
  },
  {
    id: "doors",
    name: "Doors",
    description:
      "Discover our aluminium doors — sliding, swing, folding, hanging, partition, and entrance options.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    count: 28,
    href: "#doors",
    designs: [
      { name: "Sliding Doors — 2 Panels on 2 Tracks", href: "#sliding-doors", series: ["ATIS", "WE+"] },
      { name: "Sliding Doors — 3 Panels on 3 Tracks", href: "#sliding-doors", series: ["ATIS", "WE+"] },
      { name: "Sliding Doors — 4 Panels on 2 Tracks", href: "#sliding-doors", series: ["ATIS"] },
      { name: "Sliding Doors — 6 Panels on 3 Tracks", href: "#sliding-doors", series: ["ATIS"] },
      { name: "Sliding Doors — 3 Panels on 2 Tracks SFS", href: "#sliding-doors", series: ["ATIS"] },
      { name: "Sliding Doors — 2 Panels on 2 Tracks WE+", href: "#sliding-doors", series: ["WE+"] },
      { name: "Sliding Doors — 2 Panels on 2 Tracks Grants", href: "#sliding-doors", series: ["GRANTS"] },
      { name: "Sliding Doors — 3 Panels on 3 Tracks Grants", href: "#sliding-doors", series: ["GRANTS"] },
      { name: "Sliding Doors — 6 Panels on 3 Tracks Grants", href: "#sliding-doors", series: ["GRANTS"] },
      { name: "Sliding Doors — Corner Sliding", href: "#sliding-doors", series: ["ATIS"] },
      { name: "Swing Doors — In-Swing Single", href: "#swing-doors", series: ["ATIS", "WE+"] },
      { name: "Swing Doors — In-Swing Double", href: "#swing-doors", series: ["ATIS", "WE+"] },
      { name: "Swing Doors — Out-Swing Single", href: "#swing-doors", series: ["ATIS"] },
      { name: "Swing Doors — Out-Swing Double", href: "#swing-doors", series: ["ATIS"] },
      { name: "Folding Doors — 4 Panels", href: "#folding-doors", series: ["ATIS"] },
      { name: "Folding Doors — 6 Panels", href: "#folding-doors", series: ["ATIS"] },
      { name: "Folding Doors — 8 Panels", href: "#folding-doors", series: ["ATIS"] },
      { name: "Folding Doors — 12-16 Panels", href: "#folding-doors", series: ["ATIS"] },
      { name: "Entrance Doors — G01", href: "#entrance-doors", series: ["Giesta"] },
      { name: "Entrance Doors — G02", href: "#entrance-doors", series: ["Giesta"] },
      { name: "Entrance Doors — G03", href: "#entrance-doors", series: ["Giesta"] },
      { name: "Entrance Doors — G04", href: "#entrance-doors", series: ["Giesta"] },
      { name: "Entrance Doors — D01", href: "#entrance-doors", series: ["Giesta"] },
      { name: "Entrance Doors — D02", href: "#entrance-doors", series: ["Giesta"] },
      { name: "Entrance Doors — D03", href: "#entrance-doors", series: ["Giesta"] },
      { name: "Entrance Doors — P01", href: "#entrance-doors", series: ["Giesta"] },
      { name: "Entrance Doors — P02", href: "#entrance-doors", series: ["Giesta"] },
      { name: "Entrance Doors — P03", href: "#entrance-doors", series: ["Giesta"] },
    ],
  },
  {
    id: "interior",
    name: "Interior",
    description:
      "Enhance your interiors with our aluminium hanging and partition solutions for modern living spaces.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    count: 8,
    href: "#interior",
    designs: [
      { name: "Hanging — 2 Panels on 2 Tracks", href: "#interior-hanging", series: ["WE+"] },
      { name: "Hanging — 3 Panels on 3 Tracks", href: "#interior-hanging", series: ["WE+"] },
      { name: "Hanging — 4 Panels on 2 Tracks", href: "#interior-hanging", series: ["WE+"] },
      { name: "Hanging — In-Wall", href: "#interior-hanging", series: ["WE+"] },
      { name: "Hanging — On-Wall", href: "#interior-hanging", series: ["WE+"] },
      { name: "Partition — 2 Panels on 2 Tracks", href: "#interior-partition", series: ["WE+"] },
      { name: "Partition — 3 Panels on 3 Tracks", href: "#interior-partition", series: ["WE+"] },
      { name: "Partition — 4 Panels on 2 Tracks", href: "#interior-partition", series: ["WE+"] },
    ],
  },
  {
    id: "exterior",
    name: "Exterior",
    description:
      "Complete your exterior with our aluminium entrance, gate, fence, and facade solutions.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    count: 12,
    href: "#exterior",
    designs: [
      { name: "Entrance Sliding Doors", href: "#exterior-entrance", series: ["Giesta"] },
      { name: "Sliding Gates", href: "#exterior-gate", series: ["WE+"] },
      { name: "Swing Gates", href: "#exterior-gate", series: ["WE+"] },
      { name: "Folding Gates", href: "#exterior-gate", series: ["WE+"] },
      { name: "Fence", href: "#exterior-fence", series: ["WE+"] },
      { name: "Glass Louver", href: "#exterior-facade", series: ["WE+"] },
      { name: "Aluminum Louver", href: "#exterior-facade", series: ["WE+"] },
      { name: "Facade Curtain Wall", href: "#exterior-facade", series: ["WE+"] },
      { name: "Facade Store Front", href: "#exterior-facade", series: ["WE+"] },
    ],
  },
];

// ============ SERIES DATA ============

export interface SeriesData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  image: string;
  features: string[];
  specifications: { label: string; value: string }[];
  href: string;
}

export const seriesData: SeriesData[] = [
  {
    id: "atis",
    name: "ATIS Series",
    tagline: "Premium Performance",
    description:
      "The ATIS series offers top-tier thermal insulation and soundproofing with a sleek, modern design perfect for luxury residences and commercial spaces.",
    detailedDescription:
      "The ATIS series is Tostem's flagship range, offering superior thermal insulation and water resistance. Designed for premium residential and commercial projects, ATIS delivers Japanese precision with Indian sensibility. With its advanced multi-chamber profile design and high-performance sealing system, ATIS provides the ultimate in comfort and energy efficiency.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    features: [
      "Superior thermal insulation (U-value as low as 1.3 W/m²K)",
      "High soundproofing (up to 40dB reduction)",
      "Multi-chamber profile design",
      "Premium hardware with 10-year warranty",
      "Advanced water drainage system",
      "Wide range of design configurations",
    ],
    specifications: [
      { label: "Profile Depth", value: "70mm" },
      { label: "Max Glass Thickness", value: "32mm" },
      { label: "Water Resistance", value: "600Pa" },
      { label: "Wind Load Resistance", value: "3600Pa" },
      { label: "Air Permeability", value: "Class 4" },
      { label: "Sound Reduction", value: "Up to 40dB" },
    ],
    href: "#atis",
  },
  {
    id: "grants",
    name: "GRANTS Series",
    tagline: "Versatile Elegance",
    description:
      "GRANTS series combines versatility with elegance, offering a wide range of configurations for windows and doors that suit any architectural style.",
    detailedDescription:
      "The GRANTS series offers versatile configurations with a focus on elegant design and robust performance. Available in a wide range of window and door options, GRANTS adapts to any architectural vision. Its modular design philosophy ensures that you get the exact configuration you need without compromising on quality or aesthetics.",
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    features: [
      "Wide configuration range",
      "Architectural versatility",
      "Durable construction",
      "Elegant finish options",
      "Modular design system",
      "Cost-effective premium quality",
    ],
    specifications: [
      { label: "Profile Depth", value: "60mm" },
      { label: "Max Glass Thickness", value: "24mm" },
      { label: "Water Resistance", value: "400Pa" },
      { label: "Wind Load Resistance", value: "2400Pa" },
      { label: "Air Permeability", value: "Class 3" },
      { label: "Sound Reduction", value: "Up to 32dB" },
    ],
    href: "#grants",
  },
  {
    id: "we70",
    name: "WE-70 Series",
    tagline: "Balanced Excellence",
    description:
      "The WE-70 series strikes the perfect balance between performance and affordability, making premium aluminium windows accessible for every home.",
    detailedDescription:
      "The WE-70 series provides an excellent balance of quality and value. With reliable thermal and sound insulation, WE-70 is ideal for mid-range residential projects seeking premium Japanese quality. It brings the core benefits of Tostem engineering at a price point that makes sense for volume residential projects.",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    features: [
      "Great value for money",
      "Reliable thermal performance",
      "Easy installation process",
      "Low maintenance requirements",
      "Proven Japanese technology",
      "Ideal for residential projects",
    ],
    specifications: [
      { label: "Profile Depth", value: "70mm" },
      { label: "Max Glass Thickness", value: "26mm" },
      { label: "Water Resistance", value: "400Pa" },
      { label: "Wind Load Resistance", value: "2400Pa" },
      { label: "Air Permeability", value: "Class 3" },
      { label: "Sound Reduction", value: "Up to 35dB" },
    ],
    href: "#we70",
  },
  {
    id: "weplus",
    name: "WE+ Series",
    tagline: "Next Generation",
    description:
      "WE+ represents the next generation of aluminium window systems with enhanced energy efficiency and cutting-edge design technology.",
    detailedDescription:
      "The WE+ series represents the next generation of aluminium window systems. Featuring enhanced energy efficiency and advanced sealing technology, WE+ is designed for the modern, eco-conscious homeowner. Its innovative design incorporates the latest advances in thermal break technology and precision engineering.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    features: [
      "Enhanced energy efficiency",
      "Next-gen sealing technology",
      "Advanced thermal break design",
      "Future-ready architecture",
      "Eco-conscious engineering",
      "Superior air tightness",
    ],
    specifications: [
      { label: "Profile Depth", value: "73mm" },
      { label: "Max Glass Thickness", value: "32mm" },
      { label: "Water Resistance", value: "500Pa" },
      { label: "Wind Load Resistance", value: "3000Pa" },
      { label: "Air Permeability", value: "Class 4" },
      { label: "Sound Reduction", value: "Up to 38dB" },
    ],
    href: "#weplus",
  },
];

// ============ CATEGORIES (for product grid display) ============

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
  href: string;
}

export const categoryData: CategoryData[] = [
  {
    id: "windows",
    name: "Windows",
    description:
      "Explore our range of premium aluminium windows — sliding, casement, awning, fixed, and more.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    count: 24,
    href: "#/aluminium-windows-design-prices",
  },
  {
    id: "doors",
    name: "Doors",
    description:
      "Discover our aluminium doors — sliding, swing, folding, hanging, partition, and entrance options.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    count: 28,
    href: "#/aluminium-doors-design-prices",
  },
  {
    id: "interior",
    name: "Interior",
    description:
      "Enhance your interiors with our aluminium hanging and partition solutions for modern living spaces.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    count: 8,
    href: "#/interior",
  },
  {
    id: "exterior",
    name: "Exterior",
    description:
      "Complete your exterior with our aluminium entrance, gate, fence, and facade solutions.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    count: 12,
    href: "#/facades",
  },
];

// ============ DESIGNS DATA ============

export interface DesignData {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  href: string;
}

export const designsData: DesignData[] = [
  {
    id: "hung-awning",
    name: "Aluminium Hung & Awning Windows",
    slug: "aluminium-hung-awning-windows",
    description: "Top-hung and awning style windows offering excellent ventilation with weather protection.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    category: "Windows",
    href: "#hung-awning-windows",
  },
  {
    id: "casement-doors",
    name: "Aluminium Casement Doors",
    slug: "aluminium-casement-doors",
    description: "Elegant swing-style doors with single or double panel configurations for seamless access.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    category: "Doors",
    href: "#casement-doors",
  },
  {
    id: "casement-windows",
    name: "Aluminium Casement Windows",
    slug: "aluminium-casement-windows",
    description: "Side-hinged windows that open outward, providing maximum ventilation and unobstructed views.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    category: "Windows",
    href: "#casement-windows",
  },
  {
    id: "corner-slider-door",
    name: "Aluminium Corner Slider Door",
    slug: "aluminium-corner-slider-door",
    description: "Innovative corner-opening sliding doors that create dramatic, seamless indoor-outdoor transitions.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    category: "Doors",
    href: "#corner-slider-door",
  },
  {
    id: "fixed-window",
    name: "Aluminium Fixed Window",
    slug: "aluminium-fixed-window",
    description: "Fixed-frame windows designed to maximise natural light and provide panoramic views.",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80",
    category: "Windows",
    href: "#fixed-window",
  },
  {
    id: "bi-folding-doors",
    name: "Aluminium Bi-Folding Doors",
    slug: "aluminium-bi-folding-doors",
    description: "Multi-panel folding doors that stack neatly to one side, creating wide-open spaces.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    category: "Doors",
    href: "#bi-folding-doors",
  },
  {
    id: "french-doors",
    name: "Aluminium French Doors",
    slug: "aluminium-french-doors",
    description: "Classic double-door design with aluminium precision, offering timeless elegance and functionality.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
    category: "Doors",
    href: "#french-doors",
  },
  {
    id: "french-windows",
    name: "Aluminium French Windows",
    slug: "aluminium-french-windows",
    description: "Full-length casement windows that combine the elegance of French design with aluminium durability.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    category: "Windows",
    href: "#french-windows",
  },
  {
    id: "glass-to-glass",
    name: "Aluminium Glass-to-Glass Corner Window",
    slug: "aluminium-glass-to-glass-corner-window",
    description: "Stunning corner windows with glass-to-glass joints for uninterrupted panoramic views.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    category: "Windows",
    href: "#glass-to-glass-corner-window",
  },
  {
    id: "sliding-doors",
    name: "Aluminium Sliding Doors",
    slug: "aluminium-sliding-doors",
    description: "Smooth-gliding sliding doors with multi-track options for versatile openings.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    category: "Doors",
    href: "#sliding-doors-design",
  },
  {
    id: "sliding-windows",
    name: "Aluminium Sliding Windows",
    slug: "aluminium-sliding-windows-designs",
    description: "Horizontally sliding windows with effortless operation and excellent sealing performance.",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80",
    category: "Windows",
    href: "#sliding-windows-design",
  },
  {
    id: "slit-windows",
    name: "Aluminium Slit Windows",
    slug: "aluminium-slit-windows",
    description: "Narrow profile slit windows for modern architectural designs and controlled ventilation.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    category: "Windows",
    href: "#slit-windows",
  },
  {
    id: "tilt-slide",
    name: "Aluminium Tilt-Slide Windows",
    slug: "aluminium-tilt-slide-windows",
    description: "Dual-function windows that tilt for ventilation or slide fully for maximum opening.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
    category: "Windows",
    href: "#tilt-slide-windows",
  },
  {
    id: "ventilation-doors",
    name: "Ventilation Doors",
    slug: "ventilation-doors",
    description: "Doors with integrated ventilation features for airflow without compromising security.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    category: "Doors",
    href: "#ventilation-doors",
  },
  {
    id: "curtain-wall",
    name: "Curtain Wall Facades",
    slug: "curtain-wall-facades",
    description: "Grand facade systems for commercial buildings, creating stunning glass exteriors.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    category: "Exterior",
    href: "#curtain-wall-facades",
  },
  {
    id: "fence-exterior",
    name: "Fence Exteriors",
    slug: "fence-exteriors",
    description: "Premium aluminium fencing solutions for security and aesthetics.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    category: "Exterior",
    href: "#fence-exteriors",
  },
  {
    id: "folding-gate",
    name: "Folding Gate Exteriors",
    slug: "folding-gate-exteriors",
    description: "Space-saving folding gate solutions for entrances and driveways.",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80",
    category: "Exterior",
    href: "#folding-gate-exteriors",
  },
  {
    id: "giesta-entrance",
    name: "Giesta Entrance Doors",
    slug: "giesta-entrance-doors",
    description: "Premium entrance doors with Japanese design and superior security features.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    category: "Doors",
    href: "#giesta-entrance-doors",
  },
  {
    id: "hanging-interior",
    name: "Hanging Interiors",
    slug: "hanging-interiors",
    description: "Suspended aluminium partition systems for modern interior spaces.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
    category: "Interior",
    href: "#hanging-interiors",
  },
  {
    id: "partition-interior",
    name: "Partition Interiors",
    slug: "partition-interiors",
    description: "Elegant aluminium partition solutions for room division and space management.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    category: "Interior",
    href: "#partition-interiors",
  },
  {
    id: "sliding-gate",
    name: "Sliding Gate Exteriors",
    slug: "sliding-gate-exteriors",
    description: "Smooth-operating sliding gates for secure and stylish property entrances.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    category: "Exterior",
    href: "#sliding-gate-exteriors",
  },
  {
    id: "store-front",
    name: "Store Front Facades",
    slug: "store-front-facades",
    description: "Commercial storefront facade systems for retail and office buildings.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    category: "Exterior",
    href: "#store-front-facades",
  },
  {
    id: "swing-gate",
    name: "Swing Gate Exteriors",
    slug: "swing-gate-exteriors",
    description: "Classic swing gate designs with aluminium construction for durability and style.",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80",
    category: "Exterior",
    href: "#swing-gate-exteriors",
  },
];

// ============ FAQ DATA ============

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  {
    question: "What is a system window?",
    answer: "A system window is a complete, engineered solution where every component — from profiles and hardware to gaskets and accessories — is designed to work together as an integrated system. Unlike conventional windows where components are sourced separately and assembled on-site, system windows ensure optimal performance in thermal insulation, water resistance, air permeability, and wind load resistance because every part is precision-engineered to complement the others.",
    category: "General",
  },
  {
    question: "What is a pre-engineered window?",
    answer: "A pre-engineered window is manufactured entirely in a controlled factory environment, unlike conventional windows that are fabricated on-site. This factory-controlled process ensures consistent quality, precise specifications, and superior performance in every window. Each window undergoes over 100 quality checks before delivery, guaranteeing that what you receive is a perfect, ready-to-install product.",
    category: "General",
  },
  {
    question: "Why choose aluminium over other materials?",
    answer: "Aluminium offers several advantages over other window materials: it's incredibly strong yet lightweight, corrosion-resistant, low maintenance, and 100% recyclable. Unlike wood, it won't warp, rot, or require regular painting. Unlike uPVC, it offers superior strength-to-weight ratio, allowing for slimmer profiles and larger glass areas. Tostem's anodized aluminium finish is 5x harder than untreated aluminium, providing decades of beauty and performance.",
    category: "Materials",
  },
  {
    question: "What is an anodized finish?",
    answer: "Anodizing is an electrochemical process that converts the surface of aluminium into a durable, corrosion-resistant oxide finish. Unlike paint or powder coating that sits on the surface, an anodized finish becomes an integral part of the metal itself. This makes it 5x harder than untreated aluminium, provides superior resistance to scratching, UV fading, and corrosion, and maintains its beautiful appearance for decades.",
    category: "Materials",
  },
  {
    question: "What sound reduction rating do Tostem windows provide?",
    answer: "Tostem windows deliver up to 40dB sound reduction depending on the series and glass configuration. Our ATIS series with appropriate double glazing can achieve the highest acoustic performance. This level of sound insulation can reduce typical urban noise (70-80dB) to a quiet library level (30-40dB), creating peaceful interiors even in noisy environments.",
    category: "Performance",
  },
  {
    question: "What warranty do Tostem products carry?",
    answer: "Tostem offers a comprehensive warranty: 10 years on the aluminium profiles and anodized finish, 5 years on hardware and moving parts, and 2 years on installation workmanship. This warranty is backed by LIXIL, one of the world's largest building materials companies. Specific warranty terms may vary by product series and region.",
    category: "Warranty",
  },
  {
    question: "What is the installation process?",
    answer: "Tostem's pre-engineered windows are designed for efficient installation. Our certified installation team follows a systematic process: 1) Site measurement and assessment, 2) Custom manufacturing in our factory, 3) Delivery of ready-to-install units, 4) Professional installation by trained technicians, 5) Quality inspection and handover. The entire process typically takes 2-3 weeks from measurement to installation.",
    category: "Installation",
  },
  {
    question: "How do I maintain Tostem windows and doors?",
    answer: "Tostem windows and doors are designed for minimal maintenance. Regular cleaning with a mild detergent and soft cloth is sufficient for the frames. The anodized finish requires no painting or refinishing. Hardware should be lubricated annually with silicone-based spray. Drainage holes should be checked periodically to ensure they're clear. We recommend a professional inspection every 2-3 years for optimal performance.",
    category: "Maintenance",
  },
  {
    question: "What is the price range for Tostem windows?",
    answer: "Tostem windows are available across multiple series to suit different budgets. The WE-70 series offers excellent value for residential projects, while the ATIS series represents our premium range. Prices vary based on series, configuration, size, glass type, and finish. We recommend requesting a personalised quotation for accurate pricing based on your specific requirements.",
    category: "Pricing",
  },
  {
    question: "Can Tostem windows be customised?",
    answer: "Yes, Tostem offers extensive customisation options including: multiple series choices (ATIS, GRANTS, WE-70, WE+), various configurations (sliding, casement, awning, fixed, tilt-slide), anodized finish colours, glass types (clear, tinted, frosted, reflective), double or triple glazing options, and different hardware styles. Our design team can help you create the perfect window solution for your project.",
    category: "Customisation",
  },
  {
    question: "Are Tostem windows energy efficient?",
    answer: "Yes, Tostem windows are highly energy efficient. Our multi-chamber profile design and advanced sealing technology provide excellent thermal insulation. The ATIS series achieves U-values as low as 1.3 W/m²K with appropriate glazing. This means significant savings on heating and cooling costs. Our windows also meet international energy efficiency standards and contribute to green building ratings like LEED and IGBC.",
    category: "Performance",
  },
  {
    question: "How do Tostem windows handle Indian monsoon conditions?",
    answer: "Tostem windows are specifically tested and engineered for Indian conditions. Our water resistance ratings go up to 600Pa (ATIS series), which means they can withstand severe monsoon rain and wind-driven water. The multi-point locking system and double sealing technology create an airtight barrier, and the advanced drainage system ensures water is quickly channeled away. All products undergo rigorous water penetration testing before leaving our factory.",
    category: "Performance",
  },
  {
    question: "What certifications do Tostem products have?",
    answer: "Tostem products carry multiple international certifications including JIS (Japanese Industrial Standards), ISO 9001 (Quality Management), ISO 14001 (Environmental Management), and various Indian standards. Our products are tested for thermal performance, acoustic insulation, water resistance, air permeability, and wind load resistance at internationally accredited laboratories.",
    category: "Quality",
  },
  {
    question: "How long does it take to manufacture and deliver?",
    answer: "The typical timeline from order confirmation to delivery is 2-3 weeks for standard configurations. Custom orders or large project quantities may take 3-4 weeks. This includes manufacturing in our controlled factory environment, quality checks, and logistics. Our project management team provides regular updates throughout the process.",
    category: "Installation",
  },
  {
    question: "Does Tostem provide after-sales service?",
    answer: "Yes, Tostem provides comprehensive after-sales support including: warranty service for any manufacturing defects, scheduled maintenance inspections, emergency repair service, spare parts availability, and technical support. Our service network covers 100+ cities across India through our channel partners. We're committed to ensuring your Tostem windows and doors perform perfectly for years to come.",
    category: "Service",
  },
];

// ============ BLOG POSTS ============

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "benefits-aluminium-windows",
    title: "The Complete Guide to Benefits of Aluminium Windows",
    excerpt: "Discover why aluminium windows are the preferred choice for modern homes and commercial buildings. From durability to design flexibility, learn about the many advantages of aluminium window systems.",
    category: "Windows",
    date: "2024-12-15",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    href: "#benefits-aluminium-windows",
  },
  {
    id: "soundproofing-guide",
    title: "Soundproofing Your Home: A Complete Guide to Soundproof Windows",
    excerpt: "Living in a noisy city? Learn how soundproof windows work, what to look for in acoustic performance, and how Tostem's technology delivers up to 40dB noise reduction for peaceful living.",
    category: "Guide",
    date: "2024-11-28",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    href: "#soundproofing-guide",
  },
  {
    id: "choosing-right-window",
    title: "How to Choose the Right Window for Your Home",
    excerpt: "With so many window types and configurations available, selecting the right one can be overwhelming. This guide walks you through the key considerations for making the best choice for your space.",
    category: "Guide",
    date: "2024-11-10",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80",
    href: "#choosing-right-window",
  },
  {
    id: "japanese-innovation-homes",
    title: "Japanese Innovation in Indian Homes: The Tostem Story",
    excerpt: "How Tostem is bringing the Japanese philosophy of monozukuri to Indian homes, transforming the way India experiences windows and doors with precision engineering and quality craftsmanship.",
    category: "Innovation",
    date: "2024-10-25",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    href: "#japanese-innovation-homes",
  },
  {
    id: "pre-engineered-vs-conventional",
    title: "Pre-Engineered vs Conventional Windows: Why Factory-Made Wins",
    excerpt: "Understand the fundamental differences between pre-engineered system windows and conventionally fabricated windows, and why factory-controlled manufacturing delivers consistently superior results.",
    category: "Education",
    date: "2024-10-08",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
    href: "#pre-engineered-vs-conventional",
  },
  {
    id: "energy-efficient-windows",
    title: "Energy Efficient Windows: Saving Costs and the Planet",
    excerpt: "Learn how energy-efficient windows can significantly reduce your heating and cooling costs while contributing to a more sustainable future. Discover the technology behind Tostem's thermal insulation.",
    category: "Energy",
    date: "2024-09-20",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    href: "#energy-efficient-windows",
  },
];

// ============ TESTIMONIALS ============

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  project: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Sharma",
    role: "Principal Architect",
    location: "Delhi",
    text: "Tostem windows transformed our residential project. The quality and finish are unmatched — Japanese engineering truly makes a difference in aluminium windows. The pre-engineered system saved us significant time during installation.",
    rating: 5,
    project: "Luxury Villa Complex, Vasant Kunj",
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Homeowner",
    location: "Mumbai",
    text: "The sound insulation is incredible. Living near a busy road in Andheri, Tostem windows have made our home peaceful and quiet. The anodized finish still looks brand new after three years. Highly recommended!",
    rating: 5,
    project: "Residential Apartment, Andheri West",
  },
  {
    id: "3",
    name: "Vikram Singh",
    role: "Managing Director, BuildRight Developers",
    location: "Gurugram",
    text: "As a builder, I need reliable partners. Tostem delivers consistent quality every time. Their pre-engineered system saves us time and ensures perfection across all our projects. We've used Tostem in over 15 projects now.",
    rating: 5,
    project: "Multiple Residential Projects, Gurugram",
  },
  {
    id: "4",
    name: "Ananya Desai",
    role: "Interior Designer",
    location: "Bengaluru",
    text: "The design versatility of Tostem's GRANTS series allows me to specify exactly what my clients need. The slim profiles and elegant finishes complement any interior style. My clients are always delighted with the result.",
    rating: 5,
    project: "Premium Residences, Whitefield",
  },
  {
    id: "5",
    name: "Dr. Suresh Menon",
    role: "Homeowner",
    location: "Chennai",
    text: "We renovated our entire home with Tostem ATIS series windows and the difference is remarkable. The thermal insulation keeps our home cooler, reducing AC costs significantly. The monsoon performance is outstanding — zero water leakage.",
    rating: 5,
    project: "Independent House, Adyar",
  },
  {
    id: "6",
    name: "Kavitha Reddy",
    role: "Project Manager, Skyline Constructions",
    location: "Hyderabad",
    text: "Tostem's project management team made our 200-unit residential complex a breeze. From measurement to installation, everything was handled professionally. The consistency across all 200 units is a testament to their factory-controlled quality.",
    rating: 4,
    project: "Skyline Heights, Gachibowli",
  },
  {
    id: "7",
    name: "Arjun Kapoor",
    role: "Architect & Urban Planner",
    location: "Pune",
    text: "I've been specifying Tostem windows for commercial projects for the past 5 years. Their curtain wall and storefront systems meet international standards, and the technical support team is always available to help with complex designs.",
    rating: 5,
    project: "IT Park, Hinjewadi",
  },
  {
    id: "8",
    name: "Meera Krishnan",
    role: "Homeowner",
    location: "Kochi",
    text: "We chose Tostem's Giesta entrance door for its security features and stunning design. Every guest who visits compliments our front door. The multi-point locking gives us peace of mind, and the finish withstands Kerala's humid climate perfectly.",
    rating: 5,
    project: "Villa, Marine Drive",
  },
];

// ============ GALLERY ============

export interface GalleryItem {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Interior" | "Exterior";
  location: string;
  image: string;
  products: string[];
}

export const galleryData: GalleryItem[] = [
  {
    id: "1",
    title: "Luxury Villa with Panoramic Windows",
    category: "Residential",
    location: "Gurugram, Haryana",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    products: ["ATIS Sliding Windows", "ATIS Fixed Windows"],
  },
  {
    id: "2",
    title: "Modern Office Complex Facade",
    category: "Commercial",
    location: "Bengaluru, Karnataka",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    products: ["Curtain Wall Facade", "Store Front System"],
  },
  {
    id: "3",
    title: "Contemporary Living Room Interior",
    category: "Interior",
    location: "Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    products: ["WE+ Partition System", "Hanging Interior"],
  },
  {
    id: "4",
    title: "Elegant Entrance with Giesta Door",
    category: "Exterior",
    location: "Delhi, NCR",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    products: ["Giesta Entrance Door", "Sliding Gate"],
  },
  {
    id: "5",
    title: "Seaside Villa with Weather-Resistant Windows",
    category: "Residential",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    products: ["ATIS Casement Windows", "ATIS Awning Windows"],
  },
  {
    id: "6",
    title: "Corporate Headquarters Glazing",
    category: "Commercial",
    location: "Hyderabad, Telangana",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    products: ["Curtain Wall", "ATIS Fixed Windows"],
  },
  {
    id: "7",
    title: "Open-Plan Kitchen with Aluminium Partition",
    category: "Interior",
    location: "Pune, Maharashtra",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    products: ["WE+ Partition", "Sliding Interior Doors"],
  },
  {
    id: "8",
    title: "Premium Villa Entrance and Fencing",
    category: "Exterior",
    location: "Chennai, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    products: ["Swing Gate", "Aluminium Fence"],
  },
  {
    id: "9",
    title: "Penthouse with Corner Windows",
    category: "Residential",
    location: "Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    products: ["ATIS Corner Fixed", "ATIS Sliding Doors"],
  },
  {
    id: "10",
    title: "Retail Showfront Design",
    category: "Commercial",
    location: "Delhi, NCR",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    products: ["Store Front Facade", "WE+ Entrance Door"],
  },
  {
    id: "11",
    title: "Minimalist Bedroom with Sliding Windows",
    category: "Interior",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    products: ["WE-70 Sliding Windows", "WE+ Hanging Door"],
  },
  {
    id: "12",
    title: "Hill Station Retreat with Insulated Windows",
    category: "Residential",
    location: "Shimla, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    products: ["ATIS Tilt-Slide Windows", "ATIS Fixed Windows"],
  },
];

// ============ TADA AWARDS ============

export interface TadaAward {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image: string;
}

export const tadaAwards: TadaAward[] = [
  {
    id: "1",
    title: "Best Aluminium Window System",
    year: "2024",
    category: "Product Innovation",
    description: "Recognised for the ATIS series' innovative multi-chamber profile design and superior thermal performance.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    id: "2",
    title: "Excellence in Sustainable Building Materials",
    year: "2023",
    category: "Sustainability",
    description: "Awarded for Tostem's commitment to energy-efficient window solutions and sustainable manufacturing processes.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    id: "3",
    title: "Best Window & Door Brand — India",
    year: "2023",
    category: "Brand Excellence",
    description: "Voted India's best aluminium window and door brand by the TADA architecture community.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
  },
  {
    id: "4",
    title: "Innovation in Acoustic Performance",
    year: "2022",
    category: "Technology",
    description: "Honoured for breakthrough acoustic insulation technology delivering up to 40dB sound reduction.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
  },
  {
    id: "5",
    title: "Design Excellence Award",
    year: "2022",
    category: "Design",
    description: "Recognised for the Giesta entrance door series' innovative blend of Japanese aesthetics and Indian design sensibility.",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80",
  },
  {
    id: "6",
    title: "Green Building Product of the Year",
    year: "2021",
    category: "Sustainability",
    description: "Awarded for contributing to green building standards with energy-efficient aluminium window systems.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
  },
];

// ============ GLOSSARY TERMS ============

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  { term: "Anodized Finish", definition: "An electrochemical process that converts aluminium surface into a durable, corrosion-resistant oxide finish that becomes integral to the metal.", category: "Finish" },
  { term: "Casement Window", definition: "A window attached to its frame by one or more hinges at the side, opening outward like a door.", category: "Window Type" },
  { term: "Double Glazing", definition: "Two panes of glass separated by a spacer and sealed, creating an insulating air space that improves thermal and acoustic performance.", category: "Glass" },
  { term: "Fenestration", definition: "The arrangement, proportion, and design of windows and doors in a building; also refers to the industry of window and door manufacturing.", category: "General" },
  { term: "Frame", definition: "The fixed part of a window or door that is installed into the wall opening and houses the operating sash or panel.", category: "Component" },
  { term: "Gasket", definition: "A flexible seal, typically made of rubber or silicone, used to create a weather-tight seal between the frame and sash.", category: "Component" },
  { term: "Heat Transfer Coefficient (U-Value)", definition: "A measure of how well a window prevents heat from escaping. Lower U-values indicate better thermal insulation.", category: "Performance" },
  { term: "Mullion", definition: "A vertical structural element that divides adjacent window or door units, providing support and aesthetic division.", category: "Component" },
  { term: "Multi-Point Lock", definition: "A locking system that engages the sash at multiple points around the perimeter for superior security and sealing.", category: "Hardware" },
  { term: "Pre-Engineered Window", definition: "A window system manufactured entirely in a factory environment with controlled quality, delivered ready-to-install.", category: "General" },
  { term: "Profile", definition: "The aluminium extrusion that forms the frame and sash members of a window or door system.", category: "Component" },
  { term: "Sash", definition: "The movable part of a window that holds the glass, operating within the fixed frame.", category: "Component" },
  { term: "Sliding Window", definition: "A window with sashes that slide horizontally on tracks, ideal for spaces where outward opening is restricted.", category: "Window Type" },
  { term: "Sound Transmission Class (STC)", definition: "A rating of how well a window attenuates airborne sound. Higher STC values indicate better sound insulation.", category: "Performance" },
  { term: "System Window", definition: "A complete, engineered window solution where all components are designed to work together as an integrated system.", category: "General" },
  { term: "Thermal Break", definition: "A material with low thermal conductivity placed between interior and exterior aluminium profiles to reduce heat transfer.", category: "Component" },
  { term: "Tilt-Slide Window", definition: "A dual-function window that can tilt inward at the top for ventilation or slide horizontally for full opening.", category: "Window Type" },
  { term: "Awning Window", definition: "A window hinged at the top that opens outward from the bottom, providing ventilation even during light rain.", category: "Window Type" },
  { term: "Water Penetration Resistance", definition: "A measure of a window's ability to prevent water ingress under wind-driven rain conditions, measured in Pascals (Pa).", category: "Performance" },
  { term: "Wind Load Resistance", definition: "The maximum wind pressure a window can withstand without permanent deformation or failure, measured in Pascals (Pa).", category: "Performance" },
  { term: "Friction Stay", definition: "A type of hinge for casement and awning windows that uses friction to hold the window open at any position.", category: "Hardware" },
  { term: "Mullion", definition: "A vertical or horizontal bar between panes of glass in a window or door system.", category: "Component" },
  { term: "Transom", definition: "A horizontal crosspiece across a window or above a door, often separating a door from a fanlight window above.", category: "Component" },
  { term: "Low-E Glass", definition: "Low-emissivity glass with a microscopic coating that reflects heat while allowing light to pass through, improving energy efficiency.", category: "Glass" },
];

// ============ CAREER DATA ============

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const careerPositions: CareerPosition[] = [
  {
    id: "1",
    title: "Sales Manager — North India",
    department: "Sales",
    location: "Delhi NCR",
    type: "Full-time",
    description: "Lead our sales expansion in North India, managing channel partners and driving revenue growth.",
  },
  {
    id: "2",
    title: "Installation Technician",
    department: "Operations",
    location: "Mumbai",
    type: "Full-time",
    description: "Join our installation team to deliver perfect window and door installations across residential and commercial projects.",
  },
  {
    id: "3",
    title: "Design Engineer",
    department: "Engineering",
    location: "Gurugram",
    type: "Full-time",
    description: "Work on innovative aluminium window and door system designs using CAD/CAM tools and Japanese engineering principles.",
  },
  {
    id: "4",
    title: "Project Coordinator",
    department: "Project Management",
    location: "Bengaluru",
    type: "Full-time",
    description: "Coordinate end-to-end project delivery from measurement to installation for large commercial projects.",
  },
];

// ============ CHANNEL PARTNERS ============

export interface ChannelPartner {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
}

export const channelPartners: ChannelPartner[] = [
  { id: "1", name: "Tostem Delhi Centre", city: "New Delhi", state: "Delhi", type: "Premium Partner" },
  { id: "2", name: "Window Solutions Mumbai", city: "Mumbai", state: "Maharashtra", type: "Gold Partner" },
  { id: "3", name: "BuildTech Bengaluru", city: "Bengaluru", state: "Karnataka", type: "Premium Partner" },
  { id: "4", name: "Tostem Hyderabad Hub", city: "Hyderabad", state: "Telangana", type: "Gold Partner" },
  { id: "5", name: "Metro Windows Chennai", city: "Chennai", state: "Tamil Nadu", type: "Silver Partner" },
  { id: "6", name: "Pacific Interiors Pune", city: "Pune", state: "Maharashtra", type: "Gold Partner" },
  { id: "7", name: "Tostem Kolkata Centre", city: "Kolkata", state: "West Bengal", type: "Silver Partner" },
  { id: "8", name: "Hillview Windows Chandigarh", city: "Chandigarh", state: "Punjab", type: "Silver Partner" },
];

// ============ FOOTER ============

export const footerQuickLinks = [
  { label: "About Tostem", href: "#about" },
  { label: "Why Tostem", href: "#why-tostem" },
  { label: "Our Products", href: "#products" },
  { label: "Tostem Experience", href: "#experience" },
  { label: "Knowledge", href: "#knowledge" },
  { label: "Reach Us", href: "#reach-us" },
];

export const footerProductLinks = [
  { label: "Windows", href: "#windows" },
  { label: "Doors", href: "#doors" },
  { label: "Interior", href: "#interior" },
  { label: "Exterior", href: "#exterior" },
  { label: "ATIS Series", href: "#atis" },
  { label: "GRANTS Series", href: "#grants" },
  { label: "WE-70 Series", href: "#we70" },
  { label: "WE+ Series", href: "#weplus" },
];

export const footerContact = {
  address:
    "Tostem India, LIXIL Window Systems India Pvt. Ltd., 4th Floor, Tower B, Building No. 5, Cyber Hub, Gurugram, Haryana 122002",
  phone: "+91 1800-123-4567",
  email: "info@tostemindia.com",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM",
};

export const footerSocial = [
  { label: "Facebook", href: "https://facebook.com/tostemindia", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com/tostemindia", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/tostemindia", icon: "youtube" },
  { label: "LinkedIn", href: "https://linkedin.com/company/tostemindia", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/tostemindia", icon: "twitter" },
];

// ============ SITE METADATA ============

export const siteMetadata = {
  title: "Leading Aluminium Windows and Doors Manufacturer | Tostem India",
  description:
    "Tostem India is the world's leading manufacturer and supplier of aluminium windows and doors in India. Browse our premium Japanese products for durable, energy-efficient solutions.",
  tagline: "Japanese Innovation in Window Design",
  phone: "+91 1800-123-4567",
  brochureUrl: "#brochure",
  enquiryUrl: "#quotation",
};

// ============ PAGE REGISTRY (60+ pages) ============

export interface PageRegistryItem {
  slug: string;
  title: string;
  type: string;
  description: string;
  breadcrumb: string[];
  url: string;
}

export const pageRegistry: PageRegistryItem[] = [
  // About Tostem
  { slug: 'about-tostem', title: 'About Tostem', type: 'about', description: 'Tostem windows manufactures high-quality aluminium system windows, doors and other building materials across India and the globe.', breadcrumb: ['About Tostem'], url: 'https://www.tostemindia.com/about-tostem/' },
  { slug: 'directors-message', title: "Leader's Message", type: 'about', description: 'Message from the Managing Director of LIXIL Window Systems India.', breadcrumb: ['About Tostem'], url: 'https://www.tostemindia.com/directors-message/' },
  { slug: 'our-purpose-and-behaviour', title: 'Our Purpose And Behaviour', type: 'about', description: 'Discover Tostem\'s purpose and the behaviours that drive our commitment to excellence.', breadcrumb: ['About Tostem'], url: 'https://www.tostemindia.com/our-purpose-and-behaviour' },
  { slug: 'lixil-window-system', title: 'LIXIL Window System', type: 'about', description: 'LIXIL is Japan\'s largest building materials and housing company. Tostem is one of LIXIL\'s flagship brands.', breadcrumb: ['About Tostem'], url: 'https://www.tostemindia.com/lixil-window-system/' },
  { slug: 'awards', title: 'Awards', type: 'about', description: 'Tostem\'s commitment to excellence has been recognized with multiple industry awards and accolades.', breadcrumb: ['About Tostem'], url: 'https://www.tostemindia.com/awards' },

  // Why Tostem
  { slug: 'total-housing-solutions', title: 'Total Housing Solutions', type: 'why-tostem', description: 'Tostem provides total housing solutions with Japanese precision and Indian sensibility.', breadcrumb: ['Why Tostem'], url: 'https://www.tostemindia.com/total-housing-solutions/' },
  { slug: 'japanese-innovation', title: 'Japanese Innovation', type: 'why-tostem', description: 'Tostem is the leading Japanese brand for global housing and building materials, providing excellence of design, high volume manufacturing, and cost control.', breadcrumb: ['Why Tostem'], url: 'https://www.tostemindia.com/japanese-innovation/' },
  { slug: 'pre-engineered-system-windows', title: 'Pre Engineered System Windows', type: 'why-tostem', description: 'Learn about pre-engineered system windows and how they deliver superior quality compared to on-site fabrication.', breadcrumb: ['Why Tostem'], url: 'https://www.tostemindia.com/pre-engineered-system-windows/' },
  { slug: 'quality-assurance-and-services', title: 'Quality Assurance and Testing', type: 'why-tostem', description: 'Every Tostem product goes through over 100 quality checks before it reaches your home.', breadcrumb: ['Why Tostem'], url: 'https://www.tostemindia.com/quality-assurance-and-services/' },
  { slug: 'soundproof-window-door-performance', title: 'TOSTEM Product Performance', type: 'why-tostem', description: 'Tostem windows deliver up to 40dB sound reduction, creating peaceful interiors even in noisy environments.', breadcrumb: ['Why Tostem'], url: 'https://www.tostemindia.com/soundproof-window-door-performance' },
  { slug: 'anodized-aluminum-windows-surface-colour-protection', title: 'Surface & Colour Protection', type: 'why-tostem', description: 'Tostem\'s anodized finish is 5x harder than untreated aluminium, providing superior resistance to corrosion, scratching, and UV fading.', breadcrumb: ['Why Tostem'], url: 'https://www.tostemindia.com/anodized-aluminum-windows-surface-colour-protection' },
  { slug: 'anodised-aluminium-windows-doors-colour', title: 'Anodised Aluminium Window', type: 'why-tostem', description: 'Discover the beauty and durability of anodised aluminium windows and doors from Tostem.', breadcrumb: ['Why Tostem'], url: 'https://www.tostemindia.com/anodised-aluminium-windows-doors-colour/' },
  { slug: 'soundproof-insulated-doors-and-windows', title: 'Sound Insulated Doors and Windows', type: 'why-tostem', description: 'Advanced multi-point locking and double sealing systems deliver exceptional sound insulation for peaceful, quiet interiors.', breadcrumb: ['Why Tostem'], url: 'https://www.tostemindia.com/soundproof-insulated-doors-and-windows/' },

  // Product Categories
  { slug: 'aluminium-doors-design-prices', title: 'Aluminium Doors', type: 'category', description: 'Discover Tostem\'s premium range of aluminium doors — from elegant sliding doors to grand folding systems.', breadcrumb: ['Our Product', 'Aluminium Doors'], url: 'https://www.tostemindia.com/categories/aluminium-doors-design-prices/' },
  { slug: 'aluminium-windows-design-prices', title: 'Aluminium Windows', type: 'category', description: 'Explore Tostem\'s premium range of aluminium windows — from classic sliding to contemporary tilt-and-slide.', breadcrumb: ['Our Product', 'Aluminium Windows'], url: 'https://www.tostemindia.com/categories/aluminium-windows-design-prices/' },
  { slug: 'steel-entrance-doors', title: 'Steel Entrance Doors', type: 'category', description: 'Tostem\'s GIESTA steel entrance doors combine Japanese design excellence with superior security.', breadcrumb: ['Our Product', 'Steel Entrance Doors'], url: 'https://www.tostemindia.com/categories/steel-entrance-doors/' },
  { slug: 'airflow-system', title: 'Airflow System', type: 'category', description: 'Tostem\'s airflow solutions ensure optimal ventilation without compromising on security or aesthetics.', breadcrumb: ['Our Product', 'Airflow System'], url: 'https://www.tostemindia.com/categories/airflow-system/' },
  { slug: 'facades', title: 'Façades', type: 'category', description: 'Tostem\'s aluminium façade systems create stunning glass exteriors for commercial and residential buildings.', breadcrumb: ['Our Product', 'Façades'], url: 'https://www.tostemindia.com/categories/aluminium-building-architectural-facades/' },
  { slug: 'interior', title: 'Interior', type: 'category', description: 'Enhance your interiors with Tostem\'s aluminium hanging and swing door solutions.', breadcrumb: ['Our Product', 'Interior'], url: 'https://www.tostemindia.com/categories/aluminium-interior-door/' },

  // Product Designs - Doors
  { slug: 'aluminium-sliding-doors', title: 'Aluminium Sliding Doors', type: 'design', description: 'Smooth-gliding sliding doors with multi-track options for versatile openings.', breadcrumb: ['Our Product', 'Aluminium Doors', 'Sliding Doors'], url: 'https://www.tostemindia.com/designs/aluminium-sliding-doors/' },
  { slug: 'aluminium-casement-doors', title: 'Aluminium Casement Doors', type: 'design', description: 'Elegant swing-style doors with single or double panel configurations.', breadcrumb: ['Our Product', 'Aluminium Doors', 'Casement Doors'], url: 'https://www.tostemindia.com/designs/aluminium-casement-doors/' },
  { slug: 'aluminium-french-doors', title: 'Aluminium French Doors', type: 'design', description: 'Classic double-door design with aluminium precision.', breadcrumb: ['Our Product', 'Aluminium Doors', 'French Doors'], url: 'https://www.tostemindia.com/designs/aluminium-french-doors/' },
  { slug: 'aluminium-bi-folding-doors', title: 'Aluminium Bi-Folding Doors', type: 'design', description: 'Multi-panel folding doors that stack neatly to one side, creating wide-open spaces.', breadcrumb: ['Our Product', 'Aluminium Doors', 'Bi-Folding Doors'], url: 'https://www.tostemindia.com/designs/aluminium-bi-folding-doors/' },
  { slug: 'aluminium-corner-slider-door', title: 'Aluminium Corner Slider Door', type: 'design', description: 'Innovative corner-opening sliding doors for seamless indoor-outdoor transitions.', breadcrumb: ['Our Product', 'Aluminium Doors', 'Corner Slider'], url: 'https://www.tostemindia.com/designs/aluminium-corner-slider-door/' },
  { slug: 'aluminium-slide-fold-doors', title: 'Aluminium Slide and Fold Doors', type: 'design', description: 'Slide and fold doors offering flexibility and smooth operation.', breadcrumb: ['Our Product', 'Aluminium Doors', 'Slide and Fold'], url: 'https://www.tostemindia.com/designs/aluminium-slide-fold-doors/' },
  { slug: 'ventilation-doors', title: 'Ventilation Doors', type: 'design', description: 'Doors with integrated ventilation features for airflow without compromising security.', breadcrumb: ['Our Product', 'Ventilation Doors'], url: 'https://www.tostemindia.com/designs/ventilation-doors/' },

  // Product Designs - Windows
  { slug: 'aluminium-sliding-windows-designs', title: 'Aluminium Sliding Windows', type: 'design', description: 'Horizontally sliding windows with effortless operation and excellent sealing performance.', breadcrumb: ['Our Product', 'Aluminium Windows', 'Sliding Windows'], url: 'https://www.tostemindia.com/designs/aluminium-sliding-windows-designs/' },
  { slug: 'aluminium-casement-windows', title: 'Aluminium Casement Windows', type: 'design', description: 'Side-hinged windows providing maximum ventilation and unobstructed views.', breadcrumb: ['Our Product', 'Aluminium Windows', 'Casement Windows'], url: 'https://www.tostemindia.com/designs/aluminium-casement-windows/' },
  { slug: 'aluminium-hung-awning-windows', title: 'Aluminium Awning Windows', type: 'design', description: 'Top-hung and awning style windows offering excellent ventilation with weather protection.', breadcrumb: ['Our Product', 'Aluminium Windows', 'Awning Windows'], url: 'https://www.tostemindia.com/designs/aluminium-hung-awning-windows/' },
  { slug: 'aluminium-fixed-window', title: 'Aluminium Fixed Window', type: 'design', description: 'Fixed-frame windows designed to maximise natural light and provide panoramic views.', breadcrumb: ['Our Product', 'Aluminium Windows', 'Fixed Windows'], url: 'https://www.tostemindia.com/designs/aluminium-fixed-window/' },
  { slug: 'aluminium-glass-to-glass-corner-window', title: 'Glass To Glass Corner Windows', type: 'design', description: 'Stunning corner windows with glass-to-glass joints for uninterrupted panoramic views.', breadcrumb: ['Our Product', 'Aluminium Windows', 'Glass to Glass'], url: 'https://www.tostemindia.com/designs/aluminium-glass-to-glass-corner-window/' },
  { slug: 'aluminium-french-windows', title: 'Aluminium French Windows', type: 'design', description: 'Full-length casement windows combining French design elegance with aluminium durability.', breadcrumb: ['Our Product', 'Aluminium Windows', 'French Windows'], url: 'https://www.tostemindia.com/designs/aluminium-french-windows/' },
  { slug: 'aluminium-tilt-slide-windows', title: 'Aluminium Tilt and Slide Windows', type: 'design', description: 'Dual-function windows that tilt for ventilation or slide fully for maximum opening.', breadcrumb: ['Our Product', 'Aluminium Windows', 'Tilt and Slide'], url: 'https://www.tostemindia.com/designs/aluminium-tilt-slide-windows/' },
  { slug: 'aluminium-slit-windows', title: 'Aluminium Slit Windows', type: 'design', description: 'Narrow profile slit windows for modern architectural designs and controlled ventilation.', breadcrumb: ['Our Product', 'Aluminium Windows', 'Slit Windows'], url: 'https://www.tostemindia.com/designs/aluminium-slit-windows/' },
  { slug: 'aluminium-vertical-sliding-windows', title: 'Aluminium Vertical Sliding Windows', type: 'design', description: 'Vertically sliding windows combining classic style with modern performance.', breadcrumb: ['Our Product', 'Aluminium Windows', 'Vertical Sliding'], url: 'https://www.tostemindia.com/designs/aluminium-vertical-sliding-windows/' },

  // Steel Entrance / Giesta
  { slug: 'giesta-doors', title: 'Giesta Doors', type: 'design', description: 'Premium GIESTA entrance doors with Japanese design and superior security features.', breadcrumb: ['Our Product', 'Steel Entrance Doors', 'Giesta Doors'], url: 'https://www.tostemindia.com/designs/giesta-doors/' },
  { slug: 'giesta-ventilation-doors', title: 'Giesta with Ventilation', type: 'design', description: 'GIESTA entrance doors with integrated ventilation for airflow and security.', breadcrumb: ['Our Product', 'Steel Entrance Doors', 'Giesta Ventilation'], url: 'https://www.tostemindia.com/designs/giesta-ventilation-doors/' },

  // Airflow
  { slug: 'ventilation-slots', title: 'Ventilation Slot', type: 'design', description: 'Ventilation slots for controlled airflow without compromising on security or weather protection.', breadcrumb: ['Our Product', 'Airflow System', 'Ventilation Slot'], url: 'https://www.tostemindia.com/designs/ventilation-slots/' },
  { slug: 'aluminum-louver', title: 'Aluminium Louvers', type: 'design', description: 'Premium aluminium louvers for effective ventilation and modern aesthetics.', breadcrumb: ['Our Product', 'Airflow System', 'Aluminium Louvers'], url: 'https://www.tostemindia.com/products/aluminum-louver/' },
  { slug: 'glass-louver', title: 'Glass Louvers', type: 'design', description: 'Elegant glass louvers combining transparency with ventilation control.', breadcrumb: ['Our Product', 'Airflow System', 'Glass Louvers'], url: 'https://www.tostemindia.com/products/glass-louver/' },

  // Facades
  { slug: 'facade-curtain-wall', title: 'Curtain Wall Facades', type: 'design', description: 'Grand facade systems for commercial buildings, creating stunning glass exteriors.', breadcrumb: ['Our Product', 'Façades', 'Curtain Wall'], url: 'https://www.tostemindia.com/products/facade-curtain-wall' },
  { slug: 'facade-store-front', title: 'Store Front Facades', type: 'design', description: 'Commercial storefront facade systems for retail and office buildings.', breadcrumb: ['Our Product', 'Façades', 'Store Front'], url: 'https://www.tostemindia.com/products/facade-store-front/' },

  // Interior
  { slug: 'hanging-door', title: 'Hanging Doors', type: 'design', description: 'Suspended aluminium door systems for modern interior spaces.', breadcrumb: ['Our Product', 'Interior', 'Hanging Doors'], url: 'https://www.tostemindia.com/designs/hanging-door/' },
  { slug: 'swing-door', title: 'Swing Doors', type: 'design', description: 'Elegant swing doors for interior applications with smooth operation.', breadcrumb: ['Our Product', 'Interior', 'Swing Doors'], url: 'https://www.tostemindia.com/designs/swing-door/' },
  { slug: 'fixed-divider', title: 'Fixed Divider', type: 'design', description: 'Fixed aluminium dividers for room separation and space management.', breadcrumb: ['Our Product', 'Interior', 'Fixed Divider'], url: 'https://www.tostemindia.com/designs/fixed-divider/' },

  // Series
  { slug: 'grants-windows-doors-series', title: 'Grants Series', type: 'series', description: 'Break The Norm With Fine Line Of Design & Function. The Grants series offers versatile configurations with elegant design.', breadcrumb: ['Our Product', 'Grants Series'], url: 'https://www.tostemindia.com/series/grants-windows-doors-series/' },
  { slug: 'atis-windows-doors-series', title: 'ATIS Series', type: 'series', description: 'Framing The Beauty Of Living. The ATIS series is Tostem\'s flagship range with superior thermal insulation.', breadcrumb: ['Our Product', 'ATIS Series'], url: 'https://www.tostemindia.com/series/atis-windows-doors-series/' },
  { slug: 'we-plus-windows-doors-series', title: 'We Plus Series', type: 'series', description: 'Performance Oriented Design. The WE+ series represents next-generation aluminium window systems.', breadcrumb: ['Our Product', 'We Plus Series'], url: 'https://www.tostemindia.com/series/we-plus-windows-doors-series/' },
  { slug: 'we-70-windows-doors-series', title: 'We 70 Series', type: 'series', description: 'Design Meets Performance & Reliability. The WE-70 series provides excellent balance of quality and value.', breadcrumb: ['Our Product', 'We 70 Series'], url: 'https://www.tostemindia.com/series/we-70-windows-doors-series/' },

  // Driving Experience
  { slug: 'e-catalogue', title: 'E-Catalogue', type: 'ecatalogue', description: 'Browse and download Tostem product catalogues and brochures', breadcrumb: ['Driving Experience'], url: 'https://www.tostemindia.com/e-catalogue/' },
  { slug: 'download-center', title: 'Download Center', type: 'download-center', description: 'Access our complete library of brochures, technical specs, installation guides, and warranty documents.', breadcrumb: ['Resources', 'Download Center'], url: 'https://www.tostemindia.com/download-center/' },
  { slug: 'modern-window-door-design', title: 'Modern Window & Door Design', type: 'experience', description: 'Explore modern window and door design ideas for contemporary homes and spaces.', breadcrumb: ['Driving Experience', 'Modern Design'], url: 'https://www.tostemindia.com/modern-window-door-design/' },
  { slug: 'gallery', title: 'Gallery', type: 'experience-gallery', description: 'Browse our collection of residential, commercial, interior, and exterior projects showcasing Tostem solutions.', breadcrumb: ['Driving Experience', 'Gallery'], url: 'https://www.tostemindia.com/gallery/' },

  // TADA Awards
  { slug: 'tada-2025', title: 'TADA-2025', type: 'tada', description: 'The 2025 TADA Awards recognize the finest architecture and design projects featuring Tostem products.', breadcrumb: ['TADA', '2025'], url: 'https://www.tostemindia.com/tada-category/tada-2025/' },
  { slug: 'tada-2024', title: 'TADA-2024', type: 'tada', description: 'The 2024 TADA Awards celebrated outstanding residential and commercial projects.', breadcrumb: ['TADA', '2024'], url: 'https://www.tostemindia.com/tada-category/tada-2024/' },
  { slug: 'tada-2023', title: 'TADA-2023', type: 'tada', description: 'The 2023 TADA Awards honored the most innovative architectural designs using Tostem products.', breadcrumb: ['TADA', '2023'], url: 'https://www.tostemindia.com/tada-category/tada-2023/' },

  // Knowledge Experience
  { slug: 'what-is-pre-engineered-system-window', title: 'Pre Engineered System Windows', type: 'knowledge', description: 'Learn what pre-engineered system windows are and why they are superior to conventional windows.', breadcrumb: ['Knowledge', 'Pre-Engineered'], url: 'https://www.tostemindia.com/what-is-pre-engineered-system-window/' },
  { slug: 'planning-a-system-window', title: 'Planning a System Window', type: 'knowledge', description: 'Guide to planning the right system window for your home or project.', breadcrumb: ['Knowledge', 'Planning'], url: 'https://www.tostemindia.com/planning-a-system-window/' },
  { slug: 'system-aluminum-windows', title: 'System Aluminum Windows', type: 'knowledge', description: 'Understanding system aluminum windows and their advantages over conventional alternatives.', breadcrumb: ['Knowledge', 'System Aluminum'], url: 'https://www.tostemindia.com/system-aluminum-windows/' },
  { slug: 'blog', title: 'Blog', type: 'blog', description: 'Expert insights, guides, and the latest trends in aluminium windows, doors, and modern architecture.', breadcrumb: ['Knowledge', 'Blog'], url: 'https://www.tostemindia.com/blog/' },
  { slug: 'glossary', title: 'Glossary', type: 'glossary', description: 'A comprehensive guide to window and door terminology.', breadcrumb: ['Knowledge', 'Glossary'], url: 'https://www.tostemindia.com/glossary/' },
  { slug: 'testimonials', title: 'Testimonials', type: 'testimonials', description: 'Hear from architects, builders, and homeowners who have experienced the Tostem difference.', breadcrumb: ['Knowledge', 'Testimonials'], url: 'https://www.tostemindia.com/testimonials/' },

  // Reach Us
  { slug: 'contact', title: 'Contact', type: 'contact', description: 'Find a TOSTEM office near you or get in touch with our team for a free consultation.', breadcrumb: ['Reach Us', 'Contact'], url: 'https://www.tostemindia.com/contact/' },
];
