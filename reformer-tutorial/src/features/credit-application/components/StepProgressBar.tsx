/**
 * Индикатор прогресса по шагам формы
 */

import { cn } from '@/lib/utils';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

const STEP_TITLES = [
  'Кредит',
  'Данные',
  'Контакты',
  'Работа',
  'Дополнительно',
  'Подтверждение',
];

export function StepProgressBar({ currentStep, totalSteps, completedSteps }: StepProgressBarProps) {
  return (
    <div className="mb-8">
      {/* Прогресс-бар */}
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = completedSteps.includes(step);
          const isCurrent = step === currentStep;
          const isAccessible = step === 1 || completedSteps.includes(step - 1);

          return (
            <div key={step} className="flex items-center flex-1">
              {/* Круг с номером шага */}
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                  isCurrent && 'bg-blue-600 text-white ring-4 ring-blue-200',
                  isCompleted && !isCurrent && 'bg-green-500 text-white',
                  !isCompleted && !isCurrent && isAccessible && 'bg-gray-200 text-gray-600',
                  !isCompleted && !isCurrent && !isAccessible && 'bg-gray-100 text-gray-400'
                )}
              >
                {isCompleted && !isCurrent ? (
                  <svg className="w-5 h-5\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>

              {/* Линия между шагами */}
              {step < totalSteps && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 rounded',
                    completedSteps.includes(step) ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Названия шагов */}
      <div className="flex justify-between">
        {STEP_TITLES.slice(0, totalSteps).map((title, i) => (
          <div
            key={i}
            className={cn(
              'text-xs text-center flex-1',
              i + 1 === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
            )}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
}
