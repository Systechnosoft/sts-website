import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import systechnosoftLogo from "@/assets/systechnosoft-logo.webp";
import ServicesMegaMenu from "./ServicesMegaMenu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Careers", href: "/careers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="w-full">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
          {/* Skip to content link */}
          <Link 
            to="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded focus-enterprise"
          >
            Skip to content
          </Link>

          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center header-logo-link rounded">
              <img 
                src={systechnosoftLogo} 
                alt="Systechnosoft Technologies"
                width={200}
                height={40}
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Spacer to push navigation to the right */}
          <div className="flex-1" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Home Link */}
            <a
              href="/"
              className={cn(
                "font-inter font-medium text-sm transition-colors header-nav-item",
                isActive("/")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Home
            </a>
            
            {/* Services Mega Menu */}
            <ServicesMegaMenu 
              isActive={isActive("/services")}
              onClose={() => {}}
            />
            
            {/* Other Navigation Items */}
            {navigation.slice(1).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "font-inter font-medium text-sm transition-colors header-nav-item",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <nav className="px-2 pt-2 pb-4 space-y-1">
              {/* Home First */}
              <a
                href="/"
                className={cn(
                  "block px-3 py-2 text-base font-inter font-medium rounded header-nav-item",
                  isActive("/")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              
              {/* Services Second */}
              <div className="mb-4">
                <ServicesMegaMenu 
                  isActive={isActive("/services")}
                  onClose={() => setMobileMenuOpen(false)}
                />
              </div>
              
              {/* Remaining Items (Industries, Case Studies, About, Contact) */}
              {navigation.slice(1).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-inter font-medium rounded header-nav-item",
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
      </div>
    </header>
  );
}