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
import { BackupRecoveryQuestion } from "./BackupRecoveryQuestion";
import { BackupRecoveryResults } from "./BackupRecoveryResults";
import { motion, AnimatePresence } from "framer-motion";

interface RadioQuestion {
  id: number;
  question: string;
  type: "radio";
  options: { text: string; value: string; score: number }[];
  required: boolean;
}

interface CheckboxQuestion {
  id: number;
  question: string;
  type: "checkbox";
  options: { text: string; value: string; weight: number }[];
  required: boolean;
}

type Question = RadioQuestion | CheckboxQuestion;

const questions: Question[] = [
  {
    id: 1,
    question: "Which best describes your backup storage strategy?",
    type: "radio",
    required: true,
    options: [
      { text: "Local only (on-premises, no offsite)", value: "local_only", score: 0 },
      { text: "Hybrid with offsite replication", value: "hybrid_with_offsite", score: 4 },
      { text: "Cloud backup (primary or secondary)", value: "cloud_backup", score: 7 },
      { text: "Immutable backup (air-gapped or WORM)", value: "immutable_backup", score: 10 },
    ],
  },
  {
    id: 2,
    question: "How mature are your backup retention policies and enforcement?",
    type: "radio",
    required: true,
    options: [
      { text: "No policy defined", value: "no_policy", score: 0 },
      { text: "Basic policy (informal)", value: "basic_policy", score: 3 },
      { text: "Defined with periodic reviews", value: "defined_with_reviews", score: 6 },
      { text: "Enforced and automated", value: "enforced_automated", score: 10 },
    ],
  },
  {
    id: 3,
    question: "How often are restore tests performed and documented?",
    type: "radio",
    required: true,
    options: [
      { text: "Never", value: "never", score: 0 },
      { text: "Annually", value: "annual", score: 4 },
      { text: "Quarterly", value: "quarterly", score: 7 },
      { text: "Monthly or more frequently", value: "monthly_or_more", score: 10 },
    ],
  },
  {
    id: 4,
    question: "How prepared are your DR plans and runbooks?",
    type: "radio",
    required: true,
    options: [
      { text: "None exist", value: "none", score: 0 },
      { text: "Partial / outdated", value: "partial", score: 4 },
      { text: "Documented but not tested", value: "documented", score: 7 },
      { text: "Tested and regularly updated", value: "tested_and_updated", score: 10 },
    ],
  },
  {
    id: 5,
    question: "How mature is monitoring/alerting for backup jobs and storage health?",
    type: "radio",
    required: true,
    options: [
      { text: "None", value: "none", score: 0 },
      { text: "Basic email alerts", value: "basic_email_alerts", score: 3 },
      { text: "Centralized dashboard", value: "centralized_dashboard", score: 7 },
      { text: "Automated with SLA tracking", value: "automated_with_sla", score: 10 },
    ],
  },
  {
    id: 6,
    question: "Which areas are included in your backup and recovery scope?",
    type: "checkbox",
    required: true,
    options: [
      { text: "On-premises servers", value: "on_prem_servers", weight: 10 },
      { text: "Cloud workloads", value: "cloud_workloads", weight: 8 },
      { text: "SaaS applications (M365, Google Workspace, etc.)", value: "saas_apps", weight: 6 },
      { text: "Endpoints (laptops, desktops)", value: "endpoints", weight: 4 },
      { text: "Databases", value: "databases", weight: 2 },
    ],
  },
  {
    id: 7,
    question: "How confident are you in your team's ability to respond to a backup or recovery incident?",
    type: "radio",
    required: true,
    options: [
      { text: "Not confident", value: "not_confident", score: 0 },
      { text: "Somewhat confident", value: "somewhat_confident", score: 4 },
      { text: "Mostly confident", value: "mostly_confident", score: 7 },
      { text: "Fully confident", value: "fully_confident", score: 10 },
    ],
  },
  {
    id: 8,
    question: "How secure is your backup environment (encryption, RBAC, MFA, segregated access)?",
    type: "radio",
    required: true,
    options: [
      { text: "Weak or none", value: "weak_or_none", score: 0 },
      { text: "Partial controls", value: "partial_controls", score: 4 },
      { text: "Strong controls", value: "strong_controls", score: 7 },
      { text: "Zero-trust model", value: "zero_trust_model", score: 10 },
    ],
  },
  {
    id: 9,
    question: "How often do you perform DR drills or recovery exercises?",
    type: "radio",
    required: true,
    options: [
      { text: "Never", value: "never", score: 0 },
      { text: "Annually", value: "annual", score: 4 },
      { text: "Quarterly", value: "quarterly", score: 7 },
      { text: "Bi-annually or more", value: "bi_annually", score: 10 },
    ],
  },
  {
    id: 10,
    question: "Would you like our team to perform a complimentary DR Review?",
    type: "radio",
    required: true,
    options: [
      { text: "Yes, I'm interested", value: "yes", score: 0 },
      { text: "No, not at this time", value: "no", score: 0 },
    ],
  },
];

