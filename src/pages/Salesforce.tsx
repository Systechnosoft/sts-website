import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeroFlipCarousel } from "@/components/HeroFlipCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { 
  Cloud, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Globe, 
  Database,
  Bot,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  Target,
  Rocket,
  Star,
  ChevronRight
} from "lucide-react";
import { scrollToId } from "@/lib/scrollUtils";
import { cn } from "@/lib/utils";

// Einstein AI Bot Swarm Animation - Wave-based with Six Diagonal Emitters
const BotSwarmAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Respect reduced motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const swarmContainer = root.querySelector('.sf-bot-swarm') as HTMLElement;
    const core = root.querySelector('.sf-core') as HTMLElement;
    if (!swarmContainer || !core) return;

    // Wave state management
    const state = {
      w: 0, h: 0, r: 0,
      center: { x: 0, y: 0 },
      last: performance.now(),
      paused: false,
      inView: false,
      currentWave: [] as any[],
      nextWaveTime: 0,
      waveActive: false,
      coreRadius: 36, // will be calculated dynamically
    };

    function resize() {
      const rect = root.getBoundingClientRect();
      state.w = Math.max(100, Math.floor(rect.width));
      state.h = Math.max(100, Math.floor(rect.height));
      state.r = Math.min(state.w, state.h) * 0.45; // slightly smaller for vanish radius
      state.center.x = state.w / 2;
      state.center.y = state.h / 2;
      
      // Calculate core radius from actual core element
      const coreRect = core.getBoundingClientRect();
      state.coreRadius = Math.max(coreRect.width, coreRect.height) / 2;
    }

    // Six diagonal emitters at exact angles: 0°, 60°, 120°, 180°, 240°, 300°
    function getEmitterPositions() {
      const angles = [0, 60, 120, 180, 240, 300];
      return angles.map(deg => {
        const rad = deg * Math.PI / 180;
        return {
          x: state.center.x + Math.cos(rad) * (state.r - 4),
          y: state.center.y + Math.sin(rad) * (state.r - 4),
          angle: rad,
        };
      });
    }

    function rand(min: number, max: number) { 
      return min + Math.random() * (max - min); 
    }

    function createBotNode() {
      const node = document.createElement('div');
      node.classList.add('bot-node');
      node.setAttribute('aria-hidden', 'true');
      node.innerHTML = `
        <svg class="mini-bot" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="5" y="9" width="14" height="10" rx="2"/>
          <line x1="9" y1="13" x2="9" y2="13"/>
          <line x1="15" y1="13" x2="15" y2="13"/>
          <path d="M7 19h10"/>
          <path d="M12 7v-2"/>
          <circle cx="12" cy="4" r="1"/>
        </svg>`;
      return node;
    }

    // Spawn a complete wave of 6 bots
    function spawnWave() {
      const emitters = getEmitterPositions();
      const newWave: any[] = [];
      
      emitters.forEach((em) => {
        const duration = rand(5000, 10000); // 5-10 seconds
        const size = rand(6, 9);
        const driftX = rand(-4, 4);
        const driftY = rand(-4, 4);
        
        const node = createBotNode();
        swarmContainer.appendChild(node);
        
        newWave.push({
          id: Math.random(),
          node,
          startX: em.x,
          startY: em.y,
          targetX: state.center.x + driftX,
          targetY: state.center.y + driftY,
          duration,
          startTime: performance.now(),
          size,
          alpha: 1,
          vanished: false,
        });
      });
      
      state.currentWave = newWave;
      state.waveActive = true;
    }

    // Cubic bezier easing function
    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function updateBotPosition(bot: any) {
      if (!bot.node) return;
      
      bot.node.style.left = `${bot.x}px`; // Center the 54px node with transform
      bot.node.style.top = `${bot.y}px`;
      bot.node.style.opacity = bot.alpha;
    }

    function updateWave(now: number) {
      if (!state.waveActive || state.currentWave.length === 0) return;

      const vanishRadius = state.coreRadius + 10; // 10px before core
      let allVanished = true;
      let anyVanished = false;

      state.currentWave.forEach(bot => {
        if (bot.vanished) return;
        allVanished = false;

        const elapsed = now - bot.startTime;
        const progress = Math.min(elapsed / bot.duration, 1);
        const eased = easeInOutCubic(progress);
        
        // Calculate position
        bot.x = bot.startX + (bot.targetX - bot.startX) * eased;
        bot.y = bot.startY + (bot.targetY - bot.startY) * eased;
        
        // Check if bot should vanish
        const distToCenter = Math.hypot(bot.x - state.center.x, bot.y - state.center.y);
        if (distToCenter <= vanishRadius) {
          bot.vanished = true;
          anyVanished = true;
          if (bot.node) {
            bot.node.remove();
            bot.node = null;
          }
        } else {
          updateBotPosition(bot);
        }
      });

      // Trigger core pulse if any bot vanished
      if (anyVanished) {
        core.classList.remove('pulse');
        core.offsetWidth; // force reflow
        core.classList.add('pulse');
      }

      // If all bots vanished, schedule next wave
      if (allVanished) {
        state.waveActive = false;
        state.currentWave = [];
        state.nextWaveTime = now + rand(600, 900); // 600-900ms pause
      }
    }

    function tick(now: number) {
      if (!state.inView) { 
        state.last = now; 
        requestAnimationFrame(tick); 
        return; 
      }

      // Handle pause state
      if (state.paused) {
        // When paused, keep current positions but don't update or spawn
        state.last = now;
        requestAnimationFrame(tick);
        return;
      }

      // Spawn new wave if needed
      if (!state.waveActive && now >= state.nextWaveTime) {
        spawnWave();
      }

      // Update current wave
      updateWave(now);

      state.last = now;
      requestAnimationFrame(tick);
    }

    let pauseTimer: NodeJS.Timeout | number;

    function pauseAnimation() {
      state.paused = true;
    }

    function resumeAnimation() {
      state.paused = false;
      clearTimeout(pauseTimer);
    }

    // Visibility & interactions
    const io = new IntersectionObserver((ents) => {
      state.inView = ents.some(e => e.isIntersecting);
    }, { threshold: 0.1 });
    io.observe(root);

    const handlePointerEnter = () => pauseAnimation();
    const handlePointerLeave = () => resumeAnimation();
    const handleFocus = () => pauseAnimation();
    const handleBlur = () => resumeAnimation();

    root.addEventListener('pointerenter', handlePointerEnter);
    root.addEventListener('pointerleave', handlePointerLeave);
    root.addEventListener('focus', handleFocus);
    root.addEventListener('blur', handleBlur);

    // Init
    function start() {
      resize();
      state.inView = true;
      state.last = performance.now();
      state.nextWaveTime = performance.now() + 1000; // First wave after 1s
      if (!reduced) requestAnimationFrame(tick);
      // No canvas clearing needed for DOM-based approach
    }

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    
    start();

    // Cleanup
    return () => {
      io.disconnect();
      window.removeEventListener('resize', handleResize);
      root.removeEventListener('pointerenter', handlePointerEnter);
      root.removeEventListener('pointerleave', handlePointerLeave);
      root.removeEventListener('focus', handleFocus);
      root.removeEventListener('blur', handleBlur);
      clearTimeout(pauseTimer);
      // Clean up any remaining bot nodes
      state.currentWave.forEach(bot => {
        if (bot.node) bot.node.remove();
      });
    };
  }, []);

  return (
    <>
      <style>{`
        [data-sf-einstein] {
          position: relative;
        }
        [data-sf-einstein] .sf-bot-swarm {
          position: absolute; 
          inset: 0; 
          width: 100%; 
          height: 100%;
          pointer-events: none; 
          z-index: 1;
        }
        [data-sf-einstein] .sf-core {
          position: absolute; 
          inset: 0; 
          margin: auto; 
          width: 72px; 
          height: 72px;
          display: grid; 
          place-items: center; 
          z-index: 2;
        }
        
        /* Visual for moving bot nodes - 3x bigger */
        .sf-bot-swarm .bot-node {
          position: absolute;
          width: 54px; 
          height: 54px;
          background: transparent !important;
          display: grid; 
          place-items: center;
          color: #E52629;
          filter: drop-shadow(0 0 9px rgba(229, 38, 41, 0.25));
          pointer-events: none;
          opacity: 0.95;
          transform: translate(-50%, -50%);
        }
        .sf-bot-swarm .bot-node .mini-bot {
          width: 48px; 
          height: 48px;
          transform: translateZ(0);
        }
        
        @keyframes sf-pulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(229, 38, 41, 0)); }
          40% { transform: scale(1.08); filter: drop-shadow(0 0 14px rgba(229, 38, 41, 0.4)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(229, 38, 41, 0)); }
        }
        [data-sf-einstein] .pulse { 
          animation: sf-pulse 520ms cubic-bezier(.22, 1, .36, 1); 
        }
        @media (prefers-reduced-motion: reduce) {
          [data-sf-einstein] .sf-bot-swarm { display: none !important; }
          [data-sf-einstein] .sf-core {
            animation: sf-breathe 3s ease-in-out infinite;
          }
          .sf-bot-swarm .bot-node { filter: none; }
        }
        @keyframes sf-breathe {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(229, 38, 41, 0)); }
          50% { filter: drop-shadow(0 0 8px rgba(229, 38, 41, 0.3)); }
        }
      `}</style>
      <div 
        ref={containerRef}
        className="sf-einstein-orb"
        data-sf-einstein
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '560px',
          aspectRatio: '1/1',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'radial-gradient(120% 120% at 60% 40%, rgba(255,59,48,.12), rgba(86,90,255,.10) 60%, transparent 100%)'
        }}
      >
        <div className="sf-bot-swarm" aria-hidden="true" />
        <div className="sf-core" aria-hidden="true">
          <Bot className="w-full h-full text-primary" />
        </div>
      </div>
    </>
  );
};

