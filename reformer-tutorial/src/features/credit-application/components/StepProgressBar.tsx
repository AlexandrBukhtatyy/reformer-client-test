// components/StepProgressBar.tsx - Визуальный индикатор шагов

import { cn } from '@/lib/utils';
import { STEP_TITLES } from '../model/constants';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}

export function StepProgressBar({
  currentStep,
  totalSteps,
  completedSteps,
  onStepClick,
}: StepProgressBarProps) {
  const handleStepClick = (step: number) => {
    // Можно перейти на шаг 1 или на шаг, если предыдущий завершен
    const canGoTo = step === 1 || completedSteps.includes(step - 1);
    if (canGoTo && onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <div className="w-full">
      {/* Прогресс-бар */}
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = completedSteps.includes(step);
          const isCurrent = step === currentStep;
          const canNavigate = step === 1 || completedSteps.includes(step - 1);

          return (
            <div key={step} className="flex items-center flex-1">
              {/* Круг с номером шага */}
              <button
                type="button"
                onClick={() => handleStepClick(step)}
                disabled={!canNavigate}
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                  isCompleted && 'bg-green-600 text-white',
                  isCurrent && !isCompleted && 'bg-blue-600 text-white',
                  !isCompleted && !isCurrent && 'bg-gray-200 text-gray-600',
                  canNavigate && !isCurrent && 'hover:bg-gray-300 cursor-pointer',
                  !canNavigate && 'cursor-not-allowed opacity-50'
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
                  step
                )}
              </button>

              {/* Линия между шагами */}
              {step < totalSteps && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2',
                    completedSteps.includes(step) ? 'bg-green-600' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Названия шагов */}
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCurrent = step === currentStep;
          const isCompleted = completedSteps.includes(step);

          return (
            <div
              key={step}
              className={cn(
                'text-xs text-center flex-1',
                isCurrent && 'text-blue-600 font-medium',
                isCompleted && !isCurrent && 'text-green-600',
                !isCurrent && !isCompleted && 'text-gray-500'
              )}
            >
              {STEP_TITLES[step - 1]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
