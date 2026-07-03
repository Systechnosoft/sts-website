import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import { CalendlyDialogHost } from "./components/consultation/CalendlyDialogHost";
import { NetworkHealthCheckHost } from "./components/managed-it/NetworkHealthCheckHost";
import { BackupRecoveryAssessmentHost } from "./components/backup-recovery/BackupRecoveryAssessmentHost";
import { DataMigrationAssessmentHost } from "./components/data-migration/DataMigrationAssessmentHost";
import Chatbot from './components/Chatbot/Chatbot';

// Lazy load all pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const CloudServices = lazy(() => import("./pages/CloudServices"));
const DataMigration = lazy(() => import("./pages/DataMigration"));
const ManagedITServices = lazy(() => import("./pages/ManagedITServices"));
const MicrosoftDynamics365 = lazy(() => import("./pages/MicrosoftDynamics365"));
const BackupRecovery = lazy(() => import("./pages/BackupRecovery"));
const Salesforce = lazy(() => import("./pages/Salesforce"));
const Appian = lazy(() => import("./pages/Appian"));
const BusinessProcessAutomation = lazy(() => import("./pages/BusinessProcessAutomation"));
const CustomerRelationshipManagement = lazy(() => import("./pages/CustomerRelationshipManagement"));
const AIDevelopmentIntegration = lazy(() => import("./pages/AIDevelopmentIntegration"));
const AINaturalLanguageProcessing = lazy(() => import("./pages/AINaturalLanguageProcessing"));
const AIPromptEngineering = lazy(() => import("./pages/AIPromptEngineering"));
const AIDataAnalyticsInsights = lazy(() => import("./pages/AIDataAnalyticsInsights"));
const AIAutomation = lazy(() => import("./pages/AIAutomation"));
const AIConsultationStrategy = lazy(() => import("./pages/AIConsultationStrategy"));
const MobileAppDevelopment = lazy(() => import("./pages/MobileAppDevelopment"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Industries = lazy(() => import("./pages/Industries"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" aria-label="Loading..." />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CalendlyDialogHost />
          <NetworkHealthCheckHost />
          <BackupRecoveryAssessmentHost />
          <DataMigrationAssessmentHost />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="services/cloud" element={<CloudServices />} />
                <Route path="services/data-migration" element={<DataMigration />} />
                <Route path="services/managed-it-services" element={<ManagedITServices />} />
                <Route path="services/microsoft-dynamics-365" element={<MicrosoftDynamics365 />} />
                <Route path="services/backup-recovery" element={<BackupRecovery />} />
                <Route path="services/salesforce" element={<Salesforce />} />
                <Route path="services/appian" element={<Appian />} />
                <Route path="services/bpa" element={<BusinessProcessAutomation />} />
                <Route path="services/crm" element={<CustomerRelationshipManagement />} />
                <Route path="services/ai-development-integration" element={<AIDevelopmentIntegration />} />
                <Route path="services/ai-natural-language-processing" element={<AINaturalLanguageProcessing />} />
                <Route path="services/ai-prompt-engineering" element={<AIPromptEngineering />} />
                <Route path="services/ai-data-analytics-insights" element={<AIDataAnalyticsInsights />} />
                <Route path="ai-automation" element={<AIAutomation />} />
                <Route path="services/ai-consultation-strategy" element={<AIConsultationStrategy />} />
                <Route path="services/mobile-app-development" element={<MobileAppDevelopment />} />
                <Route path="services/web-development" element={<WebDevelopment />} />
                {/* Redirect old Salesforce route */}
                <Route path="services/low-code/salesforce" element={<Navigate to="/services/salesforce" replace />} />
                <Route path="services/low-code/salesforce/*" element={<Navigate to="/services/salesforce" replace />} />
                <Route path="industries" element={<Industries />} />
                <Route path="case-studies" element={<CaseStudies />} />
                <Route path="about" element={<About />} />
                <Route path="careers" element={<Careers />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="cookie-policy" element={<CookiePolicy />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Chatbot />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