// Governance Cards Component with Interactive JSON Swapping
const GovernanceCards: React.FC<{ onCardChange: (id: 'pii' | 'rbac' | 'audit') => void }> = ({ onCardChange }) => {
  const [activeCard, setActiveCard] = useState<'pii' | 'rbac' | 'audit'>('rbac');

  const handleCardClick = (id: 'pii' | 'rbac' | 'audit') => {
    setActiveCard(id);
    onCardChange(id);
  };

  const cards = [
    { 
      id: 'pii' as const, 
      icon: Shield, 
      label: "PII Guardrails"
    },
    { 
      id: 'rbac' as const, 
      icon: Users, 
      label: "RBAC Controls"
    },
    { 
      id: 'audit' as const, 
      icon: BarChart3, 
      label: "Audit Trails"
    }
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(card.id);
              }
            }}
            aria-pressed={activeCard === card.id}
            aria-controls="governance-code-palette"
            className={cn(
              "text-center p-5 rounded-lg bg-white border-2 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2",
              activeCard === card.id 
                ? "border-[#E52629] shadow-lg" 
                : "border-gray-200 hover:border-[#E52629]"
            )}
          >
            <card.icon 
              className={cn(
                "h-8 w-8 mx-auto mb-2 transition-colors",
                activeCard === card.id ? "text-[#E52629]" : "text-[#E52629]/70"
              )} 
            />
            <p className="text-sm font-medium text-[#1C1C1C]">{card.label}</p>
          </button>
        ))}
      </div>
      
      {/* Hidden state for screen readers */}
      <div className="sr-only" aria-live="polite" role="status">
        {activeCard && `${cards.find(c => c.id === activeCard)?.label} selected`}
      </div>
    </>
  );
};

