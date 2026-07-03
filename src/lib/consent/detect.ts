import { Region } from './types';

// EEA countries (EU + Iceland, Liechtenstein, Norway)
const EEA_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES',
  'SE', 'IS', 'LI', 'NO'
];

export function detectRegion(): Region {
  if (typeof navigator === 'undefined') return 'OTHER';
  
  try {
    // Try Intl API for timezone-based detection
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // UK detection
    if (timezone.startsWith('Europe/London')) {
      return 'UK';
    }
    
    // EEA detection (simplified - in production use geolocation service)
    if (timezone.startsWith('Europe/')) {
      return 'EEA';
    }
    
    // California detection (simplified)
    if (timezone === 'America/Los_Angeles') {
      return 'CPRA';
    }
    
    // India detection
    if (timezone === 'Asia/Kolkata' || timezone === 'Asia/Calcutta') {
      return 'INDIA';
    }
    
    // Fallback: check language
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith('en-gb')) return 'UK';
    if (lang.startsWith('hi') || lang.startsWith('en-in')) return 'INDIA';
    
  } catch (e) {
    console.error('Region detection failed:', e);
  }
  
  return 'OTHER';
}

export function detectGPC(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  // Check for Global Privacy Control signal
  // @ts-ignore - GPC is not in standard TypeScript definitions yet
  return navigator.globalPrivacyControl === true;
}

export function shouldOptIn(region: Region): boolean {
  // EEA, UK require opt-in for non-essential cookies
  return region === 'EEA' || region === 'UK';
}

export function shouldHonorGPC(region: Region): boolean {
  // CPRA requires honoring GPC for sale/sharing opt-out
  return region === 'CPRA';
}
