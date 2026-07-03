import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Smartphone, Target, Zap, Shield, Layers, Code2, Database, Brain, 
  Settings, TestTube, Eye, Lock, Users, TrendingUp, ArrowRight, CheckCircle2,
  Play, Pause
} from "lucide-react";
import { scrollToId } from "@/lib/scrollUtils";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-mobile-app-development-new.avif";

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggeredFadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  }
};


const whyChooseUs = [
  {
    icon: Target,
    title: "Outcome‑first",
    description: "Roadmaps tied to KPIs—crash‑free users, startup time, retention, conversion."
  },
  {
    icon: Zap,
    title: "Velocity with guardrails",
    description: "Parallel design/dev, automated testing, gated releases."
  },
  {
    icon: Shield,
    title: "Secure by default",
    description: "OWASP MAS, device/app hardening, secret management, least‑privilege APIs."
  }
];

const capabilities = [
  {
    icon: Users,
    title: "Product & UX",
    items: [
      "Discovery workshops & user journeys",
      "Wireframes & prototypes",
      "SwiftUI/Compose design systems",
      "Accessibility-first patterns"
    ]
  },
  {
    icon: Code2,
    title: "Native development",
    items: [
      "Swift/SwiftUI, Kotlin/Jetpack Compose",
      "Background tasks & widgets",
      "Wearables & extensions",
      "Platform-specific optimizations"
    ]
  },
  {
    icon: Layers,
    title: "Cross‑platform",
    items: [
      "Flutter, React Native frameworks",
      "Kotlin Multiplatform shared logic",
      "Platform‑first polish",
      "Native module bridges"
    ]
  },
  {
    icon: Database,
    title: "Back‑end & APIs",
    items: [
      "Node/Java/Go/.NET services",
      "REST/GraphQL APIs",
      "Auth (Auth0/Entra)",
      "Payments, push notifications"
    ]
  },
  {
    icon: Database,
    title: "Data & offline",
    items: [
      "SQLite/Room/CoreData",
      "Firestore/Realm sync",
      "Conflict resolution",
      "Background sync strategies"
    ]
  },
  {
    icon: Brain,
    title: "AI features",
    items: [
      "On‑device ML models",
      "Vector search & RAG",
      "Bedrock/OpenAI/Azure AI",
      "Safety filters & moderation"
    ]
  }
];

const engineeringStandards = [
  {
    title: "Architecture",
    content: "MVVM / Clean Architecture, modularization, feature flags, A/B experimentation frameworks."
  },
  {
    title: "CI/CD",
    content: "GitHub Actions/Bitrise/Fastlane, TestFlight/Play Internal Track, staged rollouts with monitoring."
  },
  {
    title: "Quality",
    content: "Unit/UI testing (XCTest, Espresso, Appium), contract tests, performance & network profiling."
  },
  {
    title: "Observability",
    content: "Crashlytics/Sentry integration, OpenTelemetry traces, real‑user metrics & dashboards."
  },
  {
    title: "Security & privacy",
    content: "OWASP MAS checks, keychain/keystore, root/jailbreak detection, GDPR/CCPA compliance, SOC 2 alignment."
  },
  {
    title: "Accessibility",
    content: "WCAG 2.2 AA patterns, Dynamic Type, VoiceOver/TalkBack support, color contrast validation."
  }
];

const integrations = [
  "Apple Services", "Google Play", "Firebase", "AWS Amplify", "Azure Mobile Apps",
  "Stripe", "Shopify", "Segment", "Braze", "AppsFlyer", "Mapbox", "Twilio"
];

const deliveryPhases = [
  { phase: "Discover", description: "Requirements, user research, technical feasibility" },
  { phase: "Design", description: "Wireframes, prototypes, design system" },
  { phase: "Build", description: "2-week sprints, demo each iteration" },
  { phase: "Harden", description: "Security audit, performance optimization" },
  { phase: "Launch", description: "Staged rollout, monitoring setup" },
  { phase: "Scale", description: "Feature expansion, ongoing optimization" }
];

const performanceMetrics = [
  { label: "P95 cold start (native)", value: "≤ 2s" },
  { label: "P95 cold start (cross-platform)", value: "≤ 3s" },
  { label: "Crash‑free users", value: "≥ 99.9%" },
  { label: "App size optimization", value: "On‑demand modules" }
];

const faqs = [
  {
    question: "Native vs cross‑platform: which should we choose?",
    answer: "Native (Swift/Kotlin) offers maximum performance and platform integration—ideal for graphics-intensive apps or deep OS features. Cross‑platform (Flutter/React Native/KMP) accelerates time-to-market with shared code while maintaining quality. We'll assess your requirements, timeline, and team to recommend the best fit."
  },
  {
    question: "Do you handle back‑end infrastructure too?",
    answer: "Yes. We build and integrate scalable back‑end services (Node.js, Java, .NET, Go) with databases, auth, APIs, and third‑party services. Whether you need a new back end or integration with existing systems, we deliver end‑to‑end solutions."
  },
  {
    question: "How do you handle analytics and user privacy?",
    answer: "We implement privacy-first analytics (Firebase, Segment, custom solutions) with full GDPR/CCPA compliance. All tracking includes proper consent flows, data minimization, and transparent privacy policies."
  },
  {
    question: "What's your release and maintenance strategy?",
    answer: "We use staged rollouts (internal → beta → production) with feature flags and kill switches. Post-launch, we provide ongoing maintenance, security patches, OS updates, and performance monitoring with defined SLAs."
  },
  {
    question: "How long does it take to build an MVP?",
    answer: "Typical MVP timelines range from 4–8 weeks depending on complexity. We work in 2-week sprints with demos at the end of each cycle, so you see progress continuously and can adjust priorities as needed."
  }
];

