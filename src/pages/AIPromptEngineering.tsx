import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Shield, Zap, TrendingUp, Target, ArrowRight, ChevronDown, Code2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { scrollToId } from "@/lib/scrollUtils";
import heroImage from "@/assets/hero-prompt-engineering-new.avif";
import { PlaybookStepper } from "@/components/PlaybookStepper";

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

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "benefits", label: "Benefits" },
  { id: "use-cases", label: "Use Cases" },
  { id: "capabilities", label: "Capabilities" },
  { id: "sdks", label: "SDKs" },
  { id: "playbooks", label: "Playbooks" },
  { id: "faq", label: "FAQ" }
];

const benefits = [
  {
    icon: Target,
    title: "Consistency at scale",
    description: "Deterministic templates, eval gates, rollout policies"
  },
  {
    icon: Zap,
    title: "Faster iteration",
    description: "A/B prompts, offline tests, prompt registries"
  },
  {
    icon: Shield,
    title: "Lower risk",
    description: "Guardrails, jailbreak filters, PII redaction"
  },
  {
    icon: TrendingUp,
    title: "Cost control",
    description: "Token caps, caching, smart model routing"
  }
];

const useCases = [
  {
    title: "Support bots tuned to brand tone & policy",
    description: "Deploy conversational AI that maintains your brand voice while adhering to company policies and guidelines."
  },
  {
    title: "Knowledge assistants with RAG and citations",
    description: "Build retrieval-augmented systems that provide accurate, sourced answers from your knowledge base."
  },
  {
    title: "Draft/reply generation with style & length controls",
    description: "Generate contextual content with precise formatting, tone, and length requirements."
  },
  {
    title: "Workflow copilots that call tools/APIs safely",
    description: "Create intelligent assistants that interact with your systems through controlled, validated API calls."
  },
  {
    title: "Analytics Q&A with guardrails & disclaimers",
    description: "Enable natural language data exploration while maintaining data governance and compliance requirements."
  },
  {
    title: "Prompt A/B testing & variant management with guardrails",
    description: "Systematically test and optimize prompt variations while maintaining safety boundaries and quality standards."
  }
];

const capabilities = [
  {
    title: "Prompt templates with slots/variables & YAML/JSON registries",
    description: "Structured, version-controlled prompt management"
  },
  {
    title: "Retrieval configuration: chunking, embeddings, vector DB",
    description: "Optimized RAG pipelines for accurate context retrieval"
  },
  {
    title: "Function/tool schemas (JSON Schema), safe sandboxes",
    description: "Controlled tool-use with validation and safety boundaries"
  },
  {
    title: "Evals: golden sets, rubric scoring, human-in-the-loop",
    description: "Comprehensive testing frameworks for quality assurance"
  },
  {
    title: "Observability: tracing, metrics, prompt/version lineage",
    description: "Full visibility into prompt performance and evolution"
  },
  {
    title: "Rollouts: feature flags, canaries, automatic rollback",
    description: "Safe deployment strategies with instant rollback capability"
  },
  {
    title: "Latency & cost budgets; caching & reranking",
    description: "Performance optimization and cost control mechanisms"
  },
  {
    title: "Policy packs & disclaimers automation",
    description: "Automated compliance and legal safeguards integration"
  }
];

const sdks = [
  {
    title: "JS/Python LLM clients & prompt registries",
    description: "Type-safe prompt management for production applications"
  },
  {
    title: "Embeddings & vector stores",
    description: "Semantic search and retrieval infrastructure"
  },
  {
    title: "Tracing/evals/observability SDKs",
    description: "Monitor and evaluate prompt performance in real-time"
  },
  {
    title: "Orchestration/runtime adapters (tool-use/agents)",
    description: "Framework-agnostic agent and workflow execution"
  }
];

const playbooks = [
  {
    title: "Ship a policy-safe chatbot",
    steps: [
      "Define intents",
      "Craft base prompts",
      "Add guardrails",
      "Wire RAG",
      "Offline evals",
      "Canary",
      "Monitor drift"
    ]
  },
  {
    title: "Harden content generation",
    steps: [
      "Style guide",
      "Templates + few-shot",
      "Length/format controls",
      "Toxicity/PII filters",
      "Batch evals",
      "Rollout"
    ]
  }
];

