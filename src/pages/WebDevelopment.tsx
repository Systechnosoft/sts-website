import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Zap, 
  Shield, 
  Search, 
  Smartphone,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Globe,
  Layers,
  Lock,
  Gauge,
  Target,
  FileCheck,
  Lightbulb,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ServiceHero from "@/components/ServiceHero";
import { scrollToId } from "@/lib/scrollUtils";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-web-development-new.avif";

const WebDevelopment = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "why-us", label: "Why Us" },
    { id: "web-dev-capabilities", label: "Capabilities" },
    { id: "process", label: "Process" },
    { id: "perf-security", label: "Perf/Security" },
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

  return (
    <>
      <Helmet>
        <title>Web Development Services | Custom Web Applications | SysTechnoSoft</title>
        <meta 
          name="description" 
          content="Professional web development services including custom web applications, responsive design, and modern web solutions. Build scalable, secure, and high-performance websites." 
        />
        <meta name="keywords" content="web development, custom web applications, responsive design, web solutions, frontend development, backend development" />
        <link rel="canonical" href="https://www.systechnosoft.com/services/web-development" />
      </Helmet>

      <main className="min-h-screen">
        <ServiceHero
          title="Custom Web Development Solutions"
          subtitle="Build powerful, scalable web applications that drive business growth. From responsive websites to complex web platforms, we deliver solutions that perform."
          uspChips={[
            "Modern Web Apps",
            "Performance First",
            "Secure & Reliable"
          ]}
          primaryButton={{
            text: "See what we deliver →",
            onClick: () => scrollToId('web-dev-capabilities'),
            ariaLabel: "See what we deliver"
          }}
          secondaryButton={{
            text: "Claim your free insight",
            href: "/contact?type=mra",
            ariaLabel: "Claim your free insight"
          }}
          image={{
            src: heroImage,
            alt: "Web Development Services",
            placeholderPrompt: "A modern web development workspace with code on screens, showing responsive design across devices, in a clean professional tech environment",
            width: 1270,
            height: 847
          }}
        />

        {/* Subsection Navigation */}
        <nav className="hidden lg:block sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center overflow-x-auto py-4 space-x-8 scrollbar-hide">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className={cn(
                    "flex-shrink-0 font-inter font-medium text-sm px-4 py-2 rounded-full transition-all duration-200",
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

        {/* Overview Section */}
        <section id="overview" className="py-16 sm:py-20 lg:py-24 scroll-mt-24">
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
                We deliver custom web applications built with modern technologies—React, Next.js, TypeScript—optimized for performance, security, and scalability. Our responsive designs ensure seamless experiences across all devices, while our SEO-first approach helps you reach your target audience effectively.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-16 md:py-24 bg-[#F5F5F5] scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
                Why Choose Our Web Development Services
              </h2>
              <p className="text-lg text-muted-foreground">
                We combine cutting-edge technology with proven methodologies to deliver exceptional web solutions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                <CardHeader>
                  <Code2 className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Modern Technology Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Built with React, Next.js, TypeScript, and other cutting-edge frameworks for maximum performance and scalability.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                <CardHeader>
                  <Smartphone className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Fully Responsive Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every website we build works flawlessly across all devices and screen sizes, ensuring optimal user experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                <CardHeader>
                  <Search className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>SEO Optimized</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Built-in SEO best practices ensure your website ranks well in search engines and reaches your target audience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Capabilities Section */}
        <section id="web-dev-capabilities" className="py-16 md:py-24 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
                Our Web Development Capabilities
              </h2>
              <p className="text-lg text-muted-foreground">
                End-to-end web development services to bring your vision to life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Custom Web Applications",
                  description: "Tailored web solutions built to your exact specifications and business requirements"
                },
                {
                  icon: Palette,
                  title: "UI/UX Design",
                  description: "Beautiful, intuitive interfaces that engage users and drive conversions"
                },
                {
                  icon: Layers,
                  title: "Frontend Development",
                  description: "Modern, responsive frontends using React, Vue, Angular, and other frameworks"
                },
                {
                  icon: Code2,
                  title: "Backend Development",
                  description: "Robust server-side solutions with Node.js, Python, .NET, and more"
                },
                {
                  icon: Zap,
                  title: "Performance Optimization",
                  description: "Lightning-fast load times and smooth interactions for better user experience"
                },
                {
                  icon: Shield,
                  title: "Security Implementation",
                  description: "Enterprise-grade security measures to protect your data and users"
                }
              ].map((capability, index) => (
                <Card key={index} className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg">
                  <CardHeader>
                    <capability.icon className="h-10 w-10 text-primary mb-3" />
                    <CardTitle className="text-xl">{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{capability.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Development Process Section */}
        <section id="process" className="py-16 md:py-24 bg-[#F5F5F5] scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
                Our Development Process
              </h2>
              <p className="text-lg text-muted-foreground">
                Four-pillar approach from discovery to launch
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-6 lg:gap-4 items-stretch max-w-7xl mx-auto">
              {/* Step 1 */}
              <Card className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
                <div className="bg-blue-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                  <Target className="w-12 h-12 text-[#007AFF] mx-auto" />
                </div>
                <div className="bg-[#E52629] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">1</div>
                <h3 className="font-montserrat font-bold text-lg text-[#1C1C1C] mb-2">Discovery & Planning</h3>
                <p className="text-sm text-[#3C3C3C] font-inter">Goals, requirements, competitive analysis</p>
              </Card>

              {/* Arrow */}
              <div className="hidden lg:flex items-center justify-center text-gray-300">
                <ArrowRight className="w-6 h-6" />
              </div>

              {/* Step 2 */}
              <Card className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
                <div className="bg-purple-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                  <Lightbulb className="w-12 h-12 text-[#8B5CF6] mx-auto" />
                </div>
                <div className="bg-[#E52629] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">2</div>
                <h3 className="font-montserrat font-bold text-lg text-[#1C1C1C] mb-2">Design & Prototyping</h3>
                <p className="text-sm text-[#3C3C3C] font-inter">Wireframes, mockups, interactive prototypes</p>
              </Card>

              {/* Arrow */}
              <div className="hidden lg:flex items-center justify-center text-gray-300">
                <ArrowRight className="w-6 h-6" />
              </div>

              {/* Step 3 */}
              <Card className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
                <div className="bg-green-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                  <FileCheck className="w-12 h-12 text-[#10B981] mx-auto" />
                </div>
                <div className="bg-[#E52629] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">3</div>
                <h3 className="font-montserrat font-bold text-lg text-[#1C1C1C] mb-2">Development & Testing</h3>
                <p className="text-sm text-[#3C3C3C] font-inter">Agile sprints, continuous testing, quality assurance</p>
              </Card>

              {/* Arrow */}
              <div className="hidden lg:flex items-center justify-center text-gray-300">
                <ArrowRight className="w-6 h-6" />
              </div>

              {/* Step 4 */}
              <Card className="group text-center bg-white rounded-2xl p-6 border-2 border-gray-200 transition-all duration-200 hover:border-[#E52629] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 h-full flex flex-col min-h-[240px]">
                <div className="bg-orange-50 rounded-lg p-6 mb-4 transition-transform duration-200 group-hover:scale-105">
                  <Rocket className="w-12 h-12 text-[#F97316] mx-auto" />
                </div>
                <div className="bg-[#E52629] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">4</div>
                <h3 className="font-montserrat font-bold text-lg text-[#1C1C1C] mb-2">Launch & Support</h3>
                <p className="text-sm text-[#3C3C3C] font-inter">Deployment, monitoring, ongoing maintenance</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Performance & Security Section */}
        <section id="perf-security" className="py-16 md:py-24 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <Card className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg p-8">
                <Gauge className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">
                  Performance Optimization
                </h3>
                <p className="text-muted-foreground mb-6">
                  We optimize every aspect of your web application for speed and efficiency:
                </p>
                <ul className="space-y-3">
                  {[
                    "Code splitting and lazy loading",
                    "Image optimization and compression",
                    "CDN integration for global delivery",
                    "Database query optimization",
                    "Caching strategies"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 shadow-md hover:shadow-lg p-8">
                <Lock className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">
                  Security Best Practices
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your data and users are protected with enterprise-grade security:
                </p>
                <ul className="space-y-3">
                  {[
                    "HTTPS/SSL encryption",
                    "SQL injection prevention",
                    "Cross-site scripting (XSS) protection",
                    "CSRF token implementation",
                    "Regular security audits"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
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
              <AccordionItem value="timeline" className="bg-white border border-[#E6E6E6] rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                  How long does it take to build a website?
                </AccordionTrigger>
                <AccordionContent className="text-[#3C3C3C]">
                  Project timelines vary based on complexity. A simple website typically takes 4-6 weeks, while complex web applications can take 3-6 months. We provide detailed timelines during the planning phase.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cost" className="bg-white border border-[#E6E6E6] rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                  What is the cost of web development?
                </AccordionTrigger>
                <AccordionContent className="text-[#3C3C3C]">
                  Costs depend on project scope, features, and complexity. We offer flexible pricing models and provide detailed quotes after understanding your requirements. Contact us for a free consultation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="maintenance" className="bg-white border border-[#E6E6E6] rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                  Do you provide ongoing maintenance?
                </AccordionTrigger>
                <AccordionContent className="text-[#3C3C3C]">
                  Yes, we offer comprehensive maintenance and support packages including updates, security patches, performance monitoring, and feature enhancements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="technologies" className="bg-white border border-[#E6E6E6] rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-[#1C1C1C] hover:text-[#E52629] hover:no-underline">
                  What technologies do you use?
                </AccordionTrigger>
                <AccordionContent className="text-[#3C3C3C]">
                  We use modern, proven technologies including React, Next.js, Node.js, TypeScript, Python, .NET, and various databases. We select the best tech stack based on your specific requirements.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#E52629] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-montserrat font-bold text-4xl lg:text-5xl mb-6">
              Ready to Build Your Web Application?
            </h2>
            <p className="font-inter text-xl text-white/95 mb-10">
              Let's discuss your project and create a web solution that drives results
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
};

export default WebDevelopment;