// Governance Panel Wrapper - manages state for both components
const GovernancePanel: React.FC = () => {
  const [activeCard, setActiveCard] = useState<'pii' | 'rbac' | 'audit'>('rbac');

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="lg:sticky lg:top-24 lg:self-start space-y-6"
    >
      <GovernanceCards onCardChange={setActiveCard} />
      <CodePalette activeCard={activeCard} />
    </motion.div>
  );
};

// Code Palette Component
const CodePalette: React.FC<{ activeCard: 'pii' | 'rbac' | 'audit' }> = ({ activeCard }) => {
  const jsonExamples = {
    pii: `{
  "prompt": "Analyze customer data",
  "policy": "mask_pii_fields",
  "action": "redact_sensitive_info"
}`,
    rbac: `{
  "prompt": "Show me top leads for Q4",
  "policy": "filter_by_territory_access",
  "action": "query_with_rbac_filter"
}`,
    audit: `{
  "prompt": "Export Q3 pipeline report",
  "policy": "log_data_access",
  "action": "track_query_metadata"
}`
  };

  return (
    <div 
      id="governance-code-palette"
      className="bg-white rounded-lg p-6 border-l-4 border-[#E52629] shadow-sm"
      role="region"
      aria-label="Code example for governance policy"
    >
      <h4 className="font-semibold text-[#1C1C1C] mb-3">Prompt → Policy → Action</h4>
      <pre className="text-sm text-[#3C3C3C] font-mono overflow-x-auto">
        {jsonExamples[activeCard]}
      </pre>
    </div>
  );
};