const faqs = [
  {
    question: "How do you reduce hallucinations?",
    answer: "We implement structured prompts with explicit constraints, retrieval-augmented generation for grounded responses, and multi-stage validation. Our eval frameworks catch factual errors before production, and we maintain human-in-the-loop feedback for continuous improvement."
  },
  {
    question: "How do you evaluate prompt quality?",
    answer: "We use golden test sets with rubric-based scoring, automated metrics (relevance, coherence, safety), and A/B testing frameworks. Every prompt version is tracked with lineage, and we provide dashboards showing quality trends over time."
  },
  {
    question: "How do you handle PII and safety?",
    answer: "Our platform includes PII detection and redaction at ingestion, toxicity/profanity filters, jailbreak detection, and configurable content policies. All processing maintains audit trails for compliance, and we support on-premises deployment for sensitive data."
  },
  {
    question: "Are you locked into specific models or vendors?",
    answer: "No—our prompt registries and SDKs are model-agnostic. You can swap providers, A/B test different models, and implement fallback chains without code changes, maintaining flexibility as the AI landscape evolves."
  }
];

export default function AIPromptEngineering() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Scroll spy effect
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

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Prompt Engineering Services | Systechnosoft</title>
        <meta 
          name="description" 
          content="Design, test, and govern prompts, context, and tool-use so models deliver consistent, safe results in production. Templates, guardrails, and versioned prompts." 
        />
        <meta name="keywords" content="prompt engineering, LLM prompts, RAG, prompt templates, AI safety, prompt optimization, few-shot learning" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/ai-prompt-engineering" />
      </Helmet>

      {/* Hero Section */}
      <section className="sf-hero prompt-hero relative min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden bg-white py-24">
        {/* Animated Background */}
        <div className="sf-hero__bg absolute inset-0 opacity-10" aria-hidden="true">
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

        {/* Content */}
        <div className="sf-hero__inner relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center max-w-[1200px] mx-auto">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prompt-hero__left space-y-6 max-w-[44rem]"
            >
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-[#1C1C1C] leading-tight">
                  Get reliable outputs from LLMs—on demand
                </h1>

                <p className="text-lg md:text-xl text-[#3C3C3C] leading-relaxed max-w-prose">
                  Design, test, and govern prompts, context, and tool‑use so models deliver consistent, safe results in production.
                </p>
              </div>

              {/* USP Pill Chips */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="sf-hero__chips flex flex-wrap gap-3"
                aria-label="Key benefits"
              >
                {["Templates & variables", "Guardrails & safety", "Versioned & testable"].map((badge, idx) => (
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 active:scale-[0.99]"
                  onClick={() => scrollToId('benefits')}
                >
                  See what we deliver →
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                >
                  <a href="/contact?type=mra">
                    Claim your free insight
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.figure
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prompt-hero__art relative isolate group"
            >
              <img
                src={heroImage}
                width={1270}
                height={847}
                alt="Prompt engineering flow illustration showing template to LLM to evaluation process"
                className="w-full h-auto rounded-2xl border border-[#E6E6E6] shadow-[0_10px_30px_rgba(0,0,0,0.06)] object-cover transition-all duration-300 ease-out group-hover:translate-y-[-6px] group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
                loading="eager"
                decoding="async"
                sizes="(min-width: 1024px) 48vw, 92vw"
              />
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
            {navItems.map(({ id, label }) => (
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Prompt engineering is a systematic practice involving structured templates, retrieval context, tool/function 
              calls, and evaluation loops that make generative systems dependable. Our focus is on production readiness: 
              versioning, rollbacks, safety filters, and latency budgets. We provide AI technologies and SDKs that enable 
              teams to build, test, and deploy reliable LLM-powered features with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Benefits</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Make LLMs production-ready with systematic prompt management
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section - White */}
      <section id="use-cases" className="py-16 sm:py-20 lg:py-24 scroll-mt-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Use Cases</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-world applications of prompt engineering
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {useCases.map((useCase, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5] scroll-mt-24">
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
              Complete prompt lifecycle management and governance
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {capabilities.map((capability, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{capability.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SDKs Section - White */}
      <section id="sdks" className="py-16 sm:py-20 lg:py-24 scroll-mt-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">SDKs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Developer-centric prompt engineering tools
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {sdks.map((sdk, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Code2 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{sdk.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{sdk.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Playbooks Section */}
      <section id="playbooks" className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Playbooks</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive step-by-step workflows for prompt engineering
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="max-w-6xl mx-auto"
          >
            <PlaybookStepper />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - White */}
      <section id="faq" className="py-20 bg-white scroll-mt-24">
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

      {/* CTA Band - Matching Cloud */}
      <section className="py-20 bg-[#E52629] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
            Ready to operationalize prompts?
          </h2>
          <p className="font-inter text-xl text-white/95 mb-10">
            Let's discuss your prompt engineering needs and create a tailored plan.
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
