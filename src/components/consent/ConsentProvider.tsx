"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ConsentState, ConsentContextValue, Category, CONSENT_VERSION, CONSENT_REVALIDATE_DAYS } from '@/lib/consent/types';
import { getConsentState, setConsentState } from '@/lib/consent/storage';
import { detectRegion, detectGPC, shouldOptIn, shouldHonorGPC } from '@/lib/consent/detect';

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}

interface ConsentProviderProps {
  children: React.ReactNode;
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ConsentState>(() => {
    // Initialize with safe defaults (client-side only)
    const region = typeof window !== 'undefined' ? detectRegion() : 'OTHER';
    const isOptIn = shouldOptIn(region);
    const hasGPC = typeof window !== 'undefined' ? detectGPC() : false;
    const honorGPC = shouldHonorGPC(region);
    
    return {
      version: CONSENT_VERSION,
      timestamp: Date.now(),
      region,
      essential: true,
      functional: !isOptIn,
      analytics: !isOptIn && !(honorGPC && hasGPC),
      marketing: !isOptIn && !(honorGPC && hasGPC),
    };
  });

  // Load saved consent on mount
  useEffect(() => {
    const saved = getConsentState();
    if (saved) {
      // Check if consent is still valid
      const age = Date.now() - saved.timestamp;
      const maxAge = CONSENT_REVALIDATE_DAYS * 24 * 60 * 60 * 1000;
      
      if (age < maxAge && saved.version === CONSENT_VERSION) {
        setState(saved);
        return;
      }
    }
    
    // No valid consent found - will show banner
  }, []);

  // Listen for global cookie:open events
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('cookie:open', handleOpen);
    return () => window.removeEventListener('cookie:open', handleOpen);
  }, []);

  const setAll = useCallback((enabled: boolean) => {
    const region = detectRegion();
    const hasGPC = detectGPC();
    const honorGPC = shouldHonorGPC(region);
    
    const newState: ConsentState = {
      version: CONSENT_VERSION,
      timestamp: Date.now(),
      region,
      essential: true,
      functional: enabled,
      analytics: enabled && !(honorGPC && hasGPC),
      marketing: enabled && !(honorGPC && hasGPC),
    };
    
    setState(newState);
    setConsentState(newState);
    
    // Dispatch change event for ScriptGate
    window.dispatchEvent(new CustomEvent('consentchange', { detail: newState }));
  }, []);

  const setCategory = useCallback((category: Category, enabled: boolean) => {
    if (category === 'essential') return; // Cannot change essential
    
    const newState: ConsentState = {
      ...state,
      [category]: enabled,
      timestamp: Date.now(),
    };
    
    setState(newState);
    setConsentState(newState);
    
    // Dispatch change event for ScriptGate
    window.dispatchEvent(new CustomEvent('consentchange', { detail: newState }));
  }, [state]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value: ConsentContextValue = {
    state,
    setAll,
    setCategory,
    open,
    close,
    isOpen,
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}
