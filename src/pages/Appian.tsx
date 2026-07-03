import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { 
  ArrowRight, 
  Workflow, 
  Database, 
  Bot, 
  FileText, 
  Globe, 
  Shield,
  Zap,
  Target,
  Clock,
  Activity,
  CheckCircle2,
  LineChart,
  Lock,
  Rocket,
  Users,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CountUpNumber } from "@/components/CountUpNumber";
import { HeroFlipCarousel } from "@/components/HeroFlipCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Appian() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("why-appian");

  const sections = [
    { id: "why-appian", label: "Overview" },
    { id: "capabilities", label: "Capabilities" },
    { id: "approach", label: "Approach" },
    { id: "integrations", label: "Integrations" },
    { id: "insights", label: "Insights" },
    { id: "why-us", label: "Why Us" },
    { id: "faq", label: "FAQ" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for sticky header + nav
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const targetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const heroCapabilities = [
    { id: "process", icon: Workflow, title: "Process Orchestration", description: "BPMN designer, human & system tasks" },
    { id: "data", icon: Database, title: "Data Fabric", description: "Real-time unified data across systems" },
    { id: "ai", icon: Bot, title: "AI & Automation", description: "Copilot, RPA, process mining" },
    { id: "idp", icon: FileText, title: "IDP (Document AI)", description: "Classify & extract structured data" },
    { id: "portals", icon: Globe, title: "Portals & Experiences", description: "Secure public & internal apps" },
    { id: "devops", icon: Shield, title: "DevOps & Governance", description: "CI/CD, audit, access controls" },
  ];

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggeredFadeUp = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  };

  const platformCapabilities = [
    {
      icon: Workflow,
      title: "Process Modeling",
      description: "Drag-and-drop BPMN, human/system tasks"
    },
    {
      icon: Database,
      title: "Data Fabric",
      description: "Virtualize data for real-time views"
    },
    {
      icon: Bot,
      title: "RPA & Integrations",
      description: "Attended/unattended bots, REST/SOAP, JDBC, Kafka"
    },
    {
      icon: Zap,
      title: "AI & Process Mining",
      description: "Copilot guidance, insights, optimization"
    },
    {
      icon: FileText,
      title: "IDP (Document AI)",
      description: "OCR, classify, extract; reduce manual entry"
    },
    {
      icon: Globe,
      title: "Portals & Mobile",
      description: "External/internal sites, theming, SSO"
    },
  ];

  const deliverySteps = [
    {
      number: "1",
      title: "Discover",
      description: "Goals, process maps, value targets"
    },
    {
      number: "2",
      title: "Prototype",
      description: "Rapid UX flows, integration stubs"
    },
    {
      number: "3",
      title: "Build & Test",
      description: "Incremental releases, automated tests"
    },
    {
      number: "4",
      title: "Launch & Operate",
      description: "SLOs, observability, runbooks"
    },
  ];

  const integrations = [
    "Data Fabric", 
    "Process Mining", 
    "IDP", 
    "RPA", 
    "Kafka",
    "MuleSoft", 
    "Salesforce", 
    "SAP", 
    "Microsoft 365",
    "DocuSign", 
    "ServiceNow"
  ];

  const caseStudies = [
    {
      metric: "40%",
      title: "faster workflows",
      description: "Global bank; low-code apps replaced legacy",
      color: "bg-[#E52629]"
    },
    {
      metric: "30%",
      title: "ops efficiency",
      description: "Oil & Gas; automated workforce processes",
      color: "bg-[#007AFF]"
    },
    {
      metric: "50%",
      title: "faster intercompany processing",
      description: "UK FS; standardized approvals",
      color: "bg-[#34C759]"
    },
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Fewer fires, more focus",
      description: "We run the day-to-day so you ship features"
    },
    {
      icon: Lock,
      title: "Security first",
      description: "Guardrails by default; audit-ready"
    },
    {
      icon: Activity,
      title: "Predictable ops",
      description: "Runbooks, SLOs, clear escalation"
    },
    {
      icon: LineChart,
      title: "Costs under control",
      description: "Optimize spend without slowing delivery"
    },
  ];

  const faqs = [
    {
      question: "How fast can we ship MVPs on Appian?",
      answer: "6–8 weeks is typical for a well-scoped MVP with clear requirements and stakeholder alignment."
    },
    {
      question: "Where does Appian run?",
      answer: "Appian Cloud or your cloud (AWS/Azure/GCP) or hybrid deployment models are all supported."
    },
    {
      question: "How do you handle integrations?",
      answer: "API-first approach with prebuilt connectors and event streams for seamless system integration."
    },
    {
      question: "How do you secure data?",
      answer: "RBAC, SSO, encryption, audit logs with compliant delivery following industry best practices."
    },
    {
      question: "Do you migrate from legacy systems?",
      answer: "Yes: identity/content/data/app migrations with zero-downtime strategies and rollback plans."
    },
    {
      question: "What does success look like?",
      answer: "Measurable KPIs including cycle time reduction, error rate improvement, and CSAT scores."
    },
  ];

  return (
    <>
      <Helmet>
        <title>Appian Services — Low-Code Automation, Process, Data & AI | Systechnosoft</title>
        <meta name="description" content="Design, build, and run enterprise apps faster with Appian. Process orchestration, Data Fabric, RPA, IDP, and AI—implemented by certified engineers with secure, compliant delivery." />
        <meta property="og:title" content="Appian Services — Low-Code Automation, Process, Data & AI | Systechnosoft" />
        <meta property="og:description" content="Design, build, and run enterprise apps faster with Appian. Process orchestration, Data Fabric, RPA, IDP, and AI—implemented by certified engineers with secure, compliant delivery." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/appian" />
      </Helmet>


      {/* Hero Section */}
      <section id="overview" className="hero-animated relative min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="hero-animated__bg">
          <div className="hero-animated__bg-glow" />
          {!shouldReduceMotion && (
            <motion.div
              className="hero-animated__bg-rotation"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={staggeredFadeUp}
            initial="hidden"
            animate="visible"
          >
            {/* Left: Copy */}
            <div className="space-y-6">
              <motion.h1 variants={fadeUpVariants} className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                Appian done right—secure, efficient, production-ready
              </motion.h1>
              
              <motion.p variants={fadeUpVariants} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Plan, build, and run on Appian with unified <strong>process, data, and AI</strong>—so your teams can ship outcomes faster with governance built in.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="flex flex-wrap gap-3"
                aria-label="Key benefits"
              >
                {["Low-code speed", "Process + Data in one", "Security & compliance"].map((badge, idx) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.35 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="text-sm px-4 py-2 bg-white/80 border-[#E6E6E6] text-[#1C1C1C] hover:shadow-sm transition-shadow"
                    >
                      {badge}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('why-appian');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  See what we deliver →
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                >
                  <Link to="/contact?type=consultation">Claim your free insight</Link>
                </Button>
              </motion.div>
            </div>

            {/* Right Content - Hero Image */}
            <motion.div variants={fadeUpVariants} className="relative">
              <img 
                src={new URL('@/assets/hero-appian-new.avif', import.meta.url).href}
                alt="Appian low-code automation platform interface"
                width={1270}
                height={847}
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sticky subsection navigation - moved below hero */}
      <nav className="hidden lg:block sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center overflow-x-auto py-4 space-x-8 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200",
                  activeSection === section.id
                    ? "bg-[#E52629] text-white shadow-md"
                    : "text-gray-600 hover:text-[#E52629] hover:bg-gray-100"
                )}
                aria-current={activeSection === section.id ? "true" : undefined}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Why Appian + Systechnosoft - Metric Pills */}
      <section id="why-appian" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center text-[#1C1C1C] mb-12">
            Why Appian + Systechnosoft
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#E52629] mb-2">
                <CountUpNumber end={12} duration={1400} suffix=" weeks" />
              </div>
              <p className="text-[#3C3C3C] text-sm">Pilot to production</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-[#E52629] mb-2">
                <CountUpNumber end={30} duration={1400} suffix="%" />
              </div>
              <p className="text-[#3C3C3C] text-sm">Operational efficiency gains</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-[#E52629] mb-2">
                <CountUpNumber end={99.95} duration={1400} suffix="%" startSeed={99} />
              </div>
              <p className="text-[#3C3C3C] text-sm">Uptime targets with managed ops</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-[#E52629] mb-2">
                2h
              </div>
              <p className="text-[#3C3C3C] text-sm">P1 incident response SLA</p>
            </div>
          </div>

          <p className="text-center text-sm text-[#3C3C3C] mt-8">
            Certified engineers, clear runbooks, security guardrails.
          </p>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section id="capabilities" className="py-16 bg-[#F5F5F5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center text-[#1C1C1C] mb-12">
            Platform Capabilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {platformCapabilities.map((capability, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-[#E52629]/10 flex items-center justify-center mb-4">
                    <capability.icon className="w-6 h-6 text-[#E52629]" />
                  </div>
                  <CardTitle className="text-lg font-montserrat font-bold text-[#1C1C1C]">
                    {capability.title}
                  </CardTitle>
                  <CardDescription className="text-[#3C3C3C]">
                    {capability.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-[#3C3C3C] bg-white rounded-lg py-3 px-4 border border-[#E6E6E6]">
            Governance, audit, RBAC, and CI/CD are first-class.
          </p>
        </div>
      </section>

      {/* Our Delivery Approach */}
      <section id="approach" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center text-[#1C1C1C] mb-4">
            Our Delivery Approach
          </h2>
          <p className="font-inter text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Four-pillar model covering Appian's full stack
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-6 lg:gap-4 items-stretch">
            {/* Card 1: Process Modeling */}
            <div className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
              <div className="bg-blue-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                <Workflow className="h-12 w-12 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Process Modeling</h3>
              <p className="text-base text-gray-600 flex-1">Drag‑and‑drop BPMN, human/system tasks, SLA timers</p>
            </div>
            
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-gray-300" />
            </div>
            
            {/* Card 2: Data Fabric */}
            <div className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
              <div className="bg-green-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                <Database className="h-12 w-12 text-green-600 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Data Fabric</h3>
              <p className="text-base text-gray-600 flex-1">Virtualize/union data for unified, real‑time views</p>
            </div>
            
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-gray-300" />
            </div>
            
            {/* Card 3: Automation & Integrations */}
            <div className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
              <div className="bg-purple-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                <Bot className="h-12 w-12 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Automation & Integrations</h3>
              <p className="text-base text-gray-600 flex-1">RPA, REST/SOAP/JDBC, event streams</p>
            </div>
            
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-gray-300" />
            </div>
            
            {/* Card 4: DevOps & Governance */}
            <div className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
              <div className="bg-red-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                <Shield className="h-12 w-12 text-red-600 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">DevOps & Governance</h3>
              <p className="text-base text-gray-600 flex-1">Packages, environments, promotion, guardrails</p>
            </div>
          </div>

          <p className="font-inter text-center text-gray-600 mt-12 max-w-2xl mx-auto">
            We follow agile sprints, incorporating user feedback early and often.
          </p>
        </div>
      </section>

      {/* Accelerators & Integrations */}
      <section id="integrations" className="py-16 bg-[#F5F5F5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center text-[#1C1C1C] mb-12">
            Accelerators & Integrations
          </h2>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-3 justify-center flex-wrap">
              {integrations.map((integration, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-2 text-sm bg-white text-[#3C3C3C] border border-[#E6E6E6] hover:border-[#E52629] hover:text-[#E52629] transition-colors"
                >
                  {integration}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center text-[#1C1C1C] mb-12">
            Insights
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <Card className="bg-white border-2 border-gray-200 text-center hover:border-[#E52629] transition-colors duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#FDE8E8] text-[#E52629] rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="text-4xl font-montserrat font-bold text-[#E52629] mb-2">
                  40%
                </div>
                <CardTitle className="font-montserrat text-xl text-[#1C1C1C]">
                  faster workflows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-gray-600 text-sm">
                  Banking sector, Australia
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-white border-2 border-gray-200 text-center hover:border-[#E52629] transition-colors duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#FDE8E8] text-[#E52629] rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <div className="text-4xl font-montserrat font-bold text-[#E52629] mb-2">
                  30%
                </div>
                <CardTitle className="font-montserrat text-xl text-[#1C1C1C]">
                  ops efficiency improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-gray-600 text-sm">
                  Oil & Gas, United States
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="bg-white border-2 border-gray-200 text-center hover:border-[#E52629] transition-colors duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#FDE8E8] text-[#E52629] rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <div className="text-4xl font-montserrat font-bold text-[#E52629] mb-2">
                  50%
                </div>
                <CardTitle className="font-montserrat text-xl text-[#1C1C1C]">
                  faster intercompany processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-gray-600 text-sm">
                  Financial Services, UK
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/case-studies?tag=appian">
                View detailed case studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Systechnosoft */}
      <section id="why-us" className="py-16 bg-[#F5F5F5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center text-[#1C1C1C] mb-12">
            Why Choose Systechnosoft
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="bg-white border-2 border-gray-200 text-center hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-[#E52629]/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-[#E52629]" />
                  </div>
                  <CardTitle className="text-lg font-montserrat font-bold text-[#1C1C1C]">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-[#3C3C3C]">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center text-[#1C1C1C] mb-12">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border">
                <AccordionTrigger className="px-6 py-4 text-left font-montserrat font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 font-inter text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#E52629]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to accelerate your Appian journey?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Let's discuss a roadmap to ship measurable outcomes fast—safely and at scale.
          </p>
          <BookConsultationTrigger 
            className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#E52629] hover:shadow-md focus-visible:ring-2 focus-visible:ring-white px-8 py-4 text-lg font-semibold transition-all"
          >
            Book a consultation
          </BookConsultationTrigger>
        </div>
      </section>
    </>
  );
}
