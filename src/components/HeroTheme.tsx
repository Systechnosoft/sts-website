/**
 * Hero Theme Documentation
 * 
 * This is the standard "hero-theme" based on the Salesforce page design.
 * Use this as a reference when applying consistent hero styling across pages.
 * 
 * Key Characteristics:
 * 
 * 1. BACKGROUND:
 *    - Very light pink/rose gradient (#FFF8F8 to #FFF0F0)
 *    - Soft, large circular gradient shapes for depth
 *    - Subtle radial gradients in corners
 * 
 * 2. LAYOUT:
 *    - Two-column layout on desktop (content left, animation/card right)
 *    - Stacked on mobile
 *    - Min height: 72vh to 84vh
 *    - Centered content with max-width container
 * 
 * 3. TYPOGRAPHY:
 *    - H1: Very large (48-60px), bold, Montserrat font
 *    - Color: Dark charcoal/black (#1C1C1C)
 *    - Accent phrases: Red (#E52629) for emphasis
 *    - Black horizontal line separator between key phrases
 *    - Subheading: Gray (#3C3C3C), 18-20px, Inter font
 * 
 * 4. PROOF BADGES:
 *    - Small pills/badges below subheading
 *    - Light background with subtle border
 *    - Display 2-3 key metrics or features
 * 
 * 5. CALL-TO-ACTIONS:
 *    - Primary: Bright red (#E52629) with white text, hover darken
 *    - Secondary: Outline style with border, transparent background
 *    - Side-by-side on desktop, stacked on mobile
 * 
 * 6. RIGHT COLUMN:
 *    - Animated element (Einstein bot swarm, rotating cards, etc.)
 *    - White card with subtle shadow and border
 *    - Auto-rotation with pause on hover
 * 
 * 7. COLORS:
 *    - Background base: #FFFFFF with pink tint (#FFF5F5, #FFEEF0)
 *    - Primary text: #1C1C1C (near black)
 *    - Secondary text: #3C3C3C (dark gray)
 *    - Accent: #E52629 (brand red)
 *    - Secondary accent: #007AFF (blue for links/secondary elements)
 *    - Borders: #E6E6E6 (light gray)
 * 
 * 8. ANIMATION:
 *    - Respect prefers-reduced-motion
 *    - Subtle entrance animations (fade + slight translate)
 *    - Staggered animation for multiple elements
 *    - Pause on hover/focus for interactive elements
 * 
 * Example Implementation:
 * 
 * <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-[#FFF8F8] via-white to-[#FFF0F0]">
 *   <div className="absolute inset-0 pointer-events-none">
 *     <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-50/40 to-transparent" />
 *     <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-50/30 to-transparent" />
 *   </div>
 *   
 *   <div className="container mx-auto px-4 relative z-10">
 *     <div className="grid lg:grid-cols-2 gap-12 items-center">
 *       <div className="space-y-8">
 *         <h1 className="text-5xl lg:text-6xl font-bold font-montserrat text-[#1C1C1C]">
 *           Your headline with{" "}
 *           <span className="text-[#E52629]">red accent</span>—and{" "}
 *           <span className="text-[#E52629]">more accent</span>
 *         </h1>
 *         <p className="text-lg text-[#3C3C3C]">Supporting subheading text</p>
 *         <div className="flex gap-3">
 *           <Badge>Proof point 1</Badge>
 *           <Badge>Proof point 2</Badge>
 *         </div>
 *         <div className="flex gap-4">
 *           <Button className="bg-[#E52629] hover:bg-[#D02022]">Primary CTA</Button>
 *           <Button variant="outline">Secondary CTA</Button>
 *         </div>
 *       </div>
 *       <div>{/* Right column animation/card *\/}</div>
 *     </div>
 *   </div>
 * </section>
 */

export const HERO_THEME = {
  background: {
    base: 'bg-gradient-to-br from-[#FFF8F8] via-white to-[#FFF0F0]',
    overlays: {
      topLeft: 'absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-50/40 via-transparent to-transparent',
      bottomRight: 'absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-50/30 via-transparent to-transparent',
    }
  },
  typography: {
    h1: {
      className: 'text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-[#1C1C1C] leading-tight',
      accentColor: 'text-[#E52629]',
    },
    subheading: {
      className: 'text-lg md:text-xl text-[#3C3C3C] leading-relaxed',
    },
  },
  cta: {
    primary: 'bg-[#E52629] hover:bg-[#D02022] text-white',
    secondary: 'border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF]/5',
  },
  colors: {
    background: '#FFFFFF',
    backgroundTint: '#FFF8F8',
    textPrimary: '#1C1C1C',
    textSecondary: '#3C3C3C',
    accent: '#E52629',
    accentSecondary: '#007AFF',
    border: '#E6E6E6',
  },
} as const;
