import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Server, Code, Bot, CheckCircle, TrendingUp, Shield, Users, Building2, Zap, Plane } from "lucide-react";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WhyFeatureSlider from "@/components/WhyFeatureSlider";
import IndustryCarousel from "@/components/IndustryCarousel";
import { HeroBackground } from "@/components/HeroMotionSystem";
import { CountUpNumber } from "@/components/CountUpNumber";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Server,
    title: "IT Infrastructure",
    description: "Modernize networks, cloud, and devices with 24×7 managed support.",
    href: "/services/managed-it-services",
    cta: "Explore"
  },
  {
    icon: Code,
    title: "Low-code Apps",
    description: "Build enterprise apps faster on Appian & Salesforce.",
    href: "/services/bpa",
    cta: "Explore"
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Automate workflows with SDKs, Zapier, and Make.",
    href: "/services/ai-development-integration",
    cta: "Explore"
  }
];

const whyPoints = [
  {
    icon: TrendingUp,
    text: "Outcome-first: measurable gains in speed, cost, and compliance"
  },
  {
    icon: Users,
    text: "India-first delivery, global standards"
  },
  {
    icon: Shield,
    text: "Security & governance by design"
  },
  {
    icon: CheckCircle,
    text: "Scalable engagement models"
  }
];

const caseStudies = [
  {
    title: "Global Bank (AU)",
    metric: "40%",
    description: "Faster trading workflows; stronger compliance",
    href: "/case-studies"
  },
  {
    title: "Oil & Gas (USA)",
    metric: "30%",
    description: "Workforce ops efficiency via automation",
    href: "/case-studies"
  },
  {
    title: "Financial Services (UK)",
    metric: "50%",
    description: "Faster intercompany processing; fewer exceptions",
    href: "/case-studies"
  }
];

const industryOutcomes = [
  {
    metric: "40%",
    description: "faster trading lifecycle",
    region: "Banking · AU",
    industry: "BFSI",
    bgColor: "bg-[#FFE7E8]",
    textColor: "text-[#E52629]"
  },
  {
    metric: "30%",
    description: "efficiency in workforce ops",
    region: "Oil & Gas · US",
    industry: "Oil & Gas",
    bgColor: "bg-[#EAF3FF]",
    textColor: "text-[#007AFF]"
  },
  {
    metric: "25%",
    description: "quicker content orchestration",
    region: "Aviation",
    industry: "Aviation",
    bgColor: "bg-[#F7F7F7]",
    textColor: "text-[#1C1C1C]"
  }
];

const industryDetails = {
  "BFSI": {
    icon: Building2,
    title: "BFSI",
    problems: "Legacy F2B workflows; fragmented risk/compliance; manual approvals.",
    solutions: "Appian records & workflows; exception/audit; IAM/SSO; HA/DR infra.",
    outcomes: "40% faster trading lifecycle; stronger compliance; portfolio visibility."
  },
  "Oil & Gas": {
    icon: Zap,
    title: "Oil & Gas",
    problems: "Field compliance; manual scheduling; siloed data.",
    solutions: "Mobile checklists; workforce tracking; telemetry dashboards.",
    outcomes: "30% efficiency gain; better safety & compliance."
  },
  "Aviation": {
    icon: Plane,
    title: "Aviation",
    problems: "Multi‑airport updates; regulatory complexity; multilingual ops.",
    solutions: "Role‑based CMS; audit/versioning; localization; SLA workflows.",
    outcomes: "25% faster content orchestration; consistent compliance."
  }
};

const phaseTooltips = [
  {
    phase: "Discover",
    tooltip: "Map goals, risks, and success metrics; solution outline."
  },
  {
    phase: "Pilot",
    tooltip: "Validate in a limited scope; measure outcomes; refine."
  },
  {
    phase: "Scale",
    tooltip: "Harden, automate, and expand across teams."
  },
  {
    phase: "CoE Advisory",
    tooltip: "Governance, best practices, and enablement."
  }
];

