import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Brain, Shield, TrendingUp, DollarSign, Target, FileCheck, Database, Lock, Workflow } from "lucide-react";
import ServiceHero from "@/components/ServiceHero";
import { scrollToId } from "@/lib/scrollUtils";
import heroImage from "@/assets/hero-consultation-strategy-new.avif";

export default function AIConsultationStrategy() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "benefits", "use-cases", "capabilities", "sdks", "faq"];
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

  const benefits = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Faster path to value",
      description: "Prioritize high‑ROI use cases"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Lower risk",
      description: "Security, privacy, and compliance first"
    },
    {
      icon: <FileCheck className="w-8 h-8 text-primary" />,
      title: "Clear build plan",
      description: "Milestones, SLAs/SLOs, owners"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: "Cost control",
      description: "Model routing, caching, usage budgets"
    }
  ];

  const useCases = [
    "AI roadmap for assistants, RAG, and analytics",
    "Feasibility/ROI scoring for candidate use cases",
    "Data readiness & architecture gaps closure",
    "Safety/guardrails policy for generation & tools",
    "Multi‑model policy to avoid lock‑in",
    "Change management & team upskilling for AI adoption"
  ];

  const capabilities = [
    "Readiness assessment (data, security, infra, talent)",
    "Feasibility & ROI modeling; risk register",
    "Use‑case selection and phasing (pilot → scale)",
    "Governance: privacy/PII, safety filters, audit trails",
    "Technical blueprint: RAG, evals, observability, CI/CD for prompts/configs",
    "Operational guardrails: SLAs/SLOs, latency budgets, staged rollouts & rollback playbooks"
  ];

  const sdks = [
    "Prompt registries & versioning",
    "Embeddings & vector stores for RAG",
    "Observability & eval SDKs (tracing, metrics)",
    "Orchestration/runtime adapters (tool‑use/agents)"
  ];

  const faqs = [
    {
      question: "What's the typical roadmap timeline?",
      answer: "Most roadmaps span 3–6 months from assessment to initial pilot launch, with scaling phases extending 6–12 months. Timelines vary based on organizational readiness, data availability, and governance requirements."
    },
    {
      question: "How do you handle governance & compliance?",
      answer: "We embed privacy/PII controls, safety filters, and audit trails from day one. Our framework aligns with GDPR, SOC 2, and industry‑specific regulations, ensuring AI systems meet compliance standards before production."
    },
    {
      question: "How do you avoid vendor lock‑in?",
      answer: "We design multi‑model strategies using open SDKs and standardized interfaces. This allows you to switch providers, test competing models, and leverage best‑of‑breed components without rewriting core logic."
    },
    {
      question: "How do you measure ROI?",
      answer: "We establish baseline metrics (cost, time, quality) and track improvements post‑deployment. ROI includes cost savings from automation, revenue from new capabilities, and risk reduction from fewer errors or compliance issues."
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Consultation & Strategy | Systechnosoft</title>
        <meta name="description" content="Plan AI that ships and scales. Define vision, governance, and build path—from pilot to production—using proven, SDK‑first patterns." />
        <meta name="keywords" content="AI strategy, AI consultation, AI roadmap, AI governance, AI planning, technology consulting" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/ai-consultation-strategy" />
        <meta property="og:title" content="AI Consultation & Strategy | Systechnosoft" />
        <meta property="og:description" content="Plan AI that ships and scales with proven SDK‑first patterns and governance frameworks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.systechnosoft.com/services/ai-consultation-strategy" />
      </Helmet>

      <ServiceHero
        id="hero"
        dataPage="ai-consultation-strategy"
        title="Plan AI that ships and scales"
        subtitle="Define vision, governance, and build path—from pilot to production—using proven, SDK‑first patterns."
        uspChips={["Readiness → roadmap", "Governance & risk", "Vendor‑agnostic"]}
        primaryButton={{
          text: "See what we deliver →",
          onClick: () => scrollToId('benefits'),
          ariaLabel: "See what we deliver"
        }}
        secondaryButton={{
          text: "Claim your free insight",
          href: "/contact?type=mra",
          ariaLabel: "Claim your free insight"
        }}
        image={{
          src: heroImage,
          alt: "AI consultation and strategy planning with roadmap visualization and governance frameworks",
          placeholderPrompt: "Professional 3D illustration of AI strategy planning with connected roadmap nodes, governance shields, and multi-model integration in modern tech style with blue and red accents",
          width: 1270,
          height: 847
        }}
      />

      <nav className="hidden lg:block sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center overflow-x-auto py-4 space-x-8 scrollbar-hide">
            {[
              { id: "overview", label: "Overview" },
              { id: "benefits", label: "Benefits" },
              { id: "use-cases", label: "Use Cases" },
              { id: "capabilities", label: "Capabilities" },
              { id: "sdks", label: "SDKs" },
              { id: "faq", label: "FAQ" }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className={`flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                  activeSection === id
                    ? "bg-[#E52629] text-white shadow-md"
                    : "text-gray-600 hover:text-[#E52629] hover:bg-gray-100"
                }`}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Consultation & Strategy focuses on AI adoption planning, governance, and technical blueprinting—without vendor lock‑in. 
              It covers readiness assessment, opportunity selection, feasibility, risk & compliance, data/infra prerequisites, and a 
              build plan that leverages modern AI SDKs (prompts/registries, RAG, evals, observability) to reach production faster and safer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Light Gray */}
      <section id="benefits" className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4 font-montserrat">Benefits</h2>
            <p className="text-lg text-[#3C3C3C] font-inter">Strategic advantages of structured AI planning</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2 font-montserrat">{benefit.title}</h3>
                    <p className="text-[#3C3C3C] font-inter">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4 font-montserrat">Use Cases</h2>
            <p className="text-lg text-[#3C3C3C] font-inter">Common strategic planning scenarios</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardContent className="p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-[#3C3C3C] font-inter">{useCase}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section - Light Gray */}
      <section id="capabilities" className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4 font-montserrat">Capabilities</h2>
            <p className="text-lg text-[#3C3C3C] font-inter">Comprehensive strategic planning framework</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg min-h-[120px] flex flex-col">
                  <CardContent className="p-3.5 flex items-start gap-3 flex-1">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-[#3C3C3C] font-inter">{capability}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="sdks" className="py-16 bg-white border-t border-[#E6E6E6]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4 font-montserrat">SDKs</h2>
            <p className="text-lg text-[#3C3C3C] font-inter">Modern tooling for implementation</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {sdks.map((sdk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Workflow className="w-5 h-5 text-primary flex-shrink-0" />
                    <p className="text-[#3C3C3C] font-inter font-medium">{sdk}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-[#F5F5F5] scroll-mt-24">
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

      <section className="py-20 bg-[#E52629] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
            Ready to shape your AI strategy?
          </h2>
          <p className="font-inter text-xl text-white/95 mb-10">
            Let's design a roadmap that delivers value, manages risk, and scales with your business.
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
