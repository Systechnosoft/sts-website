import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import systechnosoftLogo from "@/assets/systechnosoft-logo.webp";

const footerSections = [
  {
    title: "Services",
    links: [
      { name: "IT Infrastructure", href: "/services/managed-it-services", ariaLabel: "Go to Managed IT Services" },
      { name: "Low-code", href: "/services/bpa", ariaLabel: "Go to Business Process Automation" },
      { name: "AI & Automation", href: "/services/ai-development-integration", ariaLabel: "Go to AI Development & Integration" },
    ],
  },
  {
    title: "Industries",
    links: [
      { name: "BFSI", href: "/industries#bfsi", ariaLabel: "Go to BFSI Industry" },
      { name: "Oil & Gas", href: "/industries#oil-gas", ariaLabel: "Go to Oil & Gas Industry" },
      { name: "Aviation", href: "/industries#aviation", ariaLabel: "Go to Aviation Industry" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-y-4 mb-3 lg:mb-3 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-x-[clamp(24px,4vw,48px)]">
          {/* Services - Left */}
          <div className="max-w-72 lg:justify-self-start lg:text-left">
            <h3 className="font-montserrat font-semibold text-base tracking-wide text-foreground mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {footerSections[0].links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="brand-underline-link-center text-sm text-muted-foreground hover:text-[#E52629] focus-visible:text-[#E52629] transition-colors focus-enterprise rounded"
                    aria-label={link.ariaLabel}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries - Center */}
          <div className="max-w-72 lg:justify-self-center lg:text-center">
            <h3 className="font-montserrat font-semibold text-base tracking-wide text-foreground mb-4">
              Industries
            </h3>
            <ul className="space-y-2">
              {footerSections[1].links.map((link) => (
                <li key={link.name}>
                <a
                    href={link.href}
                    className="brand-underline-link-center text-sm text-muted-foreground hover:text-[#E52629] focus-visible:text-[#E52629] transition-colors focus-enterprise rounded"
                    aria-label={link.ariaLabel}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Right */}
          <div className="max-w-72 lg:justify-self-end lg:text-left">
            <h3 className="font-montserrat font-semibold text-base tracking-wide text-foreground mb-4">
              Systechnosoft Technologies
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <address className="not-italic">
                  49 5th Ave #1187, Brooklyn,<br />
                  NY 11217, United States
                </address>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@systechnosoft.in" className="brand-underline-link-center hover:text-[#E52629] focus-visible:text-[#E52629] transition-colors">
                  info@systechnosoft.in
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+13473051255" className="brand-underline-link-center hover:text-[#E52629] focus-visible:text-[#E52629] transition-colors">
                  +1 (347) 305-1255
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Link Group */}
        <div className="border-t border-[#E52629]/15 pt-6 mt-2">
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-[15px] text-neutral-800 mb-4">
            <a 
              href="/about" 
              className="brand-underline-link inline-flex items-center px-2 py-1 min-h-[44px] hover:text-[#E52629] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 rounded-md"
              aria-label="About Us"
            >
              About Us
            </a>
            <span className="text-neutral-400" aria-hidden="true">•</span>
            <a 
              href="/contact" 
              className="brand-underline-link inline-flex items-center px-2 py-1 min-h-[44px] hover:text-[#E52629] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 rounded-md"
              aria-label="Contact"
            >
              Contact
            </a>
            <span className="text-neutral-400" aria-hidden="true">•</span>
            <a 
              href="/careers" 
              className="brand-underline-link inline-flex items-center px-2 py-1 min-h-[44px] hover:text-[#E52629] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 rounded-md"
              aria-label="Careers"
            >
              Careers
            </a>
            <span className="text-neutral-400" aria-hidden="true">•</span>
            <a 
              href="/privacy-policy" 
              className="brand-underline-link inline-flex items-center px-2 py-1 min-h-[44px] hover:text-[#E52629] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 rounded-md"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            <span className="text-neutral-400" aria-hidden="true">•</span>
            <a 
              href="/cookie-policy" 
              className="brand-underline-link inline-flex items-center px-2 py-1 min-h-[44px] hover:text-[#E52629] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 rounded-md"
              aria-label="Cookie Policy"
            >
              Cookie Policy
            </a>
          </div>

          {/* Centered Copyright */}
          <div className="text-center pt-2">
            <p className="text-sm text-neutral-600 max-w-prose mx-auto">
              © {new Date().getFullYear()} Systechnosoft Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}