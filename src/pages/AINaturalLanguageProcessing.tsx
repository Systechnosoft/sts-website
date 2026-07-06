import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, Shield, Zap, TrendingUp, MessageSquare, ArrowRight, Code2, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { scrollToId } from "@/lib/scrollUtils";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-nlp-new.avif";

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
  { id: "faq", label: "FAQ" }
];

const benefits = [
  {
    icon: Zap,
    title: "Faster decisions",
    description: "Surface key facts from long text in seconds"
  },
  {
    icon: TrendingUp,
    title: "Lower ops cost",
    description: "Automate tagging, routing, summaries"
  },
  {
    icon: MessageSquare,
    title: "Better CX",
    description: "Real-time sentiment & intent for responses"
  },
  {
    icon: Shield,
    title: "Governed & safe",
    description: "PII redaction, toxicity filters, audit logs"
  }
];

const useCases = [
  {
    icon: MessageSquare,
    title: "AI assistants for support & internal knowledge",
    description: "Build conversational interfaces with context-aware responses"
  },
  {
    icon: TrendingUp,
    title: "Summarization of tickets, chats, calls, docs",
    description: "Extract key points and action items automatically"
  },
  {
    icon: Shield,
    title: "Sentiment/intent classification at scale",
    description: "Understand customer emotions and routing priorities"
  },
  {
    icon: Zap,
    title: "Entity/keyword extraction for analytics",
    description: "Identify and categorize important information"
  },
  {
    icon: Sparkles,
    title: "Speech-to-text notes, topical clustering",
    description: "Transcribe and organize spoken content"
  },
  {
    icon: Globe,
    title: "Real-time language translation & localization",
    description: "Translate content and UI at scale with glossary + review flows"
  }
];

const capabilities = [
  {
    title: "Text & speech ingestion (streaming + batch)",
    description: "Handle real-time and batch processing of text and audio inputs"
  },
  {
    title: "Tokenization, POS/NER, dependency parsing",
    description: "Break down and analyze linguistic structures"
  },
  {
    title: "Semantic search & RAG (chunking, embeddings, vector DB)",
    description: "Build intelligent retrieval and context-aware generation"
  },
  {
    title: "Guardrails: PII masking, profanity/toxicity, jailbreak filters",
    description: "Ensure safe and compliant NLP outputs"
  },
  {
    title: "Evaluation & monitoring (latency, accuracy, drift)",
    description: "Track performance metrics and model quality"
  },
  {
    title: "CI/CD for prompts/configs; feature flags & rollback",
    description: "Deploy and manage NLP features with confidence"
  }
];

const sdks = [
  {
    title: "Tokenizers & transformers (JS/Python)",
    description: "Core NLP building blocks for text processing"
  },
  {
    title: "Embeddings & vector stores",
    description: "Semantic search and similarity matching"
  },
  {
    title: "Speech-to-text & text-to-speech adapters",
    description: "Audio processing and synthesis integrations"
  },
  {
    title: "Tracing/evals/observability SDKs",
    description: "Monitor and debug NLP pipelines"
  }
];

const faqs = [
  {
    question: "How do you ensure data privacy in NLP workflows?",
    answer: "We implement PII detection and masking at ingestion, use encrypted storage and transmission, and provide granular access controls. All processing can be done on-premises or in your private cloud with full audit trails for compliance."
  },
  {
    question: "Can we choose or swap NLP models?",
    answer: "Yes, our platform is model-agnostic and supports multiple providers. You can A/B test models, implement fallback chains, and swap models without code changes through configuration."
  },
  {
    question: "How do you evaluate NLP accuracy?",
    answer: "We provide continuous evaluation frameworks with metrics dashboards, human-in-the-loop validation workflows, and automated regression testing. You can track precision, recall, F1 scores, and domain-specific KPIs in real-time."
  },
  {
    question: "What latency can we expect?",
    answer: "Most NLP operations complete in under 200ms with our optimized pipelines. Speech-to-text typically runs at 0.8-1.2x real-time, while text processing is near-instant. We provide SLAs based on your specific requirements."
  }
];

