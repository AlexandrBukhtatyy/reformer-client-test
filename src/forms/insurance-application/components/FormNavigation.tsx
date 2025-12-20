import React from 'react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({ 
  currentStep, 
  totalSteps, 
  onStepChange 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <button
              type="button"
              onClick={() => onStepChange(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === currentStep
                  ? 'bg-blue-600 text-white'
                  : index < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              aria-label={`Шаг ${index + 1}`}
            >
              {index + 1}
            </button>
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">
        Шаг {currentStep + 1} из {totalSteps}
      </div>
    </div>
  );
};