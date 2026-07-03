import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ServiceHero";
import { useHealthCheckStore } from "@/lib/health-check-store";
import { 
  ArrowRight, 
  Shield, 
  Headphones, 
  Network, 
  Monitor, 
  Users, 
  FileText, 
  Wifi, 
  ShieldCheck,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";


export default function ManagedITServices() {
  const [activeSection, setActiveSection] = useState("helpdesk");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const { openHealthCheck } = useHealthCheckStore();

  const navItems = [
    { id: "rmm", label: "Remote Monitoring & Management" },
    { id: "network-management", label: "Network Management" },
    { id: "helpdesk", label: "Helpdesk" },
    { id: "active-directory-monitoring", label: "Active Directory Monitoring" },
    { id: "event-log-monitoring", label: "Event Log Monitoring" },
    { id: "access-point-solutions", label: "Access Point Solutions" },
    { id: "firewall-management", label: "Firewall Management" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Analytics tracking for hero buttons
  useEffect(() => {
    const primaryBtn = document.querySelector('[aria-label="Request an IT Network Health Check"]');
    const secondaryBtn = document.querySelector('[aria-label="Claim your free IT insight consultation"]');
    
    const trackPrimary = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'cta_it_health_check', {
          page_location: window.location.href,
          page_title: document.title
        });
      }
    };
    
    const trackSecondary = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'cta_free_insight', {
          page_location: window.location.href,
          page_title: document.title
        });
      }
    };
    
    primaryBtn?.addEventListener('click', trackPrimary);
    secondaryBtn?.addEventListener('click', trackSecondary);
    
    return () => {
      primaryBtn?.removeEventListener('click', trackPrimary);
      secondaryBtn?.removeEventListener('click', trackSecondary);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for header + sticky nav
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const targetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const services = [
    {
      id: "rmm",
      icon: Monitor,
      title: "Remote Monitoring & Management (RMM)",
      description: "Endpoint/server monitoring, patch management, config drift.",
      bullets: [
        "Health checks",
        "Patch windows",
        "Automations",
        "Alert routing"
      ],
      outcome: "Proactive maintenance, fewer outages"
    },
    {
      id: "network-management",
      icon: Network,
      title: "Network Management",
      description: "Switching/routing, WAN, NAC, policy management.",
      bullets: [
        "Config baselines",
        "Change control",
        "QoS",
        "Network segmentation",
        "NCM backups"
      ],
      outcome: "Stable, policy‑driven networks"
    },
    {
      id: "helpdesk",
      icon: Headphones,
      title: "Helpdesk",
      description: "Multi‑channel L1–L2 support, SLAs, ITSM workflows, knowledge base.",
      bullets: [
        "Ticketing automation",
        "Response SLOs",
        "Root‑cause tracking",
        "Self‑service portal"
      ],
      outcome: "Faster incident resolution (↓MTTR)"
    },
    {
      id: "active-directory-monitoring",
      icon: Users,
      title: "Active Directory Monitoring",
      description: "Entra ID/AD health, sync status, risky sign‑ins, conditional access drifts.",
      bullets: [
        "Replication lag alerts",
        "Lockout trends",
        "CA policy drift",
        "Sync errors"
      ],
      outcome: "Identity posture that stays compliant"
    },
    {
      id: "event-log-monitoring",
      icon: FileText,
      title: "Event Log Monitoring",
      description: "Central log ingestion, correlation, alerting.",
      bullets: [
        "Windows/Linux logs",
        "Syslog",
        "Audit trails",
        "Threshold/behavior rules"
      ],
      outcome: "Faster detection, audited response"
    },
    {
      id: "access-point-solutions",
      icon: Wifi,
      title: "Access Point Solutions",
      description: "Wi‑Fi survey, deployment, optimization, captive portal.",
      bullets: [
        "RF planning",
        "Roaming optimization",
        "Heatmaps",
        "Guest VLANs"
      ],
      outcome: "Reliable, secure wireless at scale"
    },
    {
      id: "firewall-management",
      icon: ShieldCheck,
      title: "Firewall Management",
      description: "Rule reviews, IPS/IDS, VPNs, HA, change management.",
      bullets: [
        "Rule optimization",
        "Threat intelligence",
        "VPN tunnels",
        "HA failover testing"
      ],
      outcome: "Secure perimeter with minimal attack surface"
    },
    {
      id: "collaboration",
      icon: UserPlus,
      title: "Collaboration",
      description: "Managed Microsoft 365, Azure, Google Workspace, and cloud files—kept current and secure so your teams can focus on work.",
      bullets: [
        "Tenant governance & lifecycle",
        "Teams/SharePoint/Drive setup",
        "Security baselines & DLP"
      ],
      outcome: "Enable secure collaboration"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Managed IT Services - 24/7 Monitoring & Support | Systechnosoft</title>
        <meta name="description" content="Comprehensive managed IT services with 24×7 monitoring, SLA-backed support, and automation. Helpdesk, network management, RMM, and security services." />
        <meta name="keywords" content="managed IT services, 24/7 monitoring, helpdesk, network management, RMM, IT support, Systechnosoft" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/managed-it-services" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Managed IT Services - 24/7 Monitoring & Support | Systechnosoft" />
        <meta property="og:description" content="Comprehensive managed IT services with 24×7 monitoring, SLA-backed support, and automation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/services/managed-it-services`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Managed IT Services - 24/7 Monitoring & Support | Systechnosoft" />
        <meta name="twitter:description" content="Comprehensive managed IT services with 24×7 monitoring, SLA-backed support, and automation." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Managed IT Services",
            "provider": {
              "@type": "Organization",
              "name": "Systechnosoft"
            },
            "description": "Comprehensive managed IT services with 24×7 monitoring, SLA-backed support, and automation across your entire IT footprint.",
            "url": `${window.location.origin}/services/managed-it-services`,
            "serviceType": "Managed IT Services"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <ServiceHero
          id="hero"
          dataPage="managed-it-services"
          title="Managed IT Services"
          subtitle="Operate securely with 24×7 visibility, SLA-backed support, and automation across your entire IT footprint."
          uspChips={["24×7 monitoring", "SLA-backed", "Zero‑trust aligned"]}
          primaryButton={{
            text: "IT Network Health Check",
            onClick: openHealthCheck,
            ariaLabel: "Start IT Network Health Check Assessment"
          }}
          secondaryButton={{
            text: "Claim Your Free Insight",
            href: "/contact",
            ariaLabel: "Claim your free IT insight consultation"
          }}
          image={{
            src: new URL('@/assets/hero-managed-it-services-new.avif', import.meta.url).href,
            width: 1270,
            height: 847,
            alt: "Managed IT Services dashboard showing 24/7 monitoring, network management, and security controls",
            placeholderPrompt: "Professional 3D illustration showing IT infrastructure monitoring with servers, network nodes, security shields, and real-time dashboards in a modern tech style with blue and red accents"
          }}
        />

        {/* Service Tiles - Light Background */}
        <section id="mis-services" className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12 md:pb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } }
            }}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={prefersReducedMotion ? {} : {
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  <Card 
                    id={service.id}
                    ref={(el) => (sectionsRef.current[index] = el)}
                    className="flex flex-col h-full bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] will-change-transform hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#E52629]"
                    style={{ scrollMarginTop: '120px' }}
                    tabIndex={0}
                  >
                    <CardHeader className="pb-0 p-0">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-[#E52629]/10 rounded-lg transition-transform will-change-transform hover:rotate-3">
                          <Icon className="h-5 w-5 text-[#E52629]" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="font-montserrat text-lg mb-1.5">
                            {service.title}
                          </CardTitle>
                          <p className="font-inter text-sm text-muted-foreground leading-snug">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 p-0 flex flex-col flex-1">
                      <ul className="space-y-1.5 mb-3 flex-1 ml-[52px]">
                        {service.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-center text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-[#E52629] rounded-full mr-2.5 flex-shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto p-2.5 bg-[#007AFF]/5 rounded-lg">
                        <p className="text-sm font-medium text-[#007AFF]">
                          {service.outcome}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="mt-0 py-12 sm:py-16 lg:py-20 bg-[#E52629] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl mb-6">
              Ready to Transform Your IT Operations?
            </h2>
            <p className="font-inter text-xl text-white/95 mb-8">
              Let's discuss how our managed IT services can improve your uptime, security, and operational efficiency.
            </p>
            <div className="flex justify-center">
              <BookConsultationTrigger 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#E52629] hover:shadow-md focus-visible:ring-2 focus-visible:ring-white px-8 py-4 text-lg font-semibold transition-all"
              >
                Book a consultation
              </BookConsultationTrigger>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}