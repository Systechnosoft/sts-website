import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const RECAPTCHA_SITE_KEY = "6LfRRwQsAAAAAKjMFCqSdimJabCnVGgPM1m7fVJJ";
const RECAPTCHA_ACTION = "contact_submit";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface ContactFormSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
}

// Default props
const defaultProps = {
  title: "Send us a Message",
  subtitle: "Tell us about your project and we'll get back to you within 24 hours",
  buttonText: "Send Message",
};

export default function ContactFormSection({
  title = "Send Us a Message",
  subtitle = "Tell us about your project and we'll get back to you within 24 hours",
  buttonText = "Send Message",
  className = ""
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
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
      // Execute reCAPTCHA v3
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { 
        action: RECAPTCHA_ACTION 
      });
      
      // Prepare payload for Make webhook
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        url: window.location.href
      };
      
      // POST to Make webhook with timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      
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
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false
      });
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error('[ContactForm] Submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: "We couldn't submit your request right now. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35 }}
      className={cn("py-12 bg-background", className)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-foreground mb-3">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {subtitle}
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

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="focus-enterprise"
                />
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
                className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
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
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                . *
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#E52629] hover:bg-[#E52629]/90 text-white transition-all duration-200 hover:shadow-lg"
              disabled={isSubmitting || !isRecaptchaLoaded}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying & Sending...
                </>
              ) : (
                buttonText
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </form>
        </CardContent>
      </Card>
      </div>
    </motion.div>
  );
}
