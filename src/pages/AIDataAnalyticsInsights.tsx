import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { motion } from "framer-motion";
import { scrollToId } from "@/lib/scrollUtils";
import heroDataAnalytics from "@/assets/hero-data-analytics-new.avif";
import { 
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Shield,
  Database,
  Zap,
  Activity,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
} from "lucide-react";

export default function AIDataAnalyticsInsights() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "benefits", label: "Benefits" },
    { id: "use-cases", label: "Use Cases" },
    { id: "capabilities", label: "Capabilities" },
    { id: "sdks", label: "SDKs" },
    { id: "faq", label: "FAQ" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const benefits = [
    {
      icon: Zap,
      title: "Faster time‑to‑insight",
      description: "Streaming & incremental pipelines",
    },
    {
      icon: TrendingUp,
      title: "Predict the next step",
      description: "Forecasting & propensity models",
    },
    {
      icon: Shield,
      title: "Trust the output",
      description: "Explainability, drift checks, alerts",
    },
    {
      icon: BarChart3,
      title: "Lower TCO",
      description: "Caching, model routing, cost budgets",
    },
  ];

  const useCases = [
    "Real‑time dashboards with anomaly alerts",
    "Demand forecasting & capacity planning",
    "Churn & propensity scoring embedded in CRM",
    "Risk/fraud signals for approvals/holds",
    "Operations KPIs with intelligent thresholds",
    "Real-time KPI alerts in BI dashboards",
  ];

  const capabilities = [
    "Ingestion: batch (files/DB) & streaming (events/queues)",
    "Feature store, sliding windows, time‑series transforms",
    "Models: anomaly detection, forecasting, classification",
    "Online inference with low‑latency caches & fallbacks",
    "Explainability (SHAP‑style), monitoring & drift detection",
    "CI/CD for data pipelines; evaluation harness with golden sets",
  ];

  const sdks = [
    "Python/JS client SDKs for inference & scoring",
    "Time‑series & anomaly algorithms",
    "Embeddings/vector stores for semantic joins",
    "Observability SDKs (tracing, metrics, alerts)",
  ];

  const faqs = [
    {
      q: "What data connectors do you support?",
      a: "We integrate with major databases (PostgreSQL, MySQL, MongoDB), data warehouses (Snowflake, BigQuery), and streaming platforms (Kafka, Kinesis). Custom connectors can be built for proprietary systems.",
    },
    {
      q: "What are the streaming latency targets?",
      a: "Our real-time pipelines typically achieve sub-second latency for anomaly detection and scoring. Batch forecasting runs complete within minutes for most datasets.",
    },
    {
      q: "How do you ensure model explainability?",
      a: "We use SHAP-style feature attribution, confidence scores, and decision reasoning. Every prediction includes context about which features drove the result and how confident the model is.",
    },
    {
      q: "How do you control alert fatigue?",
      a: "Smart thresholds adapt to historical patterns, alerts are deduplicated and grouped, and we support configurable severity levels with automated escalation rules to reduce noise.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>AI Data Analytics & Insights | Systechnosoft</title>
        <meta
          name="description"
          content="Turn raw data into real‑time decisions with AI‑powered analytics. Predictive models, anomaly detection, and explainable insights integrated directly into your apps."
        />
        <meta
          name="keywords"
          content="AI analytics, predictive analytics, real-time insights, anomaly detection, data science, machine learning"
        />
        <link rel="canonical" href="https://www.systechnosoft.com/services/ai-data-analytics-insights" />
      </Helmet>

      {/* Hero Section */}
      <section 
        id="hero"
        data-page="ai-analytics"
        className="sf-hero ai-analytics-hero relative min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden bg-white py-24 isolate"
        aria-labelledby="ai-analytics-hero-title"
      >
        {/* Animated background */}
        <div className="sf-hero__bg absolute inset-0 z-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(229,38,41,0.1),transparent)]" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent, hsl(var(--primary)), transparent)`,
              backgroundSize: "400px 400px"
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Content */}
        <div className="sf-hero__inner relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center max-w-[1200px] mx-auto">
            <motion.div
              className="ai-analytics-hero__left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 
                id="ai-analytics-hero-title"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Transform Data into{" "}
                <span className="text-[#E52629]">Intelligent Insights</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Harness the power of AI-driven analytics to unlock hidden patterns, predict trends, 
                and make data-backed decisions that propel your business forward.
              </p>

              <div className="sf-hero__chips flex flex-wrap gap-3 mb-8">
                {["Real-time Analytics", "Predictive Modeling", "Custom Dashboards"].map((badge, idx) => (
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
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                  aria-label="Claim your free insight"
                >
                  <a href="/contact?type=mra" title="Claim your free insight">
                    Claim your free insight
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="See what we deliver"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId('benefits');
                  }}
                  title="See what we deliver"
                >
                  See what we deliver →
                </Button>
              </motion.div>
            </motion.div>

            <motion.figure
              className="ai-analytics-hero__art relative group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={heroDataAnalytics}
                width={1270} 
                height={847}
                alt="AI-powered data analytics dashboard showing real-time insights and predictive trends"
                className="w-full h-auto rounded-2xl border border-[#E6E6E6] shadow-[0_10px_30px_rgba(0,0,0,0.06)] object-cover transition-all duration-300 ease-out group-hover:translate-y-[-6px] group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]" 
                loading="eager" 
                decoding="async"
                sizes="(min-width: 1024px) 48vw, 92vw"
              />
              {/* Subtle brand glow */}
              <span 
                aria-hidden="true" 
                className="pointer-events-none absolute -inset-3 rounded-[22px] blur-lg opacity-[.18] -z-10"
                style={{
                  background: `radial-gradient(40% 40% at 20% 30%, #E52629 10%, transparent 70%), radial-gradient(35% 35% at 80% 70%, #007AFF 10%, transparent 70%)`
                }}
              />
            </motion.figure>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className="hidden lg:block sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center overflow-x-auto py-4 space-x-8 scrollbar-hide">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className={`
                  flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200
                  ${activeSection === id
                    ? 'bg-[#E52629] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#E52629] hover:bg-gray-100'
                  }
                `}
                aria-current={activeSection === id ? "true" : undefined}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Overview Section - White */}
      <section id="overview" className="py-16 sm:py-20 lg:py-24 scroll-mt-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This page focuses on <strong>AI analytics technologies & SDKs</strong>: batch and stream ingestion, feature engineering, time‑series models, anomaly detection, forecasting, and explainability. We emphasize light, embeddable components that surface insights inside existing apps and BI flows, enabling teams to make data‑driven decisions in real time with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Light Gray */}
      <section id="benefits" className="py-16 md:py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] font-montserrat mb-4">
              Why Choose Our Analytics
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 hover:shadow-lg hover:-translate-y-1 bg-white group">
                  <benefit.icon className="w-10 h-10 text-[#E52629] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-[#1C1C1C] font-montserrat mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#3C3C3C] font-inter">
                    {benefit.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] font-montserrat mb-4">
              Use Cases
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-1" />
                      <p className="text-[#3C3C3C] font-inter">{useCase}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section - Light Gray */}
      <section id="capabilities" className="py-16 md:py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] font-montserrat mb-4">
              Capabilities
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                <Card className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg min-h-[120px] flex flex-col">
                  <CardContent className="p-4 flex items-start gap-3 flex-1">
                    <Check className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" />
                    <span className="text-[#3C3C3C] font-inter">{capability}</span>
                  </CardContent>
                </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SDKs Section */}
      <section id="sdks" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] font-montserrat mb-4">
              SDKs & Tools
            </h2>
            <p className="text-[#3C3C3C] font-inter max-w-2xl mx-auto">
              Developer-first tooling for seamless integration
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {sdks.map((sdk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg group">
                    <CardContent className="p-6">
                      <Database className="w-8 h-8 text-[#3C3C3C] group-hover:text-[#E52629] transition-colors mb-3" />
                      <p className="text-[#3C3C3C] font-inter font-medium">{sdk}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#F5F5F5] scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-[#1C1C1C] mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-white border border-[#E6E6E6] rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#3C3C3C]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA - Ready to make data speak? */}
      <section id="cta-final" className="py-20 bg-[#E52629] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
            Ready to make data speak?
          </h2>
          <p className="font-inter text-xl text-white/95 mb-10">
            Let's discuss how AI-powered analytics can transform your decision-making process and drive measurable outcomes.
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
