import { useState, useEffect, ButtonHTMLAttributes, ReactNode } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsultationStore } from "@/lib/consultation-store";
import { cn } from "@/lib/utils";

interface BookConsultationTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'variant'> {
  variant?: 'primary' | 'secondary' | 'link' | 'outline';
  children?: ReactNode;
}

export function BookConsultationTrigger({ 
  variant = 'primary', 
  className,
  children = 'Book a consultation',
  ...props 
}: BookConsultationTriggerProps) {
  const { openCalendly } = useConsultationStore();
  const [isHovered, setIsHovered] = useState(false);

  // Preconnect to Calendly on hover/focus
  useEffect(() => {
    if (isHovered && typeof document !== "undefined") {
      const preconnect = document.createElement("link");
      preconnect.rel = "preconnect";
      preconnect.href = "https://calendly.com";
      document.head.appendChild(preconnect);

      const preconnectAssets = document.createElement("link");
      preconnectAssets.rel = "preconnect";
      preconnectAssets.href = "https://assets.calendly.com";
      document.head.appendChild(preconnectAssets);

      return () => {
        document.head.removeChild(preconnect);
        document.head.removeChild(preconnectAssets);
      };
    }
  }, [isHovered]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      case 'link':
        return "text-primary underline-offset-4 hover:underline";
      case 'outline':
        return "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground";
      case 'primary':
      default:
        return "bg-[#E52629] hover:bg-[#E52629]/90 text-white";
    }
  };

  return (
    <Button
      size="lg"
      className={cn(
        "font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2",
        getVariantStyles(),
        className
      )}
      onClick={openCalendly}
      onMouseEnter={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      {...props}
    >
      <Calendar className="h-5 w-5" />
      {children}
    </Button>
  );
}
