import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion, useInView } from "framer-motion";
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
  Settings,
  Layers,
  Eye,
  RefreshCw,
  Play,
  Pause
} from "lucide-react";
import heroBpaImage from "@/assets/hero-bpa.avif";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useConsultationStore } from "@/lib/consultation-store";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";

// KPI Counter Component
function KpiCounter({ label, sublabel }: { label: string; sublabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="text-center p-5 bg-white rounded-2xl shadow-md border-2 border-gray-200 hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl md:text-2xl font-bold text-[#E52629] mb-2">{label}</p>
        <p className="text-sm text-muted-foreground">{sublabel}</p>
      </motion.div>
    </div>
  );
}

export default function BusinessProcessAutomation() {
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const { openCalendly } = useConsultationStore();
  const navigate = useNavigate();

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
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

  const capabilities = [
    { icon: Workflow, title: "Workflow orchestration", description: "Approvals, routing, escalations" },
    { icon: FileText, title: "Case management", description: "SLA tracking, exceptions handling" },
    { icon: Database, title: "Document & data intake", description: "Forms, validations, capture" },
    { icon: Globe, title: "Integrations", description: "ERP/CRM/Email/Identity; API-first" },
    { icon: Bot, title: "RPA augmentation", description: "Bots for repetitive steps where needed" },
    { icon: Shield, title: "Compliance & controls", description: "Audit logs, segregation of duties" },
    { icon: LineChart, title: "Analytics & visibility", description: "Dashboards, bottleneck insights" },
    { icon: RefreshCw, title: "Change-ready design", description: "Configurable rules, reusable patterns" },
  ];

  const platforms = [
    { id: "appian", name: "Appian", hasPage: true },
    { id: "pega", name: "Pega", hasPage: false },
    { id: "outsystems", name: "OutSystems", hasPage: false },
    { id: "creatio", name: "Creatio", hasPage: false },
  ];

  const deliverySteps = [
    {
      number: "1",
      title: "Discover & map",
      bullets: ["Process mining & pain point analysis", "KPI baseline & value targets"]
    },
    {
      number: "2",
      title: "Build & integrate",
      bullets: ["Low-code delivery & API integrations", "Controls & validations built-in"]
    },
    {
      number: "3",
      title: "Operate & optimize",
      bullets: ["Monitoring & performance tuning", "Iterations & governance reviews"]
    },
  ];

  const governanceItems = [
    { icon: Lock, title: "Role-based access", description: "Least privilege by default" },
    { icon: Eye, title: "Audit trails", description: "Change logging and compliance" },
    { icon: Settings, title: "Environment promotion", description: "Release gates and controls" },
    { icon: Database, title: "Data handling", description: "Retention + consent workflows" },
    { icon: Shield, title: "Integration security", description: "Tokens and secrets management" },
    { icon: Activity, title: "Performance guardrails", description: "Limits and monitoring" },
    { icon: Layers, title: "Accessibility", description: "End-user UI compliance" },
    { icon: RefreshCw, title: "Continuous improvement", description: "Ongoing optimization cycles" }
  ];

  const faqs = [
    {
      question: "What is Business Process Automation?",
      answer: "Business Process Automation (BPA) uses technology to automate repetitive, manual business processes. It streamlines workflows, reduces errors, and frees up your team to focus on higher-value work. BPA can include everything from simple approval routing to complex case management across multiple systems."
    },
    {
      question: "When should we use low-code vs custom development?",
      answer: "Low-code is ideal when you need speed-to-market, business user involvement, and flexibility for frequent changes. Custom development makes sense for highly unique requirements, extreme performance needs, or when you need capabilities not available in low-code platforms. Often, a hybrid approach works best."
    },
    {
      question: "Can BPA work with our existing ERP/CRM?",
      answer: "Yes. Modern BPA platforms are built API-first and include pre-built connectors for SAP, Salesforce, Microsoft Dynamics, ServiceNow, and hundreds of other systems. We design integrations that respect your existing data architecture and security requirements."
    },
    {
      question: "How do you handle governance and compliance?",
      answer: "We build governance into every solution: role-based access, audit logging, change control workflows, and data retention policies. For regulated industries, we implement controls aligned with SOX, HIPAA, GDPR, or your specific compliance requirements."
    },
    {
      question: "How fast can we launch a first workflow?",
      answer: "A well-scoped pilot workflow can go live in 4-8 weeks. This includes discovery, design, build, testing, and deployment. Complex enterprise rollouts take longer, but we always recommend starting with a high-impact pilot to prove value quickly."
    },
    {
      question: "Do you provide managed support after go-live?",
      answer: "Yes. We offer tiered support from on-demand assistance to fully managed operations. This includes monitoring, incident response, performance optimization, and ongoing enhancements as your business evolves."
    },
    {
      question: "Can we start with Appian and expand later?",
      answer: "Absolutely. Many clients start with Appian for its strong case management and governance capabilities, then expand to other platforms based on specific use cases. Our platform-agnostic approach means we help you choose the right tool for each job."
    },
  ];

  const scrollToPlatform = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Business Process Automation Services | Low-Code BPA | Systechnosoft</title>
        <meta name="description" content="Automate approvals, case work, and handoffs across teams with low-code BPA. Reduce cycle time, improve accuracy, and strengthen compliance with Appian, Pega, OutSystems, and Creatio." />
        <meta property="og:title" content="Business Process Automation Services | Low-Code BPA | Systechnosoft" />
        <meta property="og:description" content="Automate approvals, case work, and handoffs across teams with low-code BPA. Reduce cycle time, improve accuracy, and strengthen compliance." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/bpa" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-animated relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Animated Background */}
        <div className="hero-animated__bg absolute inset-0 z-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(229,38,41,0.1),transparent)]" />
          {!shouldReduceMotion && !isPaused && (
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent, hsl(var(--primary)), transparent)`,
                backgroundSize: "400px 400px"
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={staggeredFadeUp}
            initial="hidden"
            animate="visible"
          >
            {/* Left: Copy */}
            <div className="space-y-6">
              <motion.h1 
                variants={fadeUpVariants} 
                className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl leading-tight"
              >
                Business Process Automation that{" "}
                <span className="text-[#E52629]">moves faster</span>—and{" "}
                <span className="text-[#E52629]">scales safer</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeUpVariants} 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              >
                Automate approvals and handoffs across teams—cut cycle time, improve accuracy, and strengthen compliance with scalable delivery.
              </motion.p>

              {/* Benefit Chips */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="flex flex-wrap gap-3"
                aria-label="Key benefits"
              >
                {["Workflow orchestration", "Compliance-ready", "Integration-first"].map((badge, idx) => (
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

              {/* CTAs */}
              <motion.div 
                variants={fadeUpVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('what-we-automate');
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: shouldReduceMotion ? 'auto' : 'smooth', 
                        block: 'start' 
                      });
                    }
                  }}
                  className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2"
                >
                  What We Automate
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                >
                  Claim your free insight
                </Button>
              </motion.div>
            </div>

            {/* Right: Hero Image with Motion Toggle */}
            <motion.div 
              variants={fadeUpVariants}
              className="relative hidden lg:block group"
            >
              <div className="aspect-[16/10] rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden">
                <img
                  src={heroBpaImage}
                  alt="Abstract workflow automation visual showing connected process nodes, integrations, and compliance checks"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width={1280}
                  height={800}
                />
                {/* Unobtrusive Motion Toggle Overlay */}
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-white/90 border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2"
                  aria-label={isPaused ? "Play hero animation" : "Pause hero animation"}
                >
                  {isPaused ? (
                    <Play className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Pause className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* KPI Ribbon */}
      <section className="py-8 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KpiCounter label="Faster cycle times" sublabel="Weeks to days for key workflows" />
            <KpiCounter label="Fewer manual errors" sublabel="Standardized flows + validations" />
            <KpiCounter label="Audit Ready Delivery" sublabel="Traceability and controls by design" />
          </div>
        </div>
      </section>

      {/* What We Automate */}
      <section id="what-we-automate" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="text-center mb-12"
          >
            <motion.h2 
              variants={fadeUpVariants}
              className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4"
            >
              What We Automate
            </motion.h2>
            <motion.p 
              variants={fadeUpVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Capabilities that transform how your teams work
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.05 }}
              >
                <Card className="h-full rounded-2xl border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629] p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E52629]/10 flex items-center justify-center flex-shrink-0">
                      <cap.icon className="w-5 h-5 text-[#E52629]" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-base text-foreground mb-1">
                        {cap.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{cap.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Delivery Options */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="text-center mb-6"
          >
            <motion.h2 
              variants={fadeUpVariants}
              className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4"
            >
              Platform options for BPA delivery
            </motion.h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => scrollToPlatform(platform.id)}
                className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-[#E52629] hover:text-[#E52629] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629]"
              >
                {platform.name}
              </button>
            ))}
          </div>

          {/* Platform Sections */}
          <div className="space-y-16">
            {/* Appian */}
            <motion.div 
              id="appian"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20 scroll-mt-32"
            >
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">Appian</h3>
              <p className="text-[#E52629] font-medium mb-4">Best for: End-to-end workflows and case management with strong governance.</p>
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">What we deliver:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Process design & application build with low-code
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Integration with ERP, CRM, and legacy systems
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Production rollout & managed support
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <BookConsultationTrigger 
                  className="bg-transparent text-[#E52629] border-2 border-[#E52629] hover:bg-[#E52629] hover:text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#E52629] px-8 py-4 text-lg font-semibold transition-all"
                >
                  Book a Consultation
                </BookConsultationTrigger>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#E52629] px-8 text-lg font-semibold transition-all"
                >
                  <Link to="/services/appian">Go to Appian Services</Link>
                </Button>
              </div>
            </motion.div>

            {/* Pega */}
            <motion.div 
              id="pega"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20 scroll-mt-32"
            >
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">Pega</h3>
              <p className="text-[#E52629] font-medium mb-4">Best for: Complex case management and decision-heavy orchestration.</p>
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">What we deliver:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Process & case design with decision rules
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Rules engine & system integrations
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Hardening & run support
                  </li>
                </ul>
              </div>
              <BookConsultationTrigger 
                className="bg-transparent text-[#E52629] border-2 border-[#E52629] hover:bg-[#E52629] hover:text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#E52629] px-8 py-4 text-lg font-semibold transition-all"
              >
                Book a Consultation
              </BookConsultationTrigger>
            </motion.div>

            {/* OutSystems */}
            <motion.div 
              id="outsystems"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20 scroll-mt-32"
            >
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">OutSystems</h3>
              <p className="text-[#E52629] font-medium mb-4">Best for: Rapid app + workflow delivery where UX speed matters.</p>
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">What we deliver:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    App & workflow build with modern UX
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    API integrations & data connectors
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Performance tuning & release hygiene
                  </li>
                </ul>
              </div>
              <BookConsultationTrigger 
                className="bg-transparent text-[#E52629] border-2 border-[#E52629] hover:bg-[#E52629] hover:text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#E52629] px-8 py-4 text-lg font-semibold transition-all"
              >
                Book a Consultation
              </BookConsultationTrigger>
            </motion.div>

            {/* Creatio */}
            <motion.div 
              id="creatio"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20 scroll-mt-32"
            >
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">Creatio</h3>
              <p className="text-[#E52629] font-medium mb-4">Best for: Process automation that connects closely with CRM operations.</p>
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">What we deliver:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Process design & CRM alignment
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Data model & integration setup
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Adoption enablement & training
                  </li>
                </ul>
              </div>
              <BookConsultationTrigger 
                className="bg-transparent text-[#E52629] border-2 border-[#E52629] hover:bg-[#E52629] hover:text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#E52629] px-8 py-4 text-lg font-semibold transition-all"
              >
                Book a Consultation
              </BookConsultationTrigger>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Delivery Approach - Matching CRM Layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="space-y-12"
          >
            <motion.h2 
              variants={fadeUpVariants}
              className="text-4xl font-bold font-montserrat text-center text-[#1C1C1C]"
            >
              Delivery Approach
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {deliverySteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                  className="text-center space-y-4"
                >
                  <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                    <CardContent className="p-6 pt-8 relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#E52629] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg font-montserrat">
                        0{step.number}
                      </div>
                      <div className="space-y-4 mt-4">
                        <h3 className="text-xl font-semibold font-montserrat text-[#1C1C1C]">{step.title}</h3>
                        <ul className="text-sm space-y-2 text-left">
                          {step.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#E52629] flex-shrink-0 mt-0.5" />
                              <span className="text-[#3C3C3C]">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Governance, Security & Compliance - Principle Cards Grid */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
          >
            <motion.h2 
              variants={fadeUpVariants}
              className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-10 text-center"
            >
              Governance, Security & Compliance
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {governanceItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : index * 0.05 }}
                >
                  <button
                    type="button"
                    className="w-full bg-white border-2 border-gray-200 hover:border-[#E52629] rounded-lg px-5 py-4 text-left transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 group cursor-default flex items-start gap-4"
                    tabIndex={0}
                    aria-label={item.title}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#E52629]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-montserrat font-semibold text-base text-[#1C1C1C] group-hover:text-[#E52629] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#3C3C3C] mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
          >
            <motion.h2 
              variants={fadeUpVariants}
              className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-8 text-center"
            >
              Frequently Asked Questions
            </motion.h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white border border-[#E6E6E6] rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#3C3C3C]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Strip - Red (matches CRM) */}
      <section className="py-20 bg-[#E52629] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          >
            <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
              Ready to automate a high-impact process?
            </h2>
            <p className="font-inter text-xl text-white/95 mb-10">
              Start with one workflow, prove value fast, then scale safely.
            </p>
            <div className="flex justify-center">
              <BookConsultationTrigger 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#E52629] hover:shadow-md focus-visible:ring-2 focus-visible:ring-white px-8 py-4 text-lg font-semibold transition-all"
              >
                Book a consultation
              </BookConsultationTrigger>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
