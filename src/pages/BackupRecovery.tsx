import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ServiceHero";
import { ArrowRight, Shield, Clock, Database, Cloud, Server, Archive, FileCheck, Lock, Eye, BarChart3, MapPin, CheckCircle, AlertTriangle, Users, KeySquare, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useBackupRecoveryAssessmentStore } from "@/lib/backup-recovery-assessment-store";

export default function BackupRecovery() {
  const { openAssessment } = useBackupRecoveryAssessmentStore();
  const [activeSection, setActiveSection] = useState("br-overview");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const subNavItems = [
    { id: "br-overview", label: "Overview" },
    { id: "br-coverage", label: "Choose your coverage" },
    { id: "br-compliance", label: "Compliance & Security" },
    { id: "br-platforms", label: "Platforms & Tools" },
  ];

  const platformTools = [
    {
      icon: Cloud,
      title: "AWS Backup",
      description: "Policy-based backups across EC2/EBS/RDS/EFS/DynamoDB with lifecycle to Glacier tiers",
      badges: ["Cloud", "Immutable"],
      features: ["S3 Object Lock", "Lifecycle policies"],
      category: ["Cloud", "Storage Tiers"],
    },
    {
      icon: Cloud,
      title: "Azure Backup",
      description: "Vault-based protection for VM/SQL/SAP HANA with tiering to Archive storage",
      badges: ["Cloud"],
      features: ["App-consistent", "Archive tier"],
      category: ["Cloud", "Databases"],
    },
    {
      icon: Cloud,
      title: "Google Backup and DR",
      description: "Agentless backup/DR for GCE/Databases with app-consistent restores",
      badges: ["Cloud"],
      features: ["Agentless", "App-aware"],
      category: ["Cloud", "DR & Orchestration"],
    },
  ];


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0, 0.3, 0.5, 0.7, 1], rootMargin: "-140px 0px -35% 0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const targetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Data Backup & Recovery Services | Enterprise Protection | Systechnosoft</title>
        <meta 
          name="description" 
          content="Protect mission-critical data with immutable backups, hybrid storage, and disaster recovery you can test and trust. 99.9%+ restore success with 24×7 monitoring." 
        />
        <meta property="og:title" content="Data Backup & Recovery Services | Enterprise Protection | Systechnosoft" />
        <meta property="og:description" content="Protect mission-critical data with immutable backups, hybrid storage, and disaster recovery you can test and trust. 99.9%+ restore success with 24×7 monitoring." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/backup-recovery" />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <ServiceHero
          id="hero"
          dataPage="backup-recovery"
          title="Data Backup & Recovery Services"
          subtitle="Protect mission-critical data with immutable backups, hybrid storage, and disaster recovery you can test and trust."
          uspChips={["99.9%+ restore success", "Hybrid (on‑prem + cloud)", "Tested quarterly"]}
          primaryButton={{
            text: "Request DR review",
            onClick: (e) => {
              e.preventDefault();
              openAssessment();
            },
            ariaLabel: "Request a disaster recovery review"
          }}
          secondaryButton={{
            text: "Claim Your Free Insight",
            href: "/contact",
            ariaLabel: "Claim your free backup and recovery insight"
          }}
          image={{
            src: new URL('@/assets/hero-backup-recovery-new.avif', import.meta.url).href,
            width: 1270,
            height: 847,
            alt: "Enterprise backup and disaster recovery infrastructure with cloud and on-premises storage tiers",
            placeholderPrompt: "Professional 3D illustration of enterprise backup infrastructure with cloud storage, on-premises servers, data replication flows, and disaster recovery orchestration in modern tech style with blue and red accents"
          }}
        />

        {/* Sticky Navigation */}
        <div className="hidden lg:block sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-center overflow-x-auto py-4 space-x-4 lg:space-x-8 scrollbar-none" role="tablist" aria-label="Page sections">
              {subNavItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  role="tab"
                  aria-selected={activeSection === item.id}
                  aria-controls={item.id}
                  tabIndex={activeSection === item.id ? 0 : -1}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2",
                    activeSection === item.id ? "bg-[#E52629] text-white shadow-md" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Outcome Highlights */}
        <section id="br-overview" ref={(el) => (sectionsRef.current[0] = el)} className="py-16 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-montserrat text-3xl font-bold text-center mb-12 text-gray-900">
              Outcomes you can measure
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="group bg-white rounded-2xl p-6 text-center border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100">
                <Clock className="h-8 w-8 text-red-600 mx-auto mb-2 transition-transform duration-200 group-hover:scale-105" />
                <div className="text-base font-semibold text-gray-900">RPO as low as 15 min</div>
              </div>
              <div className="group bg-white rounded-2xl p-6 text-center border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100">
                <BarChart3 className="h-8 w-8 text-red-600 mx-auto mb-2 transition-transform duration-200 group-hover:scale-105" />
                <div className="text-base font-semibold text-gray-900">RTO &lt; 2 hrs (tier-1)</div>
              </div>
              <div className="group bg-white rounded-2xl p-6 text-center border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100">
                <Lock className="h-8 w-8 text-red-600 mx-auto mb-2 transition-transform duration-200 group-hover:scale-105" />
                <div className="text-base font-semibold text-gray-900">Immutable backups</div>
              </div>
              <div className="group bg-white rounded-2xl p-6 text-center border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100">
                <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2 transition-transform duration-200 group-hover:scale-105" />
                <div className="text-base font-semibold text-gray-900">Geo-redundant copies</div>
              </div>
              <div className="group bg-white rounded-2xl p-6 text-center border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100">
                <CheckCircle className="h-8 w-8 text-red-600 mx-auto mb-2 transition-transform duration-200 group-hover:scale-105" />
                <div className="text-base font-semibold text-gray-900">Automated DR drills</div>
              </div>
              <div className="group bg-white rounded-2xl p-6 text-center border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100">
                <Shield className="h-8 w-8 text-red-600 mx-auto mb-2 transition-transform duration-200 group-hover:scale-105" />
                <div className="text-base font-semibold text-gray-900">Encrypted in transit & at rest</div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-montserrat text-3xl font-bold text-center mb-12 text-gray-900">
              What We Cover
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group border-2 border-gray-200 hover:border-[#E52629] transition-all duration-300 hover:shadow-lg shadow-[inset_4px_0_0_0_transparent] hover:shadow-[inset_4px_0_0_0_#E52629,0_8px_30px_rgba(0,0,0,0.08)]">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Cloud className="h-8 w-8 text-red-600" />
                    <CardTitle className="text-xl">Remote Cloud Backups</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Continuous, encrypted backups to cloud/object storage with lifecycle policies.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-gray-200 hover:border-[#E52629] transition-all duration-300 hover:shadow-lg shadow-[inset_4px_0_0_0_transparent] hover:shadow-[inset_4px_0_0_0_#E52629,0_8px_30px_rgba(0,0,0,0.08)]">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Server className="h-8 w-8 text-red-600" />
                    <CardTitle className="text-xl">Virtual Infra Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Backup and protection for VMs/containers; policy-based scheduling & health.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-gray-200 hover:border-[#E52629] transition-all duration-300 hover:shadow-lg shadow-[inset_4px_0_0_0_transparent] hover:shadow-[inset_4px_0_0_0_#E52629,0_8px_30px_rgba(0,0,0,0.08)]">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Database className="h-8 w-8 text-red-600" />
                    <CardTitle className="text-xl">Cloud Data Protection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Versioning, immutability (WORM/S3 Object Lock), key management/rotation.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-gray-200 hover:border-[#E52629] transition-all duration-300 hover:shadow-lg shadow-[inset_4px_0_0_0_transparent] hover:shadow-[inset_4px_0_0_0_#E52629,0_8px_30px_rgba(0,0,0,0.08)]">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FileCheck className="h-8 w-8 text-red-600" />
                    <CardTitle className="text-xl">Hybrid Cloud Storage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    On-prem + cloud tiers for performance + durability; smart caching.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-gray-200 hover:border-[#E52629] transition-all duration-300 hover:shadow-lg shadow-[inset_4px_0_0_0_transparent] hover:shadow-[inset_4px_0_0_0_#E52629,0_8px_30px_rgba(0,0,0,0.08)]">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Archive className="h-8 w-8 text-red-600" />
                    <CardTitle className="text-xl">Tiered Storage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Hot/warm/cold archival with automated transitions and cost controls.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-gray-200 hover:border-[#E52629] transition-all duration-300 hover:shadow-lg shadow-[inset_4px_0_0_0_transparent] hover:shadow-[inset_4px_0_0_0_#E52629,0_8px_30px_rgba(0,0,0,0.08)]">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Eye className="h-8 w-8 text-red-600" />
                    <CardTitle className="text-xl">Live Archiving (Outsourced)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Compliance-ready retention, legal holds, and audit trails.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Disaster Recovery */}
        <section className="py-16 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-montserrat text-3xl font-bold text-center mb-8 text-gray-900">
                Disaster Recovery you can rehearse
              </h2>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <ul className="space-y-5 mb-8">
                    <li className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-1">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      </div>
                      <span className="text-lg md:text-xl text-gray-800">DR runbooks with step-by-step recovery procedures</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-1">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      </div>
                      <span className="text-lg md:text-xl text-gray-800">Application dependency mapping and impact analysis</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-1">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      </div>
                      <span className="text-lg md:text-xl text-gray-800">Cross-region failover with automated orchestration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-1">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      </div>
                      <span className="text-lg md:text-xl text-gray-800">Push-button failback with data consistency checks</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-1">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      </div>
                      <span className="text-lg md:text-xl text-gray-800">Scheduled DR drills with detailed reports and recommendations</span>
                    </li>
                  </ul>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200">
                    <div className="bg-neutral-50/60 rounded-xl p-5 text-center">
                      <Clock className="h-10 w-10 text-red-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold tracking-wide text-gray-600 uppercase mb-1">RPO</div>
                      <div className="text-lg font-semibold text-gray-900 mt-2">15 min - 24 hrs</div>
                    </div>
                    <div className="bg-neutral-50/60 rounded-xl p-5 text-center">
                      <BarChart3 className="h-10 w-10 text-red-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold tracking-wide text-gray-600 uppercase mb-1">RTO</div>
                      <div className="text-lg font-semibold text-gray-900 mt-2">2 hrs - 48 hrs</div>
                    </div>
                    <div className="bg-neutral-50/60 rounded-xl p-5 text-center">
                      <Shield className="h-10 w-10 text-red-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold tracking-wide text-gray-600 uppercase mb-1">Last DR drill</div>
                      <div className="text-lg font-semibold text-gray-900 mt-2">Monthly</div>
                    </div>
                    <div className="bg-neutral-50/60 rounded-xl p-5 text-center">
                      <CheckCircle className="h-10 w-10 text-red-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold tracking-wide text-gray-600 uppercase mb-1">Coverage %</div>
                      <div className="text-lg font-semibold text-gray-900 mt-2">99.9%+</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Reference Architecture */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-montserrat text-3xl font-bold text-center mb-12 text-gray-900">
              Reference Architecture
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-6 lg:gap-4 items-stretch">
                <div className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
                  <div className="bg-blue-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                    <Database className="h-12 w-12 text-blue-600 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Sources</h3>
                  <p className="text-base text-gray-600 flex-1">Application servers, databases, file systems & cloud workloads</p>
                </div>
                
                <div className="hidden lg:flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-gray-300" />
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
                  <div className="bg-green-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                    <Server className="h-12 w-12 text-green-600 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Backup Proxy/Agent</h3>
                  <p className="text-base text-gray-600 flex-1">Deduplication, compression & end-to-end encryption</p>
                </div>
                
                <div className="hidden lg:flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-gray-300" />
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
                  <div className="bg-purple-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                    <Lock className="h-12 w-12 text-purple-600 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Immutable Storage</h3>
                  <p className="text-base text-gray-600 flex-1">WORM-compliant repositories with versioning & retention</p>
                </div>
                
                <div className="hidden lg:flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-gray-300" />
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
                  <div className="bg-rose-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                    <Cloud className="h-12 w-12 text-red-600 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">DR Site/Cloud</h3>
                  <p className="text-base text-gray-600 flex-1">Orchestrated recovery with automated testing & validation</p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
                  End-to-end encryption, IAM boundaries, and comprehensive monitoring/alerting ensure data integrity and security throughout the backup and recovery lifecycle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Tiers */}
        <section id="br-coverage" ref={(el) => (sectionsRef.current[1] = el)} className="py-16 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-montserrat text-3xl font-bold text-center mb-12 text-gray-900">
              Choose your coverage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="relative h-full flex flex-col group border-2 border-gray-200 transition-all duration-300 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 animate-[fadeUp_400ms_ease-out]" style={{ animationDelay: '0ms' }}>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Essential</CardTitle>
                  <CardDescription className="text-center">Perfect for small businesses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Workstation + file server backups</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Daily snapshots</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">30-day retention</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Email alerts</span>
                    </li>
                  </ul>
                  <Link to="/contact?topic=backup-recovery" className="block">
                    <Button 
                      className="w-full border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors" 
                      variant="outline"
                      size="lg"
                    >
                      Talk to an Expert
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="relative h-full flex flex-col border-red-600 border-2 shadow-lg animate-[fadeUp_400ms_ease-out]" style={{ animationDelay: '60ms' }}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-600 text-white">Most Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Business</CardTitle>
                  <CardDescription className="text-center">Comprehensive protection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Server/DB app-aware backups</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Immutable copies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Weekly DR test</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Role-based access</span>
                    </li>
                  </ul>
                  <Link to="/contact?topic=backup-recovery" className="block">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Talk to an Expert
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="relative h-full flex flex-col group border-2 border-gray-200 transition-all duration-300 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 animate-[fadeUp_400ms_ease-out]" style={{ animationDelay: '120ms' }}>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Enterprise</CardTitle>
                  <CardDescription className="text-center">Maximum resilience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Multi-region geo-replication</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Continuous backups</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Quarterly DR drills</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Custom RPO/RTO, dedicated TAM</span>
                    </li>
                  </ul>
                  <Link to="/contact?topic=backup-recovery" className="block">
                    <Button 
                      className="w-full border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors" 
                      variant="outline"
                      size="lg"
                    >
                      Talk to an Expert
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Compliance & Security */}
        <section id="br-compliance" ref={(el) => (sectionsRef.current[2] = el)} className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl font-bold mb-4 text-gray-900">
                Compliance & Security
              </h2>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm hover:border-red-300 hover:shadow-md transition-all duration-200">
                  <Shield className="h-6 w-6 text-red-600" />
                  <span className="text-base font-medium text-gray-700">DPDP-aware processing</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm hover:border-red-300 hover:shadow-md transition-all duration-200">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                  <span className="text-base font-medium text-gray-700">ISO-aligned controls</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm hover:border-red-300 hover:shadow-md transition-all duration-200">
                  <Lock className="h-6 w-6 text-red-600" />
                  <span className="text-base font-medium text-gray-700">Data minimization</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm hover:border-red-300 hover:shadow-md transition-all duration-200">
                  <Eye className="h-6 w-6 text-red-600" />
                  <span className="text-base font-medium text-gray-700">Consent & retention</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm hover:border-red-300 hover:shadow-md transition-all duration-200">
                  <Database className="h-6 w-6 text-red-600" />
                  <span className="text-base font-medium text-gray-700">Encrypted transport/storage</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm hover:border-red-300 hover:shadow-md transition-all duration-200">
                  <FileCheck className="h-6 w-6 text-red-600" />
                  <span className="text-base font-medium text-gray-700">Access logging</span>
                </div>
              </div>
              <p className="text-base text-gray-600 mt-6 max-w-4xl mx-auto text-center leading-relaxed">
                We design for DPDP 2023 awareness; get legal counsel for your context. Our solutions implement industry best practices for data protection and regulatory compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Proven Results */}
        <section className="py-16 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-montserrat text-3xl font-bold text-center mb-12 text-gray-900">
              Proven Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group text-center bg-white border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100">
                <CardContent className="p-8">
                  <div className="text-5xl font-bold text-[#E52629] mb-3">40%</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">faster recovery</div>
                  <div className="text-base text-gray-600">Trading firm, AU</div>
                </CardContent>
              </Card>
              
              <Card className="group text-center bg-white border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100">
                <CardContent className="p-8">
                  <div className="text-5xl font-bold text-[#E52629] mb-3">60%</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">storage savings</div>
                  <div className="text-base text-gray-600">Oil & Gas, US</div>
                </CardContent>
              </Card>
              
              <Card className="group text-center bg-white border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100">
                <CardContent className="p-8">
                  <div className="text-5xl font-bold text-[#E52629] mb-3">24/7</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">monitoring uptime</div>
                  <div className="text-base text-gray-600">Financial Services, UK</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Platforms & Tools */}
        <section id="br-platforms" ref={(el) => (sectionsRef.current[3] = el)} className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-10 md:mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Platforms & Tools
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Explore the platforms and tools we implement to deliver provable RPO/RTO, immutable backups, and audit-ready operations—tailored to your stack.
              </p>
            </div>

            {/* Platform Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 mb-12">
              {platformTools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                  >
                    <Card className="h-full flex flex-col group border border-neutral-200 rounded-2xl transition-all duration-200 hover:border-red-400/60 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="bg-red-50 rounded-lg p-3 transition-transform duration-200 group-hover:scale-105">
                            <IconComponent className="h-8 w-8 text-red-600" strokeWidth={1.5} />
                          </div>
                          <div className="flex flex-wrap gap-1.5 justify-end">
                            {tool.badges.map((badge) => (
                              <Badge
                                key={badge}
                                variant="secondary"
                                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700"
                              >
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {tool.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col pt-0">
                        <CardDescription className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                          {tool.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                          {tool.features.map((feature) => (
                            <span
                              key={feature}
                              className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Assurance Banner */}
            <div className="bg-[#E52629] rounded-2xl p-8 md:p-10 text-center shadow-lg">
              <Shield className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Vendor-neutral design
              </h3>
              <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                We recommend tools that fit your RPO/RTO, budget, and compliance needs—no vendor lock-in, just the right solution for your business.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="br-cta" ref={(el) => (sectionsRef.current[4] = el)} className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-primary-foreground mb-6">
              Ready to secure your critical data?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Get a free backup assessment and discover your recovery readiness.
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