import { ConsentState, CONSENT_COOKIE_NAME, CONSENT_EXPIRY_DAYS } from './types';

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
}

export function getConsentState(): ConsentState | null {
  try {
    // Try localStorage first (faster)
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(CONSENT_COOKIE_NAME);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    
    // Fallback to cookie
    const cookieValue = getCookie(CONSENT_COOKIE_NAME);
    if (cookieValue) {
      return JSON.parse(cookieValue);
    }
  } catch (e) {
    console.error('Failed to parse consent state:', e);
  }
  
  return null;
}

export function setConsentState(state: ConsentState): void {
  const serialized = JSON.stringify(state);
  
  // Store in cookie
  setCookie(CONSENT_COOKIE_NAME, serialized, CONSENT_EXPIRY_DAYS);
  
  // Mirror in localStorage for faster access
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CONSENT_COOKIE_NAME, serialized);
    }
  } catch (e) {
    console.error('Failed to write to localStorage:', e);
  }
}

export function clearConsentState(): void {
  // Clear cookie
  setCookie(CONSENT_COOKIE_NAME, '', -1);
  
  // Clear localStorage
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CONSENT_COOKIE_NAME);
    }
  } catch (e) {
    console.error('Failed to clear localStorage:', e);
  }
}
