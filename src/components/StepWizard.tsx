import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepWizardProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepWizard({ steps, currentStep, className }: StepWizardProps) {
  return (
    <nav aria-label="Progress" className={cn("w-full", className)}>
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <li key={step} className={cn("flex items-center", index < steps.length - 1 && "flex-1")}>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    isCompleted && "bg-success text-success-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-2 ring-primary/30",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </span>
                <span className={cn("hidden sm:block text-sm font-medium", isCurrent ? "text-foreground" : "text-muted-foreground")}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn("mx-3 h-0.5 flex-1 transition-colors", isCompleted ? "bg-success" : "bg-muted")} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
