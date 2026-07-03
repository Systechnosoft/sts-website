import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import ServiceHero from "@/components/ServiceHero";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroImage from "@/assets/hero-industries.avif";
import {
  TrendingUp,
  Shield,
  Activity,
  Zap,
  Database,
  Lock,
  Cloud,
  Server,
  Network,
  Heart,
  Plane,
  Droplet,
  Building2,
  FileCheck,
  Workflow,
  CircuitBoard,
  Radio,
  LineChart,
  ArrowRight,
  Factory,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Industries() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("bfsi");

  useEffect(() => {
    // Handle hash-based deep linking and hash changes
    const hash = location.hash.slice(1);
    if (hash && ["bfsi", "healthcare", "aviation", "oil-gas", "faq"].includes(hash)) {
      setActiveSection(hash);
      
      // Scroll to the section immediately
      setTimeout(() => {
        const sectionElement = document.getElementById(hash);
        if (sectionElement) {
          // Account for sticky header (64px) + sticky nav (variable height)
          const headerHeight = 64;
          const navHeight = 60; // Approximate sticky nav height
          const totalOffset = headerHeight + navHeight;
          
          const elementPosition = sectionElement.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: elementPosition - totalOffset,
            behavior: 'instant'
          });
        }
      }, 100);
    }
  }, [location.hash]);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    window.history.pushState(null, "", `#${sectionId}`);
    
    // Scroll to section
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const headerHeight = 64;
      const navHeight = 60;
      const totalOffset = headerHeight + navHeight;
      
      const elementPosition = sectionElement.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementPosition - totalOffset,
        behavior: 'smooth'
      });
    }
  };

  const OutcomeCard = ({ value, label }: { value: string; label: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg p-6 text-center"
    >
      <div className="text-3xl font-bold text-[#E52629] mb-2">{value}</div>
      <div className="text-sm text-neutral-600">{label}</div>
    </motion.div>
  );

  const DeliverableItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
    <div className="flex items-start space-x-3">
      <Icon className="w-5 h-5 text-[#E52629] flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="text-neutral-700">{text}</span>
    </div>
  );

  const ArchCard = ({ icon: Icon, label, caption }: { icon: any; label: string; caption: string }) => (
    <div className="bg-white rounded-lg border border-neutral-200 p-4 hover:border-[#E52629]/60 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <Icon className="w-8 h-8 text-[#E52629] mb-3" aria-hidden="true" />
      <div className="font-semibold text-sm text-neutral-900 mb-1">{label}</div>
      <div className="text-xs text-neutral-500">{caption}</div>
    </div>
  );

  const ComplianceChips = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-3">
      {items.map((item, index) => (
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
  );

  const IndustrySection = ({
    id,
    title,
    icon: SectionIcon,
    lead,
    outcomes,
    deliverables,
    architectureCards,
    complianceItems,
    bgColor = "bg-white",
  }: {
    id: string;
    title: string;
    icon: any;
    lead: string;
    outcomes: Array<{ value: string; label: string }>;
    deliverables: Array<{ icon: any; text: string }>;
    architectureCards: Array<{ icon: any; label: string; caption: string }>;
    complianceItems: string[];
    bgColor?: string;
  }) => (
    <section id={id} className={bgColor}>
      <div className="py-20 md:py-24 max-w-7xl mx-auto px-4">
        {/* Header - Center Aligned */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <SectionIcon className="w-10 h-10 text-[#E52629]" aria-hidden="true" />
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              {title}
            </h2>
          </div>
          <p className="text-xl text-neutral-600">{lead}</p>
        </div>

        {/* Outcomes - Center Aligned */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {outcomes.map((outcome, idx) => (
            <OutcomeCard key={idx} value={outcome.value} label={outcome.label} />
          ))}
        </div>

        {/* What We Deliver - Center Aligned */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">What we deliver</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {deliverables.map((item, idx) => (
              <DeliverableItem key={idx} icon={item.icon} text={item.text} />
            ))}
          </div>
        </div>

        {/* Architecture Strip - Center Aligned with Hover Effects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Architecture</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {architectureCards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-lg border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg p-4">
                <card.icon className="w-8 h-8 text-[#E52629] mb-3 mx-auto" aria-hidden="true" />
                <div className="font-semibold text-sm text-neutral-900 mb-1 text-center">{card.label}</div>
                <div className="text-xs text-neutral-500 text-center">{card.caption}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance - Center Aligned */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Compliance & Standards</h3>
          <ComplianceChips items={complianceItems} />
        </div>
      </div>
    </section>
  );

  const FAQSection = () => (
    <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-[#1C1C1C] mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem 
              value="item-1"
              className="bg-white border border-[#E6E6E6] rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                How do you handle regulated data?
              </AccordionTrigger>
              <AccordionContent className="text-[#3C3C3C]">
                We implement Zero‑Trust architecture, data minimization practices, encryption in transit and at rest, and auditable controls. Our solutions are designed to meet industry‑specific compliance requirements including HIPAA, PCI‑DSS, GDPR, and more.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-2"
              className="bg-white border border-[#E6E6E6] rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                What if we're hybrid/on‑prem?
              </AccordionTrigger>
              <AccordionContent className="text-[#3C3C3C]">
                We support hybrid and on‑premises environments through secure connectors, VPN/ExpressRoute configurations, and edge computing solutions. Our architectures are designed to work seamlessly across cloud and on‑prem infrastructure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-3"
              className="bg-white border border-[#E6E6E6] rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                How fast can we see value?
              </AccordionTrigger>
              <AccordionContent className="text-[#3C3C3C]">
                Our 4–8 week accelerators deliver immediate value through landing zone setup, CIS baseline implementation, and monitoring starter kits. We focus on quick wins while building a foundation for long‑term transformation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-20 bg-[#E52629] text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
          Ready to transform your industry?
        </h2>
        <p className="font-inter text-xl text-white/95 mb-10">
          Let's discuss your goals and craft a tailored plan for measurable outcomes.
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
  );

  return (
    <>
      <Helmet>
        <title>Industries We Serve - BFSI, Healthcare, Aviation, Oil & Gas | Systechnosoft</title>
        <meta
          name="description"
          content="Cloud, data, and AI solutions for BFSI, Healthcare, Aviation, and Oil & Gas. Secure, compliant, and outcomes-driven. 40% faster transaction processing, 30% cost efficiency."
        />
        <link rel="canonical" href="https://www.systechnosoft.com/industries" />
        <meta property="og:title" content="Industries We Serve - BFSI, Healthcare, Aviation, Oil & Gas | Systechnosoft" />
        <meta
          property="og:description"
          content="Cloud, data, and AI solutions for BFSI, Healthcare, Aviation, and Oil & Gas. Secure, compliant, and outcomes-driven."
        />
        <meta property="og:url" content="https://www.systechnosoft.com/industries" />
        <meta property="og:type" content="website" />
      </Helmet>

      <ServiceHero
        title="Industries we power"
        subtitle="Cloud, data, and AI solutions engineered for regulated, mission-critical environments."
        uspChips={[
          "ISO 27001",
          "SOC 2",
          "GDPR/DPDP aware"
        ]}
        primaryButton={{
          text: "View case studies →",
          href: "/case-studies"
        }}
        secondaryButton={{
          text: "Claim your free insight",
          href: "/contact"
        }}
        image={{
          src: heroImage,
          alt: "Industries We Serve",
          width: 1270,
          height: 847
        }}
      />

      {/* Section Navigation - Sticky */}
      <div className="hidden lg:block bg-white py-4 sticky top-16 z-40 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="inline-flex h-auto items-center justify-center p-0 bg-transparent gap-2 flex-wrap">
              <button
                onClick={() => handleNavClick("bfsi")}
                className={`flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                  activeSection === "bfsi"
                    ? 'bg-[#E52629] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#E52629] hover:bg-gray-100'
                }`}
              >
                BFSI
              </button>
              <button
                onClick={() => handleNavClick("healthcare")}
                className={`flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                  activeSection === "healthcare"
                    ? 'bg-[#E52629] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#E52629] hover:bg-gray-100'
                }`}
              >
                Healthcare
              </button>
              <button
                onClick={() => handleNavClick("aviation")}
                className={`flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                  activeSection === "aviation"
                    ? 'bg-[#E52629] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#E52629] hover:bg-gray-100'
                }`}
              >
                Aviation
              </button>
              <button
                onClick={() => handleNavClick("oil-gas")}
                className={`flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                  activeSection === "oil-gas"
                    ? 'bg-[#E52629] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#E52629] hover:bg-gray-100'
                }`}
              >
                Oil & Gas
              </button>
              <button
                onClick={() => handleNavClick("faq")}
                className={`flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                  activeSection === "faq"
                    ? 'bg-[#E52629] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#E52629] hover:bg-gray-100'
                }`}
              >
                FAQ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Sections Displayed Vertically */}
      <div>
        <IndustrySection
          bgColor="bg-white"
          id="bfsi"
          title="BFSI"
          icon={Building2}
          lead="Modern banking is always-on and hyper-personal. We deliver cloud, data, and AI capabilities that keep you compliant, resilient, and delightfully fast."
          outcomes={[
            { value: "30%", label: "faster transaction processing" },
            { value: "40-60%", label: "IT cost efficiency via automation" },
            { value: "24×7", label: "uptime with quarterly DR validation" },
          ]}
          deliverables={[
            { icon: Cloud, text: "Core banking cloud modernization & IaC" },
            { icon: Network, text: "Open Banking APIs & consent (PSD2-ready gateways)" },
            { icon: Database, text: "Data mesh & lakehouse governance" },
            { icon: Activity, text: "Payments observability & SRE SLAs" },
            { icon: Shield, text: "Real‑time fraud prevention (stream ML)" },
            { icon: Workflow, text: "KYC/loan doc intelligence (RPA + OCR/LLM)" },
            { icon: Lock, text: "Zero‑Trust IAM with step‑up auth" },
            { icon: Server, text: "DR runbooks with cross‑region failover" },
          ]}
          architectureCards={[
            { icon: Cloud, label: "Multi‑cloud", caption: "AWS/Azure/GCP with terraform IaC" },
            { icon: Database, label: "Data lakehouse", caption: "Medallion architecture (bronze/silver/gold)" },
            { icon: Network, label: "API layer", caption: "Kong/Apigee gateway with rate limiting" },
            { icon: Shield, label: "Compliance checks", caption: "Policy‑as‑code scans (OPA, Checkov)" },
          ]}
          complianceItems={[
            "PCI‑DSS Level 1",
            "ISO 27001",
            "SOC 2 Type II",
            "GDPR Article 25",
            "RBI guidelines (India)",
            "PSD2 (EU)",
          ]}
        />

        <IndustrySection
          bgColor="bg-[#F5F5F5]"
          id="healthcare"
          title="Healthcare"
          icon={Heart}
          lead="Patient data is sacred. We secure it, unify it, and let you extract insights—all while meeting HIPAA, GDPR, and local privacy standards."
          outcomes={[
            { value: "2–4 hrs", label: "avg time to clinical insight (vs days)" },
            { value: "Zero", label: "PHI breaches post-go-live" },
            { value: "30%", label: "admin cost cut via workflow automation" },
          ]}
          deliverables={[
            { icon: Lock, text: "HIPAA‑grade encryption & BAA compliance" },
            { icon: Database, text: "FHIR‑based data integration (HL7/DICOM pipelines)" },
            { icon: Activity, text: "Real‑time patient monitoring dashboards" },
            { icon: Workflow, text: "Claims automation (OCR + NLP for coding)" },
            { icon: Cloud, text: "Hybrid cloud (on‑prem EHR + cloud analytics)" },
            { icon: Shield, text: "Audit logging & GDPR right‑to‑erasure tools" },
            { icon: CircuitBoard, text: "IoT medical device connectivity (edge gateways)" },
            { icon: LineChart, text: "Predictive analytics (readmission risk, resource planning)" },
          ]}
          architectureCards={[
            { icon: Lock, label: "Zero‑Trust", caption: "mTLS, VPN, ephemeral credentials" },
            { icon: Database, label: "FHIR server", caption: "Azure FHIR or AWS HealthLake" },
            { icon: CircuitBoard, label: "Edge gateways", caption: "Azure IoT Edge for bedside devices" },
            { icon: Shield, label: "Compliance engine", caption: "Automated HIPAA risk assessments" },
          ]}
          complianceItems={[
            "HIPAA",
            "GDPR Article 9 (health data)",
            "HITRUST CSF",
            "FDA 21 CFR Part 11 (eSignatures)",
            "DISHA (India)",
          ]}
        />

        <IndustrySection
          bgColor="bg-white"
          id="aviation"
          title="Aviation"
          icon={Plane}
          lead="Flight operations require 99.99% uptime and instant data. We build cloud-native ops hubs that unify IoT sensors, crew systems, and passenger touchpoints."
          outcomes={[
            { value: "99.99%", label: "ops platform uptime (geo‑redundant)" },
            { value: "50%", label: "faster turnaround via predictive maintenance" },
            { value: "Real‑time", label: "fleet tracking & fuel optimization" },
          ]}
          deliverables={[
            { icon: Radio, text: "ACARS/OOOI data ingestion (real‑time flight telemetry)" },
            { icon: Activity, text: "Predictive MRO (maintenance ML models)" },
            { icon: Database, text: "Centralized ops data lake (weather, crew, fleet)" },
            { icon: Cloud, text: "Multi‑region failover (EU + US + APAC)" },
            { icon: Workflow, text: "Crew scheduling optimization (constraint solver)" },
            { icon: Server, text: "Edge compute at airports (low‑latency baggage tracking)" },
            { icon: Lock, text: "Secure passenger PII handling (PCI + GDPR)" },
            { icon: LineChart, text: "Yield management & dynamic pricing analytics" },
          ]}
          architectureCards={[
            { icon: Cloud, label: "Multi‑region", caption: "Active‑active Azure or AWS regions" },
            { icon: Radio, label: "IoT mesh", caption: "Aircraft sensors → edge → cloud pipeline" },
            { icon: Database, label: "Time‑series DB", caption: "InfluxDB or TimescaleDB for telemetry" },
            { icon: Shield, label: "DR playbook", caption: "Quarterly failover drills, RTO < 15 min" },
          ]}
          complianceItems={[
            "ISO 27001",
            "IATA NDC standards",
            "GDPR (passenger data)",
            "TSA/FAA data security guidelines",
          ]}
        />

        <IndustrySection
          bgColor="bg-[#F5F5F5]"
          id="oil-gas"
          title="Oil & Gas"
          icon={Droplet}
          lead="Edge devices generate terabytes daily. We turn sensor noise into safety insights and cost cuts with real-time ML on the edge and secure lake backends."
          outcomes={[
            { value: "20%", label: "operational cost cut via predictive alerts" },
            { value: "3–5 hrs", label: "faster incident response (edge ML)" },
            { value: "Zero", label: "unplanned downtime (last 12 months)" },
          ]}
          deliverables={[
            { icon: CircuitBoard, text: "Edge ML (anomaly detection on rigs/refineries)" },
            { icon: Database, text: "Unified data lake (SCADA, ERP, IoT streams)" },
            { icon: Activity, text: "Real‑time dashboards (safety, throughput, emissions)" },
            { icon: Cloud, text: "Hybrid architecture (on‑prem SCADA + cloud analytics)" },
            { icon: Workflow, text: "Automated reporting (HSE, ESG compliance)" },
            { icon: Lock, text: "OT security (network segmentation, IDS/IPS)" },
            { icon: Factory, text: "Digital twin of facilities (simulation & optimization)" },
            { icon: LineChart, text: "Predictive maintenance (pump/valve failure forecasts)" },
          ]}
          architectureCards={[
            { icon: CircuitBoard, label: "Edge layer", caption: "AWS Greengrass or Azure IoT Edge at sites" },
            { icon: Database, label: "Data lake", caption: "S3/ADLS with Delta Lake format" },
            { icon: Shield, label: "OT firewall", caption: "Palo Alto or Fortinet for SCADA isolation" },
            { icon: Activity, label: "Monitoring", caption: "Grafana + Prometheus for ops visibility" },
          ]}
          complianceItems={[
            "ISO 27001",
            "IEC 62443 (OT security)",
            "API 1164 (pipeline SCADA)",
            "NERC CIP (critical infrastructure)",
            "EPA Tier II reporting (US)",
          ]}
        />

        <FAQSection />
        <CTASection />
      </div>
    </>
  );
}
