import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, TrendingUp, AlertTriangle, AlertCircle, ShieldCheck, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useConsultationStore } from "@/lib/consultation-store";
import { useToast } from "@/hooks/use-toast";

interface QuestionScore {
  questionId: number;
  score: number;
}

interface BackupRecoveryResultsProps {
  totalScore: number;
  maxScore: number;
  questionScores: QuestionScore[];
  onReset: () => void;
  onClose: () => void;
}

// Recommendation mapping for each question
const questionRecommendations: Record<number, string> = {
  1: "Implement immutable/offsite tier; reduce single-location risk.",
  2: "Define/enforce retention policies; automate policy compliance.",
  3: "Run quarterly restore tests; document evidence and outcomes.",
  4: "Build/update DR runbooks; set RTO/RPO; test and update.",
  5: "Centralize monitoring + SLA alerting for backup job health.",
  6: "Expand coverage across SaaS/endpoints/databases; standardize protection.",
  7: "Create a restore incident playbook; roles, comms, escalation.",
  8: "Enforce encryption, RBAC, MFA, segregated admin access.",
  9: "Run scheduled DR drills; capture lessons learned; improve cadence.",
};

export function BackupRecoveryResults({
  totalScore,
  maxScore,
  questionScores,
  onReset,
  onClose,
}: BackupRecoveryResultsProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { openCalendly } = useConsultationStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Store feedback anonymously (localStorage for now, could be analytics)
    const feedbackData = {
      rating,
      text: feedback,
      timestamp: new Date().toISOString(),
      sessionId: crypto.randomUUID(),
      type: "backup-recovery-assessment",
    };
    
    try {
      const existingFeedback = JSON.parse(localStorage.getItem("assessment_feedback") || "[]");
      existingFeedback.push(feedbackData);
      localStorage.setItem("assessment_feedback", JSON.stringify(existingFeedback));
    } catch (e) {
      console.log("Feedback stored:", feedbackData);
    }

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
    onClose();
  };

  const handleBookConsultation = () => {
    onClose();
    openCalendly();
  };

  const handleClaimInsight = () => {
    onClose();
    navigate("/contact");
  };

  // Normalize to 0-100 scale
  const score100 = Math.round((totalScore / maxScore) * 100);
  const clampedScore = Math.max(0, Math.min(100, score100));

  // Determine recommendation tier based on 0-100 scale
  const getRecommendation = () => {
    if (clampedScore >= 80) {
      return {
        level: "Excellent",
        summary: "Strong backup and recovery posture with minimal operational risk.",
        description:
          "You have solid coverage across immutability, DR readiness, and recovery testing. Focus on continuous optimization and tightening incident response playbooks.",
        icon: TrendingUp,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      };
    } else if (clampedScore >= 60) {
      return {
        level: "Good",
        summary: "Healthy foundation—opportunities exist to reduce recovery risk and increase automation.",
        description:
          "Your backups are in decent shape, but tightening policies, testing frequency, and DR readiness can significantly reduce downtime and data loss exposure.",
        icon: ShieldCheck,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      };
    } else if (clampedScore >= 40) {
      return {
        level: "Weak",
        summary: "Risk exposure is elevated—gaps likely exist in recovery planning, testing, or protection mechanisms.",
        description:
          "Important areas like immutable backups, DR runbooks, and restore validation may be inconsistent. Prioritize foundational improvements within 30 days.",
        icon: AlertTriangle,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
      };
    } else {
      return {
        level: "Critical Risk",
        summary: "High risk of data loss or extended downtime—immediate remediation recommended.",
        description:
          "Backups may be unreliable or untested, retention may be weak, and DR readiness could be insufficient. We recommend an urgent backup & DR review to prevent costly incidents.",
        icon: AlertCircle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      };
    }
  };

  // Generate dynamic recommendations based on lowest scores
  const generateRecommendations = (): string[] => {
    const scoredQuestions = questionScores
      .filter((q) => q.questionId <= 9) // Only scored questions (1-9)
      .sort((a, b) => a.score - b.score);

    const level = getRecommendation().level;
    const isWeakOrCritical = level === "Weak" || level === "Critical Risk";

    // Take bottom 3, then add up to 2 more if Weak/Critical
    const baseCount = 3;
    const extraCount = isWeakOrCritical ? 2 : 0;
    const totalRecommendations = Math.min(baseCount + extraCount, scoredQuestions.length);

    const recommendations: string[] = [];
    const usedQuestions = new Set<number>();

    for (let i = 0; i < scoredQuestions.length && recommendations.length < totalRecommendations; i++) {
      const q = scoredQuestions[i];
      if (!usedQuestions.has(q.questionId) && questionRecommendations[q.questionId]) {
        recommendations.push(questionRecommendations[q.questionId]);
        usedQuestions.add(q.questionId);
      }
    }

    return recommendations;
  };

  const recommendation = getRecommendation();
  const RecommendationIcon = recommendation.icon;
  const dynamicRecommendations = generateRecommendations();

  return (
    <div className="space-y-6 py-4">
      {/* Score Display */}
      <Card className={`border-2 ${recommendation.borderColor} ${recommendation.bgColor}`}>
        <CardContent className="p-6 text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background shadow-md"
          >
            <RecommendationIcon className={`w-10 h-10 ${recommendation.color}`} />
          </motion.div>

          <div>
            <h3 className={`text-3xl font-bold ${recommendation.color}`}>
              {clampedScore} / 100
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{clampedScore}%</p>
          </div>

          <div className="space-y-2">
            <h4 className={`text-xl font-semibold ${recommendation.color}`}>
              {recommendation.level}
            </h4>
            <p className="text-base font-medium text-foreground">
              {recommendation.summary}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {recommendation.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Recommendations */}
      {dynamicRecommendations.length > 0 && (
        <Card className="border-2 border-border">
          <CardContent className="p-6 space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Recommended Next Steps
            </h4>
            <ul className="space-y-2">
              {dynamicRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Feedback Section */}
      <Card className="border-2 border-border">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-foreground">
              Rate Your Experience
            </h4>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="feedback"
              className="text-sm font-medium text-foreground"
            >
              Additional Feedback (Optional)
            </label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts about this assessment..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="resize-none"
              rows={3}
            />
            <Button
              variant="outline"
              size="lg"
              onClick={handleSubmit}
              className="w-full border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
            >
              Submit Feedback
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-3">
        <Button
          variant="outline"
          onClick={handleBookConsultation}
          className="w-full border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
          size="lg"
        >
          <Calendar className="h-5 w-5" />
          Book a Consultation
        </Button>
        <Button
          variant="outline"
          onClick={handleClaimInsight}
          size="lg"
          className="w-full border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors duration-200 px-8 py-4 text-lg font-semibold"
        >
          Claim Your Free Insight
        </Button>
      </div>

      {/* Reset Link */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="brand-underline-link text-sm text-muted-foreground hover:text-[#E52629] focus-visible:text-[#E52629] transition-colors focus-enterprise rounded inline-flex items-center px-2 py-1 min-h-[44px]"
        >
          Retake Assessment
        </button>
      </div>
    </div>
  );
}
