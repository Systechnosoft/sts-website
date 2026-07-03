import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useHealthCheckStore } from "@/lib/health-check-store";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const servicesData = {
  "IT Solutions": [
    { name: "Cloud Services", href: "/services/cloud" },
    { name: "Data Migration", href: "/services/data-migration" },
    { name: "Managed IT Services", href: "/services/managed-it-services" },
    { name: "Microsoft Dynamics 365", href: "/services/microsoft-dynamics-365" },
    { name: "Data Protection", href: "/services/backup-recovery" },
  ],
  "Low Code": [
    { name: "Business Process Automation", href: "/services/bpa" },
    { name: "Customer Relationship Management", href: "/services/crm" },
  ],
  "AI & Automation": [
    { name: "Development & Integration", href: "/services/ai-development-integration" },
    { name: "Language Intelligence", href: "/services/ai-natural-language-processing" },
    { name: "Prompt Engineering", href: "/services/ai-prompt-engineering" },
    { name: "Data Analytics & Insights", href: "/services/ai-data-analytics-insights" },
    { name: "Consultation & Strategy", href: "/services/ai-consultation-strategy" },
  ],
  "Other Services": [
    { name: "Web Development", href: "/services/web-development" },
    { name: "Mobile App Development", href: "/services/mobile-app-development" },
  ],
};

interface ServicesMegaMenuProps {
  isActive: boolean;
  onClose: () => void;
}

export default function ServicesMegaMenu({ isActive, onClose }: ServicesMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const openTimeoutRef = useRef<NodeJS.Timeout>();
  const closeTimeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { openHealthCheck } = useHealthCheckStore();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) onClose();
  };

  const handleLinkClick = (section: string, item: string, url: string) => {
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'menu_link_click', {
        section,
        item,
        url
      });
    }
    
    setIsOpen(false);
    onClose();
    
    // Force full page load
    window.location.href = url;
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    if (!isOpen) {
      openTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
        // Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'menu_open');
        }
      }, 140);
    }
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 240);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <button
            className={cn(
              "block px-3 py-2 text-base font-inter font-medium rounded header-nav-item w-full text-left",
              isActive
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
            )}
          >
            Services
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-xl">
          <div className="py-6 h-full overflow-y-auto">
            <h2 className="font-montserrat font-semibold text-xl mb-6 sticky top-0 bg-background">Services</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {Object.entries(servicesData).map(([category, items]) => (
                <AccordionItem key={category} value={category} className="border-none">
                  <AccordionTrigger className="font-montserrat font-medium text-left py-3 hover:no-underline">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-1">
                      {items.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded transition-colors min-h-[44px] flex items-center"
                           onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(category, item.name, item.href);
                          }}
                        >
                          <span className="brand-underline-link-center">{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {/* Mobile Footer CTAs */}
            <div className="mt-8 space-y-3 pt-6 border-t border-border sticky bottom-0 bg-background">
              <a
                href="/contact"
                className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('Footer', 'Claim Your Free Insight', '/contact');
                }}
              >
                Claim Your Free Insight
              </a>
              <button
                className="block w-full border border-border text-center py-3 rounded-md font-medium hover:bg-accent transition-colors"
                onClick={() => {
                  openHealthCheck();
                  setIsOpen(false);
                  onClose();
                  // Analytics
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'menu_link_click', {
                      section: 'Footer',
                      item: 'IT Network Health Check',
                      action: 'open_modal'
                    });
                  }
                }}
              >
                IT Network Health Check
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          ref={triggerRef}
          className={cn(
            "font-inter font-medium text-sm transition-colors header-nav-item",
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          onFocus={handleMouseEnter}
          onBlur={(e) => {
            if (!e.currentTarget.closest('[data-mega-menu-container]')?.contains(e.relatedTarget)) {
              handleMouseLeave();
            }
          }}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          Services
        </button>
      </div>

      {/* Fixed Mega Menu Panel - Portal to body for true full-width */}
      {isOpen && createPortal(
        <div
          data-mega-menu-container
          className="fixed inset-x-0 w-screen z-[70]"
          style={{ top: '64px' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          role="menu"
        >
          {/* Full-width background layer */}
          <div 
            className="w-full bg-gradient-to-br from-rose-50 via-white to-rose-50 ring-1 ring-rose-100/80 shadow-xl shadow-rose-100/50 rounded-2xl backdrop-blur-sm"
          >
            
            {/* Centered content container */}
            <div className="relative max-w-[1200px] mx-auto px-8 py-8">
              {/* Main Content Grid */}
              <div className="grid grid-cols-4 gap-8">
                {Object.entries(servicesData).map(([category, items]) => (
                  <div key={category} className="space-y-4">
                    <h3 className="font-montserrat font-semibold text-slate-900 text-base mb-4">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block rounded-md px-2 py-1 text-[15px] text-slate-700 hover:text-rose-600 transition-colors duration-150 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                           onClick={(e) => {
                             e.preventDefault();
                             handleLinkClick(category, item.name, item.href);
                           }}
                        >
                          <span className="font-inter brand-underline-link-center">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Strip */}
            <div 
              className="sticky bottom-0 border-t border-rose-100 px-8 py-4 bg-white/80 backdrop-blur rounded-b-2xl"
            >
              <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-rose-500" />
                    <span>40% faster workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-rose-500" />
                    <span>30% ops efficiency</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                    onClick={() => handleLinkClick('Footer', 'Claim Your Free Insight', '/contact')}
                  >
                    Claim Your Free Insight
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    className="inline-flex items-center gap-2 border border-rose-300 text-rose-600 hover:bg-rose-50 px-6 py-2.5 rounded-lg font-medium transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                    onClick={() => {
                      openHealthCheck();
                      setIsOpen(false);
                      onClose();
                      // Analytics
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'menu_link_click', {
                          section: 'Footer',
                          item: 'IT Network Health Check',
                          action: 'open_modal'
                        });
                      }
                    }}
                  >
                    <Shield className="h-4 w-4" />
                    IT Network Health Check
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
