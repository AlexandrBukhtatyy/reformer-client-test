import { STEPS } from '../../constants';
import { cn } from '@/lib/utils';

interface FormStepperProps {
  currentStep: number;
  visitedSteps: Set<number>;
  onStepClick?: (stepIndex: number) => void;
}

export function FormStepper({ currentStep, visitedSteps, onStepClick }: FormStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = visitedSteps.has(index) && index < currentStep;
          const isClickable = visitedSteps.has(index) || index <= currentStep;

          return (
            <div key={step.id} className="flex-1 flex items-center">
              <button
                type="button"
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                className={cn(
                  'flex flex-col items-center w-full',
                  isClickable && 'cursor-pointer',
                  !isClickable && 'cursor-not-allowed opacity-50'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors',
                    isActive && 'bg-primary text-primary-foreground border-primary',
                    isCompleted && 'bg-green-500 text-white border-green-500',
                    !isActive && !isCompleted && 'bg-muted text-muted-foreground border-muted'
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs text-center max-w-[100px]',
                    isActive && 'text-primary font-medium',
                    !isActive && 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
              </button>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2',
                    isCompleted ? 'bg-green-500' : 'bg-muted'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
