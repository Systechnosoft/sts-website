import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Option {
  text: string;
  score: number;
}

interface NetworkHealthCheckQuestionProps {
  question: string;
  options: Option[];
  selectedScore?: number;
  onSelect: (score: number) => void;
}

export function NetworkHealthCheckQuestion({
  question,
  options,
  selectedScore,
  onSelect,
}: NetworkHealthCheckQuestionProps) {
  return (
    <Card className="border-2 border-border shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Question Text */}
        <h3 className="text-lg font-semibold text-foreground leading-relaxed">
          {question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedScore === option.score;
            return (
              <Button
                key={option.score}
                variant={isSelected ? "default" : "outline"}
                className={`w-full justify-between text-left h-auto py-4 px-5 transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-muted hover:border-primary/50 hover:text-black"
                }`}
                onClick={() => onSelect(option.score)}
              >
                <span className="text-base">{option.text}</span>
                {isSelected && <Check className="h-5 w-5 ml-2 flex-shrink-0" />}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
