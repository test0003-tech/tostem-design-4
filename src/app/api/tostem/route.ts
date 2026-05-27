import ZAI from 'z-ai-web-dev-sdk';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const action = searchParams.get('action');

  // Return the list of all pages with metadata
  if (action === 'pages') {
    const pages = getAllPages();
    return NextResponse.json({ pages });
  }

  // Fetch content from Tostem page
  const url = searchParams.get('url');
  const slug = searchParams.get('slug');

  if (!url && !slug) {
    return NextResponse.json(
      { error: 'URL or slug parameter is required' },
      { status: 400 }
    );
  }

  const targetUrl = url || `https://www.tostemindia.com/${slug}/`;
  const cacheKey = targetUrl;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const zai = await ZAI.create();
    const result = await zai.functions.invoke('page_reader', { url: targetUrl });

    const responseData = {
      url: targetUrl,
      slug: slug || targetUrl.split('/').filter(Boolean).pop() || '',
      data: result.data,
      fetchedAt: new Date().toISOString(),
    };

    // Cache the result
    cache.set(cacheKey, { data: responseData, timestamp: Date.now() });

    return NextResponse.json(responseData);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function getAllPages() {
  return [
    { slug: 'about-tostem', title: 'About Tostem', type: 'about', url: 'https://www.tostemindia.com/about-tostem/' },
    { slug: 'directors-message', title: "Leader's Message", type: 'about', url: 'https://www.tostemindia.com/directors-message/' },
    { slug: 'our-purpose-and-behaviour', title: 'Our Purpose And Behaviour', type: 'about', url: 'https://www.tostemindia.com/our-purpose-and-behaviour' },
    { slug: 'lixil-window-system', title: 'Lixil Window System', type: 'about', url: 'https://www.tostemindia.com/lixil-window-system/' },
    { slug: 'awards', title: 'Awards', type: 'about', url: 'https://www.tostemindia.com/awards' },
    { slug: 'total-housing-solutions', title: 'Total Housing Solutions', type: 'why-tostem', url: 'https://www.tostemindia.com/total-housing-solutions/' },
    { slug: 'japanese-innovation', title: 'Japanese Innovation', type: 'why-tostem', url: 'https://www.tostemindia.com/japanese-innovation/' },
    { slug: 'pre-engineered-system-windows', title: 'Pre Engineered System Windows', type: 'why-tostem', url: 'https://www.tostemindia.com/pre-engineered-system-windows/' },
    { slug: 'quality-assurance-and-services', title: 'Quality Assurance and Testing', type: 'why-tostem', url: 'https://www.tostemindia.com/quality-assurance-and-services/' },
    { slug: 'soundproof-window-door-performance', title: 'TOSTEM Product Performance', type: 'why-tostem', url: 'https://www.tostemindia.com/soundproof-window-door-performance' },
    { slug: 'anodized-aluminum-windows-surface-colour-protection', title: 'Surface & Colour Protection', type: 'why-tostem', url: 'https://www.tostemindia.com/anodized-aluminum-windows-surface-colour-protection' },
    { slug: 'anodised-aluminium-windows-doors-colour', title: 'Anodised Aluminium Window', type: 'why-tostem', url: 'https://www.tostemindia.com/anodised-aluminium-windows-doors-colour/' },
    { slug: 'soundproof-insulated-doors-and-windows', title: 'Sound Insulated Doors and Windows', type: 'why-tostem', url: 'https://www.tostemindia.com/soundproof-insulated-doors-and-windows/' },
    { slug: 'aluminium-doors-design-prices', title: 'Aluminium Doors', type: 'category', url: 'https://www.tostemindia.com/aluminium-doors-design-prices/' },
    { slug: 'aluminium-windows-design-prices', title: 'Aluminium Windows', type: 'category', url: 'https://www.tostemindia.com/aluminium-windows-design-prices/' },
    { slug: 'steel-entrance-doors', title: 'Steel Entrance Doors', type: 'category', url: 'https://www.tostemindia.com/steel-entrance-doors/' },
    { slug: 'airflow-system', title: 'Airflow System', type: 'category', url: 'https://www.tostemindia.com/airflow-system/' },
    { slug: 'facades', title: 'Facades', type: 'category', url: 'https://www.tostemindia.com/facades/' },
    { slug: 'interior', title: 'Interior', type: 'category', url: 'https://www.tostemindia.com/interior/' },
    { slug: 'aluminium-sliding-doors', title: 'Aluminium Sliding Doors', type: 'design', url: 'https://www.tostemindia.com/aluminium-sliding-doors/' },
    { slug: 'aluminium-casement-doors', title: 'Aluminium Casement Doors', type: 'design', url: 'https://www.tostemindia.com/aluminium-casement-doors/' },
    { slug: 'aluminium-french-doors', title: 'Aluminium French Doors', type: 'design', url: 'https://www.tostemindia.com/aluminium-french-doors/' },
    { slug: 'aluminium-bi-folding-doors', title: 'Aluminium Folding (Bi Fold) Doors', type: 'design', url: 'https://www.tostemindia.com/aluminium-bi-folding-doors/' },
    { slug: 'aluminium-corner-slider-door', title: 'Aluminium Corner Slider Door', type: 'design', url: 'https://www.tostemindia.com/aluminium-corner-slider-door/' },
    { slug: 'aluminium-slide-fold-doors', title: 'Aluminium Slide and Fold Doors', type: 'design', url: 'https://www.tostemindia.com/aluminium-slide-fold-doors/' },
    { slug: 'ventilation-doors', title: 'Ventilation Doors', type: 'design', url: 'https://www.tostemindia.com/ventilation-doors/' },
    { slug: 'aluminium-sliding-windows-designs', title: 'Aluminium Sliding Windows', type: 'design', url: 'https://www.tostemindia.com/aluminium-sliding-windows-designs/' },
    { slug: 'aluminium-casement-windows', title: 'Aluminium Casement Windows', type: 'design', url: 'https://www.tostemindia.com/aluminium-casement-windows/' },
    { slug: 'aluminium-hung-awning-windows', title: 'Aluminium Awning Windows', type: 'design', url: 'https://www.tostemindia.com/aluminium-hung-awning-windows/' },
    { slug: 'aluminium-fixed-window', title: 'Aluminium Fixed Window', type: 'design', url: 'https://www.tostemindia.com/aluminium-fixed-window/' },
    { slug: 'aluminium-glass-to-glass-corner-window', title: 'Aluminium Glass To Glass Corner Windows', type: 'design', url: 'https://www.tostemindia.com/aluminium-glass-to-glass-corner-window/' },
    { slug: 'aluminium-french-windows', title: 'Aluminium French Windows', type: 'design', url: 'https://www.tostemindia.com/aluminium-french-windows/' },
    { slug: 'aluminium-tilt-slide-windows', title: 'Aluminium Tilt and Slide Windows', type: 'design', url: 'https://www.tostemindia.com/aluminium-tilt-slide-windows/' },
    { slug: 'aluminium-slit-windows', title: 'Aluminium Slit Windows', type: 'design', url: 'https://www.tostemindia.com/aluminium-slit-windows/' },
    { slug: 'aluminium-vertical-sliding-windows', title: 'Aluminium Vertical Sliding Windows', type: 'design', url: 'https://www.tostemindia.com/aluminium-vertical-sliding-windows/' },
    { slug: 'giesta-doors', title: 'Giesta Doors', type: 'series', url: 'https://www.tostemindia.com/giesta-doors/' },
    { slug: 'giesta-ventilation-doors', title: 'Giesta with Ventilation', type: 'series', url: 'https://www.tostemindia.com/giesta-ventilation-doors/' },
    { slug: 'ventilation-slots', title: 'Ventilation Slot', type: 'design', url: 'https://www.tostemindia.com/ventilation-slots/' },
    { slug: 'aluminum-louver', title: 'Aluminium Louvers', type: 'design', url: 'https://www.tostemindia.com/aluminum-louver/' },
    { slug: 'glass-louver', title: 'Glass Louvers', type: 'design', url: 'https://www.tostemindia.com/glass-louver/' },
    { slug: 'facade-curtain-wall', title: 'Curtain Wall Facades', type: 'design', url: 'https://www.tostemindia.com/facade-curtain-wall/' },
    { slug: 'facade-store-front', title: 'Store Front Facades', type: 'design', url: 'https://www.tostemindia.com/facade-store-front/' },
    { slug: 'hanging-door', title: 'Hanging Doors', type: 'design', url: 'https://www.tostemindia.com/hanging-door/' },
    { slug: 'swing-door', title: 'Swing Doors', type: 'design', url: 'https://www.tostemindia.com/swing-door/' },
    { slug: 'fixed-divider', title: 'Fixed Divider', type: 'design', url: 'https://www.tostemindia.com/fixed-divider/' },
    { slug: 'grants-windows-doors-series', title: 'Grants Series', type: 'series', url: 'https://www.tostemindia.com/grants-windows-doors-series/' },
    { slug: 'atis-windows-doors-series', title: 'ATIS Series', type: 'series', url: 'https://www.tostemindia.com/atis-windows-doors-series/' },
    { slug: 'we-plus-windows-doors-series', title: 'We Plus Series', type: 'series', url: 'https://www.tostemindia.com/we-plus-windows-doors-series/' },
    { slug: 'we-70-windows-doors-series', title: 'We 70 Series', type: 'series', url: 'https://www.tostemindia.com/we-70-windows-doors-series/' },
    { slug: 'e-catalogue', title: 'E-catalogue', type: 'experience', url: 'https://www.tostemindia.com/e-catalogue/' },
    { slug: 'modern-window-door-design', title: 'Modern Window & Door Design', type: 'experience', url: 'https://www.tostemindia.com/modern-window-door-design/' },
    { slug: 'gallery', title: 'Gallery', type: 'experience', url: 'https://www.tostemindia.com/gallery/' },
    { slug: 'tada-2025', title: 'TADA-2025', type: 'tada', url: 'https://www.tostemindia.com/tada-category/tada-2025/' },
    { slug: 'tada-2024', title: 'TADA-2024', type: 'tada', url: 'https://www.tostemindia.com/tada-category/tada-2024/' },
    { slug: 'tada-2023', title: 'TADA-2023', type: 'tada', url: 'https://www.tostemindia.com/tada-category/tada-2023/' },
    { slug: 'what-is-pre-engineered-system-window', title: 'Pre Engineered System Windows', type: 'knowledge', url: 'https://www.tostemindia.com/what-is-pre-engineered-system-window/' },
    { slug: 'planning-a-system-window', title: 'Planning a System Window', type: 'knowledge', url: 'https://www.tostemindia.com/planning-a-system-window/' },
    { slug: 'system-aluminum-windows', title: 'System Aluminum Windows', type: 'knowledge', url: 'https://www.tostemindia.com/system-aluminum-windows/' },
    { slug: 'blog', title: 'Blog', type: 'knowledge', url: 'https://www.tostemindia.com/blog/' },
    { slug: 'glossary', title: 'Glossary', type: 'knowledge', url: 'https://www.tostemindia.com/glossary/' },
    { slug: 'testimonials', title: 'Testimonials', type: 'knowledge', url: 'https://www.tostemindia.com/testimonials/' },
    { slug: 'contact', title: 'Contact', type: 'contact', url: 'https://www.tostemindia.com/contact/' },
  ];
}
