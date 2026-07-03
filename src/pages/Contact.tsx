import { useState, useEffect } from "react";
import { Mail, Phone, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { OfficeLocationsMap } from "@/components/OfficeLocationsMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { BookConsultationTrigger } from "@/components/consultation/BookConsultationTrigger";
import { Badge } from "@/components/ui/badge";
import heroContactImage from "@/assets/hero-contact-us.avif";

const RECAPTCHA_SITE_KEY = "6LfRRwQsAAAAAKjMFCqSdimJabCnVGgPM1m7fVJJ";
const RECAPTCHA_ACTION = "contact_submit";

// Extend Window interface for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}


import { Helmet } from "react-helmet-async";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const { toast } = useToast();

  // Load reCAPTCHA v3 script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsRecaptchaLoaded(true);
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, consent: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the privacy policy to submit the form.",
        variant: "destructive",
      });
      return;
    }

    if (!isRecaptchaLoaded) {
      toast({
        title: "Security Check Loading",
        description: "Please wait for security verification to load.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Execute reCAPTCHA v3 (client-side only)
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { 
        action: RECAPTCHA_ACTION 
      });
      
      // Prepare payload for Make webhook
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.role,
        message: formData.message,
        url: window.location.href
      };
      
      // POST to Make webhook with timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout
      
      const response = await fetch(
        'https://hook.eu2.make.com/c7lygllbhr4qe5u6x4llr2dfl6dgjh3y',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );
      
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error('webhook_failed');
      }
      
      setIsSubmitted(true);
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error('[Contact] Submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: "We couldn't submit your request right now. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-8 md:p-10 text-center space-y-8">
            {/* Success Icon with subtle pulse animation */}
            <div className="relative inline-flex">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-[scale-in_0.3s_ease-out]">
                <CheckCircle className="h-10 w-10 text-green-600 motion-safe:animate-[pulse_2s_ease-in-out_3]" />
              </div>
            </div>

            {/* Heading & Message */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground">
                Thank You for Your Interest
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We've received your message and will get back to you within 24 hours.
              </p>
            </div>

            {/* Timeline / Progress Steps */}
            <div className="space-y-5 max-w-lg mx-auto pt-4">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Next Steps
              </p>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-medium text-foreground">Initial consultation call</p>
                    <p className="text-sm text-muted-foreground">Within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-medium text-foreground">Digital readiness assessment</p>
                    <p className="text-sm text-muted-foreground">If applicable to your needs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-medium text-foreground">Customized solution proposal</p>
                    <p className="text-sm text-muted-foreground">Tailored to your requirements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <BookConsultationTrigger />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact Us - Get Started Today | Systechnosoft Technologies</title>
        <meta
          name="description"
          content="Contact Systechnosoft for IT infrastructure, low-code apps, and AI automation solutions. Get expert consultation within 24 hours. Fast response, partnership first."
        />
        <link rel="canonical" href="https://www.systechnosoft.com/contact" />
        <meta property="og:title" content="Contact Us - Get Started Today | Systechnosoft Technologies" />
        <meta
          property="og:description"
          content="Contact Systechnosoft for IT infrastructure, low-code apps, and AI automation solutions. Get expert consultation within 24 hours."
        />
        <meta property="og:url" content="https://www.systechnosoft.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.systechnosoft.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Get Started Today | Systechnosoft Technologies" />
        <meta
          name="twitter:description"
          content="Contact Systechnosoft for IT infrastructure, low-code apps, and AI automation solutions. Get expert consultation within 24 hours."
        />
        <meta name="twitter:image" content="https://www.systechnosoft.com/og-image.png" />
      </Helmet>

      {/* Hero Section */}
      <section
        id="hero" 
        data-page="contact"
        className="sf-hero contact-hero relative min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden bg-white py-24"
        aria-labelledby="contact-hero-title"
      >
        {/* Animated background */}
        <div className="sf-hero__bg absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(229,38,41,0.1),transparent)]" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent, hsl(var(--primary)), transparent)`,
              backgroundSize: "400px 400px"
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Content */}
        <div className="sf-hero__inner relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center max-w-[1200px] mx-auto">
            {/* Left Column - Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="contact-hero__left space-y-6 max-w-[44rem]">
              <div className="space-y-6">
                <h1 
                  id="contact-hero-title"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-[#1C1C1C] leading-tight">
                  Get Started <span className="text-[#E52629]">Today</span>
                </h1>
                <p className="text-lg md:text-xl text-[#3C3C3C] leading-relaxed max-w-prose">
                  Ready to maximize innovation while minimizing code? Tell us a bit and we'll get back within 24 hours.
                </p>
              </div>

              {/* Benefit Chips */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="sf-hero__chips flex flex-wrap gap-3"
                aria-label="Key benefits">
                {["Fast Response", "Expert Team", "Partnership First"].map((badge, idx) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.35 }}>
                    <Badge 
                      variant="secondary" 
                      className="text-sm px-4 py-2 bg-white/80 border-[#E6E6E6] text-[#1C1C1C] hover:shadow-sm transition-shadow">
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
                className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#E52629] hover:bg-[#D01F21] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={() => {
                    const formElement = document.getElementById('contact-form');
                    if (formElement) {
                      const offset = 120;
                      const elementPosition = formElement.getBoundingClientRect().top + window.scrollY;
                      const targetPosition = elementPosition - offset;
                      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                  }}>
                  Send Us a Message →
                </Button>
                <BookConsultationTrigger 
                  variant="outline"
                  className="border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
                >
                  Book a consultation
                </BookConsultationTrigger>
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.figure 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="contact-hero__art relative isolate group"
            >
              <img
                src={heroContactImage}
                width={1270} 
                height={847}
                alt="Professional customer support and consultation at Systechnosoft"
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
                  background: `radial-gradient(40% 40% at 20% 30%, #E52629 10%, transparent 70%), radial-gradient(35% 35% at 80% 70%, #007AFF 10%, transparent 70%)`
                }}
              />
            </motion.figure>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form-section" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-foreground mb-3">
                Send Us a Message
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Tell us about your project and we'll get back to you within 24 hours
              </p>
            </div>
            <Card className="card-enterprise">
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="focus-enterprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@company.com"
                        required
                        className="focus-enterprise"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                        required
                        className="focus-enterprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Your job title"
                        className="focus-enterprise"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, challenges, or questions..."
                      rows={4}
                      required
                      className="focus-enterprise"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={handleConsentChange}
                      className="mt-1"
                    />
                    <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the processing of my personal data in accordance with the{" "}
                      <Button variant="link" className="p-0 h-auto text-accent">
                        Privacy Policy
                      </Button>{" "}
                      and{" "}
                      <Button variant="link" className="p-0 h-auto text-accent">
                        Terms of Service
                      </Button>
                      . *
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="btn-hero w-full"
                    disabled={isSubmitting || !isRecaptchaLoaded}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verifying & Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  <p className="text-sm text-center text-muted-foreground font-medium">
                    We'll respond within 24 hours.
                  </p>

                  <p className="text-xs text-center text-muted-foreground">
                    Protected by reCAPTCHA v3 and subject to Google's{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E52629] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] rounded"
                    >
                      Privacy Policy
                    </a>
                    {" "}and{" "}
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E52629] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] rounded"
                    >
                      Terms
                    </a>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Talk to a Human Section */}
      <section className="py-12 md:py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="mb-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-foreground mb-2">
                Talk to a Human
              </h2>
              <p className="text-base text-muted-foreground">
                Prefer direct contact? Reach out to us directly
              </p>
            </div>
            <Card className="bg-white rounded-2xl shadow-sm border">
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E52629]/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#E52629]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Email</p>
                    <a 
                      href="mailto:info@systechnosoft.in" 
                      className="text-sm sm:text-base text-foreground hover:text-[#E52629] transition-colors break-all"
                    >
                      info@systechnosoft.in
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E52629]/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#E52629]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Phone</p>
                    <a 
                      href="tel:+13473051255" 
                      className="text-sm sm:text-base text-foreground hover:text-[#E52629] transition-colors"
                    >
                      +1 (347) 305-1255
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfficeLocationsMap />
        </div>
      </section>
    </>
  );
}