export default function AINaturalLanguageProcessing() {
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
        <title>Natural Language Processing (NLP) Services | Systechnosoft</title>
        <meta 
          name="description" 
          content="Understand, summarize, and act on text & speech using production-grade NLP primitives and SDKs. Privacy-first, low-latency NLP pipelines." 
        />
        <meta name="keywords" content="natural language processing, NLP, text analysis, speech recognition, sentiment analysis, entity extraction, RAG, embeddings" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/ai-natural-language-processing" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-animated relative min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden bg-white py-24">
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

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-[1200px] mx-auto">
              
              {/* Left Column - Text Content */}
              <motion.div
                variants={staggeredFadeUp}
                initial="hidden"
                animate="visible"
                className="space-y-6 lg:space-y-8"
              >
                <motion.h1 
                  variants={fadeUpVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                >
                  Turn language into live business signals
                </motion.h1>

                <motion.p 
                  variants={fadeUpVariants}
                  className="text-lg sm:text-xl text-muted-foreground max-w-2xl"
                >
                  Understand, summarize, and act on text & speech using production‑grade NLP primitives and SDKs.
                </motion.p>

                <motion.div 
                  variants={fadeUpVariants}
                  className="flex flex-wrap gap-3"
                  aria-label="Key benefits"
                >
                  {["Tokenization to insights", "Low‑latency pipelines", "Privacy‑first NLP"].map((badge, idx) => (
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
                        {idx === 0 && <Sparkles className="h-4 w-4 mr-2" />}
                        {idx === 1 && <Zap className="h-4 w-4 mr-2" />}
                        {idx === 2 && <Shield className="h-4 w-4 mr-2" />}
                        {badge}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  variants={fadeUpVariants}
                  className="flex flex-col sm:flex-row gap-3 pt-4"
                >
                  <Button
                    size="lg"
                    onClick={() => scrollToId('benefits')}
                    className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    See what we deliver →
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                  >
                    <Link to="/contact?type=mra">Claim your free insight</Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Column - Hero Image */}
              <motion.figure
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="nlp-hero__art relative isolate group"
              >
                <img 
                  src={heroImage}
                  width={1270}
                  height={847}
                  alt="Natural Language Processing platform showing text and speech transformation into actionable insights"
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
                    background: `radial-gradient(40% 40% at 20% 30%, #E52629 10%, transparent 70%), radial-gradient(35% 35% at 80% 70%, #10B981 10%, transparent 70%)`
                  }}
                />
              </motion.figure>

            </div>
        </div>
      </section>

      {/* Local Section Nav */}
      <nav className="hidden lg:block sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center overflow-x-auto py-4 space-x-8 scrollbar-hide">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className={cn(
                  "flex-shrink-0 font-medium text-sm px-4 py-2 rounded-full transition-all duration-200",
                  activeSection === id
                    ? "bg-[#E52629] text-white shadow-md"
                    : "text-gray-600 hover:text-[#E52629] hover:bg-gray-100"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Overview Section */}
      <section id="overview" className="py-16 sm:py-20 lg:py-24 scroll-mt-24">
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
              We provide NLP technologies and SDKs covering text and speech ingestion, processing—including tokenization, 
              tagging, and parsing—embeddings for RAG, and safe generation. Our platform emphasizes privacy-first design 
              and governance alignment, enabling teams to extract actionable insights from unstructured language data 
              while maintaining compliance and security standards.
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
              Transform unstructured language into structured business value
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

      {/* Use Cases Section */}
      <section id="use-cases" className="py-16 sm:py-20 lg:py-24 scroll-mt-24">
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
              Real-world applications of NLP technology
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
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{useCase.description}</p>
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
              Comprehensive NLP pipeline and governance features
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredFadeUp}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {capabilities.map((capability, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{capability.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SDKs Section */}
      <section id="sdks" className="py-16 sm:py-20 lg:py-24 scroll-mt-24">
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
              Developer-centric NLP tools and integrations
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
                <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Code2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{sdk.title}</h3>
                    <p className="text-muted-foreground text-sm">{sdk.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common questions about our NLP services
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="max-w-3xl mx-auto"
          >
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
          </motion.div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-[#E52629] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
            Ready to build NLP into your product?
          </h2>
          <p className="font-inter text-xl text-white/95 mb-10">
            Let's discuss your NLP requirements and create a tailored solution.
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
