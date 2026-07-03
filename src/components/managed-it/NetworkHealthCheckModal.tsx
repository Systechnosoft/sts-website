import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NetworkHealthCheckQuestion } from "./NetworkHealthCheckQuestion";
import { NetworkHealthCheckResults } from "./NetworkHealthCheckResults";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: { text: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "How often do you review and update your network infrastructure?",
    options: [
      { text: "Monthly", score: 5 },
      { text: "Quarterly", score: 4 },
      { text: "Annually", score: 3 },
      { text: "Rarely/Never", score: 1 },
    ],
  },
  {
    id: 2,
    question: "What type of network monitoring do you currently have?",
    options: [
      { text: "Real-time proactive monitoring", score: 5 },
      { text: "Regular scheduled scans", score: 3 },
      { text: "Manual checks occasionally", score: 2 },
      { text: "No monitoring in place", score: 1 },
    ],
  },
  {
    id: 3,
    question: "How would you rate your current firewall protection?",
    options: [
      { text: "Enterprise-grade with active maintenance", score: 5 },
      { text: "Decent but not actively maintained", score: 3 },
      { text: "Basic consumer-grade or outdated", score: 2 },
      { text: "No firewall configured", score: 1 },
    ],
  },
  {
    id: 4,
    question: "Do you segment your network for security?",
    options: [
      { text: "Yes, fully segmented with policies", score: 5 },
      { text: "Partial segmentation", score: 3 },
      { text: "No segmentation", score: 1 },
    ],
  },
  {
    id: 5,
    question: "Do you have a secure VPN setup for remote access?",
    options: [
      { text: "Yes, fully encrypted and managed VPN", score: 5 },
      { text: "Partially secured VPN", score: 3 },
      { text: "Unsecured or public access", score: 1 },
      { text: "No VPN in place", score: 0 },
    ],
  },
  {
    id: 6,
    question: "How is your network traffic analyzed?",
    options: [
      { text: "Real-time analytics and logging", score: 5 },
      { text: "Periodic review of logs", score: 3 },
      { text: "Ad-hoc log checks", score: 2 },
      { text: "No analysis", score: 0 },
    ],
  },
  {
    id: 7,
    question: "Do you enforce multi-factor authentication for network access?",
    options: [
      { text: "Yes, mandatory for all", score: 5 },
      { text: "Optional/recommended", score: 3 },
      { text: "Not implemented", score: 0 },
    ],
  },
  {
    id: 8,
    question: "How often do you test your disaster recovery and network failover plans?",
    options: [
      { text: "Quarterly or more", score: 5 },
      { text: "Annually", score: 3 },
      { text: "Never tested", score: 0 },
    ],
  },
  {
    id: 9,
    question: "Do you maintain updated network documentation and diagrams?",
    options: [
      { text: "Yes, always current", score: 5 },
      { text: "Occasionally updated", score: 3 },
      { text: "Outdated or none", score: 0 },
    ],
  },
  {
    id: 10,
    question: "How confident are you in your overall network security posture?",
    options: [
      { text: "Fully confident", score: 5 },
      { text: "Some gaps exist", score: 3 },
      { text: "Not confident / Don't know", score: 1 },
    ],
  },
];

interface NetworkHealthCheckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NetworkHealthCheckModal({ open, onOpenChange }: NetworkHealthCheckModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = questions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  const currentQuestion = questions[currentStep];
  const hasAnswer = answers[currentQuestion?.id] !== undefined;

  const handleAnswerSelect = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Last question answered, show results
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" hideDefaultClose>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex-1 text-center">
              {showResults ? "Your Network Health Score" : "IT Network Health Check"}
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="h-9 w-9 rounded-full text-neutral-700 hover:text-[#E52629] hover:bg-[#E52629]/10 focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none transition-colors flex items-center justify-center"
              aria-label="Close"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>
          </div>
        </DialogHeader>

        {!showResults ? (
          <div className="space-y-6 py-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span>Question {currentStep + 1} of {totalQuestions}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <NetworkHealthCheckQuestion
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                  selectedScore={answers[currentQuestion.id]}
                  onSelect={(score) => handleAnswerSelect(currentQuestion.id, score)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex-1 border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleNext}
                disabled={!hasAnswer}
                className="flex-1 border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
              >
                {currentStep === totalQuestions - 1 ? "See Results" : "Next"}
                {currentStep < totalQuestions - 1 && (
                  <ChevronRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <NetworkHealthCheckResults
            totalScore={totalScore}
            maxScore={50}
            onReset={handleReset}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