const Salesforce = () => {
  const shouldReduceMotion = useReducedMotion();
  const [roiValues, setRoiValues] = useState({ licenses: [100], automation: [30] });
  const [activeSection, setActiveSection] = useState("outcomes");

  // Navigation items (removed ROI, FAQ, Contact)
  const navItems = [
    { id: "outcomes", label: "Overview" },
    { id: "clouds", label: "Clouds" },
    { id: "ai-data", label: "AI & Data" },
    { id: "approach", label: "Approach" },
    { id: "accelerators", label: "Accelerators" },
    { id: "case-studies", label: "Case Studies" }
  ];

  // Scroll spy effect
  useEffect(() => {
    const observers = navItems.map(item => {
      const element = document.getElementById(item.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

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

  const scaleIn = {
    hidden: { scale: shouldReduceMotion ? 1 : 0.96, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  // ROI Calculation
  const calculateROI = () => {
    const licenseCount = roiValues.licenses[0];
    const automationUplift = roiValues.automation[0];
    return Math.round((licenseCount * 1200 * (automationUplift / 100) * 12) / 1000);
  };


  // Cloud cards data
  const cloudCards = [
    {
      id: "sales",
      title: "Sales Cloud",
      icon: TrendingUp,
      description: "Lead routing, pipeline AI scoring, forecast dashboards, CPQ hooks",
      features: ["Lead Routing & Scoring", "AI-Powered Pipeline Analysis", "Revenue Forecasting", "Configure, Price, Quote (CPQ)"]
    },
    {
      id: "service",
      title: "Service Cloud",
      icon: Users,
      description: "Omnichannel support, case deflection, knowledge AI, field service",
      features: ["Omnichannel Support", "AI Case Deflection", "Knowledge Management", "Field Service Lightning"]
    },
    {
      id: "experience",
      title: "Experience Cloud",
      icon: Globe,
      description: "Customer portals, partner networks, community engagement, self-service",
      features: ["Customer Self-Service", "Partner Portals", "Community Building", "Branded Experiences"]
    },
    {
      id: "marketing",
      title: "Marketing Cloud",
      icon: Target,
      description: "Journey orchestration, email automation, social listening, personalization",
      features: ["Customer Journey Mapping", "Email Automation", "Social Media Integration", "AI Personalization"]
    },
    {
      id: "commerce",
      title: "Commerce Cloud",
      icon: ShoppingCart,
      description: "B2B/B2C commerce, order management, inventory sync, mobile-first",
      features: ["Unified Commerce Platform", "Order Management", "Inventory Optimization", "Mobile Commerce"]
    },
    {
      id: "data",
      title: "Data Cloud",
      icon: Database,
      description: "Real-time customer profiles, data harmonization, AI-ready datasets",
      features: ["Customer 360 Profiles", "Real-time Data Sync", "AI-Ready Analytics", "Cross-Cloud Integration"]
    }
  ];

  // Case studies data
  const caseStudies = [
    {
      title: "Financial Services Transformation",
      outcome: "40% faster loan processing",
      description: "Automated compliance workflows and integrated third-party risk systems"
    },
    {
      title: "Manufacturing Supply Chain",
      outcome: "30% operations efficiency",
      description: "Connected Sales Cloud with SAP for real-time inventory visibility"
    },
    {
      title: "Healthcare Patient Experience",
      outcome: "50% faster patient onboarding",
      description: "Integrated Experience Cloud with Epic EHR for seamless care coordination"
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "How long does a typical Salesforce implementation take?",
      answer: "Implementation timelines vary by complexity. A basic Sales Cloud setup typically takes 6-8 weeks, while enterprise multi-cloud implementations can range from 3-6 months. We start with a 2-week discovery phase to provide accurate timelines."
    },
    {
      question: "What's included in your Salesforce implementation approach?",
      answer: "Our approach includes discovery workshops, data migration, custom development, integrations, user training, and 30 days of post-go-live support. We also provide governance frameworks and CoE advisory for long-term success."
    },
    {
      question: "How do you ensure data security during migration?",
      answer: "We implement zero-trust principles with end-to-end encryption, role-based access controls, and audit trails. All data transfers use secure protocols, and we maintain SOC 2 compliance throughout the process."
    },
    {
      question: "Can you integrate Salesforce with our existing systems?",
      answer: "Yes, we have 200+ pre-built connectors and can create custom integrations with systems like SAP, Microsoft Dynamics, NetSuite, and legacy databases. Our integration patterns ensure real-time data sync and maintain system performance."
    },
    {
      question: "What ongoing support do you provide?",
      answer: "We offer 24/7 monitoring, regular health checks, user adoption programs, and Center of Excellence advisory. Our support includes technical assistance, best practice guidance, and strategic planning for scaling your Salesforce investment."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Salesforce Services | Consulting, Implementation & Managed CRM | Systechnosoft</title>
        <meta name="description" content="End-to-end Salesforce services: Sales/Service/Experience/Marketing Cloud, Data Cloud, Einstein AI, integrations, and managed CRM." />
        <meta name="keywords" content="Salesforce, CRM, Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, Einstein AI, Salesforce consulting, Salesforce implementation" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/salesforce" />
      </Helmet>

      <div className="min-h-screen bg-background"
        style={{
          scrollMarginTop: '80px' // Account for local nav height
        }}
      >
        {/* Hero Section */}
        <section 
          id="overview"
          className="hero-animated flex items-center justify-center"
        >
          {/* Animated background */}
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

          <div className="container mx-auto px-4 hero-animated__content">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              {/* Left Content */}
              <div className="space-y-8">
                <motion.div
                  variants={staggeredFadeUp}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.h1 
                    variants={fadeUpVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight"
                  >
                    Salesforce solutions that{" "}
                    <span className="text-primary">move faster</span>—and{" "}
                    <span className="text-primary">scale safer</span>
                  </motion.h1>
                  
                  <motion.p 
                    variants={fadeUpVariants}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl"
                  >
                    From Sales/Service to Experience, Marketing, Commerce, and Data Cloud—with AI you can govern.
                  </motion.p>

                  {/* Benefit Chips */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="sf-hero__chips flex flex-wrap gap-3"
                    aria-label="Key benefits"
                  >
                    {["99.9% uptime patterns", "Zero-trust aligned", "24×7 support"].map((badge, idx) => (
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
                      className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="See what we deliver"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId("clouds");
                      }}
                      title="See what we deliver"
                    >
                      See what we deliver →
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                      aria-label="Claim your free insight"
                    >
                      <Link to="/contact?type=mra" title="Claim your free insight">
                        Claim your free insight
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Content - Hero Image */}
              <motion.figure 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="salesforce-hero__art relative isolate group"
              >
                <img
                  src={new URL('@/assets/hero-salesforce.avif', import.meta.url).href}
                  width={1270} 
                  height={847}
                  alt="Salesforce CRM and automation platform"
                  className="w-full h-auto rounded-2xl border border-[#E6E6E6] shadow-[0_10px_30px_rgba(0,0,0,0.06)] object-cover transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-6px] group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]" 
                  loading="eager" 
                  decoding="async"
                  sizes="(min-width: 1024px) 48vw, 92vw"
                />
                {/* Subtle brand glow */}
                <span 
                  aria-hidden="true" 
                  className="pointer-events-none absolute -inset-3 rounded-[22px] blur-lg opacity-[.18] -z-10"
                  style={{
                    background: `radial-gradient(40% 40% at 20% 30%, #E52629 10%, transparent 70%), radial-gradient(35% 35% at 80% 70%, #00A1E0 10%, transparent 70%)`
                  }}
                />
              </motion.figure>
            </div>
          </div>
        </section>

        {/* Sticky Subsection Navigation - Copied from CloudServices */}
        <nav className="hidden lg:block sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center overflow-x-auto py-4 space-x-8 scrollbar-hide">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className={cn(
                    "flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200",
                    activeSection === item.id
                      ? "bg-[#E52629] text-white shadow-md"
                      : "text-gray-600 hover:text-[#E52629] hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Outcomes You Can Measure - Modern & Futuristic Design */}
        <section id="outcomes" className="py-20 bg-white" style={{ marginTop: 0 }}>
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggeredFadeUp}
              className="text-center space-y-12"
            >
              <motion.h2 variants={fadeUpVariants} className="text-4xl font-bold font-montserrat text-[#1C1C1C]">
                Outcomes you can measure
              </motion.h2>
              
              <motion.div 
                variants={staggeredFadeUp}
                className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto"
              >
                {[
                  { value: "40%", label: "faster workflows", subtext: "Accelerated deal velocity" },
                  { value: "30%", label: "Ops efficiency", subtext: "Streamlined processes" },
                  { value: "50%", label: "faster intercompany", subtext: "Improved lead quality" },
                  { value: "99.9%", label: "uptime SLA", subtext: "Enterprise reliability" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                  >
                    <Card className="text-center p-8 bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg h-full">
                      <CardContent className="p-0 space-y-3">
                        <div className="text-5xl font-bold text-[#E52629]">{stat.value}</div>
                        <div className="text-base font-semibold text-[#1C1C1C]">{stat.label}</div>
                        <div className="text-sm text-[#3C3C3C]">{stat.subtext}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Clouds Grid */}
        <section id="clouds" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggeredFadeUp}
              className="space-y-12"
            >
              <motion.h2 variants={fadeUpVariants} className="text-3xl font-bold font-montserrat text-center">
                Salesforce Clouds We Implement
              </motion.h2>
              
              <motion.div 
                variants={staggeredFadeUp}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {cloudCards.map((cloud) => (
                  <motion.div
                    key={cloud.id}
                    variants={scaleIn}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group cursor-pointer"
                  >
                    <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <cloud.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                          {cloud.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{cloud.description}</p>
                      </CardHeader>
                       <CardContent className="pb-6">
                         <ul className="space-y-2">
                           {cloud.features.map((feature, idx) => (
                             <li key={idx} className="flex items-center gap-2 text-sm">
                               <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                               {feature}
                             </li>
                           ))}
                         </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Einstein 1 & AI Section - Rebuilt with Clear Narrative */}
        <section id="ai-data" className="py-20 bg-[#F5F5F5]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[60fr_40fr] gap-12 max-w-7xl mx-auto">
              {/* Left Column - Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold font-montserrat text-[#1C1C1C]">
                    Einstein 1 & AI that you can govern
                  </h2>
                  <p className="text-lg text-[#3C3C3C] leading-relaxed">
                    Deploy Salesforce AI with enterprise-grade governance, data protection, and audit trails.
                  </p>
                </div>

                {/* Narrative Story Points */}
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#E52629]/10 rounded-full flex items-center justify-center">
                      <Cloud className="h-5 w-5 text-[#E52629]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1C1C1C] mb-1">Unified Platform</h3>
                      <p className="text-sm text-[#3C3C3C]">One license for Sales, Service, Data Cloud, Einstein AI, Slack, Tableau, and industry clouds</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#E52629]/10 rounded-full flex items-center justify-center">
                      <Database className="h-5 w-5 text-[#E52629]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1C1C1C] mb-1">Data Cloud Foundation</h3>
                      <p className="text-sm text-[#3C3C3C]">Unified data layer for 360° customer profiles and context-aware AI activation</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#E52629]/10 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-[#E52629]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1C1C1C] mb-1">Einstein 1 Studio</h3>
                      <p className="text-sm text-[#3C3C3C]">Low-code tools (Copilot, Prompt, Model Builder) to embed AI into workflows</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#E52629]/10 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-[#E52629]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1C1C1C] mb-1">Trust & Governance</h3>
                      <p className="text-sm text-[#3C3C3C]">PII guardrails, RBAC, and audit trails for enterprise compliance</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Interactive Panel */}
              <GovernancePanel />
            </div>
          </div>
        </section>

        {/* Implementation Approach - Modern & Futuristic */}
        <section id="approach" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggeredFadeUp}
              className="space-y-12"
            >
              <motion.h2 variants={fadeUpVariants} className="text-4xl font-bold font-montserrat text-center text-[#1C1C1C]">
                Our Implementation Approach
              </motion.h2>
              
              <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {[
                  {
                    step: "01",
                    title: "Discover",
                    description: "Requirements gathering, system audit, roadmap creation",
                    deliverables: ["Business Process Analysis", "Technical Architecture Review", "Implementation Roadmap", "Risk Assessment"]
                  },
                  {
                    step: "02", 
                    title: "Pilot",
                    description: "MVP deployment, user testing, feedback integration",
                    deliverables: ["MVP Configuration", "User Training Program", "Data Migration Plan", "Integration Testing"]
                  },
                  {
                    step: "03",
                    title: "Scale",
                    description: "Full rollout, performance optimization, user adoption",
                    deliverables: ["Production Deployment", "Performance Monitoring", "User Adoption Metrics", "Support Documentation"]
                  },
                  {
                    step: "04",
                    title: "CoE Advisory",
                    description: "Governance frameworks, best practices, continuous improvement",
                    deliverables: ["Governance Framework", "Best Practices Guide", "Continuous Monitoring", "Strategic Planning"]
                  }
                ].map((phase, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    className="text-center space-y-4"
                  >
                    <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                      <CardContent className="p-6 pt-8 relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#E52629] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                          {phase.step}
                        </div>
                        <div className="space-y-4 mt-4">
                          <h3 className="text-xl font-semibold font-montserrat text-[#1C1C1C]">{phase.title}</h3>
                          <p className="text-[#3C3C3C] text-sm">{phase.description}</p>
                          <ul className="text-sm space-y-2 text-left">
                            {phase.deliverables.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-[#E52629] flex-shrink-0 mt-0.5" />
                                <span className="text-[#3C3C3C]">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={fadeUpVariants} className="text-center pt-4">
                <Button 
                  size="lg"
                  className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white bg-white border-2 focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <Link to="/contact">
                    Get a 6-week pilot plan
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Accelerators & Integrations - Modern Grid Layout */}
        <section id="accelerators" className="py-20 bg-[#F5F5F5]">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="space-y-12 max-w-7xl mx-auto"
            >
              <h2 className="text-4xl font-bold font-montserrat text-center text-[#1C1C1C]">
                Accelerators & Integrations
              </h2>
              
              {/* Multi-row chip grid */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "AppExchange Packages", "SAP Integration", "Microsoft 365", "Slack Integration",
                  "DocuSign", "Tableau", "MuleSoft", "Heroku", "Einstein Analytics", "Pardot",
                  "CPQ", "Field Service", "Community Cloud"
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="px-5 py-2.5 text-sm bg-white border-2 border-gray-200 hover:border-[#E52629] text-[#1C1C1C] transition-colors duration-300 cursor-default"
                    >
                      {item}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories - Modern & Futuristic */}
        <section id="case-studies" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggeredFadeUp}
              className="space-y-12 max-w-7xl mx-auto"
            >
              <motion.h2 variants={fadeUpVariants} className="text-4xl font-bold font-montserrat text-center text-[#1C1C1C]">
                Success Stories
              </motion.h2>
              
              <motion.div 
                variants={staggeredFadeUp}
                className="grid md:grid-cols-3 gap-8"
              >
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    className="group"
                  >
                    <Card className="h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-[#E52629]" />
                          <span className="text-sm font-medium text-[#E52629]">{study.outcome}</span>
                        </div>
                        <CardTitle className="text-xl font-montserrat text-[#1C1C1C]">{study.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#3C3C3C]">{study.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* FAQ - Copied from CloudServices */}
        <section id="faq" className="py-20 bg-[#F5F5F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-[#1C1C1C] mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, idx) => (
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

        {/* CTA Band - Copied from CloudServices */}
        <section className="py-20 bg-[#E52629] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
              Ready to accelerate your Salesforce journey?
            </h2>
            <p className="font-inter text-xl text-white/95 mb-10">
              Get a free consultation and see how we can help you implement Salesforce faster and safer.
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
      </div>
    </>
  );
};

export default Salesforce;