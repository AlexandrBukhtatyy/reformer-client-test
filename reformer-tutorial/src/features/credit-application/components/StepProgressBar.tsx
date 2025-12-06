/**
 * Индикатор прогресса шагов формы
 */

import { cn } from '@/lib/utils';
import { FORM_STEPS } from '../model/constants';

interface StepProgressBarProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}

export function StepProgressBar({ currentStep, completedSteps, onStepClick }: StepProgressBarProps) {
  return (
    <div className="mb-8">
      {/* Desktop view */}
      <div className="hidden md:flex items-center justify-between">
        {FORM_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;
          const isClickable = step.number === 1 || completedSteps.includes(step.number - 1);

          return (
            <div key={step.number} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => isClickable && onStepClick?.(step.number)}
                disabled={!isClickable}
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium text-sm transition-colors',
                  isCompleted && 'bg-green-500 border-green-500 text-white',
                  isCurrent && !isCompleted && 'bg-blue-500 border-blue-500 text-white',
                  !isCurrent && !isCompleted && 'bg-white border-gray-300 text-gray-500',
                  isClickable && !isCurrent && 'cursor-pointer hover:border-blue-300',
                  !isClickable && 'cursor-not-allowed'
                )}
              >
                {isCompleted ? '✓' : step.number}
              </button>
              <div className="ml-3 flex-1">
                <p
                  className={cn(
                    'text-sm font-medium',
                    isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  )}
                >
                  {step.title}
                </p>
              </div>
              {index < FORM_STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4',
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            Шаг {currentStep} из {FORM_STEPS.length}
          </span>
          <span className="text-sm text-gray-500">
            {FORM_STEPS[currentStep - 1]?.title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / FORM_STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
