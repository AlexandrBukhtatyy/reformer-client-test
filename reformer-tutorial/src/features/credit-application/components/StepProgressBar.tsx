/**
 * Компонент прогресс-бара шагов
 */

interface StepProgressBarProps {
  /** Текущий шаг */
  currentStep: number;
  /** Общее количество шагов */
  totalSteps: number;
  /** Названия шагов */
  stepLabels?: string[];
  /** Callback перехода к шагу */
  onStepClick?: (step: number) => void;
}

const DEFAULT_STEP_LABELS = [
  'Кредит',
  'Личные данные',
  'Контакты',
  'Работа',
  'Дополнительно',
  'Подтверждение',
];

export function StepProgressBar({
  currentStep,
  totalSteps,
  stepLabels = DEFAULT_STEP_LABELS,
  onStepClick,
}: StepProgressBarProps) {
  return (
    <div className="step-progress-bar">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        const label = stepLabels[step - 1] || `Шаг ${step}`;

        return (
          <div
            key={step}
            className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            onClick={() => onStepClick?.(step)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onStepClick?.(step)}
          >
            <div className="step-number">{isCompleted ? '✓' : step}</div>
            <div className="step-label">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
