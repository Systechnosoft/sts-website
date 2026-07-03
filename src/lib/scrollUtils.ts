/**
 * Utility for smooth scrolling to anchor sections with header offset
 */

export function scrollToId(id: string, offset: number = 96): void {
  const element = document.getElementById(id);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

export function isOnPage(pathname: string): boolean {
  return window.location.pathname === pathname;
}