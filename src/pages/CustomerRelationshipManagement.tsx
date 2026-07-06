import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Users, 
  Database, 
  Workflow, 
  Globe, 
  Shield,
  Target,
  BarChart3,
  CheckCircle2,
  RefreshCw,
  Cog,
  Lock,
  FileCheck,
  Settings,
  GraduationCap,
  Activity,
  Key,
  Gauge
} from "lucide-react";
import heroCrmImage from "@/assets/hero-crm.avif";
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
    <div 
      ref={ref} 
      className="text-center p-5 bg-white rounded-2xl border-2 border-gray-200 shadow-md hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20"
    >
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

export default function CustomerRelationshipManagement() {
  const shouldReduceMotion = useReducedMotion();
  const { openCalendly } = useConsultationStore();
  const navigate = useNavigate();

  // Scroll helper for "What We Deliver" section
  const scrollToWhatWeDeliver = () => {
    const element = document.getElementById('what-we-deliver');
    if (element) {
      element.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

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
    { icon: Target, title: "CRM discovery & blueprint", description: "Process + data model alignment" },
    { icon: Cog, title: "Implementation & configuration", description: "Platform setup + role-based access" },
    { icon: Globe, title: "Integrations", description: "ERP/Email/CTI/Identity; API-first" },
    { icon: Database, title: "Data migration & quality", description: "Mapping, dedupe, validation" },
    { icon: Workflow, title: "Workflow automation", description: "Approvals, routing, SLAs" },
    { icon: BarChart3, title: "Reporting & dashboards", description: "Pipeline, service, journey insights" },
    { icon: Shield, title: "Security & governance", description: "Environments, releases, auditability" },
    { icon: RefreshCw, title: "Managed support & optimization", description: "Hypercare + continuous improvements" },
  ];

  const platforms = [
    { id: "salesforce", name: "Salesforce", hasPage: true },
    { id: "zoho", name: "Zoho CRM", hasPage: false },
    { id: "dynamics", name: "Microsoft Dynamics 365", hasPage: false },
    { id: "hubspot", name: "HubSpot CRM", hasPage: false },
  ];

  const deliverySteps = [
    {
      number: "1",
      title: "Discover & design",
      bullets: ["Goals, data model & security alignment", "Adoption & change management plan"]
    },
    {
      number: "2",
      title: "Build & integrate",
      bullets: ["Configuration, automation & integrations", "Data migration & quality assurance"]
    },
    {
      number: "3",
      title: "Launch & optimize",
      bullets: ["Training, hypercare & metrics tracking", "Continuous improvements & governance"]
    },
  ];

  const governanceItems = [
    { icon: Lock, title: "Role-based access", description: "Least privilege by default" },
    { icon: FileCheck, title: "Audit trails", description: "Change logging and compliance" },
    { icon: Settings, title: "Environment discipline", description: "Release gates and controls" },
    { icon: Database, title: "Data handling", description: "Retention + consent workflows" },
    { icon: Key, title: "Integration security", description: "Tokens and secrets management" },
    { icon: Gauge, title: "Performance guardrails", description: "Limits and monitoring" },
    { icon: GraduationCap, title: "Training program", description: "Enablement and adoption" },
    { icon: Activity, title: "Ongoing optimization", description: "Monitoring and improvements" }
  ];

  const faqs = [
    {
      question: "What is CRM and what problems does it solve?",
      answer: "CRM (Customer Relationship Management) is a strategy and technology for managing all your company's interactions with current and potential customers. It solves problems like fragmented customer data, inconsistent follow-ups, lack of pipeline visibility, and disconnected teams across sales, marketing, and service."
    },
    {
      question: "How do you choose between Salesforce, Dynamics 365, HubSpot, and Zoho?",
      answer: "The choice depends on your organization's size, existing tech stack, budget, and specific needs. Salesforce excels for enterprise-scale customization, Dynamics 365 integrates seamlessly with Microsoft tools, HubSpot offers fast adoption with strong marketing alignment, and Zoho provides cost-effective automation with broad suite integration."
    },
    {
      question: "Can CRM integrate with our ERP and existing tools?",
      answer: "Yes. Modern CRM platforms are API-first and support pre-built connectors for most ERP systems (SAP, Oracle, NetSuite), email platforms, telephony systems, and identity providers. We design integrations that maintain data consistency and respect your security requirements."
    },
    {
      question: "How do you approach data migration and quality?",
      answer: "We follow a structured approach: data audit and mapping, deduplication rules, validation logic, pilot migration with quality checks, and full migration with rollback capability. Data quality is addressed both during migration and through ongoing governance rules in the new system."
    },
    {
      question: "How do you drive user adoption?",
      answer: "Adoption starts in the design phase by involving key users. We then provide role-based training, intuitive UX configurations, quick wins that demonstrate value, and ongoing support. Change management and executive sponsorship are critical success factors we help you establish."
    },
    {
      question: "What does governance look like after go-live?",
      answer: "Post go-live governance includes environment management, release discipline, data stewardship, security reviews, and performance monitoring. We establish runbooks, escalation paths, and continuous improvement cycles to keep your CRM healthy and aligned with evolving business needs."
    },
    {
      question: "Can we start small and expand later?",
      answer: "Absolutely. We recommend starting with a focused pilot—one team, one process, or one customer journey—to prove value quickly. Modern CRM platforms are modular, making it easy to expand to additional teams, regions, or capabilities once the foundation is solid."
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
        <title>Customer Relationship Management Services | CRM Implementation | Systechnosoft</title>
        <meta name="description" content="Build a single source of truth across sales, marketing, and service with CRM implementation. Improve visibility, automate lifecycle handoffs with Salesforce, Dynamics 365, HubSpot, and Zoho." />
        <meta property="og:title" content="Customer Relationship Management Services | CRM Implementation | Systechnosoft" />
        <meta property="og:description" content="Build a single source of truth across sales, marketing, and service with CRM implementation. Improve visibility, automate lifecycle handoffs." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/crm" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-animated flex items-center justify-center">
        {/* Animated Background */}
        <div className="hero-animated__bg absolute inset-0 z-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(229,38,41,0.1),transparent)]" />
          {!shouldReduceMotion && (
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

        <div className="container mx-auto px-4 hero-animated__content">
          <motion.div 
            className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto"
            variants={staggeredFadeUp}
            initial="hidden"
            animate="visible"
          >
            {/* Left: Copy */}
            <div className="space-y-6">
              <motion.h1 
                variants={fadeUpVariants} 
                className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight"
              >
                CRM that unifies<br />
                <span className="text-[#E52629]">teams and data</span><br />
                end-to-end
              </motion.h1>
              
              <motion.p 
                variants={fadeUpVariants} 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              >
                Unify sales, marketing, and service in one CRM—improve visibility, automate handoffs, and drive adoption with scalable delivery.
              </motion.p>

              {/* Pill Chips */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="flex flex-wrap gap-3"
                aria-label="Key benefits"
              >
                {["Unified customer view", "Lifecycle automation", "Integration-first"].map((badge, idx) => (
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
                  onClick={scrollToWhatWeDeliver}
                  className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2"
                >
                  What We Deliver
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

            {/* Right: Hero Image */}
            <motion.figure 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block group"
            >
              <div className="aspect-[16/10] rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden">
                <img
                  src={heroCrmImage}
                  alt="Abstract customer lifecycle showing unified data, automation, and connected sales, marketing, and service"
                  className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:translate-y-[-6px] group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
                  loading="eager"
                  fetchPriority="high"
                  width={1280}
                  height={800}
                />
              </div>
              {/* Subtle brand glow */}
              <span 
                aria-hidden="true" 
                className="pointer-events-none absolute -inset-3 rounded-[22px] blur-lg opacity-[.18] -z-10"
                style={{
                  background: `radial-gradient(40% 40% at 20% 30%, #E52629 10%, transparent 70%)`
                }}
              />
            </motion.figure>
          </motion.div>
        </div>
      </section>

      {/* KPI Ribbon */}
      <section className="py-8 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KpiCounter label="Customer 360" sublabel="One place for pipeline + interactions" />
            <KpiCounter label="Lifecycle automation" sublabel="Consistent handoffs across teams" />
            <KpiCounter label="Adoption that sticks" sublabel="Training + governance by design" />
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section id="what-we-deliver" className="py-20 bg-white scroll-mt-24">
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
              What We Deliver
            </motion.h2>
            <motion.p 
              variants={fadeUpVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Capabilities that transform your customer operations
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
                <Card className="h-full rounded-2xl border-2 border-gray-200 hover:border-[#E52629] shadow-md hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20 p-5">
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
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="text-center mb-8"
          >
            <motion.h2 
              variants={fadeUpVariants}
              className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4"
            >
              Platform options for CRM delivery
            </motion.h2>
          </motion.div>

          {/* Platform chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
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
            {/* Salesforce */}
            <motion.div 
              id="salesforce"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20"
            >
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">Salesforce</h3>
              <p className="text-[#E52629] font-medium mb-4">Best for: Enterprise-scale CRM with deep customization and ecosystem extensibility.</p>
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">What we deliver:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Implementation, configuration & role-based access setup
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Integrations with ERP, email, telephony & data migration
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Rollout, training & managed support
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
                  <Link to="/services/salesforce">Go to Salesforce Services</Link>
                </Button>
              </div>
            </motion.div>

            {/* Zoho CRM */}
            <motion.div 
              id="zoho"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20"
            >
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">Zoho CRM</h3>
              <p className="text-[#E52629] font-medium mb-4">Best for: Cost-effective CRM with broad suite integration and strong automation.</p>
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">What we deliver:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Implementation, configuration & workflow automation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Data migration & integration with Zoho suite
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Training & ongoing optimization
                  </li>
                </ul>
              </div>
              <BookConsultationTrigger 
                className="bg-transparent text-[#E52629] border-2 border-[#E52629] hover:bg-[#E52629] hover:text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#E52629] px-8 py-4 text-lg font-semibold transition-all"
              >
                Book a Consultation
              </BookConsultationTrigger>
            </motion.div>

            {/* Microsoft Dynamics 365 */}
            <motion.div 
              id="dynamics"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20"
            >
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">Microsoft Dynamics 365</h3>
              <p className="text-[#E52629] font-medium mb-4">Best for: CRM aligned with Microsoft stack and unified business operations.</p>
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">What we deliver:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Solution design aligned with your Microsoft ecosystem
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Integrations with Office 365, Power Platform & reporting
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Governance, security & ongoing support
                  </li>
                </ul>
              </div>
              <BookConsultationTrigger 
                className="bg-transparent text-[#E52629] border-2 border-[#E52629] hover:bg-[#E52629] hover:text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#E52629] px-8 py-4 text-lg font-semibold transition-all"
              >
                Book a Consultation
              </BookConsultationTrigger>
            </motion.div>

            {/* HubSpot CRM */}
            <motion.div 
              id="hubspot"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md hover:border-[#E52629] hover:shadow-lg transition-colors duration-300 focus-within:border-[#E52629] focus-within:ring-2 focus-within:ring-[#E52629]/20"
            >
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">HubSpot CRM</h3>
              <p className="text-[#E52629] font-medium mb-4">Best for: Fast adoption and marketing-sales alignment with streamlined operations.</p>
              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">What we deliver:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Setup, lifecycle automation & lead routing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Integrations with marketing, sales & service tools
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    Enablement, training & adoption programs
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

      {/* Delivery Approach - Matching Salesforce Implementation Layout */}
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

      {/* Governance, Security & Adoption - Principle Cards Grid */}
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
              Governance, Security & Adoption
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

      {/* Final CTA Strip - Red (matches Cloud Services) */}
      <section className="py-20 bg-[#E52629] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          >
            <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
              Ready to turn your CRM into a growth engine?
            </h2>
            <p className="font-inter text-xl text-white/95 mb-10">
              Start with one team or one journey—prove value fast, then scale safely.
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