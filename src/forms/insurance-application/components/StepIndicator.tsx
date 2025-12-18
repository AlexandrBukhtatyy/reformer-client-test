import type { FormNavigationIndicatorRenderProps } from '@reformer/ui/form-navigation';

type StepIndicatorProps = FormNavigationIndicatorRenderProps;

export function StepIndicator({ steps, goToStep, currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Step circles */}
      <div className="flex items-center justify-between mb-4">
        {steps.map((step) => (
          <button
            key={step.number}
            type="button"
            onClick={() => step.canNavigate && goToStep(step.number)}
            disabled={!step.canNavigate}
            className={`
              flex flex-col items-center gap-2 group
              ${step.isCurrent ? 'text-blue-600' : step.isCompleted ? 'text-green-600' : 'text-gray-400'}
              ${step.canNavigate ? 'cursor-pointer' : 'cursor-not-allowed'}
            `}
          >
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                transition-colors duration-200
                ${step.isCurrent ? 'bg-blue-600 text-white' : ''}
                ${step.isCompleted ? 'bg-green-600 text-white' : ''}
                ${!step.isCurrent && !step.isCompleted ? 'bg-gray-200 text-gray-600' : ''}
                ${step.canNavigate ? 'group-hover:ring-2 group-hover:ring-offset-2' : ''}
              `}
            >
              {step.isCompleted ? '✓' : step.number}
            </div>
            <span className="text-xs text-center max-w-[80px] hidden md:block">
              {step.title}
            </span>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>

      {/* Current step title */}
      <div className="text-center mt-6">
        <span className="text-sm text-gray-500">
          Шаг {currentStep} из {totalSteps}
        </span>
        <h1 className="text-2xl font-bold">{steps.find((s) => s.isCurrent)?.title}</h1>
      </div>
    </div>
  );
}
