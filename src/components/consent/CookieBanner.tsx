"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConsent } from './ConsentProvider';
import { getConsentState } from '@/lib/consent/storage';
import { CONSENT_VERSION, CONSENT_REVALIDATE_DAYS } from '@/lib/consent/types';

export function CookieBanner() {
  const [shouldShow, setShouldShow] = useState(false);
  const consent = useConsent();

  useEffect(() => {
    // Check if we need to show the banner
    const saved = getConsentState();
    
    if (!saved) {
      // No consent found - show banner
      setShouldShow(true);
      return;
    }
    
    // Check version
    if (saved.version !== CONSENT_VERSION) {
      setShouldShow(true);
      return;
    }
    
    // Check age
    const age = Date.now() - saved.timestamp;
    const maxAge = CONSENT_REVALIDATE_DAYS * 24 * 60 * 60 * 1000;
    if (age >= maxAge) {
      setShouldShow(true);
      return;
    }
    
    // Check region change
    if (saved.region !== consent.state.region) {
      setShouldShow(true);
      return;
    }
    
    // Valid consent exists
    setShouldShow(false);
  }, [consent.state.region]);

  const handleAllowAll = () => {
    consent.setAll(true);
    setShouldShow(false);
  };

  const handleRejectNonEssential = () => {
    consent.setAll(false);
    setShouldShow(false);
  };

  const handleManage = () => {
    consent.open();
    setShouldShow(false);
  };

  const reducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent banner"
          aria-describedby="cookie-banner-description"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 100 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E52629]/20 shadow-lg"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left: Content */}
              <div className="flex gap-3 flex-1">
                <Cookie className="h-6 w-6 text-[#E52629] flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-semibold font-montserrat text-[#1C1C1C] mb-1">
                    We use cookies to improve your experience
                  </h2>
                  <p id="cookie-banner-description" className="text-sm text-neutral-700 font-inter">
                    Non-essential cookies are used with your consent. You can change your choice anytime.{' '}
                    <a 
                      href="/cookie-policy" 
                      className="block mt-1 text-[#E52629] hover:underline focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded"
                    >
                      Learn more about our Cookie Policy
                    </a>
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 md:flex-shrink-0 md:pr-24">
                <Button
                  onClick={handleRejectNonEssential}
                  variant="outline"
                  size="lg"
                  className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
                >
                  Reject Non-Essential
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={handleManage}
                  variant="outline"
                  size="lg"
                  className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
                >
                  Manage Choices
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={handleAllowAll}
                  className="bg-[#E52629] text-white hover:bg-[#E52629]/90 focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
                  size="lg"
                >
                  Allow All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
