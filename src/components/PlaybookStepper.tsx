import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X, Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaybookStep {
  name: string;
  what: string;
  why: string;
  how: string;
  inputs: string[];
  outputs: string[];
}

interface Playbook {
  title: string;
  steps: PlaybookStep[];
}

const playbookData: Playbook[] = [
  {
    title: "Ship a policy-safe chatbot",
    steps: [
      {
        name: "Define intents",
        what: "Map user goals to chatbot capabilities",
        why: "Clear intent classification prevents scope creep and hallucinations",
        how: "Document expected user questions and desired bot responses",
        inputs: ["User research", "Support tickets", "FAQ data"],
        outputs: ["Intent taxonomy", "Example utterances"]
      },
      {
        name: "Craft base prompts",
        what: "Write structured templates with examples",
        why: "Consistent prompts ensure reliable, on-brand responses",
        how: "Create templates with slots for context and few-shot examples",
        inputs: ["Brand guidelines", "Tone samples", "Intent taxonomy"],
        outputs: ["Prompt templates", "Variable schemas"]
      },
      {
        name: "Add guardrails",
        what: "Implement safety filters and boundaries",
        why: "Prevent harmful outputs and policy violations",
        how: "Configure PII filters, toxicity detection, and topic boundaries",
        inputs: ["Compliance requirements", "Safety policies"],
        outputs: ["Filter configurations", "Boundary rules"]
      },
      {
        name: "Wire RAG",
        what: "Connect to knowledge base for grounded responses",
        why: "Retrieval reduces hallucinations with factual anchors",
        how: "Set up embeddings, vector search, and citation system",
        inputs: ["Documentation", "Knowledge base"],
        outputs: ["Retrieval pipeline", "Citation format"]
      },
      {
        name: "Offline evals",
        what: "Test prompts against golden dataset",
        why: "Catch quality issues before production deployment",
        how: "Run rubric-based scoring and automated metrics",
        inputs: ["Test cases", "Quality rubrics"],
        outputs: ["Eval results", "Performance metrics"]
      },
      {
        name: "Canary",
        what: "Deploy to subset of users first",
        why: "Validate in production with minimal risk",
        how: "Feature flag to 5-10% of traffic with monitoring",
        inputs: ["Deployment config", "Monitoring setup"],
        outputs: ["Canary metrics", "Incident alerts"]
      },
      {
        name: "Monitor drift",
        what: "Track prompt performance over time",
        why: "Detect degradation and maintain quality",
        how: "Set up dashboards for quality, latency, and cost metrics",
        inputs: ["Production logs", "Quality signals"],
        outputs: ["Monitoring dashboards", "Drift alerts"]
      }
    ]
  },
  {
    title: "Harden content generation",
    steps: [
      {
        name: "Style guide",
        what: "Document tone, voice, and formatting rules",
        why: "Consistency builds trust and brand recognition",
        how: "Create explicit guidelines with good/bad examples",
        inputs: ["Brand guidelines", "Editorial standards"],
        outputs: ["Style guide doc", "Example library"]
      },
      {
        name: "Templates + few-shot",
        what: "Provide structured patterns and examples",
        why: "Templates ensure format consistency, examples teach style",
        how: "Build reusable templates with annotated examples",
        inputs: ["Content samples", "Format requirements"],
        outputs: ["Template library", "Few-shot examples"]
      },
      {
        name: "Length/format controls",
        what: "Set explicit output constraints",
        why: "Prevents unusable outputs (too long/short/wrong format)",
        how: "Add token limits, regex validators, and structure checks",
        inputs: ["Format specs", "Platform limits"],
        outputs: ["Validation rules", "Format schemas"]
      },
      {
        name: "Toxicity/PII filters",
        what: "Screen outputs for harmful content",
        why: "Protect users and comply with regulations",
        how: "Integrate moderation APIs and PII detection",
        inputs: ["Compliance rules", "Moderation policies"],
        outputs: ["Filter pipeline", "Redaction config"]
      },
      {
        name: "Batch evals",
        what: "Test across diverse scenarios offline",
        why: "Validates quality at scale before rollout",
        how: "Run automated scoring on test set variations",
        inputs: ["Test scenarios", "Quality metrics"],
        outputs: ["Batch eval results", "Quality report"]
      },
      {
        name: "Rollout",
        what: "Deploy with gradual traffic increase",
        why: "Safe, monitored deployment minimizes blast radius",
        how: "Progressive rollout with automatic rollback triggers",
        inputs: ["Rollout plan", "Rollback criteria"],
        outputs: ["Deployment logs", "Traffic metrics"]
      }
    ]
  }
];

