import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";

interface RadioOption {
  text: string;
  value: string;
  score: number;
}

interface CheckboxOption {
  text: string;
  value: string;
  weight: number;
}

interface BackupRecoveryQuestionProps {
  question: string;
  type: "radio" | "checkbox";
  options: RadioOption[] | CheckboxOption[];
  selectedValue?: string | string[];
  onSelectRadio?: (value: string, score: number) => void;
  onSelectCheckbox?: (values: string[]) => void;
  required?: boolean;
}

export function BackupRecoveryQuestion({
  question,
  type,
  options,
  selectedValue,
  onSelectRadio,
  onSelectCheckbox,
  required = true,
}: BackupRecoveryQuestionProps) {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (!onSelectCheckbox) return;
    
    const currentValues = (selectedValue as string[]) || [];
    
    if (checked) {
      onSelectCheckbox([...currentValues, value]);
    } else {
      onSelectCheckbox(currentValues.filter((v) => v !== value));
    }
  };

  return (
    <Card className="border-2 border-border shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Question Text */}
        <h3 className="text-lg font-semibold text-foreground leading-relaxed">
          {question}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {type === "radio" ? (
            (options as RadioOption[]).map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <Button
                  key={option.value}
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full justify-between text-left h-auto py-4 px-5 transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-muted hover:border-primary/50 hover:text-black"
                  }`}
                  onClick={() => onSelectRadio?.(option.value, option.score)}
                >
                  <span className="text-base">{option.text}</span>
                  {isSelected && <Check className="h-5 w-5 ml-2 flex-shrink-0" />}
                </Button>
              );
            })
          ) : (
            (options as CheckboxOption[]).map((option) => {
              const isSelected = ((selectedValue as string[]) || []).includes(option.value);
              return (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 w-full p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-primary/5 border-primary"
                      : "border-border hover:bg-muted hover:border-primary/50"
                  }`}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(option.value, checked as boolean)
                    }
                    className="h-5 w-5"
                  />
                  <span className="text-base flex-1">{option.text}</span>
                </label>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
