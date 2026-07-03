"use client";

import { useEffect, useState, ReactNode } from 'react';
import { useConsent } from './ConsentProvider';
import { Category } from '@/lib/consent/types';

interface ScriptGateProps {
  category: Exclude<Category, 'essential'>;
  children: ReactNode;
}

export function ScriptGate({ category, children }: ScriptGateProps) {
  const consent = useConsent();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Initial check
    setShouldRender(consent.state[category]);

    // Listen for consent changes
    const handleConsentChange = () => {
      setShouldRender(consent.state[category]);
    };

    window.addEventListener('consentchange', handleConsentChange);
    return () => window.removeEventListener('consentchange', handleConsentChange);
  }, [consent.state, category]);

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
}