export function PlaybookStepper() {
  const [selectedPlaybook, setSelectedPlaybook] = useState(0);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useState(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });

  const currentPlaybook = playbookData[selectedPlaybook];

  // Mobile accordion view
  if (isMobile) {
    return (
      <div className="space-y-6">
        {playbookData.map((playbook, playbookIdx) => (
          <Card key={playbookIdx} className="bg-white border-2 border-[#E52629]/30">
            <CardHeader>
              <CardTitle className="text-xl">{playbook.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {playbook.steps.map((step, stepIdx) => (
                  <AccordionItem key={stepIdx} value={`step-${stepIdx}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#E52629] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {stepIdx + 1}
                        </div>
                        <span className="font-semibold">{step.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11 space-y-4 text-sm">
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-1">What</h5>
                          <p className="text-[#3C3C3C]">{step.what}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-1">Why</h5>
                          <p className="text-[#3C3C3C]">{step.why}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-1">How</h5>
                          <p className="text-[#3C3C3C]">{step.how}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-1">Inputs</h5>
                          <ul className="list-disc list-inside text-[#3C3C3C]">
                            {step.inputs.map((input, i) => <li key={i}>{input}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-1">Outputs</h5>
                          <ul className="list-disc list-inside text-[#3C3C3C]">
                            {step.outputs.map((output, i) => <li key={i}>{output}</li>)}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Desktop stepper view
  return (
    <div className="space-y-8">
      {/* Playbook selector - Matching Data Migration TabsTrigger styles */}
      <div className="flex gap-4 justify-center">
        {playbookData.map((playbook, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedPlaybook(idx);
              setSelectedStep(null);
            }}
            aria-pressed={selectedPlaybook === idx}
            className={cn(
              "px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2",
              selectedPlaybook === idx
                ? "bg-[#E52629] text-white shadow-lg shadow-[#E52629]/25 border-0"
                : "bg-white text-[#E52629] border-2 border-[#E52629] hover:bg-[#E52629] hover:text-white hover:border-[#E52629]"
            )}
          >
            {playbook.title}
          </button>
        ))}
      </div>

      <Card className="bg-white border-2 border-[#E52629]/30 grid place-items-center py-4 md:py-6 lg:py-7 rounded-2xl max-h-[420px]">
        <CardContent className="w-full flex justify-center items-center text-center p-0">
          <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 md:px-8 box-border">
            {/* Progress line and steps */}
            <div className="relative py-4 transition-all duration-300">
              {/* Progress line */}
              <div className="absolute top-14 left-0 right-0 h-1 bg-gray-200" />
              <div 
                className="absolute top-14 left-0 h-1 bg-[#E52629] transition-all duration-500"
                style={{ 
                  width: selectedStep !== null 
                    ? `${(selectedStep / (currentPlaybook.steps.length - 1)) * 100}%` 
                    : '0%'
                }}
              />

              {/* Steps */}
              <div 
                className="relative grid gap-2"
                style={{ gridTemplateColumns: `repeat(${currentPlaybook.steps.length}, minmax(0, 1fr))` }}
              >
                {currentPlaybook.steps.map((step, stepIdx) => (
                  <button
                    key={stepIdx}
                    onClick={() => setSelectedStep(stepIdx)}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div 
                      className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300",
                        selectedStep === stepIdx
                          ? "bg-[#E52629] text-white scale-110 shadow-lg"
                          : "bg-white border-2 border-gray-300 text-gray-600 group-hover:border-[#E52629] group-hover:text-[#E52629]"
                      )}
                    >
                      {stepIdx + 1}
                    </div>
                    <p className={cn(
                      "text-xs text-center font-medium leading-tight transition-colors",
                      selectedStep === stepIdx ? "text-[#E52629]" : "text-gray-600 group-hover:text-[#E52629]"
                    )}>
                      {step.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Details drawer */}
            <AnimatePresence mode="wait">
              {selectedStep !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6"
                >
                  <Card className="bg-gray-50 border-[#E52629]">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-[#E52629] text-white flex items-center justify-center text-sm font-bold">
                            {selectedStep + 1}
                          </div>
                          {currentPlaybook.steps[selectedStep].name}
                        </CardTitle>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setSelectedStep(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-2">What</h5>
                          <p className="text-[#3C3C3C]">{currentPlaybook.steps[selectedStep].what}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-2">Why</h5>
                          <p className="text-[#3C3C3C]">{currentPlaybook.steps[selectedStep].why}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-2">How</h5>
                          <p className="text-[#3C3C3C]">{currentPlaybook.steps[selectedStep].how}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-2">Inputs</h5>
                          <ul className="space-y-1">
                            {currentPlaybook.steps[selectedStep].inputs.map((input, i) => (
                              <li key={i} className="flex items-start gap-2 text-[#3C3C3C]">
                                <span className="text-[#E52629] mt-1">→</span>
                                {input}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-[#1C1C1C] mb-2">Outputs</h5>
                          <ul className="space-y-1">
                            {currentPlaybook.steps[selectedStep].outputs.map((output, i) => (
                              <li key={i} className="flex items-start gap-2 text-[#3C3C3C]">
                                <span className="text-[#E52629] mt-1">✓</span>
                                {output}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
