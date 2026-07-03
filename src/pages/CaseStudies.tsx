import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight,
  Building2,
  Heart,
  Plane,
  Factory,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceHero from "@/components/ServiceHero";
import { CountUpNumber } from "@/components/CountUpNumber";
import heroImage from "@/assets/hero-case-studies-new.avif";

// Industry navigation items
const industryNav = [
  { id: "bfsi", label: "BFSI" },
  { id: "healthcare", label: "Healthcare" },
  { id: "aviation", label: "Aviation" },
  { id: "oil-gas", label: "Oil & Gas" },
  { id: "faq", label: "FAQ" },
];

// Industry data structure
const industries = [
  {
    id: "bfsi",
    name: "BFSI",
    icon: Building2,
    lead: "Always‑on, compliant, and personalized—core banking at cloud speed.",
    kpis: [
      { value: 40, suffix: "%", label: "Faster processing" },
      { value: 24, suffix: "×7", label: "Uptime" },
      { value: 60, suffix: "×", label: "Automation" },
    ],
    cases: [
      {
        title: "Global Markets Workbench — 60× automation",
        overview: "Unified trade processing for a top AU bank's global markets desk.",
        challenges: ["Siloed systems", "Manual handoffs", "Compliance visibility"],
        solution: "Low‑code workflow (Appian), APIs into trading/settlement; real‑time dashboards.",
        techBadges: ["Appian", "REST APIs", "Audit trails", "SSO/IAM"],
        outcomes: ["~40% faster processing", "Improved compliance tracking", "Near‑zero manual rework"],
      },
      {
        title: "Customer Sophistication Classification — 80× automation",
        overview: "Automated CSC/PSA renewals and reminders; removed manual follow‑ups.",
        challenges: ["Thousands of expiries", "Backlog", "Audit pain"],
        solution: "Appian jobs + notifications; CMS sync; escalations; role‑based access.",
        techBadges: ["Appian", "CMS connector", "Email/SMS", "RBAC"],
        outcomes: ["~80% cycle time reduction", "Zero missed approvals", "Clean audit trails"],
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Heart,
    lead: "Interoperable EHR, AI‑assisted care, and operational visibility.",
    kpis: [
      { value: 20, suffix: "%", label: "Operational efficiency lift" },
      { value: 15, suffix: "%", label: "Lower readmissions" },
      { value: 99.97, suffix: "%", label: "Platform uptime" },
    ],
    cases: [
      {
        title: "Employee Management System — 30× automation",
        overview: "Portal for attendance, certifications, and performance.",
        challenges: ["Fragmented HR tools", "Missed expiries", "Slow reporting"],
        solution: "Appian portal; HRIS integration; KPI dashboards; mobile access.",
        techBadges: ["Appian", "HRIS API", "Mobile responsive", "PHI encryption"],
        outcomes: ["~20% admin cost reduction", "Real‑time compliance reporting", "Higher productivity"],
      },
    ],
  },
  {
    id: "aviation",
    name: "Aviation",
    icon: Plane,
    lead: "Predictive ops, faster turnarounds, and pilot‑first digital flows.",
    kpis: [
      { value: 30, suffix: "%", label: "Reduction in downtime" },
      { value: 50, suffix: "%", label: "Fuel savings potential" },
      { value: 85, suffix: "%", label: "Faster turnarounds" },
    ],
    cases: [
      {
        title: "Solo Pilot Platform",
        overview: "Unified portal for flight requests, services, and payments.",
        challenges: ["Phone/email coordination", "Inconsistent fees", "Multi‑role access"],
        solution: "Angular portal + Appian orchestration; OTP; Hyperpay; QR service verification.",
        techBadges: ["Angular", "Appian", "PostgreSQL", "Hyperpay", "QR"],
        outcomes: ["Faster confirmations", "Fewer manual calls", "Transparent billing", "Higher CSAT"],
      },
    ],
  },
  {
    id: "oil-gas",
    name: "Oil & Gas",
    icon: Factory,
    lead: "Instrumented, automated, safer—data‑driven operations from well to refinery.",
    kpis: [
      { value: 30, suffix: "%", label: "Operational efficiency" },
      { value: 10, suffix: "%", label: "Maintenance cost reduction" },
      { value: 5, suffix: "%", label: "OEE improvement" },
    ],
    cases: [
      {
        title: "Turnkey Apps — 20× automation",
        overview: "Field workforce scheduling, job tracking, and offline reporting.",
        challenges: ["Manual rosters", "Limited visibility", "Remote connectivity"],
        solution: "Appian workflows; mobile app (offline); asset integrations; dashboards.",
        techBadges: ["Appian", "React Native", "Asset APIs", "Power BI"],
        outcomes: ["~30% operational efficiency lift", "Faster maintenance cycles", "Cleaner data"],
      },
    ],
  },
];

// FAQ data
const faqs = [
  {
    question: "Can I get the architecture?",
    answer: "Yes. For each case study we can share a sanitized architecture diagram highlighting the data flow, core services (cloud, data, AI/ML), security controls, and SLAs. Proprietary details are masked; we'll provide a walkthrough on request.",
  },
  {
    question: "Security & compliance?",
    answer: "We design with Zero‑Trust principles, encryption in transit/at rest, and auditable controls. Our programs map to frameworks like ISO 27001, SOC 2, HIPAA, PCI‑DSS, GDPR/DPDP depending on the industry and scope.",
  },
  {
    question: "How do you validate the results (e.g., 40% faster, 60× automation)?",
    answer: "Metrics are co-defined up front (cycle time, uptime, costs, error rate). We measure with product analytics/observability dashboards and client sign‑off before publishing.",
  },
  {
    question: "How quickly can outcomes be realized?",
    answer: "We aim for 4–8 week accelerators to show first value and 12–16 weeks for scalable rollout. Timelines vary by integration depth and data readiness.",
  },
  {
    question: "Will you sign an NDA / can you share more detail privately?",
    answer: "Absolutely. We frequently provide deeper runbooks, diagrams, and demos under NDA tailored to your use case.",
  },
  {
    question: "Which tech stacks do these case studies cover?",
    answer: "Cloud (AWS/Azure/GCP), data platforms (Lakehouse, streaming), AI (OpenAI/Bedrock/Azure AI), mobile (iOS/Android/Flutter/RN/KMP), and modern CI/CD & observability.",
  },
  {
    question: "Can you curate case studies specific to my industry and constraints?",
    answer: "Yes—tell us your goals, constraints (on‑prem, regulated, latency, cost), and we'll assemble a relevant pack with outcomes and reference architectures.",
  },
];

export default function CaseStudies() {
  const [activeSection, setActiveSection] = useState("bfsi");

  // Handle hash-based deep linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const validSections = ["bfsi", "healthcare", "aviation", "oil-gas", "faq"];
    
    if (hash && validSections.includes(hash)) {
      setActiveSection(hash);
      
      // Scroll to the section after a brief delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const headerHeight = 64; // top-16 = 64px
          const navElement = document.querySelector('[data-sticky-nav]');
          const navHeight = navElement?.getBoundingClientRect().height || 0;
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          const targetPosition = elementTop - headerHeight - navHeight - 16; // Extra padding
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'instant'
          });
        }
      }, 100);
    }
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    window.history.pushState(null, "", `#${sectionId}`);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64;
      const navElement = document.querySelector('[data-sticky-nav]');
      const navHeight = navElement?.getBoundingClientRect().height || 0;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const targetPosition = elementTop - headerHeight - navHeight - 16; // Extra padding
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'instant'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Case Studies | Systechnosoft</title>
        <meta 
          name="description" 
          content="Proven results in BFSI, Healthcare, Aviation, and Oil & Gas. Explore detailed challenges, solutions, and outcomes—delivered with cloud, data, and AI." 
        />
        <link rel="canonical" href="https://www.systechnosoft.com/case-studies" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Case Studies | Systechnosoft" />
        <meta property="og:description" content="Proven results in BFSI, Healthcare, Aviation, and Oil & Gas. Explore detailed challenges, solutions, and outcomes—delivered with cloud, data, and AI." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.systechnosoft.com/case-studies" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Case Studies | Systechnosoft" />
        <meta name="twitter:description" content="Proven results in BFSI, Healthcare, Aviation, and Oil & Gas. Explore detailed challenges, solutions, and outcomes—delivered with cloud, data, and AI." />
        
        {/* Structured Data - CollectionPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Case Studies",
            "description": "Proven results in BFSI, Healthcare, Aviation, and Oil & Gas",
            "provider": {
              "@type": "Organization",
              "name": "Systechnosoft Technologies"
            },
            "hasPart": industries.map(industry => ({
              "@type": "Article",
              "headline": industry.name,
              "description": industry.lead,
              "url": `https://www.systechnosoft.com/case-studies#${industry.id}`
            }))
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <ServiceHero
          title="Case Studies"
          subtitle="Real outcomes across BFSI, Healthcare, Aviation, and Oil & Gas—delivered with cloud, data, and AI."
          uspChips={[
            "Faster operations",
            "Smarter decisions",
            "Stronger compliance"
          ]}
          primaryButton={{
            text: "See Industries →",
            href: "/industries"
          }}
          secondaryButton={{
            text: "Claim your free insight",
            href: "/contact"
          }}
          image={{
            src: heroImage,
            alt: "Case Studies",
            placeholderPrompt: "A professional showcase of successful technology projects across different industries, with charts, metrics, and industry icons",
            width: 1270,
            height: 847
          }}
        />

        {/* Industry Navigation - Sticky */}
        <div className="hidden lg:block bg-white py-8 sticky top-16 z-40 border-b border-gray-200" data-sticky-nav>
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="inline-flex h-auto items-center justify-center p-0 bg-transparent gap-2">
                {industryNav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-[#E52629] text-white shadow-md'
                        : 'text-gray-600 hover:text-[#E52629] hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Sections - Vertical Display */}
        <div className="bg-background">
          {industries.map((industry) => (
            <section key={industry.id} id={industry.id} className="py-16 md:py-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                {/* Industry Header - Center Aligned */}
                <div className="mb-12 text-center max-w-4xl mx-auto">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <industry.icon className="w-10 h-10 text-[#E52629]" aria-hidden="true" />
                    <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-[#1C1C1C]">
                      {industry.name}
                    </h2>
                  </div>
                  <p className="text-lg text-neutral-600">
                    {industry.lead}
                  </p>
                </div>

                {/* KPIs - Center Aligned with Modern Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                  {industry.kpis.map((kpi, kpiIdx) => (
                    <motion.div
                      key={kpiIdx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: kpiIdx * 0.1, duration: 0.4 }}
                      className="bg-white border-2 border-gray-200 hover:border-[#E52629] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 rounded-xl p-6 text-center"
                    >
                      <div className="text-4xl font-bold text-[#E52629] mb-2 font-montserrat">
                        <CountUpNumber 
                          end={kpi.value} 
                          suffix={kpi.suffix}
                          duration={2000}
                        />
                      </div>
                      <p className="text-sm text-neutral-600">
                        {kpi.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Case Studies - Accordion with Modern Styling */}
                <div className="space-y-6 mb-12 max-w-5xl mx-auto">
                  <Accordion type="single" collapsible className="space-y-4">
                    {industry.cases.map((caseStudy, caseIdx) => (
                      <AccordionItem
                        key={caseIdx}
                        value={`case-${caseIdx}`}
                        className="border-2 border-gray-200 hover:border-[#E52629] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="bg-[#E52629]/10 rounded-lg p-3 mt-1">
                              <TrendingUp className="w-5 h-5 text-[#E52629]" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-[#1C1C1C] mb-1 group-hover:text-[#E52629] transition-colors">
                                {caseStudy.title}
                              </h3>
                              <p className="text-sm text-neutral-600">
                                {caseStudy.overview}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                
                        <AccordionContent className="px-6 pb-6">
                          <div className="space-y-6 pt-4">
                            {/* Overview */}
                            <div>
                              <h4 className="text-sm font-semibold text-[#1C1C1C] uppercase tracking-wide mb-2 flex items-center gap-2">
                                <Database className="w-4 h-4 text-[#E52629]" aria-hidden="true" />
                                Overview
                              </h4>
                              <p className="text-neutral-700">
                                {caseStudy.overview}
                              </p>
                            </div>

                            {/* Challenges */}
                            <div>
                              <h4 className="text-sm font-semibold text-[#1C1C1C] uppercase tracking-wide mb-3">
                                Challenges
                              </h4>
                              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {caseStudy.challenges.map((challenge, chIdx) => (
                                  <li 
                                    key={chIdx}
                                    className="flex items-start gap-2 text-sm text-neutral-700 bg-gray-50 rounded-lg p-3"
                                  >
                                    <span className="text-[#E52629] mt-0.5">•</span>
                                    <span>{challenge}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Solution */}
                            <div>
                              <h4 className="text-sm font-semibold text-[#1C1C1C] uppercase tracking-wide mb-3 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-[#E52629]" aria-hidden="true" />
                                Solution
                              </h4>
                              <p className="text-neutral-700 mb-3">
                                {caseStudy.solution}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {caseStudy.techBadges.map((tech, techIdx) => (
                                  <Badge 
                                    key={techIdx}
                                    variant="secondary"
                                    className="text-xs px-3 py-1 bg-white border-2 border-gray-200 hover:border-[#E52629] text-[#1C1C1C] transition-colors"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Outcomes */}
                            <div>
                              <h4 className="text-sm font-semibold text-[#1C1C1C] uppercase tracking-wide mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-[#E52629]" aria-hidden="true" />
                                Outcomes
                              </h4>
                              <ul className="space-y-2">
                                {caseStudy.outcomes.map((outcome, outIdx) => (
                                  <li 
                                    key={outIdx}
                                    className="flex items-start gap-3 text-sm text-neutral-700"
                                  >
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* FAQ Section - Matching Cloud Services Pattern */}
        <section id="faq" className="py-20 bg-[#F5F5F5]">
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

        {/* Final CTA Section - Matching Cloud Services Pattern */}
        <section className="py-20 bg-[#E52629] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
              Ready to turn outcomes into your next case study?
            </h2>
            <p className="font-inter text-xl text-white/95 mb-10">
              Let's review your goals and design a results‑driven path.
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
      </main>
    </>
  );
}