const industries = [
  { name: "BFSI", icon: "🏦" },
  { name: "Oil & Gas", icon: "⚡" },
  { name: "Aviation", icon: "✈️" }
];

const outcomes = [
  { metric: "40%", description: "Average reduction in process time" },
  { metric: "30%", description: "Operational efficiency gains" },
  { metric: "50%", description: "Faster application delivery" },
  { metric: "24/7", description: "Managed infrastructure support" }
];


export default function Home() {
  const [selectedIndustry, setSelectedIndustry] = useState<keyof typeof industryDetails>("BFSI");
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const carouselTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Carousel autoplay resume timer
  useEffect(() => {
    if (isCarouselPaused) {
      // Clear any existing timer
      if (carouselTimerRef.current) {
        clearTimeout(carouselTimerRef.current);
      }
      // Set 10-second timer to resume autoplay
      carouselTimerRef.current = setTimeout(() => {
        setIsCarouselPaused(false);
      }, 10000);
    }
    
    return () => {
      if (carouselTimerRef.current) {
        clearTimeout(carouselTimerRef.current);
      }
    };
  }, [isCarouselPaused]);
  
  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Systechnosoft Technologies - Maximize Innovation. Minimize Code.</title>
        <meta
          name="description"
          content="Enterprise IT solutions across Infrastructure, Low-code (Appian & Salesforce), and AI/Automation. 40% faster delivery, 30% cost efficiency, 24/7 support. Transform your business today."
        />
        <link rel="canonical" href="https://www.systechnosoft.com/" />
        <meta property="og:title" content="Systechnosoft Technologies - Maximize Innovation. Minimize Code." />
        <meta
          property="og:description"
          content="Enterprise IT solutions across Infrastructure, Low-code (Appian & Salesforce), and AI/Automation. 40% faster delivery, 30% cost efficiency, 24/7 support."
        />
        <meta property="og:url" content="https://www.systechnosoft.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.systechnosoft.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Systechnosoft Technologies - Maximize Innovation. Minimize Code." />
        <meta
          name="twitter:description"
          content="Enterprise IT solutions across Infrastructure, Low-code (Appian & Salesforce), and AI/Automation. 40% faster delivery, 30% cost efficiency."
        />
        <meta name="twitter:image" content="https://www.systechnosoft.com/og-image.png" />
      </Helmet>
      
      {/* Hero Section */}
      <HeroBackground>
        <section 
          id="hero"
          className="relative min-h-[80vh] lg:min-h-screen flex items-center py-24 overflow-visible"
        >
          <div className="max-w-[960px] mx-auto px-6 sm:px-6 lg:px-8">
            <div className="bg-white/70 backdrop-blur-[2px] border-2 border-[#E52629] rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.04)] box-border">
              <div className="text-center flex flex-col gap-y-5 sm:gap-y-6 md:gap-y-8">
                <h1 
                  className="font-montserrat font-bold text-[#1C1C1C] leading-tight"
                  style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}
                >
                  Maximize Innovation.{" "}
                  <span className="text-[#E52629]">
                    Minimize Code.
                  </span>
                </h1>
                
                <p 
                  className="text-[#3C3C3C] leading-relaxed max-w-3xl mx-auto"
                  style={{ fontSize: 'clamp(16px, 2.4vw, 20px)' }}
                >
                  Enterprise IT solutions across Infrastructure, Low-code (Appian & Salesforce), 
                  and AI/Automation — delivered fast, securely, and at scale.
                </p>
                
                <div className="flex justify-center mt-2">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white px-8 py-4 text-lg font-semibold hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] transition-all focus-visible:outline-2 focus-visible:outline-[#E52629]"
                    asChild
                  >
                    <a href="/contact">Get Started</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBackground>

      {/* Three Pillars */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
              Three Pillars of Digital Transformation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions designed to accelerate your enterprise modernization journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => {
              const colors = [
                { bg: 'hover:bg-[#007AFF]/5', border: 'hover:border-[#007AFF]/30', icon: 'group-hover:text-[#007AFF]', glow: 'group-hover:shadow-[0_0_20px_rgba(0,122,255,0.2)]' },
                { bg: 'hover:bg-[#8B5CF6]/5', border: 'hover:border-[#8B5CF6]/30', icon: 'group-hover:text-[#8B5CF6]', glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]' },
                { bg: 'hover:bg-[#E52629]/5', border: 'hover:border-[#E52629]/30', icon: 'group-hover:text-[#E52629]', glow: 'group-hover:shadow-[0_0_20px_rgba(229,38,41,0.2)]' }
              ];
              const color = colors[index];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                >
                  <Card className={`card-enterprise group cursor-pointer flex flex-col h-full transition-all duration-300 hover:-translate-y-1 border-2 border-gray-200 hover:border-[#E52629] transition-colors ${color.glow}`}>
                    <CardHeader className="text-center pb-4">
                      <motion.div 
                        className={`w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${color.bg}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <pillar.icon className={`h-8 w-8 text-primary transition-all duration-300 ${color.icon}`} />
                      </motion.div>
                      <CardTitle className="text-xl font-montserrat font-bold">
                        {pillar.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center flex flex-col flex-grow">
                      <CardDescription className="text-base mb-6 flex-grow">
                        {pillar.description}
                      </CardDescription>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-all duration-200 ease-out motion-reduce:transition-none"
                        asChild
                      >
                        <Link 
                          to={pillar.href}
                          aria-label={`${pillar.cta} ${pillar.title} services`}
                        >
                          {pillar.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Systechnosoft */}
      <section 
        id="why"
        aria-labelledby="why-title"
        className="py-14 sm:py-16 lg:py-20 bg-white"
      >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          id="why-title"
          className="text-3xl md:text-4xl font-montserrat font-bold text-[#1C1C1C] mb-4"
        >
          Why Systechnosoft
        </h2>
        <p className="text-xl text-[#3C3C3C] mb-8 max-w-[840px] mx-auto">
          We deliver measurable outcomes with proven methods, secure architectures, and deep domain expertise across Infrastructure, Low-code, and AI.
        </p>

        {/* KPI Pills */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 place-items-stretch">
          <div className="bg-[#FFE7E8] rounded-[28px] border-2 border-gray-200 hover:border-[#E52629] px-6 py-4 text-center shadow-md hover:shadow-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2">
            <span className="text-2xl font-montserrat font-bold text-[#E52629]">40%</span>
            <span className="text-[#1C1C1C] text-sm ml-2">faster F2B trading workflows (Banking, AU)</span>
          </div>
          <div className="bg-[#EAF3FF] rounded-[28px] border-2 border-gray-200 hover:border-[#E52629] px-6 py-4 text-center shadow-md hover:shadow-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2">
            <span className="text-2xl font-montserrat font-bold text-[#007AFF]">30%</span>
            <span className="text-[#1C1C1C] text-sm ml-2">efficiency gain in workforce ops (Oil & Gas, US)</span>
          </div>
          <div className="bg-[#FFE7E8] rounded-[28px] border-2 border-gray-200 hover:border-[#E52629] px-6 py-4 text-center shadow-md hover:shadow-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2">
            <span className="text-2xl font-montserrat font-bold text-[#E52629]">20%</span>
            <span className="text-[#1C1C1C] text-sm ml-2">HR cost reduction (UK)</span>
          </div>
          <div className="bg-[#EAF3FF] rounded-[28px] border-2 border-gray-200 hover:border-[#E52629] px-6 py-4 text-center shadow-md hover:shadow-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2">
            <span className="text-2xl font-montserrat font-bold text-[#007AFF]">50%</span>
            <span className="text-[#1C1C1C] text-sm ml-2">faster intercompany processing (UK FS)</span>
          </div>
        </div>

        {/* Process Stepper with inline messages */}
        <div className="mt-8 relative">
          <div 
            className="grid items-center justify-center gap-x-4 gap-y-0"
            style={{ 
              gridTemplateColumns: 'auto 1fr auto 1fr auto 1fr auto' 
            }}
          >
            {/* Discover */}
            <div 
              className="flex flex-col items-center cursor-pointer justify-self-center"
              onMouseEnter={() => setActivePhase(0)}
              onMouseLeave={() => setActivePhase(null)}
              onFocus={() => setActivePhase(0)}
              onBlur={() => setActivePhase(null)}
              tabIndex={0}
              role="button"
              aria-label={`${phaseTooltips[0].phase}: ${phaseTooltips[0].tooltip}`}
            >
              <div className="w-8 h-8 grid place-items-center rounded-full bg-[#E52629] text-white text-xs font-semibold transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E52629] focus:ring-offset-2 motion-reduce:transition-none">
                1
              </div>
              <div className="mt-2 text-sm font-medium text-[#1C1C1C] whitespace-nowrap">{phaseTooltips[0].phase}</div>
            </div>

            {/* Lane A - Discover message (LTR) */}
            <div className="flex items-center justify-center min-h-[60px]" aria-live="polite">
              {activePhase === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg px-3 py-2 text-xs text-[#1C1C1C] shadow-sm max-w-[200px] motion-reduce:transition-none"
                >
                  <strong className="font-semibold text-[#E52629]">{phaseTooltips[0].phase}:</strong>{" "}
                  {phaseTooltips[0].tooltip}
                </motion.div>
              )}
            </div>

            {/* Pilot */}
            <div 
              className="flex flex-col items-center cursor-pointer justify-self-center"
              onMouseEnter={() => setActivePhase(1)}
              onMouseLeave={() => setActivePhase(null)}
              onFocus={() => setActivePhase(1)}
              onBlur={() => setActivePhase(null)}
              tabIndex={0}
              role="button"
              aria-label={`${phaseTooltips[1].phase}: ${phaseTooltips[1].tooltip}`}
            >
              <div className="w-8 h-8 grid place-items-center rounded-full bg-[#E52629] text-white text-xs font-semibold transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E52629] focus:ring-offset-2 motion-reduce:transition-none">
                2
              </div>
              <div className="mt-2 text-sm font-medium text-[#1C1C1C] whitespace-nowrap">{phaseTooltips[1].phase}</div>
            </div>

            {/* Lane B - Pilot (LTR) or Scale (RTL) message */}
            <div className="flex items-center justify-center min-h-[60px]" aria-live="polite">
              {activePhase === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg px-3 py-2 text-xs text-[#1C1C1C] shadow-sm max-w-[200px] motion-reduce:transition-none"
                >
                  <strong className="font-semibold text-[#E52629]">{phaseTooltips[1].phase}:</strong>{" "}
                  {phaseTooltips[1].tooltip}
                </motion.div>
              )}
              {activePhase === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg px-3 py-2 text-xs text-[#1C1C1C] shadow-sm max-w-[200px] motion-reduce:transition-none"
                >
                  <strong className="font-semibold text-[#E52629]">{phaseTooltips[2].phase}:</strong>{" "}
                  {phaseTooltips[2].tooltip}
                </motion.div>
              )}
            </div>

            {/* Scale */}
            <div 
              className="flex flex-col items-center cursor-pointer justify-self-center"
              onMouseEnter={() => setActivePhase(2)}
              onMouseLeave={() => setActivePhase(null)}
              onFocus={() => setActivePhase(2)}
              onBlur={() => setActivePhase(null)}
              tabIndex={0}
              role="button"
              aria-label={`${phaseTooltips[2].phase}: ${phaseTooltips[2].tooltip}`}
            >
              <div className="w-8 h-8 grid place-items-center rounded-full bg-[#E52629] text-white text-xs font-semibold transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E52629] focus:ring-offset-2 motion-reduce:transition-none">
                3
              </div>
              <div className="mt-2 text-sm font-medium text-[#1C1C1C] whitespace-nowrap">{phaseTooltips[2].phase}</div>
            </div>

            {/* Lane C - CoE Advisory message (RTL) */}
            <div className="flex items-center justify-center min-h-[60px]" aria-live="polite">
              {activePhase === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg px-3 py-2 text-xs text-[#1C1C1C] shadow-sm max-w-[200px] motion-reduce:transition-none"
                >
                  <strong className="font-semibold text-[#E52629]">{phaseTooltips[3].phase}:</strong>{" "}
                  {phaseTooltips[3].tooltip}
                </motion.div>
              )}
            </div>

            {/* CoE Advisory */}
            <div 
              className="flex flex-col items-center cursor-pointer justify-self-center"
              onMouseEnter={() => setActivePhase(3)}
              onMouseLeave={() => setActivePhase(null)}
              onFocus={() => setActivePhase(3)}
              onBlur={() => setActivePhase(null)}
              tabIndex={0}
              role="button"
              aria-label={`${phaseTooltips[3].phase}: ${phaseTooltips[3].tooltip}`}
            >
              <div className="w-8 h-8 grid place-items-center rounded-full bg-[#E52629] text-white text-xs font-semibold transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E52629] focus:ring-offset-2 motion-reduce:transition-none">
                4
              </div>
              <div className="mt-2 text-sm font-medium text-[#1C1C1C] whitespace-nowrap">{phaseTooltips[3].phase}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 h-px bg-[#E6E6E6]"></div>

        {/* CTA */}
        <div className="mt-6 flex justify-center">
          <Button
            size="lg"
            className="bg-[#E52629] text-white hover:bg-[#E52629]/90 text-lg px-8 py-4 focus-visible:outline-2 focus-visible:outline-[#E52629]"
            asChild
          >
            <Link to="/contact" aria-label="Get a Quotation">
              Get a Quotation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
              Featured Case Studies
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real outcomes delivered for global enterprises across industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                <Card className="card-enterprise group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:scale-[1.02] border-2 border-gray-200 hover:border-[#E52629] flex flex-col h-full">
                  <CardHeader className="flex-none">
                    <div className="text-center">
                      <CardTitle className="text-lg font-montserrat font-bold min-h-[3.5rem] flex items-center justify-center mb-3">
                        {study.title}
                      </CardTitle>
                      <motion.div 
                        className="text-4xl font-montserrat font-bold text-primary"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CountUpNumber end={parseInt(study.metric)} duration={1500} suffix="%" startSeed={0} />
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center flex flex-col flex-1">
                    <CardDescription className="text-base mb-6 flex-1 min-h-[3rem] flex items-center justify-center">
                      {study.description}
                    </CardDescription>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors mt-auto"
                      asChild
                    >
                      <Link to={study.href}>
                        Know more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section 
        id="industries" 
        aria-labelledby="industries-title"
        className="py-8 sm:py-10 lg:py-12 bg-white"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 items-start">
            {/* Left Column - Outcome Chips */}
            <div className="lg:max-w-[640px]">
              <div className="text-left">
                <h2 
                  id="industries-title"
                  className="text-3xl md:text-4xl font-montserrat font-bold text-[#1C1C1C] mb-3"
                >
                  Industries We Serve
                </h2>
                <p className="text-xl text-[#3C3C3C] mb-6 max-w-2xl">
                  We pair domain knowledge with secure architectures to ship measurable outcomes fast.
                </p>

                {/* Interactive Outcome Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                  {industryOutcomes.slice(0, 2).map((outcome, index) => (
                    <motion.div
                      key={index}
                      className={`${outcome.bgColor} rounded-[32px] border-2 border-gray-200 hover:border-[#E52629] px-5 py-3.5 min-h-[96px] flex items-center justify-center text-center shadow-md hover:shadow-lg cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#E52629] focus:ring-offset-2`}
                      onMouseEnter={() => {
                        setSelectedIndustry(outcome.industry as keyof typeof industryDetails);
                        setIsCarouselPaused(true);
                      }}
                      onFocus={() => {
                        setSelectedIndustry(outcome.industry as keyof typeof industryDetails);
                        setIsCarouselPaused(true);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${outcome.metric} ${outcome.description} in ${outcome.region}`}
                    >
                      <div>
                        <span className={`text-2xl font-montserrat font-bold ${outcome.textColor}`}>
                          {outcome.metric}
                        </span>
                        <span className="text-[#1C1C1C] text-sm ml-2 block sm:inline">
                          {outcome.description}
                        </span>
                        <div className="text-xs text-[#3C3C3C] mt-1">
                          ({outcome.region})
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {/* Full-width Aviation chip */}
                  <motion.div
                    className="sm:col-span-2 bg-[#F7F7F7] rounded-[32px] border-2 border-gray-200 hover:border-[#E52629] px-5 py-3.5 min-h-[96px] flex items-center justify-center text-center shadow-md hover:shadow-lg cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#E52629] focus:ring-offset-2"
                    onMouseEnter={() => {
                      setSelectedIndustry("Aviation");
                      setIsCarouselPaused(true);
                    }}
                    onFocus={() => {
                      setSelectedIndustry("Aviation");
                      setIsCarouselPaused(true);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="25% quicker content orchestration in Aviation"
                  >
                    <div>
                      <span className="text-2xl font-montserrat font-bold text-[#1C1C1C]">
                        25%
                      </span>
                      <span className="text-[#1C1C1C] text-sm ml-2 block sm:inline">
                        quicker content orchestration
                      </span>
                      <div className="text-xs text-[#3C3C3C] mt-1">
                        (Aviation)
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Column - Industry Detail Card */}
            <motion.div 
              className="lg:max-w-[560px] self-start"
              key={selectedIndustry}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <div className="h-auto bg-white/70 backdrop-blur-[2px] border-2 border-[#E52629] rounded-2xl p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] motion-reduce:transition-none">
                <div className="text-center pb-3">
                  <div className="w-16 h-16 bg-[#F7F7F7] border border-[#E6E6E6] rounded-full flex items-center justify-center mx-auto mb-3">
                    {(() => {
                      const IconComponent = industryDetails[selectedIndustry].icon;
                      return <IconComponent className="h-8 w-8 text-[#E52629]" aria-hidden="true" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-[#1C1C1C] mb-0">
                    {industryDetails[selectedIndustry].title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-[#E52629] mb-2">Problems</h4>
                    <p className="text-sm text-[#3C3C3C] mb-0">{industryDetails[selectedIndustry].problems}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#E52629] mb-2">Solutions</h4>
                    <p className="text-sm text-[#3C3C3C] mb-0">{industryDetails[selectedIndustry].solutions}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#E52629] mb-2">Outcomes</h4>
                    <p className="text-sm text-[#3C3C3C] mb-0">{industryDetails[selectedIndustry].outcomes}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Clients Achieve */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
              What Clients Achieve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Measurable outcomes that drive business transformation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-4">
                <CountUpNumber end={40} duration={1200} suffix="%" startSeed={10} />
              </div>
              <p className="text-sm text-muted-foreground">
                Average reduction in process time
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-4">
                <CountUpNumber end={30} duration={1200} suffix="%" startSeed={10} />
              </div>
              <p className="text-sm text-muted-foreground">
                Operational efficiency gains
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-4">
                <CountUpNumber end={50} duration={1200} suffix="%" startSeed={10} />
              </div>
              <p className="text-sm text-muted-foreground">
                Faster application delivery
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-4">
                <CountUpNumber end={24} duration={1000} startSeed={10} />/7
              </div>
              <p className="text-sm text-muted-foreground">
                Managed infrastructure support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-primary-foreground mb-6">
            Ready to accelerate your transformation?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Let's discuss how we can help maximize your innovation while minimizing complexity
          </p>
          <BookConsultationTrigger 
            className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#E52629] hover:shadow-md focus-visible:ring-2 focus-visible:ring-white px-8 py-4 text-lg font-semibold transition-all"
          >
            Book a consultation
          </BookConsultationTrigger>
        </div>
      </section>
    </div>
  );
}