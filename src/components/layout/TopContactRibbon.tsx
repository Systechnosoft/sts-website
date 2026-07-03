import { motion } from 'framer-motion';
import { Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useLetsTalkStore } from '@/lib/lets-talk-store';
import { Button } from '@/components/ui/button';

// SVG icon for X (Twitter)
const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://www.facebook.com/profile.php?id=100083198298781',
    ariaLabel: 'Visit Systechnosoft on Facebook',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/systechnosoft/',
    ariaLabel: 'Visit Systechnosoft on Instagram',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/systechnosoft',
    ariaLabel: 'Visit Systechnosoft on LinkedIn',
  },
  {
    name: 'X',
    icon: XIcon,
    href: 'https://x.com/systechnosoft',
    ariaLabel: 'Follow Systechnosoft on X',
  },
];

export function TopContactRibbon() {
  const { isVisible } = useScrollDirection();
  const { openLetsTalk } = useLetsTalkStore();

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -48, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ 
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      className="sticky top-0 z-40 bg-neutral-50 border-b border-neutral-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Social Icons - Left */}
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.ariaLabel}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full
                    text-neutral-700 hover:text-[#E52629] hover:bg-neutral-100
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2"
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          {/* Contact Info - Right */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Phone */}
            <a
              href="tel:+13473051255"
              className="flex items-center gap-2 text-sm text-neutral-800 hover:text-[#E52629] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 rounded"
              aria-label="Call us at +1 (347) 305-1255"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline font-inter brand-underline-link-center">+1 (347) 305-1255</span>
            </a>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-5 w-px bg-neutral-200" aria-hidden="true" />

            {/* Email */}
            <a
              href="mailto:info@systechnosoft.in"
              className="flex items-center gap-2 text-sm text-neutral-800 hover:text-[#E52629] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 rounded"
              aria-label="Email us at info@systechnosoft.in"
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="hidden md:inline font-inter brand-underline-link-center">info@systechnosoft.in</span>
            </a>

            {/* Let's Talk Button */}
            <Button
              onClick={openLetsTalk}
              variant="outline"
              size="sm"
              className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white font-inter font-medium text-xs px-4 py-1.5 h-auto rounded-2xl
                hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] transition-all
                focus-visible:outline-2 focus-visible:outline-[#E52629]"
            >
              Let's talk
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
