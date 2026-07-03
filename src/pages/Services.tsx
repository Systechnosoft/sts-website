import { ArrowRight, Server, Code, Bot, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Server,
    title: "IT Infrastructure",
    description: "Design, deploy, and manage on-prem, cloud, and hybrid environments for performance, security, and uptime.",
    features: [
      "Cloud & Data Center Management",
      "Network & Security Solutions", 
      "Device Lifecycle & 24/7 Helpdesk"
    ],
    href: "/services/infrastructure",
    cta: "Explore Infrastructure"
  },
  {
    icon: Code,
    title: "Appian (Low-code)",
    description: "Deliver enterprise apps in weeks — workflow, records, role-based UIs, Data Fabric, and integrations.",
    features: [
      "Rapid Application Development",
      "Process Automation & Workflows",
      "Enterprise Integration (REST/SOAP/JDBC)"
    ],
    href: "/services/appian",
    cta: "Schedule Appian Demo"
  },
  {
    icon: Code,
    title: "Salesforce (Low-code)", 
    description: "Salesforce Solutions — Sales, Service & Experience Cloud with Flow-driven automation.",
    features: [
      "Sales, Service & Experience Cloud",
      "Flow-driven Automation & Approvals",
      "Apex/API Legacy System Integration"
    ],
    href: "/services/salesforce",
    cta: "Discuss Salesforce Roadmap"
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "RPA for repetitive tasks, model-powered insights, and event-driven integrations across apps and data.",
    features: [
      "Intelligent Process Automation",
      "AI-Powered Insights & Analytics",
      "Cross-Platform Integration (SDK/Make/Zapier)"
    ],
    href: "/services/ai-automation",
    cta: "Estimate Automation ROI"
  }
];

export default function Services() {
  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Enterprise IT Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Plan, build, and run enterprise-grade solutions — aligned to business outcomes, not buzzwords. 
            Our comprehensive service portfolio spans infrastructure modernization, low-code application development, 
            and AI-powered automation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="card-enterprise group h-full border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-montserrat font-bold mb-3">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="btn-accent w-full"
                  asChild
                >
                  <Link to={service.href}>
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Engagement Models */}
        <div className="bg-muted rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-montserrat font-bold text-foreground mb-4">
              Scalable Engagement Models
            </h2>
            <p className="text-muted-foreground">
              Flexible delivery options designed to meet your specific business needs and timeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-montserrat font-medium text-foreground mb-2">Project-Based</h3>
              <p className="text-sm text-muted-foreground">
                Fixed-scope delivery with defined timelines and outcomes
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-montserrat font-medium text-foreground mb-2">Managed Services</h3>
              <p className="text-sm text-muted-foreground">
                Ongoing support and optimization with SLA-backed performance
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-montserrat font-medium text-foreground mb-2">Team Extension</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated resources integrated with your internal teams
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can accelerate your digital transformation journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-hero"
              asChild
            >
              <Link to="/readiness-check">
                Run Digital Readiness Check
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-secondary"
              asChild
            >
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}