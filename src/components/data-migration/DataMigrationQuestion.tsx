import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RadioOption {
  text: string;
  value: string;
}

interface CheckboxOption {
  text: string;
  value: string;
  exclusive?: boolean;
}

interface DataMigrationQuestionProps {
  question: string;
  type: "radio" | "checkbox" | "dropdown";
  options: RadioOption[] | CheckboxOption[];
  selectedValue?: string | string[];
  onSelectRadio?: (value: string) => void;
  onSelectDropdown?: (value: string) => void;
  onSelectCheckbox?: (values: string[]) => void;
  required?: boolean;
}

export function DataMigrationQuestion({
  question,
  type,
  options,
  selectedValue,
  onSelectRadio,
  onSelectDropdown,
  onSelectCheckbox,
  required = true,
}: DataMigrationQuestionProps) {
  const handleCheckboxChange = (option: CheckboxOption, checked: boolean) => {
    if (!onSelectCheckbox) return;
    
    const currentValues = (selectedValue as string[]) || [];
    
    if (checked) {
      // If selecting an exclusive option, clear all others
      if (option.exclusive) {
        onSelectCheckbox([option.value]);
      } else {
        // Remove any exclusive options when selecting non-exclusive
        const nonExclusiveValues = currentValues.filter(v => {
          const opt = (options as CheckboxOption[]).find(o => o.value === v);
          return opt && !opt.exclusive;
        });
        onSelectCheckbox([...nonExclusiveValues, option.value]);
      }
    } else {
      onSelectCheckbox(currentValues.filter((v) => v !== option.value));
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
                  onClick={() => onSelectRadio?.(option.value)}
                >
                  <span className="text-base">{option.text}</span>
                  {isSelected && <Check className="h-5 w-5 ml-2 flex-shrink-0" />}
                </Button>
              );
            })
          ) : type === "dropdown" ? (
            <Select
              value={selectedValue as string}
              onValueChange={(value) => onSelectDropdown?.(value)}
            >
              <SelectTrigger className="w-full h-auto py-4 px-5 text-base">
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {(options as RadioOption[]).map((option) => (
                  <SelectItem key={option.value} value={option.value} className="py-3">
                    {option.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                      handleCheckboxChange(option, checked as boolean)
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
