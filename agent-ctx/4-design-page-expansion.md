# Task 4: Expand Design Page Content

## Summary
Expanded design-page.tsx with detailed data for all 20 remaining designs and enhanced the page template with 4 new sections.

## Changes Made

### File Modified
- `/home/z/my-project/src/components/pages/design-page.tsx`

### New Design Data Added (20 designs)
**Windows (7):**
- aluminium-hung-awning-windows
- aluminium-fixed-window
- aluminium-glass-to-glass-corner-window
- aluminium-french-windows
- aluminium-tilt-slide-windows
- aluminium-slit-windows
- aluminium-vertical-sliding-windows

**Doors (3):**
- aluminium-corner-slider-door
- aluminium-slide-fold-doors
- ventilation-doors

**Steel Doors (2):**
- giesta-doors
- giesta-ventilation-doors

**Airflow (3):**
- ventilation-slots
- aluminum-louver
- glass-louver

**Facades (2):**
- facade-curtain-wall
- facade-store-front

**Interior (3):**
- hanging-door
- swing-door
- fixed-divider

### Template Enhancements
1. **Image Gallery Section** - Below hero, 4 thumbnail images in responsive grid with hover zoom + lightbox modal
2. **Download Brochure CTA Banner** - Between features and CTA, with decorative diagonal and download icon
3. **Related Designs Section** - At bottom, up to 4 similar designs from same category
4. **Enhanced Series Card Hover** - Left accent bar animation, background gradient, text translate, shadow lift

### Supporting Infrastructure
- `designCategoryMap` - Maps all 26 design slugs to categories for related design grouping
- `getRelatedDesigns()` function - Returns up to 4 designs from same category
- `getGalleryImages()` function - Returns 4 contextual gallery images per design
- Lightbox state management with useState

## Lint Status
- 0 errors in design-page.tsx
- Dev server compiles successfully
