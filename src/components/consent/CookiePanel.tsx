"use client";

import { Shield, Sliders, BarChart3, Target, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useConsent } from './ConsentProvider';
import { Category } from '@/lib/consent/types';

const categories = [
  {
    key: 'essential' as Category,
    icon: Shield,
    label: 'Essential',
    description: 'Required for site security, load balancing, and consent storage. Cannot be disabled.',
    locked: true,
  },
  {
    key: 'functional' as Category,
    icon: Sliders,
    label: 'Functional',
    description: 'Remember your preferences and improve features like chat support.',
    locked: false,
  },
  {
    key: 'analytics' as Category,
    icon: BarChart3,
    label: 'Analytics/Performance',
    description: 'Measure visits and events to understand how you use our site.',
    locked: false,
  },
  {
    key: 'marketing' as Category,
    icon: Target,
    label: 'Advertising/Marketing',
    description: 'Remarketing and ad attribution. We do not sell your personal data.',
    locked: false,
  },
];

export function CookiePanel() {
  const consent = useConsent();

  const handleSave = () => {
    consent.close();
  };

  const handleAllowAll = () => {
    consent.setAll(true);
    consent.close();
  };

  const handleRejectNonEssential = () => {
    consent.setAll(false);
    consent.close();
  };

  return (
    <Sheet open={consent.isOpen} onOpenChange={(open) => !open && consent.close()}>
      <SheetContent 
        side="bottom" 
        className="max-h-[85vh] overflow-y-auto"
        aria-label="Cookie settings"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl font-semibold font-montserrat">
            Cookie Settings
          </SheetTitle>
          <SheetDescription className="text-base text-neutral-700 font-inter">
            Control which cookies we use. Your choices apply to this website only.{' '}
            <a 
              href="/cookie-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#E52629] hover:underline inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded"
            >
              Read our Cookie Policy
              <ExternalLink className="h-3 w-3" />
            </a>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isEnabled = consent.state[cat.key];

            return (
              <div
                key={cat.key}
                className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 bg-white"
              >
                <Icon className="h-5 w-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <Label 
                      htmlFor={`cookie-${cat.key}`}
                      className="text-base font-semibold font-montserrat text-[#1C1C1C] cursor-pointer"
                    >
                      {cat.label}
                    </Label>
                    
                    {cat.locked ? (
                      <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                        Required
                      </span>
                    ) : (
                      <Switch
                        id={`cookie-${cat.key}`}
                        checked={isEnabled}
                        onCheckedChange={(checked) => consent.setCategory(cat.key, checked)}
                        className="focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none"
                      />
                    )}
                  </div>
                  
                  <p className="text-sm text-neutral-600 font-inter">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleRejectNonEssential}
            variant="outline"
            size="lg"
            className="flex-1 border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
          >
            Reject Non-Essential
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={handleAllowAll}
            variant="outline"
            size="lg"
            className="flex-1 border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
          >
            Allow All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-[#E52629] text-white hover:bg-[#E52629]/90 focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
            size="lg"
          >
            Save Choices
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