export default function MobileAppDevelopment() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("overview");
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // Animation variants for hero (matching BPA)
  const heroFadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: { opacity: 1, y: 0 }
  };

  const heroStaggeredFadeUp = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "capabilities", "process", "standards", "integrations", "performance", "security", "faq"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Mobile App Development Services | iOS • Android • Flutter • React Native | Systechnosoft</title>
        <meta 
          name="description" 
          content="Design, build, and run secure, high‑performing mobile apps with native and cross‑platform stacks, CI/CD, automated testing, and observability." 
        />
        <meta name="keywords" content="mobile app development services, iOS, Android, Flutter, React Native, Kotlin Multiplatform, CI/CD, App Store, Play Store, QA automation" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/mobile-app-development" />
      </Helmet>

      {/* Hero Section - Identical to BPA */}
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
            variants={heroStaggeredFadeUp}
            initial="hidden"
            animate="visible"
          >
            {/* Left: Copy */}
            <div className="space-y-6">
              <motion.h1 
                variants={heroFadeUpVariants} 
                className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl leading-tight"
              >
                Mobile apps, built to{" "}
                <span className="text-[#E52629]">ship faster</span>—and{" "}
                <span className="text-[#E52629]">scale safer</span>
              </motion.h1>
              
              <motion.p 
                variants={heroFadeUpVariants} 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              >
                Design, build, and run iOS, Android, and cross‑platform apps with modern architectures, CI/CD, and observability—so you can ship faster with confidence.
              </motion.p>

              {/* Benefit Chips */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="flex flex-wrap gap-3"
                aria-label="Key benefits"
              >
                {["Native", "Cross‑platform", "DevOps"].map((badge, idx) => (
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
                variants={heroFadeUpVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToId('capabilities')}
                  className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2"
                >
                  See what we deliver
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/contact?type=mra')}
                  className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                >
                  Claim your free insight
                </Button>
              </motion.div>
            </div>

            {/* Right: Hero Image with Motion Toggle */}
            <motion.div 
              variants={heroFadeUpVariants}
              className="relative hidden lg:block group"
            >
              <div className="aspect-[16/10] rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="Mobile App Development Services - iOS and Android devices with elegant app interfaces"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width={1270}
                  height={847}
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

      {/* Subsection Navigation */}
      <nav className="hidden lg:block sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center overflow-x-auto py-4 space-x-8 scrollbar-hide">
            {[
              { id: "overview", label: "Overview" },
              { id: "capabilities", label: "Capabilities" },
              { id: "standards", label: "Standards" },
              { id: "integrations", label: "Integrations" },
              { id: "process", label: "Process" },
              { id: "performance", label: "Performance" },
              { id: "security", label: "Security" },
              { id: "faq", label: "FAQ" }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className={cn(
                  "flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-colors duration-200",
                  activeSection === id
                    ? "bg-[#E52629] text-white shadow-md"
                    : "text-gray-600 hover:text-[#E52629] hover:bg-gray-100"
                )}
                aria-current={activeSection === id ? "true" : undefined}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Overview - White */}
      <section id="overview" className="py-16 sm:py-20 lg:py-24 scroll-mt-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We deliver native (Swift/Kotlin) and cross-platform (Flutter/React Native/KMP) mobile apps with enterprise-grade security, CI/CD automation, and observability—so you ship faster, scale confidently, and maintain quality across iOS and Android. From MVP to production, we handle UX design, backend integration, testing, and ongoing operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why choose us</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {whyChooseUs.map((item, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities - White */}
      <section id="capabilities" className="py-16 sm:py-20 lg:py-24 scroll-mt-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End‑to‑end mobile engineering expertise
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {capabilities.map((capability, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <capability.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {capability.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Engineering Standards */}
      <section id="standards" className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Engineering standards</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality, security, and performance built in
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {engineeringStandards.map((standard, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#E52629] text-white flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{standard.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{standard.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Integrations - White */}
      <section id="integrations" className="py-16 sm:py-20 lg:py-24 scroll-mt-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Integrations</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seamless connections to the tools you already use
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Badge 
                  variant="secondary" 
                  className="px-5 py-2.5 text-sm bg-white border-2 border-gray-200 hover:border-[#E52629] text-[#1C1C1C] transition-colors duration-300 cursor-default"
                >
                  {integration}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Playbook */}
      <section id="process" className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Delivery playbook</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Typical 4–8 week MVP, 2‑week sprints, demo each sprint
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {deliveryPhases.map((item, index) => (
                <motion.div key={index} variants={fadeUpVariants}>
                  <Card className="h-full text-center border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                    <CardHeader>
                      <div className="mx-auto h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <span className="text-primary font-bold">{index + 1}</span>
                      </div>
                      <CardTitle className="text-base">{item.phase}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance & Reliability - White */}
      <section id="performance" className="py-16 sm:py-20 lg:py-24 scroll-mt-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Performance & reliability guardrails</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {performanceMetrics.map((metric, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full text-center border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-primary">{metric.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section id="security" className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Security & compliance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade protection built into every app
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <motion.div variants={scaleIn}>
              <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Security Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>OWASP MASVS security checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Secure storage (keychain/keystore)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Code obfuscation & hardening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Certificate pinning options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn}>
              <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>GDPR/CCPA privacy compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>SOC 2 alignment for enterprise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Root/jailbreak detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Data encryption at rest & in transit</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ - White */}
      <section id="faq" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-[#1C1C1C] mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#E52629] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
            Ready to ship a better mobile app?
          </h2>
          <p className="font-inter text-xl text-white/95 mb-10">
            Let's build iOS and Android apps that scale securely with modern architectures, CI/CD, and observability.
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
    </>
  );
}