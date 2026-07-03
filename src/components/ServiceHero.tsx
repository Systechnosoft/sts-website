import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ServiceHeroProps {
  // Content
  title: string | React.ReactNode;
  subtitle: string;
  uspChips: string[];
  
  // Buttons
  primaryButton: {
    text: string;
    onClick?: (e: React.MouseEvent) => void;
    href?: string;
    ariaLabel?: string;
  };
  secondaryButton: {
    text: string;
    href: string;
    ariaLabel?: string;
  };
  
  // Image (optional - will generate if not provided)
  image?: {
    src?: string;
    alt: string;
    width?: number;
    height?: number;
    placeholderPrompt?: string;
  };
  
  // Optional Customization
  id?: string;
  dataPage?: string;
  className?: string;
  glowColors?: {
    primary: string;
    secondary: string;
  };
  // Optional headline typography override (to match BPA hero)
  headlineClassName?: string;
}

function useServiceHeroImage(
  image: ServiceHeroProps['image'],
  title: ServiceHeroProps['title']
): { src: string; isLoading: boolean } {
  const [generatedSrc, setGeneratedSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If image src is already provided, use it
    if (image?.src) {
      setGeneratedSrc(image.src);
      return;
    }

    // Generate image using AI
    const generateImage = async () => {
      setIsLoading(true);
      try {
        // Extract text from title for prompt generation
        const titleText = typeof title === 'string' 
          ? title 
          : React.Children.toArray(title)
              .map(child => typeof child === 'string' ? child : '')
              .join('');

        const prompt = image?.placeholderPrompt || 
          `Create a professional, modern hero image for a technology service page about "${titleText}". Ultra high resolution, 16:9 aspect ratio, clean design with subtle gradients, tech-focused, corporate style.`;

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image-preview",
            messages: [
              {
                role: "user",
                content: prompt
              }
            ],
            modalities: ["image", "text"]
          })
        });

        if (!response.ok) {
          throw new Error(`AI Gateway error: ${response.status}`);
        }

        const data = await response.json();
        const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        
        if (imageUrl) {
          setGeneratedSrc(imageUrl);
        } else {
          setGeneratedSrc("/placeholder.svg");
        }
      } catch (error) {
        console.error("Failed to generate hero image:", error);
        setGeneratedSrc("/placeholder.svg");
      } finally {
        setIsLoading(false);
      }
    };

    generateImage();
  }, [image?.src, image?.placeholderPrompt, title]);

  return {
    src: generatedSrc,
    isLoading
  };
}

export default function ServiceHero({
  title,
  subtitle,
  uspChips,
  primaryButton,
  secondaryButton,
  image,
  id = "hero",
  dataPage,
  className,
  glowColors,
  headlineClassName
}: ServiceHeroProps) {
  const { src: imageSrc, isLoading: imageLoading } = useServiceHeroImage(image, title);

  return (
    <section 
      id={id}
      data-page={dataPage}
      className={cn(
        "sf-hero relative min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden bg-white py-24 isolate",
        className
      )}
      aria-labelledby={`${id}-title`}
    >
      {/* Animated background - Framer Motion optimized */}
      <div className="sf-hero__bg absolute inset-0 z-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(229,38,41,0.1),transparent)]" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent, hsl(var(--primary)), transparent)`,
            backgroundSize: "400px 400px"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content Grid */}
      <div className="sf-hero__inner relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center max-w-[1200px] mx-auto">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-[44rem]"
          >
            {/* Title */}
            <h1 
              id={`${id}-title`}
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
                headlineClassName
              )}
            >
              {title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
            
            {/* USP Chips */}
            <div className="sf-hero__chips flex flex-wrap gap-3">
              {uspChips.map((badge, idx) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.35 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="text-sm px-4 py-2 bg-white/80 border-[#E6E6E6] text-[#1C1C1C] hover:shadow-sm transition-shadow"
                  >
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </div>
            
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary Button */}
              <Button
                size="lg"
                className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg hover:translate-y-[-2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={primaryButton.onClick}
                asChild={!!primaryButton.href}
                aria-label={primaryButton.ariaLabel}
              >
                {primaryButton.href ? (
                  <a href={primaryButton.href}>{primaryButton.text}</a>
                ) : (
                  <span>{primaryButton.text}</span>
                )}
              </Button>
              
              {/* Secondary Button */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                aria-label={secondaryButton.ariaLabel}
              >
                <a href={secondaryButton.href}>{secondaryButton.text}</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative isolate group"
          >
            {imageLoading ? (
              <div className="w-full aspect-[16/9] rounded-2xl border border-[#E6E6E6] bg-muted animate-pulse flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Generating image...</p>
              </div>
            ) : (
              <>
                <img
                  src={imageSrc}
                  width={image?.width || 1184}
                  height={image?.height || 672}
                  alt={image?.alt || "Hero illustration"}
                  className="w-full h-auto rounded-2xl border border-[#E6E6E6] shadow-[0_10px_30px_rgba(0,0,0,0.06)] object-cover transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-6px] group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
                  loading="eager"
                  decoding="async"
                  sizes="(min-width: 1024px) 48vw, 92vw"
                />
                {/* Brand Glow */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-3 rounded-[22px] blur-lg opacity-[.18] -z-10"
                  style={{
                    background: `radial-gradient(40% 40% at 20% 30%, ${glowColors?.primary || '#E52629'} 10%, transparent 70%), radial-gradient(35% 35% at 80% 70%, ${glowColors?.secondary || '#007AFF'} 10%, transparent 70%)`
                  }}
                />
              </>
            )}
          </motion.figure>

        </div>
      </div>
    </section>
  );
}