interface BackupRecoveryAssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BackupRecoveryAssessmentModal({
  open,
  onOpenChange,
}: BackupRecoveryAssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { value: string | string[]; score: number }>>({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = questions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  const currentQuestion = questions[currentStep];

  const hasAnswer = () => {
    const answer = answers[currentQuestion?.id];
    if (!answer) return false;
    if (Array.isArray(answer.value)) {
      return answer.value.length > 0;
    }
    return answer.value !== undefined && answer.value !== "";
  };

  const handleRadioSelect = (questionId: number, value: string, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { value, score },
    }));
  };

  const handleCheckboxSelect = (questionId: number, values: string[]) => {
    // Calculate Q6 score: sum weights / 30 * 10
    const q6Options = (questions[5] as CheckboxQuestion).options;
    const sumWeights = values.reduce((sum, val) => {
      const opt = q6Options.find((o) => o.value === val);
      return sum + (opt?.weight || 0);
    }, 0);
    const maxWeight = 30; // 10 + 8 + 6 + 4 + 2
    const score = Math.round((sumWeights / maxWeight) * 10);

    setAnswers((prev) => ({
      ...prev,
      [questionId]: { value: values, score: Math.max(0, Math.min(10, score)) },
    }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
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

  // Calculate total score (Q1-Q9 only, Q10 is not scored)
  const calculateTotalScore = () => {
    let total = 0;
    for (let i = 1; i <= 9; i++) {
      const answer = answers[i];
      if (answer) {
        total += answer.score;
      }
    }
    return total;
  };

  const totalScore = calculateTotalScore();
  const maxScore = 90; // 9 questions × 10 max each

  // Build question scores array for recommendations
  const questionScores = Object.entries(answers)
    .filter(([id]) => parseInt(id) <= 9)
    .map(([id, data]) => ({
      questionId: parseInt(id),
      score: data.score,
    }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" hideDefaultClose>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex-1 text-center">
              {showResults
                ? "Your Backup & Recovery Health Score"
                : "Backup & Recovery Health Check"}
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
                <span>
                  Question {currentStep + 1} of {totalQuestions}
                </span>
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
                <BackupRecoveryQuestion
                  question={currentQuestion.question}
                  type={currentQuestion.type}
                  options={currentQuestion.options as any}
                  selectedValue={answers[currentQuestion.id]?.value}
                  onSelectRadio={
                    currentQuestion.type === "radio"
                      ? (value, score) => handleRadioSelect(currentQuestion.id, value, score)
                      : undefined
                  }
                  onSelectCheckbox={
                    currentQuestion.type === "checkbox"
                      ? (values) => handleCheckboxSelect(currentQuestion.id, values)
                      : undefined
                  }
                  required={currentQuestion.required}
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
                disabled={!hasAnswer()}
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
          <BackupRecoveryResults
            totalScore={totalScore}
            maxScore={maxScore}
            questionScores={questionScores}
            onReset={handleReset}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
