import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  Brain,
  MessageSquare,
  Eye,
  Zap,
  BarChart,
  Lightbulb,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Use cases data
const useCases = [
  {
    title: "Intake & Triage",
    outcome: "Route 85% of requests automatically within 2 minutes",
    how: "NLP classifies intent, ML prioritizes urgency, workflow assigns to correct team",
  },
  {
    title: "KYC/Onboarding",
    outcome: "Cut onboarding time from 3 days to 4 hours",
    how: "Computer vision extracts IDs, ML validates against watchlists, auto-generates profiles",
  },
  {
    title: "Ticket Deflection (NLP)",
    outcome: "Resolve 60% of tier-1 queries without human touch",
    how: "Chatbot uses fine-tuned LLM on knowledge base, escalates complex cases seamlessly",
  },
  {
    title: "Invoice Extraction (CV)",
    outcome: "Process 500+ invoices/hour with 98% accuracy",
    how: "OCR scans documents, CV extracts line items, ML matches to POs and flags anomalies",
  },
  {
    title: "Proactive Alerts",
    outcome: "Predict issues 3-7 days before they occur",
    how: "Time-series ML on metrics, pattern detection, automated notifications to stakeholders",
  },
];

// Capabilities data
const capabilities = [
  {
    icon: Brain,
    title: "ML Models",
    description: "Custom predictive models trained on your data—forecasting, classification, anomaly detection.",
  },
  {
    icon: MessageSquare,
    title: "NLP",
    description: "Sentiment analysis, intent classification, entity extraction, chatbots, and document Q&A.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "OCR, document parsing, image recognition, quality inspection automation.",
  },
  {
    icon: Zap,
    title: "AI-Powered Automation",
    description: "Intelligent workflows that learn from decisions and adapt to exceptions in real time.",
  },
  {
    icon: BarChart,
    title: "Data Analytics & Insights",
    description: "Unified dashboards, automated reporting, KPI tracking with predictive analytics.",
  },
  {
    icon: Lightbulb,
    title: "AI Consultation & Strategy",
    description: "Roadmap workshops, feasibility studies, pilot design, and responsible AI governance.",
  },
];

// KPIs data
const kpis = [
  { value: 4, suffix: "×", label: "Fewer manual steps" },
  { value: 8, suffix: " weeks", label: "Pilot to value" },
  { value: 95, suffix: "%", label: "Intent accuracy" },
  { value: 30, suffix: "%", label: "Faster resolution" },
];

// Accelerators data
const accelerators = [
  { name: "KYC Parser", description: "ID extraction + validation engine" },
  { name: "Invoice OCR", description: "Line-item matcher with anomaly detection" },
  { name: "Document Q&A", description: "Retrieval-augmented generation on your docs" },
  { name: "RPA Hand-off", description: "Intelligent task routing to automation bots" },
  { name: "Approval Flows", description: "Multi-level workflows with ML prioritization" },
  { name: "Analytics Starter", description: "Pre-built dashboards for key metrics" },
];

// FAQ data
const faqs = [
  {
    question: "How long does a typical AI pilot take?",
    answer: "Most pilots run 4-8 weeks from kickoff to initial results. We scope to a single high-impact use case, build iteratively, and measure KPIs weekly.",
  },
  {
    question: "Do I need a data science team in-house?",
    answer: "No. We handle model training, deployment, and monitoring. Your team focuses on domain expertise and feedback loops.",
  },
  {
    question: "What if our data is messy or incomplete?",
    answer: "Part of our discovery includes data quality assessment. We'll help clean, augment, or synthesize data as needed to get started.",
  },
  {
    question: "How do you ensure data privacy and compliance?",
    answer: "We follow GDPR, DPDP, and SOC 2 best practices. All PII handling requires explicit consent, data is encrypted at rest and in transit, and we provide audit trails for compliance review.",
  },
  {
    question: "Can we start small and scale later?",
    answer: "Absolutely. We design pilots to validate ROI before committing to enterprise-wide rollouts. Scaling happens incrementally based on proven outcomes.",
  },
];

// Case studies data (placeholder)
const caseStudies = [
  {
    company: "Global Bank",
    metric: "72% reduction in KYC processing time",
    outcome: "Automated ID verification and watchlist screening using CV and ML",
  },
  {
    company: "Healthcare Provider",
    metric: "60% ticket deflection rate",
    answer: "NLP chatbot handles appointment scheduling and basic inquiries autonomously",
  },
  {
    company: "Manufacturing Corp",
    metric: "98% invoice accuracy at 500/hour",
    outcome: "Computer vision extracts line items, ML matches to POs, flags anomalies",
  },
];

