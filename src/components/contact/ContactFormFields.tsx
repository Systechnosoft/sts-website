import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

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

interface ContactFormFieldsProps {
  onSuccess?: () => void;
}

export function ContactFormFields({ onSuccess }: ContactFormFieldsProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const { toast } = useToast();

  // Load reCAPTCHA v3 script
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="recaptcha"]`);
    if (existingScript) {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsRecaptchaLoaded(true);
        });
      }
      return;
    }

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
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        message: "",
        consent: false
      });

      onSuccess?.();
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-live="polite">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lets-talk-name" className="font-inter text-foreground">Name *</Label>
          <Input
            id="lets-talk-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="focus-visible:ring-[#E52629] focus-visible:ring-2 focus-visible:ring-offset-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lets-talk-email" className="font-inter text-foreground">Work Email *</Label>
          <Input
            id="lets-talk-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@company.com"
            required
            className="focus-visible:ring-[#E52629] focus-visible:ring-2 focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lets-talk-company" className="font-inter text-foreground">Company *</Label>
          <Input
            id="lets-talk-company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name"
            required
            className="focus-visible:ring-[#E52629] focus-visible:ring-2 focus-visible:ring-offset-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lets-talk-role" className="font-inter text-foreground">Role</Label>
          <Input
            id="lets-talk-role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Your job title"
            className="focus-visible:ring-[#E52629] focus-visible:ring-2 focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lets-talk-message" className="font-inter text-foreground">Message *</Label>
        <Textarea
          id="lets-talk-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project, challenges, or questions..."
          rows={4}
          required
          className="focus-visible:ring-[#E52629] focus-visible:ring-2 focus-visible:ring-offset-2"
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="lets-talk-consent"
          checked={formData.consent}
          onCheckedChange={handleConsentChange}
          className="mt-1 data-[state=checked]:bg-[#E52629] data-[state=checked]:border-[#E52629]"
        />
        <Label htmlFor="lets-talk-consent" className="text-sm text-muted-foreground leading-relaxed font-inter">
          I agree to the processing of my personal data in accordance with the{" "}
          <a href="/privacy-policy" className="text-[#E52629] hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms-of-service" className="text-[#E52629] hover:underline">
            Terms of Service
          </a>
          . *
        </Label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#E52629] hover:bg-[#c91f22] text-white font-montserrat font-semibold
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={isSubmitting || !isRecaptchaLoaded}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Verifying & Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
