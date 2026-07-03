import { Helmet } from "react-helmet-async";
import { CookieHero } from "@/components/legal/CookieHero";
import { CookieControls } from "@/components/legal/CookieControls";
import { CookieCategories } from "@/components/legal/CookieCategories";
import { LegalSection } from "@/components/legal/LegalSection";
import { IconList } from "@/components/legal/IconList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";

export default function CookiePolicy() {
  const lastUpdated = "January 15, 2025";

  return (
    <>
      <Helmet>
        <title>Cookie Policy — Systechnosoft Technologies</title>
        <meta
          name="description"
          content="Understand how Systechnosoft uses cookies and similar technologies, manage your preferences, and learn about analytics and advertising cookies."
        />
        <link rel="canonical" href="https://www.systechnosoft.com/cookie-policy" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cookie Policy",
            url: "https://www.systechnosoft.com/cookie-policy",
            description:
              "Understand how Systechnosoft uses cookies and similar technologies, manage your preferences, and learn about analytics and advertising cookies.",
            isPartOf: {
              "@type": "WebSite",
              name: "Systechnosoft Technologies",
              url: "https://www.systechnosoft.com",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-neutral-50">
        {/* Hero */}
        <CookieHero
          title="Cookie Policy"
          description="How we use cookies and similar technologies—and your choices."
          lastUpdated={lastUpdated}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl md:max-w-4xl mx-auto space-y-8 md:space-y-10">
            {/* Cookie Controls */}
            <CookieControls />

            {/* Introduction */}
            <LegalSection id="introduction" title="Introduction">
              <p>
                Systechnosoft Technologies ("<strong>Systechnosoft</strong>", "<strong>we</strong>", "<strong>us</strong>") uses cookies and similar technologies to provide, secure, and improve our website. This Cookie Policy explains what these technologies are, why we use them, and how you can manage your preferences.
              </p>
              <p>
                By using our website, you agree to the use of cookies in accordance with this policy and your consent preferences. You can change your settings at any time.
              </p>
            </LegalSection>

            {/* What Are Cookies */}
            <LegalSection id="what-are-cookies" title="What Are Cookies?">
              <p>
                Cookies are small text files placed on your device when you visit a website. They help websites recognize your device and remember information about your visit, such as your preferences and actions.
              </p>
              <p>
                We also use similar technologies like:
              </p>
              <IconList
                items={[
                  "Web beacons (tracking pixels) - small graphics embedded in emails or web pages",
                  "Local storage - browser-based storage for larger amounts of data",
                  "SDKs and analytics tools - software development kits for mobile apps and analytics"
                ]}
                icon="check"
              />
            </LegalSection>

            {/* Cookie Categories */}
            <section id="cookie-categories" className="space-y-6 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-semibold font-montserrat text-[#1C1C1C]">
                Cookie Categories
              </h2>
              <p className="text-base md:text-lg leading-8 text-neutral-800 font-inter">
                We use four types of cookies on our website. You can manage your preferences for non-essential categories using the controls above.
              </p>
              <CookieCategories />
            </section>

            {/* How We Use Cookies */}
            <LegalSection id="how-we-use" title="How We Use Cookies">
              <p>
                We use cookies to:
              </p>
              <IconList
                items={[
                  "Keep you signed in and secure your session",
                  "Remember your preferences and settings",
                  "Understand how you use our website and improve performance",
                  "Deliver relevant content and advertising",
                  "Comply with legal requirements and prevent fraud"
                ]}
                icon="check"
              />
              <p>
                <strong>Important:</strong> We do <strong>not sell</strong> your personal data. Non-essential cookies are used only with your consent in regions where required by law.
              </p>
            </LegalSection>

            {/* Region-Specific Notices */}
            <LegalSection id="region-notices" title="Region-Specific Information">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="eea-uk">
                  <AccordionTrigger className="text-lg font-semibold hover:text-[#E52629] focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none">
                    EEA/UK (GDPR/UK GDPR)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p>
                      Under GDPR and UK GDPR, we obtain your explicit consent before placing non-essential cookies on your device. Our lawful bases include:
                    </p>
                    <IconList
                      items={[
                        "Consent - for functional, analytics, and marketing cookies",
                        "Legitimate interests - for essential security and fraud prevention",
                        "Legal obligation - for compliance and record-keeping"
                      ]}
                      icon="shield"
                    />
                    <p>
                      You can withdraw your consent at any time by using the <strong>Open Cookie Settings</strong> button above. This will not affect the lawfulness of processing based on consent before withdrawal.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="california">
                  <AccordionTrigger className="text-lg font-semibold hover:text-[#E52629] focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none">
                    California (CCPA/CPRA)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p>
                      Under California law, certain uses of cookies may constitute a "sale" or "sharing" of personal information for cross-context behavioral advertising. You have the right to opt out of such uses.
                    </p>
                    <IconList
                      items={[
                        "Right to Know - what personal information is collected via cookies",
                        "Right to Delete - request deletion of cookie data (subject to exceptions)",
                        "Right to Opt-Out - opt out of sale/sharing for advertising purposes",
                        "Global Privacy Control (GPC) - we honor GPC signals in supported browsers"
                      ]}
                      icon="lock"
                    />
                    <p>
                      <strong>Limit the Use of Sensitive Personal Information:</strong> Not applicable—we do not use cookies to collect or process sensitive personal information as defined under CPRA.
                    </p>
                    <p>
                      To exercise your rights, use the <strong>Open Cookie Settings</strong> button or email us at{" "}
                      <a
                        href="mailto:privacy@systechnosoft.in"
                        className="text-[#E52629] hover:underline focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded"
                      >
                        privacy@systechnosoft.in
                      </a>.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="india">
                  <AccordionTrigger className="text-lg font-semibold hover:text-[#E52629] focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none">
                    India (DPDP Act)
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p>
                      Under India's Digital Personal Data Protection Act (DPDP), we collect your consent for non-essential cookies. You may withdraw consent at any time via the <strong>Open Cookie Settings</strong> button.
                    </p>
                    <IconList
                      items={[
                        "Right to access - know what cookie data we hold about you",
                        "Right to correction - request correction of inaccurate data",
                        "Right to erasure - request deletion of your cookie data",
                        "Grievance redressal - contact privacy@systechnosoft.in for concerns"
                      ]}
                      icon="users"
                    />
                    <p>
                      For international transfers, we use contractual safeguards (Standard Contractual Clauses) or other approved mechanisms to protect your data.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </LegalSection>

            {/* Managing Cookies in Your Browser */}
            <LegalSection id="browser-controls" title="Managing Cookies in Your Browser">
              <p>
                Most browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies. However, disabling cookies may affect website functionality.
              </p>
              <p className="font-medium">Learn how to manage cookies in popular browsers:</p>
              <ul className="space-y-2">
                {[
                  { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
                  { name: "Mozilla Firefox", url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" },
                  { name: "Safari (macOS)", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
                  { name: "Microsoft Edge", url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" }
                ].map((browser) => (
                  <li key={browser.name} className="flex items-start gap-2">
                    <span className="text-neutral-700">•</span>
                    <a
                      href={browser.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#E52629] hover:underline focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded"
                    >
                      {browser.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-neutral-600">
                Note: Blocking all cookies may prevent you from using certain features on our website.
              </p>
            </LegalSection>

            {/* Retention & Records */}
            <LegalSection id="retention" title="Cookie Retention & Consent Records">
              <p>
                Different cookies have different retention periods:
              </p>
              <IconList
                items={[
                  "Essential cookies - remain active until your session ends or as needed for security",
                  "Functional cookies - typically 3-12 months",
                  "Analytics cookies - up to 14 months (Google Analytics default with IP anonymization)",
                  "Marketing cookies - up to 13 months or per vendor default (e.g., 90 days for Facebook)"
                ]}
                icon="file"
              />
              <p>
                We retain records of your consent choices to demonstrate compliance with data protection laws. These records include the timestamp, categories consented to, and the version of this policy you agreed to.
              </p>
            </LegalSection>

            {/* International Transfers */}
            <LegalSection id="transfers" title="International Transfers & Safeguards">
              <p>
                Some cookies and analytics services may transfer your data outside your country of residence. We ensure appropriate safeguards are in place:
              </p>
              <IconList
                items={[
                  "Standard Contractual Clauses (SCCs) - for EEA/UK transfers to third countries",
                  "Adequacy decisions - transfers to countries recognized as providing adequate protection",
                  "Contractual protections - for transfers from India and other jurisdictions"
                ]}
                icon="globe"
              />
              <p>
                For more information about international transfers, see our{" "}
                <a
                  href="/privacy-policy"
                  className="text-[#E52629] hover:underline focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded"
                >
                  Privacy Policy
                </a>.
              </p>
            </LegalSection>

            {/* Updates */}
            <LegalSection id="updates" title="Updates to This Cookie Policy">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will:
              </p>
              <IconList
                items={[
                  "Update the 'Last updated' date at the top of this policy",
                  "Notify you via a prominent notice on our website",
                  "Request renewed consent if required by law"
                ]}
                icon="alert"
              />
              <p>
                We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </LegalSection>

            {/* Questions */}
            <div className="pt-8 border-t border-neutral-200">
              <p className="text-base md:text-lg leading-8 text-neutral-800 font-inter">
                Questions about this Cookie Policy? Email{" "}
                <a
                  href="mailto:privacy@systechnosoft.in"
                  className="text-[#E52629] hover:underline focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded font-medium"
                >
                  privacy@systechnosoft.in
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