// Particle Constellation Animation - Light Theme
function ParticleConstellationAnimation({ isPaused }: { isPaused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
  }>>([]);
  const prefersReducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with DPR
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Initialize particles
    if (particlesRef.current.length === 0) {
      const particleCount = Math.min(50, Math.floor(width * height / 15000));
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
        });
      }
    }

    const particles = particlesRef.current;
    const connectionDistance = 120;
    let time = 0;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, width, height);

      if (!isPaused) {
        time += 0.016; // ~60fps

        // Update particle positions
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        });
      }

      // Draw connection lines
      ctx.strokeStyle = "rgba(229, 38, 41, 0.08)";
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(229, 38, 41, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with subtle glow
      particles.forEach((p, idx) => {
        const colorCycle = (idx % 3);
        let color;
        if (colorCycle === 0) {
          color = `rgba(229, 38, 41, ${0.6 + Math.sin(time * 2 + idx) * 0.2})`;
        } else if (colorCycle === 1) {
          color = `rgba(0, 122, 255, ${0.5 + Math.sin(time * 2 + idx) * 0.2})`;
        } else {
          color = `rgba(120, 120, 120, ${0.4 + Math.sin(time * 2 + idx) * 0.2})`;
        }

        // Subtle glow
        ctx.shadowBlur = 4;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  if (prefersReducedMotion.current) {
    return (
      <div className="ai-hero-fallback w-full h-full flex items-center justify-center">
        <img 
          src="/img/ai-constellation-still.avif" 
          alt="AI constellation visualization"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="ai-hero-canvas w-full h-full"
      aria-hidden="true"
    />
  );
}

// Rotating Use Case Cards
function RotatingUseCaseCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const pauseTimeoutRef = useRef<NodeJS.Timeout>();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const useCaseCards = [
    { icon: "🎯", title: "Intake & Triage", benefit: "Route 85% of requests automatically within 2 minutes" },
    { icon: "🔐", title: "KYC/Onboarding", benefit: "Cut onboarding time from 3 days to 4 hours" },
    { icon: "💬", title: "Ticket Deflection (NLP)", benefit: "Resolve 60% of tier-1 queries without human touch" },
    { icon: "📄", title: "Invoice Extraction (CV)", benefit: "Process 500+ invoices/hour with 98% accuracy" },
    { icon: "⚡", title: "Proactive Alerts", benefit: "Predict issues 3-7 days before they occur" },
    { icon: "🤖", title: "Agent Assist", benefit: "Boost agent productivity by 40% with AI suggestions" },
  ];

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % useCaseCards.length);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, useCaseCards.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  const handleMouseLeave = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsPaused(false);
  };

  const handleFocus = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  const handleBlur = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsPaused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev - 1 + useCaseCards.length) % useCaseCards.length);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev + 1) % useCaseCards.length);
    }
  };

  const currentCard = useCaseCards[currentIndex];

  return (
    <div
      className="ai-rotating-cards w-full max-w-[360px] lg:max-w-[360px] md:max-w-[300px] mx-auto"
      role="region"
      aria-label="AI use cases"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{
        ['--card-w' as string]: '360px',
        ['--card-h' as string]: '210px',
      }}
    >
      <div 
        className="relative bg-white border border-[#E6E6E6] rounded-lg shadow-lg overflow-hidden"
        style={{ 
          width: 'var(--card-w)', 
          height: 'var(--card-h)',
          perspective: '1000px'
        }}
      >
        <motion.div
          key={currentIndex}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0.85, rotateY: -8 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.3 : 0.35, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="absolute inset-0 p-6 flex flex-col justify-between"
          aria-live="polite"
        >
          <div>
            <div className="text-4xl mb-4">{currentCard.icon}</div>
            <h3 className="text-xl font-bold text-[#1C1C1C] mb-3 font-montserrat">
              {currentCard.title}
            </h3>
            <p className="text-sm text-[#3C3C3C] leading-relaxed">
              {currentCard.benefit}
            </p>
          </div>
          
          <div className="text-xs text-[#3C3C3C]/60 font-medium">
            {currentIndex + 1} of {useCaseCards.length}
          </div>
        </motion.div>

        {/* Hidden titles for screen readers */}
        <div className="sr-only">
          {useCaseCards.map((card, idx) => (
            <span key={idx}>{card.title}</span>
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="text-xs text-center mt-3 text-[#3C3C3C]/60">
        Use ← → arrow keys to navigate
      </p>
    </div>
  );
}

// Carousel component for use cases and case studies
function Carousel({ 
  items, 
  renderSlide, 
  autoAdvanceMs = 4000,
  label
}: { 
  items: any[]; 
  renderSlide: (item: any, index: number) => React.ReactNode;
  autoAdvanceMs?: number;
  label: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoAdvanceMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, items.length, autoAdvanceMs]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <div
      className="ai-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative min-h-[200px]" aria-live="polite">
        {renderSlide(items[currentIndex], currentIndex)}
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="focus-enterprise"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm text-muted-foreground font-variant-numeric: tabular-nums">
          {currentIndex + 1} / {items.length}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          aria-label="Next slide"
          className="focus-enterprise"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Counter component for KPIs
function AnimatedCounter({ 
  end, 
  suffix = "", 
  duration = 2000 
}: { 
  end: number; 
  suffix?: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          if (prefersReducedMotion) {
            setCount(end);
            return;
          }

          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration, hasAnimated, prefersReducedMotion]);

  return (
    <span ref={ref} className="font-variant-numeric: tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function AIAutomation() {
  const [heroAnimationPaused, setHeroAnimationPaused] = useState(false);

  const toggleHeroAnimation = () => {
    setHeroAnimationPaused((prev) => !prev);
  };

  const handleAnimationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggleHeroAnimation();
    }
    if (e.key === "Escape") {
      setHeroAnimationPaused(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI & Automation Services | Systechnosoft Technologies</title>
        <meta 
          name="description" 
          content="Unify ML, NLP, and computer vision with low-code rails. Launch pilots in 4-8 weeks and cut manual steps by 4×." 
        />
        <link rel="canonical" href="https://www.systechnosoft.com/ai-automation" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI & Automation Services | Systechnosoft Technologies" />
        <meta property="og:description" content="Unify ML, NLP, and computer vision with low-code rails. Launch pilots in 4-8 weeks and cut manual steps by 4×." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.systechnosoft.com/ai-automation" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI & Automation Services | Systechnosoft Technologies" />
        <meta name="twitter:description" content="Unify ML, NLP, and computer vision with low-code rails. Launch pilots in 4-8 weeks and cut manual steps by 4×." />
        
        {/* Structured Data - Organization & Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI & Automation Services",
            "provider": {
              "@type": "Organization",
              "name": "Systechnosoft Technologies"
            },
            "description": "Enterprise AI and automation solutions including ML, NLP, computer vision, and intelligent workflows"
          })}
        </script>
      </Helmet>

      <div className="ai-automation-page">
        {/* Hero Section */}
        <section 
          id="hero" 
          className="ai-hero anchor-section relative min-h-[72vh] lg:min-h-[84vh] flex items-center bg-white overflow-hidden"
          data-page="ai-automation"
          style={{
            ['--hero-red' as string]: '#E52629',
            ['--hero-blue' as string]: '#007AFF',
            ['--hero-ink' as string]: '#1C1C1C',
            ['--hero-text' as string]: '#3C3C3C',
            ['--hero-card' as string]: '#FFFFFF',
            ['--hero-border' as string]: '#E6E6E6',
            ['--hero-ease' as string]: 'cubic-bezier(.22,1,.36,1)',
            ['--hero-bg-loop' as string]: '22s',
            ['--hero-slide' as string]: '340ms',
          }}
        >
          {/* Background with subtle corner gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/40 via-white to-blue-50/30" />
          
          {/* Faint tech grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.10]" 
            style={{
              backgroundImage: 'linear-gradient(#E6E6E6 1px, transparent 1px), linear-gradient(90deg, #E6E6E6 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Particle Constellation Background */}
          <div className="absolute inset-0">
            <ParticleConstellationAnimation isPaused={heroAnimationPaused} />
          </div>

          {/* Animation controls */}
          <button
            onClick={toggleHeroAnimation}
            onKeyDown={handleAnimationKeyDown}
            aria-pressed={heroAnimationPaused}
            aria-label={heroAnimationPaused ? "Play animation" : "Pause animation"}
            className="absolute top-8 right-8 z-20 px-4 py-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#E52629] focus:ring-offset-2 shadow-md border border-[#E6E6E6] text-sm font-medium text-[#1C1C1C]"
          >
            {heroAnimationPaused ? (
              <span className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Play
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Pause className="h-4 w-4" />
                Pause
              </span>
            )}
          </button>

          <div className="container relative z-10 px-6 lg:px-12 py-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Copy */}
              <div className="max-w-2xl">
                <motion.h1
                  id="ai-hero"
                  className="text-[clamp(28px,5.2vw,48px)] leading-[1.15] font-bold mb-6 font-montserrat text-[#1C1C1C]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  AI & Automation that ship outcomes
                </motion.h1>

                <motion.p
                  className="text-[clamp(16px,2.2vw,20px)] leading-[1.5] mb-8 text-[#3C3C3C]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Unify data, decisions, and workflows—apply ML, NLP, and computer vision over low-code rails to move KPIs in weeks, not months.
                </motion.p>

                {/* Proof chips with staggered entrance */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08
                      }
                    }
                  }}
                >
                  {["50+ enterprise solutions", "4× fewer manual steps", "Build-to-impact in 4–8 weeks"].map((chip, idx) => (
                    <motion.span
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.4, delay: 0.3 + idx * 0.08 }
                        }
                      }}
                      whileHover={{ y: -2 }}
                      className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#E6E6E6] rounded-full text-[12px] md:text-[13px] font-medium text-[#1C1C1C] shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-1"
                      tabIndex={0}
                    >
                      {chip}
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#E52629] hover:bg-[#D02022] text-white font-montserrat font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all focus:outline-none focus:ring-2 focus:ring-[#E52629] focus:ring-offset-2 text-[14px] md:text-[16px] tracking-wide"
                  >
                    <a href="/contact?type=discovery">
                      Book a 30-minute discovery
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              </div>

              {/* Right Column - Rotating Use Case Cards */}
              <div className="flex items-center justify-center lg:justify-end">
                <RotatingUseCaseCards />
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Carousel */}
        <section id="use-cases" className="ai-use-cases anchor-section py-20 bg-[#F5F5F5]">
          <div className="container px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C1C]">Real-World Use Cases</h2>
              <p className="text-lg text-[#3C3C3C] max-w-2xl mx-auto">
                From intake to insights—see how AI accelerates outcomes across functions.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Carousel
                items={useCases}
                label="AI automation use cases"
                renderSlide={(useCase) => (
                   <Card className="bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-sm p-8">
                     <h3 className="text-2xl font-bold mb-6 text-[#E52629]">{useCase.title}</h3>
                     <div className="space-y-4">
                       <div>
                         <p className="font-semibold text-[#1C1C1C] mb-2">Outcome</p>
                         <p className="text-[#3C3C3C]">{useCase.outcome}</p>
                       </div>
                       <div>
                         <p className="font-semibold text-[#1C1C1C] mb-2">How it works</p>
                         <p className="text-[#3C3C3C]">{useCase.how}</p>
                       </div>
                     </div>
                     <a 
                       href="#approach" 
                       className="inline-flex items-center mt-6 text-[#007AFF] hover:underline focus-enterprise"
                     >
                       See example <ArrowRight className="ml-2 h-4 w-4" />
                     </a>
                   </Card>
                )}
              />
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section id="capabilities" className="ai-capabilities anchor-section py-20 bg-white">
          <div className="container px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C1C]">Our AI Capabilities</h2>
              <p className="text-lg text-[#3C3C3C] max-w-2xl mx-auto">
                End-to-end AI services from strategy to production-grade deployment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1] // ease-out-expo
                  }}
                >
                  <Card className="bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-sm p-6 h-full hover:scale-[1.03] hover:translate-y-[-6px] hover:shadow-lg group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-[#E52629]/10 flex items-center justify-center mb-4 group-hover:bg-[#E52629]/20 transition-colors">
                        <capability.icon className="h-6 w-6 text-[#E52629]" />
                      </div>
                      <CardTitle className="text-xl text-[#1C1C1C]">{capability.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-[#3C3C3C]">
                        {capability.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* KPI Ribbon */}
        <section id="kpis" className="ai-kpis anchor-section py-16 bg-[#E52629] text-white">
          <div className="container px-6 lg:px-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {kpis.map((kpi, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2 font-montserrat">
                    <AnimatedCounter end={kpi.value} suffix={kpi.suffix} />
                  </div>
                  <p className="text-white/90">{kpi.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="ai-approach anchor-section py-20 bg-[#F5F5F5]">
          <div className="container px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C1C]">Our Approach</h2>
              <p className="text-lg text-[#3C3C3C] max-w-2xl mx-auto">
                Structured, iterative, and outcome-focused—every step.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Discover",
                  description: "Map workflows, audit data, identify high-ROI opportunities. Define success metrics and pilot scope.",
                },
                {
                  step: "02",
                  title: "Pilot (4-8 weeks)",
                  description: "Build MVP on real data, validate with end users, measure KPIs weekly. Iterate rapidly based on feedback.",
                },
                {
                  step: "03",
                  title: "Scale",
                  description: "Productionize with monitoring, A/B testing, CI/CD. Roll out to additional teams and workflows.",
                },
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card className="bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-sm p-8 h-full">
                    <div className="text-4xl font-bold text-[#E52629]/20 mb-4 font-montserrat">
                      {phase.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">{phase.title}</h3>
                    <p className="text-[#3C3C3C]">{phase.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Accelerators */}
        <section id="accelerators" className="ai-accelerators anchor-section py-20 bg-white">
          <div className="container px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C1C]">Pre-Built Accelerators</h2>
              <p className="text-lg text-[#3C3C3C] max-w-2xl mx-auto">
                Jump-start your pilot with proven components—customize and deploy in days.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {accelerators.map((accelerator, index) => (
                <motion.div
                  key={accelerator.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card className="bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-sm hover:shadow-md p-6">
                    <h3 className="font-bold mb-2 text-[#1C1C1C]">{accelerator.name}</h3>
                    <p className="text-sm text-[#3C3C3C] mb-4">{accelerator.description}</p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-[#007AFF] hover:underline focus-enterprise"
                      asChild
                    >
                      <a href="/contact?type=accelerator">Get started →</a>
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="ai-case-studies anchor-section py-20 bg-[#F5F5F5]">
          <div className="container px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C1C]">Success Stories</h2>
              <p className="text-lg text-[#3C3C3C] max-w-2xl mx-auto">
                Real outcomes from real deployments.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Carousel
                items={caseStudies}
                label="Client success stories"
                renderSlide={(study) => (
                  <Card className="bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-sm p-8 text-center">
                    <div className="text-3xl font-bold text-[#E52629] mb-4 font-montserrat">
                      {study.metric}
                    </div>
                    <p className="text-lg mb-4 text-[#1C1C1C]">{study.outcome}</p>
                    <p className="text-sm text-[#3C3C3C]">— {study.company}</p>
                  </Card>
                )}
              />
              <div className="text-center mt-8">
                <Button variant="outline" asChild className="focus-enterprise">
                  <a href="/contact">View all case studies</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="ai-faq anchor-section py-20 bg-white">
          <div className="container px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C1C]">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-[#E6E6E6] rounded-lg px-6 bg-white"
                  >
                    <AccordionTrigger className="hover:no-underline text-left font-semibold text-[#1C1C1C]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#3C3C3C]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="ai-contact anchor-section py-20 bg-[#F5F5F5]">
          <div className="container px-6 lg:px-12">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C1C]">Let's Build Together</h2>
                <p className="text-lg text-[#3C3C3C]">
                  Share your challenge—we'll respond within 24 hours with next steps.
                </p>
              </div>

              <Card className="bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-sm p-8">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input 
                        id="name" 
                        required 
                        className="focus-enterprise"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        className="focus-enterprise"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input 
                      id="company" 
                      required 
                      className="focus-enterprise"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your challenge *</Label>
                    <Textarea 
                      id="message" 
                      required 
                      rows={5}
                      className="focus-enterprise resize-none"
                      placeholder="We're looking to automate our invoice processing..."
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="consent" 
                      required 
                      className="mt-1"
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer text-[#3C3C3C]">
                      By submitting, you agree to be contacted and to our{" "}
                      <a href="/privacy" className="text-[#007AFF] hover:underline">
                        privacy policy
                      </a>
                      . We handle all PII in compliance with GDPR and DPDP regulations.
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full font-montserrat font-medium"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </Card>

              {/* Contact info */}
              <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <Mail className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">contact@systechnosoft.com</p>
                </div>
                <div>
                  <Phone className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <div>
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .ai-automation-page {
          /* Page-scoped styles */
        }
        
        .ai-hero-canvas {
          image-rendering: crisp-edges;
        }
        
        .ai-hero-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(229, 38, 41, 0.1) 0%, transparent 100%);
        }
        
        .ai-carousel {
          outline: none;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .ai-hero-canvas {
            display: none;
          }
          .ai-hero-fallback {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
