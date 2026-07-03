import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSection } from "@/components/legal/LegalSection";
import { IconList } from "@/components/legal/IconList";

const LAST_UPDATED = "January 15, 2025";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: `${window.location.origin}/privacy-policy`,
    isPartOf: {
      "@type": "Organization",
      name: "Systechnosoft Technologies",
      url: window.location.origin,
    },
    dateModified: LAST_UPDATED,
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy — Systechnosoft Technologies</title>
        <meta
          name="description"
          content="How Systechnosoft collects, uses, shares, and protects personal data. GDPR/DPDP/CCPA aligned. Manage cookie preferences anytime."
        />
        <link rel="canonical" href="https://www.systechnosoft.com/privacy-policy" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="min-h-screen bg-white">
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#E52629] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-[#E52629] focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <LegalHero
          title="Privacy Policy"
          description="How we collect, use, and protect your information."
          lastUpdated={LAST_UPDATED}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div id="main-content" className="max-w-3xl md:max-w-4xl mx-auto space-y-8 md:space-y-10">
            {/* Introduction */}
            <LegalSection id="introduction" title="Introduction">
              <p>
                Systechnosoft Technologies ("<strong>Systechnosoft</strong>", "<strong>we</strong>", "<strong>us</strong>") is committed to protecting your privacy. This Privacy Policy explains what personal data we collect, how we use and share it, and your rights when you visit our website or interact with us. We align with the <strong>GDPR</strong> (EU/UK), <strong>CCPA/CPRA</strong> (California), and India's <strong>DPDP Act</strong>. Our website does <strong>not</strong> offer user accounts. This notice is client-facing and does not cover employee data.
              </p>
              <p>
                <strong>Controller:</strong> Systechnosoft Technologies Private Limited<br />
                <strong>Contact:</strong>{" "}
                <a 
                  href="mailto:privacy@systechnosoft.in"
                  className="text-[#E52629] hover:underline focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded transition-all duration-200"
                >
                  privacy@systechnosoft.in
                </a>
                <br />
                <strong>Last updated:</strong> {LAST_UPDATED}
              </p>
            </LegalSection>

            {/* Scope */}
            <LegalSection id="scope" title="Scope">
              <p>
                This Policy applies to data collected via our website, contact/demo forms, events/webinars, and business communications. It does not cover third-party websites linked from our site.
              </p>
            </LegalSection>

            {/* Data We Collect */}
            <LegalSection id="data-we-collect" title="Data We Collect">
              <IconList 
                icon="file"
                items={[
                  "You provide: name, business email, phone, job title, company, message content.",
                  "Business contact context: professional details provided B2B (still personal data).",
                  "Automatically collected: IP, device/browser info, approximate location, pages viewed, referrers, events; via cookies/pixels/server logs.",
                  "Third-party sources: referrals/partners/event registrations.",
                  "We do not knowingly collect: sensitive personal data or children's data."
                ]}
              />
            </LegalSection>

            {/* How We Use Data */}
            <LegalSection id="how-we-use" title="How We Use Data">
              <IconList 
                icon="check"
                items={[
                  "Respond to inquiries, schedule demos, deliver requested info/services.",
                  "Operate, secure, and improve site; analytics and performance measurement.",
                  "Marketing (opt-in/legitimate interest): newsletters, product updates; easy opt-out.",
                  "Advertising/retargeting only with consent (cookies/pixels).",
                  "Use of service providers (hosting, analytics, CRM, email).",
                  "Legal compliance, fraud and security, defend rights."
                ]}
              />
            </LegalSection>

            {/* Legal Bases */}
            <LegalSection id="legal-bases" title="Legal Bases (GDPR/UK & similar)">
              <IconList 
                icon="shield"
                items={[
                  "Consent: non-essential cookies; electronic marketing where required.",
                  "Legitimate interests: B2B comms, site improvement, security (balanced with your rights).",
                  "Contract: pre-contract/contract performance if engaging an individual.",
                  "Legal obligation: record-keeping, regulatory requests."
                ]}
              />
            </LegalSection>

            {/* Cookies & Tracking */}
            <LegalSection id="cookies" title="Cookies & Tracking">
              <p>
                We use <strong>Essential</strong>, <strong>Analytics/Performance</strong>, <strong>Functional</strong>, and <strong>Advertising/Marketing</strong> cookies. Non-essential categories run <strong>only with consent</strong> in applicable regions. See our{" "}
                <a 
                  href="/cookie-policy"
                  className="text-[#E52629] hover:underline focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded transition-all duration-200"
                >
                  Cookie Policy
                </a>{" "}
                for full details.
              </p>
            </LegalSection>

            {/* Sharing Your Data */}
            <LegalSection id="sharing" title="Sharing Your Data">
              <p>
                We <strong>do not sell</strong> personal data. We share with:
              </p>
              <IconList 
                icon="users"
                items={[
                  "Service providers (hosting/cloud, analytics, CRM/email, security) under DPAs",
                  "Partners only to fulfill your request",
                  "Legal/compliance",
                  "Business transfers (e.g., M&A)"
                ]}
              />
              <p>
                Providers may be in other countries and must protect data appropriately.
              </p>
            </LegalSection>

            {/* International Transfers */}
            <LegalSection id="transfers" title="International Transfers">
              <p>
                Data may be processed in India, the EU, the US, or other locations. For EEA/UK transfers we use <strong>Standard Contractual Clauses (SCCs)</strong> and additional safeguards as needed. Under India's <strong>DPDP</strong>, we follow government notifications and contractual protections.
              </p>
            </LegalSection>

            {/* Retention */}
            <LegalSection id="retention" title="Retention">
              <p>
                We keep data only as long as needed for the purposes above or as required by law, then delete or anonymize it. Typical periods: inquiries <strong>~12 months</strong> after closure; client records <strong>term + 5–7 years</strong> (tax/audit); analytics per tool settings (e.g., <strong>14 months</strong>); security logs <strong>~6–12 months</strong>.
              </p>
            </LegalSection>

            {/* Security */}
            <LegalSection id="security" title="Security">
              <IconList 
                icon="lock"
                items={[
                  "HTTPS everywhere, encryption in transit/at rest where feasible",
                  "Role-based access, least privilege",
                  "Logging/monitoring, firewalls",
                  "Vulnerability management, incident response",
                  "Backups, staff training"
                ]}
              />
              <p className="mt-4">
                No method is 100% secure, but we continuously improve safeguards.
              </p>
            </LegalSection>

            {/* Your Rights */}
            <LegalSection id="your-rights" title="Your Rights">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold font-montserrat text-[#1C1C1C] mb-3">Global</h3>
                  <p>Withdraw consent, opt-out of marketing, object where applicable.</p>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold font-montserrat text-[#1C1C1C] mb-3">EEA/UK (GDPR)</h3>
                  <p>
                    Access, rectify, erase, restrict, port, object (incl. absolute right to object to direct marketing); complain to a DPA.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold font-montserrat text-[#1C1C1C] mb-3">California (CCPA/CPRA)</h3>
                  <p>
                    Know/access, delete, correct, <strong>opt-out of sale/sharing</strong> (honor <strong>Global Privacy Control</strong>), non-discrimination.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold font-montserrat text-[#1C1C1C] mb-3">India (DPDP)</h3>
                  <p>
                    Information, access, correction/erasure, withdraw consent, grievance redressal via Grievance Officer / Data Protection Board.
                  </p>
                </div>
                <p>
                  <strong>Submit a request:</strong> email us at{" "}
                  <a 
                    href="mailto:privacy@systechnosoft.in"
                    className="text-[#E52629] hover:underline focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded transition-all duration-200"
                  >
                    privacy@systechnosoft.in
                  </a>.
                </p>
              </div>
            </LegalSection>

            {/* Children's Privacy */}
            <LegalSection id="children" title="Children's Privacy">
              <p>
                Site not directed to children under 16 (or under 18 per DPDP). We do not knowingly collect children's data. If you believe a child provided data, contact us to delete it.
              </p>
            </LegalSection>

            {/* Updates to this Policy */}
            <LegalSection id="updates" title="Updates to this Policy">
              <p>
                We may update this Policy. We'll revise the <strong>Last updated</strong> date and post a prominent notice for material changes. Continued use after updates signifies acknowledgment.
              </p>
            </LegalSection>
          </div>
        </div>
      </main>
    </>
  );
}
