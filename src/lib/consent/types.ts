export type Category = 'essential' | 'functional' | 'analytics' | 'marketing';

export type Region = 'EEA' | 'UK' | 'CPRA' | 'INDIA' | 'OTHER';

export interface ConsentState {
  version: number;
  timestamp: number;
  region: Region;
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentContextValue {
  state: ConsentState;
  setAll: (enabled: boolean) => void;
  setCategory: (category: Category, enabled: boolean) => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const CONSENT_VERSION = 1;
export const CONSENT_COOKIE_NAME = 'ss_cookie_consent';
export const CONSENT_EXPIRY_DAYS = 365;
export const CONSENT_REVALIDATE_DAYS = 180;
